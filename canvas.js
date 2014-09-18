/**
An object to manage a HTML5 <canvas> element
@class $Canvas
@param elm {Object} The canvas element on the page to reference
@param [widthPercent=null] {Float} The width scale factor of the canvas (if null uses default width set in the canvas tag)
@param [heightPercent=null] {Float} The height scale factor of the canvas (if null uses default height set in the canvas tag)
*/
var $Canvas = function(elm, widthPercent, heightPercent)
{
	if (elm === "undefined")
		throw "The canvas id passed was not valid";
	
	/**
	This is the actual canvas element in the document
	@property elm
	@protected
	*/
	this.elm				= elm;
	/**
	The context which is required to get anything showing up
	@property context
	*/
	this.context			= this.elm.getContext("2d");

	if (widthPercent != null)
		this.elm.width = document.body.clientWidth * widthPercent;

	if (heightPercent != null)
		this.elm.height = document.body.clientHeight * heightPercent;

	this.elm.style.width	= this.elm.width + "px";
	this.elm.style.height	= this.elm.height + "px";
	
	/**
	Fires whenever this objects <a href="$Canvas.html#method_Draw">Draw</a> function is called
	@event drawing
	@param {$Canvas} canvas 
	*/
	this.drawing			= new $Event();
	
	/**
	Calls all of the events registered to <a href="$Canvas.html#event_drawing">drawing</a> event on this canvas object
	@method Draw
	*/
	this.Draw = function() {
		this.drawing.Fire([this]);
	};
};

var canvas = null;
var requestId = 0;

/**
Registers the canvas to be used for the main drawing
@method registerCanvas
@param {Object} elm The canvas element to be used from the document
@param [widthPercent=null] {Float} The width scale factor of the canvas (if null uses default width set in the canvas tag)
@param [heightPercent=null] {Float} The height scale factor of the canvas (if null uses default height set in the canvas tag)
@return 
*/
function registerCanvas(elm, widthPercent, heightPercent) {
	if (canvas != null)
		throw "Canvas already registered";
	
	canvas = new $Canvas(elm, widthPercent, heightPercent);
	canvas.drawing.Register(UpdateRequestId);
	
	Start();
}

//----------------------------------
// The following is automatic to register the HTML5 animation callback from the browser
//----------------------------------
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
