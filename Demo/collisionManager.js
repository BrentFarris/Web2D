var Collision = null;

var CollisionManager = function() {
	if (Collision != null) return Collision;
	
	this.rectangles = new Array();
	
	this.Add = function(rect) {
		if (!this.rectangles.contains(rect)) {
			this.rectangles.push(rect);
		}
	};
	
	this.CheckCollision = function(otherParent, evt) {
		for (var i = 0; i < this.rectangles.length; i++) {
			// TODO:  Check only ones within range
			if (otherParent.rect.Intersects(this.rectangles[i])) {
				evt(otherParent, this.rectangles[i]);
			}
		}
	};
};

Collision = new CollisionManager();
