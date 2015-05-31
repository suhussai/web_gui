(function(module) {

    module.controller('bottomNavBarController',['$scope', function($scope) {
	$scope.unlocked = true;
    }]);
    
    module.directive('subscribeto', function() {
	return {
	    restrict: 'E',
	    scope: {
		parameter: '@',
		topic: '@',
		message: '@',
		locked: '@'
	    },
	    // link function takes care of all the computing
	    // which includes subscribing and displaying the data
	    // didnt need controller when using this function
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


		// the name of the topic and 
		// the parameter we are looking for 
		// in the message can be set via
		// attributes in the directive declaration
		
		// this allows it be robost and 
		// allows for reuse for all 5 
		// of the topics we need to 
		// subscribe to and display data from
		
		var motorFeedback = new ROSLIB.Topic({
		    ros: ros,
		    name: scope.topic,
		    messageType: scope.message
		});
		
		motorFeedback.subscribe(function(message) {
		    //console.log("We got something from motorFeedback");
		    //console.log(message[scope.parameter]);
		    
		    // this function simply updates the p element
		    // introduced in the template to display 
		    // the topic name, parameter that we are looking for
		    // and the value it read in
		    // the default is 'WAITING...'
		    
//		    document.getElementById("" + scope.parameter + "Display").innerHTML = "Topic: " + scope.topic + ", Parameter: " + scope.parameter + ", Value: " + message[scope.parameter];

		    var pDom = document.getElementById("" + scope.parameter + "Display");

		    
		    if (scope.parameter === "kill") {
			// we gotta display lock thingy
			if (message[scope.parameter] == 0){
			    pDom.innerHTML = scope.parameter + ': <i class="fa fa-unlock"></i>'
			}
			else if (message[scope.parameter] == 1){
			    pDom.innerHTML = scope.parameter + ': <i class="fa fa-lock"></i>'


			    document.getElementById("verRightDisplay").innerHTML = 'verRight: <i class="fa fa-minus-square"></i>' ;
			    document.getElementById("horRightDisplay").innerHTML = 'horRight: <i class="fa fa-minus-square"></i>' ;
			    document.getElementById("horLeftDisplay").innerHTML = 'horLeft: <i class="fa fa-minus-square"></i>' ;
			    document.getElementById("verLeftDisplay").innerHTML = 'verLeft: <i class="fa fa-minus-square"></i>' ;
			    
			}

			
		    }

		    if (scope.locked && scope.topic === "motor/feedback") {
			    pDom.innerHTML = scope.parameter + ': <i class="fa fa-minus-square"></i>';
		    }

		    if (scope.parameter === "heading") {
			console.log("set heading stuff");
			pDom.innerHTML =  '<input type="text" value="75" class="dial"> ';
		    }

		    
		    
//		    document.getElementById("" + scope.parameter + "Display").innerHTML = scope.parameter + ": " + message[scope.parameter];
		});
		
	    },
//	    template: "<p id='{{parameter}}Display' style='color:green'> Topic: {{topic}} , Parameter: {{parameter}}, Value: WAITING... </p>"

	    template: "<div id='{{parameter}}Display' > {{parameter}}: <i class='fa fa-spinner'></i> </div>"	    
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
