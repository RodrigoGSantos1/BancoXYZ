/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores principais baseadas na imagem
        primary: {
          100: '#e0e9ff',
          500: '#5b6bff', // Azul principal do botão
          900: '#2f2f85', // Azul escuro do header
        },
        secondary: {
          100: '#f1f5f9',
          300: '#cbd5e1',
          500: '#64748b', // Cinza médio dos textos
          700: '#334155',
        },
        // Cores específicas da interface
        surface: {
          light: '#ffffff', // Fundo branco dos cards
          dark: '#1a1a1a',
        },
        background: {
          light: '#f5f5f5', // Fundo cinza claro
          dark: '#0a0a0a',
        },
        text: {
          primary: {
            light: '#1f2937', // Texto principal escuro
            dark: '#f9fafb', // Texto principal claro
          },
          secondary: {
            light: '#6b7280', // Texto secundário
            dark: '#9ca3af',
          },
          accent: {
            light: '#3b82f6', // Links e elementos acentuados
            dark: '#60a5fa',
          },
        },
        border: {
          light: '#e5e7eb', // Bordas claras
          dark: '#374151', // Bordas escuras
        },
        // Cores das redes sociais
        social: {
          google: '#ea4335',
          facebook: '#1877f2',
          twitter: '#1da1f2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
