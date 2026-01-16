
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'blur-in' | 'zoom-in' | 'reveal-right' | 'fade-down';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  variant = 'fade-up' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Handle entry and exit
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Slight offset for better feel
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    'fade-up': isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95",
    'fade-down': isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12",
    'blur-in': isVisible ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110",
    'zoom-in': isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-3",
    'reveal-right': isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
  };

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-[1500ms] cubic-bezier(0.23, 1, 0.32, 1) transform transition-magical ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
