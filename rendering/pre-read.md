## 13 : React Interview Prep-2
## agenda

* Class based components
* Class based components and life cycle
* Class based vs functional
* Pure components and React.memo

## class based componet
* initial state is defined inside constructor
*  you this is only available  inside the life cycle methods
* this.setState to update the the state 

## Stages of a react  component
* mounting : creation
* updation 
* unmount : deletion 

### Life cycle methods -> class based component
* `constructor` :use to intialize your state  

* `render` : render the output
* `componentdidMount` :  runs only once after first render
    *   Class Component :`componentDidMount()`
    *   functional `useEffect(cb, [])`

* `componentdidupdate`: run after the update
    * functional componet: `useEffect(cb, [dep1,dep2])`
    * class based component`componentDidMount`+ `componentDidUpdate`

* `componenWillUnmount`: run after deletion 
    * Class Component : componenetWillUnmount
    * functional component : cleanup function of useEffect


### How functional are difff from classbased components
* Lifecycle methods -> are only accessible in classbased components

* class based compoent had a lot of overeahed of this and more boiler plate code that lead to heavier bundle size 

`FunctionalCounter.jsx`
```jsx
import React, { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);
    const incCount = () => {
        setCount((prevCount) => { return prevCount + 1 })
    }
    const decCount = () => {
        setCount((prevCount) => { return prevCount - 1 })
    }
    return (
        <>
            <h1>Counter</h1>
            <h2>{count}</h2>
            <div>
                <button onClick={incCount} >+</button>
                <button onClick={decCount}>-</button>
            </div>

        </>
    )

}
/***
* 1. is your component correctly rendered -> default ()
* 
* 2. when you interact with it -> it works correctly or not
*      click + -> 0 -> 1
*      click - -> 0-> -1
* **/
export default Counter
```


`Class Counter.jsx`
``` jsx
import React, { PureComponent } from 'react'
// life cycle method-> lcm
export default class ClassCounter extends PureComponent {
    // 1. first lcm  -> intiializes your state 
    constructor(props) {
        console.log("constructor");
        super(props)
        this.state = {
            count: 0
        }
        // this.incCount=this.incCount.bind(this);
    }
    incCount =  ()=> {
        // set state 
        this.setState({ count: this.state.count + 1 })
    }
     decCount =  ()=> {
        this.setState({ count: this.state.count - 1 })
    }
    // 2. second lcm -> it used to render the jsx
    componentDidMount(){
        console.log("run once after first render");
    }
    componentDidUpdate(){
        console.log("I will run after every update")
    }
    render() {
        console.log("render");
        return (
            <>
                <h1>Counter</h1>
                <h2>{this.state.count}</h2>
                <div>
                    <button onClick={this.incCount} >+</button>
                    <button onClick={this.decCount}>-</button>
                </div>

            </>
        )

    }
}


/***
 * class based componnet 
 *  -> only your life cycle methods had access to this -> you 
 * **/ 
```