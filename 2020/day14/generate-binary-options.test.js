const generateBinaryOptionsTest = require('./generate-binary-options');

describe('generateBinaryOptions.js', () => {
    it('n = 2', () => {
        const n = 2;
        const expectedResult = [
            '00',
            '01',
            '10',
            '11'
        ];

        const result = generateBinaryOptionsTest(n);
        expect(result).toEqual(expectedResult);
    });

    it('n = 3', () => {
        const n = 3;
        const expectedResult = [
            '000',
            '001',
            '010',
            '011',
            '100',
            '101',
            '110',
            '111',
        ];

        const result = generateBinaryOptionsTest(n);
        expect(result).toEqual(expectedResult);
    });
});