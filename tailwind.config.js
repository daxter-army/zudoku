// tailwind.config.js
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                limeGreen: '#32CD32',
                coral: '#FF7F50'
            },
        },
    },
    plugins: [],
}