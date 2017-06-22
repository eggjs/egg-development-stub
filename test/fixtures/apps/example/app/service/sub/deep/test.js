'use strict';

exports.echo = (...args) => Promise.resolve('origin deep: ' + args.join(','));
