var $UI = function() {
	this.rect = null;
	this.onClick = new $Event();
	this.onMouseOver = new $Event();
	this.onMouseOut = new $Event();
	
	this.clicking = false;
	this.InputMouseDown = function() {
		if (!this.ContainsMouse()) {
			return;
		}
		
		this.clicking = true;
	};
	
	this.InputMouseUp = function() {
		if (!this.ContainsMouse()) {
			return;
		}
		
		if (this.clicking) {
			this.onClick.Fire();
		}
		
		this.clicking = false;
	};
	
	this.isHovering = false;
	this.MouseMoved = function(x, y) {
		if (!this.ContainsMouse(x, y)) {
			if (this.isHovering) {
				this.isHovering = false;
				this.onMouseOut.Fire();
			}
		} else {
			if (!this.isHovering) {
				this.isHovering = true;
				this.onMouseOver.Fire();
			}
		}
	};
	
	this.ContainsMouse = function(x, y) {
		if (x == null || y == null)
			return this.rect.Contains(Input.mousePosition.x, Input.mousePosition.y);
		
		return this.rect.Contains(x, y);
	}
};

$UI.prototype.init = function(rect) {
	this.rect = rect;
	
	Input.mouseDown.Register(this.InputMouseDown, this);
	Input.mouseUp.Register(this.InputMouseUp, this);
	Input.mouseMove.Register(this.MouseMoved, this);
};
