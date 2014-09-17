var $Input = function()
{
	this.keyString = "abcdefghijklmnopqrstuvwxyz";
	this.keyNumberStrings = "0123456789";
	
	this.tmp = 65;
	for (var i = 0; i < this.keyString.length; i++) {
		this[this.keyString.charAt(i)] = false;
		this["keycode" + this.keyString.charAt(i).toUpperCase()] = this.tmp++;
	}
	
	this.tmp = 48;
	for (var i = 0; i < this.keyNumberStrings.length; i++) {
		this["num" + this.keyNumberStrings.charAt(i)] = false;
		this["keycodeNum" + this.keyNumberStrings.charAt(i)] = this.tmp++;
	}
	
	this.tmp = 96;
	for (var i = 0; i < this.keyNumberStrings.length; i++) {
		this["numpad" + this.keyNumberStrings.charAt(i)] = false;
		this["keycodeNumpad" + this.keyNumberStrings.charAt(i)] = this.tmp++;
	}
	
	this.keycodeLeft = 37;
	this.keycodeRight = 38;
	this.keycodeUp = 39;
	this.keycodeDown = 40;
	this.keycodeEnter = 13;
	this.keycodeSpace = 32;
	this.keycodePeriod = 190;
	this.keycodeComma = 188;
	this.keycodeSlash = 191;
	this.keycodeBackslash = 220;
	this.keycodeEscape = 27;
	this.keycodeBackspace = 8;
	this.keycodeBackspace = 46;
	
	this.keycodeShift = 16;
	this.keycodeCapslock = 20;
	this.keycodeTab = 9;
	this.keycodeTick = 192;
	this.keycodeCtrl = 17;
	this.keycodeAlt = 18;
	
	this.keycodeAdd = 107;
	this.keycodeSubtract = 109;
	this.keycodeDivide = 111;
	this.keycodeMultiply = 106;
	this.keycodeDecimal = 110;
	
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.enter = false;
	this.space = false;
	this.eriod = false;
	this.comma = false;
	this.slash = false;
	this.backslash = false;
	this.escape = false;
	this.backspace = false;
	this.backspace = false;
	
	this.shift = false;
	this.capslock = false;
	this.tab = false;
	this.tick = false;
	this.ctrl = false;
	this.alt = false;
	
	this.add = false;
	this.subtract = false;
	this.divide = false;
	this.multiply = false;
	this.decimal = false;
	
	this.mouseIsDown = false;
	this.mousePosition = new $Vector2(0);
	this.offset = new $Vector2(0);
	this.clamp = new $Vector2(0);
	
	this.keyDown	= new $Event();
	this.keyUp		= new $Event();
	this.mouseDown	= new $Event();
	this.mouseUp	= new $Event();
	this.mouseMove	= new $Event();
	
	this.SetKeyDown = function(keycode) {
		for (var i = 0; i < this.keyString.length; i++) {
			if (keycode == this["keycode" + this.keyString[i].toUpperCase()]) {
				this[this.keyString.charAt(i)] = true;
				return;
			}
		}
		
		for (var i = 0; i < this.keyNumberStrings.length; i++) {
			if (keycode == this["keycodeNum" + this.keyNumberStrings[i]]) {
				this["num" + this.keyNumberStrings.charAt(i)] = true;
				return;
			}
		}
		
		for (var i = 0; i < this.keyNumberStrings.length; i++) {
			if (keycode == this["keycodeNumpad" + this.keyNumberStrings[i]]) {
				this["numpad" + this.keyNumberStrings.charAt(i)] = true;
				return;
			}
		}
		
		if (keycode == this.keycodeLeft)
			this.left = true;
		else if (keycode == this.keycodeRight)
			this.right = true;
		else if (keycode == this.keycodeUp)
			this.up = true;
		else if (keycode == this.keycodeDown)
			this.down = true;
		else if (keycode == this.keycodeEnter)
			this.enter = true;
		else if (keycode == this.keycodeSpace)
			this.space = true;
		else if (keycode == this.keycodePeriod)
			this.period = true;
		else if (keycode == this.keycodeComma)
			this.comma = true;
		else if (keycode == this.keycodeSlash)
			this.slash = true;
		else if (keycode == this.keycodeBackslash)
			this.backslash = true;
		else if (keycode == this.keycodeEscape)
			this.escape = true;
		else if (keycode == this.keycodeBackspace)
			this.backspace = true;
		else if (keycode == this.keycodeDelete)
			this.delete = true;
		
		if (keycode == this.keycodeShift)
			this.shift = true;
		else if (keycode == this.keycodeCapslock)
			this.capslock = true;
		else if (keycode == this.keycodeTab)
			this.tab = true;
		else if (keycode == this.keycodeTick)
			this.tick = true;
		else if (keycode == this.keycodeCtrl)
			this.ctrl = true;
		else if (keycode == this.keycodeAlt)
			this.alt = true;
		
		if (keycode == this.keycodeAdd)
			this.add = true;
		else if (keycode == this.keycodeSubtract)
			this.subtract = true;
		else if (keycode == this.keycodeDivide)
			this.divide = true;
		else if (keycode == this.keycodeMultiply)
			this.multiply = true;
		else if (keycode == this.keycodeDecimal)
			this.decimal = true;
	};
	
	this.SetKeyUp = function(keycode) {
		for (var i = 0; i < this.keyString.length; i++) {
			if (keycode == this["keycode" + this.keyString[i].toUpperCase()]) {
				this[this.keyString.charAt(i)] = false;
				return;
			}
		}
		
		for (var i = 0; i < this.keyNumberStrings.length; i++) {
			if (keycode == this["keycodeNum" + this.keyNumberStrings[i]]) {
				this["num" + this.keyNumberStrings.charAt(i)] = false;
				return;
			}
		}
		
		for (var i = 0; i < this.keyNumberStrings.length; i++) {
			if (keycode == this["keycodeNumpad" + this.keyNumberStrings[i]]) {
				this["numpad" + this.keyNumberStrings.charAt(i)] = false;
				return;
			}
		}
		
		if (keycode == this.keycodeLeft)
			this.left = false;
		else if (keycode == this.keycodeRight)
			this.right = false;
		else if (keycode == this.keycodeUp)
			this.up = false;
		else if (keycode == this.keycodeDown)
			this.down = false;
		else if (keycode == this.keycodeEnter)
			this.enter = false;
		else if (keycode == this.keycodeSpace)
			this.space = false;
		else if (keycode == this.keycodePeriod)
			this.period = false;
		else if (keycode == this.keycodeComma)
			this.comma = false;
		else if (keycode == this.keycodeSlash)
			this.slash = false;
		else if (keycode == this.keycodeBackslash)
			this.backslash = false;
		else if (keycode == this.keycodeEscape)
			this.escape = false;
		else if (keycode == this.keycodeBackspace)
			this.backspace = false;
		else if (keycode == this.keycodeDelete)
			this.delete = false;
		
		if (keycode == this.keycodeShift)
			this.shift = false;
		else if (keycode == this.keycodeCapslock)
			this.capslock = false;
		else if (keycode == this.keycodeTab)
			this.tab = false;
		else if (keycode == this.keycodeTick)
			this.tick = false;
		else if (keycode == this.keycodeCtrl)
			this.ctrl = false;
		else if (keycode == this.keycodeAlt)
			this.alt = false;
		
		if (keycode == this.keycodeAdd)
			this.add = false;
		else if (keycode == this.keycodeSubtract)
			this.subtract = false;
		else if (keycode == this.keycodeDivide)
			this.divide = false;
		else if (keycode == this.keycodeMultiply)
			this.multiply = false;
		else if (keycode == this.keycodeDecimal)
			this.decimal = false;
	};
};

var input = new $Input();

document.documentElement.onmousemove = function(e)
{
	e = e || window.event;
	
	input.mousePosition.x = e.clientX - input.offset.x;
	input.mousePosition.y = e.clientY - input.offset.y;
	
	input.mouseMove.Fire([input.mousePosition.x, input.mousePosition.y]);
};

document.documentElement.onmousedown = function(e)
{
	input.mouseIsDown = true;
	input.mouseDown.Fire();
};

document.documentElement.onmouseup = function(e)
{
	input.mouseIsDown = false;
	input.mouseUp.Fire();
};

document.documentElement.onkeydown = function(e)
{
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	
	input.SetKeyDown(keycode);
	input.keyDown.Fire(keycode);
};

document.documentElement.onkeyup = function(e)
{
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	
	input.SetKeyUp(keycode);
	input.keyUp.Fire(keycode);
};
