function GetLeft(elm)
{
	var left = elm.offsetLeft;
	while (elm = elm.offsetParent)
		left += elm.offsetLeft;
	
	left -= window.pageXOffset;
	
	return left;
}

function GetTop(elm)
{
	var top = elm.offsetTop;
	while (elm = elm.offsetParent)
		top += elm.offsetTop;
	
	top -= window.pageYOffset;
	
	return top;
}

$Vector2 = function(x, y)
{
	this.x = 0;
	this.y = 0;
	
	if (x != null && y == null)
	{
		this.x = x;
		this.y = x;
	}
	else
	{
		if (x != null)
			this.x = x;
		if (y != null)
			this.y = y;
	}
	
	this.previousX = 0;
	this.previousY = 0;
	
	this.Set = function(x, y)
	{
		if (x == null && y == null)
		{
			console.log("No 'x' or 'y' has been passed to Vector2's Set function");
		}
		else
		{
			this.previousX = this.x;
			this.previousY = this.y;
			
			if (x != null && y == null)
			{
				this.x = x;
				this.y = y;
			}
			else
			{
				if (x != null)
					this.x = x;
				
				if (y != null)
					this.y = y;
			}
		}
	};
	
	this.Move = function(vec2)
	{
		this.x += vec2.x;
		this.y += vec2.y;
	};
	
	this.Magnitude = function()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y))
	};
	
	this.Normalize = function()
	{
		var tmp = new $Vector2(this.x, this.y);
		
		var mag = this.Magnitude();
		tmp.x = tmp.x / mag;
		tmp.y = tmp.y / mag;
		
		return tmp;
	};
	
	this.Distance = function(vec2)
	{
		if (vec2 != null)
			return Math.sqrt(((vec2.x - this.x) * (vec2.x - this.x)) + ((this.y - vec2.y) * (this.y - vec2.y)));
		else
			return Math.sqrt(((this.previousX - this.x) * (this.previousX - this.x)) + ((this.previousY - this.y) * (this.previousY - this.y)));
	};
	
	this.HasChanged = function()
	{
		if (this.x != this.previousX || this.y != this.previousY)
			return true;
		
		return false;
	};
	
	this.Difference = function(vec2, invert)
	{
		var inv = 1;
		
		if (invert)
			inv = -1;
		
		if (vec2 == null)
			return new $Vector2((this.x - this.previousX) * inv, (this.y - this.previousY) * inv);
		else
			return new $Vector2((this.x - vec2.x) * inv, (this.y - vec2.y) * inv);
	};
};

$Color = function(r, g, b, a)
{
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 1;
	
	if (r != null)
		this.r = r;
	if (g != null)
		this.g = g;
	if (b != null)
		this.b = b;
	if (a != null)
		this.a = a;
	
	this.ToStandard = function(noAlpha)
	{
		if (noAlpha == null || !noAlpha)
			return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
		else
			return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	};
};

$Rectangle = function(x, y, w, h, color)
{
	if (x == null || y == null || w == null || h == null)
	{
		alert("You must pass in all the veriables for a rectange: (x, y, width, height)");
		
		var errorMsg = "The following are not provided:";
		if (x == null)
			errorMsg += " 'x' ";
		if (y == null)
			errorMsg += " 'y' ";
		if (w == null)
			errorMsg += " 'width' ";
		if (h == null)
			errorMsg += " 'height'";
		
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	this.x		= x;
	this.y		= y;
	this.width	= w;
	this.height	= h;
	
	if (color == null)
		this.color = new $Color();
	else
		this.color = color;
	
	this.Intersects = function(shape)
	{
		var offset = 0;
		if (shape.radius != null)
			offset = shape.radius;
		
		if (this.Contains(shape.x - offset, shape.y - offset) || this.Contains(shape.x + shape.width - offset, shape.y - offset) ||
			this.Contains(shape.x - offset, shape.y + shape.height - offset) || this.Contains(shape.x + shape.width - offset, shape.y + shape.height - offset))
		{
			return true;
		}
		else if (shape.Contains(this.x - offset, this.y - offset) || shape.Contains(this.x + this.width - offset, this.y - offset) ||
			shape.Contains(this.x - offset, this.y + this.height - offset) || shape.Contains(this.x + this.width - offset, this.y + this.height - offset))
		{
			return true;
		}
		
		return false;
	};
	
	this.Contains = function(x, y)
	{
		if (x >= this.x && x <= this.x + this.width &&
			y >= this.y && y <= this.y + this.height)
			return true;
		else 
			return false;
	};
	
	this.Draw = function(canvas)
	{
		canvas.context.fillStyle = this.color.ToStandard();
		canvas.context.fillRect(this.x, this.y, this.width, this.height);
	};
};
