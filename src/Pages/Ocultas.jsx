import { Link } from "react-router-dom"

function Ocultas() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Contenedor principal con márgenes en versión PC */}
      <div className="w-full max-w-screen-xl flex flex-col items-center justify-center flex-grow md:my-12">
        {/* Logo visible solo en PC */}
        <Link to="/" className="hidden md:flex justify-center w-full mb-4 md:mb-6">
          <img
            src="/images/logo/logo.svg"
            alt="8CHO"
            className="w-auto h-16"
            style={{
              maxWidth: "60vw",
            }}
          />
        </Link>

        {/* Contenedor relativo para los textos */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Texto superior - Visible solo en desktop */}
          <p
            className="hidden md:block absolute top-0 left-8 text-white text-sm md:text-base"
            style={{ fontFamily: "sans-serif", zIndex: 2 }}
          >
            DESCUBRE QUÉ ES 8CHO
          </p>

          {/* Imagen principal rotada en móvil, normal en PC, visible completa en móvil */}
          <div className="flex justify-center items-center w-full h-screen md:h-auto">
            <img
              src="/images/ocultos/ocultos.png"
              alt="8CHO-OCULTOS"
              className="block max-w-full max-h-full md:max-h object-contain transform rotate-90 md:rotate-0"
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>

          {/* Texto inferior - Visible solo en desktop */}
          <p
            className="hidden md:block absolute bottom-0 right-8 text-white text-sm md:text-base"
            style={{ fontFamily: "sans-serif", zIndex: 2 }}
          >
            SHORT FILM - 2025
          </p>
        </div>
      </div>
    </div>
  )
}

export default Ocultas
