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
    
    var subscribeCountLog = 0;
    var subscribeMaxLog = 60;
     
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

	    if (pDom == null) { return;}


	    var incomingMessage = "Level: " + message['level'] + " Message: " + message['msg'];
	    
	    if (pDom.innerHTML.search(incomingMessage) != -1) {



		// we let message increment counter to a point
		// in order to lower rate
		// but we let it update log if message is new
		if (subscribeCountLog < subscribeMaxLog) {
		    //console.log("Ignoring message");
	            subscribeCountLog = subscribeCountLog + 1;
	 	    return;
		}		    
       		subscribeCountLog = 0;
		//console.log("subing");
		
		
		// we only increment repeat count when it repeats for a x amount of time
		// when we have a duplicate message 
		// we simply increase repetition count
		var content = pDom.innerHTML;
		var timesRepeatedIndex = content.indexOf(incomingMessage) + incomingMessage.length + 1 + 1; //plus one for space and (
		var timesRepeated = Number(content[timesRepeatedIndex]);
		timesRepeated = timesRepeated + 1;
		//console.log("replacing");
		pDom.innerHTML = content.substr(0, timesRepeatedIndex) + timesRepeated.toString() + content.substr(timesRepeatedIndex + timesRepeated.toString().length); 
//		pDom.innerHTML = pDom.innerHTML.replace(content,content.replace(incomingMessage + " ==" + content.split("==")[1] + "==","==" + timesRepeated + "=="));
		return;
		
		
	    }
	    
	    if (message['level'] >= minimumLevel) {
		//console.log("taking all levels greater than " + minimumLevel);
		pDom.innerHTML = pDom.innerHTML +  "<p>Level: " + message['level'] + " Message: " + message['msg'] + " (1)</p>";
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
