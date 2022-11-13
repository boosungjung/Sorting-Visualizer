
/*
    This is my implementation also used in many of my other projects.
    I used insertion sort because for a constant small number of input. Insertion sort is very fast and is inplace.
    :Time Complexity: O(N), where N is the size of the arr
    :Aux Space Complexity: O(N/5) = O(N) for the sublist
    :param arr:
    :param index_low:
    :param index_high:
    :return:
 */
const medianOfMedians = (array, index_low, index_high) => {

    let remaining = index_high - index_low; // remaining elements in array
    let sublist = [];
    let divided_list = [];
    for (let i = index_low; i < index_high; i += 5) {
        if (remaining >= 5) {
            for (let j = 0; j < 5; j++) {
                sublist.push(array[i + j]);
            }
            remaining -= 5;
        } else {
            for (let j = 0; j < remaining; j++) {
                sublist.push(array[i + j]);
            }
        }

        if (sublist.length > 0) {
            divided_list.push(sublist)
        }
        sublist = [] // reset the sublist
    }
    // console.log(divided_list)

    // sort the divided list
    let sorted_divided_list = []
    for (let i = 0; i < divided_list.length; i++) {
        sorted_divided_list.push(insertionSort(divided_list[i]))
    }

    let medians = []

    // push the middle element from the sublist into medians
    // length - 1 because the last element will be the largest
    let length = sorted_divided_list.length
    if (sorted_divided_list.length < 5 && sorted_divided_list.length > 1){ // to make sure a list of size 1 is considered
        length = sorted_divided_list.length - 1;
    }
    for (let i = 0; i < length; i++) {
        sublist = sorted_divided_list[i];
        medians.push(sublist[Math.floor(sublist.length / 2)])
    }

    let pivot = 0;

    if (medians.length <= 5) {
        insertionSort(medians);
        pivot = medians[Math.floor(medians.length / 2)]
    } else {
        pivot = medianOfMedians(medians, 0, medians.length)
    }
    return pivot;

}
const insertionSort = array =>{
    for(let i = 1; i < array.length; i++){
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && key < array[j]){
            array[j+1] = array[j]
            j = j - 1
        }
        array[j + 1] = key
    }
    return array;
}
export default medianOfMedians;