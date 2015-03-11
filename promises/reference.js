// Only going to cover ES6 promises, because that's the new standard.
// Not available in all browsers yet, but libraries offer the same functionality

(function() {
	var getUserData = function() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://api.randomuser.me/', true);
		xhr.onload = function(event) {
			gotUserData(JSON.parse(this.response));
		};
		xhr.onerror = function(event) {
			noUserData(this.statusText);
		};
		xhr.send();
	}

	var gotUserData = function(userData) {
		console.log('got user data', userData);
	};

	var noUserData = function(error) {
		console.log('error getting user data', error);
	};

	getUserData();
})();


// What if they're in separate modules?

(function() {
	var getUserData = function(successCallback, failureCallback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://api.randomuser.me/', true);
		xhr.onload = function(event) {
			successCallback(JSON.parse(this.response));
		};
		xhr.onerror = function(event) {
			failureCallback(this.statusText);
		};
		xhr.send();
	}

	window.getUserData = getUserData;
})();


(function() {
	var gotUserData = function(userData) {
		console.log('got user data', userData);
	};

	var noUserData = function(error) {
		console.log('error getting user data', error);
	};

	getUserData(gotUserData, noUserData);
})();


// Here's how promises solves that same problem.

// First, what is a promise?

var p1 = new Promise(function(resolve) {
	setTimeout(function() {
		resolve('finished p1');
	}, 2000);
});

p1.then(function(value) {
	console.log('as promised', value);
});


// Promises can be rejected

var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		reject('bad data');
	}, 2000);
});

p1.then(function(value) {
	console.log('as promised', value);
}, function(error) {
	console.log('error', error);
});


// Chaining "then"s

var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('finished p1');
	}, 2000);
});

p1.then(function(value) {
	console.log('as promised', value);
	return value;
}, function(error) {
	console.log('error', error);
}).then(function(value) {
	console.log('chained', value);
});


// Chaining promises

var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('finished p1');
	}, 2000);
});

p1.then(function(value) {
	console.log('as promised', value);
	return new Promise(function(resolve, reject) {
		resolve('secondary data');
	});
}, function(error) {
	console.log('error', error);
}).then(function(value) {
	console.log('chained', value);
});


// catching errors

var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		reject('bad data');
	}, 2000);
});

p1.then(function(value) {
	console.log('as promised', value);
	return new Promise(function(resolve, reject) {
		resolve('secondary data');
	});
}).then(function(value) {
	console.log('chained', value);
}).catch(function(error) {
	console.log('caught', error);
});


// Promisified XHR

(function() {
	var getUserData = function() {
		var promise = new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://api.randomuser.me/', true);
			xhr.onload = function(event) {
				resolve(JSON.parse(this.response));
			};
			xhr.onerror = function(event) {
				reject(this.statusText);
			};
			xhr.send();
		});
		return promise;
	}

	window.getUserData = getUserData;
})();

(function() {
	var promise = getUserData();

	promise.then(function(userData) {
		console.log('got user data', userData);
	});
	promise.catch(function(error) {
		console.log('error getting user data', error);
	});
})();


// Our own Promise

// The user passes a function containing the work they want done
// We run their work, giving them the resolve and reject capability

var Jromise = function(work) {
	var resolve = function(data) {
	};
	var reject = function(data) {
	};

	work(resolve, reject);
};

// We allow the user to attach success and failure callbacks
// We call those callbacks when the work is resolved or rejected

var Jromise = function(work) {
	var successCallback;
	var failureCallback;

	this.then = function(callback, callback2) {
		successCallback = callback;
		failureCallback = callback2;
	};
	this.catch = function(callback) {
		failureCallback = callback;
	};

	var resolve = function(data) {
		successCallback(data);
	};
	var reject = function(data) {
		failureCallback(data);
	};

	work(resolve, reject);
};

// Add a little return so then is chainable

var Jromise = function(work) {
	var successCallback;
	var failureCallback;

	this.then = function(callback, callback2) {
		successCallback = callback;
		failureCallback = callback2;
		return this;
	};
	this.catch = function(callback) {
		failureCallback = callback;
	};

	var resolve = function(data) {
		successCallback(data);
	};
	var reject = function(data) {
		failureCallback(data);
	};

	work(resolve, reject);
};

// var Jromise = function(work) {
// 	var result;
// 	var error;
// 	var successCallback;
// 	var failureCallback;
//
// 	this.then = function(callback) {
// 		successCallback = callback;
// 		if (result !== undefined) {
// 			successCallback(result);
// 		}
// 		return this;
// 	};
// 	this.catch = function(callback) {
// 		failureCallback = callback;
// 		if (error !== undefined) {
// 			failureCallback(error);
// 		}
// 		return this;
// 	};
//
// 	var resolve = function(data) {
// 		result = data;
// 		successCallback(result);
// 	};
// 	var reject = function(data) {
// 		error = data
// 		failureCallback(error);
// 	};
//
// 	work(resolve, reject);
// };
