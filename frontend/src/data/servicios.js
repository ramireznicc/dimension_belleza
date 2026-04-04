export const categorias = [
  {
    id: 'coloracion',
    titulo: 'Coloración',
    servicios: [
      {
        id: 'balayage',
        titulo: 'Balayage',
        precio: 'Desde $35.000',
        descripcion:
          'Técnica de aclarado a mano alzada que se aplica de medios a puntas, respetando la raíz para lograr un efecto de color degradado natural. Se puede realizar de forma total en todo el cabello o de manera sectorizada según el diseño deseado. El resultado es una transición suave y luminosa, con un crecimiento muy favorecedor que no exige retoques frecuentes.',
        imagen: '/01.jpeg',
      },
      {
        id: 'woodlight',
        titulo: 'Woodlight',
        precio: 'Desde $28.000',
        descripcion:
          'Técnica de mechas realizadas con gorro o cap que generan un efecto similar al balayage, con decoloración controlada y distribuida de forma irregular para imitar los reflejos naturales del sol. Es ideal para quienes buscan un resultado más difuminado y de bajo mantenimiento.',
        imagen: '/02.jpeg',
      },
      {
        id: 'reflejos-global',
        titulo: 'Reflejos Global',
        precio: 'Desde $40.000',
        descripcion:
          'Aplicación de mechas en gran cantidad y de manera uniforme por todo el cabello, logrando un efecto muy luminoso y rubio total. Es la técnica indicada para quienes desean una transformación de mayor impacto y cobertura completa con máxima luminosidad.',
        imagen: '/03.jpeg',
      },
      {
        id: 'babylights',
        titulo: 'Babylights',
        precio: 'Desde $32.000',
        descripcion:
          'Mechas muy finas y delicadas distribuidas en pequeñas secciones que imitan los reflejos naturales que el sol deja en el cabello desde la infancia. El resultado es sutil, con un brillo natural y multidimensional, ideal para quienes buscan cambios discretos y elegantes.',
        imagen: '/04.jpeg',
      },
      {
        id: 'contouring',
        titulo: 'Contouring',
        precio: 'Desde $30.000',
        descripcion:
          'Técnica estratégica de mechas diseñada para enmarcar el contorno del rostro con reflejos de luz, potenciando las facciones y aportando luminosidad donde más se necesita. El efecto es visualmente favorecedor y estilizante, adaptado a la forma de cada rostro.',
        imagen: '/05.jpeg',
      },
      {
        id: 'tintura-raices',
        titulo: 'Tintura en Raíces + Baño de Luz',
        precio: 'Desde $18.000',
        descripcion:
          'Utilizamos tinturas sin amoníaco de líneas profesionales de alta gama que cuidan y respetan la fibra capilar. La tintura se aplica únicamente en la zona de raíz para cubrir el crecimiento, mientras que el baño de luz revive y tonifica el color en el resto del cabello, evitando la aplicación innecesaria de tinte en toda la longitud. La coloración completa se realiza únicamente cuando se busca un cambio de look radical.',
        imagen: '/06.jpeg',
      },
    ],
    aclaracion:
      'Para cualquier técnica que incluya decoloración, el tiempo de pose puede extenderse entre 1 y 2 horas dependiendo del cabello y el resultado buscado. Sumando el empapelado, lavado, nutrición y peinado, la sesión completa puede durar entre 4 y 5 horas aproximadamente. En Dimensión Belleza la salud capilar siempre tiene prioridad sobre alcanzar el tono deseado en una sola sesión. Los mejores resultados se obtienen sobre cabellos vírgenes; en cabellos con tintes previos trabajamos con especial precaución.',
  },
  {
    id: 'masajes',
    titulo: 'Masajes',
    servicios: [
      {
        id: 'masaje-holistico',
        titulo: 'Masaje Holístico',
        precio: '$50.000',
        descripcion:
          'Comienza con Reiki, una terapia energética de origen japonés que canaliza la energía vital universal a través de la imposición de manos para promover el equilibrio físico, mental y espiritual. Acompañamos con un suave y relajante masaje para desbloquear energía estancada que puede estar provocando dolor físico, exceso de pensamientos o dolor de cabeza. Finalizamos con reflexología en cabeza, manos y pies.',
        imagen: '/07.png',
      },
    ],
  },
];

// Array plano para uso en Home y otros componentes
export const servicios = categorias.flatMap((c) => c.servicios);
