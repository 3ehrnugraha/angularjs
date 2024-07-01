var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $timeout) {
    $scope.employees = [
        { id: 1, name: 'Nugraha', position: 'Developer', office: 'Jakarta', age: 20, startDate: '2024/07/01', salary: '$100' },
        { id: 2, name: 'Forsaken', position: 'Designer', office: 'Singapore', age: 25, startDate: '2020/02/15', salary: '$5000' },
    ];

    $scope.newEmployee = {};

    $scope.addEmployee = function() {
        if ($scope.newEmployee.name && $scope.newEmployee.position && $scope.newEmployee.office &&
            $scope.newEmployee.age && $scope.newEmployee.startDate && $scope.newEmployee.salary) {
            $scope.employees.push({
                id: $scope.employees.length + 1,
                name: $scope.newEmployee.name,
                position: $scope.newEmployee.position,
                office: $scope.newEmployee.office,
                age: $scope.newEmployee.age,
                startDate: $scope.newEmployee.startDate,
                salary: $scope.newEmployee.salary
            });
            $('#addEmployeeModal').modal('hide');
            $scope.newEmployee = {};
            reinitializeDataTable();
        } else {
            alert('Please fill in all fields.');
        }
    };

    $scope.editEmployee = function(employee) {
        alert('Edit employee: ' + employee.name);
        console.log($scope.employees);
    };

    $scope.deleteEmployee = function(employee) {
        var index = $scope.employees.indexOf(employee);
        if (index !== -1) {
            $scope.employees.splice(index, 1);
            alert('Deleted employee: ' + employee.name);
            reinitializeDataTable();
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
});