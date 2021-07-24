const getMaskedPermutations = require('./get-masked-permutations');

describe('getMaskedPermutations.js', () => {
    it('case 1', () => {
        const value = 42;
        const mask = '000000000000000000000000000000X1001X';
        const expectedResult = [
            '000000000000000000000000000000011010',
            '000000000000000000000000000000011011',
            '000000000000000000000000000000111010',
            '000000000000000000000000000000111011'
        ];

        const result = getMaskedPermutations(value, mask);

        expect(result).toEqual(expectedResult);
    });
});