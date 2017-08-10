'use strict';

exports.echo = (...args) => Promise.resolve('origin normal exports: ' + args.join(','));

exports.real = function* (...args) { return 'origin normal not override: ' + args.join(','); };
