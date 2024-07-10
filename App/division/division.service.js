angular.module('userApp').service('DivisionService', function($http) {
    var apiUrl = 'http://127.0.0.1:8000';

    this.getData = function(page, params) {
        return $http.get(apiUrl + '/api/divisions/' + '?format=json', {
            params: { page: page, ...params }
        });
    };
});