import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";

function Model(props) {
  // La ruta al modelo GLB. Como está en `src`, lo importamos directamente.
  const { scene } = useGLTF("src/Pages/Revista1.glb");
  // Clonamos la escena para poder usarla
  return <primitive object={scene.clone()} {...props} />;
}

function Countdown() {
  // Establecemos una fecha objetivo (puedes cambiarla a la que necesites)
  // Ejemplo: 7 días desde ahora
  const targetDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00" });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-white">
      <div className="text-6xl md:text-8xl font-bold tracking-widest pb-18">
        {/* <span className="mx-15">
          <span>{timeLeft.days[0]}</span><span className="ml-13">{timeLeft.days[1]}</span>
        </span>
        <span className="mx-18">:</span>
        <span className="mx-15">
          <span>{timeLeft.hours[0]}</span><span className="ml-10">{timeLeft.hours[1]}</span>
        </span>
        <span className="mx-17">:</span>
        <span className="mx-15">
          <span>{timeLeft.minutes[0]}</span><span className="ml-4">{timeLeft.minutes[1]}</span>
        </span> */}
      </div>
      <div className="text-sm md:text-base font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase ml-2 mt-2">
        {/* <span>days</span>
        <span className="mx-2 md:mx-4">hours</span>
        <span>mins</span> */}
      </div>
    </div>
  );
}

function TheVault() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('/images/the_vault/the_vault_5.1_fondo.png')`,
        }}
      >
        {/* Contenedor para el Canvas 3D */}
        <div className="w-full h-[60vh] md:h-[70vh]">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              {/* Iluminación ambiental para que el modelo se vea bien */}
              <Environment preset="sunset" />
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} intensity={1} />

              {/* El modelo 3D */}
              <Model scale={15.15} />

              {/* Controles para poder rotar y hacer zoom con el ratón */}
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative h-[150vh] overflow-hidden flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/images/the_vault/the_vault_5_2_parallax.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y,
          }}
        />
        <div className="relative z-10 text-white text-center p-8 bg-opacity-50 rounded-lg">
          <h3 className="text-8xl md:text-6xl font-bold mb-4">THE VAULT</h3>
          <p className="text-lg md:text-4xl mb-2">8CHO mag</p>
          <ul className="space-y-2 text-base md:text-4xl">
            <li>Drops limitados y exclusivos</li>
            <li>Apparel que no volverás a ver dos veces</li>
            <li>Llaves a contenido exclusivo</li>
            <li>Prints, accesorios y collabs únicos</li>
            <li>Inspo directa desde la calle</li>
          </ul>
        </div>
      </div>
      {/* Sección de la cuenta atrás */}
      <div
        className="relative h-[50vh] flex items-center justify-center bg-black  "
        style={{
          backgroundImage: `url('/images/the_vault/the_vault_marcador.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute">
          <Countdown />
        </div>
      </div>
      {/* Sección Save the date */}
      <div className="w-full bg-black text-white flex justify-between items-center px-8 md:px-16 py-8">
        <p>SAVE THE DATE</p>
        <p className="text-lg md:text-4xl mb-2 font-bold text-right">Next drop coming out soon!!!</p>
      </div>
      {/* Sección de la imagen final */}
      <div className="w-full bg-black flex justify-center items-center">
        <img src="/images/the_vault/the_vault_5_3.png" alt="The Vault" className="w-full h-auto" />
      </div>
    </>
  );
}

export default TheVault;
