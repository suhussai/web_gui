(function(module) {
    
    module.directive('subscribeto', function() {
	return {
	    restrict: 'E',
	    scope: {
		parameter: '@',
		topic: '@',
		message: '@'
	    },
	    link: function(scope, element, attrs) {
		console.log("subscribing to topic: " + scope.topic);
		console.log("listening for parameter type: " + scope.parameter);
		
		// ROS connection 
		// Connecting to ROS
		// -----------------
		
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

		var motorFeedback = new ROSLIB.Topic({
		    ros: ros,
		    name: scope.topic,
		    messageType: scope.message
		});
		
		scope.val = '';
		motorFeedback.subscribe(function(message) {
		    //console.log("We got something from motorFeedback");
		    //console.log(message[scope.parameter]);
		    
		    //
		    
		    scope.val = message[scope.parameter];
		    document.getElementById("" + scope.parameter + "Display").innerHTML = "Topic: " + scope.topic + ", Parameter: " + scope.parameter + ", Value: " + message[scope.parameter];
		});
		
		
	    },
	    template: "<p id='{{parameter}}Display'> Topic: {{topic}} , Parameter: {{parameter}}, Value: WAITING... </p>"
	    //	    templateUrl: 'temp.html'
	};
    });








}( angular.module('app') ));
