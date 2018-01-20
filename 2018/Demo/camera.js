var Camera = function() {
	this.position = new web2d.vec2();
	
	this.moved = new web2d.event();
	
	this.Move = function(x, y) {
		console.log("Camera moving");
		if (x != null && y != null) {
			this.position += x;
			this.position += y;
			this.moved.fire([x, y]);
		}
	};
};