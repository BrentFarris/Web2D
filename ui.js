/**
The base class for all UI elements
@class $UI
@constructor
*/
var $UI = function() {
	/**
	The base rectangle for this UI element
	@property rect
	*/
	this.rect = null;
	
	/**
	Fires whenever this object is clicked (both mouse down and up must be over the element in succession)
	@event onClick
	*/
	this.onClick = new $Event();
	
	/**
	Fires when the mouse just goes over the ui element
	@event onMouseOver
	*/
	this.onMouseOver = new $Event();
	
	/**
	Fires when the mouse just leaves the ui element
	@event onMouseOut
	*/
	this.onMouseOut = new $Event();
	
	/**
	The cursor to use on hover of this ui element
	@property hoverPointer
	@default "auto"
	*/
	this.hoverPointer = "auto";
	
	/**
	@property clicking
	@private
	*/
	this.clicking = false;
	
	/**
	@method InputMouseDown
	@private
	*/
	this.InputMouseDown = function() {
		if (!this.ContainsMouse()) {
			return;
		}
		
		this.clicking = true;
	};
	
	/**
	@method InputMouseUp
	@private
	*/
	this.InputMouseUp = function() {
		if (!this.ContainsMouse()) {
			this.clicking = false;
			return;
		}
		
		if (this.clicking) {
			this.onClick.Fire();
		}
		
		this.clicking = false;
	};
	
	/**
	@property isHovering
	@private
	*/
	this.isHovering = false;
	
	/**
	@method MouseMoved
	@private
	*/
	this.MouseMoved = function(x, y) {
		if (!this.ContainsMouse(x, y)) {
			if (this.isHovering) {
				this.isHovering = false;
				this.onMouseOut.Fire();
				if (this.hoverPointer != "auto") {
					Canvas.elm.style.cursor = "auto";
				}
			}
		} else {
			if (!this.isHovering) {
				this.isHovering = true;
				this.onMouseOver.Fire();
				if (this.hoverPointer != "auto") {
					Canvas.elm.style.cursor = this.hoverPointer;
				}
			}
		}
	};
	
	/**
	@method ContainsMouse
	@private
	*/
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
