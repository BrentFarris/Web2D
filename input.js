var KeyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var KeyNumberStrings = "0123456789";

console.log("input");

/**
A helper class to compare keycode information and names (should act as a singleton). When this file is included it will automatically make a global instance of this class named "keys"
@class $Keys
*/
var $Keys = function() {
	this.tmp = 65;
	for (var i = 0; i < this.keyString.length; i++) {
		this[this.keyString.charAt(i)] = this.tmp++;
	}
	
	this.tmp = 48;
	for (var i = 0; i < this.keyNumberStrings.length; i++) {
		this["Num" + this.keyNumberStrings.charAt(i)] = this.tmp++;
	}
	
	this.tmp = 96;
	for (var i = 0; i < this.keyNumberStrings.length; i++) {
		this["Numpad" + this.keyNumberStrings.charAt(i)] = this.tmp++;
	}
	
	this.Left = 37;
	this.Right = 38;
	this.Up = 39;
	this.Down = 40;
	this.Enter = 13;
	this.Space = 32;
	this.Period = 190;
	this.Comma = 188;
	this.Slash = 191;
	this.Backslash = 220;
	this.Escape = 27;
	this.Backspace = 8;
	this.Backspace = 46;
	
	this.Shift = 16;
	this.Capslock = 20;
	this.Tab = 9;
	this.Tick = 192;
	this.Ctrl = 17;
	this.Alt = 18;
	
	this.Add = 107;
	this.Subtract = 109;
	this.Divide = 111;
	this.Multiply = 106;
	this.Decimal = 110;
};

var keys = new $Keys();

/**
The main input class for everything (should act as a singleton). When this file is included it will automatically make a global instance of this class named "input"
@class $Input
*/
var $Input = function()
{
	this.tmp = 65;
	for (var i = 0; i < this.keyString.length; i++) {
		this[this.keyString.charAt(i)] = false;
	}
	
	this.tmp = 48;
	for (var i = 0; i < this.keyNumberStrings.length; i++) {
		this["num" + this.keyNumberStrings.charAt(i)] = false;
	}
	
	this.tmp = 96;
	for (var i = 0; i < this.keyNumberStrings.length; i++) {
		this["numpad" + this.keyNumberStrings.charAt(i)] = false;
	}
	
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
	
	/**
	Fired when a key has been pressed
	@event keyDown
	@param {Int} keycode The code of the key that was pressed
	*/
	this.keyDown	= new $Event();
	/**
	Fired when a key has been released
	@event keyUp
	@param {Int} keycode The code of the key that was pressed
	*/
	this.keyUp		= new $Event();
	/**
	Fired when the mouse button has been pressed
	@event mouseDown
	*/
	this.mouseDown	= new $Event();
	/**
	Fired when the mouse button has been released
	@event mouseUp
	*/
	this.mouseUp	= new $Event();
	/**
	Fired when a key has changed position
	@event mouseMove
	@param {Int} x The x position of the mouse after the update
	@param {Int} y The y position of the mouse after the update
	*/
	this.mouseMove	= new $Event();
	
	this.SetKeyDown = function(keycode) {
		for (var i = 0; i < KeyString.length; i++) {
			if (keycode == keys[KeyString[i]]) {
				this[KeyString.charAt(i)] = true;
				return;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == keys["Num" + KeyNumberStrings[i]]) {
				this["Num" + KeyNumberStrings.charAt(i)] = true;
				return;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == keys["Numpad" + KeyNumberStrings[i]]) {
				this["Numpad" + KeyNumberStrings.charAt(i)] = true;
				return;
			}
		}
		
		if (keycode == keys.Left)
			this.left = true;
		else if (keycode == keys.Right)
			this.right = true;
		else if (keycode == keys.Up)
			this.up = true;
		else if (keycode == keys.Down)
			this.down = true;
		else if (keycode == keys.Enter)
			this.enter = true;
		else if (keycode == keys.Space)
			this.space = true;
		else if (keycode == keys.Period)
			this.period = true;
		else if (keycode == keys.Comma)
			this.comma = true;
		else if (keycode == keys.Slash)
			this.slash = true;
		else if (keycode == keys.Backslash)
			this.backslash = true;
		else if (keycode == keys.Escape)
			this.escape = true;
		else if (keycode == keys.Backspace)
			this.backspace = true;
		else if (keycode == keys.Delete)
			this.delete = true;
		
		if (keycode == keys.Shift)
			this.shift = true;
		else if (keycode == keys.Capslock)
			this.capslock = true;
		else if (keycode == keys.Tab)
			this.tab = true;
		else if (keycode == keys.Tick)
			this.tick = true;
		else if (keycode == keys.Ctrl)
			this.ctrl = true;
		else if (keycode == keys.Alt)
			this.alt = true;
		
		if (keycode == keys.Add)
			this.add = true;
		else if (keycode == keys.Subtract)
			this.subtract = true;
		else if (keycode == keys.Divide)
			this.divide = true;
		else if (keycode == keys.Multiply)
			this.multiply = true;
		else if (keycode == keys.Decimal)
			this.decimal = true;
	};
	
	this.SetKeyUp = function(keycode) {
		for (var i = 0; i < KeyString.length; i++) {
			if (keycode == keys[KeyString[i]]) {
				this[KeyString.charAt(i)] = false;
				return;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == keys["Num" + KeyNumberStrings[i]]) {
				this["Num" + KeyNumberStrings.charAt(i)] = false;
				return;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == keys["Numpad" + KeyNumberStrings[i]]) {
				this["Numpad" + KeyNumberStrings.charAt(i)] = false;
				return;
			}
		}
		
		if (keycode == keys.Left)
			this.left = false;
		else if (keycode == keys.Right)
			this.right = false;
		else if (keycode == keys.Up)
			this.up = false;
		else if (keycode == keys.Down)
			this.down = false;
		else if (keycode == keys.Enter)
			this.enter = false;
		else if (keycode == keys.Space)
			this.space = false;
		else if (keycode == keys.Period)
			this.period = false;
		else if (keycode == keys.Comma)
			this.comma = false;
		else if (keycode == keys.Slash)
			this.slash = false;
		else if (keycode == keys.Backslash)
			this.backslash = false;
		else if (keycode == keys.Escape)
			this.escape = false;
		else if (keycode == keys.Backspace)
			this.backspace = false;
		else if (keycode == keys.Delete)
			this.delete = false;
		
		if (keycode == keys.Shift)
			this.shift = false;
		else if (keycode == keys.Capslock)
			this.capslock = false;
		else if (keycode == keys.Tab)
			this.tab = false;
		else if (keycode == keys.Tick)
			this.tick = false;
		else if (keycode == keys.Ctrl)
			this.ctrl = false;
		else if (keycode == keys.Alt)
			this.alt = false;
		
		if (keycode == keys.Add)
			this.add = false;
		else if (keycode == keys.Subtract)
			this.subtract = false;
		else if (keycode == keys.Divide)
			this.divide = false;
		else if (keycode == keys.Multiply)
			this.multiply = false;
		else if (keycode == keys.Decimal)
			this.decimal = false;
	};
	
	/**
	Checks to see if the passed keyname matches a key that is currently being held down
	@method KeyDown
	@param {String} keyname The name of the key to check
	@return Literal True if the letter is currently held down
	*/
	this.KeyDown = function(keyname) {
		return this[letter[0].toUpperCase()];
	};
	
	/**
	Checks to see if the passed keyname matches a key that is currently released
	@method KeyUp
	@param {String} keyname The name of the key to check
	@return Literal True if the letter is currently released
	*/
	this.KeyUp = function(keyname) {
		return !this[letter[0].toUpperCase()];
	};
	
	/**
	Checks to see if the mouse button is currently being held down
	@method MouseDown
	@return Literal True if the mouse button is currently held down
	*/
	this.MouseDown = function() {
		return this.mouseIsDown;
	};
	
	/**
	Checks to see if the mouse button is currently released
	@method MouseDown
	@return Literal True if the mouse button is currently released
	*/
	this.MouseUp = function() {
		return !this.mouseIsDown;
	};
};


//----------------------------------
// The following is automatic to register all the key and moues base callbacks
//----------------------------------
var input = new $Input();

function InputMousePosition(x, y) {
	input.mousePosition.x = x - input.offset.x;
	input.mousePosition.y = y - input.offset.y;
	input.mouseMove.Fire([input.mousePosition.x, input.mousePosition.y]);
}

function InputMouseDown() {
	input.mouseIsDown = true;
	input.mouseDown.Fire();
}

function InputMouseUp() {
	input.mouseIsDown = false;
	input.mouseUp.Fire();
}

function InputKeyDown(keycode) {
	input.SetKeyDown(keycode);
	input.keyDown.Fire(keycode);
}

function InputKeyUp(keycode) {
	input.SetKeyUp(keycode);
	input.keyUp.Fire(keycode);
}

$Document.onmousemove.Register(InputMousePosition);
$Document.onmousedown.Register(InputMouseDown);
$Document.onmouseup.Register(InputMouseUp);
$Document.onkeydown.Register(InputKeyDown);
$Document.onkeyup.Register(InputKeyUp);
