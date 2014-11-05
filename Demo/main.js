registerCanvas(document.getElementById("canvas"), 1.0, 1.0);
Canvas.Scale(1.5, 1.5);

var camera = new Camera();
var mario = new Mario();
var goombas = new Array();

for (var i = 0; i < 0; i++) {
	var goomba = new Goomba();
	goomba.rect.x = 500 + i * 30;
	goombas.push(goomba);
}

var floorImage = new Image();
var brickImage = new Image();
brickImage.src = "images/brick.png";
floorImage.src = "images/floor.png";

var bricks = new Array();
var floors = new Array();

function DrawBricks(canvas) {
	for (var i = 0; i < bricks.length; i++)
		bricks[i].Draw(canvas);
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

camera.moved.Register(CameraMove);

floorImage.onload = function() {
	for (var i = 0; i < 50; i++) {
		if (i < 5 || i > 8)
			floors.push(new Brick(new $Rectangle(i * 16, Canvas.height - 16, 16, 16), this));
	}
	
	floors.push(new Brick(new $Rectangle(4 * 16, (Canvas.height - 16) - (1 * 16), 16, 16), this));
	floors.push(new Brick(new $Rectangle(5 * 16, (Canvas.height - 16) - (2 * 16), 16, 16), this));
	floors.push(new Brick(new $Rectangle(6 * 16, (Canvas.height - 16) - (3 * 16), 16, 16), this));
	
	for (var i = 0; i < floors.length; i++)
		Collision.Add(floors[i].rect);
	
	Canvas.drawing.Register(DrawFloors);
}

brickImage.onload = function() {
	bricks.push(new Brick(new $Rectangle(16 * 15, Canvas.height - (16 * 4), 16, 16), this));
	bricks.push(new Brick(new $Rectangle(16 * 16, Canvas.height - (16 * 4), 16, 16), this));
	bricks.push(new Brick(new $Rectangle(16 * 17, Canvas.height - (16 * 4), 16, 16), this));
	
	for (var i = 0; i < bricks.length; i++)
		Collision.Add(bricks[i].rect);
	
	Canvas.drawing.Register(DrawBricks);
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
			if (mario.rect.Intersects(goombas[i].rect)) {
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

Canvas.updating.Register(CheckCollision);
