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
