import React,
 { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScroll, useTransform, motion } from "framer-motion";

const defaultImage = "/images/home/home_3.1.jpg";
const hoverImages = [
  "/images/home/home_3_1_1.jpg",
  "/images/home/home_3_1_2.jpg",
  "/images/home/home_3_1_3.jpg",
  "/images/home/home_3_1_4.jpg",
  "/images/home/home_3_1_5.jpg",
  "/images/home/home_3_1_6.jpg",
  "/images/home/home_3_1_7.jpg",
  "/images/home/home_3_1_8.jpg",
  "/images/home/home_3_1_9.jpg",
  "/images/home/home_3_1_10.jpg",
];
// Array con las imágenes para la cuadrícula animada
const gridImages = [
  "/images/home/home_3.4.1.jpg",
  "/images/home/home_3.4.2.jpg",
  "/images/home/home_3.4.3.jpg",
];

// Hook personalizado para el efecto parallax
function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Componente para la imagen con parallax para mantener el código más limpio
function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 90);

  return (
    <div ref={ref} className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="absolute top-[-25%] left-0 w-full h-[150%] object-cover"
        style={{ y }}
      />
    </div>
  );
}

function Home() {
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [isHovering, setIsHovering] = useState(false);
  // Nuevo estado para el índice de la imagen de la cuadrícula
  const [gridImageIndex, setGridImageIndex] = useState(0);
  // Nuevo estado para el hover de la segunda imagen
  const [isHoveringSecondImage, setIsHoveringSecondImage] = useState(false);

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
      <div className="flex w-full relative">
        <div className="w-1/2">
          <img src="/images/home/home_3.2.1.jpg" alt="Collage de imágenes 1" className="w-full h-auto object-cover" />
        </div>
        <div
          className="w-1/2 relative cursor-pointer"
          onMouseEnter={() => setIsHoveringSecondImage(true)}
          onMouseLeave={() => setIsHoveringSecondImage(false)}
        >
          <img src="/images/home/home_3.2.2.png" alt="Collage de imágenes 2" className="w-full h-auto object-cover" />
          {isHoveringSecondImage && (
            <video
              src="/images/home/home_3_2_2_hover.mp4"
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          )}
        </div>
        <a
          href="https://open.spotify.com/playlist/2mO0RTDEdJ2aWlY1bqG0iM?si=Wwncd4mfTKm1IClC0MYePg"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-64 rotate-3 transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <img
            src="/images/stickers/8CHO_RECEIPTIFY.jpg"
            alt="Sticker 8CHO RECEIPTIFY"
            className="w-full h-auto"
          />
        </a>
      </div>

      <ParallaxImage src="/images/home/home_3.3.parallax.jpg" alt="Imagen con efecto parallax" />

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
