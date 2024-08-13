## agenda 
* Stop watch
    * useRef
    * creating custom hook
* Infinte scroll
    * useCallback
    * fetching data, useEffect
    * Intersection Observer

## Raw flow
### Stop Watch
* without 
* with useEffect
* cleranace-> of it 
* now adding those two btns
* rectifying the issue with multiple click of start btn 

### Intersection Observer (Infinite scroll)
Styling for a minute
Versions of problem 
* loading with stepper
	* Module.css first
* loading with  customHook 
	* rules for custom hook 
		* they should start with use
		* they are pure js functions: no JSX
* loading with Intersection observer
	* intersection obsrever demo

#### concept of intersection observer
 1. Observer -> watchMan (area we want to observe)
	 1. define the area -> that will be bounds of an actual element 
	 2. how much part is visible
	 3. root margin : now trimming that margin
2. Target is the element we want to observe 
#### rules of hooks 
* they only be called on order 
* or can be called inside another hook

## Stop watch.jsx
```jsx
import React, { useEffect, useState, useRef } from 'react'

// useRef -> it is used to store data across multiple re-renders
function StopWatch() {
    const [time, setTime] = useState(0);
    const id = useRef();
    const [currentState, setCurrentState] = useState(false);
    // 1 solution -> failed
    // setInterval(() => {
    //     setTime(time + 1);
    // }, 1000);
    //2. 
    useEffect(() => {
        return () => { clearInterval(id.current) };
    }, [])

    const startHandler = () => {
        if (currentState == true) {
            return;
        }
        
        id.current = setInterval(() => {
            // 2
            // setTime(time + 1);
            // when you want to update next state with the help of
            // prev state -> cb based syntax
            setTime((time) => { return Number(time) + 1; });
        }, 1000);
        setCurrentState(true);
    }
    const pauseHandler = () => {
        // clear the interval
        clearInterval(id.current);
        setCurrentState(false);
    }

    const StopHandlder = () => {
        // clear the interval
        // /reset the count as well
        clearInterval(id.current);
        setTime(0);
        setCurrentState(false);
    }

    return (
        <><h2>Stop Watch</h2>
            <h3>{time}</h3>
            <button onClick={startHandler}>Start</button>
            <button onClick={pauseHandler}>Pause</button>
            <button onClick={StopHandlder}>Stop</button>
        </>
    )
}

export default StopWatch
```


## Poc-> Intersection observer
 ->  `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Intersection Observer Example</title>
</head>
<body>
    <div class="content red">1</div>
    <div class="content gray">2</div>
    <div class="observer-target">I want to be observed</div>
    <div class="content red">3</div>
    <div class="content gray">4</div>
    <script src="script.js"></script>
    <!-- 


     -->
</body>

</html>
```

`script.js`
```jsx
// 1. Observer:
// 1. root ELement: the area in which we want to see that it is visible or not -> document
// 2. threshold: how much of the traget should be visble
// 3. root margin: it is used to shorten area of observation in observer
// 2. Target -> which we will observe
document.addEventListener('DOMContentLoaded', function () {
    // Select the target element to observe
    const target = document.querySelector('.observer-target');
    const options = {
        threshold: .5
    }
    const observer = new IntersectionObserver(cb, options);
    function cb(entries, observer) {
        let entry = entries[0];
        // Check if the target element is in the viewport
        if (entry.isIntersecting) {
            console.log('Target is in view!');
            // Perform actions when the target is in view
        } else {
            console.log('Target is out of view!');
            // Perform actions when the target is out of view
        }

    }
    // you attach the observer to all the target
    observer.observe(target);

})
```

`style.css`
```css
body {
    height: 150vh;
    /* Make the body taller for scrolling */
    margin: 0;
    font-family: Arial, sans-serif;
}

.observer-target {
    height: 100px;
    background-color: lightblue;
}

.content {
    background-color: lightgreen;
    height: 80vh;
    color: white;
    font-size: 5rem;
}

.red {
    background-color: lightcoral;
}

;

.gray {
    background-color: lightgray;
}
```


## Infinite scroll


`App.jsx`
```jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InfiniteScroll from './component/InfiniteScroll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InfiniteScroll></InfiniteScroll>
    </>
  )
}

export default App;
```

`style.module.css`
```css
.heading {
    background-color: aqua;
}


.book_title {
    padding: 2em;
    margin: 2em 0;
    border: 1px solid black;
    border-radius: 6px;
    text-align: center;
}


.loader {
    border: 8px solid #f3f3f3;
    /* Light grey */
    border-top: 8px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
    margin: 1rem auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
```

## useFetchParams
```js
/***
 * it should be  a pure js function 
 * it should always start with use 
 * */
import React, { useState, useEffect } from 'react';
export default function useFetchParams(...dependecy) {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [haveMore, setHaveMore] = useState(true);
    useEffect(function handler() {
        (async function () {
            try {
                setLoader(true);
                const resp = await
                    fetch("https://jsonplaceholder.typicode.com/comments?" +
                        new URLSearchParams({ _page: dependecy, _limit: 10 })
                    )
                const jsonResp = await resp.json();
                // console.log(jsonResp)
                if (jsonResp.length == 0) {  
                    setHaveMore(false);
                    
                } else {
                    setData([...data, ...jsonResp]);
                }
            } catch (err) {
                setError(err.message);
                setTimeout(() => {
                    setError(false);
                }, 2000);

            } finally {
                setLoader(false);
            }
        })()
    }, dependecy);
    return [data, loader, error, haveMore];
}
```
