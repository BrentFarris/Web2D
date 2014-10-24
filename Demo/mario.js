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
	this.JUMP_MAX = 6;
	this.jumpVelocity = 0;
	
	this.jumpAudio = new $Audio("audio/jump-small.wav");
	this.dieAudio = new $Audio("audio/die.wav");
	this.stompAudio = new $Audio("audio/stomp.wav");
	this.breakerAudio = new $Audio("audio/stage_clear.wav");
	
	this.dead = false;
	this.enemyKillCount = 0;
	
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
		if (this.dead) return;
		
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
		this.rect.y = rect.y + rect.height + 2;
		this.velocity.y = 0;
	};
	
	this.MoveBack = function(other) {
		this.rect.x -= this.velocity.x;
	};
	
	this.EnemyPounce = function() {
		this.velocity.y = this.JUMP_MAX;
		this.stompAudio.Play();
		
		this.enemyKillCount++;
		
		if (this.enemyKillCount == 10)
			this.breakerAudio.Play();
	};
	
	this.Update = function() {
		if (!this.dead) {
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
		}
		
		this.velocity.y -= this.gravity;
		
		this.rect.x += this.velocity.x;
		this.rect.y -= this.velocity.y;
		
		if (this.rect.x < 0)
			this.rect.x = 0;
		
		if (this.rect.x > Canvas.width * 0.5) {
			camera.Move(-this.velocity.x, 0);
			this.rect.x -= this.velocity.x;
		}
		
		if (this.rect.y >= Canvas.height) {
			this.Die();
		}
		
		this.animation.position.Set(this.rect.x, this.rect.y);
		
		if (!this.moving && !this.jumping && !this.dead)
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
	
	this.Die = function(animate) {
		if (this.dead) return;
		
		this.dead = true;
		this.dieAudio.Play();
		
		if (animate == null || animate == false)
			this.Cleanup();
		else {
			this.animation.SetRow(4);
			this.animation.SetColumn(2);
			this.animation.SetLimit(1);
			this.velocity.x = 0;
			this.velocity.y = this.JUMP_MAX;
		}
	};
	
	this.Cleanup = function() {
		Canvas.updating.Remove(this.Update);
		Canvas.drawing.Remove(this.animation.Draw);
	};
	
	Input.keyDown.Register(this.InputKeyDown, this);
	Canvas.drawing.Register(this.animation.Draw, this.animation);
	Canvas.updating.Register(this.Update, this);
};
