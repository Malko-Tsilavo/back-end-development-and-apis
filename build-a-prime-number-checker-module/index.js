function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;

    for (let index = 2; index <= Math.sqrt(number); index++) {
        if (number % index == 0) {
            return false;
        }
    }
    return true;
}

module.exports = { isPrime };

