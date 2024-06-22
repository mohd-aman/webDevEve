---
title: Agenda of the lecture
description: What will be covered in the topic?
duration: 120
card_type: cue_card
---

## Agenda 

- What is Event Propagation?
- Concept of Bubbling 
- Concept of capturing
- Machine coding question
    - Star Rating Component
    - Counter Component

We will try to cover most of these topics in today's session

So let's start.

---
title: Event Propagation
description: Discussion of Event propagation and related concepts of bubbling and capturing.
duration: 2100
card_type: cue_card
---

## Event Propagation
1. Event propagation refers to the process of how events are dispatched and processed in the Document Object Model (DOM) hierarchy of elements in web development. 
2. There are two main phases of event propagation: capturing phase and bubbling phase. 
3. During these phases, events can propagate through the DOM tree from the root to the target element (capturing) or from the target element back up to the root (bubbling).

### Bubbling
  1. Event bubbling is one of the phases of event propagation in the DOM. When an event occurs on a DOM element, it first triggers the event handlers on the target element itself, then it bubbles up to its parent elements in the DOM hierarchy. 

2. This allows for the creation of more general event listeners that can be applied to parent elements to handle events from multiple child elements.

### Capturing
1. Event capturing is the other phase of event propagation in the DOM. During the capturing phase, events start from the root element and propagate down to the target element. 

2. This phase occurs before the bubbling phase and can be useful when you want to capture events on parent elements before they reach their child elements.


**All this definitions didn't make sense right? Felt like some paragrapghs copy pasted from google**

But now let's make sense of these terms and then again we will come back to these definitions

---
title: Event Bubbling
description: Discussion of Event propagation and related concepts of bubbling and capturing.
duration: 2100
card_type: cue_card
---

let's use an example to understand event bubbling and capturing with three nested `<div>` elements: `#grandparent`, `#parent`, and `#child`. Suppose you have the following HTML structure:

```html
<div id="grandparent">
  <div id="parent">
    <div id="child"></div>
  </div>
</div>
```

Now, let's say we attach a click event listener to each of these `<div>` elements and observe how events work.

```javascript
const grandparent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

grandparent.addEventListener('click', function() {
  console.log('Grandparent clicked');
});

parent.addEventListener('click', function() {
  console.log('Parent clicked');
});

child.addEventListener('click', function() {
  console.log('Child clicked');
});
```


### Concept of Event Bubbling

Event bubbling is a type of event propagation in the DOM where an event not only triggers the event handlers on the target element (the element on which the event occurred) but also triggers event handlers on its ancestor elements in the hierarchy, bubbling up from the target element to the root of the document.

In this example, if you click on the `child` div, here's what happens due to event bubbling:

1. The `click` event is first dispatched to the `child` div, and any event listeners attached to the `child` are invoked. In this case, "Child clicked" is logged to the console.

2. The event then bubbles up to the `parent` div, triggering any event listeners attached to the `parent`. Consequently, "Parent clicked" is logged.

3. The event continues to bubble up to the `grandparent` div, and "Grandparent clicked" is logged as the event listeners on the `grandparent` are also triggered.

4. If there were more ancestor elements (up to the `document` object), the event would continue to bubble up, potentially triggering their event listeners as well.


```
Child clicked
Parent clicked
Grandparent clicked
```

This example demonstrates the sequence of event propagation during the bubbling phase in the context of nested `<div>` elements.



---
title: Event Capturing
description: Discussion of Event propagation and related concepts of bubbling and capturing.
duration: 2100
card_type: cue_card
---




Let's explore the event propagation using the `useCapture` parameter set to `true` for the same example with the three nested `<div>` elements: `#grandparent`, `#parent`, and `#child`.

```javascript
const grandparent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

grandparent.addEventListener('click', function() {
  console.log('Grandparent clicked (Capturing)');
}, true);

parent.addEventListener('click', function() {
  console.log('Parent clicked (Capturing)');
}, true);

child.addEventListener('click', function() {
  console.log('Child clicked (Capturing)');
}, true);
```

Let's break down the code and see how capturing works:



#### Adding Event Listeners
The code then adds a `click` event listener to each of these elements. The `addEventListener` method is used to achieve this, and it takes three arguments:

1. The type of event to listen for (`"click"` in this case).
2. The function to call when the event occurs. Here, it logs a message indicating which element was clicked and notes that it's capturing the event.
3. A boolean value that specifies whether to use capturing. Setting this to `true` opts into the capturing phase.

### How Capturing Works

### Step by Step Through a Click on `child`
If the `child` element is clicked:

1. The capturing phase is initiated from the `document` down towards the `child`. First, the `grandparent`'s click event listener is triggered, logging `"Grandparent clicked (Capturing)"`.
2. The event continues to propagate to the `parent`, triggering its event listener and logging `"Parent clicked (Capturing)"`.
3. Finally, the event reaches the `child`, its event listener is triggered, and it logs `"Child clicked (Capturing)"`.

4. Since all the event listeners were set up for capturing and there are no listeners for the bubbling phase in this code, the event propagation ends here.

**Output-**

```
Grandparent clicked (Capturing)
Parent clicked (Capturing)
Child clicked (Capturing)
```

#### Quick Summary of both the Scenarios

**Scenario 1: useCapture set to `false` (Bubbling)**

When you click on the `#child` element, the event will propagate in the bubbling phase. The order of event handling will be:


from the innermost Element to the outermost Element , just like how a bubble flows from bottom to top

1. `#child` clicked (Bubbling)
2. `#parent` clicked (Bubbling)
3. `#grandparent` clicked (Bubbling)

The output in the console will be:

```
Child clicked (Bubbling)
Parent clicked (Bubbling)
Grandparent clicked (Bubbling)
```

**Scenario 2: useCapture set to `true` (Capturing)**

When you click on the `#child` element, the event will propagate in the capturing phase. The order of event handling will be:

1. `#grandparent` clicked (Capturing)
2. `#parent` clicked (Capturing)
3. `#child` clicked (Capturing)

The output in the console will be:

```
Grandparent clicked (Capturing)
Parent clicked (Capturing)
Child clicked (Capturing)
```

In both scenarios, the event propagation follows the sequence based on the capturing or bubbling phase, as determined by the `useCapture` parameter. 


---
Event Propagation cycle



### Event Propagation Cycle

Now as you understand the concepts of Bubbling and Capturing , There is a cycle that we can understand known as Event Propagation cycle

The event propagation cycle refers to the sequence of phases through which an event travels within the Document Object Model (DOM) hierarchy. There are two main phases in the event propagation cycle and the target Element

the capturing phase and the bubbling phase. Here's an overview of the cycle:

1. **Capturing Phase:**
   - The event starts at the root of the DOM tree (typically the `<html>` element).
   - The event travels down the DOM tree through each ancestor element of the target element.
   - During this phase, event handlers registered with the capturing phase (`useCapture` set to `true`) are triggered on each ancestor element in the order they appear in the hierarchy from the root to the target.
   - The event reaches the target element.

2. **Target Phase:**
   - The event reaches the target element for which the event was triggered.
   - Event handlers registered on the target element are executed.

3. **Bubbling Phase:**
   - After the target phase, the event travels back up the DOM tree in reverse order.
   - Event handlers registered with the bubbling phase (`useCapture` set to `false`) are triggered on each ancestor element in the reverse order from the target to the root.
   - The event eventually reaches the root of the DOM tree.

<img src=https://javascript.info/article/bubbling-and-capturing/eventflow.svg>


---
title: Stop Propagation 
description: 
duration: 2100
card_type: cue_card
---

 Now Sometimes you would want to stop the propagation of the event , Suppose you only want the event to propagate upto a certain element and not after that , How would you achieve this?

 let's modify the example to demonstrate how to stop event propagation after the click event on the `#child` element using the `stopPropagation` method. 
 
 Here's the updated code:

```javascript
const grandparent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

grandparent.addEventListener('click', function(e) {
  console.log('Grandparent clicked (Bubbling)');
});

parent.addEventListener('click', function(e) {
  console.log('Parent clicked (Bubbling)');
});

child.addEventListener('click', function(e) {
  console.log('Child clicked (Bubbling)');
  e.stopPropagation(); // Stop propagation after clicking the child element
});
```

1. In this example, when you click on the `#child` element, the event propagation will be stopped after the event handler for the `#child` element executes. 

As a result, the event will not continue to bubble up to the parent and grandparent elements. Only the message "Child clicked (Bubbling)" will be logged to the console.

If you remove the line `e.stopPropagation();`, you'll see the standard bubbling behavior where the event continues to propagate, and you'll see all three messages in the console: "Child clicked (Bubbling)", "Parent clicked (Bubbling)", and "Grandparent clicked (Bubbling)".

Remember that stopping propagation can impact the expected behavior of event handling, so it should be used with caution and only when necessary.


You can play around now with setting `true` `false` for the useCapturing , stopping propagations and observing the behaviours

