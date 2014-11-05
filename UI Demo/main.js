registerCanvas(document.getElementById("canvas"), 1.0, 1.0);
Canvas.Scale(1, 1);

var r = new $Rectangle(15, 15, 100, 25);
var l = new $Label(r, "Click Me");
var b = new $Button(r, l);
b.Disable();

function Click() {
	this.Disable();
	s.TypeWriter("Then there was more text because you clicked on the button", 50, null, 0);
	this.onClick.Remove(Click);
}

function Done() { b.Enable(); }

b.onClick.Register(Click, b);

var s = new $Label(new $Rectangle(50, 50, 100, 100), "", true);

s.TypeWriter("This is a super long string of text", 50, Done, 0);

Canvas.drawing.Register(b.Draw, b);
Canvas.drawing.Register(s.Draw, s);
