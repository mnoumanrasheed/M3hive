/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hive-yellow':      '#FDCF09',
        'hive-orange':      '#F69822',
        'hive-light-honey': '#FBE176',
        'hive-black':       '#0A0A0A',
        'hive-white':       '#FFFFFF',
        'hive-warm-white':  '#FFFDF5',
        'hive-gray':        '#F4F4F2',
        'hive-border':      '#E8E8E4',
        'hive-text-muted':  '#6B6B67',
      },
      fontFamily: {
        sans:    ['Manrope', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'hive-sm':    '0 1px 3px 0 rgba(10,10,10,0.06), 0 1px 2px -1px rgba(10,10,10,0.04)',
        'hive-md':    '0 4px 12px -2px rgba(10,10,10,0.08), 0 2px 6px -2px rgba(10,10,10,0.05)',
        'hive-lg':    '0 12px 32px -4px rgba(10,10,10,0.1), 0 4px 12px -4px rgba(10,10,10,0.06)',
        'hive-glow':  '0 0 0 3px rgba(253,207,9,0.35)',
        'hive-card':  '0 2px 8px -1px rgba(10,10,10,0.06), 0 1px 3px -1px rgba(10,10,10,0.04)',
        'hive-hover': '0 8px 24px -4px rgba(10,10,10,0.1), 0 3px 8px -3px rgba(10,10,10,0.07)',
      },
      transitionTimingFunction: {
        'out-expo':     'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-quad':  'cubic-bezier(0.45, 0, 0.55, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'fade-in':   'fade-in 0.3s ease-out forwards',
        'slide-down': 'slide-down 0.2s ease-out forwards',
        'spin-slow': 'spin-slow 12s linear infinite',
        marquee: 'marquee 40s linear infinite',
        marquee2: 'marquee2 40s linear infinite',
      },
    },
  },
  plugins: [],
};
