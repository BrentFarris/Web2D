registerCanvas(document.getElementById("canvas"), 1.0, 1.0);
Canvas.Scale(1.5, 1.5);

var obj = new $GameObject();
obj.transform.position = new $Vector2(25, 25);
obj.collider = new $RectangleCollider(0, 0, 25, 25);
obj.transform.scale = new $Vector2(2, 2);
Canvas.drawing.Register(obj.Draw, obj);