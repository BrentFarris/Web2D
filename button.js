/**
A normal button ui element for clicing and firing click events
@class $Button
@constructor
@extends $UI
*/
var $Button = function(rect, label, callback) {
	this.init(rect);
	
	/**
	The stroke width of the button border
	@property strokeWidth
	*/
	this.strokeWidth = 1;
	
	/**
	Overrides parent <a href="$UI.html#property_hoverPointer">hoverPointer</a>
	@property hoverPointer
	@default "pointer"
	*/
	this.hoverPointer = "pointer";
	
	if (label != null) {
		this.label = label;
		this.label.autoSize = true;
	}
	
	if (callback != null) {
		this.onClick.Register(callback);
	}
	
	/**
	Set the text for the label. This is mainly used to auto update the size (if this.label.<a href="$Label.html#property_autoSize">autoSize</a> is enabled)
	@method SetText
	*/
	this.SetText = function(text) {
		this.label.SetText(text);
		
		this.label.rect.x = this.rect.x + ((this.rect.width - this.label.rect.width) * 0.5);
		this.label.rect.y = this.rect.y + ((this.rect.height - this.label.rect.height) * 0.5);
	}
	
	if (label != null) {
		this.SetText(label.text);
	}
	
	/**
	Draw this button to the screen
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
	@method Draw
	@param {$Canvas} Canvas The Canvas to be drawn on
	*/
	this.Draw = function(canvas) {
		if (!this.enabled) {
			return;
		}
		
		this.label.Draw(canvas);
		if (this.strokeWidth > 0) {
			canvas.context.lineWidth = this.strokeWidth;
			canvas.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		}
	};

	//////////////////////////////
	//	Default button behavior	//
	//////////////////////////////
	this.HoverOverEffect = function() {
		this.strokeWidth = 2;
	};

	this.HoverOutEffect = function() {
		this.strokeWidth = 1;
	};
	
	this.onMouseOver.Register(this.HoverOverEffect, this);
	this.onMouseOut.Register(this.HoverOutEffect, this);
};

$Button.prototype = new $UI();
