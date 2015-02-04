// Review HTML format
// <script> in <head>
// <button> and <div> in <body>

var buttons = document.getElementsByTagName('button');
console.log(buttons);
console.log(buttons[0]);  // undefined


// JavaScript runs as it loads
// 1. Browser pulls down the HTML
// 2. Sees reference to JS as it loads the HTML
// 3. Downloads the JS
// 4. Loads the JS
//
// I don't know why the HTML gets lapped by the JS


// Try sleeping before running

setTimeout(function() {
	var buttons = document.getElementsByTagName('button');
	console.log(buttons[0]);
}, 1000);


// Why did logging buttons work, but not a specific button?
// - When logging the array, the array exists, and gets modified just before logging.
// - When logging a specific item, the item is asked for before it exists, so undefined is returned
//     and undefined is logged.
//
// Tricky!


// Getting around page load timing issues
// - Put your JS in a function that gets run after an event happens
// - Put your <script> at the end of the <body>

// Script in <head> that waits for pageload

document.addEventListener('DOMContentLoaded', kickoff, false);

var kickoff = function() {
	var buttons = document.getElementsByTagName('button');
	console.log(buttons[0]);
};

// Script and end of <body>

var buttons = document.getElementsByTagName('button');
console.log(buttons[0]);


// Other methods of getting elements

var button = document.getElementById('runnerButton');
console.log(button);


// Add jQuery
// <script src="https://code.jquery.com/jquery-2.1.3.js"></script>
var buttons = $('button');
console.log(buttons);


var button = document.querySelector('button');
console.log(button);


var buttons = document.querySelectorAll('button');
console.log(buttons);


// Now that we have an element . . .
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

// Modify the style - it's CSS
button.style.color = 'red';
button.style.backgroundColor = '#bada55';
button.style.fontSize = '2em';
button.style.position = 'relative';
button.style.left = '100px';

// Modify the DOM itself
button.textContent = 'Click Me!';

var parent = button.parentNode;
parent.removeChild(button);

var paragraph = document.createElement('');
paragraph.textContent = '1';

var container = document.querySelector('div');
container.appendChild(paragraph);


// Put content in the container when the user clicks the button.

// In the container, display the number of times the user has clicked the button.
