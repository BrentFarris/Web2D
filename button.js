var $Button = function(rect, label, callback) {
	this.init(rect);
	
	this.strokeWidth = 1;
	this.hoverPointer = "pointer";
	
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
	
	if (label != null) {
		this.SetText(label.text);
	}
	
	this.Draw = function(canvas) {
		this.label.Draw(canvas);
		canvas.context.lineWidth = this.strokeWidth;
		canvas.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
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
