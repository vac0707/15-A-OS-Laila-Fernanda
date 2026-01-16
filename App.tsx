
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar as CalendarIcon, Clock, Sparkles, ChevronDown, Heart, Star, Music } from 'lucide-react';
import { HERO_IMAGE, GOOGLE_MAPS_LINK, CAROUSEL_IMAGES } from './constants';
import { AnimatedSection } from './components/AnimatedSection';
import { Countdown } from './components/Countdown';
import { PhotoCarousel } from './components/PhotoCarousel';
import { AudioPlayer } from './components/AudioPlayer';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [landingImageIndex, setLandingImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setLandingImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  const renderMagicDust = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100 + 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 5 + 8}s`,
          background: i % 2 === 0 ? '#fcd34d' : '#ffffff',
          boxShadow: '0 0 12px #fcd34d'
        }}
      />
    ));
  };

  const calendarDays = [
    null, null, null, null, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31
  ];

  if (!isOpen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#064e3b] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {CAROUSEL_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
                idx === landingImageIndex ? 'opacity-20' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt="Fondo"
                className="w-full h-full object-cover blur-[60px] scale-125"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-transparent to-emerald-950/90"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] magic-aura bg-emerald-400/10 rounded-full"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {renderMagicDust(30)}
        </div>
        
        <div className="text-center p-4 sm:p-8 relative z-10 w-full max-w-[100vw] mx-auto flex flex-col items-center">
          <AnimatedSection variant="blur-in" className="mb-8 md:mb-12">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-30 animate-pulse rounded-full"></div>
               <div className="relative w-24 h-24 sm:w-36 sm:h-36 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(252,211,77,0.3)] border border-white/20">
                  <Star size={40} className="text-amber-400 sm:hidden fill-amber-300 animate-pulse" />
                  <Star size={64} className="hidden sm:block text-amber-400 fill-amber-300 animate-pulse" />
               </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection variant="fade-down" className="mb-4 sm:mb-8 text-center">
            <h2 className="font-header text-amber-200 text-[10px] sm:text-sm tracking-[0.4em] sm:tracking-[0.8em] uppercase font-black drop-shadow-md opacity-80">El sueño comienza</h2>
          </AnimatedSection>

          <AnimatedSection variant="blur-in" className="w-full flex justify-center mb-12 sm:mb-16 overflow-hidden text-center">
            <h1 className="font-princess text-5xl xs:text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] shimmer-text leading-tight sm:leading-none whitespace-nowrap px-4 select-none">
              Laila Fernanda
            </h1>
          </AnimatedSection>
          
          <AnimatedSection variant="fade-up" className="text-center">
            <button 
              onClick={handleOpenInvitation}
              className="group relative inline-flex items-center gap-4 sm:gap-6 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-10 py-5 sm:px-20 sm:py-8 rounded-full font-bold text-lg sm:text-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:translate-y-[-8px] active:scale-95"
            >
              <Sparkles size={24} className="text-amber-300 sm:hidden" />
              <Sparkles size={36} className="hidden sm:block text-amber-300 group-hover:rotate-180 transition-transform duration-1000" />
              <span className="tracking-[0.1em] sm:tracking-[0.2em] uppercase">Abrir Invitación</span>
              <div className="absolute -inset-2 border-2 border-amber-400/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            </button>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden text-emerald-950 bg-white selection:bg-emerald-100 animate-in fade-in duration-[2500ms]">
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        {renderMagicDust(25)}
      </div>

      <AudioPlayer />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 text-center z-10 overflow-hidden bokeh-bg">
        <AnimatedSection variant="blur-in" className="flex flex-col items-center relative w-full max-w-7xl">
          
          <div className="mb-12 sm:mb-20 relative w-full flex flex-col items-center">
            <div className="absolute -inset-20 sm:-inset-40 bg-gradient-to-tr from-amber-100/30 via-white/50 to-emerald-100/30 rounded-full blur-[60px] sm:blur-[120px] magic-aura pointer-events-none"></div>

            <div className="relative z-10 p-2 sm:p-6 flex flex-col items-center w-full">
              <div className="relative w-[75vw] h-[100vw] sm:w-80 sm:h-[540px] md:w-[28rem] md:h-[650px] overflow-hidden group rounded-[3rem] sm:rounded-[6rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] mb-8 sm:mb-16">
                 <img
                  src={HERO_IMAGE}
                  alt="Laila Fernanda"
                  className="w-full h-full object-cover diffused-edges transform transition duration-[7000ms] group-hover:scale-110"
                />
              </div>

              <AnimatedSection variant="fade-down" className="w-full text-center flex justify-center">
                <h2 className="font-header text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-[0.1em] sm:tracking-[0.25em] font-black gold-shimmer whitespace-nowrap py-2 sm:py-4 leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)] mx-auto">
                  Mis Quince Años
                </h2>
              </AnimatedSection>
            </div>
          </div>
          
          <div className="relative z-40 w-full text-center px-4">
            <h1 className="font-princess text-6xl sm:text-9xl md:text-[13rem] lg:text-[15rem] drop-shadow-[0_10px_40px_rgba(255,255,255,0.9)] shimmer-text leading-tight sm:leading-none whitespace-nowrap">
              Laila Fernanda
            </h1>
            <p className="font-header text-emerald-800 text-[10px] sm:text-xl tracking-[0.3em] sm:tracking-[0.5em] mt-4 sm:mt-8 uppercase font-bold opacity-60">
              Arias Alzamora
            </p>
          </div>
          
          <div className="flex flex-col items-center mt-12 sm:mt-24 animate-bounce text-emerald-500">
            <ChevronDown size={32} className="sm:hidden" />
            <ChevronDown size={48} className="hidden sm:block" />
          </div>
        </AnimatedSection>
      </section>

      {/* Family Section */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 relative z-10 space-y-20">
        {/* Parents */}
        <AnimatedSection variant="zoom-in" className="max-w-4xl mx-auto text-center bg-[#064e3b] p-8 sm:p-20 rounded-[3rem] sm:rounded-[6rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/60 to-emerald-950/70"></div>
          <div className="relative z-10">
            <Star className="text-amber-400 mx-auto mb-8 sm:mb-12 animate-pulse" size={40} />
            <h3 className="font-header text-amber-200 text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] mb-8 sm:mb-14 uppercase font-black opacity-90">Con la bendición de mis padres</h3>
            <div className="space-y-8 sm:space-y-12">
              <p className="font-title text-2xl sm:text-5xl text-white font-light tracking-wide italic">Mariluz Alzamora Rojas</p>
              <div className="flex items-center justify-center gap-6 sm:gap-10 py-2 sm:py-4">
                 <div className="h-[1px] w-12 sm:w-24 bg-white/20"></div>
                 <Sparkles className="text-amber-400/50" size={24} />
                 <div className="h-[1px] w-12 sm:w-24 bg-white/20"></div>
              </div>
              <p className="font-title text-2xl sm:text-5xl text-white font-light tracking-wide italic">Benjamin Arias Chipa</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Madrina */}
        <AnimatedSection variant="zoom-in" className="max-w-4xl mx-auto text-center bg-white p-8 sm:p-20 rounded-[3rem] sm:rounded-[6rem] border border-emerald-100 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative z-10">
            <Heart className="text-emerald-600 mx-auto mb-8 sm:mb-12 fill-emerald-100" size={40} />
            <h3 className="font-header text-emerald-800 text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] mb-8 sm:mb-14 uppercase font-black">Mi Madrina</h3>
            <p className="font-title text-3xl sm:text-6xl text-emerald-950 font-bold tracking-tight italic">Yamelith Alzamora Gamarra</p>
            <div className="mt-10 flex justify-center">
               <Sparkles className="text-amber-400/40" size={32} />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Countdown */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 bg-emerald-50/40 relative z-10 backdrop-blur-2xl border-y border-emerald-100">
        <AnimatedSection variant="blur-in" className="max-w-5xl mx-auto text-center">
          <h3 className="font-title text-3xl sm:text-7xl text-emerald-900 mb-12 sm:mb-20 font-light tracking-tight italic px-2">Cerrando ciclos, abriendo sueños...</h3>
          <Countdown />
        </AnimatedSection>
      </section>

      {/* CALENDARIO COMPLETO - ENERO 2026 */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 relative z-10">
        <AnimatedSection variant="zoom-in" className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[3rem] sm:rounded-[6rem] shadow-xl sm:shadow-2xl border border-emerald-50 p-6 sm:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 sm:h-6 bg-gradient-to-r from-amber-200 via-emerald-600 to-amber-200"></div>
            
            <h4 className="font-header text-emerald-800 text-2xl sm:text-4xl mb-8 sm:mb-14 pt-4 sm:pt-6 tracking-[0.4em] sm:tracking-[0.7em] font-black uppercase">Enero 2026</h4>
            
            <div className="grid grid-cols-7 gap-1 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="text-[8px] sm:text-xs uppercase tracking-widest text-emerald-400 font-black">{day}</div>
              ))}
              
              {calendarDays.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`
                    relative h-8 w-8 xs:h-10 xs:w-10 sm:h-20 sm:w-20 flex items-center justify-center text-sm sm:text-3xl font-title rounded-full transition-all duration-700
                    ${day === 31 ? 'bg-emerald-950 text-amber-300 shadow-xl scale-110 z-10 font-bold' : 'text-emerald-900/30'}
                    ${day === null ? 'opacity-0' : 'opacity-100'}
                  `}
                >
                  {day}
                  {day === 31 && (
                    <div className="absolute inset-0 rounded-full border-2 border-amber-300/40 animate-ping"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8 text-emerald-950 font-black tracking-[0.2em] sm:tracking-[0.4em] uppercase text-2xl sm:text-5xl py-8 sm:py-12 border-t border-emerald-50 mt-6 sm:mt-8">
              <Clock size={32} className="sm:hidden text-amber-500 animate-pulse" />
              <Clock size={48} className="hidden sm:block text-amber-500 animate-pulse" />
              <span>07:00 PM</span>
            </div>
            <p className="text-emerald-500 text-[10px] sm:text-sm font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] mt-2 sm:mt-4">Sábado Inolvidable</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Reception Details */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 relative z-10 bg-[#f8faf9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24">
          <AnimatedSection variant="reveal-right" className="bg-white p-10 sm:p-24 rounded-[3rem] sm:rounded-[7rem] shadow-xl border border-emerald-50 text-center flex flex-col items-center group">
            <div className="w-20 h-20 sm:w-32 sm:h-32 bg-emerald-950 rounded-full flex items-center justify-center mb-8 sm:mb-14 text-amber-300">
              <MapPin size={32} className="sm:hidden" />
              <MapPin size={56} className="hidden sm:block" />
            </div>
            <h4 className="font-header text-2xl sm:text-4xl text-emerald-900 mb-6 sm:mb-12 tracking-[0.2em] sm:tracking-[0.4em] font-black uppercase">La Recepción</h4>
            <p className="text-xl sm:text-3xl text-emerald-950 font-black mb-4 uppercase tracking-[0.05em] leading-tight">Av. Victor Raul Haya de la Torre</p>
            <p className="text-emerald-600 text-lg sm:text-2xl mb-2 font-bold uppercase tracking-widest">MG-08 con Rosales</p>
            <p className="text-emerald-500 italic text-sm sm:text-lg mb-8 sm:mb-16 font-light max-w-xs sm:max-w-md mx-auto leading-relaxed">
              Tras la comisaría Villa Ampay
            </p>
            <a 
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-950 hover:bg-black text-white px-10 py-4 sm:px-24 sm:py-7 rounded-full font-black text-lg sm:text-2xl transition-all shadow-xl flex items-center gap-4 sm:gap-6"
            >
              Cómo llegar →
            </a>
          </AnimatedSection>

          <AnimatedSection variant="zoom-in" className="bg-white p-10 sm:p-24 rounded-[3rem] sm:rounded-[7rem] shadow-xl border border-emerald-50 text-center flex flex-col items-center group">
            <div className="w-20 h-20 sm:w-32 sm:h-32 bg-emerald-50 rounded-full flex items-center justify-center mb-8 sm:mb-14 text-emerald-800">
              <Clock size={32} className="sm:hidden animate-pulse" />
              <Clock size={56} className="hidden sm:block animate-pulse" />
            </div>
            <h4 className="font-header text-2xl sm:text-4xl text-emerald-900 mb-6 sm:mb-12 tracking-[0.2em] sm:tracking-[0.4em] font-black uppercase">Protocolo</h4>
            <p className="text-5xl sm:text-8xl md:text-9xl font-title text-emerald-950 mb-6 sm:mb-10 font-black tracking-tighter">07:00 PM</p>
            <p className="text-emerald-500 italic text-lg sm:text-2xl mb-4 sm:mb-14 tracking-widest uppercase font-black">Recepción Formal</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Carousel */}
      <section className="py-24 sm:py-48 px-4 sm:px-6 relative z-10 overflow-hidden bg-white">
        <AnimatedSection variant="blur-in" className="text-center mb-16 sm:mb-28">
          <h2 className="font-princess text-6xl sm:text-[9rem] md:text-[12rem] text-emerald-950 mb-6 sm:mb-10 leading-none shimmer-text">Mi Galería</h2>
          <div className="w-40 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-emerald-100 to-transparent mx-auto"></div>
        </AnimatedSection>
        <PhotoCarousel />
      </section>

      {/* Footer */}
      <section className="py-24 sm:py-48 px-4 sm:px-8 text-center bg-[#f8faf9] relative z-10">
        <AnimatedSection variant="blur-in" className="max-w-7xl mx-auto text-center">
          <div className="mb-12 sm:mb-24 flex justify-center">
             <div className="relative">
                <div className="absolute inset-0 bg-amber-200 blur-[40px] sm:blur-[80px] rounded-full opacity-40 animate-pulse"></div>
                <Star size={60} className="sm:hidden text-amber-400 opacity-50" />
                <Star size={120} className="hidden sm:block text-amber-400 opacity-50 animate-spin-slow" />
             </div>
          </div>
          
          <p className="font-title text-2xl sm:text-4xl md:text-6xl text-emerald-950 italic leading-relaxed mb-20 sm:mb-40 px-4 sm:px-12 font-light tracking-tight max-w-4xl mx-auto">
            “Gracias por acompañarme a escribir esta nueva página de mi vida.”
          </p>
          
          <div className="mt-16 sm:mt-32 group inline-block w-full px-2 text-center">
            <span className="text-emerald-500 uppercase tracking-[0.4em] sm:tracking-[0.7em] text-[10px] sm:text-[13px] block mb-6 sm:mb-12 font-black opacity-60">Con amor eterno,</span>
            <div className="overflow-hidden">
              <h3 className="font-princess text-6xl sm:text-9xl md:text-[12rem] lg:text-[15rem] shimmer-text leading-tight sm:leading-none whitespace-nowrap">
                Laila Fernanda
              </h3>
            </div>
          </div>
          
          <div className="mt-32 sm:mt-64 pt-12 sm:pt-20 border-t border-emerald-100 text-emerald-400 text-[9px] sm:text-[13px] uppercase tracking-[0.4em] sm:tracking-[0.7em] font-black opacity-40">
            TREINTA Y UNO • ENERO • MMXXVI • 07:00 PM
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
};

export default App;
