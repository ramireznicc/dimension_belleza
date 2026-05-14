-- =============================================
-- DIMENSIÓN BELLEZA - Schema y datos iniciales
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Tablas
CREATE TABLE IF NOT EXISTS categorias (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  orden INTEGER DEFAULT 0,
  aclaracion TEXT
);

CREATE TABLE IF NOT EXISTS servicios (
  id TEXT PRIMARY KEY,
  categoria_id TEXT REFERENCES categorias(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  precio TEXT DEFAULT '',
  descripcion TEXT DEFAULT '',
  imagen TEXT DEFAULT '',
  imagenes TEXT[] DEFAULT '{}',
  activo BOOLEAN DEFAULT TRUE,
  orden INTEGER DEFAULT 0
);

-- 2. RLS
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categorias" ON categorias FOR SELECT USING (true);
CREATE POLICY "Auth write categorias" ON categorias FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public read servicios" ON servicios FOR SELECT USING (true);
CREATE POLICY "Auth write servicios" ON servicios FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 3. Storage bucket para imágenes
INSERT INTO storage.buckets (id, name, public) VALUES ('servicios', 'servicios', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'servicios');
CREATE POLICY "Auth upload storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'servicios' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'servicios' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'servicios' AND auth.role() = 'authenticated');

-- 4. Datos iniciales
INSERT INTO categorias (id, titulo, orden, aclaracion) VALUES
  ('coloracion', 'Coloración', 0, 'Para cualquier técnica que incluya decoloración, es importante tener en cuenta que el tiempo de pose puede extenderse entre 1 y 2 horas, dependiendo del cabello y el resultado buscado. Sumando el tiempo de empapelado o aplicación según el diseño elegido, el lavado, la nutrición y el peinado final, la sesión completa puede durar entre 4 y 5 horas aproximadamente. Cada cabello reacciona de manera diferente a los productos, y en Dimensión Belleza la salud capilar siempre tiene prioridad sobre alcanzar el tono deseado en una sola sesión.
Los mejores resultados se obtienen sobre cabellos vírgenes (sin coloraciones previas). En cabellos tratados con tintes o productos de otros salones, trabajamos con especial precaución, ya que desconocemos los componentes utilizados anteriormente y priorizamos en todo momento el cuidado de tu cabello.'),
  ('tratamientos-capilares', 'Tratamientos capilares', 1, NULL),
  ('cortes-peinados', 'Cortes y peinados', 2, NULL),
  ('masaje-reiki', 'Masajes y Reiki', 3, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO servicios (id, categoria_id, titulo, precio, descripcion, imagen, imagenes, activo, orden) VALUES
  ('balayage', 'coloracion', 'Balayage', '$150.000', 'Técnica de aclarado a mano alzada que se aplica de medios a puntas, respetando la raíz para lograr un efecto de color degradado natural.
Se puede realizar de forma total en todo el cabello o de manera sectorizada según el diseño deseado.
El resultado es una transición suave y luminosa, con un crecimiento muy favorecedor que no exige retoques frecuentes.', '/coloracion/01.jpeg', '{"/coloracion/01.jpeg","/coloracion/08.jpeg"}', true, 0),
  ('woodlight', 'coloracion', 'Woodlight', 'Desde $100.000', 'Técnica de mechas realizadas con gorro o cap que generan un efecto similar al balayage, con decoloración controlada y distribuida de forma irregular para imitar los reflejos naturales del sol.
Es ideal para quienes buscan un resultado más difuminado y de bajo mantenimiento.', '/coloracion/02.jpeg', '{}', true, 1),
  ('reflejos-global', 'coloracion', 'Reflejos Global', 'Desde $150.000', 'Aplicación de mechas en gran cantidad y de manera uniforme por todo el cabello, logrando un efecto muy luminoso y rubio total.
Es la técnica indicada para quienes desean una transformación de mayor impacto y cobertura completa con máxima luminosidad.', '/coloracion/03.jpeg', '{}', true, 2),
  ('babylights', 'coloracion', 'Babylights', '$100.000', 'Mechas muy finas y delicadas distribuidas en pequeñas secciones que imitan los reflejos naturales que el sol deja en el cabello desde la infancia.
El resultado es sutil, con un brillo natural y multidimensional, ideal para quienes buscan cambios discretos y elegantes.', '/coloracion/04.jpeg', '{"/coloracion/04.jpeg","/coloracion/09.jpeg"}', true, 3),
  ('contouring', 'coloracion', 'Contouring', '$70.000', 'Técnica estratégica de mechas diseñada para enmarcar el contorno del rostro con reflejos de luz, potenciando las facciones y aportando luminosidad donde más se necesita.
El efecto es visualmente favorecedor y estilizante, adaptado a la forma de cada rostro.', '/coloracion/05.jpeg', '{"/coloracion/05.jpeg","/coloracion/07.jpeg"}', true, 4),
  ('tintura-raices', 'coloracion', 'Tintura en Raíces + Baño de Luz', '$66.000', 'Utilizamos tinturas sin amoníaco de líneas profesionales de alta gama que cuidan y respetan la fibra capilar durante el proceso de coloración.
La tintura se aplica únicamente en la zona de raíz para cubrir el crecimiento, mientras que el baño de luz se utiliza para revivir y tonificar el color en el resto del cabello, evitando la aplicación innecesaria de tinte en toda la longitud.
La coloración completa se realiza únicamente cuando se busca un cambio de look radical.', '/coloracion/06.jpeg', '{}', true, 5),
  ('karseell', 'tratamientos-capilares', 'Karseell', '$50.000', 'Karseell es un tratamiento capilar intensivo formulado para nutrir, reparar y revitalizar el cabello desde el interior de la fibra capilar.
Su fórmula, enriquecida con colágeno, aceites nutritivos y proteínas, actúa profundamente restaurando la elasticidad, suavidad y brillo del cabello.
Está especialmente diseñado para cabellos dañados, secos, decolorados o tratados químicamente, devolviéndoles fuerza, hidratación y un aspecto saludable desde la primera aplicación.', '/tratamientos capilares/karseell1.jpeg', '{}', true, 0),
  ('alisado-master', 'tratamientos-capilares', 'Alisado Máster Progresiv', '$76.000', 'Contiene keratina y formol en porcentaje aprobado.
Trabajamos con este producto en garantía de 10 años.
Conservamos las mismas clientas y todas conservan la calidad de la fibra.
Se va con los lavados. No es definitivo.
Su duración varía de 2 a 4 meses.

Es termo activo y se mantiene con nutrición.
El proceso en el salón es bastante largo así que asistir con paciencia ya que se puede demorar de 4 a 8 horas por sus técnicas precisas de alisado definitivo.', '/tratamientos capilares/alisadoMaster1.jpeg', '{"/tratamientos capilares/alisadoMaster1.jpeg","/tratamientos capilares/alisado2.jpeg","/tratamientos capilares/alisado3.jpeg"}', true, 1),
  ('tratamiento-ampolla-nutritiva', 'tratamientos-capilares', 'Tratamiento con ampolla nutritiva', '$50.000', 'Descripción próximamente.', '/tratamientos capilares/ampolla1.jpeg', '{"/tratamientos capilares/ampolla1.jpeg","/tratamientos capilares/ampolla2.mp4"}', true, 2),
  ('cauterizacion', 'tratamientos-capilares', 'Cauterización', '$50.000', 'Cierra cutículas, otorga brillo y suavidad sin necesidad de alisar.', '/tratamientos capilares/caute.jpeg', '{"/tratamientos capilares/caute.jpeg","/tratamientos capilares/caute2.jpeg"}', true, 3),
  ('lavado-corte', 'cortes-peinados', 'Lavado + corte', '$40.000', 'Lavado, corte de pelo y brushing.', '/cortes y peinados/corte1.jpeg', '{}', true, 0),
  ('trenzas-malibu', 'cortes-peinados', 'Trenzas Malibú', '', 'Trenzas Malibú es un estilo propio de Dimensión Belleza. Son extensiones de cabello con ondas que se adaptan a la energía de cada persona.
Cómodas y energéticamente fuertes para mujeres que buscan elevar su vibra.
Opcion rubias o castañas.', '/cortes y peinados/trenzas1.jpeg', '{"/cortes y peinados/trenzas1.jpeg","/cortes y peinados/trenzas2.jpeg"}', true, 1),
  ('extensiones', 'cortes-peinados', 'Extensiones', 'El precio varía de acuerdo al largo y la cantidad.', 'Extensiones de cabello natural, aplicadas con microrings que hacen que el resultado sea un pelo super natural que se puede peinar, planchar y ondular.
Información adicional: el service se realiza cada 2 meses y requiere un mantenimiento recomendado semanalmente en la peluquería.
Durante el proceso de llevar las extensiones intentamos realizar tratamientos que favorezcan el crecimiento.', '/cortes y peinados/extensiones.mp4', '{"/cortes y peinados/extensiones.mp4"}', true, 2),
  ('masaje-holistico', 'masaje-reiki', 'Masaje Holístico + Reiki', '', 'Comienza con Reiki. El Reiki es una terapia energética de origen japonés que se basa en la canalización de la "energía vital universal" a través de la imposición de manos para promover el equilibrio físico, mental y espiritual.
Acompañamos con un suave y relajante masaje para desbloquear energía estancada que por consecuencia nos esté provocando un dolor físico o muchos pensamientos, dolor de cabeza.
Finalizamos con reflexología en cabeza, manos y pies.', '/masajes/masaje1.jpeg', '{"/masajes/masaje1.jpeg","/masajes/sesionHolisticaIntegral1.jpeg","/masajes/reiki1.jpeg","/masajes/reiki2.jpeg"}', true, 0)
ON CONFLICT (id) DO NOTHING;
