import React from 'react';

export const LANGUAGE_OPTIONS = [
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'en', label: 'English (English)' }
];

// Completely silent - voice audio disabled as requested
export const speakGuidance = () => {
  // Voice audio system permanently turned off
  return;
};