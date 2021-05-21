/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', },
    src: { url: '/build' },
  },
  alias: {
    "shared": "./src/shared",
    "client": "./src/client",
    "server": "./src/server"
  },
  plugins: [
    '@snowpack/plugin-webpack',
    '@snowpack/plugin-react-refresh'
  ],
  optimize: {
    bundle: true,
    minify: true,
    //preload: true,
    splitting: true,
    treeshake: true,
    target: 'es2018',
  },
};