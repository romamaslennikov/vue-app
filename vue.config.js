const PrerenderSpaPlugin = require('prerender-spa-plugin');
const path = require('path');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  const Prerender = new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/'],
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      injectProperty: 'PRERENDER_INJECTED',
      inject: {
        foo: 'bar',
      },
    }),
  });

  plugins.push(Prerender);
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //  ? '/models/T6-1/'
  //   : '/',

  // devServer: {
  //   https: true,
  // },

  productionSourceMap: false,

  configureWebpack: {
    plugins,

    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '~': path.resolve(__dirname, 'src/'),
        '@': path.resolve('src/'),
        modernizr$: path.resolve(__dirname, '.modernizrrc'),
      },
    },
  },

  chainWebpack(config) {
    /*
       Disable (or customize) prefetch, see:
       https://cli.vuejs.org/guide/html-and-static-assets.html#prefetch
    */
    config.plugins.delete('prefetch');

    /*
       Configure preload to load all chunks
       NOTE: use `allChunks` instead of `all` (deprecated)
    */
    config.plugin('preload').tap((options) => {
      const o = options;
      o[0].include = 'allChunks';
      return o;
    });

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          ...options.compilerOptions,
          preserveWhitespace: true,
        },
      }));

    config.module
      .rule('modernizr')
      .test(/\.modernizrrc$/)
      .use('webpack-modernizr-loader')
      .loader('webpack-modernizr-loader');

    config.optimization.minimizer('terser').tap((args) => {
      const a = args;
      a[0].terserOptions.compress.drop_console = true;
      return a;
    });
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/vars/variables.sass"; @import "~@/styles/mixins/mixins.sass";',
      },
    },
  },
};
