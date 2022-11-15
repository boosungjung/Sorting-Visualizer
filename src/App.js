import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import './App.css';
import insertionsort from './img/insertionsort.png';
import mergesort from './img/mergesort.png';
import quicksort from './img/quicksort.png';
import radixsort from './img/radixsort.png';
import React,{useEffect} from "react";

function App() {

    useEffect(() => { // this makes sure observer is run after rendering all html components
        const observer = new IntersectionObserver((entries) =>{
            entries.forEach((entry) =>{
                if (entry.isIntersecting){
                    entry.target.classList.add('show')
                } else{
                    entry.target.classList.remove('show')
                }
            })
        })

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el)=>observer.observe(el))
    }, [])


  return (
    <div className="App">
        <section className="hidden">
            <h1>Sorting Visualizer</h1>
        </section>
        <section className="hidden">
            <h2>algorithms</h2>
            <div className="logos">

                    <div className="logo hidden">
                        <img src={insertionsort} alt="insertionsort"></img>
                        <div className="logo_overlay">
                            <div className="logo_title">Insertion Sort</div>
                        </div>
                    </div>
                    <div className="logo hidden">
                        <img src={mergesort} alt="mergesort"></img>
                        <div className="logo_overlay">
                            <div className="logo_title">Merge Sort</div>
                        </div>
                    </div>
                    <div className="logo hidden">
                        <img src={quicksort} alt="quicksort"></img>
                        <div className="logo_overlay">
                            <div className="logo_title">Quick Sort</div>
                        </div>
                    </div>
                    <div className="logo hidden">
                        <img src={radixsort} alt="radixsort"></img>
                        <div className="logo_overlay">
                            <div className="logo_title">Radix Sort</div>
                        </div>
                    </div>
            </div>

        </section>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}


export default App;
