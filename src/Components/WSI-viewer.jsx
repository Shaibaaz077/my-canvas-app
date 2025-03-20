import React, { useRef, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import BoundingBox from './BoundingBox';
import FindingsPanel from './FindingsPanel';
import wsiImage from '../assets/7_20241209_024613.png';
import detectionResults from '../output.json';
import './WSIViewer.css';

const WSIViewer = () => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const results = Array.isArray(detectionResults) ? detectionResults : [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = wsiImage;

    image.onload = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        setImageLoaded(true);
      }
    };

    image.onerror = () => {
      console.error('Error loading image:', wsiImage);
      setImageError(true);
    };

    return () => {
    };
  }, []);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-xl font-bold text-center">Whole Slide Image Viewer</h2>
      <div className="flex flex-row flex-1 gap-4 mt-4">
        {/* Left Panel */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg">
          <FindingsPanel />
        </div>

        {/* Center Panel - Zoomable WSI */}
        <div className="w-1/2 bg-white shadow-md rounded-lg p-2 flex justify-center items-center relative">
          <TransformWrapper initialScale={1} minScale={0.5} maxScale={5}>
            <TransformComponent>
              <div className="relative">
                <canvas ref={canvasRef} className="border shadow-lg" aria-label="Whole Slide Image" />
                {imageLoaded &&
                  results.map((box, index) => (
                    <BoundingBox key={index} box={box} />
                  ))}
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>

        {/* Right Panel - Zoomed Out View */}
        <div className="w-1/4 bg-white p-5 shadow-md rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold p-1">WSI Hub View</h3>
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
            {imageError ? (
              <p className="text-red-500">Failed to load image.</p>
            ) : (
              <img
                src={wsiImage}
                alt="Zoomed-out WSI"
                className="h-full w-full object-contain"
                onError={() => console.error('Error loading Hub View image')}
              />
            )}
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default WSIViewer;