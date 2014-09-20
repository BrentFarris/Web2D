registerCanvas(document.getElementById("canvas"), 1.0, 1.0);
Canvas.Scale(1.5, 1.5);

var camera = new Camera();
var mario = new Mario();
var goomba = new Goomba();
goomba.rect.x = 500;

var brickImage = new Image();
brickImage.src = "images/brick.png";

var bricks = new Array();

function DrawBricks(canvas) {
	for (var i = 0; i < bricks.length; i++)
		bricks[i].Draw(canvas);
}

function CameraMoveBricks(x, y) {
	for (var i = 0; i < bricks.length; i++) {
		bricks[i].rect.x += x;
		bricks[i].rect.y += y;
	}
}

camera.moved.Register(CameraMoveBricks);

brickImage.onload = function() {
	for (var i = 0; i < 50; i++) {
		if (i < 5 || i > 8)
			bricks.push(new Brick(new $Rectangle(i * 16, Canvas.height - 16, 16, 16), this));
	}
	
	bricks.push(new Brick(new $Rectangle(4 * 16, (Canvas.height - 16) - (1 * 16), 16, 16), this));
	bricks.push(new Brick(new $Rectangle(5 * 16, (Canvas.height - 16) - (2 * 16), 16, 16), this));
	bricks.push(new Brick(new $Rectangle(6 * 16, (Canvas.height - 16) - (3 * 16), 16, 16), this));
	
	for (var i = 0; i < bricks.length; i++)
		Collision.Add(bricks[i].rect);
	
	Canvas.drawing.Register(DrawBricks);
}

function CheckCollision() {
	var hit = Collision.CheckCollision(mario, function(mario, hit) {
		if (mario.rect.y < hit.y && mario.rect.x + 2 < hit.x + hit.width && mario.rect.x + mario.rect.width - 2 > hit.x)
			mario.Floored(hit);
		else if (mario.rect.y > hit.y + hit.height)
			mario.Ceiling(hit);
		else if (mario.rect.y + mario.rect.height - 2 > hit.y && mario.rect.y < hit.y + hit.height + 2)
			mario.MoveBack(hit);
	}, mario);
	
	var hit = Collision.CheckCollision(goomba, function(goomba, hit) {
		if (goomba.rect.y < hit.y && goomba.rect.x + 2 < hit.x + hit.width && goomba.rect.x + goomba.rect.width - 2 > hit.x)
			goomba.Floored(hit);
		else if (goomba.rect.y + goomba.rect.height - 2 > hit.y && goomba.rect.y < hit.y + hit.height + 2)
			goomba.MoveBack(hit);
	}, goomba);
}

Canvas.updating.Register(CheckCollision);
