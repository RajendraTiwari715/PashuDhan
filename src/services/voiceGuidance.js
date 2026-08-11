import React from 'react';

export const LANGUAGE_OPTIONS = [
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'en', label: 'English' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'बुंदेली (Bundeli)' }
];

// Completely silent - voice audio disabled as requested
export const speakGuidance = () => {
  // Voice audio system permanently turned off
  return;
};