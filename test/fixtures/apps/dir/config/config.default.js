'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.keys = '123456';

  config.stub = {
    dir: path.join(appInfo.baseDir, 'app/mocks'),
  };

  return config;
};
