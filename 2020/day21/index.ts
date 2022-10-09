namespace Day21 {
    let isTest = false;

    let path = require('path');
    let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
    let { permutator } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
    let _ = require('lodash');
    let day = new Day(2020, 21, isTest);

    /*
    * -------------------------------------------------------------------------------------
    * DAY20 PUZZLES - Solution below
    * -------------------------------------------------------------------------------------
    */


    type Rule = {
        words: string[];
        ingredients: string[];
    }

    function testRules(word: string, possibleIngredients: Set<string>, rules: Rule[]): boolean {
        for (let possibleIngredient of possibleIngredients) {
            let rulesPass = true;
            for (let rule of rules) {
                const ingredientPresent = rule.ingredients.indexOf(possibleIngredient) !== -1;
                const wordPresent = rule.words.indexOf(word) !== -1;
                if (ingredientPresent && !wordPresent) {
                    rulesPass = false;
                    break;
                }
            }

            if (rulesPass) {
                return true;
            }
        }

        return false;
    }

    function testSolution(allWords: string[], allIngredients: string[], rules: Rule[]): boolean {
        for (let i = 0; i < allWords.length; i++) {
            const word = allWords[i];
            const ingredient = allIngredients[i];

            for (let rule of rules) {
                const ingredientPresent = rule.ingredients.indexOf(ingredient) !== -1;
                const wordPresent = rule.words.indexOf(word) !== -1;
                if (ingredientPresent && !wordPresent || !wordPresent && ingredientPresent) {
                    return false;
                }
            }
        }

        return true;
    }

    day.task1((data: string) => {
        const rules: Rule[] = [];
        const allWords: string[] = [];
        const allIngredients: string[] = [];
        const wordsToIngredients: Record<string, Set<string>> = {};

        data.split('\r\n').forEach(line => {
            const [wordsStr, ingredientsStr]: string[] = line.split('(');
            const words = wordsStr.trim().split(' ');
            const ingredients = ingredientsStr.substring(9, ingredientsStr.length - 1).split(', ');
            allWords.push(...words);
            allIngredients.push(...ingredients);
            rules.push({ words, ingredients });
        });

        rules.forEach(rule => {
            rule.words.forEach(word => {
                const set = wordsToIngredients[word] || new Set();
                rule.ingredients.forEach(ingredient => {
                    set.add(ingredient);
                });
                wordsToIngredients[word] = set;
            })
        });

        // COLLECT WORDS THAT PASS THE RULES
        const validWords = new Set();
        Object.entries(wordsToIngredients).forEach(([word, possibleIngredients]) => {
            if (testRules(word, possibleIngredients, rules)) {
                validWords.add(word);
            }
        });

        // Solution1 - COUNT TIMES NON-VALID WORDS APPEAR
        const nonValidWords = allWords.filter(word => !validWords.has(word));
        console.log('Solution 1', nonValidWords.length);


        //Solution2 - Determine valid solution
        Object.keys(wordsToIngredients).forEach(word => {
            if (!validWords.has(word)) {
                delete wordsToIngredients[word];
            }
        });

        const wordPermutations = permutator(Array.from(validWords));
        const allIngredientsUniques = Array.from(new Set(allIngredients)).sort();

        wordPermutations.forEach(words => {
            if (testSolution(words, allIngredientsUniques, rules)) {
                console.log('Solution 2', words.join(','));
                return;
            }
        });
    })
}
