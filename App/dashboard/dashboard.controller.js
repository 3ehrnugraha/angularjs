angular.module('userApp')
.controller('DashboardController', ['$scope', 'DashboardService', function($scope, DashboardService) {
    $scope.employeeDistribution = [];
    $scope.salaryDistribution = [];

    // Function to load Employee Distribution by Division data
    $scope.loadEmployeeDistribution = function() {
        DashboardService.getEmployeeDistributionByDivision()
            .then(function(data) {
                $scope.employeeDistribution = data;
                $scope.renderEmployeeDistributionChart(); // Call chart rendering function if needed
            })
            .catch(function(error) {
                console.error('Error loading Employee Distribution:', error);
            });
    };

    // Function to load Salary Distribution data
    $scope.loadSalaryDistribution = function() {
        DashboardService.getSalaryDistribution()
            .then(function(data) {
                $scope.salaryDistribution = data;
                $scope.renderSalaryDistributionChart(); // Call chart rendering function if needed
            })
            .catch(function(error) {
                console.error('Error loading Salary Distribution:', error);
            });
    };

    $scope.renderEmployeeDistributionChart = function() {
        var labels = [];
        var data = [];
        $scope.employeeDistribution.forEach(function(item) {
            labels.push(item.division__name);
            data.push(item.employee_count);
        });

        var ctx = document.getElementById('employeeDistributionChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Employee Distribution by Division',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                }]
            }
        });
        var maxHeight = 400;
        var maxWidth = 400;
        ctx.canvas.style.maxHeight = maxHeight + 'px';
        ctx.canvas.style.maxWidth = maxWidth + 'px';
    };

    // Function to render Salary Distribution Pie Chart
    $scope.renderSalaryDistributionChart = function() {
        var labels = [];
        var data = [];

        $scope.salaryDistribution.forEach(function(item) {
            labels.push(item.salary);
            data.push(item.count);
        });

        // Chart.js configuration
        var ctx = document.getElementById('salaryDistributionChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Salary Distribution',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        var maxHeight = 400;
        var maxWidth = 400;
        ctx.canvas.style.maxHeight = maxHeight + 'px';
        ctx.canvas.style.maxWidth = maxWidth + 'px';
    };

    // Function to initialize the dashboard data
    $scope.initDashboard = function() {
        $scope.loadEmployeeDistribution();
        $scope.loadSalaryDistribution();
    };

    // Call initDashboard to load data on controller initialization
    $scope.initDashboard();
}]);
