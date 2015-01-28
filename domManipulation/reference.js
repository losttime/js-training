// Take a look at the HTML
// Note there is a HEAD and a BODY
// The HEAD contains information about the page, as well as declaring needed resources
// The BODY contains the page content

// Script in HEAD that executes immediately

var triggerElement = document.querySelector('button');
triggerElement.addEventListener('click', function(event) {
	console.log('event', event);
});


// Script in HEAD that waits for pageload

document.addEventListener( "DOMContentLoaded", kickoff, false );

var kickoff = function() {
	var triggerElement = document.querySelector('button');
	triggerElement.addEventListener('click', function(event) {
		console.log('event', event);
	});
};


// Script in the BODY

var triggerElement = document.querySelector('button');
triggerElement.addEventListener('click', function(event) {
	console.log('event', event);

	// Put a number in the content DIV when the button is clicked

	var contentContainer = document.querySelector('div');

	var p = document.createElement('p');
	p.textContent = '1';

	contentContainer.appendChild(p);
});


// What happens when you click the button multiple times?


// Make the number increment
