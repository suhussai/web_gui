(function(module) {

    var ros = new ROSLIB.Ros({
	url : 'ws://localhost:9090'
    });
    
    ros.on('connection', function() {
	console.log('Connected to websocket server.');
    });
    
    ros.on('error', function(error) {
	console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', function() {
	console.log('Connection to websocket server closed.');
    });
    
    
    module.controller('LogController', function($scope) {
	var logTopic = new ROSLIB.Topic({
	    ros: ros,
	    name: "rosout",
	    messageType: "rosgraph_msgs/Log"
	});
	var minimumLevel = 0;
	

	$scope.DEBUG = { selected : false, value : 1};
	$scope.INFO = { selected : false, value : 2};
	$scope.WARN = { selected : false, value : 4};
	$scope.ERROR = { selected : false, value : 8};
	$scope.FATAL = { selected : false, value : 16};

	
	var levels = [
	    $scope.DEBUG,
	    $scope.INFO,
	    $scope.WARN,
	    $scope.ERROR,
	    $scope.FATAL
	];
	
	
	logTopic.subscribe(function(message) {
	    var pDom = document.getElementById("logOutput");

	    if (message['level'] >= minimumLevel) {
		//console.log("taking all levels greater than " + minimumLevel);
		pDom.innerHTML = pDom.innerHTML +  "<p>Level: " + message['level'] + " Message: " + message['msg'] + "</p>";
	    }
	    else {
		//console.log("ignoring level:" + message['level'] + " cuz it is less than " + minimumLevel);
	    }

	});

	$scope.clearSelection = function() {
	    for (var i = 0; i < levels.length; i++){
		levels[i].selected = false;
	    }
	}
	
        $scope.clearLogOutput = function() {
	    document.getElementById("logOutput").innerHTML = "";

	}    	
	$scope.showLog = function() {
	    minimumLevel = 0;
	    for (var i = 0; i < levels.length; i++){
		if (levels[i].selected == true && minimumLevel < levels[i].value){ // we check to make sure the values are selected
		    console.log(levels[i]);
		    minimumLevel = levels[i].value;
		    console.log("taking all levels greater than " + minimumLevel);
		    break;
		}
	    }

	    for (var i = 0; i < levels.length; i++){
		if (minimumLevel < levels[i].value){ // we check to make sure the values are selected
		    levels[i].selected = true;
		    console.log("taking all levels greater than " + minimumLevel);
		}
	    }

	    
	    
	};
	
    });
    
}( angular.module('app') ));
