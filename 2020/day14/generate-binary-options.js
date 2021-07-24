function generateBinaryOptionsTest(n) {
    if (n === 0) {
        return [''];
    }

    const previous = generateBinaryOptionsTest(n - 1);

    const ones = previous.map(i => '1' + i);
    const zeroes = previous.map(i => '0' + i);

    return [...zeroes, ...ones];
}

module.exports = generateBinaryOptionsTest;