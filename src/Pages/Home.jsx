import React,
 { useState, useEffect } from "react";
import Lenis from "lenis";

const defaultImage = "/images/home/home_3.1.jpg";
const hoverImages = [
  "/images/home/home_3.2.1.jpg",
  "/images/home/home_3.2.2.png",
];
// Array con las imágenes para la cuadrícula animada
const gridImages = [
  "/images/home/home_3.4.1.jpg",
  "/images/home/home_3.4.2.jpg",
  "/images/home/home_3.4.3.jpg",
];

function Home() {
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [isHovering, setIsHovering] = useState(false);
  // Nuevo estado para el índice de la imagen de la cuadrícula
  const [gridImageIndex, setGridImageIndex] = useState(0);

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

  // Efecto para el carrusel de la cuadrícula de imágenes
  useEffect(() => {
    const gridInterval = setInterval(() => {
      // Actualiza al siguiente índice de imagen en un ciclo
      setGridImageIndex(current => (current + 1) % gridImages.length);
    }, 1500); // Cambia la imagen cada 1.5 segundos para un efecto más suave

    return () => clearInterval(gridInterval); // Limpia el intervalo al desmontar
  }, []); // El array vacío asegura que se ejecute solo una vez

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

      {/* Sección de dos imágenes */}
      <div className="flex w-full">
        <div className="w-1/2">
          <img src="/images/home/home_3.2.1.jpg" alt="Collage de imágenes 1" className="w-full h-auto object-cover" />
        </div>
        <div className="w-1/2">
          <img src="/images/home/home_3.2.2.png" alt="Collage de imágenes 2" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src="/images/home/home_3.3.parallax.jpg"
          alt="Discover yourself background"
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-200 ease-in-out"
        />
        <div
          className="relative z-10 text-center cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
        </div>
      </div>

      <div className="w-full grid grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative overflow-hidden aspect-[3/4]">
            {gridImages.map((imgSrc, imgIndex) => (
              <img
                key={imgSrc}
                src={imgSrc}
                alt={`Imagen de la cuadrícula ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${
                    (imgIndex - gridImageIndex) * 100
                  }%)`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Contenido original de la página */}
      {/* <div className="p-8">
        <h1>Home</h1>
        <p>Bienvenido a la página principal.</p>
      </div> */}
    </main>
  );
}

export default Home;
