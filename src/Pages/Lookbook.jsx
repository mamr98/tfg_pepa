import React, { useState } from 'react';
import Footer from '../Pages/Footer';

const looksData = [
  {
    id: 1,
    largeImage: '/images/lookbook/1.png',
    thumbnails: Array.from({ length: 10 }, (_, i) => `/images/lookbook/${i + 1}.png`),
  },
  // Puedes añadir más objetos de looks si tienes varias presentaciones
];

function Lookbook() {
  const [currentLargeImage, setCurrentLargeImage] = useState(looksData[0].largeImage);
  const [thumbnails] = useState(looksData[0].thumbnails); // Mantenemos las miniaturas fijas por ahora

  const handleThumbnailClick = (thumbnail) => {
    setCurrentLargeImage(thumbnail);
  };

  return (
    <main className="flex flex-col items-center py-8">
      <div className="container max-w-4xl mb-20 mt-5 flex">
        <div className="flex-grow mr-8">
          <img
            src={currentLargeImage}
            alt="Lookbook Principal"
            className="w-full h-auto block"
            style={{ maxHeight: '800px', objectFit: 'contain' }} // Manteniendo dimensiones y ajuste
          />
        </div>
        <div className="grid grid-cols-3 gap-y-14 gap-x-8 ml-4">
          {thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Miniatura ${index + 1}`}
              onClick={() => handleThumbnailClick(thumbnail)}
              className="w-full h-auto cursor-pointer opacity-70 transition-opacity duration-300 ease-in-out hover:opacity-100"
              style={{ maxHeight: '150px', objectFit: 'cover' }} // Manteniendo dimensiones y ajuste
            />
          ))}
        </div>
        <p
            className="font-sans font-bold text-xl uppercase mt-18 mr-2 transform -rotate-270 origin-top-right"
            style={{ whiteSpace: 'nowrap' }}
          >
            VOL.01
          </p>
      </div>
    </main>
  );
}

export default Lookbook;