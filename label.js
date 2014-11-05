var $Label = function(x, y, text) {
	this.init(new $Rectangle(x, y, 0, 0));
	
	this.text = text;
	this.fontSize = 20;
	this.font = "Arial, Helvetica, sans-serif";
	this.textBaseline = "top";
	
	this.SetText = function(text) {
		this.text = text;
		
		Canvas.context.font = this.fontSize + "px " + this.font;
		this.rect.width = Canvas.context.measureText(this.text).width;
		this.rect.height = this.fontSize + 2;
	};
	
	if (text != null) {
		this.SetText(text);
	}
	
	this.Draw = function(canvas) {
		canvas.context.textBaseline = this.textBaseline;
		canvas.context.font = this.fontSize + "px " + this.font;
		canvas.context.fillText(this.text, this.rect.x, this.rect.y);
	};
};

$Label.prototype = new $UI();
