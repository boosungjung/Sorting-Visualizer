import React from 'react';
import './SortingVisualizer.css';
import insertionSort from "../SortingAlgorithms/insertionSort";
import medianOfMedians from "../SortingAlgorithms/AuxiliaryAlgorithms/MedianOfMedians";
import quickSort from "../SortingAlgorithms/quickSort";

const MAX_NUM = 700;
const MIN_NUM = 5;
let SCREEN_WIDTH = (window.screen.width - 200) / 4; // 200px padding, 4px for margin and array bar width
export default class SortingVisualizer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            array: []
        };
    }

    componentDidMount() { // when this component loads it will reset the array
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < SCREEN_WIDTH; i++) {
            array.push(getRandInt(MIN_NUM, MAX_NUM));
        }
        this.setState({array});
    }

    mergeSort(){}

    quickSort(){
        let arr = [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 9, 10, 12, 12, 12, 13, 13, 13, 15, 15, 16, 16, 18, 20, 22, 23, 23, 24, 24, 25, 34, 34, 34, 43, 55, 66, 79, 123, 123, 545];
        console.log(checkSorter(quickSort)(arr))

    }

    heapSort(){}

    insertionSort(){
        // console.log(checkSorter(insertionSort)(this.state.array));
        let arr = [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 9, 10, 12, 12, 12, 13, 13, 13, 15, 15, 16, 16, 18, 20, 22, 23, 23, 24, 24, 25, 34, 34, 34, 43, 55, 66, 79, 123, 123, 545];
        console.log(medianOfMedians(arr, 0, arr.length))
    }


    // render the interface
    render() {

        const {array} = this.state; // extract array from state
        return ( //create a new div for every value in the array
            <div className={"background"}>
                <div className="array-container">
                    {array.map((val, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{height: `${val}px`}}></div>
                    ))}
                    <button className="button" id = "btnReset" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="button" id = "btnMergeSort" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="button" id = "btnQuickSort" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="button" id = "btnHeapSort" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="button" id = "btnInsertionSort" onClick={() => this.insertionSort()}>Insertion Sort</button>
                </div>
            </div>
        )

    }


}

const checkSorter = (myAlgo) => (array) =>{
    return myAlgo(array) === array.sort();
}


const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}