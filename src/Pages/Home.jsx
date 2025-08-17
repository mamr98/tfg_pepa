import React,
 { useState, useEffect } from "react";
import Lenis from "lenis";

const defaultImage = "/images/home/home_3.1.jpg";
const hoverImages = [
  "/images/home/home_3.2.1.jpg",
  "/images/home/home_3.2.2.png",
];

function Home() {
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [isHovering, setIsHovering] = useState(false);

  // Efecto de scroll suave con Lenis
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Efecto de cambio de imagen al pasar el cursor
  useEffect(() => {
    let intervalId = null;

    if (isHovering) {
      let imageIndex = 0;
      // Inicia el ciclo de imágenes inmediatamente
      setCurrentImage(hoverImages[imageIndex]);

      intervalId = setInterval(() => {
        imageIndex = (imageIndex + 1) % hoverImages.length;
        setCurrentImage(hoverImages[imageIndex]);
      }, 200); // Cambia la imagen rápidamente cada 200ms
    } else {
      // Vuelve a la imagen por defecto si no se está haciendo hover
      setCurrentImage(defaultImage);
    }

    // Limpia el intervalo cuando el componente se desmonta o isHovering cambia
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovering]);

  return (
    <main>
      {/* Sección de pantalla completa con efecto hover */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src={currentImage}
          alt="Discover yourself background"
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-200 ease-in-out"
        />
        <div
          className="relative z-10 text-center cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h1 className="text-red-600 text-7xl md:text-9xl font-bold tracking-tighter leading-none select-none">
            [re]disc0ver
            <br />
            yours3lf
          </h1>
        </div>
      </div>

      {/* Contenido original de la página */}
      <div className="p-8">
        <h1>Home</h1>
        <p>Bienvenido a la página principal.</p>
        <h1>Home</h1>
        <p>Bienvenido a la página principal.</p>
        <h1>Home</h1>
        <p>Bienvenido a la página principal.</p>
        <h1>Home</h1>
        <p>Bienvenido a la página principal.</p>
        <h1>Home</h1>
        <p>Bienvenido a la página principal.</p>
      </div>
    </main>
  );
}

export default Home;
