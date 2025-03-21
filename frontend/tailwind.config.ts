import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#17E4A3",
        background: "#0A0F1D",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#17E4A3",
          foreground: "#0A0F1D",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          foreground: "#0A0F1D",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          foreground: "rgba(255, 255, 255, 0.5)",
        },
        accent: {
          DEFAULT: "#17E4A3",
          foreground: "#0A0F1D",
        },
        popover: {
          DEFAULT: "#0A0F1D",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#FFFFFF",
        },
        // Custom colors for mint.ai theme
        mint: {
          primary: "#0A0F1D",
          secondary: "#04070E",
          accent: "#17E4A3",
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(10, 15, 29, 0.7)',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, #0A0F1D, #04070E)',
        'gradient-accent': 'linear-gradient(90deg, #17E4A3 0%, #11A7E1 100%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      letterSpacing: {
        wider: '0.05em',
        widest: '0.1em',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(23, 228, 163, 0.5), 0 0 20px rgba(23, 228, 163, 0.3)' },
          '50%': { boxShadow: '0 0 15px rgba(23, 228, 163, 0.6), 0 0 25px rgba(23, 228, 163, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse": "pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config; 