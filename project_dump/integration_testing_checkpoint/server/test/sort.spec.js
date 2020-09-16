const sort = require('../index');
const { expect } = require('chai');

describe('Sort function', () => {
  it('should sort numbers', () => {
    const list = [5, 1, 2, 3, 4];
    const expectedAnswer = [1, 2, 3, 4, 5];
    const actualAnswer = sort(list);

    expect(actualAnswer).to.deep.equal(expectedAnswer);
  });

  it('should sort strings', () => {
    const list = ['a', 'c', 'b'];
    const expectedAnswer = ['a', 'b', 'c'];
    const actualAnswer = sort(list);

    expect(actualAnswer).to.eql(expectedAnswer);
  });
});
