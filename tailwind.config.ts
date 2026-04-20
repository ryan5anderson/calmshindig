import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Off-white page background + light surfaces
        'cream': '#F5F0EB',
        // Dark forest green — text, nav, footer, dark surfaces
        'earth-dark': '#384428',
        // Sage green — primary accent, CTAs, dividers
        'amber': '#7E9B72',
        'amber-light': '#9BB88B',
        // Sage aliases
        'sage': '#7E9B72',
        'sage-light': '#9BB88B',
        // Dusty rose — warm secondary accent
        'rust': '#C8B5AD',
        'dusty-rose': '#C8B5AD',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0.95, 0.25, 1)',
        bounce: 'cubic-bezier(0.33, 1.52, 0.62, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollBounce: {
          '0%, 100%': { opacity: '0.4', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(5px)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.95s cubic-bezier(0.2,0.95,0.25,1) forwards',
        'fade-up-delay': 'fadeUp 0.95s cubic-bezier(0.2,0.95,0.25,1) 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.95s cubic-bezier(0.2,0.95,0.25,1) 0.4s forwards',
        'fade-up-delay-3': 'fadeUp 0.95s cubic-bezier(0.2,0.95,0.25,1) 0.6s forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scroll-bounce': 'scrollBounce 1.8s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
