function repeatsAtLeastTwice(n) {
    return /^(\d+)\1+$/.test(n.toString())
}

describe('repeatsTwice', () => {
    test('returns true for valid numbers', () => {
        expect(repeatsAtLeastTwice(11)).toBe(true);
        expect(repeatsAtLeastTwice(77)).toBe(true);
        expect(repeatsAtLeastTwice(1010)).toBe(true);
        expect(repeatsAtLeastTwice(105105)).toBe(true);
    });

    test('detects invalid numbers', () => {
        expect(repeatsAtLeastTwice(12)).toBe(false);
        expect(repeatsAtLeastTwice(2332)).toBe(false);
        expect(repeatsAtLeastTwice(121111)).toBe(false);
    });
});

describe('isRepeatedMoreThanTwice', () => {
    test('returns true for valid numbers', () => {
        expect(repeatsAtLeastTwice(111111)).toBe(true);
        expect(repeatsAtLeastTwice(77777)).toBe(true);
        expect(repeatsAtLeastTwice(1010)).toBe(true);
        expect(repeatsAtLeastTwice(876876876876)).toBe(true);
        expect(repeatsAtLeastTwice(1188511885)).toBe(true);
        expect(repeatsAtLeastTwice(446446)).toBe(true);
        expect(repeatsAtLeastTwice(824824824)).toBe(true);
        expect(repeatsAtLeastTwice(2121212121)).toBe(true);
    });

    test('detects invalid numbers', () => {
        expect(repeatsAtLeastTwice(12)).toBe(false);
        expect(repeatsAtLeastTwice(100)).toBe(false);
        expect(repeatsAtLeastTwice(2332)).toBe(false);
        expect(repeatsAtLeastTwice(1211111212)).toBe(false);
        expect(repeatsAtLeastTwice(1188511881)).toBe(false);
    });
});
