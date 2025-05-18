import React, { useState, useRef, useEffect } from "react";
import { SiTelegram, SiInstagram, SiX, SiTiktok } from "react-icons/si";

const socialTexts = {
  telegram:
    "Comparte, crea, colabora. Accede antes que nadie a contenido exclusivo, drops y previews.",
  instagram: "@8CHO.MAG",
  twitter: "@8CHO.MAG",
  tiktok: "@8CHO.MAG",
};

function ContentFooter() {
  const [hovered, setHovered] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Detect if device supports hover (desktop)
    const mql = window.matchMedia("(hover: hover)");
    setIsDesktop(mql.matches);

    function handleChange(e) {
      setIsDesktop(e.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const buttons = document.querySelectorAll(".magnetic");
    const strength = 40;

    function handleMove(e) {
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      });
    }

    function reset() {
      buttons.forEach((btn) => {
        btn.style.transform = "translate(0, 0)";
      });
    }

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMove);
    container?.addEventListener("mouseleave", reset);

    return () => {
      container?.removeEventListener("mousemove", handleMove);
      container?.removeEventListener("mouseleave", reset);
    };
  }, [isDesktop]);

  return (
    <footer
      className="relative w-full bg-black text-white mt-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Contenedor para la frase principal y el texto de hover */}
      <div className="py-8 px-12 w-full flex flex-col md:flex-row justify-between items-start">
        {/* Frase principal */}
        <div className="md:max-w-2xl">
          {/* Contenedor para alinear h2 y p en la misma línea o con ajuste */}
          <div className="flex flex-wrap items-baseline">
            <h2 className="text-5xl md:text-left md:text-7xl leading-[0.90] tracking-tight">
              “It’s always okay to wear whatever the fuck you want”
            </h2>
            <p className="mt-4 ml-2 text-base text-gray-400 self-end pb-[0.2em] md:pb-[0.4em]">– Tyler, the Creator</p>
          </div>
        </div>

        {/* Texto dinámico: solo si hay hovered */}
        {hovered && isDesktop && (
          <div className="md:mt-40 md:text-right md:max-w-sm transition-opacity duration-300 mt-10">
            {hovered === "telegram" ? (
              <>
                <h3 className="text-red-600 font-bold text-lg md:text-xl">
                  8CHO INNER CIRCLE
                </h3>
                <p className="text-red-600 mt-2 text-sm md:text-base">
                  {socialTexts[hovered]}
                </p>
              </>
            ) : (
              <p className="text-red-600 text-2xl md:text-3xl font-semibold">
                {socialTexts[hovered]}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Contenedor para texto inferior e iconos sociales */}
      <div className="py-8 px-12 w-full flex items-center justify-between">
        {/* Texto inferior (a la izquierda) */}
        <div className="text-xs text-gray-400">
          [re]discover yourself - 8CHO MAG ©
        </div>

        {/* Iconos sociales (a la derecha) */}
        <div className="flex gap-6 text-2xl">
          {[
            { icon: <SiTelegram />, id: "telegram" },
            { icon: <SiInstagram />, id: "instagram" },
            { icon: <SiX />, id: "twitter" },
            { icon: <SiTiktok />, id: "tiktok" },
          ].map(({ icon, id }) => (
            <div
              key={id}
              className="magnetic cursor-pointer transition-transform duration-300"
              onMouseEnter={isDesktop ? () => setHovered(id) : undefined}
              onMouseLeave={isDesktop ? () => setHovered(null) : undefined}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default ContentFooter;
