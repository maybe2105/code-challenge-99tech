var sum_to_n_a = function (n) {
  // Approach 1: Using a for loop
  // Time Complexity: O(n) - we iterate from 1 to n
  // Space Complexity: O(1) - constant space as we only use a few variables
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // Approach 2: Using mathematical formula (Gauss's formula)
  // Time Complexity: O(1) - constant time as it's a single calculation
  // Space Complexity: O(1) - constant space as we only use a few variables
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  // Approach 3: Dynamic split recursion based on input size
  // Time Complexity: O(n) - but with optimized stack depth
  // Space Complexity: O(n/k) where k is the dynamic split factor

  // Calculate optimal split factor based on input size
  // Using a smaller factor for larger numbers to prevent stack overflow
  const splitFactor = Math.max(n, Math.min(n, Math.floor(Math.sqrt(n))));

  // Create dynamic number of recursive functions based on split factor
  const sumFunctions = Array.from({ length: splitFactor }, (_, i) => {
    return function sum_mod(n) {
      if (n <= 0) return 0;
      if (n % splitFactor !== i) {
        return sum_mod(n - ((n - i) % splitFactor));
      }
      return n + sum_mod(n - splitFactor);
    };
  });

  // Sum up results from all split functions
  return sumFunctions.reduce((total, sumFn) => total + sumFn(n), 0);
};

console.log("sum_to_n_a(5): ", sum_to_n_a(5));
console.log("sum_to_n_b(5): ", sum_to_n_b(5));
console.log("sum_to_n_c(5): ", sum_to_n_c(5));

console.log("\n\n===========\n\n");

console.log("sum_to_n_a(10000000): ", sum_to_n_a(10000000));
console.log("sum_to_n_b(10000000): ", sum_to_n_b(10000000));
console.log("sum_to_n_c(10000000): ", sum_to_n_c(10000000));
