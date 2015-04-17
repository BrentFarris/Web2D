function NULL(val) {
	return val == null || val == undefined;
}

/**
The base static timer
@class Time
*/
var Time = {
	/**
	The internal current date timestamp for this interval
	@property current
	@private
	*/
	current : null,
	
	/**
	The internal previous date timestamp for the last interval
	@property previous
	@private
	*/
	previous : null,
	
	/**
	The current time as a float in seconds
	@property time
	*/
	time : 0,
	
	/**
	The reference to the setInterval object
	@property update
	*/
	update : null
};

Time.update = window.setInterval(function() {
	if (NULL(Time.previous)) {
		Time.previous = new Date();
	}
	
	Time.current = new Date();
	Time.time += (new Date(Time.current - Time.previous).getMilliseconds()) * 0.001;
	Time.previous = Time.current;
}, 1);


function GET(url, success, error)
{
	var http;
	if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
	} else {
		http = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			success(http.responseText);
		} else {
			error(http);
		}
	}
	
	http.open("GET", url, true);
	http.send();
}

function LoadHTML(file, elm) {
	GET(file, function(html) {
		elm.innerHTML = html;
	});
}

function LoadJS(file) {
	var src = document.createElement('script');
	src.setAttribute("type", "text/javascript");
	src.setAttribute("src", file);
	document.getElementsByTagName("head")[0].appendChild(src);
}

function LoadCSS(file) {
	var src = document.createElement("link")
	src.setAttribute("rel", "stylesheet")
	src.setAttribute("type", "text/css")
	src.setAttribute("href", file);
	document.getElementsByTagName("head")[0].appendChild(src);
}

function GetParam(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
