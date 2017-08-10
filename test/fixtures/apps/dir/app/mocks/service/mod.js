'use strict';
module.exports = (app, clz) => {
  class ModStubService extends clz {
    test() {
      return 'stub mod + ' + super.test();
    }
  }
  return ModStubService;
};
