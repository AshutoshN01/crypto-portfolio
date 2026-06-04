module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#14161C',
        primary: '#FF7AC3',
        accent: '#B8FF72',
        support: '#A68CFF',
        text: '#FFFFFF',
        muted: '#A0A6B3'
      },
      borderRadius: { sm: '6px', md: '12px', lg: '18px' },
      boxShadow: { card: '0 6px 18px rgba(0,0,0,0.55)' }
    }
  },
  plugins: []
}
