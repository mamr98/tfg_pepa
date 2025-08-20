import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

// Datos del producto (usando el producto de tienda3.png como ejemplo)
const product = {
  id: 1,
  name: "Gorra 'Signal'",
  price: "24.99€",
  description: "Un accesorio que no solo te protege del sol, sino que envía una señal. Estilo y misterio en un solo accesorio, para los que saben que cada detalle cuenta.",
  imageUrl: "/images/tienda/tienda1.png",
  thumbnails: [
    "/images/tienda/tienda1.png",
    "/images/tienda/tienda1.png",
    "/images/tienda/tienda1.png",
    "/images/tienda/tienda1.png",
  ],
  details: "Confeccionada con materiales de alta calidad, esta gorra presenta un diseño minimalista con el icónico logo de 8CHO bordado. Cierre ajustable para un ajuste perfecto."
};
function Producto_accesorio() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 md:p-8 text-white">
      <div className="flex flex-col md:flex-row md:gap-x-8">
        {/* Columna 1: Imagen Principal */}
        <div className="w-full md:w-[35%] mb-4 md:mb-0">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover" />
        </div>

        {/* Columna 2: Miniaturas */}
        <div className="w-full md:w-[15%] flex flex-row md:flex-col gap-2 mb-4 md:mb-0">
          {product.thumbnails.map((thumb, index) => (
            <img 
              key={index} 
              src={thumb} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-1/4 md:w-full h-auto object-cover cursor-pointer opacity-70 hover:opacity-100 transition" 
            />
          ))}
        </div>

        {/* Columna 3: Detalles del Producto */}
        <div className="w-full md:w-[50%] flex flex-col space-y-6">
          <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          
          <hr className="border-t border-gray-700" />

          <div className="flex items-center gap-4">
            <button className="bg-[#DC1600] text-white px-6 py-3 flex-grow uppercase font-semibold hover:bg-red-800 transition-colors">
              Añadir a la cesta
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="text-white text-3xl transition-transform duration-200 ease-in-out hover:scale-110"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>

          <hr className="border-t border-gray-700" />

          <div>
            <button 
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
            >
              <span>DETALLES</span>
              <span className="text-2xl">{detailsOpen ? '-' : '+'}</span>
            </button>
            {detailsOpen && (
              <div className="mt-4 text-gray-300">
                <p>{product.details}</p>
              </div>
            )}
          </div>

          <hr className="border-t border-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default Producto_accesorio;
