var $Label = function(rect, text, textWrap, autoSize) {
	this.init(rect);
	
	this.text = text;
	console.log(text);
	this.fontSize = 20;
	this.font = "Arial, Helvetica, sans-serif";
	this.textBaseline = "top";
	this.textWrap = textWrap != null ? textWrap : false;
	
	this.autoSize = autoSize != null ? autoSize : false;
	
	this.LineHeight = function() {
		return this.fontSize + 2;
	}
	
	// Pulled this function (because I'm lazy) from:  http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
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
	
	this.Draw = function(canvas) {
		canvas.context.textBaseline = this.textBaseline;
		canvas.context.font = this.fontSize + "px " + this.font;
		if (this.textWrap) {
			this.WrapText(canvas.context, this.text, this.rect.x, this.rect.y, this.rect.width, this.LineHeight());
		} else {
			canvas.context.fillText(this.text, this.rect.x, this.rect.y);
		}
	};
	
	this.TypeWriter = function(text, current, speed) {
		this.SetText(text.substr(0, current));
	
		if (current++ == text.length) {
			return;
		}
		
		var that = this;
		setTimeout(function() { that.TypeWriter(text, current, speed); }, speed);
	};
};

$Label.prototype = new $UI();
