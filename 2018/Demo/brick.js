var Brick = function(rect, img) {
	this.rect = rect;
	this.img = new web2d.image(img, this.rect);
	
	this.Draw = function(canvas) {
		this.img.draw(canvas, rect.x, rect.y);
	};
};