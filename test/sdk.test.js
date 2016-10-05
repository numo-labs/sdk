'use strict';

const SDK = require('../');

describe('SDK', () => {
  it('is a function', () => {
    expect(typeof SDK).to.equal('function');
  });
  it('returns an object with a `query` method', () => {
    expect(typeof SDK().query).to.equal('function');
  });
});
