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



    module.controller('publishto', function($scope) {
	
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
	
	var motorRaw = new ROSLIB.Topic({
	    ros: ros,
	    name: "motor/raw",
	    messageType: "arvp_main/MCRaw"
	});
	
	
	//all variables that we may need to publish to:

	var dataParameters = {
	    horLeft : {selected : false, name : 'horLeft', value : 0.0 }, 
	    horRight : {selected : false, name : 'horRight', value : 0.0 },  
	    verLeft : {selected : false, name : 'verLeft', value : 0.0 }, 
	    verRight : {selected : false, name : 'verRight', value: 0.0 }
	};

	var dataToBePublished = new ROSLIB.Message({});

	// fill up ros message with default values
	// as given in the dataParameters
	for (someData in dataParameters) {
	    dataToBePublished[dataParameters[someData]['name']] = dataParameters[someData]['value'];
	}
		
	
	
	$scope.publishAllData = function() {
	    // main function for publishing all data
	    // this is called when the submit button is hit
	    
	    // it updates the value field for all 
	    // pieces of data that are indicated
	    // through the checkboxes
	    
	    // it uses the current value that the
	    // variable $scope.newValue holds
	    // which is the string written in the
	    // textbox when the submit button is hit

		
	    if ($scope.newValue) { // to check if value is not undefined
		var getFloatFormat = parseFloat($scope.newValue);
		for (var data in dataParameters) { // we want to update all values that are checked

		    if (dataParameters[data]['selected']) { // we check to make sure the values are selected
			dataParameters[data]['value'] = getFloatFormat;
			dataToBePublished[dataParameters[data]['name']] = dataParameters[data]['value'];
			console.log("publishing: " + dataParameters[data]['value'] + " on name: " + dataParameters[data]['name']);
		    }
		    else { // these are not going to be updated, they will be published with old values though
			console.log(" NOT publishing: " + dataParameters[data]['value'] + " on name: " + dataParameters[data]['name']);
		    }
		    
		}
		
		motorRaw.publish(dataToBePublished);	
	    }
	    else {
		console.log("not changing");
	    }
	    
	    
	};

	$scope.onDataChange = function() {
	    // function for updating the value field for
	    // the objects in dataParameters
	    // this is removed so that it doesn't
	    // record values such as '1' and then '12' 
	    // when typing in '12' for example

	    // the function that is called when
	    // the submit function is hit
	    // updates the value field using
	    // the $scope.newValue variable
	    // it is assumed that the user
	    // will only hit submit when
	    // they have written the 
	    // value they want to publish

	    /*
	    for (data in dataParameters) {
		if (data.selected) {
		    console.log("updated: " + data.name + " with value: " + $scope.newValue);
		    data.value = $scope.newValue;
		}
	    }
	    */
	};
	
	$scope.onDataSelection = function() {
	    // function to set the selected property
	    // in the dataParameters object to true
	    // if the user checks the corresponding checkbox

	    var tmpString = "";
	    for (d in dataParameters) {
		tmpString = d + "Selected";
		if ($scope[tmpString]) {
		    dataParameters[d].selected = true;
		}
		else {
		    dataParameters[d].selected = false;
		}
	    }
	};
	
    });
    
    
    
}( angular.module('app') ));
