import React, { useState, useEffect } from 'react';
import { Scan } from 'lucide-react';

const SmartBeautyAnimation = () => {
  const [scanning, setScanning] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setDataPoints(prev => {
          if (prev.length >= 8) {
            return [];
          }
          return [...prev, {
            id: Math.random(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          }];
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
      <div className="relative h-64 bg-white rounded-lg overflow-hidden mb-4">
        {/* Animation Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transition-transform duration-1000 ${scanning ? 'scale-110' : 'scale-100'}`}>
            <div className="relative w-32 h-32 border-4 border-pink-200 rounded-full flex items-center justify-center">
              <Scan 
                className={`text-pink-500 ${scanning ? 'animate-pulse' : ''}`}
                size={32}
              />
              {scanning && (
                <div className="absolute inset-0 border-4 border-pink-400 rounded-full animate-ping" />
              )}
            </div>
          </div>
        </div>
        
        {/* Data Points */}
        {dataPoints.map(point => (
          <div
            key={point.id}
            className="absolute w-2 h-2 bg-pink-500 rounded-full animate-pulse"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              animation: 'fadeInOut 2s ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Controls */}
      <div className="flex justify-center">
        <button
          onClick={() => setScanning(!scanning)}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          {scanning ? 'Stop Scan' : 'Start Scan'}
        </button>
      </div>
    </div>
  );
};

export default SmartBeautyAnimation;