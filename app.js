'use strict';

const path = require('path');
const getByPath = require('lodash.get');
const setByPath = require('lodash.set');
const is = require('is-type-of');
const utils = require('./lib/utils');

module.exports = app => {
  if (app.config.env === 'prod') {
    app.coreLogger.error('[egg-development-stub] not allow to stub at prod mode.');
    return;
  }

  process.nextTick(() => {
    const mapping = app.config.stub.mapping;

    function log(type, objPaths, filePath) {
      app.coreLogger.warn('[egg-development-stub] stub `ctx.%s.%s` by %s', type, objPaths.join('.'), path.relative(app.config.baseDir, filePath));
    }

    // load stub files and inject
    new app.loader.FileLoader({
      directory: path.join(app.config.baseDir, 'app/stub'),
      call: false,
      caseStyle: 'lower',
      override: true,
      target: {},
      inject: app,
      initializer(stubExports, { path: filePath, pathName }) {
        // stub.service.xx -> serviceClasses.xx
        const filePaths = pathName.split('.').slice(1);
        const type = filePaths[0];
        filePaths[0] = mapping[type];

        // get target class -> app.serviceClasses.xx -> ctx.service.xx
        const targetClass = getByPath(app, filePaths);
        if (!targetClass) return;
        log(type, filePaths.slice(1), filePath);

        if (is.class(targetClass)) {
          if (is.function(stubExports)) {
            /**
             * stub is function-style:
             * @example
             * ```js
             *   module.exports = (app, clz) => class StubClass extends clz {
             *     * echo(...args) {
             *       return yield super.echo(...args);
             *     }
             *   }
             * ```
             */
            // replace origin class to stub subclass
            setByPath(app, filePaths, stubExports(app, targetClass));
          } else {
            // stubExports is `exports.xx = () => {}`
            class StubClass extends targetClass {
              constructor(...args) {
                super(...args);
                utils.stub(this, stubExports);
              }
            }
            // replace origin class to stub subclass
            setByPath(app, filePaths, StubClass);
          }
        } else {
          // target class is exports mode
          // support stub style: `module.exports = (app) => { echo: function *(){}, ... }`
          if (is.function(stubExports)) {
            stubExports = stubExports(app);
          }
          utils.stub(targetClass, stubExports);
        }
      },
    }).load();
  });
};
