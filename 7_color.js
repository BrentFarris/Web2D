/**
A basic class to handle color (rgba) and its conversions for Canvas
@class $Color
@constructor
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
	this.r = NULL(r) ? 255 : r;
	/**
	The green of this color which is between 0 and 255 (inclusinve)
	@property g
	@type Int
	*/
	this.g = NULL(g) ? 255 : g;
	/**
	The blue of this color which is between 0 and 255 (inclusinve)
	@property b
	@type Int
	*/
	this.b = NULL(b) ? 255 : b;
	/**
	The alpha of this color which is between 0.0 and 1.0 (inclusinve)
	@property a
	@type Float
	*/
	this.a = NULL(a) ? 1.0 : a;
	
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
