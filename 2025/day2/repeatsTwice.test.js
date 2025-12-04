function repeatsTwice(n) {
    return /^(\d+)\1$/.test(n.toString())
}

describe('repeatsTwice', () => {
    test('returns true for valid numbers', () => {
        expect(repeatsTwice(11)).toBe(true);
        expect(repeatsTwice(77)).toBe(true);
        expect(repeatsTwice(1010)).toBe(true);
        expect(repeatsTwice(105105)).toBe(true);
    });

    test('detects invalid numbers', () => {
        expect(repeatsTwice(12)).toBe(false);
        expect(repeatsTwice(2332)).toBe(false);
        expect(repeatsTwice(121111)).toBe(false);
    });
});
