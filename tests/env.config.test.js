import assert from 'node:assert/strict';
import test from 'node:test';

const originalPort = process.env.PORT;
const originalNodeEnv = process.env.NODE_ENV;

test('env config usa valores por defecto cuando no hay variables cargadas', async () => {
  delete process.env.PORT;
  delete process.env.NODE_ENV;

  const { env } = await import('../src/config/env.config.js?test=env-defaults');

  assert.equal(env.port, 8080);
  assert.equal(env.nodeEnv, 'development');
});

process.env.PORT = originalPort;
process.env.NODE_ENV = originalNodeEnv;
