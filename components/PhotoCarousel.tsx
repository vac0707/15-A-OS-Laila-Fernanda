
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CAROUSEL_IMAGES } from '../constants';

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isAutoPlaying) {
      timerRef.current = window.setInterval(nextSlide, 5000);
    }
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleManualNav = (direction: 'next' | 'prev') => {
    if (direction === 'next') nextSlide();
    else prevSlide();
    // Re-iniciar el temporizador para que no cambie inmediatamente después de un click manual
    resetTimer();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto group">
      {/* Marco Decorativo Estilo Disney */}
      <div className="absolute -inset-4 border-2 border-emerald-100/30 rounded-[2.5rem] pointer-events-none z-0"></div>
      
      <div className="relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[3/4] border-8 border-white z-10 bg-emerald-50">
        {CAROUSEL_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out transform ${
              idx === currentIndex 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-110 rotate-1'
            }`}
          >
            <img 
              src={img} 
              alt={`Recuerdo ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay sutil para realzar la imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent"></div>
          </div>
        ))}

        {/* Chispas decorativas internas (efecto mágico) */}
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-4 right-4 text-white/40 animate-pulse" size={24} />
          <Sparkles className="absolute bottom-10 left-6 text-white/30 animate-bounce" size={20} />
        </div>

        {/* Controles Manuales - Flechas */}
        <button
          onClick={() => handleManualNav('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={() => handleManualNav('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={32} />
        </button>
      </div>
      
      {/* Indicadores / Puntos de Navegación */}
      <div className="flex justify-center gap-3 mt-6">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              resetTimer();
            }}
            className={`transition-all duration-500 rounded-full ${
              idx === currentIndex 
                ? 'bg-emerald-600 w-8 h-2' 
                : 'bg-emerald-200 w-2 h-2 hover:bg-emerald-300'
            }`}
            aria-label={`Ir a imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
