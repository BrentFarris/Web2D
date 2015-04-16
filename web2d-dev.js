/**
Extension methods to the base array class
@class Array
*/
{
	/**
	Get the first object in this array
	@method head
	*/
	Array.prototype.head = function() {
		return this[0];
	}
	
	/**
	Get the last object in this array
	@method tail
	*/
	Array.prototype.tail = function() {
		return this[this.length - 1];
	}
	
	/**
	Removes a given element from an array given its index
	@method removeAt
	@param {Int} position The index of the element to be removed from the array
	@chainable
	*/
	Array.prototype.removeAt = function(position) {
		this.splice(position, 1);
		return this;
	}

	/**
	Removes an item from the array if the item's signatures match; Only removes the first found instance
	@method remove
	@param {Object} arg The object to be compared against and removed
	@chainable
	*/
	Array.prototype.remove = function(arg) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == arg) {
				this.splice(i, 1);
				break;
			}
		}
	
		return this;
	}

	/**
	Delete all the items from the array
	@method clear
	*/
	Array.prototype.clear = function() {
		this.length = 0;
	}

	/**
	Insert an Object into the array at a given position; this shifts the one at that current position to the next index
	@method insertAt
	@param {Object} arg The object to be inserted into the array at the supplied index
	@param {Int} position The position to insert the supplied object at in the array
	@chainable
	*/
	Array.prototype.insertAt = function(arg, position) {
		var arr1 = this.slice(0, position);
		var arr2 = this.slice(position);
	
		this.clear();
	
		for (var i = 0; i < arr1.length; i++)
			this.push(arr1[i]);
	
		this.push(arg);
	
		for (var j = 0; j < arr2.length; j++)
			this.push(arr2[j]);
	
		return this;
	}

	/**
	Determines if the supplied object is already in the array
	@method contains
	@param {Object} arg The object to compare against
	@return Literal Returns true if the object was found in the array
	*/
	Array.prototype.contains = function(arg) {
		for (var i = 0; i < this.length; i++)
			if (this[i] == arg)
				return true;
			
		return false;
	}

	/**
	This counts how many times the object occurs in the array
	@method occurs
	@param {Object} arg The object to be compared against
	@return counter The amount of times the supplied object was found in the array
	*/
	Array.prototype.occurs = function(arg) {
		var counter = 0;
	
		for (var i = 0; i < this.length; i++) {
			if (this[i] == arg)
				counter++;
		}
	
		return counter;
	}
	
	/**
	 * Iterate through the collection and pass each element
	 * in the collection through the supplied expression
	 * @method iterate
	 * @param {function} expression The Anonymous function that each element
	 * in the collection will be passed through
	 * @example myArray.iterate(function(elm) { elm.count++; });
	 * @chainable
	 */
	Array.prototype.iterate = function(expression) {
		for (var i = 0; i < this.length; i++) {
			expression(this[i]);
		}
		
		return this;
	}
	
	/**
	 * Iterate through the collection and pass each element
	 * in the collection through the supplied expression, whatever is returned from
	 * the expression is added to a collection that is then returned
	 * @method iterateExecute
	 * @param {function} expression The Anonymous function that each element
	 * in the collection will be passed through
	 * @param {bool} $includeNulls Include null objects in the returned collection
	 * @return {Array} The elements that passed the evaluation of the expression
	 * @example var names = myArray.IterateExecute(function(elm) { return elm.name; });
	 * @chainable
	 */
	Array.prototype.iterateExecute = function(expression, includeNulls) {
		var evaluatedCollection = [];
		for (var i = 0; i < this.length; i++) {
			if (includeNulls) {
				evaluatedCollection.push(expression(this[i]));
			} else {
				var tmp = expression(this[i]);

				if (!NULL(tmp)) {
					evaluatedCollection.push(tmp);
				}
			}
		}

		return evaluatedCollection;
	}
	
	/**
	 * Find all objects in the array that meet the expression
	 * @method where
	 * @param {function} expression The expression that is to be evaluated on each
	 * element in the collection
	 * @return {Array} The elements that passed the functions boolean return
	 * @example myArray.where(function(elm) { return elm.groupId == 1; });
	 * @chainable
	 */
	Array.prototype.where = function(expression) {
		var evaluatedCollection = [];
		
		for (var i = 0; i < this.length; i++) {
			if (expression(this[i])) {
				evaluatedCollection.push(this[i]);
			}
		}

		return evaluatedCollection;
	}
	
	/**
	 * Returns the first element in the collection that passes
	 * the expressions boolean check
	 * @method findFirst
	 * @param {function} expression The expression that is to be evaluated true/false
	 * @return Object|null The first object where the expression returned true or null if all returned false
	 * @example var first = myArray.first(function(elm) { return elm.firstName == "Brent"; });
	 */
	Array.prototype.findFirst = function(expression) {
		for (var i = 0; i < this.length; i++) {
			if (expression(this[i])) {
				return this[i];
			}
		}

		return null;
	}
	
	/**
	 * Returns the last element in the collection that passes
	 * the expressions boolean check
	 * @method findLast
	 * @param {function} expression The expression that is to be evaluated true/false
	 * @return Object|null The last object where the expression returned true or null if all returned false
	 * @example myArray.last(function(elm) { return elm.lastName == "Farris"; });
	 */
	Array.prototype.findLast = function(expression) {
		for (var i = this.length - 1; i >= 0; i--) {
			if (expression(this[i])) {
				return this[i];
			}
		}

		return null;
	}
}
function NULL(val) {
	return val == null || val == undefined;
}/**
The event class is responsible for registering multiple events to one function call much like C#'s "event" type
@class $Event
@constructor
*/
var $Event = function() {
	/**
	The list of events to be fired when "Fire" is called
	@property events
	@private
	*/
	this.events = new Array();
	
	/**
	Registers events to this objects event array to be called
	@method Register
	@param {Function} evt The function to be called
	@param {Object} [obj=window] The object that the function belongs to
	*/
	this.Register = function(evt, obj) {
		this.events.push(new Array(evt, obj == null ? window : obj));
	};
	
	/**
	Removes a specified function signature from the array
	@method Remove
	@param {Function} event
	*/
	this.Remove = function(event) {
		for (var i = 0; i < this.events.length; i++) {
			if (this.events[i][0] == event) {
				this.events.removeAt(i);
				break;
			}
		}
	};
	
	/**
	Goes through all of the registered events and fires them off
	@method Fire
	@param {Array} args All of the arguments to be mapped to the events (functions)
	*/
	this.Fire = function (args) {
		for (var i = 0; i < this.events.length; i++)
			this.events[i][0].apply(this.events[i][1], args);
	};
};
/**
* An extension to the main window object
* @class $Window
*/
var $Window = function() {
	/**
	Finds the left offset in pixels of an element on the page
	@method GetLeft
	@param {Object} elm The object to find its offset relative to the page
	@return Int The left offset of an object on the page
	*/
	this.GetLeft = function(elm) {
		var left = elm.offsetLeft;
		while (elm = elm.offsetParent)
			left += elm.offsetLeft;
	
		left -= window.pageXOffset;
	
		return left;
	};

	/**
	Finds the top offset in pixels of an element on the page
	@method GetTop
	@param {Object} elm The object to find its offset relative to the page
	@return Int The top offset of an object on the page
	*/
	this.GetTop = function(elm) {
		var top = elm.offsetTop;
		while (elm = elm.offsetParent)
			top += elm.offsetTop;
	
		top -= window.pageYOffset;
	
		return top;
	};
};

/**
<a href="$Event.html">Event</a> stack for the "window" object version of this function
@event onafterprint
@static
*/
$Window.onafterprint = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onbeforeprint
@static
*/
$Window.onbeforeprint = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onbeforeunload
@static
*/
$Window.onbeforeunload = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onerror
@static
*/
$Window.onerror = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onhaschange
@static
*/
$Window.onhaschange = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onload
@static
*/
$Window.onload = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmessage
@static
*/
$Window.onmessage = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onoffline
@static
*/
$Window.onoffline = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event ononline
@static
*/
$Window.ononline = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onpagehide
@static
*/
$Window.onpagehide = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onpageshow
@static
*/
$Window.onpageshow = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onpopstate
@static
*/
$Window.onpopstate = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onredo
@static
*/
$Window.onredo = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onresize
@param {Int} width The new width of the window
@param {Int} height The new height of the window
@static
*/
$Window.onresize = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onstorage
@static
*/
$Window.onstorage = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onunload
@static
*/
$Window.onunload = new $Event();


//----------------------------------
// The following is automatic to register the base event callbacks for $Window
//----------------------------------
window.onresize = function () { $Window.Fire([window.innerWidth, window.innerHeight]); };
window.onafterprint = function() { $Window.onafterprint.Fire(); };
window.onbeforeprint = function() { $Window.onbeforeprint.Fire(); };
window.onbeforeunload = function() { $Window.onbeforeunload.Fire(); };
window.onerror = function() { $Window.onerror.Fire(); };
window.onhaschange = function() { $Window.onhaschange.Fire(); };
window.onload = function() { $Window.onload.Fire(); };
window.onmessage = function() { $Window.onmessage.Fire(); };
window.onoffline = function() { $Window.onoffline.Fire(); };
window.ononline = function() { $Window.ononline.Fire(); };
window.onpagehide = function() { $Window.onpagehide.Fire(); };
window.onpageshow = function() { $Window.onpageshow.Fire(); };
window.onpopstate = function() { $Window.onpopstate.Fire(); };
window.onredo = function() { $Window.onredo.Fire(); };
window.onresize = function() { $Window.onresize.Fire(); };
window.onstorage = function() { $Window.onstorage.Fire(); };
window.onunload = function() { $Window.onunload.Fire(); };
/**
An extension to the main document object
@class $Document
*/
var $Document = function() { };

/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmousemove
@param {Int} x The current x position of the mouse after the update
@param {Int} y The current y position of the mouse after the update
@static
*/
$Document.onmousemove = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmousedown
@static
*/
$Document.onmousedown = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmouseup
@static
*/
$Document.onmouseup = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onkeydown
@param {Int} keycode The code of the key that was pressed
@static
*/
$Document.onkeydown = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onkeyup
@param {Int} keycode The code of the key that was released
@static
*/
$Document.onkeyup = new $Event();


//----------------------------------
// The following is automatic to register the base event callbacks for $Document
//----------------------------------
document.documentElement.onmousedown = function (e) { $Document.onmousedown.Fire(); };
document.documentElement.onmouseup = function (e) { $Document.onmouseup.Fire(); };

document.documentElement.onmousemove = function(e) {
	e = e || window.event;
	$Document.onmousemove.Fire([e.clientX, e.clientY]);
};

document.documentElement.onkeydown = function (e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	$Document.onkeydown.Fire([keycode]);
};

document.documentElement.onkeyup = function (e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	$Document.onkeyup.Fire([keycode]);
};
/**
A basic 2 dimensional vector
@class $Vector2
@param {Float} [x=0] The x dimension of the vector
@param {Float} [y=0] The y dimension of the vector
*/
$Vector2 = function(x, y) {
	/**
	The x dimension of this vector
	@property x
	@type Int
	*/
	this.x = x == null ? 0 : x;
	/**
	The y dimension of this vector
	@property y
	@type Int
	*/
	this.y = y == null ? 0 : y;
	
	/**
	Copys the x and y dimension of a $Vector2 to this one
	@method Set
	@param {$Vector2} vector The $Vector2 to have its x and y dimensions copied
	*/
	this.Set = function(x, y) {
		if (x != null)
			this.x = x;
		
		if (y != null)
			this.y = y;
	};
	
	/**
	Transposes this vector by another vector by shifting (adding)
	@method Move
	@param {$Vector2} vector The vector to be added to this vector
	*/
	this.Move = function(vector) {
		this.x += vec2.x;
		this.y += vec2.y;
	};
	
	/**
	Get's the magnitude (pythagorean theorem) of this vector (the length of the hypotenuse of the right triangle produced by this vector)
	@method Magnitude
	@return Float The length of the hypotenuse
	*/
	this.__defineGetter__("Magnitude", function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y))
	});
	
	/**
	Get's the dot product of this vector and another
	@method Dot
	@param {$Vector2} vector The vector to be multiplied with this vector
	@return Float The result of dot product (vector multiplication)
	*/
	this.Dot = function(vector) {
		return (this.x * vector.x) + (this.y * vector.y);
	};
	
	/**
	Get's the cross product of this vector and another
	Note: The cross product is often done with a 3 dimensional vector, so in this case it will actually return a scalar
	@method Cross
	@param {$Vector2} vector The vector to be multiplied with this vector
	@return Float The result of cross product (vector multiplication)
	*/
	this.Cross = function(vector) {
		return (this.x * vector.y) - (this.y * vector.x);
	};
	
	/**
	This will return a new normalized $Vector2 of this vector
	@method Normalized
	@return $Vector2 The normalized $Vector2
	*/
	this.__defineGetter__("Normalized", function() {
		var tmp = new $Vector2(this.x, this.y);
		
		var mag = this.Magnitude();
		tmp.x = tmp.x / mag;
		tmp.y = tmp.y / mag;
		
		return tmp;
	});
	
	/**
	Will get the distance between this vector and another supplied vector
	@method Distance
	@param {$Vector2} vector
	@return Float The distance between this $Vector2 and the supplied $Vector2
	*/
	this.Distance = function(vector) {
		return Math.sqrt(((vec2.x - this.x) * (vec2.x - this.x)) + ((this.y - vec2.y) * (this.y - vec2.y)));
	};
	
	/**
	Will subtract this vector from another vector
	@method Difference
	@param {$vector2} vector
	@return $Vector2 The result of this vector subtracted by a supplied vector (in that order)
	*/
	this.Difference = function(vector) {
		new $Vector2((this.x - vec2.x), (this.y - vec2.y));
	};
	
	/**
	Will add this vector from another vector
	@method Sum
	@param {$vector2} vector
	@return $Vector2 The result of this vector added by a supplied vector
	*/
	this.Sum = function(vector) {
		new $Vector2((this.x + vec2.x), (this.y + vec2.y));
	};
};
/**
A simple rectangle that can be used for placement, collision detection or even for debugging	
@class $Rectangle
@param {Int} x The x position for the rectangle
@param {Int} y The y position for the rectangle
@param {Int} w The width for the rectangle
@param {Int} h The height for the rectangle
@param {$Color} color The color for the debug draw of the rectangle
*/
$Rectangle = function(x, y, w, h, color) {
	/**
	The x position of the $Rectangle
	@property x
	@type Int
	*/
	this.x		= x == null ? 0 : x;
	/**
	The y position of the $Rectangle
	@property y
	@type Int
	*/
	this.y		= y == null ? 0 : y;
	/**
	The width of the $Rectangle
	@property width
	@type Int
	*/
	this.width	= w == null ? 0 : w;
	/**
	The height of the $Rectangle
	@property height
	@type Int
	*/
	this.height	= h == null ? 0 : h;
	/**
	The color of the $Rectangle to be used for debug drawing
	@property color
	@type $Color
	*/
	this.color = color == null ? new $Color() : color;
	
	/**
	Checks to see if a point in 2D space (x and y) are within this $Rectangle's bounds
	@method Contains
	@param {Int} x The x position to check if within this $Rectangle
	@param {Int} y The y position to check if within this $Rectangle
	@return Literal True if the x and y vector is within this rectangle
	*/
	this.Contains = function(x, y)
	{
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	};
	
	/**
	Check to see if this $Rectangle is intersecting another $Rectangle
	@method Intersects
	@param {$Rectangle} other The other rectangle to check against
	@param {$Vector2} [offset=null] The offset for this rectangle (usually a camera position)
	@return Literal True if intersection other rectangle
	*/
	this.Intersects = function(other, offset) {
		if (offset == null)
			offset = new $Vector2(0, 0);
		
		if (this.Contains(other.x + offset.x, other.y + offset.y) || this.Contains(other.x + other.width + offset.x, other.y + offset.y) ||
			this.Contains(other.x + offset.x, other.y + other.height + offset.y) || this.Contains(other.x + other.width + offset.x, other.y + other.height + offset.y))
		{
			return true;
		}
		else if (other.Contains(this.x, this.y) || other.Contains(this.x + this.width, this.y) ||
			other.Contains(this.x, this.y + this.height) || other.Contains(this.x + this.width, this.y + this.height))
		{
			return true;
		}
		
		console.log(offset);
		return false;
	};
	
	/**
	Debug draw the rectangle on the Canvas with the supplied color
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
	@method Draw
	@param {$Canvas} Canvas The Canvas to be drawn on
	*/
	this.Draw = function(Canvas)
	{
		Canvas.context.fillStyle = this.color.ToStandard();
		Canvas.context.fillRect(this.x, this.y, this.width, this.height);
	};
};
/**
A basic class to handle color (rgba) and its conversions for Canvas
@class $Color
@param {Int} [r=255] A red value between 0 and 255 (inclusive)
@param {Int} [g=255] A green value between 0 and 255 (inclusive)
@param {Int} [b=255] A blue value between 0 and 255 (inclusive)
@param {Float} [a=1.0] An alpha between 0.0 and 1.0 (inclusive)
*/
$Color = function(r, g, b, a) {
	/**
	The red of this color which is between 0 and 255 (inclusinve)
	@property r
	@type Int
	*/
	this.r = r == null ? 0 : 255;
	/**
	The green of this color which is between 0 and 255 (inclusinve)
	@property g
	@type Int
	*/
	this.g = g == null ? 0 : 255;
	/**
	The blue of this color which is between 0 and 255 (inclusinve)
	@property b
	@type Int
	*/
	this.b = b == null ? 0 : 255;
	/**
	The alpha of this color which is between 0.0 and 1.0 (inclusinve)
	@property a
	@type Float
	*/
	this.a = a == null ? 0 : 1.0;
	
	this.__defineGetter__("Standard", function() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	});
	
	/**
	Converts this color object to a Canvas readable color string "rgba(r,g,b,a)" or "rgb(r,g,b)"
	@method ToStandard
	@param {Bool} [noAlpha=true] Set to false if alpha should not be included "rgb(r,g,b)"
	@return String The Canvas readable color string
	*/
	this.ToStandard = function(noAlpha) {
		if (noAlpha == null || !noAlpha)
			return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
		else
			return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	};
};
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
	Fired when the mouse has changed position
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
/**
An object to manage a HTML5 <Canvas> element
@class $Canvas
@param elm {Object} The Canvas element on the page to reference
@param [widthPercent=null] {Float} The width scale factor of the Canvas (if null uses default width set in the Canvas tag)
@param [heightPercent=null] {Float} The height scale factor of the Canvas (if null uses default height set in the Canvas tag)
@constructor
*/
var $Canvas = function(elm, widthPercent, heightPercent) {
	if (elm === "undefined")
		throw "The Canvas id passed was not valid";
	
	/**
	This is the actual Canvas element in the document
	@property elm
	@protected
	*/
	this.elm				= elm;
	/**
	The context which is required to get anything showing up
	@property context
	*/
	this.context			= this.elm.getContext("2d");

	if (widthPercent != null)
		this.elm.width = document.body.clientWidth * widthPercent;

	if (heightPercent != null)
		this.elm.height = document.body.clientHeight * heightPercent;

	this.elm.style.width	= this.elm.width + "px";
	this.elm.style.height	= this.elm.height + "px";
	
	/**
	The current scale of the canvas on the x and y; 1 is default
	@property scale
	*/
	this.scale = new $Vector2(1, 1);
	/**
	The current width of the canvas (this works well with scaling)
	@property width
	*/
	this.width = this.elm.width;
	/**
	The current height of the canvas (this works well with scaling)
	@property height
	*/
	this.height = this.elm.height;
	
	/**
	Fires at the beginning this objects <a href="$Canvas.html#method_Draw">Draw</a> function before the <a href="$Canvas.html#event_Draw">drawing</a> event fires
	@event drawing
	@param {$Canvas} Canvas 
	*/
	this.updating			= new $Event();
	
	/**
	Fires whenever this objects <a href="$Canvas.html#method_Draw">Draw</a> function is called
	@event drawing
	@param {$Canvas} Canvas 
	*/
	this.drawing			= new $Event();
	
	/**
	Calls all of the events registered to <a href="$Canvas.html#event_drawing">drawing</a> event on this Canvas object
	@method Draw
	*/
	this.Draw = function() {
		this.updating.Fire();
		this.drawing.Fire([this]);
	};
	
	/**
	This will scale the canvas up without resizing the canvas. It only scales up everything that is being drawn (1, 1) is default (2, 2) would be 2x the size of default
	@method Scale
	@param {Int} x The scale for the x-axis
	@param {Int} y The scale for the y-axis
	*/
	this.Scale = function(x, y) {
		this.context.scale(x, y);
		
		this.width = this.width * (1 / x);
		this.height = this.height * (1 / y);
		
		this.scale.x = x;
		this.scale.y = y;
	};
};

var Canvas = null;
var requestId = 0;

/**
Registers the Canvas to be used for the main drawing
@method registerCanvas
@param {Object} elm The Canvas element to be used from the document
@param [widthPercent=null] {Float} The width scale factor of the Canvas (if null uses default width set in the Canvas tag)
@param [heightPercent=null] {Float} The height scale factor of the Canvas (if null uses default height set in the Canvas tag)
@return 
*/
function registerCanvas(elm, widthPercent, heightPercent) {
	if (Canvas != null)
		throw "Canvas already registered";
	
	Canvas = new $Canvas(elm, widthPercent, heightPercent);
	Canvas.drawing.Register(UpdateRequestId);
	
	Start();
}

//----------------------------------
// The following is automatic to register the HTML5 animation callback from the browser
//----------------------------------
(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAnimationFrame;
})();

function UpdateRequestId(context) {
	requestId = window.requestAnimationFrame(DrawCanvas);
}

function DrawCanvas() {
	Canvas.context.clearRect(0, 0, Canvas.elm.width, Canvas.elm.height);
	Canvas.Draw();
}

function Start() {
	if (Canvas == null)
		throw "You must first register a Canvas with the \"registerCanvas\" function";
	
	requestId = window.requestAnimationFrame(DrawCanvas);
}

function Stop() {
	if (requestId)
		window.cancelAnimationFrame(requestId);
	
	requestId = 0;
}
/**
The base class for all UI elements
@class $UI
@constructor
*/
var $UI = function() {
	/**
	Used to change how the object displays and acts. If false then events will not fire for this ui element
	@property enabled
	@protected
	*/
	this.enabled = true;
	
	/**
	The base rectangle for this UI element
	@property rect
	*/
	this.rect = null;
	
	/**
	Fires whenever this object is clicked (both mouse down and up must be over the element in succession)
	@event onClick
	*/
	this.onClick = new $Event();
	
	/**
	Fires when the mouse just goes over the ui element
	@event onMouseOver
	*/
	this.onMouseOver = new $Event();
	
	/**
	Fires when the mouse just leaves the ui element
	@event onMouseOut
	*/
	this.onMouseOut = new $Event();
	
	/**
	Fires when the mouse just leaves the ui element
	@event onEnable
	*/
	this.onEnable = new $Event();
	
	/**
	Fires when the mouse just leaves the ui element
	@event onDisable
	*/
	this.onDisable = new $Event();
	
	/**
	The cursor to use on hover of this ui element
	@property hoverPointer
	@default "auto"
	*/
	this.hoverPointer = "auto";
	
	/**
	@property clicking
	@private
	*/
	this.clicking = false;
	
	/**
	Makes this UI element behave as normal (events working)
	@method Enable
	*/
	this.Enable = function() {
		if (!this.enabled) {
			if (Canvas.elm.style.cursor == "auto") {
				if (this.ContainsMouse()) {
					Canvas.elm.style.cursor = this.hoverPointer;
				}
			}
			
			this.onEnable.Fire();
		}
		
		this.enabled = true;
	};
	
	/**
	Makes this UI element behave as if it wasn't there (events not working)
	@method Disable
	*/
	this.Disable = function() {
		if (this.enabled) {
			if (Canvas.elm.style.cursor != "auto") {
				if (this.ContainsMouse()) {
					Canvas.elm.style.cursor = "auto";
				}
			}
			
			this.onDisable.Fire();
		}
		
		this.enabled = false;
	};
	
	/**
	@method InputMouseDown
	@private
	*/
	this.InputMouseDown = function() {
		if (!this.enabled) {
			return;
		}
		
		if (!this.ContainsMouse()) {
			return;
		}
		
		this.clicking = true;
	};
	
	/**
	@method InputMouseUp
	@private
	*/
	this.InputMouseUp = function() {
		if (!this.enabled) {
			return;
		}
		
		if (!this.ContainsMouse()) {
			this.clicking = false;
			return;
		}
		
		if (this.clicking) {
			this.onClick.Fire();
		}
		
		this.clicking = false;
	};
	
	/**
	@property isHovering
	@private
	*/
	this.isHovering = false;
	
	/**
	@method MouseMoved
	@private
	*/
	this.MouseMoved = function(x, y) {
		if (!this.enabled) {
			return;
		}
		
		if (!this.ContainsMouse(x, y)) {
			if (this.isHovering) {
				this.isHovering = false;
				this.onMouseOut.Fire();
				if (this.hoverPointer != "auto") {
					Canvas.elm.style.cursor = "auto";
				}
			}
		} else {
			if (!this.isHovering) {
				this.isHovering = true;
				this.onMouseOver.Fire();
				if (this.hoverPointer != "auto") {
					Canvas.elm.style.cursor = this.hoverPointer;
				}
			}
		}
	};
	
	/**
	@method ContainsMouse
	@private
	*/
	this.ContainsMouse = function(x, y) {
		if (x == null || y == null)
			return this.rect.Contains(Input.mousePosition.x, Input.mousePosition.y);
		
		return this.rect.Contains(x, y);
	}
};

$UI.prototype.init = function(rect) {
	this.rect = rect;
	
	Input.mouseDown.Register(this.InputMouseDown, this);
	Input.mouseUp.Register(this.InputMouseUp, this);
	Input.mouseMove.Register(this.MouseMoved, this);
};
/**
A default image class that allows for easy drawing in the engine
@class $Image
@param {Image|String} src The native image object or string source of the image
@param {$Rectangle} rect The rectangle for the image to be drawn in
*/
var $Image = function(src, rect) {
	/**
	The actual native JavaScript Image object
	@property image
	*/
	this.image = new Image();
	/**
	The rectangle for the image to be drawn in
	@property rect
	*/
	this.rect = rect;
	
	if (src != null) {
		if (typeof imgSrc == "string")
			this.image.src = src;
		else
			this.image = src;
		
		if (this.rect == null) {
			this.rect.width = this.image.width;
			this.rect.height = this.image.height;
		}
	}
	
	/**
	Used to load in an image for this object
	@method Load
	@param {Image|String} src The native image object or string source of the image
	*/
	this.Load = function(src) {
		if (typeof imgSrc == "string")
			this.image.src = src;
		else
			this.image = src;
	};
	
	/**
	Set the position for this object's rectangle
	@method Position
	@param {Int} x The new x position for this object's rectangle
	@param {Int} y The new y position for this object's rectangle
	*/
	this.Position = function(x, y) {
		if (x != null) this.rect.x = x;
		if (y != null) this.rect.y = y;
	};
	
	/**
	Resize how large this image is drawn onto the canvas
	@method Resize
	@param {Int} width The new width for this image to be drawn as
	@param {Int} height The new height for this image to be drawn as
	*/
	this.Resize = function(width, height) {
		this.rect.width = width;
		this.rect.height = height;
	};
	
	/**
	Used to draw this image in a particular location on the canvas
	@method Draw
	@param {$Canvas} canvas The canvas object to draw this image on
	@param {Int} x The x position for this image to be drawn at
	@param {Int} y The y position for this image to be drawn at
	*/
	this.Draw = function(canvas, x, y) {
		canvas.context.drawImage(this.image, x, y, this.rect.width, this.rect.height);
	};
	
	/**
	Used to draw this image on the canvas
	Note: This is made to work with the canvas <a href="$Canvas.html#event_drawing">drawing</a> event
	@method SimpleDraw
	@param {$Canvas} canvas The canvas object to draw this image on
	*/
	this.SimpleDraw = function(canvas) {
		canvas.context.drawImage(this.image, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	};
};
/**
A helper class that allows to easily animate regular (same sized) sprite sheets
@class $SpriteSheet
@param {Int} width The width of each sprite in the sprite sheet
@param {Int} height The height of each sprite in the sprite sheet
@param {Int} row The column to start on for ths animation
@param {Int} column The column to start on for this animation
@param {Int} [limit=Infinite] The limited set of sprites to cycle through
@param {String|Image} imgSrc The image to be used for the spirte animation
@param {Int} fps The frames per second for this animation
@param {Int} columns How many total columns this animtation has
@param {Int} rows How many total rows this animation has
@constructor
*/
var $SpriteSheet = function(width, height, row, column, limit, imgSrc, fps, columns, rows)
{
	/**
	The frames per second for this animation
	@property fps
	@type Int
	*/
	this.fps = (fps == null || fps >= 33) ? 1 : 33 / fps;
	/**
	Used to count the elapsed time for frames
	@property fpsCounter
	@type Int
	@private
	*/
	this.fpsCounter = 0;
	/**
	The width of each sprite in the sprite sheet
	@property width
	@type Int
	*/
	this.width = width;
	/**
	The height of each sprite in the sprite sheet
	@property height
	@type Int
	*/
	this.height = height;
	/**
	The starting row on the spritesheet for the animation
	@property rowStart
	@type Int
	@private
	*/
	this.rowStart = row;
	/**
	The starting column on the spritesheet for the animation
	@property columnStart
	@type Int
	@private
	*/
	this.columnStart = column;
	/**
	The current row that the animation is on
	@property row
	@type Int
	@private
	*/
	this.row = row;
	/**
	The current column that the animation is on
	@property column
	@type Int
	@private
	*/
	this.column = column;
	/**
	The total count of rows for the animation
	@property rows
	@type Int
	@private
	*/
	this.rows = rows;
	/**
	The total amount of columns for the animation
	@property columns
	@type Int
	@private
	*/
	this.columns = columns;
	/**
	The amount of frames for this particular segment of the animation
	@property limit
	@type Int
	@private
	*/
	this.limit = (limit == null || limit == 0) ? 999999999999 : limit - 1;
	/**
	The current counter to check against the limit
	@property limitCount
	@type Int
	@private
	*/
	this.limitCount = 0;
	/**
	The position on the Canvas that this animation is at
	@property position
	@type $Vector2
	*/
	this.position = new $Vector2(0);
	/**
	The current cropping position for the image
	@property cropPosition
	@type $Vector2
	@private
	*/
	this.cropPosition = new $Vector2(0);
	/**
	The image to be used for the animation
	@property image
	@type Image
	@private
	*/
	this.image = new Image();
	if (typeof imgSrc == "string")
		this.image.src = imgSrc;
	else
		this.image = imgSrc;
	
	/**
	Sets the frame limit for the spritesheet animation
	@method SetLimit
	@param {Int} limit How many frames the spritesheet animation should be limited to
	*/
	this.SetLimit = function(limit) {
		this.limit = limit - 1;
	};
	
	/**
	Set the current and start row for the spritesheet animation
	@method SetRow
	@param {Int} num The row number to be assigned to
	*/
	this.SetRow = function(num) {
		this.row = num;
		this.rowStart = num;
		
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
	};
	
	/**
	Set the current and start column for the spritesheet animation
	@method SetColumn
	@param {Int} num The column number to be assigned to
	*/
	this.SetColumn = function(num) {
		this.column = num;
		this.columnStart = num;
		
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
	};
	
	/**
	This will draw the individual sprite on the Canvas
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
	@method Draw
	@param {$Canvas} Canvas The Canvas element to be drawn on
	*/
	this.Draw = function(Canvas) {
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
		
		if (this.columns == null || this.columns == 0)
			this.columns = this.image.width / this.width;
		if (this.rows == null || this.rows == 0)
			this.rows = this.image.height / this.height;
		
		if (this.fpsCounter == 0)
		{
			if (this.limitCount < this.limit)
			{
				this.limitCount++;
				this.column++;
				
				if (this.column >= this.columns)
				{
					this.row++;
					this.column = 0;
					
					if (this.row >= this.rows)
					{
						this.row = this.rowStart;
						this.column = this.columnStart;
						this.limitCount = 0;
					}
				}
			}
			else
			{
				this.column = this.columnStart
				this.row = this.rowStart;
				this.limitCount = 0;
			}
		}
		
		Canvas.context.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
		
		this.fpsCounter++;
		
		if (this.fpsCounter >= this.fps)
			this.fpsCounter = 0;
	};
};
/**
An object to manage a HTML5 Audio element
@class $Audio
@param elm {Audio|String} The audio clip to be managed or the string source of the audio clip
@constructor
*/
var $Audio = function(src) {
	/**
	How many times this audio clip should loop until it should stop
	@property loops
	@private
	*/
	this.loops = 0;
	
	if (typeof src == "string") {
		this.clip = new Audio();
		this.clip.src = src;
	} else
		this.clip = src;
	
	/**
	Determines if this audio clip is currently playing
	@method IsPlaying
	@return Literal True if the audio clip is currently playing
	*/
	this.__defineGetter__("IsPlaying", function() {
		return this.clip.ended;
	});
	
	/**
	Plays this audio clip. If looping it will play it for the remaining loop count
	@method Play
	*/
	this.Play = function() {
		this.clip.play();
	};
	
	/**
	Pauses this audio clip and allows to continue it from this point if played again
	@method Pause
	*/
	this.Pause = function() {
		this.clip.pause();
	};
	
	/**
	This sets the current time of the audio clip to allow "jumping"
	@method SetTime
	@param {Int} The time that the audio clip should start at
	*/
	this.SetTime = function(time) {
		this.clip.currentTime = time;
	};
	
	/**
	Sets the volume for this audio clip
	@method SetVolume
	*/
	this.SetVolume = function(volume) {
		if (volume > 1)
			this.clip.volume = volume * 0.01;
		else
			this.clip.volume = volume;
	};
	
	/**
	The function that is to be used as a callback only for when the audio clip has ended
	@method EndLoopDecrement
	@private
	*/
	this.EndLoopDecrement = function() {
		if (this.loops > 0)
			this.loops--;
		
		if (this.loops > 0)
			this.Play();
	};
	
	this.__defineSetter__("Loops", function(val) {
		this.SetLoopCount(val);
	});
	
	/**
	Sets how many times the audio clip should loop when playing. If 0 is passed then it will loop forever, if -1 is passed then it will turn looping off, otherwise loops the specified amount
	@method SetLoopCount
	@param {Int} The amount of times this audio clip should loop
	*/
	this.SetLoopCount = function(repeats) {
		if (repeats == 0)
			this.clip.loop = true;
		else if (repeats < 0) {
			this.clip.loop = false;
			this.loops = 0;
		}
		else
			this.loops = repeats;
	};
	
	/**
	Fired when the audio clip has finished
	@event ended
	*/
	this.ended = new $Event();
	this.ended.Register(this.EndLoopDecrement, this);
};

/* TODO:  Add overrides for these default audio events if needed
abort
canplay
canplaythroughdurationchange
emptied
ended
error
loadeddata
loadedmetadata
loadstart
pause
play
playing
progress
ratechange
seeked
seeking
stalled
suspend
timeupdate
volumechange
waiting
*/
/**
A normal button ui element for clicing and firing click events
@class $Button
@constructor
@extends $UI
*/
var $Button = function(rect, label, callback) {
	this.init(rect);
	
	/**
	The stroke width of the button border
	@property strokeWidth
	*/
	this.strokeWidth = 1;
	
	/**
	Overrides parent <a href="$UI.html#property_hoverPointer">hoverPointer</a>
	@property hoverPointer
	@default "pointer"
	*/
	this.hoverPointer = "pointer";
	
	if (label != null) {
		this.label = label;
		this.label.autoSize = true;
	}
	
	if (callback != null) {
		this.onClick.Register(callback);
	}
	
	/**
	Set the text for the label. This is mainly used to auto update the size (if this.label.<a href="$Label.html#property_autoSize">autoSize</a> is enabled)
	@method SetText
	*/
	this.SetText = function(text) {
		this.label.SetText(text);
		
		this.label.rect.x = this.rect.x + ((this.rect.width - this.label.rect.width) * 0.5);
		this.label.rect.y = this.rect.y + ((this.rect.height - this.label.rect.height) * 0.5);
	}
	
	if (label != null) {
		this.SetText(label.text);
	}
	
	/**
	Draw this button to the screen
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
	@method Draw
	@param {$Canvas} Canvas The Canvas to be drawn on
	*/
	this.Draw = function(canvas) {
		if (!this.enabled) {
			return;
		}
		
		this.label.Draw(canvas);
		if (this.strokeWidth > 0) {
			canvas.context.lineWidth = this.strokeWidth;
			canvas.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		}
	};

	//////////////////////////////
	//	Default button behavior	//
	//////////////////////////////
	this.HoverOverEffect = function() {
		this.strokeWidth = 2;
	};

	this.HoverOutEffect = function() {
		this.strokeWidth = 1;
	};
	
	this.onMouseOver.Register(this.HoverOverEffect, this);
	this.onMouseOut.Register(this.HoverOutEffect, this);
};

$Button.prototype = new $UI();
/**
A label to have text rendered to the screen
@class $Label
@constructor
@extends $UI
*/
var $Label = function(rect, text, textWrap, autoSize) {
	this.init(rect);
	
	/**
	The string message for this label to display
	@property text
	*/
	this.text = text;
	
	/**
	The size of font to be used in pixels
	@property fontSize
	*/
	this.fontSize = 20;
	
	/**
	The font to be used for the text (normal HTML5 strings)
	@property font
	*/
	this.font = "Arial, Helvetica, sans-serif";
	
	/**
	Sets the baseline for the text (normal HTML5 strings)
	@property textBaseline
	*/
	this.textBaseline = "top";
	
	/**
	Wrap the text within the rectangle (requires <a href="$Label.html#property_autoSize">autoSize</a> to be false)
	@property textWrap
	*/
	this.textWrap = textWrap != null ? textWrap : false;
	
	/**
	Auto resize the rectangle to fit to the text
	@property autoSize
	*/
	this.autoSize = autoSize != null ? autoSize : false;
	
	/**
	Temporary untested function for getting the height of a line of text
	@method LineHeight
	*/
	this.LineHeight = function() {
		return this.fontSize + 2;
	}
	
	/**
	Draw and wrap the text to this labels rectangle. Pulled this function (because I'm lazy) from:  <a href="http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/">http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/</a>
	@method WrapText
	*/
	this.WrapText = function(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' ');
		var line = '';

		for(var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		
		context.fillText(line, x, y);
	}
	
	/**
	Assign the text for this label and auto resize the rect if <a href="$Label.html#property_autoSize">autoSize</a> is true
	@method SetText
	*/
	this.SetText = function(text) {
		this.text = text;
		
		if (this.autoSize) {
			Canvas.context.font = this.fontSize + "px " + this.font;
			this.rect.width = Canvas.context.measureText(this.text).width;
			this.rect.height = this.LineHeight();
		}
	};
	
	if (text != null) {
		this.SetText(text);
	}
	
	/**
	Draw this label to the screen
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
	@method Draw
	@param {$Canvas} Canvas The Canvas to be drawn on
	*/
	this.Draw = function(canvas) {
		if (!this.enabled) {
			return;
		}
		
		canvas.context.textBaseline = this.textBaseline;
		canvas.context.font = this.fontSize + "px " + this.font;
		if (this.textWrap) {
			this.WrapText(canvas.context, this.text, this.rect.x, this.rect.y, this.rect.width, this.LineHeight());
		} else {
			canvas.context.fillText(this.text, this.rect.x, this.rect.y);
		}
	};
	
	/**
	@property stopTypeWriter
	@private
	*/
	this.stopTypeWriter = false;
	
	/**
	A cool effect to make it seem like the text is being typed out
	@method SetText
	@param {String} text The text that is to be written out
	@param {Int} speed The time in milliseconds between each letter appearing
	@param {Int} current The current index (char) of the string (just keep at 0)
	*/
	this.TypeWriter = function(text, speed, callback, current) {
		if (this.stopTypeWriter) {
			this.stopTypeWriter = false;
			this.SetText(text);
			callback();
			return;
		}
		
		this.SetText(text.substr(0, current));
	
		if (current++ == text.length) {
			if (callback != null) {
				callback();
			}
			
			return;
		}
		
		var that = this;
		this.typeWriterTimeout = setTimeout(function() { that.TypeWriter(text, speed, callback, current); }, speed);
	};
	
	/**
	Stop the current typewriter and just finish now
	@method SetText
	*/
	this.StopTypeWriter = function() {
		this.stopTypeWriter = true;
	}
};

$Label.prototype = new $UI();
