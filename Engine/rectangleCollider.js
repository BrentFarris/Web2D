var $RectangleCollider = function(x, y, width, height) {
	this.rectangle = new $Rectangle(x, y, width, height);
	
	this.Update = function(gameObject) {
		this.rectangle.x = gameObject.transform.position.x;
		this.rectangle.y = gameObject.transform.position.y;
	};
};