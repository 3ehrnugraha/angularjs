angular.module('userApp').factory('AuthInterceptor', ['$q', '$window', function($q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            var token = $window.localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config || $q.when(config);
        },
        responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
                //alert
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
}]);

// Add interceptor to AngularJS module configuration
angular.module('userApp').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);
