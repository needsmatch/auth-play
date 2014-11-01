

  // Initialize isReRequest - used when checking permissions
  // so we don't end up in an endless loop of permissions checking
  // when the user is logged in but inadequately set up for permissions
  var isReRequest = false
  var requiredPermissions = ['public_profile'];
  var ngRootID = '#root';
   
  function setDestinationByLoginState(response, redirector) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().


    // get the angular controller to trigger login changes there.
    var scope = angular.element($(ngRootID)).scope();
    var ngUser = scope.rootController.user;
    var ngLoginFn = scope.rootController.login;
    var ngLogoutFn = scope.rootController.logout;

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testPermissions(response, redirector);

      console.log('FB status change trigger of ng login')
      ngLoginFn(ngUser);

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';

        console.log('FB not_authorized status trigger of ng logout')
        ngLogoutFn(ngUser);

        redirector('Main');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';

        console.log('FB ' + response.status + ' status trigger of ng logout')
        ngLogoutFn(ngUser);

        redirector('Main');
    }

    // commit the changes to the scope data back to Angular
    scope.$apply();
  }

  function redirector(destination) {
    switch (destination) {
      case 'Dashboard': 
        // set view to Dashboard
        document.getElementById('status').innerHTML = 'Dashboard View';
        break;
      case 'Main':
        // set view to Main
        document.getElementById('status').innerHTML = 'Main View';
        break;
      case 'ReRequest':
        // set view to ReRequest (dialog)
        document.getElementById('status').innerHTML = 'ReRequest View';
        break;
      default:
        // set view to Main
        document.getElementById('status').innerHTML = 'Main View by Default';
        break;
    }
  }

  var authStatusChangeListener = function(response) {
    console.log('Listerner Triggered, Status: ' + response.status);
    setDestinationByLoginState(response, redirector);
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '204140149765393',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
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
      setDestinationByLoginState(response, redirector);
      // Subscribe to the auth.statusChange event 
      FB.Event.subscribe('auth.statusChange', authStatusChangeListener);
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

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  // Make sure the user has the minimal set of permissions for the
  // app, if not re-request them
  function testPermissions(response, redirector){

    console.log('Checking your permissions...');
    
    var permissionsOK = true;
    FB.api('/me/permissions', function(response) {

      for (var i=0; i<requiredPermissions.length; i++) {

        var found = false;
        for (var j=0; j<response.data.length; j++) {
          if (requiredPermissions[i] === response.data[j].permission) {
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

      if (permissionsOK) {
        testAPI();  
        redirector('Dashboard');
      }
      else {
        if (isReRequest) {
          redirector('Main');
        }
        else {
          isReRequest = true;
          redirector('ReRequest');
        }
      }
    });
  }

  function onLogin() {
    // do nothing, we are watching the state change event
  }

  function logOut () {
    console.log('logOut triggered');
    isReRequest = false;
    FB.logout();
  }