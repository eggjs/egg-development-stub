'use strict';

exports.echo = (...args) => Promise.resolve('stub normal exports: ' + args.join(','));

exports.not = () => Promise.resolve('should not load');
