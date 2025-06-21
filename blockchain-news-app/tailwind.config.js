import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'blockchain-blue': '#0b7285',
        'blockchain-gold': '#f7931a',
        'blockchain-green': '#0e9f6e',
        'blockchain-dark': '#171717',
      },
      fontSize: {
        'news-sm': ['0.875rem', { lineHeight: '1.4' }],
        'news-base': ['1rem', { lineHeight: '1.6' }],
        'news-lg': ['1.125rem', { lineHeight: '1.8' }],
        'news-xl': ['1.25rem', { lineHeight: '1.8' }],
        'news-2xl': ['1.5rem', { lineHeight: '2' }],
      },
      spacing: {
        'news-section': '3rem',
        'news-article': '1.75rem',
      },
    },
  },
  plugins: [
    typography,
    plugin(function ({ addUtilities }) {
      const utilities = {
        '.chart-bar': {
          '@apply bg-blockchain-blue rounded': {},
        },
        '.chart-line': {
          '@apply stroke-blockchain-gold stroke-2': {},
        },
      };
      addUtilities(utilities, ['responsive']);
    }),
  ],
};

export default config;
