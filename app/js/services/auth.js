'use strict';


var useAuth = 'nmoFB';
var authFrameworks = angular.module('authFrameworks', []);

authFrameworks.factory('nmoFB', function() {

	// Make sure the user has the minimal set of permissions for the
    // app, if not re-request them
    function testPermissions(response, callback){

      var permissionsOK = true;

      if (_config.requiredPermissions && 
      	  _config.requiredPermissions.length > 0) {

      	FB.api('/me/permissions', function(response) {

        for (var i=0; i< _config.requiredPermissions.length; i++) {

          var found = false;
          for (var j=0; j<response.data.length; j++) {
            if (_config.requiredPermissions[i] === response.data[j].permission) {
              if (response.data[j].status === 'declined') {
                break;
              }
              else {
                found = true;
                break;
              }
            }
          }

          if (!found){
            permissionsOK = false
            break;
          }
        }

        console.log('nmoFB - testPermissions: ' + permissionsOK);

		// inform the caller of async result
        callback(permissionsOK);
      });
   	 }
   	 else {
   	 	callback(true);
   	 }
	}

    function refreshUser(callback) {
    	console.log('nmoFB - refreshUser');

    	if (callback) {
	    	FB.api('/me', function(response) {
		    	callback(response);
		    });	
    	}
    }

    function onAuthStatusChange(response) {

      if (response.status === 'connected') {
        // Logged into your app and Facebook.

    	testPermissions(response, function(permissionsOK) {
        	if (permissionsOK) {
        		_config.onLogin(response);
        	} else {
        		_config.onInadequatePermissions();
        	}
    	});

      } else if (response.status === 'not_authorized') {

          _config.onNotAuthorized();

      } else {
		_config.onLogout();	
      }
    }

    var _config;

	function init(config) {

		_config = config;

		console.log('nmoFB - init');
		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '204140149765393',
		      cookie     : true,  // enable cookies to allow the server to access the session
		      xfbml      : true,  // parse social plugins on this page
		      version    : 'v2.1' // use version 2.1
		    });

		    // Now that we've initialized the JavaScript SDK, we call 
		    // FB.getLoginStatus().  This function gets the state of the
		    // person visiting this page and can return one of three states to
		    // the callback you provide.  They can be:
		    //
		    // 1. Logged into your app ('connected')
		    // 2. Logged into Facebook, but not your app ('not_authorized')
		    // 3. Not logged into Facebook and can't tell if they are logged into
		    //    your app or not.
		    //
		    // These three cases are handled in the callback function.

		    FB.getLoginStatus(function(response) {

		      onAuthStatusChange(response);

		      // Subscribe to the auth.statusChange event 
		      FB.Event.subscribe('auth.statusChange', onAuthStatusChange);
		    });
		  };

		// Load the SDK asynchronously
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}

	function logout() {
		console.log('nmoFB - logout');
		FB.logout();
	}

	return {
		init: init,
		refreshUser: refreshUser,
		logout: logout
	};

});


authFrameworks.factory('authProvider', ['nmoFB', function(nmoFB) {

	//TODO: expand this to actually have a function for selecting right auth provider
	var authImplementation;

	switch(useAuth) {

		case 'nmoFB':
			authImplementation = nmoFB;
			break;

		default:
			authImplementation = nmoFB;
			break;
	}

	return authImplementation;
}]);



