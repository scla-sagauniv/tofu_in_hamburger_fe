'use client';
import './globals.css';
import { Inter } from 'next/font/google';

import { useLayoutEffect } from 'react';
import { overrideThemeVariables } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // takes an object of css variable key-value pairs
    // create a functionality to change the variables to pass to overrideThemeVariables, you'll be able to switch the theme colour!
    overrideThemeVariables({
      '--light-bg': '#FEF4EF',
      '--light-bg-dark-shadow': 'rgba(130, 124, 122, 0.2)',
      '--light-bg-light-shadow': 'rgba(255, 255, 255, 0.9)',
      '--dark-bg': '#292E35',
      '--dark-bg-dark-shadow': '#21252a',
      '--dark-bg-light-shadow': '#313740',
      '--primary': '#8672FB',
      '--primary-dark': '#4526f9',
      '--primary-light': '#c7befd',
    });
    return;
  }, []);
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
