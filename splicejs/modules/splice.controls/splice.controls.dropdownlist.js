sjs.module({
type:'component'
,
required:[
	{ Inheritance : '/{sjshome}/modules/splice.inheritance.js'},
	{ Events			: '/{sjshome}/modules/splice.event.js'},
	{'SpliceJS.UI':'../splice.ui.js'},
	{'SpliceJS.Controls':'splice.controls.selectors.js'},
	{'SpliceJS.Controls':'splice.controls.listbox.js'},
	'splice.controls.dropdownlist.html'
]
,
definition:function(scope){
	"use strict";

	var sjs = scope.sjs
	,	imports = scope.imports
	;

	var
		Class = imports.Inheritance.Class
	,	Events = imports.Events
	, MulticastEvent = imports.Events.MulticastEvent
	,	UIControl = imports.SpliceJS.UI.UIControl
	;

		/**
	 * Drop down list
	 * */
	var DropDownListController = Class(function DropDownListController(args){
		this.base();

		Events.attach(this,{
			onDropDown : MulticastEvent,
			onListData : MulticastEvent,
			onDataItem : MulticastEvent
		});

		this.selectedItemPath = null;

	}).extend(UIControl);


	DropDownListController.prototype.onDataItemChanged = function(item){
		
	};

	DropDownListController.prototype.initialize = function(){
		this.onDataItem.subscribe(function(item){
			this.children.selector.close();
		},this);
	};



	/**
		Override onDataIn handler to avoid calling onDataOut event
		DropDownList calls onDataOut event explicitry when
		drop-down function is activated
	*/
	DropDownListController.prototype.onDataIn = function(item){
	};

	DropDownListController.prototype.dropDown = function(){
		if(this.dataItem) {
			this.onDataOut(this.dataItem);
		}
		this.onDropDown();
	};

	DropDownListController.prototype.setSelectedItem = function(item){
		this.children.selector.dataPath = this.selectedItemPath;
		this.children.selector.dataIn(item);
	};


	/* scope exports for component consumption*/
	scope.add(
		DropDownListController
	);

	/* module exports */
	scope.exports(
		DropDownListController
	);

}});
