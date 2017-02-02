angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ProgressDemoCtrl', function ($scope, $http) {
    $scope.calculateNewValue = function (value) {
        var str = $scope.progressbarnumber;
        var res = str.split("progressbar");
        $scope.index = res[1];
        $scope.max = parseInt($scope.max, 10);
        // console.log($scope.index);
        // console.log(value);
        $scope.currentBar = $scope.progressbarDataJson[$scope.index].bar;
        // console.log($scope.currentBar);
        value = parseInt(value, 10);
        $scope.oldvalue = $scope.currentBar;
        $scope.currentBar = $scope.currentBar + value;
        if($scope.currentBar < 0){
            $scope.currentBar = 0;
        }else if($scope.currentBar > $scope.max){
            $scope.currentBar = $scope.max;
        }
        // console.log($scope.currentBar);
        $scope.progressbarDataJson[$scope.index].bar = $scope.currentBar;
        // console.log($scope.currentBar);
        
        $scope.currentBar = parseInt($scope.currentBar, 10);
        // console.log('$scope.max'+$scope.max);
        if ($scope.max <= $scope.currentBar) {
            //console.log('error');
            $scope.progressbarDataJson[$scope.index].type = "danger";
        } else if ($scope.max >= $scope.currentBar) {
            $scope.progressbarDataJson[$scope.index].type = "success";
        }
    };

    $scope.loadInitialData = function () {
        $scope.type = "success";
        $http.get('http://pb-api.herokuapp.com/bars').then(function (value) {
            console.log(value.data);
            // console.log(value.data.bars[0]);
            $scope.initData = value;
            $scope.max = value.data.limit;
            $scope.bars = value.data.bars;
            $scope.buttons = value.data.buttons;
            $scope.progressbarDataJson = [];
            angular.forEach($scope.bars, function (value, key) {
                var eachProduct = { "bar": value, "type": 'success' };
                $scope.progressbarDataJson.push(eachProduct);
            });

            //console.log($scope.progressbarDataJson);
        }); // end of get
    };

});
