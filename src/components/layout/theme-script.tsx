'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export function ThemeScript() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const themeColor =
      resolvedTheme === 'dark'
        ? META_THEME_COLORS.dark
        : META_THEME_COLORS.light;
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', themeColor);
    }
  }, [resolvedTheme]);

  return null;
}
