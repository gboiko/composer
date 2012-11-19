#Composer
  Composer it's a simple js code snippets to structure code in Module and Class for convenient use, not more!

##Module
  Module is a global object, that responsable for like Module objects creation.
```js
Module("TestModule",["Class","jquery"],function(Class,$){
 //any code goes here    
})();
```
You can just create a module without name and dependency (in this case module will be assigned auto name):
```js
Module(function(){
 //any code goes here    
});

Module.get_name('module_1')();
```


Module have few helpers for more convenient use:

###Module.define(name,dependency,module)
Define module:
```js
Module.define("TestModule",["Class","jquery"],function(Class,$){
  //code goes here
});
```
Define and create module:
```js
Module.define("TestModule",["Class","jquery"],function(Class,$){
  //code goes here
})();
```
###Module.create(name,dependency,module)
Define and create module instantly:
```js
Module.create("TestModule",["Class","jquery"],function(Class,$){
  //code goes here
});
```
###Module.get_module(name)
Get module by name:
```js
Module.get_module("TestModule")();
```

##Class
  Class is a global object, that responsable for like Class objects creation.
```js
var TestClass = Class("TestClass",{
  init: function () {
    //contructor
  },
  get_name: function () {
    
  }
});
new TestClass();
```
Class supports js inheritance
```js
var Base = Class('Base',{
    init: function (name) {
        this.name = name;
        return this;
    },
    get_name: function () {
        return this.name;
    },
    get_name_twice: function () {
        return this.name+'_'+this.name;
    }
});

var Sub = Class('Sub',Base,{
    init: function (name) {
        this.name = name;
        return this;
    },
    get_name_twice: function () {
        this.name = 'sub_super';
        return this._super();
    }
});

var base = new Base('base_1'),
    sub = new Sub('sub_1');

base.get_name();
// base_1
sub.get_name();
// sub_1
sub.get_name_twice();
// sub_super_sub_super
```
Also Class have a helper get_class to get Class by name:
###Class.get_class(name)
Get class by name:
```js
var TestClass = Class.get_class("TestClass");
new TestClass();
```
