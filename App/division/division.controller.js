angular.module('userApp').controller('divisionController', function($scope, $http, $timeout) {
    var apiUrl = 'http://127.0.0.1:8000';

    $scope.divisions = [];

    // $scope.fetchDivisions = function() {
    //     $http.get(apiUrl + '/api/divisions/' + '?format=json')
    //         .then(function(response) {
    //             $scope.divisions = response.data;
    //             reinitializeDataTable();
    //         }, function(error) {
    //             console.error('Error fetching divisions:', error);
    //         });
    // };

    $scope.searchParams = {
        name: '',
        description: '',
    };

    $scope.loadDivisions = function() {
        let params = {};
        if ($scope.searchParams.name) params.name = $scope.searchParams.name;
        if ($scope.searchParams.description) params.description = $scope.searchParams.description;
        $http.get(apiUrl + '/api/divisions/' + '?format=json', { params: params }).then(function(response) {
            $scope.divisions = response.data;
        });
    };

    $scope.newDivision = {};
    $scope.addDivision = function() {
        if ($scope.newDivision.name && $scope.newDivision.description) {
            $http.post(apiUrl + '/api/divisions/?format=json', $scope.newDivision )
                .then(function(response) {
                    $scope.divisions.push(response.data);
                    $('#addDivisionModal').modal('hide');
                    $scope.newDivision = {};
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error adding Division:', error);
                });
        } else {
            alert('Please fill in all fields.');
        }
    };

    $scope.editDivision = function(Division) {
        // TO BE IMPLEMENTED
    };

    $scope.deleteDivision = function(Division) {
        var index = $scope.divisions.indexOf(Division);
        if (index !== -1) {
            $http.delete(apiUrl + '/api/divisions/' + Division.id + '/?format=json')
                .then(function(response) {
                    $scope.divisions.splice(index, 1);
                    alert('Deleted Division: ' + Division.name);
                    reinitializeDataTable();
                }, function(error) {
                    console.error('Error deleting Division:', error);
                });
        }
    };

    $scope.showMembers = function(division) {
        $scope.selectedDivision = division;
        $('#membersModal').modal('show');
    };

    $scope.closeModalMember = function() {
        $('#membersModal').modal('hide');
        $scope.selectedDivision = {};
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

    // Fetch divisions on controller initialization
    $scope.loadDivisions();
});