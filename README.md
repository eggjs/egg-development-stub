# egg-development-stub

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-development-stub.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-development-stub
[travis-image]: https://img.shields.io/travis/eggjs/egg-development-stub.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-development-stub
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-development-stub.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-development-stub?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-development-stub.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-development-stub
[snyk-image]: https://snyk.io/test/npm/egg-development-stub/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-development-stub
[download-image]: https://img.shields.io/npm/dm/egg-development-stub.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-development-stub

Stub class like service/grpc etc.. for develop purpose.

## Install

```bash
$ npm i egg-development-stub --save-dev
```

## Usage

```js
// {app_root}/config/plugin.local.js
exports.stub = {
  enable: true,
  package: 'egg-development-stub',
};
```

> Only use at not-production mode, will skip to `prod`.
> Recommand to hook at `plugin.local.js`.

## Configuration

Support stub `service/grpc` by default, you can config `mapping` to others.

```js
// {app_root}/config/config.default.js
config.stub = {
  // stub files root dir
  // dir: path.join(appInfo.baseDir, 'stub'),

  // stub target mapping
  // mapping: {
  //  service: 'serviceClasses',
  //  grpc: 'grpcClasses',
  // },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

Origin Service:

```js
// app/service/test.js
module.exports = app => {
  class TestService extends app.Service {
    echo() {
      return 'origin fn';
    }
  }
  return TestService;
};
```

In general, you can stub with commonjs exports:

```js
// app/stub/service/test.js
exports.echo = () => 'stub fn';

// or
module.exports = app => {
  return {
    echo: () => app.config.name;
  }
}
```

**Advanced usage**: stub with sub class, so you can custom your logic.

```js
// app/stub/service/test.js
module.exports = (app, TargetClass) => {
  return StubClass extends TargetClass {
    echo() {
      return 'stub: ' + super.echo();
    }
  }
}
```

> Note: SubClass mode don't support origin service use commonjs style.


## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
