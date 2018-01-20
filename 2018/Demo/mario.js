Mario = function(canvas) {
	this.canvas = canvas;
	this.rect = new web2d.rectangle(0, 0, 16, 16);
	this.rect.color.r = 0;
	this.rect.color.g = 0;
	
	this.animation = new web2d.spriteSheet(16, 16, 0, 0, 8, "images/mario.png", 8, 4, 5);
	
	this.gravity = 0.298;
	this.velocity = new web2d.vec2(0, 0);
	
	this.moving = false;
	
	this.lookinRight = true;
	
	this.jumpAvailable = false;
	this.jumping = true;
	this.JUMP_MAX = 6;
	this.jumpVelocity = 0;
	
	this.jumpAudio = new web2d.audio("audio/jump-small.wav");
	this.dieAudio = new web2d.audio("audio/die.wav");
	this.stompAudio = new web2d.audio("audio/stomp.wav");
	this.breakerAudio = new web2d.audio("audio/stage_clear.wav");
	
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
	
	this.InputKeyDown = function(key) {
		if (this.dead) return;
		
		if (!this.jumping) {
			if (key.keyCode === web2d.input.keys.A) {
				this.animation.setRow(2);
			} else if (key.keyCode === web2d.input.keys.D) {
				this.animation.setRow(0);
			} else if (key.keyCode === web2d.input.keys.W) {
				this.Jump();
			}
		}
	};
	
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
	
	this.Ceiling = function(rect) {
		this.rect.y = rect.y + rect.height + 2;
		this.velocity.y = 0;
	};
	
	this.MoveBack = function(other) {
		this.rect.x -= this.velocity.x;
	};
	
	this.EnemyPounce = function() {
		this.velocity.y = this.JUMP_MAX;
		this.stompAudio.play();
		
		this.enemyKillCount++;
		
		if (this.enemyKillCount == 10)
			this.breakerAudio.play();
	};
	
	this.Update = function() {
		if (!this.dead) {
			if (web2d.input.isKeyDown("a")) {
				this.velocity.x = -2;
				this.moving = true;
				this.lookinRight = false;
			} else if (web2d.input.isKeyDown("d")) {
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
		
		if (this.rect.x > this.canvas.width * 0.5) {
			camera.Move(-this.velocity.x, 0);
			this.rect.x -= this.velocity.x;
		}
		
		if (this.rect.y >= this.canvas.height) {
			this.Die();
		}
		
		this.animation.position.set(this.rect.x, this.rect.y);
		
		if (!this.moving && !this.jumping && !this.dead) {
			this.animation.setColumn(0);
		}
	};
	
	this.Jump = function() {
		if (this.jumpAvailable) {
			this.animation.setRow(4);
			if (this.lookinRight) {
				this.animation.setColumn(0);
			} else {
				this.animation.setColumn(1);
			}
			
			this.animation.setLimit(1);
			
			this.jumpAudio.play();
			this.velocity.y = this.JUMP_MAX;
			this.jumping = true;
		}
	};
	
	this.Die = function(animate) {
		if (this.dead) return;
		
		this.dead = true;
		this.dieAudio.play();
		
		if (animate == null || animate == false)
			this.Cleanup();
		else {
			this.animation.setRow(4);
			this.animation.setColumn(2);
			this.animation.setLimit(1);
			this.velocity.x = 0;
			this.velocity.y = this.JUMP_MAX;
		}
	};
	
	this.Cleanup = function() {
		this.canvas.updating.remove(this.Update);
		this.canvas.drawing.remove(this.animation.Draw);
	};
	
	web2d.input.keyDown.register(this.InputKeyDown, this);
	canvas.drawing.register(this.animation.draw, this.animation);
	canvas.updating.register(this.Update, this);
};
