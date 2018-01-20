// TODO:  Make this and mario derive from same class
var Goomba = function(canvas) {
	this.rect = new web2d.rectangle(0, 0, 16, 16);
	this.animation = new web2d.spriteSheet(16, 16, 0, 0, 2, "images/goomba.png", 2, 2, 1);
	
	this.gravity = 0.298;
	this.velocity = new web2d.vec2(-1, 0);
	
	this.dead = false;
	
	this.Floored = function(rect) {
		this.jumpAvailable = true;
		this.velocity.y = 0;
		
		this.rect.y = rect.y - this.rect.height;
		
		if (this.jumping) {
			this.animation.setColumn(0);
			this.animation.setRow(4);
			if (this.lookinRight) {
				this.animation.setRow(0);
			} else {
				this.animation.setRow(2);
			}
		
			this.animation.setLimit(8);
		}
		
		this.jumping = false;
	};
	
	this.MoveBack = function(other) {
		if (other.x > this.rect.x) {
			this.rect.x = other.x - this.rect.width;
		} else if (other.x < this.rect.x) {
			this.rect.x = other.x + other.width;
		}
	};
	
	this.Update = function() {
		this.rect.x += this.velocity.x;
		this.rect.y -= this.velocity.y;
		this.velocity.y -= this.gravity;
		
		this.animation.position.set(this.rect.x, this.rect.y);
	};
	
	this.Die = function() {
		this.dead = true;
	};
	
	canvas.drawing.register(this.animation.draw, this.animation);
	canvas.updating.register(this.Update, this);
};