/**
Extension methods to the base array class
@class Array
*/
{
	/**
	Get the first object in this array
	@method head
	*/
	Array.prototype.head = function() {
		return this[0];
	}
	
	/**
	Get the last object in this array
	@method tail
	*/
	Array.prototype.tail = function() {
		return this[this.length - 1];
	}
	
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
	This counts how many times the object occurs in the array
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
	
	/**
	Iterate through the collection and pass each element in the collection through the supplied expression
	@method iterate
	@param {function} expression The Anonymous function that each element in the collection will be passed through
	@example myArray.iterate(function(elm) { elm.count++; });
	@chainable
	 */
	Array.prototype.iterate = function(expression) {
		for (var i = 0; i < this.length; i++) {
			expression(this[i]);
		}
		
		return this;
	}
	
	/**
	Iterate through the collection and pass each element in the collection through the supplied expression, whatever is returned from the expression is added to a collection that is then returned
	@method iterateExecute
	@param {function} expression The Anonymous function that each element in the collection will be passed through
	@param {bool} $includeNulls Include null objects in the returned collection
	@return {Array} The elements that passed the evaluation of the expression
	@example var names = myArray.IterateExecute(function(elm) { return elm.name; });
	@chainable
	 */
	Array.prototype.iterateExecute = function(expression, includeNulls) {
		var evaluatedCollection = [];
		for (var i = 0; i < this.length; i++) {
			if (includeNulls) {
				evaluatedCollection.push(expression(this[i]));
			} else {
				var tmp = expression(this[i]);

				if (!NULL(tmp)) {
					evaluatedCollection.push(tmp);
				}
			}
		}

		return evaluatedCollection;
	}
	
	/**
	Find all objects in the array that meet the expression
	@method where
	@param {function} expression The expression that is to be evaluated on each element in the collection
	@return {Array} The elements that passed the functions boolean return
	@example myArray.where(function(elm) { return elm.groupId == 1; });
	@chainable
	 */
	Array.prototype.where = function(expression) {
		var evaluatedCollection = [];
		
		for (var i = 0; i < this.length; i++) {
			if (expression(this[i])) {
				evaluatedCollection.push(this[i]);
			}
		}

		return evaluatedCollection;
	}
	
	/**
	Returns the first element in the collection that passes the expressions boolean check
	@method findFirst
	@param {function} expression The expression that is to be evaluated true/false
	@return Object|null The first object where the expression returned true or null if all returned false
	@example var first = myArray.first(function(elm) { return elm.firstName == "Brent"; });
	 */
	Array.prototype.findFirst = function(expression) {
		for (var i = 0; i < this.length; i++) {
			if (expression(this[i])) {
				return this[i];
			}
		}

		return null;
	}
	
	/**
	Returns the last element in the collection that passes the expressions boolean check
	@method findLast
	@param {function} expression The expression that is to be evaluated true/false
	@return Object|null The last object where the expression returned true or null if all returned false
	@example myArray.last(function(elm) { return elm.lastName == "Farris"; });
	 */
	Array.prototype.findLast = function(expression) {
		for (var i = this.length - 1; i >= 0; i--) {
			if (expression(this[i])) {
				return this[i];
			}
		}

		return null;
	}
}
