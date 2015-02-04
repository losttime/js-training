var ಠ_ಠ = "huh?";
// Getting feedback

alert("Hello, World!");


console.log('Hello, World!');


var greeting = 'Hello, World!';
console.log(greeting);


// Explore types of variables

var logged;
logged = 'Characters "strung" together';
logged = 1337;
logged = 3.1415;
logged = true;


// Operations
var start = 1;
logged = start + 2;


var first = 'Get';
var second = 'Together';
logged = first + second;


var word = 'Hawaii';
var number = 5.0;
logged = word + number;


var array = ['apple', 'banana', 'carrot'];
logged = array;
logged = array[0];


array[2] = 'cranberry';
array.push('dragonfruit');
logged = array;


var anotherArray = ['first', 2, true, ['inner', 'list'], word];
logged = anotherArray;
logged = anotherArray[3][1];


var object = {
	property: 'value'
};
logged = object;
logged = object.property;


object.property = 'updated value';
logged = object;


var anotherObject = {
	height: 72,
	names: [
		"David",
		"Cox",
		"David the Red"
	],
	contact: {
		phone: [
			'801-123-4567'
		],
		email: [
			'dcox@jive.com',
			'losttime@techie.com'
		]
	},
	fruit: array
}
logged = anotherObject;
logged = anotherObject.names[2];
logged = anotherObject['contact'].email[0];


function foo() {
	return 'foo result';
}


var foo = function() {
	return 'foo result';
}
logged = foo;
logged = foo();


var increment = function(input) {
	var newNumber = input + 1;
	return newNumber;
};
logged = increment(1);


console.log(logged);


// What is the interface for `console`?
// (based on what we already know about it)


var loggedIn = true;
var requestPermission = function() {
	if (loggedIn) {
		console.log('granted');
	} else {
		console.log('forbidden')
	}
}
requestPermission();


var name = 'David';
var giveNickname = function() {
	if (name === 'David') {
		var nickname = 'David the Red';
	} else {
		var nickname = name;
	}
};
giveNickname();
logged = nickname;


var data = 'default';
var showData = function() {
	if (!data) {
		var data = 'retrieved';
	}
	console.log(data);
};
showData();


console.log(logged);
