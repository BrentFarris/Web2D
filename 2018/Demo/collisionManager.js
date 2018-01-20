var Collision = null;

var CollisionManager = function() {
	if (Collision != null) return Collision;
	
	this.rectangles = [];
	
	this.Add = function(rect) {
		if (this.rectangles.indexOf(rect) === -1) {
			this.rectangles.push(rect);
		}
	};
	
	this.CheckCollision = function(otherParent, evt) {
		for (var i = 0; i < this.rectangles.length; i++) {
			// TODO:  Check only ones within range
			if (otherParent.rect.intersects(this.rectangles[i])) {
				evt(otherParent, this.rectangles[i]);
			}
		}
	};
};

Collision = new CollisionManager();
