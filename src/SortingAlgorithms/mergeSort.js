const mergeSort = (array, test=false) => {
    const animations = []
    mergeSort_aux(array, animations, 0, Math.floor(array.length / 2), array.length);
    if (test) {
        return array;
    }
    return animations;
}

const mergeSort_aux = (array, animations, low, mid, high) => {
    if (high-low > 1) {

        const leftMid = Math.floor((low + mid) / 2)
        const rightMid = Math.floor((mid + high) / 2)
        const left = mergeSort_aux(array, animations, low, leftMid, mid) // go left
        const right = mergeSort_aux(array, animations, mid, rightMid, high)

        merge(array, animations, left, right)
    }
    return [low,mid,high]

}

const merge = (array, animations, left, right) => {
    let array_i = left[0]
    let array_j = right[0]
    let arrayEnd_i = left[2]
    let arrayEnd_j = right[2]
    while (array_i < arrayEnd_i && array_j < arrayEnd_j){
        if (array[array_i]<=array[array_j]){
            array_i+=1;
        }else{
            let value = array[array_j];
            let idx = array_j;
            while (idx !== array_i){
                animations.push([idx, array[idx - 1]]);
                animations.push([idx-1, array[idx]]);
                array[idx] = array[idx - 1];
                idx -= 1;
            }
            animations.push([array_i, value])
            animations.push([array_j, array[array_i]])

            array[array_i] = value;
            array_i+=1;
            array_j+=1;
            arrayEnd_i+=1;
        }
    }


    // console.log("low = ", low, " high = ", high, " " ,array.slice(low,high))

}
const swap = (array, i, j) => {

    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}
export default mergeSort;