const { paramValidation } = require('../server');
const { expect } = require('chai');

describe.only('paramValidation function', () => {
  // Happy paths
  it('passes valid params', () => {
    let success;
    const next = () => (success = true);
    const req = { query: { sort: 'App', genres: 'Action' } };

    paramValidation(req, null, next);

    expect(success).to.be.true;
  });

  // Sad paths
  [{ sort: 'null' }, { genres: 'null' }].map(query => {
    it('handles invalid params', () => {
      const req = { query: query };
      let res = {};

      const validate = () => paramValidation(req, res);

      expect(validate()).to.throw();
      // expect(validate).to.throw();
    });
  });
});
