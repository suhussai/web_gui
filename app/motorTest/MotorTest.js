(function(module) {

// function from:https://github.com/aterrien/jQuery-Knob
    (function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var t={},n=Math.max,r=Math.min;t.c={};t.c.d=e(document);t.c.t=function(e){return e.originalEvent.touches.length-1};t.o=function(){var n=this;this.o=null;this.$=null;this.i=null;this.g=null;this.v=null;this.cv=null;this.x=0;this.y=0;this.w=0;this.h=0;this.$c=null;this.c=null;this.t=0;this.isInit=false;this.fgColor=null;this.pColor=null;this.dH=null;this.cH=null;this.eH=null;this.rH=null;this.scale=1;this.relative=false;this.relativeWidth=false;this.relativeHeight=false;this.$div=null;this.run=function(){var t=function(e,t){var r;for(r in t){n.o[r]=t[r]}n._carve().init();n._configure()._draw()};if(this.$.data("kontroled"))return;this.$.data("kontroled",true);this.extend();this.o=e.extend({min:this.$.data("min")!==undefined?this.$.data("min"):0,max:this.$.data("max")!==undefined?this.$.data("max"):100,stopper:true,readOnly:this.$.data("readonly")||this.$.attr("readonly")==="readonly",cursor:this.$.data("cursor")===true&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")&&Math.max(Math.min(this.$.data("thickness"),1),.01)||.35,lineCap:this.$.data("linecap")||"butt",width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inputColor:this.$.data("inputcolor"),font:this.$.data("font")||"Arial",fontWeight:this.$.data("font-weight")||"bold",inline:false,step:this.$.data("step")||1,rotation:this.$.data("rotation"),draw:null,change:null,cancel:null,release:null,format:function(e){return e},parse:function(e){return parseFloat(e)}},this.o);this.o.flip=this.o.rotation==="anticlockwise"||this.o.rotation==="acw";if(!this.o.inputColor){this.o.inputColor=this.o.fgColor}if(this.$.is("fieldset")){this.v={};this.i=this.$.find("input");this.i.each(function(t){var r=e(this);n.i[t]=r;n.v[t]=n.o.parse(r.val());r.bind("change blur",function(){var e={};e[t]=r.val();n.val(n._validate(e))})});this.$.find("legend").remove()}else{this.i=this.$;this.v=this.o.parse(this.$.val());this.v===""&&(this.v=this.o.min);this.$.bind("change blur",function(){n.val(n._validate(n.o.parse(n.$.val())))})}!this.o.displayInput&&this.$.hide();this.$c=e(document.createElement("canvas")).attr({width:this.o.width,height:this.o.height});this.$div=e('<div style="'+(this.o.inline?"display:inline;":"")+"width:"+this.o.width+"px;height:"+this.o.height+"px;"+'"></div>');this.$.wrap(this.$div).before(this.$c);this.$div=this.$.parent();if(typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(this.$c[0])}this.c=this.$c[0].getContext?this.$c[0].getContext("2d"):null;if(!this.c){throw{name:"CanvasNotSupportedException",message:"Canvas not supported. Please use excanvas on IE8.0.",toString:function(){return this.name+": "+this.message}}}this.scale=(window.devicePixelRatio||1)/(this.c.webkitBackingStorePixelRatio||this.c.mozBackingStorePixelRatio||this.c.msBackingStorePixelRatio||this.c.oBackingStorePixelRatio||this.c.backingStorePixelRatio||1);this.relativeWidth=this.o.width%1!==0&&this.o.width.indexOf("%");this.relativeHeight=this.o.height%1!==0&&this.o.height.indexOf("%");this.relative=this.relativeWidth||this.relativeHeight;this._carve();if(this.v instanceof Object){this.cv={};this.copy(this.v,this.cv)}else{this.cv=this.v}this.$.bind("configure",t).parent().bind("configure",t);this._listen()._configure()._xy().init();this.isInit=true;this.$.val(this.o.format(this.v));this._draw();return this};this._carve=function(){if(this.relative){var e=this.relativeWidth?this.$div.parent().width()*parseInt(this.o.width)/100:this.$div.parent().width(),t=this.relativeHeight?this.$div.parent().height()*parseInt(this.o.height)/100:this.$div.parent().height();this.w=this.h=Math.min(e,t)}else{this.w=this.o.width;this.h=this.o.height}this.$div.css({width:this.w+"px",height:this.h+"px"});this.$c.attr({width:this.w,height:this.h});if(this.scale!==1){this.$c[0].width=this.$c[0].width*this.scale;this.$c[0].height=this.$c[0].height*this.scale;this.$c.width(this.w);this.$c.height(this.h)}return this};this._draw=function(){var e=true;n.g=n.c;n.clear();n.dH&&(e=n.dH());e!==false&&n.draw()};this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};this.t=t.c.t(e);r(e);t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");n.val(n.cv)});return this};this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};r(e);t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===false)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");n.val(n.cv)});return this};this._xy=function(){var e=this.$c.offset();this.x=e.left;this.y=e.top;return this};this._listen=function(){if(!this.o.readOnly){this.$c.bind("mousedown",function(e){e.preventDefault();n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault();n._xy()._touch(e)});this.listen()}else{this.$.attr("readonly","readonly")}if(this.relative){e(window).resize(function(){n._carve().init();n._draw()})}return this};this._configure=function(){if(this.o.draw)this.dH=this.o.draw;if(this.o.change)this.cH=this.o.change;if(this.o.cancel)this.eH=this.o.cancel;if(this.o.release)this.rH=this.o.release;if(this.o.displayPrevious){this.pColor=this.h2rgba(this.o.fgColor,"0.4");this.fgColor=this.h2rgba(this.o.fgColor,"0.6")}else{this.fgColor=this.o.fgColor}return this};this._clear=function(){this.$c[0].width=this.$c[0].width};this._validate=function(e){var t=~~((e<0?-.5:.5)+e/this.o.step)*this.o.step;return Math.round(t*100)/100};this.listen=function(){};this.extend=function(){};this.init=function(){};this.change=function(e){};this.val=function(e){};this.xy2val=function(e,t){};this.draw=function(){};this.clear=function(){this._clear()};this.h2rgba=function(e,t){var n;e=e.substring(1,7);n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)];return"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"};this.copy=function(e,t){for(var n in e){t[n]=e[n]}}};t.Dial=function(){t.o.call(this);this.startAngle=null;this.xy=null;this.radius=null;this.lineWidth=null;this.cursorExt=null;this.w2=null;this.PI2=2*Math.PI;this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,inline:true},this.o)};this.val=function(e,t){if(null!=e){e=this.o.parse(e);if(t!==false&&e!=this.v&&this.rH&&this.rH(e)===false){return}this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e;this.v=this.cv;this.$.val(this.o.format(this.v));this._draw()}else{return this.v}};this.xy2val=function(e,t){var i,s;i=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset;if(this.o.flip){i=this.angleArc-i-this.PI2}if(this.angleArc!=this.PI2&&i<0&&i>-.5){i=0}else if(i<0){i+=this.PI2}s=i*(this.o.max-this.o.min)/this.angleArc+this.o.min;this.o.stopper&&(s=n(r(s,this.o.max),this.o.min));return s};this.listen=function(){var t=this,i,s,o=function(e){e.preventDefault();var o=e.originalEvent,u=o.detail||o.wheelDeltaX,a=o.detail||o.wheelDeltaY,f=t._validate(t.o.parse(t.$.val()))+(u>0||a>0?t.o.step:u<0||a<0?-t.o.step:0);f=n(r(f,t.o.max),t.o.min);t.val(f,false);if(t.rH){clearTimeout(i);i=setTimeout(function(){t.rH(f);i=null},100);if(!s){s=setTimeout(function(){if(i)t.rH(f);s=null},200)}}},u,a,f=1,l={37:-t.o.step,38:t.o.step,39:t.o.step,40:-t.o.step};this.$.bind("keydown",function(i){var s=i.keyCode;if(s>=96&&s<=105){s=i.keyCode=s-48}u=parseInt(String.fromCharCode(s));if(isNaN(u)){s!==13&&s!==8&&s!==9&&s!==189&&(s!==190||t.$.val().match(/\./))&&i.preventDefault();if(e.inArray(s,[37,38,39,40])>-1){i.preventDefault();var o=t.o.parse(t.$.val())+l[s]*f;t.o.stopper&&(o=n(r(o,t.o.max),t.o.min));t.change(t._validate(o));t._draw();a=window.setTimeout(function(){f*=2},30)}}}).bind("keyup",function(e){if(isNaN(u)){if(a){window.clearTimeout(a);a=null;f=1;t.val(t.$.val())}}else{t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}});this.$c.bind("mousewheel DOMMouseScroll",o);this.$.bind("mousewheel DOMMouseScroll",o)};this.init=function(){if(this.v<this.o.min||this.v>this.o.max){this.v=this.o.min}this.$.val(this.v);this.w2=this.w/2;this.cursorExt=this.o.cursor/100;this.xy=this.w2*this.scale;this.lineWidth=this.xy*this.o.thickness;this.lineCap=this.o.lineCap;this.radius=this.xy-this.lineWidth/2;this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset);this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc);this.angleOffset=this.o.angleOffset*Math.PI/180;this.angleArc=this.o.angleArc*Math.PI/180;this.startAngle=1.5*Math.PI+this.angleOffset;this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.w/2+4>>0)+"px",height:(this.w/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.w/3>>0)+"px","margin-left":"-"+(this.w*3/4+2>>0)+"px",border:0,background:"none",font:this.o.fontWeight+" "+(this.w/e>>0)+"px "+this.o.font,"text-align":"center",color:this.o.inputColor||this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})};this.change=function(e){this.cv=e;this.$.val(this.o.format(e))};this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)};this.arc=function(e){var t,n;e=this.angle(e);if(this.o.flip){t=this.endAngle+1e-5;n=t-e-1e-5}else{t=this.startAngle-1e-5;n=t+e+1e-5}this.o.cursor&&(t=n-this.cursorExt)&&(n=n+this.cursorExt);return{s:t,e:n,d:this.o.flip&&!this.o.cursor}};this.draw=function(){var e=this.g,t=this.arc(this.cv),n,r=1;e.lineWidth=this.lineWidth;e.lineCap=this.lineCap;if(this.o.bgColor!=="none"){e.beginPath();e.strokeStyle=this.o.bgColor;e.arc(this.xy,this.xy,this.radius,this.endAngle-1e-5,this.startAngle+1e-5,true);e.stroke()}if(this.o.displayPrevious){n=this.arc(this.v);e.beginPath();e.strokeStyle=this.pColor;e.arc(this.xy,this.xy,this.radius,n.s,n.e,n.d);e.stroke();r=this.cv==this.v}e.beginPath();e.strokeStyle=r?this.o.fgColor:this.fgColor;e.arc(this.xy,this.xy,this.radius,t.s,t.e,t.d);e.stroke()};this.cancel=function(){this.val(this.v)}};e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n;r.$=e(this);r.run()}).parent()}})


    var simpleLocked = true;

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
    

    
    module.directive('subscribeto', function() {
	return {
	    restrict: 'E',
	    scope: {
		parameter: '@',
		topic: '@',
		message: '@'
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
		    
		    var pDom = document.getElementById("" + scope.parameter + "Display");

		    if (scope.parameter === "kill") {
			// we gotta display lock thingy
			if (message[scope.parameter] == 0){
			    pDom.innerHTML = scope.parameter + ': <i class="fa fa-unlock fa-2x"></i>'
			    simpleLocked = false;
			    
			}
			else if (message[scope.parameter] == 1){
			    pDom.innerHTML = scope.parameter + ': <i class="fa fa-lock fa-2x"></i>'
			    simpleLocked = true;
			    document.getElementById("verRightDisplay").innerHTML = 'verRight: <i class="fa fa-minus-square"></i>' ;
			    document.getElementById("horRightDisplay").innerHTML = 'horRight: <i class="fa fa-minus-square"></i>' ;
			    document.getElementById("horLeftDisplay").innerHTML = 'horLeft: <i class="fa fa-minus-square"></i>' ;
			    document.getElementById("verLeftDisplay").innerHTML = 'verLeft: <i class="fa fa-minus-square"></i>' ;
			}
		    }

		    else if (scope.topic === "motor/feedback") {

			if (simpleLocked && pDom.innerHTML != scope.parameter + ': <i class="fa fa-minus-square fa-2x"></i>') {
			    console.log("set locked");
			    pDom.innerHTML = scope.parameter + ': <i class="fa fa-minus-square fa-2x"></i>';
			}

			else if (pDom.innerHTML != '<div style="border: 0px solid red;margin-top:20px;float:left; "class="label label-default" id="' + scope.parameter + 'Label"> '+scope.parameter+': </div> <div style="float:right;"> <input type="text" class="dial" id="' + scope.parameter+ '" data-min="-100" data-max="100" data-width="35px" readOnly=true>  </div>' ) {
			    
			    pDom.innerHTML =  '<div style="border: 0px solid red;margin-top:20px;float:left; "class="label label-default" id="' + scope.parameter + 'Label"> '+scope.parameter+': </div> <div style="float:right;"> <input type="text" class="dial" id="' + scope.parameter+ '" data-min="-100" data-max="100" data-width="35px" readOnly=true>  </div>';


			    var iDom = document.getElementById(scope.parameter);			    
			    if (iDom.value != message[scope.parameter]) {
				iDom.value= message[scope.parameter];
			    }
			    console.log("set it");
			    $(function($) {    
				$(".dial").knob();			    
			    });
			    
			}			    
		    }
		    
		    else if (scope.parameter === "heading") {
			pDom.innerHTML =  '<div style="border: 2px solid red;margin-top:20px;float:left; "class="label label-default" id="' + scope.parameter + 'Label"> '+scope.parameter+': </div> <div style="float:right;"> <input type="text" class="dial" id="' + scope.parameter+ '" data-min="0" data-max="100" data-width="40px" readOnly=true data-cursor=true data-thickness=.3 data-fgColor="black">  </div>';
			
			
			var iDom = document.getElementById(scope.parameter);			    
			if (iDom.value != message[scope.parameter]) {
			    iDom.value= message[scope.parameter];
			}
			
			$(function($) {    
			    $(".dial").knob();			    
			});
		    }
		    
		    
		    else if (scope.parameter === "depth") {
			//			console.log("changing depth");
			pDom.innerHTML = "";
			$("#arrowCanvas").moveSlider(message[scope.parameter]);
		    }
		    
		    else {
			// default case where we just display the value
			var number = message[scope.parameter];
			number = Math.round(number * 10) / 10;
			pDom.innerHTML = scope.parameter + ": " + parseFloat(number).toFixed(2);
		    }
		    
		});
		
	    },
	    template: "<div id='{{parameter}}Display' style='margin:auto;color:green; border: 0px solid red;float:left; font-size:20px; ' > {{parameter}}: <i class='fa fa-spinner fa-2x'></i> </div>"	    
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
    



    module.directive('gauge', function() {
	return {
	    restrict: 'E',
	    scope: {
		depth: '@'
	    },
	    link: function(scope, element, attrs) {
		
		document.getElementById("depthDisplay").innerHTML = ""; 
		$("#arrowCanvas").moveSlider(scope.depth);

		var setDepth = function(depth) {
		    if(typeof depth === 'undefined'){
			$("#arrowCanvas").moveSlider(0);
			return;
		    }
		    else {
			
			
			$("#arrowCanvas").moveSlider(depth);
			
		    }
		    
		    
		};
//		setDepth(scope.depth);
		
	    },
	    templateUrl: 'gauge.html'
	};
    });
    
    
}( angular.module('app') ));
