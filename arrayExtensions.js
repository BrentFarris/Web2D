/**
Extension methods to the base array class
@class Array
*/
{
	/**
	Removes a given element from an array given its index
	@method removeAt
	@param {Int} position The index of the element to be removed from the array
	@chainable
	*/
	Array.prototype.removeAt = function(position) {
		this.splice(position, 1);
		return this;
	}

	/**
	Removes an item from the array if the item's signatures match; Only removes the first found instance
	@method remove
	@param {Object} arg The object to be compared against and removed
	@chainable
	*/
	Array.prototype.remove = function(arg) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == arg) {
				this.splice(i, 1);
				break;
			}
		}
	
		return this;
	}

	/**
	Delete all the items from the array
	@method clear
	*/
	Array.prototype.clear = function() {
		this.length = 0;
	}

	/**
	Insert an Object into the array at a given position; this shifts the one at that current position to the next index
	@method insertAt
	@param {Object} arg The object to be inserted into the array at the supplied index
	@param {Int} position The position to insert the supplied object at in the array
	@chainable
	*/
	Array.prototype.insertAt = function(arg, position) {
		var arr1 = this.slice(0, position);
		var arr2 = this.slice(position);
	
		this.clear();
	
		for (var i = 0; i < arr1.length; i++)
			this.push(arr1[i]);
	
		this.push(arg);
	
		for (var j = 0; j < arr2.length; j++)
			this.push(arr2[j]);
	
		return this;
	}

	/**
	Determines if the supplied object is already in the array
	@method contains
	@param {Object} arg The object to compare against
	@return Literal Returns true if the object was found in the array
	*/
	Array.prototype.contains = function(arg) {
		for (var i = 0; i < this.length; i++)
			if (this[i] == arg)
				return true;
			
		return false;
	}

	/**
	THis counts how many times the object occurs in the array
	@method occurs
	@param {Object} arg The object to be compared against
	@return counter The amount of times the supplied object was found in the array
	*/
	Array.prototype.occurs = function(arg) {
		var counter = 0;
	
		for (var i = 0; i < this.length; i++) {
			if (this[i] == arg)
				counter++;
		}
	
		return counter;
	}
}
