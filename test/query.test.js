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

  describe('results', () => {

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

    it('parallel queries emit events only for their own results', (done) => {
      const stub1 = sinon.stub();
      const q1 = sdk.query()
        .on('result', stub1)
      const stub2 = sinon.stub();
      const q2 = sdk.query()
        .on('result', stub2)
        .on('end', () => {
          expect(stub1.callCount).to.equal(1);
          expect(stub2.callCount).to.equal(1);
          expect(stub1.getCall(0).args[0]).to.deep.equal({ result: 1 });
          expect(stub2.getCall(0).args[0]).to.deep.equal({ result: 2 });
          done();
        });

      server.emit(q1.id, 'result', { data: { result: 1 } });
      server.emit(q2.id, 'result', { data: { result: 2 } });
      server.emit(q2.id, 'end');
    });

    describe('`result` method', () => {

      it('flattens result stream into an array', () => {
        const q = sdk.query()
          .result((err, results) => {
            expect(err).to.be.null;
            expect(results).to.deep.equal([
              { result: 1 },
              { result: 2 },
              { result: 3 }
            ]);
            done();
          });

        server.emit(q.id, 'result', { data: { result: 1 } });
        server.emit(q.id, 'result', { data: { result: 2 } });
        server.emit(q.id, 'result', { data: { result: 3 } });
        server.emit(q.id, 'end');
      });

    });

  });

  describe('timeouts', () => {

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

  });

  describe('errors', () => {

    it('emits an error event if error is sent from the backend', (done) => {
      const q = sdk.query()
        .on('error', (e) => {
          expect(e.message).to.equal('testerror');
          done();
        })
        .on('end', () => {
          done(new Error('should not be called'));
        });

      server.emit(q.id, 'error', { data: { message: 'testerror' } });
    });

  });

});
