import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model(props) {
  // La ruta al modelo GLB. Como está en `src`, lo importamos directamente.
  const { scene } = useGLTF("src/Pages/Revista1.glb");
  // Clonamos la escena para poder usarla
  return <primitive object={scene.clone()} {...props} />;
}

function TheVault() {
  return (
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
  );
}

export default TheVault;
