import React, { useRef, useState, useEffect } from 'react';

const stickerImage = '/images/error/sticker_error.png';
const logoImage = '/images/logo/logo.svg';
const backgroundImage = '/images/error/error.png';

function DraggableSticker() {
  const stickerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const offset = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  // Responsive sticker size
  const [stickerSize, setStickerSize] = useState(150);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
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

  const handleDragStart = (e) => {
    const event = e.type === 'mousedown' ? e : e.touches[0];
    setDragging(true);
    isDraggingRef.current = true;
    const rect = stickerRef.current.getBoundingClientRect();
    offset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleDragEnd = () => {
    setDragging(false);
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDraggingRef.current) return;
      const event = e.type === 'mousemove' ? e : e.touches[0];
      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    };

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, []);

  return (
    <img
      src={stickerImage}
      alt="Sticker"
      ref={stickerRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
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
      if (window.innerWidth < 1024) {
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

  const getCoords = (e) => {
    if (e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      const rect = e.target.getBoundingClientRect();
      return {
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const startDrawing = (e) => {
    if (!context) return;
    e.preventDefault();
    const { x, y } = getCoords(e);
    context.beginPath();
    context.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing || !context) return;
    e.preventDefault();
    const { x, y } = getCoords(e);
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    context.closePath();
    setDrawing(false);
  };

  // Responsive styles
  const isMobile = window.innerWidth < 1024;
  const areaStyle = isMobile
    ? {
        position: 'relative',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px #0002',
        padding: 8,
        width: '90vw',
        maxWidth: 400,
        zIndex: 20,
        order: 1, // Place it before the text on mobile
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
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <button
        //onClick={saveDrawing}
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
        Enviar
      </button>
    </div>
  );
}

function NotFound() {
  // Responsive background size
  const [bgSize, setBgSize] = useState('70%');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
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

  const pageStyle = {
    position: 'relative',
    minHeight: '100vh',
    height: isMobile ? 'auto' : '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: bgSize,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: '#fff',
    overflow: isMobile ? 'auto' : 'hidden',
    padding: isMobile ? '20px 15px' : '40px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  };

  const pStyle = isMobile
    ? {
        position: 'relative',
        maxWidth: '95vw',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        zIndex: 15,
        background: 'rgba(0,0,0,0.4)',
        borderRadius: 8,
        padding: 12,
        order: 2,
      }
    : {
        position: 'absolute',
        bottom: 20,
        left: 20,
        maxWidth: 900,
        fontSize: 40,
        margin: 30,
        textAlign: 'left',
        color: '#fff',
        zIndex: 15,
      };

  return (
    <div style={pageStyle}>
      <a
        href="/"
        style={{
          display: 'block',
          margin: isMobile ? '0 auto' : '0 auto 20px auto',
          width: isMobile ? 100 : 150,
          order: isMobile ? -1 : 'unset',
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

      <DrawingArea />
      <p style={pStyle}>
        Oops... Te perdiste pero hey, aún puedes hacer algo útil con tu tiempo y dibujarnos algo. Y si no, vuelve atrás y suscríbete – la próxima 8CHO viene cargada.
      </p>

      <DraggableSticker />
    </div>
  );
}

export default NotFound;
