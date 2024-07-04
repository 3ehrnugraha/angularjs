var app = angular.module('userApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'Page/employee.html',
        controller: 'userCtrl',
        // resolve: {
        //     auth: ['$location', 'AuthService', function($location, AuthService) {
        //         if (!AuthService.isAuthenticated()) {
        //             $location.path('/login');
        //         }
        //     }]
        // }
    })
    .when('/login', {
        templateUrl: 'Page/login.html',
        controller: 'AuthController'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);

app.controller('userCtrl', function($scope, $http, $timeout) {
    var apiUrl = 'http://127.0.0.1:8000';

    $scope.employees = [];

    $scope.fetchEmployees = function() {
        $http.get(apiUrl + '/employee/' + '?format=json')
            .then(function(response) {
                $scope.employees = response.data;
                reinitializeDataTable();
            }, function(error) {
                console.error('Error fetching employees:', error);
            });
    };

    $scope.newEmployee = {};
    $scope.addEmployee = function() {
        $scope.newEmployee.startDate = moment($scope.newEmployee.startDate).format('YYYY-MM-DD');

        if ($scope.newEmployee.name && $scope.newEmployee.position && $scope.newEmployee.office &&
            $scope.newEmployee.age && $scope.newEmployee.startDate && $scope.newEmployee.salary) {
            $http.post(apiUrl + '/employee/?format=json', $scope.newEmployee )
                .then(function(response) {
                    $scope.employees.push(response.data);
                    $('#addEmployeeModal').modal('hide');
                    $scope.newEmployee = {};
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error adding employee:', error);
                });
        } else {
            alert('Please fill in all fields.');
        }
    };

    $scope.editEmployee = function(employee) {
        $scope.editEmployee = $scope.employees.indexOf(employee);
        if ($scope.editEmployee !== -1) {
            $http.put(apiUrl + '/employee/' + employee.id + '/?format=json', $scope.editEmployee)
                .then(function(response) {
                    $scope.employees.splice(index, 1);
                    alert('Deleted employee: ' + employee.name);
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error deleting employee:', error);
                });
        }
    };

    $scope.deleteEmployee = function(employee) {
        var index = $scope.employees.indexOf(employee);
        if (index !== -1) {
            $http.delete(apiUrl + '/employee/' + employee.id + '/?format=json')
                .then(function(response) {
                    $scope.employees.splice(index, 1);
                    alert('Deleted employee: ' + employee.name);
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error deleting employee:', error);
                });
        }
    };

    $timeout(function() {
        $('#userTable').DataTable();
    }, 0);

    // Function to reinitialize the DataTable
    function reinitializeDataTable() {
        $timeout(function() {
            $('#userTable').DataTable().clear().destroy();
            $('#userTable').DataTable();
        }, 0);
    }

    // Fetch employees on controller initialization
    $scope.fetchEmployees();
});