
// Fix: Added React import to provide access to the React namespace for type definitions like React.ReactNode
import React from 'react';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}
