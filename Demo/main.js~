registerCanvas(document.getElementById("canvas"), 1.0, 1.0);
Canvas.Scale(1.5, 1.5);
var mario = new Mario();

var brickImage = new Image();
brickImage.src = "images/brick.png";

var bricks = new Array();

function DrawBricks(canvas) {
	for (var i = 0; i < bricks.length; i++)
		bricks[i].Draw(canvas);
}

brickImage.onload = function() {
	for (var i = 0; i < 10; i++) {
		if (i < 5 || i > 6) {
			var brick = new Brick(new $Rectangle(i * 25, (Canvas.height - (100 - i * 25)), 25, 25), this);
			Collision.Add(brick.rect);
			bricks.push(brick);
		}
	}
	
	Canvas.drawing.Register(DrawBricks);
}

function CheckCollision() {
	var hit = Collision.CheckCollision(mario, function(mario, hit) {
		if (mario.rect.y < hit.y && mario.rect.x + 2 < hit.x + hit.width && mario.rect.x + mario.rect.width - 2 > hit.x)
			mario.Floored(hit);
		else if (mario.rect.y > hit.y + hit.height)
			mario.Ceiling(hit);
		else
			mario.MoveBack(hit);
	}, mario);
}

Canvas.updating.Register(CheckCollision);
