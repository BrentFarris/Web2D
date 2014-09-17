registerCanvas(document.getElementById("canvas"), 1.0, 1.0);

var rect = new $Rectangle(25, 25, 25, 25, new $Color(0, 0, 0, 1));

canvas.drawing.Register(rect.Draw, rect);

function MoveToMouse(x, y) {
	rect.x = x - (rect.width * 0.5);
	rect.y = y - (rect.height * 0.5);
}

input.mouseMove.Register(MoveToMouse);