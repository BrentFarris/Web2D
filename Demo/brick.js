var Brick = function(rect, img) {
	this.rect = rect;
	this.img = new $Image(img, this.rect);
	
	this.Draw = function(canvas) {
		this.img.Draw(canvas, rect.x, rect.y);
	};
};