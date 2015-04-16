var $GameObject = function() {
	this.transform	= new $Transform();
	
	this.renderer = null;
	this.collider = null;
	
	this.Update = function() {
		if (NULL(this.collider)) {
			return;
		}
		
		this.collider.Update(this);
	};
	
	this.Draw = function(canvas) {
		if (NULL(this.renderer)) {
			return;
		}
		
		var xOffset = (this.transform.position.x * this.transform.scale.x) - this.transform.position.x;
		var yOffset = (this.transform.position.y * this.transform.scale.y) - this.transform.position.y;
		
		canvas.context.translate(xOffset, yOffset);
		canvas.context.scale(
			this.transform.scale.x,
			this.transform.scale.y
		);
		
		this.renderer.Draw(canvas);
		
		canvas.context.scale(
			1 / this.transform.scale.x,
			1 / this.transform.scale.y
		);
		
		canvas.context.translate(-xOffset, -yOffset);
	};
	
	if (!NULL(Canvas)) {
		Canvas.updating.Register(this.Update, this);
		Canvas.drawing.Register(this.Draw, this);
	}
};
