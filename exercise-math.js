
// @ts-check


/**
 * Math functions
 * @module exercise-math
 * @author Omar Alghamdi
 */

/**
 * Calculates the mean of array of numbers
 * @param   {Number[]}  arr Input array
 * @returns {Number}        The mean of all numbers in the array
 */
module.exports.findMean = (arr) => {
    return arr.reduce((acc, cur) => acc + cur) / arr.length;
}

/**
 * Calculates the median of array of numbers
 * @param   {Number[]} arr  Input array
 * @returns {Number}        The the median of the array
 */
module.exports.findMedian = (arr) => {
    const len = arr.length;
    arr = arr.sort();
    if (len % 2 != 0){
        return arr[Math.floor(len/2)]; 
    } else {
        return (arr[len/2] + arr[len/2 -1]) / 2 ;
    }
}

/**
 * Calculates the mode of array of numbers
 * @param   {Number[]}  arr Input array
 * @returns {Number}        The mode of the array. if array has multiple modes, only the smallest will be returned
 */
module.exports.findMode = (arr) => {
    let map = {}, mode, count = 0;

    // count instance of the each number
    for (let i = 0; i < arr.length; i++) {
         map[arr[i]] ? map[arr[i]]++ : map[arr[i]]=1;            
    }
    
    // find the highest count
    for (let key in map) {
        if (map[key] > count) {
            mode = key;
            count = map[key];
        }
    }

    return Number.parseInt(mode, 10);
}

/**
 * Calculates the Fibonacci at a given index
 * @param   {Number}    index           Index of the Fibonacci number
 * @param   {Boolean}   [cache=false]   return the memoization
 * @returns {Array}     [Fibonacci_number, memoization]. if cache is false the second element will be null
 */
module.exports.findFibonacci = (index, cache=false) => {
    let temp, a=0, b=1;
    let arr = [a, b]
    if (index == 0) {
        return [a, null];
    }
    for (let i = 1; i < index; i++) {
        temp = b;
        b = a + b;
        a = temp;
        arr.push(b);
    }
    
    if (cache) {
        return [b, arr];
    } else {
        return [b, null];
    }
}
