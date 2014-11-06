'use strict';

/* User Service */

var userServices = angular.module('userServices', ['authFrameworks']);

userServices.factory('userService', ['authProvider', function(authProvider) {

	var authImplementation;
	var _config;
	var localConfig = {
      onLogin: onLogin,
      onLogout: onLogout,
      onRefreshUser: onRefreshUser,
      onNotAuthorized: onNotAuthorized,
      onInadequatePermissions: onInadequatePermissions,
      requiredPermissions: []
    }

	var authUser = {
			isLoggedIn: false,
			username: '',
			providerData: undefined,
			clear : clear
		};


	function clear() {
		authUser.isLoggedIn = false;
		authUser.username = '';
		authUser.providerData = undefined;
	}

	function init(config) {
		_config = config;
		localConfig.requiredPermissions = config.requiredPermissions;
		
		authImplementation = authProvider;
		authImplementation.init(localConfig);
	}

	function onLogin(data) {
		authUser.isLoggedIn = true;
		authUser.providerData = data;

		if (_config.onLogin) {
			_config.onLogin(authUser);
		}
	}

	function onLogout(data) {
		authUser.clear();

		if (_config.onLogout) {
			_config.onLogout();	
		} 
	}

	function onInadequatePermissions() {
		authUser.clear();
		authUser.username = data.name;

		if (_config.onInadequatePermissions) {
			_config.onInadequatePermissions();
		};
	}

	function onNotAuthorized(data) {
		authUser.clear();

		if (_config.onNotAuthorized) {
			_config.onNotAuthorized();
		}
	}

	function onRefreshUser(data) {
		authUser.username = data.name;
		authUser.providerData = data;

		if (_config.onRefreshUser) {
			_config.onRefreshUser(data);
		}
	}

	function refreshUser() {
		authImplementation.refreshUser();
	}


	function logout(logoutFromProvider) {
		authUser.isLoggedIn = false;
		authUser.username = '';
		authUser.providerData = undefined;

		if (logoutFromProvider) {
			authImplementation.logout();	
		}
	}

	return {init: init,
			refreshUser: refreshUser,
			user : authUser,
			logout: logout};
}])