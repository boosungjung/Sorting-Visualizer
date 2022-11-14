import React from 'react';
import './SortingVisualizer.css';
import insertionSort from "../SortingAlgorithms/insertionSort";
import quickSort from "../SortingAlgorithms/quickSort";
import mergeSort from "../SortingAlgorithms/mergeSort";
import radixSort from "../SortingAlgorithms/radixSort";


const MAX_NUM = 700;
const MIN_NUM = 5;
const SPEED_MIN = 0;
const SPEED_MAX = 1.9;


let SCREEN_WIDTH = (window.screen.width - 200) / 4; // 200px padding, 4px for margin and array bar width
export default class SortingVisualizer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            array: [],
            speed: 1
        };
    }

    componentDidMount() { // when this component loads it will reset the array
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < SCREEN_WIDTH - 1; i++) {
            array.push(getRandInt(MIN_NUM, MAX_NUM));
            // array.push(i);
        }
        // array.sort(()=>Math.random() - 0.5)
        this.setState(() => {
            return {
                array: array,
                speed: this.state.speed, //keeps old state
            }
        });
    }

    mergeSort() {
        this.updateAnimation(mergeSort(this.state.array))(this.state.speed / 10);

    }

    quickSort() {
        this.updateAnimation(quickSort(this.state.array))(this.state.speed);
    }

    radixSort() {
        this.updateAnimation(radixSort(this.state.array))(this.state.speed*3);

    }

    insertionSort() {
        this.updateAnimation(insertionSort(this.state.array))(this.state.speed / 10); // /10 because insertion sort is so slow
    }

    testAlgorithms() {
        let incorrect = 0;
        for (let i = 0; i < 100; i++) {
            const arr = [];
            console.log(incorrect)
            for (let j = 0; j < getRandInt(-53333, 10000); j++) {
                arr.push(getRandInt(5, 1000))
            }
            if (checkSorter(radixSort)(arr)) {
                incorrect++;
            }
        }
        console.log(incorrect)
    }

    increaseSpeed() {
        this.changeSpeed(-0.1)
    }

    decreaseSpeed() {
        this.changeSpeed(0.1)
    }


    changeSpeed = (speed) => {
        const speedElem = document.getElementById('speed');
        const finalSpeed = Math.round((this.state.speed + speed) * 100) / 100

        if (finalSpeed > SPEED_MIN && this.state.speed < SPEED_MAX) {
            this.setState({
                speed: this.state.speed + speed
            })
            speedElem.innerHTML = "Speed " + Math.round((1 - this.state.speed) * 100 + 100) + "%";
        } else {
            this.setState({
                speed: 1
            })
            speedElem.innerHTML = "Speed " + Math.round((1 - this.state.speed) * 100 + 100) + "%";

        }
    }

    updateAnimation = (animations) => (speed) => {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {

            setTimeout(() => {

                const [index, newHeight, isComp] = animations[i];
                if (!isComp) {
                    const currentBar = arrayBars[index].style;
                    currentBar.height = `${newHeight}px`;
                    currentBar.backgroundColor = 'papayawhip';

                } else {
                    // const barOneStyle = arrayBars[barOneIdx].style;
                }
            }, i * speed);
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
                </div>
                <div className={"button-container"}>
                    <button className="button" id="btnReset" onClick={() => this.resetArray()}>Generate New Array
                    </button>
                    <button className="button" disabled={false} id="btnMergeSort" onClick={() => this.mergeSort()}>Merge
                        Sort(In-Place)
                    </button>
                    <button className="button" id="btnQuickSort" onClick={() => this.quickSort()}>Quick Sort(DNF)
                    </button>
                    <button className="button" disabled={false} id="btnRadixSort" onClick={() => this.radixSort()}>Radix
                        Sort
                    </button>
                    <button className="button" id="btnInsertionSort" onClick={() => this.insertionSort()}>Insertion
                        Sort
                    </button>
                    <button className="button" id="btnTestAlgorithms" onClick={() => this.testAlgorithms()}>Test Sorting
                        Algorithms
                    </button>
                    <button className="button" id="btnDecreaseSpeed"
                            onClick={() => this.decreaseSpeed()}>DecreaseSpeed
                    </button>

                    <button className="button" id="btnIncreaseSpeed"
                            onClick={() => this.increaseSpeed()}>IncreaseSpeed
                    </button>
                    <h1 id="speed" style={{color: "white"}}>Speed {this.state.speed * 100}%</h1>
                </div>
            </div>
        )

    }


}

const checkSorter = (myAlgo) => (array) => {
    array = myAlgo(array, true)
    for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
            console.log("ERROR ", array[i], array[i + 1])
            return true;
        }
    }
    return false;


}


const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


