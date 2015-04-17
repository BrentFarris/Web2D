/**
An extension to the main document object
@class $Document
@constructor
*/
var $Document = function() { };

/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmousemove
@param {Int} x The current x position of the mouse after the update
@param {Int} y The current y position of the mouse after the update
@static
*/
$Document.onmousemove = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmousedown
@static
*/
$Document.onmousedown = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmouseup
@static
*/
$Document.onmouseup = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onkeydown
@param {Int} keycode The code of the key that was pressed
@static
*/
$Document.onkeydown = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onkeyup
@param {Int} keycode The code of the key that was released
@static
*/
$Document.onkeyup = new $Event();


//----------------------------------
// The following is automatic to register the base event callbacks for $Document
//----------------------------------
document.documentElement.onmousedown = function (e) { $Document.onmousedown.Fire(); };
document.documentElement.onmouseup = function (e) { $Document.onmouseup.Fire(); };

document.documentElement.onmousemove = function(e) {
	e = e || window.event;
	$Document.onmousemove.Fire([e.clientX, e.clientY]);
};

document.documentElement.onkeydown = function (e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	$Document.onkeydown.Fire([keycode]);
};

document.documentElement.onkeyup = function (e) {
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;

	$Document.onkeyup.Fire([keycode]);
};
