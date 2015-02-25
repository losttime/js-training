var SPIModule = function() {
	var config = {};

	this._getConfigs = function() {
		return config;
	};
}

SPIModule.prototype.configure = function(callback) {
	var scope = this;
	var configs = this._getConfigs();

	var configCount = Object.keys(configs).length;
	var i = 0;
	for (key in configs) {
		this.setRegister(parseInt(key), configs[key], function(err, data) {
			i++;
			if (i >= configCount) {
				scope.changeMode(MODE_STANDBY, function(err, data) {
					scope.doAfterReady(function() {
						scope.interrupt.watch(function(err, value) {
							if (err) {
								throw err;
							}
						});
						scope.changeMode(MODE_RECEIVE, function(err, data) {
							scope.setRegister(RADIO_STATE_1, STATE_1_RECEIVE, function() {
								scope.setRegister(RADIO_STATE_2, STATE_2_RECEIVE, function() {
									callback();
								});
							});
						});
					});
				});
			}
		});
	}
};
