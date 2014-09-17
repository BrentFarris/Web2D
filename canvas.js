var $Canvas = function(elm)
{
	if (elm === "undefined")
		throw "The canvas id passed was not valid";
	
	this.elm				= elm;
	this.context			= this.elm.getContext("2d");
	this.elm.style.width	= this.elm.width + "px";
	this.elm.style.height	= this.elm.height + "px";
	this.drawing			= new $Event();
	
	this.Draw = function() {
		this.drawing.Fire([this]);
	}
};

var canvas = null;
var requestId = 0;

function registerCanvas(elm) {
	if (canvas != null)
		throw "Canvas already registered";
	
	canvas = new $Canvas(elm);
	canvas.drawing.Register(UpdateRequestId);
	
	Start();
}

(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAnimationFrame;
})();

function UpdateRequestId(context) {
	requestId = window.requestAnimationFrame(DrawCanvas);
}

function DrawCanvas() {
	canvas.context.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	canvas.Draw();
}

function Start() {
	if (canvas == null)
		throw "You must first register a canvas with the \"registerCanvas\" function";
	
	requestId = window.requestAnimationFrame(DrawCanvas);
}

function Stop() {
	if (requestId)
		window.cancelAnimationFrame(requestId);
	
	requestId = 0;
}
