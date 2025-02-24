"use client";

import { useState, useEffect } from 'react';

export function useDynamicFontSize(value: string, maxLength: number = 10) {
  const [fontSize, setFontSize] = useState('5xl');

  useEffect(() => {
    if (value.length <= maxLength) {
      setFontSize('5xl'); // Default large size
    } else if (value.length <= maxLength + 5) {
      setFontSize('4xl');
    } else if (value.length <= maxLength + 10) {
      setFontSize('3xl');
    } else if (value.length <= maxLength + 15) {
      setFontSize('2xl');
    } else {
      setFontSize('xl');
    }
  }, [value, maxLength]);

  return fontSize;
}