var web2d = {
	http: {
		xhr: function() {
			if (typeof XMLHttpRequest !== 'undefined') {
				return new XMLHttpRequest();
			}

			var versions = [
				"MSXML2.XmlHttp.6.0",
				"MSXML2.XmlHttp.5.0",
				"MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.3.0",
				"MSXML2.XmlHttp.2.0",
				"Microsoft.XmlHttp"
			];

			var xhr;
			for(var i = 0; i < versions.length; i++) {
				try {
					xhr = new ActiveXObject(versions[i]);
					break;
				} catch (e) { }
			}

			return xhr;
		},
		send: function(url, method, data) {
			var that = this;
			return new Promise(function(resolve, reject) {
				var x = that.xhr();
				x.open(method, url);
				x.onreadystatechange = function() {
					if (x.readyState == 4) {
						var data = x.responseText;
						try {
							data = JSON.parse(x.responseText);
						} catch (e) {
							// Skip and just use raw text
						}

						resolve(data);
					}
				};

				if (method == 'POST') {
					x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				}

				x.send(data)
			}, this);
		},
		request: function(url, data, type) {
			var query = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
				}
			}

			if (type == "GET") {
				if (url.indexOf("?") >= 0) {
					url += (query.length ? "&" + query.join("&") : "");
				} else {
					url += (query.length ? "?" + query.join("&") : "");
				}
			}

			return this.send(url, type, query.join('&'));
		},
		get: function(url, data) {
			return this.request(url, data, "GET");
		},
		post: function(url, data) {
			return this.request(url, data, "POST");
		},
		put: function(url, data) {
			return this.request(url, data, "PUT");
		},
		delete: function(url, data) {
			return this.request(url, data, "DELETE");
		}
	},
	each: function(arr, callback) {
		for (var key in arr) {
			if (!arr.hasOwnProperty(key)) {
				continue;
			}

			if (key == "length" && Object.prototype.toString.call(arr) === "[object HTMLCollection]") {
				continue;
			}

			if (callback(key, arr[key]) === false) {
				break;
			}
		}
    },
    getParam: function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    // [SECTION] Event
    /**
    The event class is responsible for registering multiple events to one function call much like C#'s "event" type
    @class web2d.event
    @constructor
    */
    event: function() {
        /**
        The list of events to be fired when "Fire" is called
        @property events
        @private
        */
        this.events = [];
        
        /**
        Registers events to this objects event array to be called
        @method Register
        @param {Function} evt The function to be called
        @param {Object} [obj=window] The object that the function belongs to
        */
        this.register = function(evt, obj) {
            this.events.push([evt, !obj ? window : obj]);
        };
        
        /**
        Removes a specified function signature from the array
        @method Remove
        @param {Function} event
        */
        this.remove = function(event) {
            for (var i = 0; i < this.events.length; i++) {
                if (this.events[i][0] === event) {
                    this.events.slice(i, 1);
                    break;
                }
            }
        };
        
        /**
        Goes through all of the registered events and fires them off
        @method Fire
        @param {Array} args All of the arguments to be mapped to the events (functions)
        */
        this.fire = function (args) {
            for (var i = 0; i < this.events.length; i++) {
                this.events[i][0].apply(this.events[i][1], args);
            }
        };
    },
    // [SECTION] Window
    /**
    An extension to the main window object
    @class web2d.window
    @constructor
    */
    window: {
        /**
        Finds the left offset in pixels of an element on the page
        @method GetLeft
        @param {Object} elm The object to find its offset relative to the page
        @return Int The left offset of an object on the page
        */
        getLeft: function(elm) {
            var left = elm.offsetLeft;
            while (elm = elm.offsetParent)
                left += elm.offsetLeft;
        
            left -= window.pageXOffset;
        
            return left;
        },
        /**
        Finds the top offset in pixels of an element on the page
        @method GetTop
        @param {Object} elm The object to find its offset relative to the page
        @return Int The top offset of an object on the page
        */
        getTop: function(elm) {
            var top = elm.offsetTop;
            while (elm = elm.offsetParent)
                top += elm.offsetTop;
        
            top -= window.pageYOffset;
        
            return top;
        }
    },
    // [SECTION] vec2 aka Vector2D or Vector2
    /**
    A basic 2 dimensional vector
    @class web2d.vec2
    @constructor
    @param {Number} [x=0] The x dimension of the vector
    @param {Number} [y=0] The y dimension of the vector
    */
    vec2: function(x, y) {
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
        Copys the x and y dimension of a web2d.vec2 to this one
        @method set
        @param {web2d.vec2} vector The web2d.vec2 to have its x and y dimensions copied
        */
        this.set = function(x, y) {
            if (x != null)
                this.x = x;
            
            if (y != null)
                this.y = y;
        };
        
        /**
        Transposes this vector by another vector by shifting (adding)
        @method move
        @param {web2d.vec2} vector The vector to be added to this vector
        */
        this.move = function(vector) {
            this.x += vec2.x;
            this.y += vec2.y;
        };
        
        /**
        Get's the magnitude (pythagorean theorem) of this vector (the length of the hypotenuse of the right triangle produced by this vector)
        @method magnitude
        @return {Number} The length of the hypotenuse
        */
        this.__defineGetter__("magnitude", function() {
            return Math.sqrt((this.x * this.x) + (this.y * this.y))
        });
        
        /**
        Get's the dot product of this vector and another
        @method dot
        @param {web2d.vec2} vector The vector to be multiplied with this vector
        @return {Number} The result of dot product (vector multiplication)
        */
        this.dot = function(vector) {
            return (this.x * vector.x) + (this.y * vector.y);
        };
        
        /**
        Get's the cross product of this vector and another
        Note: The cross product is often done with a 3 dimensional vector, so in this case it will actually return a scalar
        @method cross
        @param {web2d.vec2} vector The vector to be multiplied with this vector
        @return {Number} The result of cross product (vector multiplication)
        */
        this.cross = function(vector) {
            return (this.x * vector.y) - (this.y * vector.x);
        };
        
        /**
        This will return a new normalized web2d.vec2 of this vector
        @method normalized
        @return {web2d.vec2} The normalized web2d.vec2
        */
        this.__defineGetter__("normalized", function() {
            var tmp = new web2d.vec2(this.x, this.y);
            
            var mag = this.Magnitude();
            tmp.x = tmp.x / mag;
            tmp.y = tmp.y / mag;
            
            return tmp;
        });
        
        /**
        Will get the distance between this vector and another supplied vector
        @method distance
        @param {web2d.vec2} vector
        @return {Number} The distance between this web2d.vec2 and the supplied web2d.vec2
        */
        this.distance = function(vector) {
            return Math.sqrt(((vec2.x - this.x) * (vec2.x - this.x)) + ((this.y - vec2.y) * (this.y - vec2.y)));
        };
        
        /**
        Will subtract this vector from another vector
        @method difference
        @param {web2d.vec2} vector
        @return {web2d.vec2} The result of this vector subtracted by a supplied vector (in that order)
        */
        this.difference = function(vector) {
            new web2d.vec2((this.x - vec2.x), (this.y - vec2.y));
        };
        
        /**
        Will add this vector from another vector
        @method sum
        @param {web2d.vec2} vector
        @return {web2d.vec2} The result of this vector added by a supplied vector
        */
        this.sum = function(vector) {
            new web2d.vec2((this.x + vec2.x), (this.y + vec2.y));
        };
    },
    // [SECTION] Rectangle
    /**
    A simple rectangle that can be used for placement, collision detection or even for debugging	
    @class web2d.rectangle
    @constructor
    @param {Number} x The x position for the rectangle
    @param {Number} y The y position for the rectangle
    @param {Number} w The width for the rectangle
    @param {Number} h The height for the rectangle
    @param {$Color} color The color for the debug draw of the rectangle
    */
    rectangle: function(x, y, w, h, color) {
        /**
        The x position of the $Rectangle
        @property x
        @type Int
        */
        this.x		= !x ? 0 : x;

        /**
        The y position of the $Rectangle
        @property y
        @type Int
        */
        this.y		= !y ? 0 : y;

        /**
        The width of the $Rectangle
        @property width
        @type Int
        */
        this.width	= !w ? 0 : w;

        /**
        The height of the $Rectangle
        @property height
        @type Int
        */
        this.height	= !h ? 0 : h;

        /**
        The color of the $Rectangle to be used for debug drawing
        @property color
        @type $Color
        */
        this.color = !color ? new web2d.color() : color;
        
        /**
        Checks to see if a point in 2D space (x and y) are within this $Rectangle's bounds
        @method Contains
        @param {Number} x The x position to check if within this $Rectangle
        @param {Number} y The y position to check if within this $Rectangle
        @return Literal True if the x and y vector is within this rectangle
        */
        this.contains = function(x, y) {
            return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
        };
        
        /**
        Check to see if this $Rectangle is intersecting another $Rectangle
        @method Intersects
        @param {web2d.rectangle} other The other rectangle to check against
        @param {web2d.vec2} [offset=null] The offset for this rectangle (usually a camera position)
        @return Literal True if intersection other rectangle
        */
        this.intersects = function(other, offset) {
            if (offset == null)
                offset = new web2d.vec2(0, 0);
            
            if (this.contains(other.x + offset.x, other.y + offset.y) || this.contains(other.x + other.width + offset.x, other.y + offset.y) ||
                this.contains(other.x + offset.x, other.y + other.height + offset.y) || this.contains(other.x + other.width + offset.x, other.y + other.height + offset.y))
            {
                return true;
            }
            else if (other.contains(this.x, this.y) || other.contains(this.x + this.width, this.y) ||
                other.contains(this.x, this.y + this.height) || other.contains(this.x + this.width, this.y + this.height))
            {
                return true;
            }
            
            return false;
        };
        
        /**
        Debug draw the rectangle on the Canvas with the supplied color
        Note: This function is designed to work with the <a href="web2d.canvas.html#event_drawing">drawing</a> web2d.event object of the main Canvas object
        @method draw
        @param {web2d.canvas} Canvas The canvas to be drawn on
        */
        this.draw = function(canvas) {
            canvas.context.fillStyle = this.color.ToStandard();
            canvas.context.fillRect(this.x, this.y, this.width, this.height);
        };
    },
    // [SECTION] Color
    /**
    A basic class to handle color (rgba) and its conversions for Canvas
    @class web2d.color
    @constructor
    @param {Number} [r=255] A red value between 0 and 255 (inclusive)
    @param {Number} [g=255] A green value between 0 and 255 (inclusive)
    @param {Number} [b=255] A blue value between 0 and 255 (inclusive)
    @param {Number} [a=1.0] An alpha between 0.0 and 1.0 (inclusive)
    */
    color: function(r, g, b, a) {
        /**
        The red of this color which is between 0 and 255 (inclusinve)
        @property r
        @type Int
        */
        this.r = !r ? 255 : r;

        /**
        The green of this color which is between 0 and 255 (inclusinve)
        @property g
        @type Int
        */
        this.g = !g ? 255 : g;

        /**
        The blue of this color which is between 0 and 255 (inclusinve)
        @property b
        @type Int
        */
        this.b = !b ? 255 : b;

        /**
        The alpha of this color which is between 0.0 and 1.0 (inclusinve)
        @property a
        @type Float
        */
        this.a = !a ? 1.0 : a;
        
        this.__defineGetter__("standard", function() {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
        });
        
        /**
        Converts this color object to a Canvas readable color string "rgba(r,g,b,a)" or "rgb(r,g,b)"
        @method ToStandard
        @param {Bool} [noAlpha=true] Set to false if alpha should not be included "rgb(r,g,b)"
        @return String The Canvas readable color string
        */
        this.toStandard = function(noAlpha) {
            if (noAlpha == null || !noAlpha) {
                return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
            } else {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
            }
        };
    },
    // [SECTION] Input
    input: {
        keyString: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        keyNumberStrings: "0123456789",

        Left: false,
        Right: false,
        Up: false,
        Down: false,
        Enter: false,
        Space: false,
        Period: false,
        Comma: false,
        Slash: false,
        Backslash: false,
        Escape: false,
        Backspace: false,
        Shift: false,
        Capslock: false,
        Tab: false,
        Backquote: false,
        Ctrl: false,
        Alt: false,
        Add: false,
        Subtract: false,
        Divide: false,
        Multiply: false,
        Decimal: false,
        mouseIsDown: false,
        mousePosition: null,
        offset: null,
        clamp: null,

        keys: {
            Left: 37,
            Right: 38,
            Up: 39,
            Down: 40,
            Enter: 13,
            Space: 32,
            Period: 190,
            Comma: 188,
            Slash: 191,
            Backslash: 220,
            Escape: 27,
            Backspace: 8,
            Backspace: 46,
            Shift: 16,
            Capslock: 20,
            Tab: 9,
            Backquote: 192,
            Ctrl: 17,
            Alt: 18,
            Add: 107,
            Subtract: 109,
            Divide: 111,
            Multiply: 106,
            Decimal: 110
        },
        _inputMousePosition: function(x, y) {
            this.mousePosition.x = x - this.offset.x;
            this.mousePosition.y = y - this.offset.y;
            this.mouseMove.fire([this.mousePosition.x, this.mousePosition.y]);
        },
        _inputMouseDown: function() {
            this.mouseIsDown = true;
            this.mouseDown.fire();
        },
        _inputMouseUp: function() {
            this.mouseIsDown = false;
            this.mouseUp.fire();
        },
        _inputKeyDown: function(key) {
            if (this.setKeyDown(key)) {
                this.keyDown.fire([key]);
            }
        },
        _inputKeyUp: function(key) {
            if (this.setKeyUp(key)) {
                this.keyUp.fire([key]);
            }
        },

        /**
        Fired when a key has been pressed
        @event keyDown
        @param {Number} keycode The code of the key that was pressed
        */
        keyDown: null,

        /**
        Fired when a key has been released
        @event keyUp
        @param {Number} keycode The code of the key that was pressed
        */
        keyUp: null,

        /**
        Fired when the mouse button has been pressed
        @event mouseDown
        */
        mouseDown: null,

        /**
        Fired when the mouse button has been released
        @event mouseUp
        */
        mouseUp: null,

        /**
        Fired when the mouse has changed position
        @event mouseMove
        @param {Number} x The x position of the mouse after the update
        @param {Number} y The y position of the mouse after the update
        */
        mouseMove: null,

        setKeyDown: function(key) {
            for (var i = 0; i < this.keyString.length; i++) {
                if (key.keyCode === this.keys[this.keyString[i]]) {
                    if (this[this.keyString.charAt(i)]) {
                        return false;
                    }
                    
                    this[this.keyString.charAt(i)] = true;
                    return true;
                }
            }

            for (var i = 0; i < this.keyNumberStrings.length; i++) {
                if (key.keyCode === this.keys["Num" + this.keyNumberStrings[i]]) {
                    if (this["Num" + this.keyNumberStrings.charAt(i)])
                        return false;
                    
                    this["Num" + this.keyNumberStrings.charAt(i)] = true;
                    return true;
                }
            }
            
            for (var i = 0; i < this.keyNumberStrings.length; i++) {
                if (key.keyCode === this.keys["Numpad" + this.keyNumberStrings[i]]) {
                    if (this["Numpad" + this.keyNumberStrings.charAt(i)])
                        return false;
                        
                    this["Numpad" + this.keyNumberStrings.charAt(i)] = true;
                    return true;
                }
            }
            
            var startVal = false;
            if (key.keyCode == this.keys.Left) {
                startVal = this.Left;
                this.Left = true;
            } else if (key.keyCode == this.keys.Right) {
                startVal = this.Right;
                this.Right = true;
            } else if (key.keyCode == this.keys.Up) {
                startVal = this.Up;
                this.Up = true;
            } else if (key.keyCode == this.keys.Down) {
                startVal = this.Down;
                this.Down = true;
            } else if (key.keyCode == this.keys.Enter) {
                startVal = this.Enter;
                this.Enter = true;
            } else if (key.keyCode == this.keys.Space) {
                startVal = this.Space;
                this.Space = true;
            } else if (key.keyCode == this.keys.Period) {
                startVal = this.Period;
                this.Period = true;
            } else if (key.keyCode == this.keys.Comma) {
                startVal = this.Comma;
                this.Comma = true;
            } else if (key.keyCode == this.keys.Slash) {
                startVal = this.Slash;
                this.Slash = true;
            } else if (key.keyCode == this.keys.Backslash) {
                startVal = this.Backslash;
                this.Backslash = true;
            } else if (key.keyCode == this.keys.Escape) {
                startVal = this.Escape;
                this.Escape = true;
            } else if (key.keyCode == this.keys.Backspace) {
                startVal = this.Backspace;
                this.Backspace = true;
            } else if (key.keyCode == this.keys.Delete) {
                startVal = this.Delete;
                this.Delete = true;
            } else if (key.keyCode == this.keys.Shift) {
                startVal = this.Shift;
                this.Shift = true;
            } else if (key.keyCode == this.keys.Capslock) {
                startVal = this.Capslock;
                this.Capslock = true;
            } else if (key.keyCode == this.keys.Tab) {
                startVal = this.Tab;
                this.Tab = true;
            } else if (key.keyCode == this.keys.Backquote) {
                startVal = this.Backquote;
                this.Backquote = true;
            } else if (key.keyCode == this.keys.Ctrl) {
                startVal = this.Ctrl;
                this.Ctrl = true;
            } else if (key.keyCode == this.keys.Alt) {
                startVal = this.Alt;
                this.Alt = true;
            } else if (key.keyCode == this.keys.Add) {
                startVal = this.Add;
                this.Addtrue;
            } else if (key.keyCode == this.keys.Subtract) {
                startVal = this.Subtract;
                this.Subtract = true;
            } else if (key.keyCode == this.keys.Divide) {
                startVal = this.Divide;
                this.Divide = true;
            } else if (key.keyCode == this.keys.Multiply) {
                startVal = this.Multiply;
                this.Multiply = true;
            } else if (key.keyCode == this.keys.Decimal) {
                startVal = this.Decimal;
                this.Decimal = true;
            }
            
            return !startVal;
        },

        setKeyUp: function(key) {
            for (var i = 0; i < this.keyString.length; i++) {
                if (key.keyCode === this.keys[this.keyString[i]]) {
                    if (!this[this.keyString.charAt(i)])
                        return false;
                    
                    this[this.keyString.charAt(i)] = false;
                    return true;
                }
            }
            
            for (var i = 0; i < this.keyNumberStrings.length; i++) {
                if (key.keyCode === this.keys["Num" + this.keyNumberStrings[i]]) {
                    if (!this["Num" + this.keyNumberStrings.charAt(i)])
                        return false;
                    
                    this["Num" + this.keyNumberStrings.charAt(i)] = false;
                    return true;
                }
            }
            
            for (var i = 0; i < this.keyNumberStrings.length; i++) {
                if (key.keyCode === this.keys["Numpad" + this.keyNumberStrings[i]]) {
                    if (!this["Numpad" + this.keyNumberStrings.charAt(i)])
                        return false;
                        
                    this["Numpad" + this.keyNumberStrings.charAt(i)] = false;
                    return true;
                }
            }
            
            var startVal = false;
            if (key.keyCode == this.keys.Left) {
                startVal = this.Left;
                this.Left = false;
            } else if (key.keyCode == this.keys.Right) {
                startVal = this.Right;
                this.Right = false;
            } else if (key.keyCode == this.keys.Up) {
                startVal = this.Up;
                this.Up = false;
            } else if (key.keyCode == this.keys.Down) {
                startVal = this.Down;
                this.Down = false;
            } else if (key.keyCode == this.keys.Enter) {
                startVal = this.Enter;
                this.Enter = false;
            } else if (key.keyCode == this.keys.Space) {
                startVal = this.Space;
                this.Space = false;
            } else if (key.keyCode == this.keys.Period) {
                startVal = this.Period;
                this.Period = false;
            } else if (key.keyCode == this.keys.Comma) {
                startVal = this.Comma;
                this.Comma = false;
            } else if (key.keyCode == this.keys.Slash) {
                startVal = this.Slash;
                this.Slash = false;
            } else if (key.keyCode == this.keys.Backslash) {
                startVal = this.Backslash;
                this.Backslash = false;
            } else if (key.keyCode == this.keys.Escape) {
                startVal = this.Escape;
                this.Escape = false;
            } else if (key.keyCode == this.keys.Backspace) {
                startVal = this.Backspace;
                this.Backspace = false;
            } else if (key.keyCode == this.keys.Delete) {
                startVal = this.Delete;
                this.Delete = false;
            } else if (key.keyCode == this.keys.Shift) {
                startVal = this.Shift;
                this.Shift = false;
            } else if (key.keyCode == this.keys.Capslock) {
                startVal = this.Capslock;
                this.Capslock = false;
            } else if (key.keyCode == this.keys.Tab) {
                startVal = this.Tab;
                this.Tab = false;
            } else if (key.keyCode == this.keys.Backquote) {
                startVal = this.Backquote;
                this.Backquote = false;
            } else if (key.keyCode == this.keys.Ctrl) {
                startVal = this.Ctrl;
                this.Ctrl = false;
            } else if (key.keyCode == this.keys.Alt) {
                startVal = this.Alt;
                this.Alt = false;
            } else if (key.keyCode == this.keys.Add) {
                startVal = this.Add;
                this.Add = false;
            } else if (key.keyCode == this.keys.Subtract) {
                startVal = this.Subtract;
                this.Subtract = false;
            } else if (key.keyCode == this.keys.Divide) {
                startVal = this.Divide;
                this.Divide = false;
            } else if (key.keyCode == this.keys.Multiply) {
                startVal = this.Multiply;
                this.Multiply = false;
            } else if (key.keyCode == this.keys.Decimal) {
                startVal = this.Decimal;
                this.Decimal = false;
            }
            
            return startVal;
        },

        /**
        Checks to see if the passed keyname matches a key that is currently being held down
        @method isKeyDown
        @param {String} keyname The name of the key to check
        @return Literal True if the letter is currently held down
        */
        isKeyDown: function(keyname) {
            return this[keyname.toUpperCase()];
        },

        /**
        Checks to see if the passed keyname matches a key that is currently released
        @method isKeyUp
        @param {String} keyname The name of the key to check
        @return Literal True if the letter is currently released
        */
        isKeyUp: function(keyname) {
            return !this[keyname.toUpperCase()];
        },

        /**
        Checks to see if the mouse button is currently being held down
        @method isMouseDown
        @return Literal True if the mouse button is currently held down
        */
        isMouseDown: function() {
            return this.mouseIsDown;
        },

        /**
        Checks to see if the mouse button is currently released
        @method isMouseUp
        @return Literal True if the mouse button is currently released
        */
        isMouseUp: function() {
            return !this.mouseIsDown;
        }
    },
    // [SECTION] Canvas
    /**
    An object to manage a HTML5 <Canvas> element
    @class web2d.canvas
    @constructor
    @param elm {Object} The Canvas element on the page to reference
    @param [widthPercent=null] {Number} The width scale factor of the Canvas (if null uses default width set in the Canvas tag)
    @param [heightPercent=null] {Number} The height scale factor of the Canvas (if null uses default height set in the Canvas tag)
    */
    canvas: function(elm, widthPercent, heightPercent) {
        if (!elm) {
            throw "The Canvas id passed was not valid";
        }
        
        /**
        This is the actual Canvas element in the document
        @property elm
        @protected
        */
        this.elm = elm;

        /**
         * @property animationRequestId
         */
        this.animationRequestId = 0;

        /**
        The context which is required to get anything showing up
        @property context
        */
        this.context = this.elm.getContext("2d");
    
        if (widthPercent != null) {
            this.elm.width = document.body.clientWidth * widthPercent;
        }
    
        if (heightPercent != null) {
            this.elm.height = document.body.clientHeight * heightPercent;
        }
    
        this.elm.style.width	= this.elm.width + "px";
        this.elm.style.height	= this.elm.height + "px";
        
        /**
        The current scale of the canvas on the x and y; 1 is default
        @property scale
        */
        this.scale = new web2d.vec2(1, 1);

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
        @event updating
        @param {web2d.canvas} canvas 
        */
        this.updating = new web2d.event();
        
        /**
        Fires whenever this objects <a href="$Canvas.html#method_Draw">Draw</a> function is called
        @event drawing
        @param {web2d.canvas} canvas 
        */
        this.drawing = new web2d.event();
        
        /**
        Calls all of the events registered to <a href="$Canvas.html#event_drawing">drawing</a> event on this Canvas object
        @method draw
        */
        this.draw = function() {
            this.updating.fire();
            this.drawing.fire([this]);
        };
        
        /**
        This will scale the canvas up without resizing the canvas. It only scales up everything that is being drawn (1, 1) is default (2, 2) would be 2x the size of default
        @method scale
        @param {Number} x The scale for the x-axis
        @param {Number} y The scale for the y-axis
        */
        this.scale = function(x, y) {
            this.context.scale(x, y);
            
            this.width = this.width * (1 / x);
            this.height = this.height * (1 / y);
            
            this.scale.x = x;
            this.scale.y = y;
        };
    },
    canvasHelpers: {
        /**
         * @method updateRequestId
         * @param {web2d.canvas} canvas 
         */
        updateRequestId: function(canvas) {
            var that = this;
            canvas.animationRequestId = window.requestAnimationFrame(function() {
                canvas.context.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
                canvas.draw();
                that.updateRequestId(canvas);
            });
        },
        
        /**
         * @method start
         * @param {web2d.canvas} canvas 
         */
        start: function(canvas) {
            this.updateRequestId(canvas);
        },
        
        /**
         * @method stop
         * @param {web2d.canvas} canvas 
         */
        stop: function(canvas) {
            if (canvas.animationRequestId) {
                window.cancelAnimationFrame(canvas.animationRequestId);
                canvas.animationRequestId = 0;
            }
        }
    },
    // [SECTION] UI
    /**
    The base class for all UI elements
    @class web2d.ui
    @constructor
    @param {web2d.canvas} canvas This is the canvas element that this ui is bound to
    */
    ui: function(canvas) {
        /**
         * @property {web2d.canvas} canvas
         */
        this.canvas = canvas;

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
        this.onClick = new web2d.event();
        
        /**
        Fires when the mouse just goes over the ui element
        @event onMouseOver
        */
        this.onMouseOver = new web2d.event();
        
        /**
        Fires when the mouse just leaves the ui element
        @event onMouseOut
        */
        this.onMouseOut = new web2d.event();
        
        /**
        Fires when the mouse just leaves the ui element
        @event onEnable
        */
        this.onEnable = new web2d.event();
        
        /**
        Fires when the mouse just leaves the ui element
        @event onDisable
        */
        this.onDisable = new web2d.event();
        
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
        @method enable
        */
        this.enable = function() {
            if (!this.enabled) {
                if (this.canvas.elm.style.cursor == "auto") {
                    if (this.containsMouse()) {
                        this.canvas.elm.style.cursor = this.hoverPointer;
                    }
                }
                
                this.onEnable.fire();
            }
            
            this.enabled = true;
        };
        
        /**
        Makes this UI element behave as if it wasn't there (events not working)
        @method disable
        */
        this.disable = function() {
            if (this.enabled) {
                if (this.canvas.elm.style.cursor != "auto") {
                    if (this.containsMouse()) {
                        this.canvas.elm.style.cursor = "auto";
                    }
                }
                
                this.onDisable.fire();
            }
            
            this.enabled = false;
        };
        
        /**
        @method inputMouseDown
        @private
        */
        this.inputMouseDown = function() {
            if (!this.enabled) {
                return;
            }
            
            if (!this.containsMouse()) {
                return;
            }
            
            this.clicking = true;
        };
        
        /**
        @method inputMouseUp
        @private
        */
        this.inputMouseUp = function() {
            if (!this.enabled) {
                return;
            }
            
            if (!this.containsMouse()) {
                this.clicking = false;
                return;
            }
            
            if (this.clicking) {
                this.onClick.fire();
            }
            
            this.clicking = false;
        };
        
        /**
        @property isHovering
        @private
        */
        this.isHovering = false;
        
        /**
        @method mouseMoved
        @private
        */
        this.mouseMoved = function(x, y) {
            if (!this.enabled) {
                return;
            }
            
            if (!this.containsMouse(x, y)) {
                if (this.isHovering) {
                    this.isHovering = false;
                    this.onMouseOut.fire();
                    if (this.hoverPointer != "auto") {
                        this.canvas.elm.style.cursor = "auto";
                    }
                }
            } else {
                if (!this.isHovering) {
                    this.isHovering = true;
                    this.onMouseOver.fire();
                    if (this.hoverPointer != "auto") {
                        this.canvas.elm.style.cursor = this.hoverPointer;
                    }
                }
            }
        };
        
        /**
        @method containsMouse
        @private
        */
        this.containsMouse = function(x, y) {
            if (x == null || y == null) {
                return this.rect.contains(Input.mousePosition.x, Input.mousePosition.y);
            }
            
            return this.rect.contains(x, y);
        };

        this.init = function(rect) {
            this.rect = rect;
            
            web2d.input.mouseDown.Register(this.inputMouseDown, this);
            web2d.input.mouseUp.Register(this.inputMouseUp, this);
            web2d.input.mouseMove.Register(this.mouseMoved, this);
        };
    },
    // [SECTION] Image
    /**
    A default image class that allows for easy drawing in the engine
    @class web2d.image
    @constructor
    @param {Image|String} src The native image object or string source of the image
    @param {web2d.rectangle} rect The rectangle for the image to be drawn in
    */
    image: function(src, rect) {
        /**
        The actual native JavaScript Image object
        @property {Image} image
        */
        this.image = new Image();

        /**
        The rectangle for the image to be drawn in
        @property {web2d.rectangle} rect
        */
        this.rect = rect;
        
        if (src != null) {
            if (typeof src === "string") {
                this.image.src = src;
            } else {
                this.image = src;
            }
            
            if (this.rect == null) {
                this.rect.width = this.image.width;
                this.rect.height = this.image.height;
            }
        }
        
        /**
        Used to load in an image for this object
        @method load
        @param {Image|String} src The native image object or string source of the image
        */
        this.load = function(src) {
            if (typeof src === "string") {
                this.image.src = src;
            } else {
                this.image = src;
            }
        };
        
        /**
        Set the position for this object's rectangle
        @methodpPosition
        @param {Number} x The new x position for this object's rectangle
        @param {Number} y The new y position for this object's rectangle
        */
        this.position = function(x, y) {
            if (x != null) this.rect.x = x;
            if (y != null) this.rect.y = y;
        };
        
        /**
        Resize how large this image is drawn onto the canvas
        @method resize
        @param {Number} width The new width for this image to be drawn as
        @param {Number} height The new height for this image to be drawn as
        */
        this.resize = function(width, height) {
            this.rect.width = width;
            this.rect.height = height;
        };
        
        /**
        Used to draw this image in a particular location on the canvas
        @method draw
        @param {web2d.canvas} canvas The canvas object to draw this image on
        @param {Number} x The x position for this image to be drawn at
        @param {Number} y The y position for this image to be drawn at
        */
        this.draw = function(canvas, x, y) {
            canvas.context.drawImage(this.image, x, y, this.rect.width, this.rect.height);
        };
        
        /**
        Used to draw this image on the canvas
        Note: This is made to work with the canvas <a href="web2d.canvas.html#event_drawing">drawing</a> event
        @method simpleDraw
        @param {web2d.canvas} canvas The canvas object to draw this image on
        */
        this.simpleDraw = function(canvas) {
            canvas.context.drawImage(this.image, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        };
    },
    // [SECTION] Sprite sheet
    /**
    A helper class that allows to easily animate regular (same sized) sprite sheets
    @class spriteSheet
    @constructor
    @param {Object} data The json object with the frame data
    */
    spriteSheet: function(data) {
        /**
        The current sequence being played for this animation
        @property _sequence
        @type Object
        @private
        */
        this._sequence = null;

        /**
        The current frame in the sequence being shown
        @property _sequenceIndex
        @type Number
        @private
        */
        this._sequenceIndex = 0;

        /**
        The data for this spritesheet
        @property data
        @type Object
        */
        this.data = data;

        /**
        The frames per second for this animation
        @property fps
        @type Number
        */
        this.fps = data.animation.fps >= 33 ? 1 : 33 / data.animation.fps;

        /**
        Used to count the elapsed time for frames
        @property fpsCounter
        @type Number
        @private
        */
        this._fpsCounter = 0;

        /**
        The current cropping position for the image
        @property _cropRect
        @type web2d.rectangle
        @private
        */
        this._cropRect = new web2d.rectangle(0, 0, 0, 0);

        /**
        The image to be used for the animation
        @property image
        @type Image
        @private
        */
        this.image = new Image();
        this.image.src = data.image;

        /**
        Sets which sequence should currently be playing
        @method setSequence
        @param {Object} sequence The sequence to be played
        */
        this.setSequence = function(sequence) {
            this._sequence = sequence;
            this._sequenceIndex = 0;
            this._cropRect.width = this._sequence[this._sequenceIndex].w;
            this._cropRect.height = this._sequence[this._sequenceIndex].h;
            this._sequenceIndex = -1;

            this._updateCrop();
        };

        /**
        Updates the cropping for the current frame in the current sequence
        @method _updateCrop
        @private
        */
        this._updateCrop = function() {
            if (++this._sequenceIndex >= this._sequence.length) {
                this._sequenceIndex = 0;
            }

            this._cropRect.x = this._sequence[this._sequenceIndex].x;
            this._cropRect.y = this._sequence[this._sequenceIndex].y;
        };
        
        /**
        This will draw the individual sprite on the Canvas
        Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> web2d.event object of the main Canvas object
        @method draw
        @param {web2d.rectangle} drawRect The rectangle to draw the animation within
        @param {web2d.canvas} canvas The Canvas element to be drawn on
        */
        this.draw = function(drawRect, canvas) {
            canvas.context.drawImage(this.image, this._cropRect.x, this._cropRect.y, this._cropRect.width, this._cropRect.height, drawRect.x, drawRect.y, drawRect.width, drawRect.height);

            if (this._fpsCounter++ >= this.fps) {
                this._fpsCounter = 0;
                this._updateCrop();
            }
        };
    },
    // [SECTION] Audio
    /**
    An object to manage a HTML5 Audio element
    @class audio
    @constructor
    @param elm {Audio|String} The audio clip to be managed or the string source of the audio clip
    */
    audio: function(src) {
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
        @method isPlaying
        @return Literal True if the audio clip is currently playing
        */
        this.__defineGetter__("isPlaying", function() {
            return this.clip.ended;
        });
        
        /**
        Plays this audio clip. If looping it will play it for the remaining loop count
        @method play
        */
        this.play = function() {
            this.clip.play();
        };
        
        /**
        Pauses this audio clip and allows to continue it from this point if played again
        @method pause
        */
        this.pause = function() {
            this.clip.pause();
        };
        
        /**
        This sets the current time of the audio clip to allow "jumping"
        @method setTime
        @param {Number} The time that the audio clip should start at
        */
        this.setTime = function(time) {
            this.clip.currentTime = time;
        };
        
        /**
        Sets the volume for this audio clip
        @method setVolume
        */
        this.setVolume = function(volume) {
            if (volume > 1) {
                this.clip.volume = volume * 0.01;
            } else {
                this.clip.volume = volume;
            }
        };
        
        /**
        The function that is to be used as a callback only for when the audio clip has ended
        @method endLoopDecrement
        @private
        */
        this.endLoopDecrement = function() {
            if (this.loops > 0) {
                this.loops--;
            }
            
            if (this.loops > 0) {
                this.play();
            }
        };
        
        this.__defineSetter__("loops", function(val) {
            this.SetLoopCount(val);
        });
        
        /**
        Sets how many times the audio clip should loop when playing. If 0 is passed then it will loop forever, if -1 is passed then it will turn looping off, otherwise loops the specified amount
        @method setLoopCount
        @param {Number} The amount of times this audio clip should loop
        */
        this.setLoopCount = function(repeats) {
            if (repeats == 0) {
                this.clip.loop = true;
            } else if (repeats < 0) {
                this.clip.loop = false;
                this.loops = 0;
            } else {
                this.loops = repeats;
            }
        };
        
        /**
        Fired when the audio clip has finished
        @event ended
        */
        this.ended = new web2d.event();
        this.ended.register(this.endLoopDecrement, this);
    },
    // [SECTION] UI/Button
    /**
    A normal button ui element for clicing and firing click events
    @class web2d.button
    @constructor
    @extends web2d.ui
    */
    button: function(rect, label, callback) {
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
            this.onClick.register(callback);
        }
        
        /**
        Set the text for the label. This is mainly used to auto update the size (if this.label.<a href="$Label.html#property_autoSize">autoSize</a> is enabled)
        @method setText
        */
        this.setText = function(text) {
            this.label.setText(text);
            
            this.label.rect.x = this.rect.x + ((this.rect.width - this.label.rect.width) * 0.5);
            this.label.rect.y = this.rect.y + ((this.rect.height - this.label.rect.height) * 0.5);
        }
        
        if (label != null) {
            this.setText(label.text);
        }
        
        /**
        Draw this button to the screen
        Note: This function is designed to work with the <a href="web2d.canvas.html#event_drawing">drawing</a> web2d.event object of the main Canvas object
        @method Draw
        @param {web2d.canvas} canvas The Canvas to be drawn on
        */
        this.draw = function(canvas) {
            if (!this.enabled) {
                return;
            }
            
            this.label.draw(canvas);
            if (this.strokeWidth > 0) {
                canvas.context.lineWidth = this.strokeWidth;
                canvas.context.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
            }
        };
    
        //////////////////////////////
        //	Default button behavior	//
        //////////////////////////////
        this.hoverOverEffect = function() {
            this.strokeWidth = 2;
        };
    
        this.hoverOutEffect = function() {
            this.strokeWidth = 1;
        };
        
        this.onMouseOver.register(this.hoverOverEffect, this);
        this.onMouseOut.register(this.hoverOutEffect, this);
    },
    // [SECTION] UI/Label
    /**
    A label to have text rendered to the screen
    @class $Label
    @constructor
    @extends $UI
    */
    label: function(rect, text, textWrap, autoSize) {
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
        The color for the text to be drawn in
        @property color
        */
        this.color = new web2d.color(0, 0, 0);
        
        /**
        Temporary untested function for getting the height of a line of text
        @method lineHeight
        */
        this.lineHeight = function() {
            return this.fontSize + 2;
        }
        
        /**
        Draw and wrap the text to this labels rectangle. Pulled this function (because I'm lazy) from:  <a href="http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/">http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/</a>
        @method wrapText
        */
        this.wrapText = function(context, text, x, y, maxWidth, lineHeight) {
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
        @method setText
        */
        this.setText = function(text) {
            this.text = text;
            
            if (this.autoSize) {
                Canvas.context.font = this.fontSize + "px " + this.font;
                this.rect.width = Canvas.context.measureText(this.text).width;
                this.rect.height = this.lineHeight();
            }
        };
        
        if (text != null) {
            this.setText(text);
        }
        
        /**
        Draw this label to the screen
        Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main Canvas object
        @method draw
        @param {web2d.canvas} canvas The Canvas to be drawn on
        */
        this.draw = function(canvas) {
            if (!this.enabled) {
                return;
            }
            
            canvas.context.fillStyle = this.color.toStandard();
            canvas.context.textBaseline = this.textBaseline;
            canvas.context.font = this.fontSize + "px " + this.font;

            if (this.textWrap) {
                this.wrapText(canvas.context, this.text, this.rect.x, this.rect.y, this.rect.width, this.lineHeight());
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
        @method typeWriter
        @param {String} text The text that is to be written out
        @param {Number} speed The time in milliseconds between each letter appearing
        @param {Number} current The current index (char) of the string (just keep at 0)
        */
        this.typeWriter = function(text, speed, callback, current) {
            if (this.stopTypeWriter) {
                this.stopTypeWriter = false;
                this.setText(text);
                callback();
                return;
            }
            
            this.setText(text.substr(0, current));
        
            if (current++ == text.length) {
                if (callback != null) {
                    callback();
                }
                
                return;
            }
            
            var that = this;
            this.typeWriterTimeout = setTimeout(function() { that.typeWriter(text, speed, callback, current); }, speed);
        };
        
        /**
        Stop the current typewriter and just finish now
        @method stopTypeWriter
        */
        this.stopTypeWriter = function() {
            this.stopTypeWriter = true;
        }
    },
    net: {
        client: function() {
            this.socket = null;
            this.message = new web2d.Event();
            this.error = new web2d.Event();

            this.connect = function(host, port) {
                var that = this;
                return new Promise(function(resolve, reject) {
                    try {
                        that.socket = new WebSocket("ws://" + host + ":" + port + "/");
                    } catch (e) {
                        reject("Your browser currently doesn't support web sockets, please upgrade your browser to chat!");
                        return;
                    }

                    that.socket.onopen = function(event) {
                        resolve(event);
                    };

                    that.socket.onerror = function(event) {
                        that.error.fire([event]);
                    };

                    that.socket.onmessage = function(event) {
                        that.message.fire([event]);
                    };
                });
            };

            this.send = function(message) {
                if (!message.length) {
                    return;
                }

                try {
                    this.socket.send(JSON.stringify(json));
                } catch (e) {
                    this.close();
                }
            };

            this.close = function() {
                this.socket.close();
            };
        }
    },
    notification: function(title, message) {
        return new Promise(function (resolve, reject) {
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                reject("Not supported by browser");
                return;
            }

            var notification = null;
            if (Notification.permission === "granted") {
                notification = new Notification(message);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        notification = new Notification(message);
                    }
                });
            } else {
                reject("Access denied");
            }

            if (notification) {
                notification.onclick = function(event) {
                    resolve(event);
                };
            }
        });
    }
};

// [SECTION] Initialize web2d.input.keys
(function(){
    let tmp = 65;
    
	for (var i = 0; i < web2d.input.keyString.length; i++) {
        web2d.input.keys[web2d.input.keyString.charAt(i)] = tmp++;
        web2d.input[web2d.input.keyString.charAt(i)] = false;
	}
	
	tmp = 48;
	for (var i = 0; i < web2d.input.keyNumberStrings.length; i++) {
		web2d.input.keys["Num" + web2d.input.keyNumberStrings.charAt(i)] = tmp++;
        web2d.input["Num" + web2d.input.keyNumberStrings.charAt(i)] = false;
	}
	
	tmp = 96;
	for (var i = 0; i < web2d.input.keyNumberStrings.length; i++) {
		web2d.input.keys["Numpad" + web2d.input.keyNumberStrings.charAt(i)] = tmp++;
        web2d.input["Numpad" + web2d.input.keyNumberStrings.charAt(i)] = false;
	}
})();

// [SECTION] Initialize input values
(function(){
    web2d.input.mousePosition = new web2d.vec2(0);
    web2d.input.offset = new web2d.vec2(0);
    web2d.input.clamp = new web2d.vec2(0);
    web2d.input.keyDown = new web2d.event();
    web2d.input.keyUp = new web2d.event();
    web2d.input.mouseDown = new web2d.event();
    web2d.input.mouseUp = new web2d.event();
    web2d.input.mouseMove = new web2d.event();

    document.onmousemove = web2d.input._inputMousePosition.bind(web2d.input);
    document.onmousedown = web2d.input._inputMouseDown.bind(web2d.input);
    document.onmouseup = web2d.input._inputMouseUp.bind(web2d.input);
    document.onkeydown = web2d.input._inputKeyDown.bind(web2d.input);
    document.onkeyup = web2d.input._inputKeyUp.bind(web2d.input);
})();

// [SECTION] Default animation callbacks
//----------------------------------
// The following is automatic to register the HTML5 animation callback from the browser
//----------------------------------
(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAnimationFrame;
})();

// [SECTION] UI prototypes
(function(){
    web2d.button.prototype = new web2d.ui();
    web2d.label.prototype = new web2d.ui();
})();