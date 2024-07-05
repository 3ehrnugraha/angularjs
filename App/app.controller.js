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
    .when('/division', {
        templateUrl: 'Page/division.html',
        controller: 'divisionController',
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
        $http.get(apiUrl + '/api/employees/' + '?format=json')
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
            $http.post(apiUrl + '/api/employees/?format=json', $scope.newEmployee )
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

    $scope.divisions = [];
    $scope.loadDivisions = function() {
        $http.get(apiUrl + '/api/divisions/?format=json')
            .then(function(response) {
                $scope.divisions = response.data;
            }, function(error) {
                console.error('Error fetching divisions:', error);
            });
    };
    

    $scope.selectedEmployee = {};
    $scope.editEmployee = function(employee) {
        $scope.selectedEmployee = angular.copy(employee);
        $scope.loadDivisions();
        $('#editEmployeeModal').modal('show');
    };

    function closeEditModal() {
        $('#editEmployeeModal').modal('hide');
        $scope.selectedEmployee = {};
    }
    
    $scope.updateEmployee = function() {
        $scope.selectedEmployee.startDate = moment($scope.selectedEmployee.startDate).format('YYYY-MM-DD');
    
        if ($scope.selectedEmployee.name && $scope.selectedEmployee.position && $scope.selectedEmployee.office &&
            $scope.selectedEmployee.age && $scope.selectedEmployee.startDate && $scope.selectedEmployee.salary) {
    
            var updatedEmployeeData = angular.copy($scope.selectedEmployee);
            updatedEmployeeData.division = $scope.selectedEmployee.division.id;
    
            $http.put(apiUrl + '/api/employees/' + $scope.selectedEmployee.id + '/?format=json', updatedEmployeeData)
                .then(function(response) {
                    var index = $scope.employees.findIndex(emp => emp.id === $scope.selectedEmployee.id);
                    if (index !== -1) {
                        $scope.employees[index] = response.data;
                    }
                    closeEditModal();
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error updating employee:', error);
                });
        } else {
            alert('Please fill in all fields.');
        }
    };
    

    $scope.deleteEmployee = function(employee) {
        var index = $scope.employees.indexOf(employee);
        if (index !== -1) {
            $http.delete(apiUrl + '/api/employees/' + employee.id + '/?format=json')
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