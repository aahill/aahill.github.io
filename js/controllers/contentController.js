app.controller("contentController", ['$scope', function($scope){
	$scope.displayContent = true;
	$scope.test = "thanks";
	$scope.al = function(){
		alert('hi');
	};
}]);
