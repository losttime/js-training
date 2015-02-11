// Everything is an object

var object = {
	property: 'value',
	nested: {
		property: 'value'
	}
};
console.log(object);


// This object has methods you can call on it
// just by virtue of being an object

console.log(object.toString());
console.log(object.valueOf());


// Can we set our own prototype properties?

object.prototype.foo = function() {
	console.log('food');
};


// Add properties to the definition, not the instance
// The definition is hidden behind Object shorthand
// Long-form:

var custom = new Object();
custom.property = 'value';
custom.nested = {
	property: 'value'
};
Object.prototype.foo = function() {
	console.log('food');
};

console.log(custom);


// Would be possible except for some advanced techniques to lock us out

// Let's make our own

function Custom() {}
Custom.prototype.foo = function() {
	console.log('food');
};

var custom = new Custom();
custom.property = 'value';
custom.nested = {
	property: 'value'
};


// How is that any different from this:

var object = {
	property: 'value',
	nested: {
		property: 'value'
	},
	foo: function() {
		console.log('food');
	}
};

// It's effectively the same, but `foo()` is different in one small way
// With the shorthand way, you're modifying just that one object
// If you'll have multiple objects, you have to add `foo()` to each of them
// With the prototype, you're modifying all objects

// More than just convenience for multiple objects too
// Modifying the prototype is more performant
// - Not creating a new function for each instance


// Using the constructor

function Custom() {
	this.property = 'value';
	this.nested = {
		property: 'value'
	};
}
Custom.prototype.foo = function() {
	console.log('food');
};

var custom = new Custom();


// Relationship between prototype and instance

function Custom() {
	this.property = 'value';
	this.nested = {
		property: 'value'
	};
}
Custom.prototype.foo = function() {
	console.log(this.property, 'food');
};
Custom.prototype.bar = function(value) {
	this.property = value;
};

var custom = new Custom();


// Private properties
// Not accessible from the outside, or the prototype

function Custom() {
	var priv = 'secret';
	this.property = 'value';
	this.nested = {
		property: 'value'
	};
}
Custom.prototype.foo = function() {
	console.log(this.property, 'food');
};
Custom.prototype.bar = function(value) {
	this.property = value;
};
Custom.prototype.getPrivate = function() {
	console.log('private', this.priv);
	console.log('private', priv);
};

var custom = new Custom();


// Making use of private properties

function Custom() {
	var priv = 'secret';
	this.property = 'value';
	this.nested = {
		property: 'value'
	};
	this.getPriv = function() {
		return priv;
	};
}
Custom.prototype.foo = function() {
	console.log(this.property, 'food');
};
Custom.prototype.bar = function(value) {
	this.property = value;
};
Custom.prototype.getPrivate = function() {
	console.log('private', this.getPriv());
};

var custom = new Custom();

// What's the point?
// Just because you can write it sloppy doesn't mean you can't write it well.
// Unless you get into way advanced JavaScript, don't bother trying to enforce private properties

// If your prototype is for a single instance, feel free to put the functions in the constructor.
// - the function will only be created once anyway
// If you'll have many instances of your prototype, consider putting functions on the prototype.
// - leave the properties public, or create lightweight accessor methods (if it even makes sense?)


// Inheritence

function Custom2() {}
Custom2.prototype = Object.create(Custom.prototype);

var custom2 = new Custom2();
console.log(custom2);


// Override methods

function Custom2() {}
Custom2.prototype = Object.create(Custom.prototype);
Custom2.prototype.getPrivate = function() {
	console.log('not yet implemented');
};

var custom2 = new Custom2();


// Call the parent

function Custom2() {}
Custom2.prototype = Object.create(Custom.prototype);
Custom2.prototype.getPrivate = function() {
	console.log('not yet implemented');
	Custom.prototype.getPrivate.call(this);
};

var custom2 = new Custom2();


// Prototype using Object shorthand

function Custom3() {}
Custom3.prototype = {
	foo: function() {
		console.log('food')
	}
};

var custom3 = new Custom3();

console.log(custom3);


// Prototype from scratch

function Custom4() {}
Custom4.prototype = Object.create(null);
Custom4.prototype.foo = function() {
	console.log('food');
};

var custom4 = new Custom4();

console.log(custom4);


// Exercise

// Write some prototypes to represent the roles of people you interact with at work
// Possible roles: Team Lead, Product Manager, Scrum Master, etc.

// Write functions on these prototypes to represent things those people do at work
// User inheritence to share functions across prototypes that do similar things
// For Instance: Every prototype might be built off the Employee prototype

// Create instances of these prototypes to represent specific people.
// Create functions to represent thing a specific person does.
