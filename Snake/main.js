registerCanvas(document.getElementById("canvas"), 1.0, 1.0);

var speed = 1.0;
var lastMove = Time.time;
var player = new $Rectangle(50, 50, 25, 25, new $Color(0, 0, 0));
var food = new $Rectangle(300, 50, 25, 25, new $Color(255, 0, 0));

function Move() {
	if (lastMove < Time.time - speed) {
		lastMove = Time.time;
		
		player.x += player.width;
	}
}

function CheckCollision() {
	if (player.Intersects(food)) {
		food.x += 100;
		food.y += 100;
	}
}

Canvas.drawing.Register(player.Draw, player);
Canvas.drawing.Register(food.Draw, food);

Canvas.updating.Register(CheckCollision);
Canvas.updating.Register(Move);
