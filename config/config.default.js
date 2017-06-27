'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  /**
   * egg-development-stub default config
   * @member Config#stub
   * @property {String} dir - stub files root dir
   * @property {Object} mapping - stub target mapping
   */
  config.stub = {
    dir: path.join(appInfo.baseDir, 'stub'),
    mapping: {
      service: 'serviceClasses',
      grpc: 'grpcClasses',
    },
  };
  return config;
};
