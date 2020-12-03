const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log();
console.log('Salut Valeria, programul calculeaza perimetru si aria unui triunghi isoscel');
console.log();
rl.question("Latura a? ", function(a) {
  rl.question("Latura b ? ", function(b) {
    let c = Math.sqrt(a * a + b * b);
    console.log('Perimetrul: ', +a + +b + +c);
    console.log('Aria: ', a * b / 2);
  });
});

rl.on("close", function() {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
