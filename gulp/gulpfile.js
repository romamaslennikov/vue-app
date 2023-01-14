//= ============================================
//               DEPENDENCIES
//= ============================================

/**
 * Load required dependencies.
 */

const runTimestamp = Math.round(Date.now() / 1000);
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

/**
 * Declare variables that are use in gulpfile.js
 */

const src = '../src/'; // development
const fontName = 'Icons'; // name icons font
const cssClassPrefix = 'i_'; // class for font icons

//= ============================================
//               DECLARE PATHS
//= ============================================

const paths = {
  app: src,
  scss: `${src}styles/**/*.s+(a|c)ss`,
  scssDir: `${src}styles/`,
  scssDirGeneric: `${src}styles/generic/`,
  pngForSprite: `${src}assets/images/png-to-sprite/**/*.png`,
  iconsForSpriteDir: `${src}assets/images/png-to-sprite/`,
  img: `${src}assets/images/**/*.{png,gif,jpg,jpeg,svg,ico,mp4,webp}`,
  imgPublic: 'public/resource/**/*.{png,jpg,jpeg}',
  imgDir: `${src}assets/images/`,
  imgPublicDir: 'public/resource/',
  svgForFont: `${src}assets/images/svg-to-font/**/*.svg`,
  svgForFontDir: `${src}assets/images/svg-to-font/`,
  fonts: `${src}assets/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
  fontsDir: `${src}assets/fonts/`,
  fontsForConvert: `${src}assets/fonts/.tmp/*.{ttf,otf}`,
};

//= ============================================
//               UTILS FUNCTIONS
//= ============================================

const notifyOnError = () => plugins.notify.onError({
  message: 'Error: <%= error.message %>',
  sound: true,
});

//= ============================================
//                  TASKS
//= ============================================

/*
 * Create sprite
 * */

function spritePng() {
  const spriteData = gulp.src(paths.pngForSprite)
    .pipe(plugins.spritesmith({
      // retinaSrcFilter: paths.iconsForSpriteDir+'*@2x.png',
      imgName: '../images/sprite.png',
      // retinaImgName: '../img/sprite@2x.png',
      cssName: '_sprite.sass',
      cssTemplate: './_sprite_template.css.tmpl',
      padding: 2,
      algorithm: 'top-down',
      algorithmOpts: { sort: false },
    }))
    .on('error', notifyOnError());

  spriteData.img
    .pipe(gulp.dest(paths.imgDir));

  spriteData.css
    .pipe(gulp.dest(paths.scssDirGeneric));

  return spriteData;
}

exports.spritePng = spritePng;

/*
 * Create icons font
 * */

function iconfont() {
  return gulp.src(paths.svgForFont)
    .pipe(plugins.iconfontCss({
      fontName,
      cssClass: cssClassPrefix,
      path: './_icons_template.css.tmpl',
      targetPath: '../../styles/generic/_icons.scss',
      fontPath: '../assets/fonts/',
    }))
    .on('error', notifyOnError())
    .pipe(plugins.iconfont({
      fontName,
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
    .on('error', notifyOnError())
    .pipe(gulp.dest(paths.fontsDir));
}

exports.iconfont = iconfont;

/*
 * Create web fonts
 * */

function fontgen() {
  return gulp.src(paths.fontsForConvert)
    .pipe(plugins.fontgen({
      dest: paths.fontsDir,
      css_fontpath: '../assets/fonts',
    }))
    .on('error', notifyOnError());
}

function fontgenConcatCss() {
  return gulp.src(`${paths.fontsDir}*.css`)
    .pipe(plugins.concat('_font-face.scss'))
    .pipe(gulp.dest(paths.scssDirGeneric));
}

function fontgenRemove() {
  return gulp.src(`${paths.fontsDir}*.css`)
    .pipe(plugins.clean());
}

exports.fonts = gulp.series(fontgen, fontgenConcatCss, fontgenRemove);
