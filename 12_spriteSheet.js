/**
A helper class that allows to easily animate regular (same sized) sprite sheets
@class $SpriteSheet
@constructor
@param {Int} width The width of each sprite in the sprite sheet
@param {Int} height The height of each sprite in the sprite sheet
@param {Int} row The column to start on for ths animation
@param {Int} column The column to start on for this animation
@param {Int} [limit=Infinite] The limited set of sprites to cycle through
@param {String|Image} imgSrc The image to be used for the spirte animation
@param {Int} fps The frames per second for this animation
@param {Int} columns How many total columns this animtation has
@param {Int} rows How many total rows this animation has
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
