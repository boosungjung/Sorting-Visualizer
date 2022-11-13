import React from 'react';
import './SortingVisualizer.css';
import insertionSort from "../SortingAlgorithms/insertionSort";
import medianOfMedians from "../SortingAlgorithms/AuxiliaryAlgorithms/MedianOfMedians";
import quickSort from "../SortingAlgorithms/quickSort";
import playTone from "../tones/simpleTones";


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
            array.push(getRandInt(MIN_NUM,MAX_NUM));
            // array.push(i);
        }
        // array.sort(()=>Math.random() - 0.5)
        this.setState({array});
    }

    mergeSort(){}

    quickSort() {
        updateAnimation(quickSort(this.state.array))(1);


    }

    heapSort(){


    }

    insertionSort(){
        updateAnimation(insertionSort(this.state.array))(0.1);
    }

    testAlgorithms(){
        for(let i = 0; i < 1000; i++){
            const arr = [];

            for(let j = 0; j<getRandInt(5,10000); j++){
                arr.push(getRandInt(5,1000))
            }
            console.log(checkSorter(quickSort)(arr))

        }
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
                    <button className="button" id = "btnTestAlgorithms" onClick={() => this.testAlgorithms()}>Test Sorting Algorithms</button>
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

const updateAnimation = (animations) => (speed) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
        }, i * speed);
    }
}