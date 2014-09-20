Mario = function() {
	this.rect = new $Rectangle(0, 0, 16, 16);
	this.rect.color.r = 0;
	this.rect.color.g = 0;
	
	this.animation = new $SpriteSheet(16, 16, 0, 0, 8, "images/mario.png", 8, 4, 5);
	
	this.gravity = 0.298;
	this.velocity = new $Vector2(0, 0);
	
	this.moving = false;
	
	this.lookinRight = true;
	
	this.jumpAvailable = false;
	this.jumping = true;
	this.JUMP_MAX = 5;
	this.jumpVelocity = 0;
	
	this.jumpAudio = new $Audio("audio/jump-small.wav");
	this.dieAudio = new $Audio("audio/die.wav");
	
	this.SetPosition = function(x, y, mod) {
		if (mod == null || !mod)
		{
			if (x != null)
				this.rect.x = x;
			if (y != null)
				this.rect.y = y;
		}
		else
		{
			if (x != null)
				this.rect.x += x;
			if (y != null)
				this.rect.y += y;
		}
	};
	
	this.InputKeyDown = function(keycode) {
		if (!this.jumping) {
			if (keycode == Keys.A) {
				this.animation.SetRow(2);
			} else if (keycode == Keys.D) {
				this.animation.SetRow(0);
			} else if (keycode == Keys.W) {
				this.Jump();
			}
		}
	};
	
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
	
	this.Ceiling = function(rect) {
		this.rect.y -= this.velocity.y;
		this.velocity.y = 0;
	};
	
	this.MoveBack = function(other) {
		if (other.x > this.rect.x)
			this.rect.x = other.x - this.rect.width;
		else if (other.x < this.rect.x)
			this.rect.x = other.x + other.width;
	};
	
	this.Update = function() {
		if (Input.KeyDown("a")) {
			this.velocity.x = -2;
			this.moving = true;
			this.lookinRight = false;
		} else if (Input.KeyDown("d")) {
			this.velocity.x = 2;
			this.moving = true;
			this.lookinRight = true;
		} else {
			this.velocity.x = 0;
			this.moving = false;
		}
		
		this.rect.x += this.velocity.x;
		this.rect.y -= this.velocity.y;
		this.velocity.y -= this.gravity;
		
		if (this.rect.y >= Canvas.height) {
			this.dieAudio.Play();
			Canvas.updating.Remove(this.Update);
			Canvas.drawing.Remove(this.animation.Draw);
		}
		
		this.animation.position.Set(this.rect.x, this.rect.y);
		
		if (!this.moving)
			this.animation.SetColumn(0);
	};
	
	this.Jump = function() {
		if (this.jumpAvailable) {
			this.animation.SetRow(4);
			if (this.lookinRight) {
				this.animation.SetColumn(0);
			} else {
				this.animation.SetColumn(1);
			}
			
			this.animation.SetLimit(1);
			
			this.jumpAudio.Play();
			this.velocity.y = this.JUMP_MAX;
			this.jumping = true;
		}
	};
	
	Input.keyDown.Register(this.InputKeyDown, this);
	Canvas.drawing.Register(this.animation.Draw, this.animation);
	Canvas.updating.Register(this.Update, this);
};
