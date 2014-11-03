'use strict';

/* User Service */

var user = angular.module('userInit',[]);
user.factory('user', [function () {

	var user = {
		isLoggedIn: false,
		username: ''
	};

	return user;
}]);

var userLogin = angular.module('userLogin', ['userInit']);
userLogin.factory('login', ['user', function (user) {

	return function(user) {
		user.isLoggedIn = true;
		user.username = 'Danno';
	}
}]);


var userLogout = angular.module('userLogout', ['userInit']);
userLogout.factory('logout', ['user', function (user) {

	return function(user) {
		user.isLoggedIn = false;
		user.username = '';
	}
}]);

var userServices = angular.module('userServices', ['userInit', 'userLogin', 'userLogout']);
userServices.factory('userService', ['user','login','logout',
						     function(user, login, logout) {


	var userServ = {
		user: user,
		login: login,
		logout: logout
	}

	return userServ;
}])