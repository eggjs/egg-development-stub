'use strict';
module.exports = app => {
  class TestService extends app.Service {
    echo() {
      return 'origin fn';
    }
  }
  return TestService;
};
