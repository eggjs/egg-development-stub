'use strict';
module.exports = app => {
  class ModService extends app.Service {
    test() {
      return 'origin mod';
    }
  }
  return ModService;
};
