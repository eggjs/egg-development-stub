'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/grpc.test.js', () => {
  let app;
  let ctx;
  let client;
  before(function* () {
    app = mm.app({ baseDir: 'apps/grpc' });
    yield app.ready();
    ctx = app.mockContext();
    client = ctx.grpc.example.test;
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should echo', function* () {
    const result = yield client.echo({ id: 1, userName: 'grpc' });
    assert(result === 'abc');
  });

  it('should not stub', function* () {
    const error = yield client.sayHi({ id: 1, userName: 'grpc' }).catch(err => err);
    assert(error.message.includes('Connect Failed'));
  });
});
