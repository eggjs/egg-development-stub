'use strict';

exports.echo = (...args) => Promise.resolve('stub deep: ' + args.join(','));
