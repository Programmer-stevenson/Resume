/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'scroll-left': 'scroll-left 20s linear infinite',
        'twinkle': 'twinkle 8s ease-in-out infinite',
        'aurora-main': 'aurora-main 25s ease-in-out infinite',
        'blink-caret': 'blink-caret 1s step-end infinite',
        'shine-sweep': 'shine-sweep 3s infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        'aurora-main': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg) scale(1)', opacity: '0.9' },
          '20%': { transform: 'translate(12%, 8%) rotate(72deg) scale(1.08)', opacity: '1' },
          '40%': { transform: 'translate(25%, -10%) rotate(144deg) scale(1.05)', opacity: '0.95' },
          '60%': { transform: 'translate(-8%, 15%) rotate(216deg) scale(1.1)', opacity: '1' },
          '80%': { transform: 'translate(-18%, -5%) rotate(288deg) scale(1.06)', opacity: '0.92' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'rgba(255, 255, 255, 0.75)' },
        },
        'shine-sweep': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
