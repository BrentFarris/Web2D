/**
An extension to the main window object
@class $Window
@constructor
*/
var $Window = function() {
	/**
	Finds the left offset in pixels of an element on the page
	@method GetLeft
	@param {Object} elm The object to find its offset relative to the page
	@return Int The left offset of an object on the page
	*/
	this.GetLeft = function(elm) {
		var left = elm.offsetLeft;
		while (elm = elm.offsetParent)
			left += elm.offsetLeft;
	
		left -= window.pageXOffset;
	
		return left;
	};

	/**
	Finds the top offset in pixels of an element on the page
	@method GetTop
	@param {Object} elm The object to find its offset relative to the page
	@return Int The top offset of an object on the page
	*/
	this.GetTop = function(elm) {
		var top = elm.offsetTop;
		while (elm = elm.offsetParent)
			top += elm.offsetTop;
	
		top -= window.pageYOffset;
	
		return top;
	};
};

/**
<a href="$Event.html">Event</a> stack for the "window" object version of this function
@event onafterprint
@static
*/
$Window.onafterprint = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onbeforeprint
@static
*/
$Window.onbeforeprint = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onbeforeunload
@static
*/
$Window.onbeforeunload = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onerror
@static
*/
$Window.onerror = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onhaschange
@static
*/
$Window.onhaschange = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onload
@static
*/
$Window.onload = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onmessage
@static
*/
$Window.onmessage = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onoffline
@static
*/
$Window.onoffline = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event ononline
@static
*/
$Window.ononline = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onpagehide
@static
*/
$Window.onpagehide = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onpageshow
@static
*/
$Window.onpageshow = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onpopstate
@static
*/
$Window.onpopstate = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onredo
@static
*/
$Window.onredo = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onresize
@param {Int} width The new width of the window
@param {Int} height The new height of the window
@static
*/
$Window.onresize = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onstorage
@static
*/
$Window.onstorage = new $Event();
/**
<a href="$Event.html">Event</a> for the "window" object version of this function
@event onunload
@static
*/
$Window.onunload = new $Event();


//----------------------------------
// The following is automatic to register the base event callbacks for $Window
//----------------------------------
window.onresize = function () { $Window.Fire([window.innerWidth, window.innerHeight]); };
window.onafterprint = function() { $Window.onafterprint.Fire(); };
window.onbeforeprint = function() { $Window.onbeforeprint.Fire(); };
window.onbeforeunload = function() { $Window.onbeforeunload.Fire(); };
window.onerror = function() { $Window.onerror.Fire(); };
window.onhaschange = function() { $Window.onhaschange.Fire(); };
window.onload = function() { $Window.onload.Fire(); };
window.onmessage = function() { $Window.onmessage.Fire(); };
window.onoffline = function() { $Window.onoffline.Fire(); };
window.ononline = function() { $Window.ononline.Fire(); };
window.onpagehide = function() { $Window.onpagehide.Fire(); };
window.onpageshow = function() { $Window.onpageshow.Fire(); };
window.onpopstate = function() { $Window.onpopstate.Fire(); };
window.onredo = function() { $Window.onredo.Fire(); };
window.onresize = function() { $Window.onresize.Fire(); };
window.onstorage = function() { $Window.onstorage.Fire(); };
window.onunload = function() { $Window.onunload.Fire(); };
