// TODO:  Make this and mario derive from same class
var Goomba = function() {
	this.rect = new $Rectangle(0, 0, 16, 16);
	this.animation = new $SpriteSheet(16, 16, 0, 0, 2, "images/goomba.png", 2, 2, 1);
	
	this.gravity = 0.298;
	this.velocity = new $Vector2(-1, 0);
	
	this.dead = false;
	
	this.Floored = function(rect) {
		this.jumpAvailable = true;
		this.velocity.y = 0;
		
		this.rect.y = rect.y - this.rect.height;
		
		if (this.jumping) {
			this.animation.SetColumn(0);
			this.animation.SetRow(4);
			if (this.lookinRight) {
				this.animation.SetRow(0);
			} else {
				this.animation.SetRow(2);
			}
		
			this.animation.SetLimit(8);
		}
		
		this.jumping = false;
	};
	
	this.MoveBack = function(other) {
		if (other.x > this.rect.x)
			this.rect.x = other.x - this.rect.width;
		else if (other.x < this.rect.x)
			this.rect.x = other.x + other.width;
	};
	
	this.Update = function() {
		this.rect.x += this.velocity.x;
		this.rect.y -= this.velocity.y;
		this.velocity.y -= this.gravity;
		
		this.animation.position.Set(this.rect.x, this.rect.y);
	};
	
	this.Die = function() {
		this.dead = true;
	};
	
	Canvas.drawing.Register(this.animation.Draw, this.animation);
	Canvas.updating.Register(this.Update, this);
};