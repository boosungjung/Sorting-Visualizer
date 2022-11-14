import medianOfMedians from "./AuxiliaryAlgorithms/MedianOfMedians";

const quickSort = (array, test=false) => {
    const animations = [];
    aux_quickSort(array, 0, array.length-1, animations)
    console.log(array)

    if (test){
        return array;
    }
    return animations;
}

const aux_quickSort = (array, low, high, animations) => {
    if (low<high) {
        let pivots = dnfPartition(array, low, high, animations) // partition the array
        // console.log(array)
        let index_of_pivot_start = pivots[0]
        let index_of_pivot_end = pivots[1]
        // let index_of_pivot_start = findPivotIndexStart(array, pivot)
        // console.log(pivots)
        aux_quickSort(array, low, index_of_pivot_start - 1, animations)
        aux_quickSort(array, index_of_pivot_end + 1, high, animations)
    }
}

const swap = (array, i, j) => {

    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

/*
The Dutch National Flag algorithm
 */
const dnfPartition = (array, low, high, animations) => {
    let pivot = medianOfMedians(array, low, high) // get the pivot
    // let pivot = array[Math.floor(getRandInt(low,high)/2)]
    let boundary1 = low
    let boundary2 = high
    let j = low
    while (j <= boundary2) {

        if (array[j] < pivot) {
            animations.push([boundary1,array[j]])
            animations.push([j,array[boundary1]])

            swap(array, boundary1, j)

            // console.log("swapping ", boundary1 +  " and " +  j)
            boundary1 += 1
            j += 1


        } else if (array[j] > pivot) {
            animations.push([j,array[boundary2]])
            animations.push([boundary2,array[j]])

            swap(array, j, boundary2)

            // console.log("swapping ", boundary2 +  " and " +  j)
            boundary2 -= 1

        } else {

            j += 1
        }
    }
    return [boundary1, boundary2]
}



export default quickSort;

