angular.module('userApp').factory('AuthService', ['$http', '$window', function($http, $window) {
    var apiUrl = 'http://127.0.0.1:8000/api';  // Your DRF API base URL

    var authService = {};

    authService.login = function(credentials) {
        return $http.post(apiUrl + '/token/', credentials)
            .then(function(response) {
                $window.localStorage.setItem('jwtToken', response.data.access);
                return response.data;
            });
    };

    authService.logout = function() {
        $window.localStorage.removeItem('jwtToken');
    };

    authService.isAuthenticated = function() {
        var token = $window.localStorage.getItem('jwtToken');
        return !!token;
    };

    return authService;
}]);
