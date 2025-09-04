import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";

function Model(props) {
  // La ruta al modelo GLB. Como está en `src`, lo importamos directamente.
  const { scene } = useGLTF("src/Pages/Revista1.glb");
  // Clonamos la escena para poder usarla
  return <primitive object={scene.clone()} {...props} />;
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
    </>
  );
}

export default TheVault;
