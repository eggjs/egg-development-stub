'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/dir.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/dir',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should support change dir', function* () {
    const ctx = app.mockContext();

    assert(!ctx.not);
    assert(!ctx.service.not);
    assert(!ctx.service.normal.not);

    assert((yield ctx.service.clz.promise('a', 'b', 'c')) === 'stub clz promise: a,b,c');
    assert((yield ctx.service.clz.generator('a', 'b', 'c')) === 'stub clz generator: a,b,c');
    assert(ctx.service.clz.fn('a', 'b', 'c') === 'stub clz fn: a,b,c');

    assert((yield ctx.service.clz.real('a', 'b', 'c')) === 'not override: a,b,c');
    assert((yield ctx.service.clz.obj()) === 'origin obj');

    assert((yield ctx.service.sub.deep.test.echo('a', 'b', 'c')) === 'stub deep: a,b,c');
    assert((yield ctx.service.normal.echo('a', 'b', 'c')) === 'stub normal exports: a,b,c');
    assert((yield ctx.service.normal.real('a', 'b', 'c')) === 'origin normal not override: a,b,c');

    assert(ctx.service.fn.echo() === 'stub fn: example');

    assert(ctx.service.mod.test() === 'stub mod + origin mod');
  });
});
