import React from "react";

// Datos de las señales. Puedes reemplazar esto con datos reales.
const signalsData = [
  {
    id: 1,
    image: "/images/signals/signals_1.png",
    title: "CRUZ CAFUNÉ",
    text: "El predicador del sur vuelve a la carretera, con las TN puestas y el mensaje claro.",
  },
  {
    id: 2,
    image: "/images/signals/signals_2.png",
    title: "J.SANZH",
    text: "Calle, grano y verdad: la película lo cuenta todo, sin filtros, sin prisa.",
  },
  {
    id: 3,
    image: "/images/signals/signals_3.png",
    title: "ARTIST X",
    text: "Textito invenado, no quiero poner un Lorem ipsum me da coraje no se quien es esta piba",
  },
  {
    id: 4,
    image: "/images/signals/signals_4.png",
    title: "J.SANZH",
    text: "Calle, grano y verdad: la película lo cuenta todo, sin filtros, sin prisa.",
  },
  {
    id: 5,
    image: "/images/signals/signals_5.png",
    title: "JUICY BAE",
    text: "A la cuenta 'e tre' seguro que llama' Que despué' de un año quiere' volver a mi cama.",
  },
  {
    id: 6,
    image: "/images/signals/signals_6.png",
    title: "BON CALSO",
    text: "(Tú y yo tenemo' conexione', bae, fuerte y despacio).",
  },
];

function Signals() {
  return (
    // Usamos un div en lugar de main, ya que App.jsx ya provee un <main>.
    // Quitamos h-screen para que el contenedor crezca con el contenido.
    <div className="relative w-full">
      {/*
        Imagen de fondo:
        - 'fixed' la mantiene en su sitio durante el scroll.
        - 'inset-0' la expande para cubrir toda la pantalla.
        - '-z-10' la coloca detrás del contenido.
      */}
      <img
        src="/images/signals/signals_FONDO.png"
        alt="Fondo de la página Signals"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      {/*
        Contenido de la página:
        - 'relative' y 'z-10' lo colocan por encima de la imagen de fondo.
        - El contenido dentro de este div se desplazará normalmente.
      */}
      <div className="relative z-10">

        {/* Contenedor de la galería de imágenes */}
        <div className="container mx-auto px-8 pt-66 pb-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {signalsData.map((signal) => (
              <div
                key={signal.id}
                className="flex flex-col items-start text-left"
              >
                <img
                  src={signal.image}
                  alt={signal.title}
                  className="mb-4 h-auto w-full object-cover"
                />
                <h3 className="mb-2 text-xl font-bold text-[#DC1600]">
                  {signal.title}
                </h3>
                <p className="text-[#DC1600]">{signal.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signals;
