import React, { useRef, useState, useEffect } from 'react';

const stickerImage = '/images/error/sticker_error.png';
const stickerHoverImage = '/images/stickers/boca_hover.png';
const logoImage = '/images/logo/logo.svg';
const backgroundImage = '/images/error/error.png';

function DraggableSticker() {
  const stickerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const offset = useRef({ x: 0, y: 0 });

  // Responsive sticker size
  const [stickerSize, setStickerSize] = useState(150);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setStickerSize(80);
        // reposition if out of bounds
        setPosition(pos => ({
          x: Math.min(pos.x, window.innerWidth - 90),
          y: Math.min(pos.y, window.innerHeight - 90),
        }));
      } else {
        setStickerSize(150);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onMouseDown = (e) => {
    setDragging(true);
    const rect = stickerRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <img
      src={hover ? stickerImage : stickerImage}
      alt="Sticker"
      ref={stickerRef}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: stickerSize,
        height: stickerSize,
        cursor: 'grab',
        userSelect: 'none',
        zIndex: 10,
        touchAction: 'none',
      }}
      draggable={false}
    />
  );
}

function DrawingArea() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState(null);

  // Responsive canvas size
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setCanvasSize({ width: window.innerWidth - 40, height: 180 });
      } else {
        setCanvasSize({ width: 400, height: 300 });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    setContext(ctx);
  }, [canvasSize]);

  const startDrawing = (e) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing || !context) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    context.closePath();
    setDrawing(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'drawing.png';
    link.click();
  };

  // Responsive styles
  const isMobile = window.innerWidth < 600;
  const areaStyle = isMobile
    ? {
        position: 'fixed',
        left: '50%',
        bottom: 10,
        transform: 'translateX(-50%)',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px #0002',
        padding: 8,
        width: '90vw',
        maxWidth: 400,
        zIndex: 20,
      }
    : {
        position: 'absolute',
        right: 40,
        bottom: 40,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 12px #0002',
        padding: 16,
        zIndex: 20,
      };

  return (
    <div style={areaStyle}>
      <canvas
        ref={canvasRef}
        style={{
          background: '#f7f7f7',
          borderRadius: 8,
          border: '1px solid #ccc',
          display: 'block',
          marginBottom: 8,
          width: '100%',
          height: canvasSize.height,
          touchAction: 'none',
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <button
        onClick={saveDrawing}
        style={{
          padding: isMobile ? '6px 10px' : '6px 16px',
          borderRadius: 6,
          border: 'none',
          background: '#222',
          color: '#fff',
          cursor: 'pointer',
          fontSize: isMobile ? 14 : 16,
          width: '100%',
        }}
      >
        Guardar dibujo
      </button>
    </div>
  );
}

function NotFound() {
  // Responsive background size
  const [bgSize, setBgSize] = useState('70%');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
      if (window.innerWidth < 600) {
        setBgSize('120%');
      } else {
        setBgSize('70%');
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: bgSize,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#fff',
        overflow: 'hidden',
        paddingTop: isMobile ? 20 : 40,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <a
        href="/"
        style={{
          display: 'block',
          margin: isMobile ? '0 auto 10px auto' : '0 auto 20px auto',
          width: isMobile ? 100 : 150,
        }}
      >
        <img
          src={logoImage}
          alt="Logo"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </a>

      <p
        style={{
          position: 'absolute',
          bottom: isMobile ? 40 : 20,
          left: isMobile ? 10 : 20,
          right: isMobile ? 10 : 'auto',
          maxWidth: isMobile ? '95vw' : 900,
          fontSize: isMobile ? 20 : 40,
          margin: isMobile ? 10 : 30,
          textAlign: 'left',
          color: '#fff',
          zIndex: 15,
          background: isMobile ? 'rgba(0,0,0,0.4)' : 'none',
          borderRadius: isMobile ? 8 : 0,
          padding: isMobile ? 8 : 0,
        }}
      >
        Oops... Te perdiste pero hey, aún puedes hacer algo útil con tu tiempo y dibujarnos algo. Y si no, vuelve atrás y suscríbete – la próxima 8CHO viene cargada.
      </p>

      <DraggableSticker />
      {!isMobile && <DrawingArea />}
    </div>
  );
}

export default NotFound;
