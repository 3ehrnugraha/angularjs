angular.module('userApp')
.factory('DashboardService', ['$http', function($http) {
    var service = {};
    var apiUrl = 'http://127.0.0.1:8000';

    service.getEmployeeDistributionByDivision = function() {
        return $http.get(apiUrl + '/api/employee_distribution_by_division/')
            .then(function(response) {
                return response.data;
            });
    };

    service.getSalaryDistribution = function() {
        return $http.get(apiUrl + '/api/salary_distribution/')
            .then(function(response) {
                return response.data;
            });
    };

    return service;
}]);