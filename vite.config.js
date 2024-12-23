/* eslint-disable import/no-extraneous-dependencies */
// import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import vitePrerender from 'vite-plugin-prerender';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import extraScripts from './scripts/extra-scripts';

const Prerender = vitePrerender.PuppeteerRenderer;

const config = ({ env }) =>
  defineConfig({
    // base: env.NODE_ENV === 'production'
    //   ? '/dixy_rules_2022/'
    //   : '/',

    server: {
      host: '0.0.0.0',
      port: 8080,
    },

    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern',
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
          additionalData: `
            @import "@/styles/global"
          `,
        },
        scss: {
          api: 'modern',
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
          additionalData: `
            @import "@/styles/global";
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
            'v-img': ['src', 'srcset', 'avif', 'webp'],
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
          injectProperty: 'PRERENDER_INJECTED',
          inject: {
            foo: 'bar',
          },
          renderAfterDocumentEvent: 'custom-render-trigger',
          renderAfterElementExists: '.content',
          executablePath: env?.VITE_PATH_TO_CHROME || '',
        }),
        postProcess(context) {
          const c = context;
          const bodyEnd = c.html.indexOf('</body>');
          c.html = c.html.substring(0, bodyEnd) + extraScripts + c.html.substring(bodyEnd);

          return c;
        },
      }),

      // VitePWA({
      //   registerType: 'autoUpdate',
      //   mode: 'development',
      //   base: '/',
      //   includeAssets: ['favicon.icon'],
      //   manifest: {
      //     name: 'Название проекта',
      //     short_name: 'Название',
      //     theme_color: '#ffffff',
      //     icons: [
      //       {
      //         src: 'pwa-192x192.png', // <== don't add slash, for testing
      //         sizes: '192x192',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/pwa-512x512.png', // <== don't remove slash, for testing
      //         sizes: '512x512',
      //         type: 'image/png',
      //       },
      //       {
      //         src: 'pwa-512x512.png', // <== don't add slash, for testing
      //         sizes: '512x512',
      //         type: 'image/png',
      //         purpose: 'any maskable',
      //       },
      //     ],
      //   },
      //   devOptions: {
      //     enabled: true,
      //     type: 'module',
      //     navigateFallback: 'index.html',
      //   },
      //   workbox: {
      //     globPatterns: ['**/*.{js,css,html,png,webp,avif,jpg,jpeg,svg,woff,woff2,ttf,vue,json}'],
      //   },
      // }),
    ],

    build: {
      assetsInlineLimit: 0,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      },
    },
  });

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const { env } = process;

  return config({ env });
};
