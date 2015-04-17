/**
A default image class that allows for easy drawing in the engine
@class $Image
@constructor
@param {Image|String} src The native image object or string source of the image
@param {$Rectangle} rect The rectangle for the image to be drawn in
*/
var $Image = function(src, rect) {
	/**
	The actual native JavaScript Image object
	@property image
	*/
	this.image = new Image();
	/**
	The rectangle for the image to be drawn in
	@property rect
	*/
	this.rect = rect;
	
	if (src != null) {
		if (typeof imgSrc == "string")
			this.image.src = src;
		else
			this.image = src;
		
		if (this.rect == null) {
			this.rect.width = this.image.width;
			this.rect.height = this.image.height;
		}
	}
	
	/**
	Used to load in an image for this object
	@method Load
	@param {Image|String} src The native image object or string source of the image
	*/
	this.Load = function(src) {
		if (typeof imgSrc == "string")
			this.image.src = src;
		else
			this.image = src;
	};
	
	/**
	Set the position for this object's rectangle
	@method Position
	@param {Int} x The new x position for this object's rectangle
	@param {Int} y The new y position for this object's rectangle
	*/
	this.Position = function(x, y) {
		if (x != null) this.rect.x = x;
		if (y != null) this.rect.y = y;
	};
	
	/**
	Resize how large this image is drawn onto the canvas
	@method Resize
	@param {Int} width The new width for this image to be drawn as
	@param {Int} height The new height for this image to be drawn as
	*/
	this.Resize = function(width, height) {
		this.rect.width = width;
		this.rect.height = height;
	};
	
	/**
	Used to draw this image in a particular location on the canvas
	@method Draw
	@param {$Canvas} canvas The canvas object to draw this image on
	@param {Int} x The x position for this image to be drawn at
	@param {Int} y The y position for this image to be drawn at
	*/
	this.Draw = function(canvas, x, y) {
		canvas.context.drawImage(this.image, x, y, this.rect.width, this.rect.height);
	};
	
	/**
	Used to draw this image on the canvas
	Note: This is made to work with the canvas <a href="$Canvas.html#event_drawing">drawing</a> event
	@method SimpleDraw
	@param {$Canvas} canvas The canvas object to draw this image on
	*/
	this.SimpleDraw = function(canvas) {
		canvas.context.drawImage(this.image, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	};
};
