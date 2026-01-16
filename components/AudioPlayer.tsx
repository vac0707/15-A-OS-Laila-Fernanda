
import React, { useState, useRef, useEffect } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { MUSIC_URL } from '../constants';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Error al reproducir audio:", e));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Sincronización robusta: escuchar eventos nativos del elemento audio
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('playing', onPlay);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('playing', onPlay);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[70]">
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
      <button
        onClick={toggleMusic}
        className="bg-white/95 backdrop-blur-xl p-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-emerald-100 text-emerald-600 hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group"
      >
        {isPlaying ? (
          <Volume2 size={28} className="animate-pulse" />
        ) : (
          <VolumeX size={28} className="opacity-40" />
        )}
        
        {/* Glow effect around button when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none"></div>
        )}
      </button>
      
      {!isPlaying && (
        <div className="absolute right-0 -top-16 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold whitespace-nowrap animate-bounce border border-emerald-500">
          Activar Música 🎵
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-emerald-700 rotate-45"></div>
        </div>
      )}
    </div>
  );
};
