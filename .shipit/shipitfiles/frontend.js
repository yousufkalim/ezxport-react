// Init
const config = require('../config');
const os = require('os');
const osTmpDir = os.tmpdir();
let end = 'frontend';
let environment;

module.exports = shipit => {
  // Load shipit tasks
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  environment = shipit.environment;

  //   Shipit configuration
  shipit.initConfig({
    default: {
      deployTo: `/root/${config.appName}/${environment}/`,
      repositoryUrl: config.frontendRepoUrl,
      branch: 'main',
      keepReleases: 3,
      shallowClone: true
    },
    ...config.servers
  });
  shipit.config.deployTo = shipit.config.deployTo + end;

  // Our listeners and tasks will go here
  shipit.on('fetched', () => {
    shipit.start('build');
  });

  shipit.blTask('build', async () => {
    await shipit.local(`yarn install`, {
      cwd: shipit.workspace
    });

    await shipit.local(`yarn run build`, {
      cwd: shipit.workspace
    });

    const tmpDir = `${osTmpDir}/${shipit.config.deployTo.split('/').join('')}`;
    await shipit.local(
      `mkdir -p ${tmpDir} && mv build/* ${tmpDir} && rm -rf * && mv ${tmpDir}/* . && rmdir ${tmpDir}`,
      {
        cwd: shipit.workspace
      }
    );
  });

  shipit.on('updated', () => {
    shipit.start('copy-config');
  });

  shipit.blTask('copy-config', async () => {
    // Creating nginx file on server
    await shipit.copyToRemote(
      `.shipit/config/nginx/${environment}.nginx`,
      `/etc/nginx/sites-available/${config.appName}-${environment}.conf`,
      {
        rsync: '--rsync-path="sudo rsync"'
      }
    );
    await shipit.remote(`sudo systemctl restart nginx`);
  });
};
