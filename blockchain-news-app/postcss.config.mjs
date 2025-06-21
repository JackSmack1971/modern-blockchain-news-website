const config = {
  plugins: process.env.SKIP_POSTCSS ? [] : ['@tailwindcss/postcss'],
};

export default config;
