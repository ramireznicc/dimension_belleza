import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import 'dotenv/config';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preferenceClient = new Preference(client);

app.post('/api/checkout', async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío.' });
  }

  try {
    const preference = await preferenceClient.create({
      body: {
        items: items.map((item) => ({
          id: String(item.id),
          title: item.nombre,
          quantity: item.cantidad,
          unit_price: item.precio,
          currency_id: 'ARS',
        })),
        back_urls: {
          success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/tienda?pago=exito`,
          failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/tienda?pago=fallo`,
          pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/tienda?pago=pendiente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'Dimension Belleza',
      },
    });

    res.json({ init_point: preference.init_point });
  } catch (err) {
    console.error('MercadoPago error:', err);
    res.status(500).json({ error: 'Error al crear la preferencia de pago.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
