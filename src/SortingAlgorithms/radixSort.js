const radixSort = (array, test = false) => {
    const animations = []
    array = radixSort_aux(array, animations);
    if (test) {
        return array;
    }
    return animations;
}

const radixSort_aux = (array, animations) => {
    const base = 10;
    const max_digit = Math.max.apply(Math, array).toString().length;
    for (let column = 0; column < max_digit + 1; column++) { // + 1 to iterate one last time to animate through the sorted array
        let e = base ** column;
        let bucket = createBucketArray(base); // size 10 because numbers go from 0-9
        for (let i = 0; i < array.length; i ++) {
            let index = (Math.floor(array[i] / e) % base);
            // console.log(index,i,array[i], e, base)
            bucket[index].push(array[i])
            animations.push([i,array[i]])

        }
        array = bucket.flat(1);
    }
    return array;
}
const createBucketArray = (size) => {
    let arr = []
    for (let i = 0; i < size; i++) {
        arr.push([]);
    }
    return arr;
}


export default radixSort;