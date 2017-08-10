'use strict';

exports.promise = (...args) => Promise.resolve('stub clz promise: ' + args.join(','));

exports.generator = function* (...args) { return 'stub clz generator: ' + args.join(','); };

exports.fn = (...args) => 'stub clz fn: ' + args.join(',');

exports.obj = {};
