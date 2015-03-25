(function() {
	var container;

	var kickoff = function() {
		container = document.getElementById('content');
		retrieveData();
	};

	var retrieveData = function() {
		var xhr = new XMLHttpRequest();
		xhr.onload = gotData;
		xhr.open('GET', 'http://api.randomuser.me/?results=100', true);
		xhr.send();
	};

	var gotData = function() {
		var data = JSON.parse(this.responseText);
		console.log('data', data);

		for (var i = 0; i < data.results.length; i++) {
			var record = document.createElement('div');
			record.classList.add('contact');

			var image = document.createElement('img');
			image.src = data.results[i].user.picture.medium;

			record.appendChild(image);
			container.appendChild(record);
		}
	};

	document.addEventListener('DOMContentLoaded', kickoff);
})();
