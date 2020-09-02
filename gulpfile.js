//= ============================================
//               DEPENDENCIES
//= ============================================

/**
 * Load required dependencies.
 */

const runTimestamp = Math.round(Date.now() / 1000);
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const moment = require('moment');
const GulpSSH = require('gulp-ssh');
const shell = require('gulp-shell');
const fs = require('fs');
require('dotenv')
  .config();

/**
 * Declare variables that are use in gulpfile.js
 */

const src = 'src/'; // development
const fontName = 'Icons'; // name icons font
const cssClassPrefix = 'i_'; // class for font icons

const archiveName = 'deploy.tgz';
const timestamp = moment()
  .format('YYYYMMDDHHmmssSSS');
const buildPath = './dist';
const rootPath = process.env.VUE_APP_NODE_ENV === 'production' ? '' : '/root/smart_login_vue/';
const releasesPath = `${rootPath}releases/`;
const symlinkPath = `${rootPath}current`;
const releasePath = releasesPath + timestamp;
let gulpSSH;

//= ============================================
//               DECLARE PATHS
//= ============================================

const paths = {
  app: src,
  scss: `${src}styles/**/*.s+(a|c)ss`,
  scssDir: `${src}styles/`,
  scssDirGeneric: `${src}styles/generic/`,
  pngForSprite: `${src}assets/images/png-for-sprite/**/*.png`,
  iconsForSpriteDir: `${src}assets/images/png-for-sprite/`,
  img: `${src}assets/images/**/*.{png,gif,jpg,jpeg,svg,ico,mp4,webp}`,
  imgPublic: 'public/resource/**/*.{png,jpg,jpeg}',
  imgDir: `${src}assets/images/`,
  imgPublicDir: 'public/resource/',
  svgForFont: `${src}assets/images/svg-for-font/**/*.svg`,
  svgForSprite: `${src}assets/images/svg-for-sprite/**/*.svg`,
  svgForFontDir: `${src}assets/images/svg-for-font/`,
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
 * Create webp images
 * */

function webp() {
  return gulp.src(paths.img)
    .pipe(plugins.webp({
      quality: 100,
      method: 6,
      lossless: true,
    }))
    .on('error', notifyOnError())
    .pipe(gulp.dest(paths.imgDir));
}

function webpPublic() {
  return gulp.src(paths.imgPublic)
    .pipe(plugins.webp({
      quality: 100,
      method: 6,
      lossless: true,
    }))
    .on('error', notifyOnError())
    .pipe(gulp.dest(paths.imgPublicDir));
}

exports.webp = webp;

exports.webpPublic = webpPublic;

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
      cssTemplate: './template-icons/_sprite_template.css.tmpl',
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
 * Create svg sprite
 * */

function spriteSvg() {
  return gulp.src(paths.svgForSprite)
    .pipe(plugins.svgstore())
    .pipe(plugins.rename('sprite.svg'))
    .pipe(gulp.dest(paths.imgDir));
}

exports.spriteSvg = spriteSvg;

/*
 * Create icons font
 * */

function iconfont() {
  return gulp.src(paths.svgForFont)
    .pipe(plugins.iconfontCss({
      fontName,
      cssClass: cssClassPrefix,
      path: './template-icons/_icons_template.css.tmpl',
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

/**
 * Deploy
 */

function deployCompress() {
  return (async () => (shell.task(`tar -czvf ./${archiveName} --directory=${buildPath} .`))())();
}

function deployPrepare() {
  const config = {
    host: process.env.VUE_APP_NODE_ENV === 'production' ? process.env.HOST_DEPLOY : process.env.HOST_DEPLOY_DEV,
    port: 22,
    username: process.env.VUE_APP_NODE_ENV === 'production' ? process.env.USERNAME : process.env.USERNAME_DEV,
    privateKey: fs.readFileSync(process.env.SSH_AUTH),
  };

  return (async () => {
    gulpSSH = new GulpSSH({
      ignoreErrors: false,
      sshConfig: config,
    });

    gulpSSH.exec(`cd ${releasesPath} && mkdir ${timestamp}`);
  })();
}

function deployUpload() {
  return gulp.src(archiveName)
    .pipe(gulpSSH.sftp('write', `${releasePath}/${archiveName}`));
}

function deployUncompress() {
  return (async () => gulpSSH.exec(`cd ${releasePath} && tar -xzvf ${archiveName}`))();
}

function deploySymlink() {
  return (async () => gulpSSH.exec(`rm -r ${symlinkPath} && ln -s ${releasePath} ${symlinkPath}`))();
}

function deployClean() {
  return (async () => (shell.task(`rm ${archiveName}`, { ignoreErrors: true }))())();
}

exports.deploy = gulp.series(deployCompress, deployPrepare, deployUpload,
  deployUncompress, deploySymlink, deployClean);
