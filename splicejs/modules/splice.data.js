_.data = (function(){



	/*

		Iterator 

	*/




	/*

		Paginator

	*/

	var Paginator = function Paginator(data, pageSize){

		this.data = data;
	
		this.pageSize = pageSize;
		this.currentPage = 0;

	};



	Paginator.prototype = {

		hasNext : function(){
			/* compare next page idex to last element's index */
			if( (this.currentPage + 1) * this.pageSize > (this.data.length-1) ) return false;

			return true;
		}
		,
		next 	: function(){
			var subset = [];

			for(var i=0; i<this.pageSize; i++){

				var idx = this.currentPage * this.pageSize + i;
				if(idx > this.data.length-1) break;

				subset.push(this.data[idx]);
			}

			this.currentPage++;

			return subset;
		}  	 
	};


	function forEach(callback){
		
		// array iterator
		if(this instanceof Array){
			for(var i=0; i<this.length; i++){
				callback(this[i]);
			}
		}

		// property iterator
		if(this instanceof Object){
			var keys = Object.keys(this);
			for(var i=0; i<keys.length; i++){
				callback({
					property: keys[i],
					value:this[keys[i]]
				});
			}	
		}
		return data(this);
	};


	function groupBy(grouping, groupingFunction){
		var groupings = {};
		
		//array iterator
		if(this instanceof Array){
			for(var i=0; i<this.length; i++){
				
				var groupkey = typeof grouping === 'function' ? grouping(this[i],groupings) : null;
				if(!groupkey) groupkey = 'default';			

				var value = groupings[groupkey];
				if(!value) {
					if(typeof groupingFunction === 'function' && groupkey !== 'default') 
						groupings[groupkey] = null;
					else 
						groupings[groupkey] = [];
				}

				if(typeof groupingFunction === 'function' && groupkey !== 'default') {

					groupings[groupkey] = groupingFunction(this[i], groupings[groupkey]);

				} else {
					
					groupings[groupkey].push(this[i]);
				}
			}	
		
			return data(groupings);
		}


		//map iterator
		if(this instanceof Object){



			return data(groupings);
		}	


		return data(this);
		
	};


	function filter(condition){
		
		//array iterator
		if(this instanceof Array){
			var result = [];
			if(typeof condition !== 'function') return data(this);
			for(var i=0; i<this.length; i++){
				if(condition({key:i,value:this[i]}) === true) {
					result.push(this[i]);
				}
			}
			return data(result);
		}

		// map iterator
		if(this instanceof Object){
			result = {};
			var keys = Object.keys(this);

			if(!keys) 			return data(result);
			if(keys.length < 1) return data(result);

			for(var i=0; i<keys.length; i++){
				if(this.hasOwnProperty(keys[i]))
				if(condition({key:keys[i],value:this[keys[i]]}) === true)
					result[keys[i]] = this[keys[i]];
			}
			return data(result);
		}
	}


	function toArray(onitem){

		var result = [];

		var keys = Object.keys(this);
		if(!keys) return result;
		if(keys.length < 1) return result;
		
		for(var i=0; i<keys.length; i++){
			if(this.hasOwnProperty(keys[i])){
				var value = this[keys[i]];	
				if(typeof onitem === 'function')
					value = onitem({key:keys[i], value:value});
				
				if(!value) continue;
				result.push(value);
			}
		}
		return data(result);
	};




	function paginator(pageSize){
		return 
	};

	function windownator(windowSize, shiftSize){

	};


	function sort(){

	};

	function first(){
		if(! (this instanceof Array) ) return null;
		return this[0];
	};

	function data(dataObj){
		return {
			forEach		:function(callback){return forEach.call(dataObj,callback);},
			filter		:function(callback){return filter.call(dataObj,callback);},
			groupBy		:function(callback,gfn){return groupBy.call(dataObj,callback,gfn);},
			first		:function(callback){return first.call(dataObj)},
			toArray 	:function(callback){return toArray.call(dataObj,callback);},
			paginator 	:function(pageSize){return new Paginator(dataObj,pageSize);}, 	 
			result  :dataObj
		}
	};
	return data;
})();


