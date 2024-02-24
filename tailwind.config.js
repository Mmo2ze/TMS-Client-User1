module.exports = {
    content: [
        './src/**/*.{html,ts}',
        './node_modules/flowbite/**/*.js', // add this line
    ],
    theme: {
        extend: {
            ringColor: {
                DEFAULT: 'transparent',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
    darkMode: 'class',
}
