// Angular
// So you want to build an app with Angular


// Single page apps, the hard way
// <script src="script-raw.js"></script>

// DOM manipulation intermingled with business logic
// Difficult to unit test


// Let's try this with Angular

// Load on the page
// <html ngApp>
// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
// <script src="script.js"></script>

// ngApp is your $rootScope
// You can define anything on your page as the root of your app
// Angular only cares about the stuff inside the root of your app


// Providing a scope for your code

// index.html
// <html ngApp="app">
// <script src="script.js"></script>
// <div ng-controller="ContactsController">
// </div>

// script.js
var appModule = angular.module('app', []);

appModule.controller('ContactsController', ['$scope', function($scope) {

}]);

// The code for the content div is in the ContactsController


// Suggested method for attaching controllers now
// looks forward to Angular 2

// index.html
// <div ng-controller="ContactsController as contacts">
// </div>

// script.js
var appModule = angular.module('app', []);

appModule.controller('ContactsController', [function() {

}]);


// Supplying data to your HTML

// script.js
appModule.controller('ContactsController', [function() {
	this.foo = 'bar';
}]);


// Making the API request

// Copy from script-raw.js
// Add call to retrieveData()
// Change the XHR to use $http (add dependency)
// Create this.records
// Create scope alias for root this
// Assign to this.records in success callback
// Create div for single contact
// Add ng-repeat
// Add image with ng-src

// script.js
appModule.controller('ContactsController', ['$http', function($http) {
	var scope = this;
	this.records = [];

	var retrieveData = function() {
		$http.get('http://api.randomuser.me/?results=100')
			.success(function(data, status, headers, config) {
				scope.records = data.results;
			});
	};

	retrieveData();
}]);

// index.html
// <div ng-controller="ContactsController as contacts">
// 	<div class="contact" ng-repeat="record in contacts.records">
// 		<img ng-src="{{record.user.picture.medium}}">
// 	</div>
// </div>


// Handling user input

// script.js
this.select = function(record) {
	console.log('clicked', record);
};

// index.html
// <div ng-controller="ContactsController as contacts">
// 	<div class="contact" ng-repeat="record in contacts.records" ng-click="contacts.select(record)">
// 		<img ng-src="{{record.user.picture.medium}}">
// 	</div>
// </div>


// Evaluating expressions on every change

// index.html
// <p ng-hide="contacts.records.length > 0">Loading</p>

// Could also supply a reference to a function in your controller (like the click)
// Angular manages checking for changes and re-evaluating the expressions to change the view
// Be conservative when using all this ng-magic!


// Shared code in a service

// write service to handle data retrieval

// script.js
appModule.controller('ContactsController', ['contactsService', function(contactsService) {
	var scope = this;
	this.records = [];

	this.select = function(record) {
		console.log('clicked', record);
	};

	contactsService.retrieveData()
		.success(function(data, status, headers, config) {
			scope.records = data.results;
		});
}]);

appModule.service('contactsService', ['$http', function($http) {
	this.retrieveData = function() {
		return $http.get('http://api.randomuser.me/?results=100');
	};
}]);
