registerCanvas(document.getElementById("canvas"), 1.0, 1.0);

var player = new $Rectangle(50, 50, 25, 25, new $Color(0, 0, 0));

Canvas.drawing.Register(player.Draw, player);

function CheckCollision() {
	
}

Canvas.updating.Register(CheckCollision);
