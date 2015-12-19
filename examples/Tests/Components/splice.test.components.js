sjs({

required:[
  '{sjshome}/modules/splice.animation.js',
  '{sjshome}/modules/splice.network.js',
  '{sjshome}/modules/splice.document.js',
  '{sjshome}/modules/splice.data.js',
  '{sjshome}/modules/splice.text.js',
  {'SpliceJS.Ui':'{sjshome}/modules/splice.ui.js'},
  {'SpliceJS.Controls':'{sjshome}/modules/splice.controls.js'},
  'splice.test.components.css',
  'splice.test.components.html',
  'splice.test.components.templates.html'
],

definition:function(sjs){

  var Class = sjs.Class
  , Controller = sjs.Controller
  , Event = sjs.Event
  , event = sjs.event
  , scope = this.scope
  , exports = sjs.exports;

  var DataItem = scope.SpliceJS.Ui.DataItem;
  var ObservableDataItem = scope.SpliceJS.Ui.ObservableDataItem;

  var provinces = [
    'Ontario','British Columbia', 'Alberta', 'Quebec','New Brunswick',
    'Nova Scotia', 'Manitoba','Yukon','Nunavut','Northwest Territories',
    'Saskatchewan', 'Prince Edward Island','Newfoundland'
  ];


  var provinces2 = ObservableDataItem([
    {name:'Ontario', isChecked:false},
    {name:'Alberta', isChecked:true},
    {name:'British Columbia', isChecked:true, population:10000,
    office:{address:{street:'king'}}},
    {name:'Quebec', isChecked:true}
  ]).onChanged.subscribe(function(item,old){
    console.log("changed ");
    console.log(old);
    console.log(item.getValue());
  });


  var charts = [
    {plot:'Bar',name:'series1',data:[10,20,5,23]},
    {plot:'Line',name:'series1',data:[10,20,5,23]}
  ];

 var scatterChart = [
      {plot: 'Scatter',    name: 'series1', data: [[12,14], [16,12], [65,45], [165,50], [180,327], [190,365], [200,45]]},
      {plot: 'Scatter',    name: 'series2', data: [[13,14], [13,341], [65,122], [165,12], [32,56], [234,365], [123,45]]},
      {plot: 'ScatterLine',name:'line1',data:[[0,0],[250,370]]}
 ];

  var barchart = {

  };



  var ComponentsTest = Class(function ComponentsTest(){
    this.super();

    event(this).attach({
      onProvinces         : event.multicast,
      onChartsData        : event.multicast,
      onScatterChartData  : event.multicast,
      onTestCheck         : event.multicast
    });

    this.sourceTestCheck = {checked:true};

  }).extend(Controller);

  ComponentsTest.prototype.initialize = function(){
    this.onDisplay.subscribe(function(){
      this.onProvinces(provinces2);
      this.onChartsData(charts);
      this.onScatterChartData(scatterChart);
      this.onTestCheck(this.sourceTestCheck);
    }, this);

    // value read
    var v = sjs.propvalue(charts)('0.data.1').value;
    // value assign
    sjs.propvalue(charts)('0.data.1').value = v + 1;
    if( (v+1) == sjs.propvalue(charts)('0.data.1').value){
      console.log('Test pass: propvalue');
    }
    else {
      throw 'Test fail: propvalue';
    }
  };

  ComponentsTest.prototype.testCheck = function(item){
    console.log(item);
  },

  ComponentsTest.prototype.provincesSelection = function(provinces){
    console.log(provinces);
  },

  ComponentsTest.prototype.provinceSelected = function(item){
      console.log('Selected province is:' + item);
  }

  ComponentsTest.prototype.updateRecords = function(){
    this.onProvinces(provinces2);
  };


  var foo = function foo(obj, path) {
    var parts = path.split('.');
    var stmnt = 'return this';
    for(var i=0; i < parts.length; i++){
      stmnt+='[\''+parts[i]+'\']';
    }
    stmnt+=';';

    var fn = (new Function(stmnt)).bind(obj);
    return fn;
  };

  var DataItem = scope.SpliceJS.Ui.DataItem;
  var mtest = function mtest(){
    console.log('Testing DataItem memory allocation');
    var mb = window.performance.memory.usedJSHeapSize;
    console.log('before: ' + mb);
    var a = new DataItem({});
    window.__sjs_test__ = a;
    for(var i=0; i<1000000; i++){
      a.path(i);
    }
    var ma = window.performance.memory.usedJSHeapSize;
    console.log('after: ' + ma);
    var md = ma - mb;
    console.log('diff: ' + md);
    console.log('diff K: ' + md/1024);

  }

  var testDataItem = function testDataItem(){
    provinces2.append().setValue({name:'Prince Edward Island', isChecked:true});
  };


  //scope exports
  exports.scope(
    ComponentsTest
  );

  //module exports
  exports.module(
    ComponentsTest, foo, mtest,testDataItem
  );

}


});
