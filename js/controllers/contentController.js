app.controller("contentController", ['$scope', function($scope){
	$scope.displayContent = true;
    $scope.content="welcome";
	$scope.test = "thanks";
	$scope.al = function(){
		alert('hi');
	};
    $scope.switchContent = function(contentName){
        $scope.content = contentName;
        alert($scope.content);
    }
}]);
