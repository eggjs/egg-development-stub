'use strict';
const is = require('is-type-of');
const co = require('co');

exports.callFn = function* (fn, args) {
  args = args || /* istanbul ignore next */ [];
  /* istanbul ignore next */
  if (!is.function(fn)) return;
  if (is.generatorFunction(fn)) {
    return yield fn(...args);
  }
  const r = fn(...args);
  if (is.promise(r)) {
    return yield r;
  }
  return r;
};

exports.wrapFn = function(originFn, stubFn) {
  // generator, function, async function
  return co.wrap(function* (...args) {
    let result = yield exports.callFn(stubFn, args);
    // if stubFn return undefined, call origin fn again
    if (result === undefined) {
      result = yield exports.callFn(originFn, args);
    }
    return result;
  });
};

exports.stub = function(target, stubExports) {
  Object.keys(stubExports).forEach(key => {
    const originFn = target[key];
    const stubFn = stubExports[key];
    if (is.function(originFn) && is.function(stubFn)) {
      target[key] = exports.wrapFn(originFn, stubFn);
    }
  });
};
