var $Event = function() {
	this.events = new Array();
	this.Register = function(evt, obj) {
		this.events.push(new Array(evt, obj == null ? window : obj));
	}
	
	this.Remove = function(event) {
		this.events.remove(event);
	}
	
	this.Fire = function (args) {
		for (var i = 0; i < this.events.length; i++)
			this.events[i][0].apply(this.events[i][1], args);
	}
}

window.onresize = function () { windowResize.Fire([window.innerWidth, window.innerHeight]); };
document.documentElement.onmousemove = function (e) {
	e = e || window.event;

	input.mousePosition.x = e.clientX - input.offset.x;
	input.mousePosition.y = e.clientY - input.offset.y;
	input.mouseMove.Fire([input.mousePosition.x, input.mousePosition.y]);
};

document.documentElement.onmousedown = function (e) {
	input.mouseIsDown = true;
	input.mouseDown.Fire();
};

document.documentElement.onmouseup = function (e) {
	input.mouseIsDown = false;
	input.mouseUp.Fire();
};

document.documentElement.onkeydown = function (e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	input.SetKeyDown(keycode);
	input.keyDown.Fire(keycode);
};

document.documentElement.onkeyup = function (e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	input.SetKeyUp(keycode);
	input.keyUp.Fire(keycode);
};