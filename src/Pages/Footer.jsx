import React from 'react'
import ContentFooter from './ContentFooter';

// Se asume que el contenido real del footer (ContentFooter) mide alrededor de 400px de alto.
// Se ajustarán todas las instancias de 800px a esta nueva altura estimada.
// Si la altura de ContentFooter es diferente, puedes cambiar "400px" según corresponda.
export default function Footer() {
  return (
    <div className="relative h-[400px]" // Altura ajustada
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative h-[calc(100vh+400px)] -top-[100vh]"> {/* Cálculo de altura ajustado */}
        <div className="h-[400px] sticky top-[calc(100vh-400px)]"> {/* Altura y posición sticky ajustadas */}
          <ContentFooter />
        </div>
      </div>
    </div>
  );
}
