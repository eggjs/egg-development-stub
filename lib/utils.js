'use strict';

const is = require('is-type-of');

exports.stub = function(target, stubExports) {
  Object.keys(stubExports).forEach(key => {
    const originFn = target[key];
    const stubFn = stubExports[key];
    if (is.function(originFn) && is.function(stubFn)) {
      target[key] = stubFn;
    }
  });
};
