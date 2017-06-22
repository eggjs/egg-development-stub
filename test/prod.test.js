'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/prod.test.js', () => {
  let app;
  before(() => {
    mm.env('prod');
    app = mm.app({
      baseDir: 'apps/prod',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should not stub', function* () {
    const ctx = app.mockContext();
    assert(ctx.service.test.echo() === 'origin fn');
  });
});
