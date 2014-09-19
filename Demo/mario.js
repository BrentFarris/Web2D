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
		if (keycode == Keys.A) {
			this.animation.SetRow(2);
		} else if (keycode == Keys.D) {
			this.animation.SetRow(0);
		} else if (keycode == Keys.W) {
			this.Jump();
		}
	};
	
	this.Floored = function(rect) {
		this.jumping = false;
		this.jumpAvailable = true;
		this.velocity.y = 0;
		
		if (rect != null) {
			this.rect.y = rect.y - this.rect.height;
		}
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
		
		if (this.rect.y + this.rect.height > Canvas.elm.height) {
			this.rect.y = Canvas.elm.height - this.rect.height;
			this.Floored();
		}
		
		this.animation.position.Set(this.rect.x, this.rect.y);
		
		if (!this.moving)
			this.animation.SetColumn(0);
	};
	
	this.Jump = function() {
		if (this.jumpAvailable)
		{
			this.velocity.y = this.JUMP_MAX;
			this.jumping = true;
		}
	};
	
	Input.keyDown.Register(this.InputKeyDown, this);
	Canvas.drawing.Register(this.animation.Draw, this.animation);
	Canvas.updating.Register(this.Update, this);
};
