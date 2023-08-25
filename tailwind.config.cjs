/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                gray: 'var(--color-gray)',
                grayIcon: 'var(--color-gray-icon)',
                strokeGray: 'var(--color-stroke-gray)',
                alertStrRose: 'var(--color-alert-str-rose)',
                green: 'var(--color-green)',
                red: 'var(--color-red)',
                warn: 'var(--color-warn)',
                borderWarn: 'var(--color-border-warn)',
                grayBlack: 'var(--color-grayBlack)',
                alertStrRoseOpacity: 'var(--color-alert-str-rose-opacity)',
                redIcon: 'var(--color-red-icon)',
                grayLabel: 'var(--color-gray-label)',
                blueFooter: 'var(--color-blue-footer)',
                link: 'var(--color-link)',
            },
            container: {
                center: true,
                screens: {
                    xl: '1280px',
                    // '2xl': '1280px',
                },
                padding: {
                    DEFAULT: '10px',
                    md: '20px',
                    lg: '30px',
                },
            },
        },
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
            square: 'square',
            roman: 'upper-roman',
            circle: 'circle',
            georgian: 'georgian',
            kannada: 'kannada',
            'trad-chinese-informal': 'trad-chinese-informal',
        },
    },
    layer: {
        components: true,
    },
    plugins: [],
};
