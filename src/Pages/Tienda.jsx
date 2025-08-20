import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

// Aquí defines la lista de productos.
// Asegúrate de que las rutas en `imageUrl` coincidan con tus archivos en la carpeta `public/images/tienda/`
const productsData = [
  {
    id: 1,
    name: "Camiseta 'Origins'",
    price: "34.99€",
    imageUrl: "/images/tienda/tienda1.png",
    tipo: "accesorio"
  },
  {
    id: 2,
    name: "Sudadera 'Vault'",
    price: "69.99€",
    imageUrl: "/images/tienda/tienda2.png",
    tipo: "accesorio"
  },
  {
    id: 3,
    name: "Gorra 'Signal'",
    price: "24.99€",
    imageUrl: "/images/tienda/tienda3.png",
    tipo: "ropa"
  },
  {
    id: 4,
    name: "Pantalón Cargo",
    price: "79.99€",
    imageUrl: "/images/tienda/tienda4.png",
    tipo: "ropa"
  },
  // Añade más productos aquí según necesites
];

// Añadimos la propiedad isLiked a cada producto para manejar el estado del "like"
const initialProducts = productsData.map((product) => ({
  ...product,
  isLiked: false,
}));

function Tienda() {
  const [products, setProducts] = useState(initialProducts);

  const handleToggleLike = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, isLiked: !product.isLiked }
          : product
      )
    );
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative text-white group">
            <Link to={product.tipo === 'ropa' ? '/producto' : '/producto_accesorio'}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </Link>
            {/* Corazón (arriba a la izquierda) */}
            <button
              onClick={() => handleToggleLike(product.id)}
              className="absolute top-3 left-3 text-white text-2xl z-10 transition-transform duration-200 ease-in-out hover:scale-110"
            >
              {product.isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>

            {/* Número del item (arriba a la derecha) */}
            <span className="absolute top-3 right-3 text-lg font-mono z-10">
              {String(product.id).padStart(2, "0")}
            </span>

            {/* Subtítulo y precio (abajo a la izquierda) */}
            <div className="absolute bottom-3 left-3 z-10 mb-5">
              <h3 className="font-semibold text-base uppercase">{product.name}</h3>
            </div>
            <div className="absolute bottom-3 left-3 z-10">
              <p className="text-base">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tienda;
