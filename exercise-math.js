
module.exports.findMean = (arr) => {
    return arr.reduce((acc, cur) => acc + cur) / arr.length;
}

module.exports.findMedian = (arr) => {
    const len = arr.length;
    arr = arr.sort();
    if (len % 2 != 0){
        return arr[Math.floor(len/2)]; 
    } else {
        return (arr[len/2] + arr[len/2 -1]) / 2 ;
    }
}

// if there is more than one mode, it returns only one
module.exports.findMode = (arr) => {
    let map = {}, mode, count = 0;

    // count instance of the each number
    for (let i = 0; i < arr.length; i++) {
         map[arr[i]] ? map[arr[i]]++ : map[arr[i]]=1;            
    }
    
    // find the highest count
    for (key in map) {
        if (map[key] > count) {
            mode = key;
            count = map[key];
        }
    }

    return mode  
}

// if cache = true, return array of Fibonacci numbers
module.exports.findFibonacci = (index, cache) => {
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
