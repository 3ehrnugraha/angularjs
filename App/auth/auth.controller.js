angular.module('userApp').controller('AuthController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.login = function() {
        AuthService.login($scope.credentials)
            .then(function() {
                $scope.updateAuthentication(); 
                $location.path('/');
            })
            .catch(function(error) {
                console.error('Login failed:', error);
            });
    };

    $scope.logout = function() {
        AuthService.logout();
        $scope.updateAuthentication(); 
        $location.path('/login');
    };

    $scope.isAuthenticated = false;

    // Function to update isAuthenticated based on AuthService
    $scope.updateAuthentication = function() {
        $scope.isAuthenticated = AuthService.isAuthenticated();
    };

    $scope.$watch(function() {
        return AuthService.isAuthenticated();
    }, function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.isAuthenticated = newVal;
        }
    });
    
    // Call updateAuthentication initially
    $scope.updateAuthentication();
}]);
