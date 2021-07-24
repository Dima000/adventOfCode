function applyMaskTest(value, mask) {
    const size = mask.length;
    const valStr = value.toString(2);
    const pad = Array(size - valStr.length).fill(0).join('');
    const varArray = (pad + valStr).split('');


    const binaryStr = mask
        .split('')
        .map((char, index) => {
            const valChar = varArray[index] || '0';
            return char === 'X' ? valChar : char;
        })
        .join('');

    return parseInt(binaryStr, 2);
}

module.exports = applyMaskTest;