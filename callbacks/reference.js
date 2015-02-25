//
var somethingDifficult = function() {
	for (var i = 0; i < 1000; i++) {
		// some hard work
	}
	console.log('work done');
};

var foo = function() {
	somethingDifficult();
	console.log('food');
}

foo();


// Make foo take a callback

var somethingDifficult = function(callback) {
	for (var i = 0; i < 1000; i++) {
		// some hard work
	}
	console.log('work done');
	callback();
};

var foo = function() {
	somethingDifficult(function() {
		console.log('called back');
	});
	console.log('food');
}

foo();

// What's the difference between calling foo then calling bar?


// Add more logs to see what's going on

var somethingDifficult = function(callback) {
	for (var i = 0; i < 1000; i++) {
		// some hard work
	}
	console.log('work done');
	callback();
	console.log('callback called');
};

var foo = function() {
	console.log('fooing');
	somethingDifficult(function() {
		console.log('called back');
	});
	console.log('food');
}

console.log('starting');
foo();
console.log('done');

// It behaves like we would expect.
// Isn't JavaScript weird and async?


// Make an asynchronous call

var foo = function() {
	console.log('fooing');
	// New type of hard work - a REST request
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.randomuser.me/', true);
	xhr.onload = function() {
		console.log('called back');
	};
	xhr.send();
	console.log('food');
}

console.log('starting');
foo();
console.log('done');

// What's the difference between a synchronous and asynchronous call?


// The Event loop
/*
https://www.youtube.com/watch?v=8aGhZQkoFbQ

V8 is the JavaScript engine in Chrome

Stack is where work in progress is managed
Heap is where memory is allocated, etc

foo goes on the stack
somethingDifficult goes on the stack
somethingDifficult comes off the stack when complete
foo comes off the stack when complete
ready for more work!

Review how foo() works with somethingDifficult()

Queue is where pending work is held
When the stack is empty, a job is pulled from the queue and becomes the base of the stack

How does stuff get put in the Queue?
A space exists outside the JS engine where I/O operations are performed
 - network requests
 - file storage
 - timers
 - event listeners
 - other browser APIs
Each of these calls takes a function as a parameter
When the work is done, the function is put on the Queue

Review how foo() works with XMLHttpRequest()

JavaScript is run on the UI thread
The same thread the browser uses to update the UI.
When JS is running, the browser can't do other UI stuff
 - modifying DOM
 - click animations
 - scrolling

What are the implications for writing good JavaScript?
*/


// If this goes on much longer, there will be many many nested callbacks
// It is called "Callback Hell" (seriously)

var foo = function() {
	console.log('fooing');
	// New type of hard work - a REST request
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.randomuser.me/', true);
	xhr.onload = function() {
		console.log('called back');
		// Now all future work much be done here
		// If any other network requests happen, all work will be nested there . . .
		// and deeper and depper into callback hell.
	};
	xhr.send();
	console.log('food');
}

console.log('starting');
foo();
console.log('done');


// example of callback hell


// Make your functions flat

var foo = function() {
	console.log('fooing');
	// New type of hard work - a REST request
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.randomuser.me/', true);
	xhr.onload = bar;
	xhr.send();
	console.log('food');
}

var bar = function() {
	console.log('called back');
};

console.log('starting');
foo();
console.log('done');

// There are other ways to deal with callback hell
// They typically require a dependency of some sort
// Flat functions are good practice anyway (IMHO)
