angular.module('userApp').controller('ProjectController', function($scope, $http, $timeout) {
    $scope.projects = [];
    $scope.employees = [];
    $scope.newProject = {
        name: '',
        description: '',
        employee_ids: []
    };

    const apiUrl = 'http://127.0.0.1:8000/api';  // Replace with your actual API URL

    $scope.loadProjects = function() {
        $http.get(apiUrl + '/project/' + '?format=json')
            .then(function(response) {
                $scope.projects = response.results;
            }, function(error) {
                console.error('Error fetching projects:', error);
            });
    };

    $scope.loadEmployees = function() {
        $http.get(apiUrl + '/employees/' + '?format=json')
            .then(function(response) {
                $scope.employees = response.results;
            }, function(error) {
                console.error('Error fetching employees:', error);
            });
    };

    $scope.openModalAddProject = function() {
        $scope.loadEmployees();
        $('#addProjectModal').modal('show');
    };

    $scope.closeModalAddProject = function() {
        $('#addProjectModal').modal('hide');
        $scope.newProject = {
            name: '',
            description: '',
            employee_ids: []
        };
    };

    $scope.addProject = function() {
        $http.post(apiUrl + '/project/' + '?format=json', $scope.newProject)
            .then(function(response) {
                $scope.projects.push(response.data);
                $scope.closeModalAddProject();
            }, function(error) {
                console.error('Error adding project:', error);
            });
    };

    $scope.deleteProject = function(Project) {
        var index = $scope.projects.indexOf(Project);
        if (index !== -1) {
            $http.delete(apiUrl + '/project/' + Project.id + '/?format=json')
                .then(function(response) {
                    $scope.projects.splice(index, 1);
                    alert('Deleted Project: ' + Project.name);
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error deleting Project:', error);
                });
        }
    };

    $scope.loadProjects();
});
