/**
A simple rectangle that can be used for placement, collision detection or even for debugging	
@class $Rectangle
@constructor
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
