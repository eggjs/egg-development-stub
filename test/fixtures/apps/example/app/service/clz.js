'use strict';

module.exports = app => {
  class ClzService extends app.Service {
    * generator() {
      return 'origin clz';
    }

    promise() {
      return Promise.resolve('origin clz');
    }

    fn() {
      return 'origin clz';
    }

    * real(...args) {
      return 'not override: ' + args.join(',');
    }

    * empty() {
      return 'origin empty';
    }

    * obj() {
      return 'origin obj';
    }
  }
  return ClzService;
};
