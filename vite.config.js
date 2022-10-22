/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath, URL } from 'node:url';
import vitePrerender from 'vite-plugin-prerender';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import extraScripts from './extra-scripts';

const Prerender = vitePrerender.PuppeteerRenderer;

export default defineConfig({
  // base: process.env.NODE_ENV === 'production'
  //   ? '/dixy_rules_2022/'
  //   : '/',

  server: {
    host: '0.0.0.0',
    port: 8080,
  },

  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
          @import "@/styles/global"
        `,
      },
    },
  },

  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          video: ['src', 'poster'],
          source: ['src'],
          img: ['src'],
          image: ['xlink:href', 'href'],
          use: ['xlink:href', 'href'],
          'v-lazy-image': ['src', 'srcset'],
          VImg: ['src', 'srcset'],
        },
      },
    }),
    eslintPlugin({
      fix: true,
      include: '/.(js|ts|vue)$/',
    }),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
        minifyCSS: true,
      },
      renderer: new Prerender({
        // Optional - The name of the property to add to the window object with the contents of `inject`.
        injectProperty: 'PRERENDER_INJECTED',

        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
        inject: {
          foo: 'bar',
        },

        // Optional - Wait to render until the specified event is dispatched on the document.
        // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
        renderAfterDocumentEvent: 'custom-render-trigger',

        // Optional - Wait to render until the specified element is detected using `document.querySelector`
        renderAfterElementExists: '.content',
      }),
      postProcess(context) {
        const c = context;
        const bodyEnd = c.html.indexOf('</body>');
        c.html = c.html.substr(0, bodyEnd) + extraScripts + c.html.substr(bodyEnd);

        return c;
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
    },
  },
});
