Array.prototype.removeAt = function(position) {
	this.splice(position, 1);
}

Array.prototype.remove = function(arg) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == arg) {
			this.splice(i, 1);
			break;
		}
	}
}

Array.prototype.clear = function() {
	this.length = 0;
}

Array.prototype.insertAt = function(arg, position) {
	var arr1 = this.slice(0, position);
	var arr2 = this.slice(position);
	
	this.clear();
	
	for (var i = 0; i < arr1.length; i++)
		this.push(arr1[i]);
	
	this.push(arg);
	
	for (var j = 0; j < arr2.length; j++)
		this.push(arr2[j]);
}

Array.prototype.contains = function(arg) {
	for (var i = 0; i < this.length; i++)
		if (this[i] == arg)
			return true;
			
	return false;
}

Array.prototype.occurs = function(arg) {
	var counter = 0;
	
	for (var i = 0; i < this.length; i++) {
		if (this[i] == arg)
			counter++;
	}
	
	return counter;
}
