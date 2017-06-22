'use strict';

module.exports = app => {
  return {
    echo() {
      return 'stub fn: ' + app.config.name;
    },
  };
};
