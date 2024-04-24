function seedToLocation(seed, maps) {
    let current = seed;
    // console.log(current);
    maps.forEach((map) => {
        current = sourceToDestination(current, map.items);
        // console.log(current);
    });

    return current;
}

function locationToSeed(location, maps) {
    let current = location;
    // console.log(current);
    [...maps].reverse().forEach((map) => {
        current = destinationToSource(current, map.items);
        // console.log(current);
    });

    return current;
}

function sourceToDestination(source, rules) {
    let destination = source;

    for (let rule of rules) {
        // [destination, source, range]
        const diff = source - rule[1];
        if (diff >= 0 && diff <= rule[2]) {
            return diff + rule[0];
        }
    }

    return destination;
}

function destinationToSource(destination, rules) {
    let source = destination;

    for (let rule of rules) {
        // [destination, source, range]
        let diff = destination - rule[0];
        if (diff >= 0 && diff <= rule[2]) {
            return diff + rule[1]
        }
    }

    return source;
}

const maps = [
    {
        "title": "seed-to-soil map:",
        "items": [
            [
                50,
                98,
                2
            ],
            [
                52,
                50,
                48
            ]
        ]
    },
    {
        "title": "soil-to-fertilizer map:",
        "items": [
            [
                0,
                15,
                37
            ],
            [
                37,
                52,
                2
            ],
            [
                39,
                0,
                15
            ]
        ]
    },
    {
        "title": "fertilizer-to-water map:",
        "items": [
            [
                49,
                53,
                8
            ],
            [
                0,
                11,
                42
            ],
            [
                42,
                0,
                7
            ],
            [
                57,
                7,
                4
            ]
        ]
    },
    {
        "title": "water-to-light map:",
        "items": [
            [
                88,
                18,
                7
            ],
            [
                18,
                25,
                70
            ]
        ]
    },
    {
        "title": "light-to-temperature map:",
        "items": [
            [
                45,
                77,
                23
            ],
            [
                81,
                45,
                19
            ],
            [
                68,
                64,
                13
            ]
        ]
    },
    {
        "title": "temperature-to-humidity map:",
        "items": [
            [
                0,
                69,
                1
            ],
            [
                1,
                0,
                69
            ]
        ]
    },
    {
        "title": "humidity-to-location map:",
        "items": [
            [
                60,
                56,
                37
            ],
            [
                56,
                93,
                4
            ]
        ]
    }
];

describe('run test', () => {
    // locations: 17, 18, 83
    test.each([42, 79, 68, 80, 81, 82, 83, 84])('verify seed %i to location and back', (input) => {
        const location = seedToLocation(input, maps);
        const seed = locationToSeed(location, maps);

        expect(seed).toBe(input);
    });
});

describe('run test', () => {
    test.each([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])('verify location %i to seed and back', (input) => {
        const seed = locationToSeed(input, maps);
        const location = seedToLocation(seed, maps);

        expect(location).toBe(input);
    });
});
