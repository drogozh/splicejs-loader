_.Module({

required:[
	'splice.controls.codeeditor.css',
	'splice.controls.codeeditor.htmlt'
],


definition:function(){

	var scope = this;

	var CodeEditor = _.Namespace('SpliceJS.Controls').Class(function CodeEditor(){

		var location  = this.file;
		
		var self = this;

		this.lines = [];


		_.HttpRequest.get({
			url:location,
			onok:function(result){ 
				self.displayCode(result.text);
			}
		});
	}).extend(SpliceJS.Controls.UIControl);



	CodeEditor.prototype.displayCode = function(code){

		//convert indentations to HTML
		this.lines = generateLines.call(this,code);

		for(var i=0; i< this.lines.length; i++){
			this.elements.controlContainer.appendChild(this.lines[i]);
		}
		
		this.applyCSSRules();
	};





	function applyTabulation(code, target){
		//count number of tabs or spaces
		var tabs = 0;		
		var c = code[0];

		while(c == ' ' || c == '\t'){
			c = code[tabs++];
		}

		var spaces = '';
		for(var i=0; i<tabs; i++){
			spaces += '\u00A0';
		}

		if(!spaces || spaces  == '') return;
		target.appendChild(document.createTextNode(spaces));
	}
	
	function generateLines(code){
		_.debugEnable();

		var lines = [];

		var classNames = ['even', 'odd' ];
		var lineNum = 0;

		var accumulator = '';
		for(var i=0; i<code.length; i++){
			var c = code[i++];
			while(c!='\n' && c) {
				accumulator = accumulator + c;
				c = code[i++];
			}
			
			var line = document.createElement('div');
			line.className = 'line ' + classNames[lineNum % 2];

			lineNum ++;


			if(this.lineNumbers) {
				var linen = document.createElement('div');
				linen.className="linenumber";
				linen.innerHTML = lineNum + '.';
				line.appendChild(linen);
			}


			applyTabulation(accumulator,line);

			line.appendChild(document.createTextNode(accumulator));
			lines.push(line);
			accumulator = '';
			i--;
		}
	


		return lines;
	}



}

});