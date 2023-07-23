/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/tw-elements/dist/js/**/*.js',
];
export const theme = {
  extend: {
    borderRadius: {
      xl: '1.5rem',
    },
    fontFamily: {
      principal: ['Caveat Brush', 'sans-serif'],
      sora: ['Sora', 'sans-serif'],
    },
    colors: {
      primary: '#00235C',
      secondary: '#116CEF',
      white: '#FFFFFF',
      yellow: '#FFE600',
      'background-editor': '#116CEF',
      'orange-button': '#FF8552',
      'delete-button': '#EE3C3C',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '3072px', // Tamaño personalizado para pantallas 3xl
    },
    minWidth: {
      '3xl': '3072px',
    }, // Agregar la clase personalizada para 3xl
  },
};
export const darkMode = 'class';
export const plugins = [require('tw-elements/dist/plugin.cjs')];
