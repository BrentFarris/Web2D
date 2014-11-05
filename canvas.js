/**
An object to manage a HTML5 <Canvas> element
@class $Canvas
@param elm {Object} The Canvas element on the page to reference
@param [widthPercent=null] {Float} The width scale factor of the Canvas (if null uses default width set in the Canvas tag)
@param [heightPercent=null] {Float} The height scale factor of the Canvas (if null uses default height set in the Canvas tag)
@constructor
*/
var $Canvas = function(elm, widthPercent, heightPercent) {
	if (elm === "undefined")
		throw "The Canvas id passed was not valid";
	
	/**
	This is the actual Canvas element in the document
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
	The current scale of the canvas on the x and y; 1 is default
	@property scale
	*/
	this.scale = new $Vector2(1, 1);
	/**
	The current width of the canvas (this works well with scaling)
	@property width
	*/
	this.width = this.elm.width;
	/**
	The current height of the canvas (this works well with scaling)
	@property height
	*/
	this.height = this.elm.height;
	
	/**
	Fires at the beginning this objects <a href="$Canvas.html#method_Draw">Draw</a> function before the <a href="$Canvas.html#event_Draw">drawing</a> event fires
	@event drawing
	@param {$Canvas} Canvas 
	*/
	this.updating			= new $Event();
	
	/**
	Fires whenever this objects <a href="$Canvas.html#method_Draw">Draw</a> function is called
	@event drawing
	@param {$Canvas} Canvas 
	*/
	this.drawing			= new $Event();
	
	/**
	Calls all of the events registered to <a href="$Canvas.html#event_drawing">drawing</a> event on this Canvas object
	@method Draw
	*/
	this.Draw = function() {
		this.updating.Fire();
		this.drawing.Fire([this]);
	};
	
	/**
	This will scale the canvas up without resizing the canvas. It only scales up everything that is being drawn (1, 1) is default (2, 2) would be 2x the size of default
	@method Scale
	@param {Int} x The scale for the x-axis
	@param {Int} y The scale for the y-axis
	*/
	this.Scale = function(x, y) {
		this.context.scale(x, y);
		
		this.width = this.width * (1 / x);
		this.height = this.height * (1 / y);
		
		this.scale.x = x;
		this.scale.y = y;
	};
};

var Canvas = null;
var requestId = 0;

/**
Registers the Canvas to be used for the main drawing
@method registerCanvas
@param {Object} elm The Canvas element to be used from the document
@param [widthPercent=null] {Float} The width scale factor of the Canvas (if null uses default width set in the Canvas tag)
@param [heightPercent=null] {Float} The height scale factor of the Canvas (if null uses default height set in the Canvas tag)
@return 
*/
function registerCanvas(elm, widthPercent, heightPercent) {
	if (Canvas != null)
		throw "Canvas already registered";
	
	Canvas = new $Canvas(elm, widthPercent, heightPercent);
	Canvas.drawing.Register(UpdateRequestId);
	
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
	Canvas.context.clearRect(0, 0, Canvas.elm.width, Canvas.elm.height);
	Canvas.Draw();
}

function Start() {
	if (Canvas == null)
		throw "You must first register a Canvas with the \"registerCanvas\" function";
	
	requestId = window.requestAnimationFrame(DrawCanvas);
}

function Stop() {
	if (requestId)
		window.cancelAnimationFrame(requestId);
	
	requestId = 0;
}
