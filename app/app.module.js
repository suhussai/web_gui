(function () {
  'use strict';

  var app = angular.module('app', [
    'ui.router',
  ]);

  //battery directive 

  
  app.controller('BatteryController', function() {
    

      
      var p = 0;
      var redBarDisplay = '<div id="batteryTextBox"> ' + p +'% </div> <div id="mainRect"> <div id="redBar"></div> </div> <div id="sideRect"></div>';

      document.getElementById('batteryWrap').innerHTML = redBarDisplay;


    
    // all the ros stuff here
    // in the end we get the following from
    // subscribing to the battery topic

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
    
      
      
      var battery = new ROSLIB.Topic({
	  ros : ros,
	  name : '/battery',
	  messageType : 'std_msgs/Int32'
      });
      
      battery.subscribe(function(message) {
	  var newHTMLContent = "";
	  
	  if(typeof message.data === 'undefined'){
	      
	      document.getElementById('batteryWrap').innerHTML = redBarDisplay;
              return;
	  }
	  else {
	      p = message.data
	      //p = p.replace('%', '');
	      //p = parseInt(p);

	      redBarDisplay = '<div id="batteryTextBox"> ' + p +'% </div> <div id="mainRect"> <div id="redBar"></div> </div> <div id="sideRect"></div>';
	      
	      var yellowBarDisplay = '<div id="batteryTextBox"> ' + p +'% </div> <div id="mainRect"> <div id="yellowBar"></div> <div id="yellowBar" style="right:29px"></div> </div> <div id="sideRect"></div> </div>';
	      var greenBarDisplay1 = '<div id="batteryTextBox">  ' + p +'%  </div> <div id="mainRect"> <div id="greenBar"></div> <div id="greenBar" style="right:29px"></div> <div id="greenBar" style="right:20px"></div> </div> <div id="sideRect"></div> </div>';
	      var greenBarDisplay2 = '<div id="batteryTextBox"> ' + p +'% </div> <div id="mainRect"> <div id="greenBar"></div> <div id="greenBar" style="right:29px"></div> <div id="greenBar" style="right:20px"></div> <div id="greenBar" style="right:11px"></div> </div> <div id="sideRect"></div> </div>';
	      var greenBarDisplay3 = '<div id="batteryTextBox"> ' + p +'% </div> <div id="mainRect"> <div id="greenBar"></div> <div id="greenBar" style="right:29px"></div> <div id="greenBar" style="right:20px"></div> <div id="greenBar" style="right:11px"></div> <div id="greenBar" style="right:2.5px"></div> </div> <div id="sideRect"></div> </div>';


	      
	      if (p <= 20){
		  newHTMLContent = redBarDisplay;
	      }
	      
	      else if ( p <= 40  && p > 20 ) {
		  newHTMLContent = yellowBarDisplay;
	      }
	      
	      else if ( p <= 60  && p > 40 ) {
		  newHTMLContent = greenBarDisplay1;
	      }
	      
	      else if ( p <= 80  && p > 60 ) {
		  newHTMLContent = greenBarDisplay2;
	      }
	      
	      else if (p > 80) {
		  newHTMLContent = greenBarDisplay3;
	      }

	      
	      document.getElementById('batteryWrap').innerHTML = newHTMLContent;
	      
	  }

      });
      
  });


  app.directive('gauge', function() {
    return {
      restrict: 'E',
      scope: {
        depth: '@'
      },
      templateUrl: 'gauge.html'
    };
  });

  app.controller('GaugeController', function() {

      this.depth = 50;
      this.setDepth = function(depth) {
	  if(typeof depth === 'undefined'){
              $("#arrowCanvas").moveSlider(0);
              return;
	  }
	  else {
	      
	      
              $("#arrowCanvas").moveSlider(depth);
	      
	  }


    };
      
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
    
      
      
      var gauge = new ROSLIB.Topic({
	  ros : ros,
	  name : '/gauge',
	  messageType : 'std_msgs/Int32'
      });
      
      gauge.subscribe(function(message) {
	  if(typeof message.data === 'undefined'){
              $("#arrowCanvas").moveSlider(0);
              return;
	  }
	  else {
	      
	      
              $("#arrowCanvas").moveSlider(message.data);
	      console.log('Received message on ' + listener.name + ': ' + message.data);
	      
	  }

	 
	  //	  listener.unsubscribe();
      });
      

  });




  app.controller('CompassController', function() {
    this.degree = 250;


    this.clear = function() {
      ctx.clearRect(0, 0, 60, 50);
    }

    this.background = function() {

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;

      ctx.arc(cx / 2, cy / 2, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();


      ctx.beginPath();
      ctx.arc(cx / 2, cy / 2, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "grey";
      ctx.fill();
      ctx.stroke();

      //marker on the top
      ctx.beginPath();
      ctx.moveTo(cx / 2, cy / 2 - 10);
      ctx.lineTo(cx / 2, cy / 2 - 20);
      ctx.stroke();

      // position indicator

      //ctx.fill();
      //ctx.stroke();
    }
      this.draw = function(degree) {
	  
	  this.clear();
	  this.background();
	  radiantLine(cx / 2, cy / 2, 10, 20, degree, "red");
	  
      };
      

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
    
      
      
      var compass = new ROSLIB.Topic({
	  ros : ros,
	  name : '/compass',
	  messageType : 'std_msgs/Int32'
      });

      var that = this;
      
      compass.subscribe(function(message) {
	  if(typeof message.data === 'undefined'){

	      that.clear();
	      that.background();
	      radiantLine(cx / 2, cy / 2, 10, 20, -90, "red");
	      document.getElementById('degreeText').innerHTML = 0 + ' deg';
              return;
	  }
	  else {
	      that.clear();
	      that.background();
	      radiantLine(cx / 2, cy / 2, 10, 20, message.data - 90, "red");
	      console.log('Received message on ' + compass.name + ': ' + message.data);
	      document.getElementById('degreeText').innerHTML = message.data + ' deg';
	      
	  }

	 
	  //	  listener.unsubscribe();
      });

      



  });

  app.directive('compass', function() {
    return {
      restrict: 'E',
      scope: {
        degree: '@'
      },
      controller: function() {


      },
      templateUrl: 'compassView.html'
    };
  });




})();
