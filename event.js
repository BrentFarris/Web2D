var $Event = function() {
	this.events = new Array();
	this.Register = function(evt, obj) {
		this.events.push(new Array(evt, obj == null ? window : obj));
	}
	
	this.Remove = function(event) {
		this.events.remove(event);
	}
	
	this.Fire = function(args) {
		for (var i = 0; i < this.events.length; i++)
			this.events[i][0].apply(this.events[i][1], args);
	}
}
