var Camera = function() {
	this.position = new $Vector2();
	
	this.moved = new $Event();
	
	this.Move = function(x, y) {
		if (x != null && y != null) {
			this.position += x;
			this.position += y;
			this.moved.Fire([x, y]);
		}
	};
};