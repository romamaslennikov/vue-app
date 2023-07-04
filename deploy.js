require('dotenv').config({ path: '.env.local' })
const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

const {
  DEPLOY_USER,
  DEPLOY_PASS,
  DEPLOY_HOST,
} = process.env;

const config = {
  user: DEPLOY_USER,
  password: DEPLOY_PASS,
  host: DEPLOY_HOST,
  port: 21,
  localRoot: `${__dirname}/dist`,
  remoteRoot: '/www/',
  include: ['*', '**/*'],
  exclude: [
    'dist/**/*.map',
    'node_modules/**',
    'node_modules/**/.*',
    '.git/**',
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
};

ftpDeploy.deploy(config);

ftpDeploy.on('uploading', (data) => {
  console.log(data.totalFilesCount);
  console.log(data.transferredFileCount);
  console.log(data.filename);
});

ftpDeploy.on('upload-error', (data) => {
  console.log(data.err);
});
