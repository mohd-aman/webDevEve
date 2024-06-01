Sure, here are four multiple-choice questions (MCQs) related to Promises in JavaScript, ranging from basic concepts to code-based scenarios. Each question includes four options, with one correct answer indicated.

### 1: Basic Understanding of Promises

**Question:** What is a Promise in JavaScript?

**Options:**
A. A data structure that stores multiple values.
B. A function that is used to perform HTTP requests.
C. An object representing the eventual completion or failure of an asynchronous operation.
D. A template for creating HTML elements.

**Correct Answer:** C. An object representing the eventual completion or failure of an asynchronous operation.

### 2: Promise States

**Question:** Which of the following options correctly represents the possible states of a Promise?

**Options:**
A. Running, Waiting, Completed
B. True, False, Undefined
C. Pending, Fulfilled, Rejected
D. Initialized, Executing, Paused, Stopped

**Correct Answer:** C. Pending, Fulfilled, Rejected

### 3: Creating and Resolving a Promise

**Question:** Consider the following JavaScript code snippet. What will be logged to the console?

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("Success!");
});

promise.then(function(value) {
  console.log(value);
});
```

**Options:**
A. "Success!"
B. "Resolved"
C. "Error"
D. undefined

**Correct Answer:** A. "Success!"

### 4: Chaining Promises

**Question:** Given the following code snippet, what is the output of the console.log statement?

```javascript
new Promise((resolve, reject) => resolve(1))
  .then((result) => result * 2)
  .then((result) => result * 3)
  .then((result) => {
    console.log(result);
    return result / 2;
  });
```

**Options:**
A. 1
B. 2
C. 6
D. 3

**Correct Answer:** C. 6

