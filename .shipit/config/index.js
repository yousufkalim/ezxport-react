module.exports = {
  appName: 'ezxport',
  frontendRepoUrl: 'git@github.com:Ezxport-Inc/ezxport-web-app.git',
  servers: {
    prod: {
      servers: 'falcon@ec2-13-37-212-74.eu-west-3.compute.amazonaws.com',
      key: '/home/florentmenus/.ssh/id_rsa',
      deployTo: '/home/falcon/ezxport/prod/'
    },
    staging: {
      servers: 'falcon@ec2-13-37-212-74.eu-west-3.compute.amazonaws.com',
      key: '/home/florentmenus/.ssh/id_rsa',
      deployTo: '/home/falcon/ezxport/staging/'
    }
  }
};
