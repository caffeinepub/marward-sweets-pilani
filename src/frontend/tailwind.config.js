import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                terracotta: {
                    50: 'oklch(var(--terracotta-50))',
                    100: 'oklch(var(--terracotta-100))',
                    200: 'oklch(var(--terracotta-200))',
                    300: 'oklch(var(--terracotta-300))',
                    400: 'oklch(var(--terracotta-400))',
                    500: 'oklch(var(--terracotta-500))',
                    600: 'oklch(var(--terracotta-600))',
                    700: 'oklch(var(--terracotta-700))',
                    800: 'oklch(var(--terracotta-800))',
                    900: 'oklch(var(--terracotta-900))',
                },
                marigold: {
                    50: 'oklch(var(--marigold-50))',
                    100: 'oklch(var(--marigold-100))',
                    200: 'oklch(var(--marigold-200))',
                    300: 'oklch(var(--marigold-300))',
                    400: 'oklch(var(--marigold-400))',
                    500: 'oklch(var(--marigold-500))',
                    600: 'oklch(var(--marigold-600))',
                    700: 'oklch(var(--marigold-700))',
                    800: 'oklch(var(--marigold-800))',
                    900: 'oklch(var(--marigold-900))',
                },
                sand: {
                    50: 'oklch(var(--sand-50))',
                    100: 'oklch(var(--sand-100))',
                    200: 'oklch(var(--sand-200))',
                    300: 'oklch(var(--sand-300))',
                    400: 'oklch(var(--sand-400))',
                    500: 'oklch(var(--sand-500))',
                    600: 'oklch(var(--sand-600))',
                    700: 'oklch(var(--sand-700))',
                    800: 'oklch(var(--sand-800))',
                    900: 'oklch(var(--sand-900))',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
