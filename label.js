/**
A label to have text rendered to the screen
@class $Label
@constructor
@extends $UI
*/
var $Label = function(rect, text, textWrap, autoSize) {
	this.init(rect);
	
	/**
	The string message for this label to display
	@property text
	*/
	this.text = text;
	
	/**
	The size of font to be used in pixels
	@property fontSize
	*/
	this.fontSize = 20;
	
	/**
	The font to be used for the text (normal HTML5 strings)
	@property font
	*/
	this.font = "Arial, Helvetica, sans-serif";
	
	/**
	Sets the baseline for the text (normal HTML5 strings)
	@property textBaseline
	*/
	this.textBaseline = "top";
	
	/**
	Wrap the text within the rectangle (requires <a href="$Label.html#property_autoSize">autoSize</a> to be false)
	@property textWrap
	*/
	this.textWrap = textWrap != null ? textWrap : false;
	
	/**
	Auto resize the rectangle to fit to the text
	@property autoSize
	*/
	this.autoSize = autoSize != null ? autoSize : false;
	
	/**
	The color for the text to be drawn in
	@property color
	*/
	this.color = new $Color(0, 0, 0);
	
	/**
	Temporary untested function for getting the height of a line of text
	@method LineHeight
	*/
	this.LineHeight = function() {
		return this.fontSize + 2;
	}
	
	/**
	Draw and wrap the text to this labels rectangle. Pulled this function (because I'm lazy) from:  <a href="http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/">http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/</a>
	@method WrapText
	*/
	this.WrapText = function(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' ');
		var line = '';

		for(var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		
		context.fillText(line, x, y);
	}
	
	/**
	Assign the text for this label and auto resize the rect if <a href="$Label.html#property_autoSize">autoSize</a> is true
	@method SetText
	*/
	this.SetText = function(text) {
		this.text = text;
		
		if (this.autoSize) {
			Canvas.context.font = this.fontSize + "px " + this.font;
			this.rect.width = Canvas.context.measureText(this.text).width;
			this.rect.height = this.LineHeight();
		}
	};
	
	if (text != null) {
		this.SetText(text);
	}
	
	/**
	Draw this label to the screen
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
	@method Draw
	@param {$Canvas} Canvas The Canvas to be drawn on
	*/
	this.Draw = function(canvas) {
		if (!this.enabled) {
			return;
		}
		
		canvas.context.fillStyle = this.color.ToStandard();
		canvas.context.textBaseline = this.textBaseline;
		canvas.context.font = this.fontSize + "px " + this.font;
		if (this.textWrap) {
			this.WrapText(canvas.context, this.text, this.rect.x, this.rect.y, this.rect.width, this.LineHeight());
		} else {
			canvas.context.fillText(this.text, this.rect.x, this.rect.y);
		}
	};
	
	/**
	@property stopTypeWriter
	@private
	*/
	this.stopTypeWriter = false;
	
	/**
	A cool effect to make it seem like the text is being typed out
	@method SetText
	@param {String} text The text that is to be written out
	@param {Int} speed The time in milliseconds between each letter appearing
	@param {Int} current The current index (char) of the string (just keep at 0)
	*/
	this.TypeWriter = function(text, speed, callback, current) {
		if (this.stopTypeWriter) {
			this.stopTypeWriter = false;
			this.SetText(text);
			callback();
			return;
		}
		
		this.SetText(text.substr(0, current));
	
		if (current++ == text.length) {
			if (callback != null) {
				callback();
			}
			
			return;
		}
		
		var that = this;
		this.typeWriterTimeout = setTimeout(function() { that.TypeWriter(text, speed, callback, current); }, speed);
	};
	
	/**
	Stop the current typewriter and just finish now
	@method SetText
	*/
	this.StopTypeWriter = function() {
		this.stopTypeWriter = true;
	}
};

$Label.prototype = new $UI();
