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
