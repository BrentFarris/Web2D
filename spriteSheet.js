var $SpriteSheet = function(width, height, row, column, limit, imgSrc, fps, columns, rows)
{
	if (fps == null || fps >= 33)
		this.fps = 1;
	else
		this.fps = 33 / fps;
	this.fpsCounter = 0;
	//this.frame = 0;
	this.width = width;
	this.height = height;
	this.rowStart = row;
	this.columnStart = column;
	this.row = row;
	this.column = column;
	this.rows = rows;
	this.columns = columns;
	if (limit == null || limit == 0)
		this.limit = 999999999999;
	else
		this.limit = limit - 1;
	this.limitCount = 0;
	this.image = new Image();
	this.image.src = imgSrc;
	this.position = new Vector2(0);
	this.cropPosition = new Vector2(0);
	
	this.SetLimit = function(limit)
	{
		this.limit = l - 1;
	};
	
	this.SetRow = function(num)
	{
		this.row = num;
		this.rowStart = num;
		
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
	};
	
	this.SetColumn = function(num)
	{
		this.column = num;
		this.columnStart = num;
		
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
	};
	
	this.Update = function()
	{
		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;
		
		if (this.columns == null || this.columns == 0)
			this.columns = this.image.width / this.width;
		if (this.rows == null || this.rows == 0)
			this.rows = this.image.height / this.height;
	};
	
	this.Draw = function(ctx)
	{
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
		
		ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
		
		this.fpsCounter++;
		
		if (this.fpsCounter >= this.fps)
			this.fpsCounter = 0;
	};
};
