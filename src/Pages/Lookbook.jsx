import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThumbnailClick = (thumbnail) => {
    setCurrentLargeImage(thumbnail);
  };

  const handlePrev = () => {
    setSliderIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isMobile) {
      setCurrentLargeImage(thumbnails[sliderIndex]);
    }
  }, [sliderIndex, isMobile, thumbnails]);

  return (
    <main className="flex flex-col items-center py-8">
      <div className="container max-w-4xl mb-20 flex flex-col md:flex-row items-center">
        <div className="flex-grow mr-0 md:mr-8 w-full md:w-auto">
          <img
            src={currentLargeImage}
            alt="Lookbook Principal"
            className="w-full h-auto block"
            style={{ maxHeight: '800px', objectFit: 'contain' }}
          />
          {isMobile && (
            <>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 border-2 border-[#DC1600] text-[#DC1600] rounded hover:bg-[#DC1600] hover:text-white transition-colors duration-300"
                  aria-label="Previous Image"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 border-2 border-[#DC1600] text-[#DC1600] rounded hover:bg-[#DC1600] hover:text-white transition-colors duration-300"
                  aria-label="Next Image"
                >
                  Next
                </button>
              </div>
              <p
                className="font-sans font-bold text-xl uppercase mt-4 transform -rotate-270 origin-top-right whitespace-nowrap text-center"
              >
                VOL.01
              </p>
            </>
          )}
        </div>
        {!isMobile && (
          <>
            <div className="grid grid-cols-3 gap-y-14 gap-x-8 ml-4">
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Miniatura ${index + 1}`}
                  onClick={() => handleThumbnailClick(thumbnail)}
                  className="w-full h-auto cursor-pointer opacity-70 transition-opacity duration-300 ease-in-out hover:opacity-100"
                  style={{ maxHeight: '150px', objectFit: 'cover' }}
                />
              ))}
            </div>
            <p
              className="font-sans font-bold text-xl uppercase mt-8 md:mt-0 md:ml-4 transform -rotate-270 origin-top-right whitespace-nowrap"
            >
              VOL.01
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default Lookbook;
