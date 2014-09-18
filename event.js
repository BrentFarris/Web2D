/**
The event class is responsible for registering multiple events to one function call much like C#'s "event" type
@class $Event
@constructor
*/
var $Event = function(test) {
	/**
	The list of events to be fired when "Fire" is called
	@property events
	@private
	*/
	this.events = new Array();
	
	/**
	Registers events to this objects event array to be called
	@method Register
	@param {Function} evt The function to be called
	@param {Object} [obj=window] The object that the function belongs to
	*/
	this.Register = function(evt, obj) {
		this.events.push(new Array(evt, obj == null ? window : obj));
	};
	
	/**
	Removes a specified function signature from the array
	@method Remove
	@param {Function} event
	*/
	this.Remove = function(event) {
		for (var i = 0; i < this.events.length; i++) {
			if (this.events[i][0] == event) {
				this.events.removeAt(i);
				break;
			}
		}
	};
	
	/**
	Goes through all of the registered events and fires them off
	@method Fire
	@param {Array} args All of the arguments to be mapped to the events (functions)
	*/
	this.Fire = function (args) {
		for (var i = 0; i < this.events.length; i++)
			this.events[i][0].apply(this.events[i][1], args);
	};
};
