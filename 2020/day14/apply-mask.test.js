const applyMaskTest = require('./apply-mask');

describe('applyMask.js', () => {
    it('case 1', () => {
        const value = 11;
        const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
        const expectedResult = 73;

        const result = applyMaskTest(value, mask);

        expect(result).toEqual(expectedResult);
    });

    it('case 2', () => {
        const value = 101;
        const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
        const expectedResult = 101;

        const result = applyMaskTest(value, mask);

        expect(result).toEqual(expectedResult);
    });
});