const generateBinaryOptions = require('./generate-binary-options');

function applyFloatingMask(value, mask) {
    const size = mask.length;
    const valStr = value.toString(2);
    const pad = Array(size - valStr.length).fill(0).join('');
    const varArray = (pad + valStr).split('');

    return mask
        .split('')
        .map((char, index) => {
            switch (char) {
                case '0':
                    return varArray[index] || '0';
                case '1':
                    return '1';
                default:
                    return 'X';
            }
        });
}

function getMaskedPermutations(value, mask) {
    const valueArray = applyFloatingMask(value, mask);
    const floatingCount = valueArray.filter(char => char === 'X').length;

    if (!floatingCount) {
        const valueStr = valueArray.join('');
        return [valueStr];
    }

    const permutations = generateBinaryOptions(floatingCount);

    return permutations.map(perm => {
        let i = 0;
        let solution = [...valueArray];

        for (let k = 0; k < solution.length; k++) {
            if (solution[k] === 'X') {
                solution[k] = perm[i];
                i++;
            }
        }

        return solution.join('');
    })
}

module.exports = getMaskedPermutations;