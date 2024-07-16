## JS Required for React
### Array Methods

Arrays are fantastic and I use array methods all the time! I probably use the following methods the most frequently:

- find
- some
- every
- includes
- map
- filter
- reduce

Here are some examples:

```js
const dogs = [
  {
    id: 'dog-1',
    name: 'Poodle',
    temperament: [
      'Intelligent',
      'Active',
      'Alert',
      'Faithful',
      'Trainable',
      'Instinctual',
    ],
  },
  {
    id: 'dog-2',
    name: 'Bernese Mountain Dog',
    temperament: ['Affectionate', 'Intelligent', 'Loyal', 'Faithful'],
  },
  {
    id: 'dog-3',
    name: 'Labrador Retriever',
    temperament: [
      'Intelligent',
      'Even Tempered',
      'Kind',
      'Agile',
      'Outgoing',
      'Trusting',
      'Gentle',
    ],
  },
]

dogs.find(dog => dog.name === 'Bernese Mountain Dog')
// {id: 'dog-2', name: 'Bernese Mountain Dog', ...etc}

dogs.some(dog => dog.temperament.includes('Aggressive'))
// false

dogs.some(dog => dog.temperament.includes('Trusting'))
// true

dogs.every(dog => dog.temperament.includes('Trusting'))
// false

dogs.every(dog => dog.temperament.includes('Intelligent'))
// true

dogs.map(dog => dog.name)
// ['Poodle', 'Bernese Mountain Dog', 'Labrador Retriever']

dogs.filter(dog => dog.temperament.includes('Faithful'))
// [{id: 'dog-1', ..etc}, {id: 'dog-2', ...etc}]

dogs.reduce((allTemperaments, dog) => {
  return [...allTemperaments, ...dog.temperament]
}, [])
// [ 'Intelligent', 'Active', 'Alert', ...etc ]
```

[MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
### Template Literals

Template literals are like regular strings with super-powers:

```js
const greeting = 'Hello'
const subject = 'World'
console.log(`${greeting} ${subject}!`) // Hello World!

// this is the same as:
console.log(greeting + ' ' + subject + '!')

```

### Shorthand property names

This is so common and useful that I do this without thinking now.

```js
const a = 'hello'
const b = 42
const c = {d: [true, false]}
console.log({a, b, c})

// this is the same as:
console.log({a: a, b: b, c: c})

```

### Arrow functions

Arrow functions are another way to write functions in JavaScript, but they do have a few semantic differences. Luckily for us in React land, we don't have to worry about `this` as much if we're using hooks in our project (rather than classes), but the arrow function allows for terser anonymous functions and implicit returns, so you'll see and want to use arrow functions plenty.

```js
const getFive = () => 5
const addFive = a => a + 5
const divide = (a, b) => a / b

// this is the same as:
function getFive() {
  return 5
}
function addFive(a) {
  return a + 5
}
function divide(a, b) {
  return a / b
}

```


### Destructuring
Destructuring is probably my favorite JavaScript feature. I destructure objects and arrays all the time (and if you're using `useState` you probably are too. I love how declarative it is.

```js
// const obj = {x: 3.6, y: 7.8}
// makeCalculation(obj)

function makeCalculation({x, y: d, z = 4}) {
  return Math.floor((x + d + z) / 3)
}

// this is the same as
function makeCalculation(obj) {
  const {x, y: d, z = 4} = obj
  return Math.floor((x + d + z) / 3)
}

// which is the same as
function makeCalculation(obj) {
  const x = obj.x
  const d = obj.y
  const z = obj.z === undefined ? 4 : obj.z
  return Math.floor((x + d + z) / 3)
}


```

### Parameter defaults
This is another feature I use all the time. It's a really powerful way to declaratively express default values for your functions.

```js
// add(1)
// add(1, 2)
function add(a, b = 0) {
  return a + b
}

// is the same as
const add = (a, b = 0) => a + b

// is the same as
function add(a, b) {
  b = b === undefined ? 0 : b
  return a + b
}
```


### Rest/Spread

The `...` syntax can be thought of as kind of a "collection" syntax where it operates on a collection of values. I use it all the time and strongly recommend you learn how and where it can be used as well. It actually takes different meanings in different contexts, so learning the nuances there will help you.

```js
const arr = [5, 6, 8, 4, 9]
Math.max(...arr)
// is the same as
Math.max.apply(null, arr)

const obj1 = {
  a: 'a from obj1',
  b: 'b from obj1',
  c: 'c from obj1',
  d: {
    e: 'e from obj1',
    f: 'f from obj1',
  },
}
const obj2 = {
  b: 'b from obj2',
  c: 'c from obj2',
  d: {
    g: 'g from obj2',
    h: 'h from obj2',
  },
}
console.log({...obj1, ...obj2})
// is the same as
console.log(Object.assign({}, obj1, obj2))

function add(first, ...rest) {
  return rest.reduce((sum, next) => sum + next, first)
}
// is the same as
function add() {
  const first = arguments[0]
  const rest = Array.from(arguments).slice(1)
  return rest.reduce((sum, next) => sum + next, first)
}
```


### ESModules

If you're building an app with modern tools, chances are it supports modules, it's a good idea to learn how the syntax works because any application of even trivial size will likely need to make use of modules for code reuse and organization.

```js
export default function add(a, b) {
  return a + b
}

/*
 * import add from './add'
 * console.assert(add(3, 2) === 5)
 */

export const foo = 'bar'

/*
 * import {foo} from './foo'
 * console.assert(foo === 'bar')
 */

export function subtract(a, b) {
  return a - b
}

export const now = new Date()

/*
 * import {subtract, now} from './stuff'
 * console.assert(subtract(4, 2) === 2)
 * console.assert(now instanceof Date)
 */

```

### Ternaries

I love ternaries. They're beautifully declarative. Especially in React.

```js
const message = bottle.fullOfSoda
  ? 'The bottle has soda!'
  : 'The bottle may not have soda :-('

// is the same as
let message
if (bottle.fullOfSoda) {
  message = 'The bottle has soda!'
} else {
  message = 'The bottle may not have soda :-('
}
```

I realize that ternaries can get a knee-jerk reaction of disgust from some people who had to endure trying to make sense of ternaries before [prettier](https://prettier.io/) came along and cleaned up our code. If you're not using prettier already, I strongly advise that you do. Prettier will make your ternaries much easier to read.


###  Promises and async/await

This one's a big subject and it can take a bit of practice and time working with them to get good at them. Promises are everywhere in the JavaScript ecosystem and thanks to how entrenched React is in that ecosystem, they're everywhere there as well (in fact, React itself uses promises internally).

Promises help you manage asynchronous code and are returned from many DOM APIs as well as third party libraries. Async/await syntax is a special syntax for dealing with promises. The two go hand-in-hand.

`PS` : we have already covered promises and async await in great detail in JS module 

```js
function promises() {
  const successfulPromise = timeout(100).then(result => `success: ${result}`)

  const failingPromise = timeout(200, true).then(null, error =>
    Promise.reject(`failure: ${error}`),
  )

  const recoveredPromise = timeout(300, true).then(null, error =>
    Promise.resolve(`failed and recovered: ${error}`),
  )

  successfulPromise.then(log, logError)
  failingPromise.then(log, logError)
  recoveredPromise.then(log, logError)
}

function asyncAwaits() {
  async function successfulAsyncAwait() {
    const result = await timeout(100)
    return `success: ${result}`
  }

  async function failedAsyncAwait() {
    const result = await timeout(200, true)
    return `failed: ${result}` // this would not be executed
  }

  async function recoveredAsyncAwait() {
    try {
      const result = await timeout(300, true)
      return `failed: ${result}` // this would not be executed
    } catch (error) {
      return `failed and recovered: ${error}`
    }
  }

  successfulAsyncAwait().then(log, logError)
  failedAsyncAwait().then(log, logError)
  recoveredAsyncAwait().then(log, logError)
}

function log(...args) {
  console.log(...args)
}

function logError(...args) {
  console.error(...args)
}

// This is the mothership of all things asynchronous
function timeout(duration = 0, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(`rejected after ${duration}ms`)
      } else {
        resolve(`resolved after ${duration}ms`)
      }
    }, duration)
  })
}


```

## Challenges in Modern Frontend

** Question**
What are the Challenges faced in the modern frontend?
**Ans:**
* Code Maintainability
* Single Page Application
* Lot of functionalities

**Lot of feature in our WebApp**
- Hence the DOM manipulation is costly.

As we open linkedin we see a lot of functionalities such as shown below like home, mynetwork,jobs, messaging, me etc.

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/489/original/upload_a8b0bac0a165c827242385575fafe404.png?1699630915)
 
**Single Page Application (SPA)**
* That does not reload even if the URL is changed
* It is done by having single html file which utilizes the History API.
*  the cross team communication, and hot reload. This done using the Create-React-App ad Vite.

** Question**
**Q:** Then why there is so much name of react?
**Ans:** We have tools like document API(least performant), where the react can effeciently help to do  the DOM manipulation.

## What is React?

**React:** has the algorithm which efficiently manipulate the UI.

**Types of UI:**

|         |              |
|:-------:|:------------:|
| Desktop |   Electron   |
| Mobile  | React Native |
|   Web   |  React DOM   |
|   VR    |   React VR   |

Algorithm used is Reconciler that is why react is called as library.
### Why react is awesome ?

* React vs other frameworks : It is used way more than any other frontend framework out there . You can also refer this [link](https://insights.stackoverflow.com/trends?tags=reactjs%2Cangular%2Cvue.js%2Csvelte)  
![stackoverflow_trends](stack_overflow.png)
* There are always a lot of openings for react developers -> entry level , intermmediate and senior level [link](https://www.google.com/search?q=react+developer+jobs&sca_esv=598503895&rlz=1C5CHFA_enIN1022IN1022&sxsrf=ACQVn0_Ekoj7OEitiFFsdwLWATc3cWd98A%3A1705301395877&ei=k9WkZaudNYD04-EPvdek2Aw&ved=0ahUKEwjrsr7f5t6DAxUA-jgGHb0rCcsQ4dUDCBA&uact=5&oq=react+developer+jobs&gs_lp=Egxnd3Mtd2l6LXNlcnAiFHJlYWN0IGRldmVsb3BlciBqb2JzMg0QABiABBiKBRhDGLEDMggQABiABBiSAzIFEAAYgAQyBRAAGIAEMgUQABiABDIKEAAYgAQYigUYQzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIngxQ_AFYoAtwAXgBkAEAmAG6AqABqweqAQcwLjIuMC4yuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPCAhAQABiABBiKBRhDGLEDGIMBwgIIEAAYgAQYsQPiAwQYACBBiAYBkAYK&sclient=gws-wiz-serp)
*  There is a awesome ecosystem around react ![link](https://github.com/enaqx/awesome-react?tab=readme-ov-file#react-renderers) 

## Hello World in React 

Lets start creating the first application in react as the below code in the index.html.

* Just pasting the links for the algorithm to efficently change your UI and react dom.
* The whole application lives inside the root.
* Single page application (SPA) build using the javascript code.
* ReactDom render the component which is a function that return the html
* To print the hello React, using the doucument.getelementbyId by passing the root and inside that you want to put the hello component that is function which gets called and HelloReact gets printed.


```jsx
<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset = "UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE = edge"> 
    <meta name = "viewport" content = "width = device-width, initial-scale = 1.0">
    <title>Document</title>
    <!-- algorithm to efficiently manipulate your UI -->
    <script src = "https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    
    <!-- React DOM  -> uses react to update the DOM-->
    <script src = "https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    
     <!-- transpiler -> JSX -> into javascript -->
    <script src = "https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
    

<body>
    <!-- the whole application lives inside-->
    <div id = "root"></div>

    <!-- single Page applcation : JS -->
    <script type = "text/babel">
       
        function HELLO(obj) {
            return <h1>Hello React </h1>;
        }

        ReactDOM.render(<HELLO></HELLO>, document.getElementById("root"));
    </script>
</body>

</html>
```

This just prints nothing on the browser as shown below:

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/497/original/upload_72f4116cfcee76aa78c5781b70fa258b.png?1699633345)


As in the above function Hello which is returning something which is neither html and not the javascript. Hence we use the Babble transpiler to convert the code of the one language to another. Babble is a javascript compiler to one language to another here it is JSX to JS.

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/498/original/upload_670d3d99b94b2f2f48eb61a521409241.png?1699633373)


## Bare Bone React Example

If we take another example where without using JSX format to return the html unless we just use the simple JavaScript code with basic string manipulation that also print the same result on the browser as shown below:

```jsx
<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset = "UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE = edge">
    <meta name = "viewport" content = "width = device-width, initial-scale = 1.0">
    <title>Document</title>
    <script src = "./lib/react.js"></script>
    <script src = "./lib/reactDOM.js"></script>
</head>

<body>
    <div id = "root"></div>
    <script>

        function HELLO() {
            let name = "React";
            let age = 30
            return `<h1>Hello  ${name} Thanks Babel and you are ${age<18 ?"underage":"eligble"}</h1>`;
        }

ReactDOM.render(HELLO, document.getElementById("root"));
    </script>

</body>

</html>
```


```jsx
<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset = "UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE = edge">
    <meta name = "viewport" content = "width = device-width, initial-scale = 1.0">
    <title>Document</title>
    <!-- algorithm to efficiently manipulate your UI -->
    <script src = "https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    
    <!-- React DOM  -> uses react to update the DOM-->
    <script src = "https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    
    <!-- transpiler -> JSX -> into javascript -->
    <script src = "https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>

<body>
    <!-- the whole application lives inside-->
    <div id = "root"></div>

    <!-- single Page applcation : JS -->
    <script type = "text/babel">
        // -> component : a function that returns HTML
        function HELLO(obj) {
            let {age,occupation} = obj;
            let name = "Jasbir";

            return <h1>Hello {name} Thanks Babel :) is {age} old and works as {occupation} </h1>;
        }
        // a method in REACTDOM -> puts the retruned HTML from componente in root element
        ReactDOM.render(<HELLO age = {35} occupation = {"mentor and SDE "}></HELLO>, document.getElementById("root"));
    </script>
</body>

</html>
```

The reactDom.js file and the react.js file in the index.html is consist of the:

```javascript
let ReactDOM = {};
function render(component, root) {
    let OptimizedDOM = react(component);
    console.log("Rendering to DOM");
    // it puts into the root element
    root.innerHTML = OptimizedDOM;
}
ReactDOM.render = render;
```

```javascript
function react(component) {
    // calling that fn
    let dom = component();
    console.log("....optimizing changes");
    return dom;
}
```

1. component: Components are independent and reusable bits of code. 
2. They serve the same purpose as JavaScript functions, 
3. but work in isolation and return HTML
4. you create bigger components using smaller component



## JSX

JSON: Represent data in in JS fromat.
```javascript
{
name:Jasbir,
age:26
}
```

XML: Represent data in HTML

```javascript
<name>Jasbir</name>
<age>26</age>
```

In a typical web development workflow, JSX (a JavaScript extension used in libraries like React) is transformed into valid JavaScript, which is then utilized to render HTML elements. The resulting HTML can subsequently be converted into XML if needed for specific use cases or data interchange.



## Props

(Properties passed to a component) Passing the parameters that will be as objects.

```javascript
<script type = "text/babel">
        function HELLO(obj) {
            let {age,occupation} = obj;
            let name = "Jasbir";

            return <h1>Hello {name} Thanks Babel :) is {age} old and works as {occupation} </h1>;
        }
        ReactDOM.render(<HELLO age = {35} occupation = {"mentor and SDE "}></HELLO>, document.getElementById("root"));
</script>
```
![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/514/original/upload_3a5c83aa759fedde3fa4ddb2fa3ce43e.png?1699635530)



## Component Composition

If we are having the multiple components, then what will happen as shown below like in the HELLOPARENT component returning the HELLO component.

This code creates a single-page application using React and Babel. It defines two components, `HELLO` and `BYE`, which display messages. The `HELLOPARENT` component combines them. Finally, it renders the `HELLOPARENT` component into the HTML element with the ID "root."

```jsx
<body>
    <!-- the whole application lives inside-->
    <div id = "root"></div>

    <!-- single Page applcation : JS -->
    <script type = "text/babel">
        // -> component : a function that returns HTML
        function HELLO(prop) {
            let {name,age} = prop
            return <h1>Hello {name} Thanks Babel is {age} old </h1>;
        }
        function BYE(){
            return <p>BYE Component</p>
        }

        function HELLOPARENT() {
            return <div>
                <HELLO name = {"Rohan"} age = {10}></HELLO>
                <HELLO name = {"Rajneesh"} age = {30}></HELLO>
                <HELLO name = "Krishna" age = {40}></HELLO>
                <HELLO ></HELLO>
                <BYE></BYE>
                </div>

        }
        ReactDOM.render(<HELLOPARENT></HELLOPARENT>, document.getElementById("root"));
    </script>
</body>
```

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/515/original/upload_4c0071f1727e30cb02ea4e927d07de0c.png?1699635619)


- Create -> parent component from children component 
- Significance -> you can break a problem into multiple smaller parts
- A method in REACTDOM -> puts the returned HTML from component in root element

Like in the linkendin example shown below we can distribute the bigger block of info into smaller components like one for pic, for the three dots, for the information etc.

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/516/original/upload_42b7a589753bea34470b27f115f6835a.png?1699635748)

## Rendering List from Data

Intially the list items are fetched using the simple for loop from the list and gets rendered on the browser.

```jsx
<div id = "root"></div>
    <script type = "text/babel">
        let statinoary = ["Pen", "Pencil", "Eraser", "Ruler"];
        
        // console.log(liItemsArr)
        
        function List() {
            return<div>
                <h2>List Items</h2>
                <ul>{statinoary.map((item) => {
                    return <li>{item}</li>
                })}</ul>
            </div>
        }

        ReactDOM.render(<List></List>, document.getElementById("root"));
    </script>
```

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/517/original/upload_0b90af9c88d82aaa1b7535a2cb1650cd.png?1699635846)

When you want to print a list it expects an array of string and that string code should be valid html, so when you map you get the valid html in the form of an array and then react internally spread that and then put it as li element.

## Key Prop


Do you see any mistake here?

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/056/518/original/upload_93a7ee3cb2e710a3513898f5e5c65fb1.png?1699635897)

-> Every child in a list should have a key prop. A unique value for each list item.
-> A key ensures that none of the component is rendered multiple times. 
-> It also helps to identify each item uniquely.
-> Purpose of react is to optimize DOM.
-> Browser is very bad a doing DOM manipulation.
-> React makes it easier for the browser to manipulate DOM structure.

```jsx
<div id = "root"></div>
    <script type = "text/babel">
        let statinoary = ["Pen", "Pencil", "Eraser", "Ruler"];
        
        // console.log(liItemsArr)
        
        function List() {
            return<div>
                <h2>List Items</h2>
                <ul>{statinoary.map((item,idx) => {
                    return <li key = {idx}>{item}</li>
                })}</ul>
            </div>
        }

        ReactDOM.render(<List></List>, document.getElementById("root"));
    </script>
```
