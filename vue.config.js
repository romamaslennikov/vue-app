const { defineConfig } = require('@vue/cli-service');
const PrerenderSpaPlugin = require('prerender-spa-plugin-next');
const path = require('path');
const extraScripts = require('./extra-scripts');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  const Prerender = new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/', '/about'],
    rendererOptions: {
      injectProperty: 'PRERENDER_INJECTED',
      inject: {
        foo: 'bar',
      },
    },
    postProcess(context) {
      const c = context;
      const bodyEnd = c.html.indexOf('</body>');
      c.html = c.html.substr(0, bodyEnd) + extraScripts + c.html.substr(bodyEnd);

      return c;
    },
  });

  plugins.push(Prerender);
}

module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === 'production'
  //  ? '/models/T6-1/'
  //   : '/',

  // devServer: {
  //   https: true,
  // },

  transpileDependencies: true,

  productionSourceMap: false,

  configureWebpack: {
    plugins,
  },

  chainWebpack(config) {
    config.optimization.minimizer('terser').tap((args) => {
      const a = args;
      a[0].terserOptions.compress.drop_console = true;
      return a;
    });
  },

  css: {
    loaderOptions: {
      sass: {
        // Вставит sass-стили в каждый компонент
        additionalData: `
          @import "@/styles/global.sass"
        `,
      },
    },
  },
});
