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
	this.Set = function(vector) {
		if (vector == null)
			return;
		
		this.x = vector.x;
		this.y = vector.y;
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
	this.Magnitude = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y))
	};
	
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
	this.Normalized = function() {
		var tmp = new $Vector2(this.x, this.y);
		
		var mag = this.Magnitude();
		tmp.x = tmp.x / mag;
		tmp.y = tmp.y / mag;
		
		return tmp;
	};
	
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
A basic class to handle color (rgba) and its conversions for canvas
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
	
	/**
	Converts this color object to a canvas readable color string "rgba(r,g,b,a)" or "rgb(r,g,b)"
	@method ToStandard
	@param {Bool} [noAlpha=true] Set to false if alpha should not be included "rgb(r,g,b)"
	@return String The canvas readable color string
	*/
	this.ToStandard = function(noAlpha) {
		if (noAlpha == null || !noAlpha)
			return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
		else
			return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
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
	@return 
	*/
	this.Contains = function(x, y)
	{
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	};
	
	/**
	Check to see if this $Rectangle is intersecting another $Rectangle
	@method Intersects
	@param {$Rectangle} other The other rectangle to check against
	@return Literal True if intersection other rectangle
	*/
	this.Intersects = function(other) {
		var offset = 0;
		if (other.radius != null)
			offset = other.radius;
		
		if (this.Contains(other.x - offset, other.y - offset) || this.Contains(other.x + other.width - offset, other.y - offset) ||
			this.Contains(other.x - offset, other.y + other.height - offset) || this.Contains(other.x + other.width - offset, other.y + other.height - offset))
		{
			return true;
		}
		else if (other.Contains(this.x - offset, this.y - offset) || other.Contains(this.x + this.width - offset, this.y - offset) ||
			other.Contains(this.x - offset, this.y + this.height - offset) || other.Contains(this.x + this.width - offset, this.y + this.height - offset))
		{
			return true;
		}
		
		return false;
	};
	
	/**
	Debug draw the rectangle on the canvas with the supplied color
	Note: This function is designed to work with the <a href="$Canvas.html#event_drawing">drawing</a> $Event object of the main canvas object
	@method Draw
	@param {$Canvas} canvas The canvas to be drawn on
	*/
	this.Draw = function(canvas)
	{
		canvas.context.fillStyle = this.color.ToStandard();
		canvas.context.fillRect(this.x, this.y, this.width, this.height);
	};
};
