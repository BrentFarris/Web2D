var $Button = function(rect, label, callback) {
	this.init(rect);
	
	if (label != null) {
		this.label = label;
	}
	
	if (callback != null) {
		this.onClick.Register(callback);
	}
	
	this.SetText = function(text) {
		this.label.SetText(text);
		
		this.label.rect.x = this.rect.x + ((this.rect.width - this.label.rect.width) * 0.5);
		this.label.rect.y = this.rect.y + ((this.rect.height - this.label.rect.height) * 0.5);
	}
	
	this.Draw = function(canvas) {
		this.label.Draw(canvas);
		canvas.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	};
};

$Button.prototype = new $UI();
