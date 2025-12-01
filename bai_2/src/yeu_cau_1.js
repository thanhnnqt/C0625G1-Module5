const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const numbers = [1, 2, 3, 4, 5, 7, 9, 11, 12, 13];

const primeNumbers = numbers.filter(num => isPrime(num));

console.log(primeNumbers);