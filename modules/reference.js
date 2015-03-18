// As we get more complex JS apps, splitting the code across multiple files is a good thing
// If everything's global, conflicts are common
// If nothing's global, how to the multiple files communicate?

// Raw JS
// <script src="modA.js"></script>
// <script src="script.js"></script>

// ModA
(function() {
	var publicFunction = function() {
		console.log('Omnipresent');
	};
})();

// Script
(function() {
	publicFunction();
})();


// Stick things on the global scope to make them available
// <script src="modA.js"></script>
// <script src="script.js"></script>

// ModA
(function() {
	var publicFunction = function() {
		console.log('Omnipresent');
	};
	window.publicFunction = publicFunction;
})();

// Script
(function() {
	publicFunction();
})();


// There's still the problem with load order
// Things are back on the global scope = bad

// What else is there?


// Common JS

// ModA
var publicFunction = function() {
	console.log('from Module A');
};

module.exports.publicFunction = publicFunction;

// Script
var modA = require('./modA');
modA.publicFunction();

// Simple, easy to understand
// Requires a packaging step to prepare for browser (browserify, webpack)
// Feels very non-native for the browser


// Dependencies in modules

// ModB
var anotherFunction = function() {
	console.log('from Module B');
};

module.exports.anotherFunction = anotherFunction;

// ModA
var modB = require('./modB');
var publicFunction = function() {
	console.log('from Module A');
	modB.anotherFunction();
};

module.exports.publicFunction = publicFunction;

// Script
var modA = require('./modA');
modA.publicFunction();


// AMD - Asyncronous Module Definition
// <script data-main="script.js" src="http://requirejs.org/docs/release/2.1.16/minified/require.js"></script>

// ModA
define(function() {
	return {
		publicFunction: function() {
			console.log('from Module A');
		}
	}
});

// Script
require(['modA'], function(modA) {
	modA.publicFunction();
});

// A little more native for the browser
// A little more complicated syntax and config
// Still requires a lib to provide functionality at runtime (RequireJS, Cujo curl)


// Dependencies in modules

// ModB
define(function() {
	return {
		anotherFunction: function() {
			console.log('from Module B');
		}
	}
});

// ModA
define(['modB'], function(modB) {
	return {
		publicFunction: function() {
			console.log('from Module A');
			modB.anotherFunction();
		}
	}
});

// Script
require(['modA'], function(modA) {
	modA.publicFunction();
});


// ES6 - ECMAScript 6 - The new JS standard
// <script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
// <script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
// <script src="script.js" type="module"></script>

// ModA
var publicFunction = function() {
	console.log('from Module A');
};

export { publicFunction }

// Script
import * as modA from 'modA.js';
modA.publicFunction();

// Similar syntax as other languages, especially Python
// Not available in browsers now
// Requires a packaging step to prepare for browser (Square's es6-module-transpiler, Traceur)


// Dependencies in modules

// ModB
var anotherFunction = function() {
	console.log('from Module B');
};

export { anotherFunction }

// ModA
import * as modB from 'modB.js';

var publicFunction = function() {
	console.log('from Module A');
	modB.anotherFunction();
};

export { publicFunction }

// Script
import * as modA from 'modA.js';
modA.publicFunction();


// wide support for ES6
// this standard likely to be widely adopted


// declare exports inline

// ModA
export function publicFunction() {
	console.log('from Module A');
};

// Script
import * as modA from 'modA.js';
modA.publicFunction();


// import only part of a module

// ModA
export function publicFunction() {
	console.log('from Module A');
};

// Script
import { publicFunction } from 'modA.js';
publicFunction();

// You can use it as if it was local.


// Default exports

// ModA
export default function publicFunction() {
	console.log('from Module A');
};

// Script
import modAFunction from 'modA.js';
modAFunction();
