---
title: Svelte tutorial note
date: "2020-06-20"
published: true
tags: "svelte, javascript, selfnote"
author: Sung M. Kim
banner: ./images/featured-image.jpg
bannerCredit: "Image by [William Krause](https://unsplash.com/@williamk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) from [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)"
---

This is a note as I wrote down as I was going through [Svelte tutorial](https://svelte.dev/tutorial/basics).

Might be of helpful for some but foremost, this is a note for myself :)

## 1. Introduction

### Creating a new Svelte project

https://svelte.dev/blog/svelte-for-new-developers

```bash
npx degit sveltejs/template new-project-name
```

### VS Code

Install following extensions

1. [Svelte](https://github.com/sveltejs/language-tools)
2. [Svelte Intellisense](https://github.com/ArdenIvanov/svelte-intellisense)

## 2. Reactivity

### a. Assignments 

https://svelte.dev/tutorial/reactive-assignments

`on:click` `on` looks like a directive and `click` is the event name.  
States are reactive, closure under `script` tag re-renders whenever the state value changes.

```html
<script>
	let count = 0;

	function handleClick() {
		count++;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

### b. Declarations

https://svelte.dev/tutorial/reactive-declarations

Computed/derived states need to be declared using a special syntax, `$:`.  

```js
let count = 0;
$: doubled = count * 2;
```
Useful when it needs to be access multiple times.  
Instead of `{count * 2}` everywhere, you can use `{doubled}` instead.

### c. Statements

https://svelte.dev/tutorial/reactive-statements

`$:` isn't limited to expressions (*reactive values*) but also to statements.

```html
<script>
	let count = 0;
	
	$: console.log(`the count is ${count}`);

	$: if (count >= 10) {
		alert(`count is too high!`)
		count = 9;
	}
	
	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

### d. Updating arrays and objects

https://svelte.dev/tutorial/updating-arrays-and-objects


A simple rule of thumb: the name of the updated variable must appear on the left hand side of the assignment.  
Or assign a new reference like you do in React.

```js
// Instead of this
function addNumber() {
  numbers.push(numbers.length + 1);
  numbers = numbers
}

// Do this
function addNumber() {
  numbers = [...numbers, numbers.length + 1]
}
```

## 3. Props

### a. Declaring props

https://svelte.dev/tutorial/declaring-props

For passing data to another component(s). Same concept as it does in React.

In React, components receive `props` but in Svelte, you export a variable.

`Nested.svelte`
```html
<script>
  export let answer;
</script>
<p>The answer is {answer}</p>
```

`App.svelte` imports `Nested` component and passes the answer like following.

```html
<script>
  import Nested from './Nested.svelte'
</script>

<Nested answer={42}>
```

### b. Default values

https://svelte.dev/tutorial/default-values

You can set the default prop value during declaration

`Nested.svelte`
```html
<script>
  export let answer = 'is unknown!';
</script>
<p>The answer is {answer}</p>
```

If no props passed to `Nested` like `<Nested>`, then the default value is used.

### c. Spread props

https://svelte.dev/tutorial/spread-props

As you can do in React, you can pass multiple props with object spread operator.

```html
<Info {...pkg}>
```

## 4. Logic

### a. If blocks

https://svelte.dev/tutorial/if-blocks

The markup is avaiable in Svelte only, not in HTML.

```html
{#if user.loggedIn}
  <button on:click={toggle}>Log Out</button>
{/if}

{#if !user.loggedIn}
  <button on:click={toggle}>Log In</button>
{/if}
```

### b. Else blocks

https://svelte.dev/tutorial/else-blocks

Mutually exclusive condition can use `{:else}` block

```html
{#if user.loggedIn}
<button on:click={toggle}>Log Out</button>
{:else}
<button on:click={toggle}>Log In</button>
{/if}
```

### c. Else-if blocks

https://svelte.dev/tutorial/else-if-blocks

Additional condition can be checked with `{:else if condition}`

```html
{#if x > 10}
  <p>{x} is greater than 10!</p>
{:else if x < 5 }
  <p>{x} is less than 5
{:else}
  <p>{x} is 'teween 5 and 10</p>
{/if}
```

### d. Each blocks

https://svelte.dev/tutorial/each-blocks

You can iterate an iterable object with `{#each iterable as alias, index}`

```html
<ul>
{#each cats as cat, index}
  <li>{index + 1}th cat is {cat.name}</li>
{/each}
</ul>
```

The alias can be destructured like

```html
{#each cats as {name, id, age}, index}
  <li>{index + 1}th cat is {name} and is {age} years old</li>
{/each}
```

### e. Keyed each blocks

https://svelte.dev/tutorial/keyed-each-blocks

In React, creating an iterable element requires `key` per each element.

e.g.)

```js
{things.map(thing => <li key={thing.id}>{thing.color}</li>)}
```

In Svelte, you specify the key in the markup.

```html
{#each things as thing (thing.id)}
  <li>{thing.color}</li>
{/each}
```

Or you can destructure `thing`

```html
{#each things as {id, color} (id)}
	<Thing current={color}/>
{/each}
```

### f. Await blocks

https://svelte.dev/tutorial/await-blocks

Svelte markup has a way to `await` promises.  
Race condition is handled automatically because Svelte only grabs the latest/most recent promise only.

```html
{#await promise}
  <p>Loading...</p>
{:then number}
  <p>The value is {number}<p>
{:catch error}
  <p class="error">{error.message}</p>
{/await}
```

You can decide not to show the intermediate "loading" message and wait 'til the promise resolves.

```html
{#await promise then number}
  <p>The value is {number}<p>
{/await}
```

This is much cleaner abstraction than in React, in which one needs to use `useEffect` to resolve promise in an async method and set the state.


## 5. Events

### a. DOM events

https://svelte.dev/tutorial/dom-events

Use `on:` directive, followed by DOM event name.

e.g.) [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)

```html
<script>
	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<style>
	div { width: 100%; height: 100%; }
</style>

<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```

### b. Inline handlers

https://svelte.dev/tutorial/inline-handlers

⚠ Inline event handlers does not cause any performance issues unlike in React, as Svelte knows how to optimize.

Instead of,

```html
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```

You can inline `handleMousemove` as shown below.

```html
<div on:mousemove={e => m = {x: e.clientX, y: e.clientY}}>
	The mouse position is {m.x} x {m.y}
</div>
```

Or, wrap the inline method in quotes for syntax highlighting in some editors

```html
<div on:mousemove="{e => m = {x: e.clientX, y: e.clientY}}">
	The mouse position is {m.x} x {m.y}
</div>
```

### c. Event modifiers

https://svelte.dev/tutorial/event-modifiers

You can "decorate" (my intepretaion) event with modifiers such as

* `once`: run the handler once
* `prevetnDefault`: `event.preventDefault()` before calling the handler
* `stopPropagation`: `event.stopPropagation()` to stop the event bubble/capture
* `passive`: for touch/wheel scrolling performance ([Google added it](https://developers.google.com/web/updates/2016/06/passive-event-listeners) as a non-standard but it's supported widely)
* `capture`: DOM events "bubble-up" by default. This reverses it as `capture` (Refer to MDN [Event.eventPhase](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase))
* `self`: `event.target === current element`.

e.g.) using `once` to run an event handler only once on a button

```html
<button on:click|once={handleClick}>Click me</button>
```

Modifiers are chainable. `on:click|once|capture|preventDefault`

`handleClick` will be called once once no matter how many times you press the button.

⚠ Space is significant! The code below is not valid as there are spaces between `|`.

```html
<button on:click | once={handleClick}>Click me</button>
```

### d. Component events

https://svelte.dev/tutorial/component-events

Unlike custom event dispatch in vanilla JS, [where you pass custom data as `detail` property](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail#Example),

```js
// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
let event = new CustomEvent("cat", {
  👇
  detail: {
    hazcheeseburger: true
  }
});
obj.dispatchEvent(event);
```

you dispatch an event with data and it will be available as part of `event.detail` automatically.


`Inner.svelte`
```html
<script>
	import {createEventDispatcher} from 'svelte'
	
	const dispatch = createEventDispatcher()

	function sayHello() {
    // NOT THIS!
    // dispatch('message', {detail: {text: 'hi!'}})
    // But pass the data as it is
		dispatch('message', { text: 'Hello!' });
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>
```

You can then use the component and subscribe to the event, `message` like following.

`App.svelte`

```html
<script>
	import Inner from './Inner.svelte';

	function handleMessage(event) {
    // Access "text" via 👇 event.detail 
		alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage}/>
```

This pattern is different from React where an inner component receives an "event handler" as a function and calls it, not declare an event.

```js
const App = () => <Inner onMessage={handleMessage}>
const Inner = ({onMessage}) => <button onClick={onMessage}>Click</button>
```

So it seems that in Svelte, event handlers are declared using vanilla JavaScript's [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) interface.

### e. Event forwarding

https://svelte.dev/tutorial/event-forwarding

DOM events are bubbled up while Svelte events aren't. Explicit event forwarding can be done by creating event dispatcher in each level.  

Svelte can forward events with a shortcut where you specify the `on:eventname` directive without a value.

```html
<Inner on:message>
```

Then all `on:message` event handlers will be forwarded up and made available to the calling component.

_Note: this is tough to grasp. Need to come back later._

### f. DOM event forwarding

https://svelte.dev/tutorial/dom-event-forwarding

Svelte requires you explicitly decide whether to expose an event or not. 

When there is more than one element in inner component exposing the same event, say two buttons with `on:click`,


`CustomButton.svelte`
```html
<button id="b1" on:click>
	Click me
</button>

<button id="b2" on:click>
	Click me2
</button>
```

Then you can tell which one was fired by examining `event.target`

`App.svelte`
```html
<script>
  import CustomButton from './CustomButton.svelte'

  function handleClick(event) {
    console.log(`e =>`, event.target)
  }
</script>

<CustomButton on:click={handleClick}> />
```

CustomButton click on `#b1` and `#b2` results in,

```js
e => <button id=​"b1">​Click me​</button>​
e => <button id=​"b2">​Click me2​</button>​
```

## 6. Bindings

### a. Text inputs

https://svelte.dev/tutorial/text-inputs

Sorta like a two-way binding, where changes in an element updates the state and the current state.

```html
<script>
	let name = 'world!'
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

Updating values in `input` will update `name` state as well as the input's value.

### b. Numeric inputs

https://svelte.dev/tutorial/numeric-inputs

**batteries included**

Svelte auto converts input of type `number` & `range` to numeric values.  
React requires explicit conversion as it's metal.

### c. Checkbox inputs

https://svelte.dev/tutorial/checkbox-inputs

Checkbox input type value is bound to `bind:checked` instead of `bind:value`.

```html
<script>
	let isChecked = false
</script>
<input type="checkbox" bind:checked={isChecked}>
```

### d. Group inputs

https://svelte.dev/tutorial/group-inputs

In vanilla JS, you use `name` to group related checkboxes and radio.  
MDN Reference: [`<input type="radio">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)

```html
<form>
											👇
	<input type="radio" name="scoops" value="1">
	<input type="radio" name="scoops" value="2">
	<input type="radio" name="scoops" value="3">
</form>
```

but in Svelte, you bind a group using `bind:group` directive.

```html
<form>
											👇
	<input type="radio" bind:group="scoops" value="1">
	<input type="radio" bind:group="scoops" value="2">
	<input type="radio" bind:group="scoops" value="3">
</form>
```

When bound to a radio group, then the bound value is one value, but on checkboxes, the bound value is an array.

```html
<script>
	let scoops = 1;
	let flavours = [];
</script>

<!-- Radio `scopes` bound to a single value -->
<label>
	<input type=radio bind:group={scoops} value={1}>
	One scoop
</label>
<label>
	<input type=radio bind:group={scoops} value={2}>
	Two scoops
</label>
<label>
	<input type=radio bind:group={scoops} value={3}>
	Three scoops
</label>

<!-- Checkbox group value, `favlours` is an array -->
<label>
	<input type=checkbox bind:group={flavours} value="Cookies and cream">
	Cookies and cream
</label>
<label>
	<input type=checkbox bind:group={flavours} value="Mint choc chip">
	Mint choc chip
</label>
<label>
	<input type=checkbox bind:group={flavours} value="Raspberry ripple">
	Raspberry ripple
</label>
```

### e. Textarea inputs

https://svelte.dev/tutorial/textarea-inputs

Same as `<input type="text">`. You bind value using `bind:value={value}`. If the value variable name matches `value`, then you can leave out the assignment, like,

```html
<textarea bind:value></textarea>
```

### f. Select bindings

https://svelte.dev/tutorial/select-bindings

Like Textarea, you can use `bind:value={value}` and leave out the assignment, `bind:value` if the variable name is `value`.

```html
<script>
let value;
let answer = ""
const questions = [
	{id: 1, 'question #1'},
	{id: 2, 'question #2'},
	{id: 3, 'question #3'},
]
</script>

<!-- this works too	👇 -->
<!-- <select bind:value={value} on:change="{() => answer = ""}"> -->
<select bind:value on:change="{() => answer = ""}">
	{#each questions as question}
		<option value={question}>{question.text}</option>
	{/each}
</select>

<input bind:value={answer}>
```

### g. Select multiple

https://svelte.dev/tutorial/multiple-select-bindings

I've already mentioned this in `d. Group inputs` - https://svelte.dev/tutorial/group-inputs

Binding to a select with `multiple` directive sets the value to an array.

`flavours` is an array.

```html
<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

### h. Contenteditable bindings

https://svelte.dev/tutorial/contenteditable-bindings

You can bind to either `textContent` or `innerHTML`

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
<!-- or -->
<div
	contenteditable="true"
	bind:textContent={html}
></div>
```

> Check out the [difference between `textContent` & `innerHTML`](https://wiki.developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerHTML)  
& why one should [consider using `textContent` over `innerHTML`](https://wiki.developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations).

### i. Each block bindings

https://svelte.dev/tutorial/each-block-bindings

Don't use this if you plan to go with immutable data (React style).  
Familiar with imperative style? go with this.

### j. Medial elements

https://svelte.dev/tutorial/media-elements

Media elements' (`video/audio`) are updated more frequently using `requestAnimationFrame`.

### k. Dimensions

https://svelte.dev/tutorial/dimensions

Every [block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements), such as `div`, `section`, `article`, [etc](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#Elements) have bindings to following props.

* [clientWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
* [clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)
* [offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
* [offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)

### l. This

https://svelte.dev/tutorial/bind-this

`bind:this={variable}` returns a reference to rendered elements.  
`variable` will be `undefined` until the component has mounted.  
Use [onMount](https://svelte.dev/tutorial/onmount) lifecycle to refer to the variable.

Note: This looks like `ref` in React.

### m. Component bindings

https://svelte.dev/tutorial/component-bindings

As mentioned previously, you can `bind:value` for custom components to provide a two-way binding.

Changes in child component will be available in the parent element.

`Keypad.svelte`

```html
<script>
export let value;
</script>
...
```

Suppose that in `App.svelte`,

```html
<script>
	import Keypad from './Keypad.svelte'

	let pin;

	const handleSubmit = () => console.log(`pin => ${pin}`)
</script>

<input bind:value={pin} />
<Keypad bind:value={pin} on:submit={handleSubmit}>
```

You can bind to `Keypad` with `bind:value={pin}`. It works as both an input and output to `Keypad` component.  
It can be demo'ed by changing values in `<input bind:value={pin} />`.

Awesome! Very convinient. But you have to be careful as you can lose track of the state flow.

In React, one would have to pass a callback function to call it whenever child value changes and the parent would update the state via the callback.

`App.jsx`
```html
function App() {
	const [pin, setPin] = React.useState(null)

	return <Keypad onChange={setPin} />
}
```

## 7. Lifecycle

### a. onMount

https://svelte.dev/tutorial/onmount

It's comparable to the mix of [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount) and [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) because it's called when a component is mounted, and cleans up with a callback function returned from it (that's [how useEffect does a clean up](https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect)).

And also, `componentDidMount` can be `async` and `useEffect` cannot call an async method.

As it's the recommended way to call `fetch` in React, `onMount` is normally where one should make a network request.

```html
<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await fetch('https://www...');
		photos = await response.json();

		return () => {
			// clean up resources here
		};
	});
</script>
```

### b. onDestroy

https://svelte.dev/tutorial/ondestroy

`onDestroy` is like React's [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount). Use it clean up resources on component's unmount phase.

```html
<script>
	import { onDestroy } from 'svelte'

	let seconds = 1;
	const id = setInterval(() => seconds++, 1000)

	onDestroy(() => void clearInterval(id))
</script>
```

### c. beforeUpdate and afterUpdate

https://svelte.dev/tutorial/update

Flows like,

`beforeUpdate` -> `onMount` -> `beforeUpdate` -> state changes -> `afterUpdate` -> `onDestroy`

As `beforeUpdate` runs BEFORE `onMount`, one needs to check for existence of elements

### d. tick

https://svelte.dev/tutorial/tick

To get around batch processing (state updates, DOM updates, etc)

```html
<script>
	import { tick } from 'svelte'
</script>
```

## 8. Stores

### a. Writable stores

https://svelte.dev/tutorial/writable-stores

Svelte has batteries included. It comes with a global state management library.  

`svelte/store` has `writable` method to create a global state.  

`store.js`
```js
import { writable } from 'svelte/store'

export const count = writable(0)
```

Then one can import `count` in `store.js`, either to read, update, or set the value.

1. Reading via subscription   
		- `writable` returns a state, which you can `subscribe()` for the value change  
		- It is a HoF (higher-order function), which returns a function to unsubscribe  
		- It's the same as [how Redux store's subscribe returns unsubscribe method](https://redux.js.org/basics/store#dispatching-actions)  
		- My guess is that you need to call `unsubscribe` in `onDestroy` normally to clean up  
```html
<script>
	import { onDestroy } from 'svelte'
	import { count } from './store'

	let countValue;
	const unsubscribe = count.subscribe(value => { countValue = value });
	// Clean up after your business!
	onDestroy(unsubscribe);
</script>
```   

2. Updating the state
		- `writable` returns a state, which you can `update` values for  
		- It requires a callback, which is given the current value to update with
```html
<script>
	import { count } from './store.js'
	const incrementCount = () => count.update(currentValue => currentValue + 1)
</script>

<button on:click={incrementCount}>Increment Count by One/button>
```

3. Setting the state (convinience method for update)  
		- `set` method looks like a convinience method to `update`   
		- as you can simply set a value without a callback function
```html
<script>
	import { count } from './store.js'
	const reset = () => count.set(0)
</script>

<button on:click={reset}>Reset Count</button>
```

### b. Auto-subscriptions

https://svelte.dev/tutorial/auto-subscriptions

Svelte has yet another convinient way to subscribe to the global state change.  
With `$` prefixed to a variable, Svelte takes care of both un/subscription out of the box.

Instead of this verbose un/subscribe for `count`, 

```html
<script>
	import { onDestroy } from 'svelte'
	import { count } from './store'

	let countValue;
	const unsubscribe = count.subscribe(value => { countValue = value });
	// Clean up after your business!
	onDestroy(unsubscribe);
</script>

<p>Count value is {countValue}</p>
```

You can simply prefix `count` with `$` like `$count`.

```html
<script>
	import { onDestroy } from 'svelte'
	import { count } from './store'
</script>

<p>Count value is {$count}</p>
```

Make sure to read notes in the linked page.

### c. Readable stores

https://svelte.dev/tutorial/readable-stores

Readable store provides, duh, read-only store, for which one can initialize but can't update.  
It looks similar to `useEffect` that the returned function is called when "the last subscriber unsubscribes".

`store.js`

```js
import { readable } from 'svelte';

const initialValue = new Date();
const valueUpdator = set => {
	const id = setInterval(() => set(new Date()), 1000);

	// called when the last subscriber unsubscribes.
	return () => clearInterval(id);
}

export const time = readable(initialValue, valueUpdator);
```

And the same as `wriable` store, you can refer to it with `$` prefix, like `$time` in another file.

### d. Derived stores

* Tutorial: https://svelte.dev/tutorial/derived-stores
* API: https://svelte.dev/docs#derived

The tutorial prefixes `time` with `$` like `$time` in the callback.  

[Auto-subscriptions](https://svelte.dev/tutorial/auto-subscriptions) tutorial states that

> Any name beginning with $ is assumed to refer to a store value. It's effectively a reserved character — Svelte will prevent you from declaring your own variables with a $ prefix.

But I tried it without `$` prefix as shown below but still works.

```js
export const elapsed = derived(
	time,
	t => Math.round((t - start) / 1000)
);
```

Not sure if `$` is required. Left a question on Reddit.  
https://www.reddit.com/r/sveltejs/comments/hblmxa/question_derived_callback_in_tutorial_uses_a/

### e. Custom stores

https://svelte.dev/tutorial/custom-stores

One can create a custom store by implementing `subscribe` method.  
Tutorial uses `wriable`'s `subscribe` to expose the interface and doesn't show how to implement one yourself.

### f. Store bindings

https://svelte.dev/tutorial/store-bindings

Store value referred to with `$` prefix can be bound as if it's a local state.

```html
<script>
import { name } from './store.js';
</script>

<input bind:value={$name}>
```

Typing in the input will update `$name` and will trigger update itself and all dependents.

## 9. Motion

### a. Tweened

https://svelte.dev/tutorial/tweened

Svelte has a built-in motion library without having to install a 3rd party library.  
In React, you'd use `react-spring`, or `react-motion`, etc.

### b. Spring

https://svelte.dev/tutorial/spring

Use this instead of `tweened` for frequently changing values

## 10. Transitions

### a. The transition directive

https://svelte.dev/tutorial/transition

Another batteries-included way to provide transition in JavaScript.  
According to Chrome Devtools, `<p transition:fade>` injects an inline style to fade in/out.

```html
<script>
	import { fade } from 'svelte/transition';
	let visible = true;
</script>

{#if visible}
<p transition:fade>Fade in and out</p>
{/if}
```

### b. Adding parameters

https://svelte.dev/tutorial/adding-parameters-to-transitions

You can also pass in-line parameters to transition functions in the markup.

```html
<script>
	import { fly } from 'svelte/transition';
	let visible = true;
</script>

<input type=checkbox bind:checked={visible}>

{#if visible}
<p transition:fly="{{ y: 200, duration: 2000 }}">Flies in and out</p>
{/if}
```

Transitions are "reversible".
Toggling visibility doesn't abruptly starts transition from beinging or the end.  
It reverses where it left off.  
Refer to the linked tutorial page to see it in action! Cool stuff.

### c. In and out

https://svelte.dev/tutorial/in-and-out

You can granularly contorl transition with `in` & `out` directives instead of `transition`.

### d. Custom CSS transitions

https://svelte.dev/tutorial/custom-css-transitions

Looks simple so long as you undersand CSS transition and motions etc.  
I know neither well so it's tough.

To learn first: [Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) on MDN.

### e. Custom JS transitions

https://svelte.dev/tutorial/custom-js-transitions

Use `tick` callback to implement JS transitions for effects not possible by CSS transitions.

### f. Transition events

https://svelte.dev/tutorial/transition-events

Monitor `transition` directive events with following directives

* `on:introstart`
* `on:outrostart`
* `on:introend`
* `on:outroend`

### g. Local transitions

https://svelte.dev/tutorial/local-transitions

`local` transition makes transitions to occur on individual elements, not for a group of items.

Honestly, I really haven't found a use for this.

### h. Deferred transitions

https://svelte.dev/tutorial/deferred-transitions

More advanced transition concept I'd have to learn later.

## 11. Animations

### a. The animate directive

https://svelte.dev/tutorial/animate

Oh boy. come back later...

## 12. Actions

### a. The use directive

https://svelte.dev/tutorial/actions

Use `use:` directive to specify the action.

```html
<script>
	import { pannable } from './pannable.js';
</script>
<div use:pannable></div>
```

`pannable` is a function, which accepts a DOM node.

```js
// Fires following custom events
// 1. panstart
// 2. panmove
// 3. panend
export function pannable(node) {}
```

When the `pannable` dispatches a custom event, the parent component can subscribe to it in the markup.

```html
<script>
	import { pannable } from './pannable.js';

	// These functions have access to `event` dispatched from `pannable`
	const handlePanStart = event => {}
	const handlePanMove = event => {}
	const handlePanEnd = event => {}
</script>
<div 
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="transform:
		translate({$coords.x}px,{$coords.y}px)
		rotate({$coords.x * 0.2}deg)"
></div>
```

Clean up of the action can be done by exposing `onDestroy`.

```js
export function pannable(node) {
	return {
		onDesotry() {
			// clean up the mess
		}
	}
}
```

### b. Adding parameters

https://svelte.dev/tutorial/adding-parameters-to-actions

Just like transitions, actions can accept arguments.

```html
<script>
	import { longpress } from './longpress.js';
</script>
<div use:longpress={duration}></div>
```

When the duration is changed, `longpress.js` won't know that the `duration` has changed.  
To subscribe to the `duration` change, implement `update` function in the action

`longpress.js`
```js
export function longpress(node, duration) {
	return {
		update(newDuration) {
			duration = newDuration
		}
	}
}
```

Multiple arguments can be passed to the action as an object

```html
<script>
	import { longpress } from './longpress.js';
</script>
<div use:longpress={{duration, spiciness}}></div>
```

and accept the object in the action.

`longpress.js`
```js
export function longpress(node, { duration, spiciness }) {}
```

## 13. Classes

### a. The class directive

https://svelte.dev/tutorial/classes

Svelt provides a shortcut for class toggle.  

> It's just `class` in Svelte not `className` as it is in React.

```html
<script>let current = 'foo';</script>
<style>
	.someActiveClass {
		background-color: red;
		color: white
	}
</style>

<button 
	class:someActiveClass="{current='foo'}" 
	on:click="{() => current = 'foo'}">
>foo</button>

<button 
	class:someActiveClass="{current='bar'}" 
	on:click="{() => current = 'bar'}">
>bar</button>

<button 
	class:someActiveClass="{current='baz'}" 
	on:click="{() => current = 'baz'}">
>baz</button>
```
Whenever the condition matches, the custom class append after `class:` is added.

### b. Shorthand class directive

https://svelte.dev/tutorial/class-shorthand

The shorthand for the shortcut (whew, what a mouthful) is that you can leave out the directive assignment if the class to toggle matches the variable name.

```html
<div class:big={big}></div>
```

can be shortened to

```html
<div class:big></div>
```

## 14. Component composition

### a. Slots

https://svelte.dev/tutorial/slots

This is just like React's `children` to specify where to put child components in the current one.

Svelte component is not a function, but more like a markup w/ scripts and styles.  
So to access children, you need to specify `<slot></slot>` or `<slot />`.

You can specify multiple `<slot />`, which will show the children multiple times.

`box.svelte`
```html
<style>
	.box {}
</style>

<div class="box">
	<slot></slot>
	<!-- or -->
	<slot />
</div>
```

And pass the children to the box component.

```html
<script>
	import Box from './box.svelte';
</script>

<Box>
	<h1>Here is the child header</h1>
	<p> this is the content <p>
</Box>
```

Personal note: This is more to how React should have been as React's supposed to be declarative.  
Svelte correctly uses the markup declration for the child, while React is imperative with `children`. (Not to mention `children` can be anything like a function to implement [render props](https://reactjs.org/docs/render-props.html)).

### b. Slot fallbacks

https://svelte.dev/tutorial/slot-fallbacks

If you weren't specifying any fallback, you could use `<slot />` but to provide a fallback (when a user didn't specify a child), then you can use a longer `<slot>fallback content</slot>`.

`box.svelte`
```html
<style>
	.box {}
</style>

<div class="box">
	<slot>Fallback content!!!</slot>
</div>
```

The example of none-child passed to `Box` is as shown below

```html
<script>
	import Box from './Box.svelte';
</script>

<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>

<Box></Box>
<Box />
```

### c. Named slot

https://svelte.dev/tutorial/named-slots

In React, one would expose seprate components or static child components like this.

```js
function App() {
	return (
		<ContactCard>
			<ContactCard.Name>Sung Kim</ContactCard.Name>
			<ContactCard.Address />
		</ContactCard>
	)
}
// or
function App() {
	return (
		<ContactCard>
			<ContactCardName>Sung Kim</ContactCardName>
			<ContactCardAddress />
		</ContactCard>
	)
}
```

It requires to create seprate component for `ContactCardName` or `ContactCardAddress`, each of which accepts its own `children` function.

This is where things get interesting.  
You can specify which "slot" you want to insert the child content into!

`ContactCard.svelte`
```html
<style>
	.missing {}
</style>

<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
```

As shown in the previous section, each named slots contain fallbacks.

The calling component specifies the slot in the child component

`App.svelte`
```html
<script>
	import ContactCard from './ContactCard.svelte';
</script>

<ContactCard>
	<span slot="name">Sung</span>
	<span slot="email">Sung@sung.com</span>
</ContactCard>
```

### c. Slot props

https://svelte.dev/tutorial/slot-props

Passing data from `slot` to the parent component, one needs to declare the exposed state (via slot) while declaring the component

You don't declare a variable in the parent component but just sorta like "bind" using `let`.

`Hovering.svelte`: a component containg a slot.
```html
<script>
	let hovering;

	const enter = () => hovering = true;
	const leave = () => hovering = false;
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot hovering={hovering}></slot>
	<!-- or use the hsort hand -->
	<!-- <slot hovering></slot> -->
</div>
```

To access `hovering` in the parent component, use `let` as mentioend before.

`Parent.svelte`
```html
<script>
	import Hoverable from './Hoverable.svelte';
</script>

<Hoverable let:hovering={hovering}>
	<div class:active={hovering}>
		{#if hovering}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

Note that `hovering` variable is not declared in the `script` but could be used inside `Hovering`.

## 15. Context API

### a. setContext and getContext

https://svelte.dev/tutorial/context-api

Svelte's Context API is similar to that of React;  
Only decendant child components can access context data using `getContext` expoed via `setContext` in the parent.

`store` is more like [Zustand](https://github.com/react-spring/zustand) where state is avaiable anywhere in the component hierachy.

Difference between React & Svelte Context API is that, React's API is declarative using a markup, Svelte imperative, using `setContext` during component initialization.

`React`
```js
function App() {
	return (
		<Context.Provider value={value}>
			children can access context value here
		</Context.Provider>
	)
}
```

## 16. Special elements

### a. <svelte:self>

https://svelte.dev/tutorial/svelte-self

To recursively refer the current component.

There is a typo in the documentation so filed an issue: https://github.com/sveltejs/svelte/issues/5044  
**Update**: ["a file" refers to the current file, not the `File` component](https://github.com/sveltejs/svelte/issues/5044#issuecomment-647046475). So the documentation is correct. Clsoed the issue.


### b. <svelte:component>

https://svelte.dev/tutorial/svelte-component

Use `<svelte:component this={component}>` to load a component dynamically.

To pass props, pass it to `<svelte:component>`.

```html
<svelte:component text="custom text" this={selected.component}/>
```

`text` is then passed to `selected.component` (not documented in the tutorial just found out by mistake).

Make sure that the dynamic component accepts the prop.

e.g.) `RedThing.svelte`

```html
<style>
	strong { color: red; }
</style>

<script>
	export let text = "red thing";
</script>

<strong>{text}</strong>
```

### c. <svelte:window>

https://svelte.dev/tutorial/svelte-window

It's a declarative way to add events to `window` object.

### d. <svelte:window> bindings

https://svelte.dev/tutorial/svelte-window-bindings

Turns out, you can also bind to some of `window`'s properties, not just events.

### e. <svelte:body>

https://svelte.dev/tutorial/svelte-body

This lets you bind events declaratively in the `document.body`.

### f. <svelte:head>

https://svelte.dev/tutorial/svelte-head

Injecting content inside `<html><head>`.  
No need for `react-helmet` like 3rd party library.

### g. <svelte:options>

https://svelte.dev/tutorial/svelte-options

advanced Svelte compiler options.  
Most notably, you can specify immutibility to optimize component render in a list.

## 17. Module context

### a. Sharing code

https://svelte.dev/tutorial/sharing-code

This looks like a "static" variable avaiable throughout the all the instances of a component.  
Possibly a prototype value.

### b. Exports

https://svelte.dev/tutorial/module-exports

Exporting within module level script can be imported from another Svelte component.

## 18. Debugging

### a. The @debug tag

https://svelte.dev/tutorial/debug

The better "console.log" :p

---

<span>Photo by <a href="https://unsplash.com/@williamk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">William Krause</a> on <a href="/s/photos/elegant?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>


