'use strict';

const SDK = require('../');
const backend = require('./helpers/backend');

const sinon = require('sinon');

describe('query', () => {

  let sdk;
  let server;

  beforeEach((done) => {
    server = backend();
    server.start((err, address) => {
      sdk = SDK({
        url: address
      });
      done(err);
    });
  });

  afterEach(() => {
    server.stop();
  });

  it('emits a `result` event for each result', (done) => {
    const stub = sinon.stub();
    const q = sdk.query()
      .on('result', stub)
      .on('end', () => {
        expect(stub.callCount).to.equal(3);
        done();
      });

    server.emit(q.id, 'result', { data: { result: 1 } });
    server.emit(q.id, 'result', { data: { result: 2 } });
    server.emit(q.id, 'result', { data: { result: 3 } });
    server.emit(q.id, 'end');
  });

  it('passes `data` from each result event to `result` event as argument', (done) => {
    const stub = sinon.stub();
    const q = sdk.query()
      .on('result', stub)
      .on('end', () => {
        expect(stub.getCall(0).args[0]).to.deep.equal({ result: 1 });
        expect(stub.getCall(1).args[0]).to.deep.equal({ result: 2 });
        expect(stub.getCall(2).args[0]).to.deep.equal({ result: 3 });
        done();
      });

    server.emit(q.id, 'result', { data: { result: 1 } });
    server.emit(q.id, 'result', { data: { result: 2 } });
    server.emit(q.id, 'result', { data: { result: 3 } });
    server.emit(q.id, 'end');
  });

  it('emits a `timeout` event if no `end` event is received within 30 seconds', (done) => {
    const clock = sinon.useFakeTimers();
    const q = sdk.query()
      .on('timeout', () => {
        clock.restore();
        done();
      })
      .on('end', () => {
        done(new Error('should not be called'));
      });

    clock.tick(31000);
    server.emit(q.id, 'end');
  });

  it('emits a `timeout` event if no `end` event is received within the configured tiemout for that request', (done) => {
    const clock = sinon.useFakeTimers();
    const q = sdk.query({}, { timeout: 10 })
      .on('timeout', () => {
        clock.restore();
        done();
      })
      .on('end', () => {
        done(new Error('should not be called'));
      });

    clock.tick(11000);
    server.emit(q.id, 'end');
  });

  it('does not emit a `timeout` event if `end` event is received within the configured timeout for that request', (done) => {
    const q = sdk.query({})
      .on('timeout', () => {
        done(new Error('should not be called'));
      })
      .on('end', () => {
        done();
      });

    server.emit(q.id, 'end');
  });

  it('emits an error event if no providers are able to handle the query', (done) => {
    // setting `handle` param to false will make the mock provider not handle the query
    // see ./test/helpers/backend.js
    const q = sdk.query({ handle: false })
      .on('error', (e) => {
        done();
      })
      .on('end', () => {
        done(new Error('should not be called'));
      });

    server.emit(q.id, 'end');
  });

});
