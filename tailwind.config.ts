import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "tvg-forest": "#082820",
                "tvg-cream": "#fcf7f0",
                "tvg-green": "#016F4E",
                "tvg-teal": "#01A072",
                "tvg-orange": "#E55A2B",
                "tvg-sky": "#038BC8",
                "tvg-muted-teal": "#368686",
                "tvg-deep-blue": "#045277",
            },
            fontFamily: {
                sans: ["var(--font-poppins)"],
                mono: ["var(--font-space-mono)"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
