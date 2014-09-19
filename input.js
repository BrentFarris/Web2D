var KeyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var KeyNumberStrings = "0123456789";
var Input = null;
var Keys = null;

/**
A helper class to compare keycode information and names (should act as a singleton). When this file is included it will automatically make a global instance of this class named "Keys"
@class $Keys
@constructor
*/
var $Keys = function() {
	if (Keys != null) return Keys; // Global Singleton
	
	this.tmp = 65;
	for (var i = 0; i < KeyString.length; i++) {
		this[KeyString.charAt(i)] = this.tmp++;
	}
	
	this.tmp = 48;
	for (var i = 0; i < KeyNumberStrings.length; i++) {
		this["Num" + KeyNumberStrings.charAt(i)] = this.tmp++;
	}
	
	this.tmp = 96;
	for (var i = 0; i < KeyNumberStrings.length; i++) {
		this["Numpad" + KeyNumberStrings.charAt(i)] = this.tmp++;
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
	this.Backquote = 192;
	this.Ctrl = 17;
	this.Alt = 18;
	
	this.Add = 107;
	this.Subtract = 109;
	this.Divide = 111;
	this.Multiply = 106;
	this.Decimal = 110;
};

Keys = new $Keys();

/**
The main Input class for everything (should act as a singleton). When this file is included it will automatically make a global instance of this class named "Input"
@class $Input
@constructor
*/
var $Input = function() {
	if (Input != null) return Input; // Global Singleton
	
	this.tmp = 65;
	for (var i = 0; i < KeyString.length; i++) {
		this[KeyString.charAt(i)] = false;
	}
	
	this.tmp = 48;
	for (var i = 0; i < KeyNumberStrings.length; i++) {
		this["num" + KeyNumberStrings.charAt(i)] = false;
	}
	
	this.tmp = 96;
	for (var i = 0; i < KeyNumberStrings.length; i++) {
		this["numpad" + KeyNumberStrings.charAt(i)] = false;
	}
	
	this.Left = false;
	this.Right = false;
	this.Up = false;
	this.Down = false;
	this.Enter = false;
	this.Space = false;
	this.Period = false;
	this.Comma = false;
	this.Slash = false;
	this.Backslash = false;
	this.Escape = false;
	this.Backspace = false;
	
	this.Shift = false;
	this.Capslock = false;
	this.Tab = false;
	this.Backquote = false;
	this.Ctrl = false;
	this.Alt = false;
	
	this.Add = false;
	this.Subtract = false;
	this.Divide = false;
	this.Multiply = false;
	this.Decimal = false;
	
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
			if (keycode == Keys[KeyString[i]]) {
				if (this[KeyString.charAt(i)])
					return false;
				
				this[KeyString.charAt(i)] = true;
				return true;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == Keys["Num" + KeyNumberStrings[i]]) {
				if (this["Num" + KeyNumberStrings.charAt(i)])
					return false;
				
				this["Num" + KeyNumberStrings.charAt(i)] = true;
				return true;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == Keys["Numpad" + KeyNumberStrings[i]]) {
				if (this["Numpad" + KeyNumberStrings.charAt(i)])
					return false;
					
				this["Numpad" + KeyNumberStrings.charAt(i)] = true;
				return true;
			}
		}
		
		var startVal = false;
		if (keycode == Keys.Left) {
			startVal = this.Left;
			this.Left = true;
		} else if (keycode == Keys.Right) {
			startVal = this.Right;
			this.Right = true;
		} else if (keycode == Keys.Up) {
			startVal = this.Up;
			this.Up = true;
		} else if (keycode == Keys.Down) {
			startVal = this.Down;
			this.Down = true;
		} else if (keycode == Keys.Enter) {
			startVal = this.Enter;
			this.Enter = true;
		} else if (keycode == Keys.Space) {
			startVal = this.Space;
			this.Space = true;
		} else if (keycode == Keys.Period) {
			startVal = this.Period;
			this.Period = true;
		} else if (keycode == Keys.Comma) {
			startVal = this.Comma;
			this.Comma = true;
		} else if (keycode == Keys.Slash) {
			startVal = this.Slash;
			this.Slash = true;
		} else if (keycode == Keys.Backslash) {
			startVal = this.Backslash;
			this.Backslash = true;
		} else if (keycode == Keys.Escape) {
			startVal = this.Escape;
			this.Escape = true;
		} else if (keycode == Keys.Backspace) {
			startVal = this.Backspace;
			this.Backspace = true;
		} else if (keycode == Keys.Delete) {
			startVal = this.Delete;
			this.Delete = true;
		} else if (keycode == Keys.Shift) {
			startVal = this.Shift;
			this.Shift = true;
		} else if (keycode == Keys.Capslock) {
			startVal = this.Capslock;
			this.Capslock = true;
		} else if (keycode == Keys.Tab) {
			startVal = this.Tab;
			this.Tab = true;
		} else if (keycode == Keys.Backquote) {
			startVal = this.Backquote;
			this.Backquote = true;
		} else if (keycode == Keys.Ctrl) {
			startVal = this.Ctrl;
			this.Ctrl = true;
		} else if (keycode == Keys.Alt) {
			startVal = this.Alt;
			this.Alt = true;
		} else if (keycode == Keys.Add) {
			startVal = this.Add;
			this.Addtrue;
		} else if (keycode == Keys.Subtract) {
			startVal = this.Subtract;
			this.Subtract = true;
		} else if (keycode == Keys.Divide) {
			startVal = this.Divide;
			this.Divide = true;
		} else if (keycode == Keys.Multiply) {
			startVal = this.Multiply;
			this.Multiply = true;
		} else if (keycode == Keys.Decimal) {
			startVal = this.Decimal;
			this.Decimal = true;
		}
		
		return !startVal;
	};
	
	this.SetKeyUp = function(keycode) {
		for (var i = 0; i < KeyString.length; i++) {
			if (keycode == Keys[KeyString[i]]) {
				if (!this[KeyString.charAt(i)])
					return false;
				
				this[KeyString.charAt(i)] = false;
				return true;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == Keys["Num" + KeyNumberStrings[i]]) {
				if (!this["Num" + KeyNumberStrings.charAt(i)])
					return false;
				
				this["Num" + KeyNumberStrings.charAt(i)] = false;
				return true;
			}
		}
		
		for (var i = 0; i < KeyNumberStrings.length; i++) {
			if (keycode == Keys["Numpad" + KeyNumberStrings[i]]) {
				if (!this["Numpad" + KeyNumberStrings.charAt(i)])
					return false;
					
				this["Numpad" + KeyNumberStrings.charAt(i)] = false;
				return true;
			}
		}
		
		var startVal = false;
		if (keycode == Keys.Left) {
			startVal = this.Left;
			this.Left = false;
		} else if (keycode == Keys.Right) {
			startVal = this.Right;
			this.Right = false;
		} else if (keycode == Keys.Up) {
			startVal = this.Up;
			this.Up = false;
		} else if (keycode == Keys.Down) {
			startVal = this.Down;
			this.Down = false;
		} else if (keycode == Keys.Enter) {
			startVal = this.Enter;
			this.Enter = false;
		} else if (keycode == Keys.Space) {
			startVal = this.Space;
			this.Space = false;
		} else if (keycode == Keys.Period) {
			startVal = this.Period;
			this.Period = false;
		} else if (keycode == Keys.Comma) {
			startVal = this.Comma;
			this.Comma = false;
		} else if (keycode == Keys.Slash) {
			startVal = this.Slash;
			this.Slash = false;
		} else if (keycode == Keys.Backslash) {
			startVal = this.Backslash;
			this.Backslash = false;
		} else if (keycode == Keys.Escape) {
			startVal = this.Escape;
			this.Escape = false;
		} else if (keycode == Keys.Backspace) {
			startVal = this.Backspace;
			this.Backspace = false;
		} else if (keycode == Keys.Delete) {
			startVal = this.Delete;
			this.Delete = false;
		} else if (keycode == Keys.Shift) {
			startVal = this.Shift;
			this.Shift = false;
		} else if (keycode == Keys.Capslock) {
			startVal = this.Capslock;
			this.Capslock = false;
		} else if (keycode == Keys.Tab) {
			startVal = this.Tab;
			this.Tab = false;
		} else if (keycode == Keys.Backquote) {
			startVal = this.Backquote;
			this.Backquote = false;
		} else if (keycode == Keys.Ctrl) {
			startVal = this.Ctrl;
			this.Ctrl = false;
		} else if (keycode == Keys.Alt) {
			startVal = this.Alt;
			this.Alt = false;
		} else if (keycode == Keys.Add) {
			startVal = this.Add;
			this.Add = false;
		} else if (keycode == Keys.Subtract) {
			startVal = this.Subtract;
			this.Subtract = false;
		} else if (keycode == Keys.Divide) {
			startVal = this.Divide;
			this.Divide = false;
		} else if (keycode == Keys.Multiply) {
			startVal = this.Multiply;
			this.Multiply = false;
		} else if (keycode == Keys.Decimal) {
			startVal = this.Decimal;
			this.Decimal = false;
		}
		
		return startVal;
	};
	
	/**
	Checks to see if the passed keyname matches a key that is currently being held down
	@method KeyDown
	@param {String} keyname The name of the key to check
	@return Literal True if the letter is currently held down
	*/
	this.KeyDown = function(keyname) {
		return this[keyname.toUpperCase()];
	};
	
	/**
	Checks to see if the passed keyname matches a key that is currently released
	@method KeyUp
	@param {String} keyname The name of the key to check
	@return Literal True if the letter is currently released
	*/
	this.KeyUp = function(keyname) {
		return !this[keyname.toUpperCase()];
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
Input = new $Input();

function InputMousePosition(x, y) {
	Input.mousePosition.x = x - Input.offset.x;
	Input.mousePosition.y = y - Input.offset.y;
	Input.mouseMove.Fire([Input.mousePosition.x, Input.mousePosition.y]);
}

function InputMouseDown() {
	Input.mouseIsDown = true;
	Input.mouseDown.Fire();
}

function InputMouseUp() {
	Input.mouseIsDown = false;
	Input.mouseUp.Fire();
}

function InputKeyDown(keycode) {
	if (Input.SetKeyDown(keycode))
		Input.keyDown.Fire([keycode]);
}

function InputKeyUp(keycode) {
	if (Input.SetKeyUp(keycode))
		Input.keyUp.Fire([keycode]);
}

$Document.onmousemove.Register(InputMousePosition);
$Document.onmousedown.Register(InputMouseDown);
$Document.onmouseup.Register(InputMouseUp);
$Document.onkeydown.Register(InputKeyDown);
$Document.onkeyup.Register(InputKeyUp);
