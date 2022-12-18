function mergeRanges(ranges) {
    let min = ranges.reduce((min, range) => {
        return Math.min(min, range[0]);
    }, Number.MAX_SAFE_INTEGER);

    let max = ranges.reduce((min, range) => {
        return Math.max(min, range[1]);
    }, Number.MIN_SAFE_INTEGER);

    const flatRanges = ranges.flat().sort((a, b) => a - b);

    let newRanges = [];
    let start = null;
    let i = min;
    while (i <= max) {
        let exists = ranges.some(r => i >= r[0] && i <= r[1]);
        const hasStart = start !== null;

        if (exists && hasStart) {
            i = flatRanges.find(nr => nr >= i) + 1;
            exists = ranges.some(r => i >= r[0] && i <= r[1]);
        } else if (!exists && !hasStart) {
            i = flatRanges.find(nr => nr >= i);
            exists = true;
        }

        if (exists && !hasStart) {
            start = i;
            i += 1;
            continue;
        }

        if (!exists && hasStart) {
            newRanges.push([start, i - 1]);
            start = null;
            i += 1;
        }
    }

    return newRanges;
}

it('keep the same', () => {
    const a = [1, 4];
    const b = [10, 12];

    expect(mergeRanges([a, b])).toEqual([[1, 4], [10, 12]]);
});

it('return sorted', () => {
    const a = [10, 12];
    const b = [1, 4];

    expect(mergeRanges([a, b])).toEqual([[1, 4], [10, 12]]);
});

it('merge ranges midway', () => {
    const a = [1, 5];
    const b = [3, 7];

    expect(mergeRanges([a, b])).toEqual([[1, 7]]);
});

it('first range contains second', () => {
    const a = [1, 20];
    const b = [2, 5];

    expect(mergeRanges([a, b])).toEqual([[1, 20]]);

});

it('second range contains first', () => {
    const a = [4, 20];
    const b = [1, 20];

    expect(mergeRanges([a, b])).toEqual([[1, 20]]);
});

it('range is the same value and border range', () => {
    const a = [1, 4];
    const b = [5, 5];

    expect(mergeRanges([a, b])).toEqual([[1, 5]]);
});

it('no merge, separate ranges', () => {
    const ranges = [[1, 4], [6, 8], [-4, 0]];
    expect(mergeRanges(ranges)).toEqual([[-4, 4], [6, 8]]);
});

it('single final range', () => {
    const ranges = [[1, 7], [3, 8], [0, 2]];
    expect(mergeRanges(ranges)).toEqual([[0, 8]]);
});

it('leave single empty space', () => {
    const ranges = [[1, 7], [3, 8], [-5, -1]];
    expect(mergeRanges(ranges)).toEqual([[-5, -1], [1, 8]]);
});

it('big jump', () => {
    const ranges = [[1, 7], [400_000, 400_500]];
    expect(mergeRanges(ranges)).toEqual([[1, 7], [400_000, 400_500]]);
});

