module.exports = {
  appName: 'ezxport',
  frontendRepoUrl: 'git@github.com:falconitconsultant/ezexport-react.git',
  servers: {
    prod: {
      servers: 'falcon@ec2-13-37-212-74.eu-west-3.compute.amazonaws.com',
      key: 'path_to_ssh_key',
      deployTo: '/home/falcon/ezxport/prod/'
    }
  }
};
