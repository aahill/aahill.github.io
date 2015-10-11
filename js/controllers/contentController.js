app.controller("contentController", ['$scope', function($scope){

	$scope.displayedProject = "";
	$scope.al = function(){
		alert('hi');
	};
    $scope.switchContent = function(contentName){
    	if($scope.displayedProject === contentName){
    		$scope.displayedProject = "";
    	}
    	else{
        	$scope.displayedProject = contentName;
        }
    }
}]);
