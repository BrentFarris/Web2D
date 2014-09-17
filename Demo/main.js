registerCanvas(document.getElementById("canvas"));

var rect = new $Rectangle(25, 25, 25, 25, new $Color(0, 0, 0, 1));

canvas.drawing.Register(rect.Draw, rect);
