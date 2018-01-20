var canvas = new web2d.canvas(document.getElementById("canvas"), 1.0, 1.0);
web2d.canvasHelpers.start(canvas);

var camera = new Camera();
var mario = new Mario(canvas);
var goombas = [];

for (var i = 0; i < 5; i++) {
	var goomba = new Goomba(canvas);
	goomba.rect.x = 500 + i * 30;
	goombas.push(goomba);
}

var floorImage = new Image();
var brickImage = new Image();
brickImage.src = "images/brick.png";
floorImage.src = "images/floor.png";

var bricks = [];
var floors = [];

function DrawBricks(canvas) {
	for (var i = 0; i < bricks.length; i++) {
		bricks[i].Draw(canvas);
	}
}

function DrawFloors(canvas) {
	for (var i = 0; i < floors.length; i++)
		floors[i].Draw(canvas);
}

function CameraMove(x, y) {
	for (var i = 0; i < bricks.length; i++) {
		bricks[i].rect.x += x;
		bricks[i].rect.y += y;
	}
	
	for (var i = 0; i < floors.length; i++) {
		floors[i].rect.x += x;
		floors[i].rect.y += y;
	}
	
	for (var i = 0; i < goombas.length; i++) {
		goombas[i].rect.x += x;
		goombas[i].rect.y += y;
	}
}

camera.moved.register(CameraMove);

floorImage.onload = function() {
	for (var i = 0; i < 50; i++) {
		if (i < 5 || i > 8)
			floors.push(new Brick(new web2d.rectangle(i * 16, canvas.height - 16, 16, 16), this));
	}
	
	floors.push(new Brick(new web2d.rectangle(4 * 16, (canvas.height - 16) - (1 * 16), 16, 16), this));
	floors.push(new Brick(new web2d.rectangle(5 * 16, (canvas.height - 16) - (2 * 16), 16, 16), this));
	floors.push(new Brick(new web2d.rectangle(6 * 16, (canvas.height - 16) - (3 * 16), 16, 16), this));
	
	for (var i = 0; i < floors.length; i++) {
		Collision.Add(floors[i].rect);
	}
	
	canvas.drawing.register(DrawFloors);
}

brickImage.onload = function() {
	bricks.push(new Brick(new web2d.rectangle(16 * 15, canvas.height - (16 * 4), 16, 16), this));
	bricks.push(new Brick(new web2d.rectangle(16 * 16, canvas.height - (16 * 4), 16, 16), this));
	bricks.push(new Brick(new web2d.rectangle(16 * 17, canvas.height - (16 * 4), 16, 16), this));
	
	for (var i = 0; i < bricks.length; i++) {
		Collision.Add(bricks[i].rect);
	}
	
	canvas.drawing.register(DrawBricks);
};

function CheckCollision() {
	if (!mario.dead) {
		var hit = Collision.CheckCollision(mario, function(mario, hit) {
			if (mario.rect.y < hit.y && mario.rect.x + 2 < hit.x + hit.width && mario.rect.x + mario.rect.width - 2 > hit.x)
				mario.Floored(hit);
			else if (mario.rect.y + 4 > hit.y + hit.height)
				mario.Ceiling(hit);
			else if (mario.rect.y + mario.rect.height - 4 > hit.y && mario.rect.y < hit.y + hit.height + 2)
				mario.MoveBack(hit);
		}, mario);
		
		for (var i = 0; i < goombas.length; i++) {
			if (mario.rect.intersects(goombas[i].rect)) {
				if (mario.rect.y < goombas[i].rect.y) {
					mario.EnemyPounce();
					goombas[i].Die();
				} else {
					mario.Die(true);
				}
			}
		}
	}
	
	for (var i = 0; i < goombas.length; i++) {
		var goomba = goombas[i];
		if (!goombas[i].dead) {
			var hit = Collision.CheckCollision(goomba, function(goomba, hit) {
				if (goomba.rect.y < hit.y && goomba.rect.x + 2 < hit.x + hit.width && goomba.rect.x + goomba.rect.width - 2 > hit.x)
					goomba.Floored(hit);
				else if (goomba.rect.y + goomba.rect.height - 2 > hit.y && goomba.rect.y < hit.y + hit.height + 2)
					goomba.MoveBack(hit);
			}, goomba);
		}
	}
}

canvas.updating.register(CheckCollision);