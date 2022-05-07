console.warn("starting fibonacci number gen");

var i;
var fib = [];

fib[0] = 0;
fib[1] = 1;
for (i = 2; i <= 49; i++) {
  fib[i] = fib[i - 2] + fib[i - 1];
  console.log(fib[i]);
}

console.error("console full! (jk it will delete the rest)");