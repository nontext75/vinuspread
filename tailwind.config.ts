import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f172a', // Slate-900 base
                foreground: '#f8fafc', // Slate-50
                card: {
                    DEFAULT: '#1e293b', // Slate-800
                    foreground: '#f8fafc'
                },
                popover: {
                    DEFAULT: '#0f172a',
                    foreground: '#f8fafc'
                },
                primary: {
                    DEFAULT: '#f8fafc',
                    foreground: '#0f172a'
                },
                secondary: {
                    DEFAULT: '#1e293b',
                    foreground: '#f8fafc'
                },
                muted: {
                    DEFAULT: '#334155', // Slate-700
                    foreground: '#94a3b8' // Slate-400
                },
                accent: {
                    DEFAULT: '#334155',
                    foreground: '#f8fafc'
                },
                destructive: {
                    DEFAULT: '#ef4444',
                    foreground: '#f8fafc'
                },
                border: '#334155',
                input: '#334155',
                ring: '#cbd5e1',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            fontFamily: {
                sans: ['Pretendard', 'Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [],
};
export default config;
