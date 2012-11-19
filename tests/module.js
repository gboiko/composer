module('Test module creation');

test("Direct Module define",function(){
    expect(1);
    var Test = Module('Testing',['jquery'],function($){
        ok(true,'Module created');
    });
    deepEqual(Test,Module.get_module('Testing'),'Module defined');
});

test("Alias 'define' Module defining",function(){
    expect(1);

    var Test = Module.define('Testing',['jquery'],function($){
        ok(true,'Module created');
    });
    deepEqual(Test,Module.get_module('Testing'),'Module defined');
});

test("Direct Module creating",function(){
    expect(2);

    var Test = Module('Testing',['jquery'],function($){
        deepEqual($,['jquery'],'Dependency passed');
        ok(true,'Module created');
    });
    Test();
});

test("Alias 'create' Module creating",function(){
    expect(2);

    var Test = Module.create('Testing',['jquery'],function($){
        deepEqual($,['jquery'],'Dependency passed');
        ok(true,'Module created');
    });
});

test("Create module with empty params", function () {
    throws(function(){ Module.create();},'empty params','Module not created');
});

test("Create module without dependency",function (){
    expect(2);

    Module.create("Testing",function(dependecy){
        deepEqual(dependecy,[],'Dependency empty');
        ok(true,'Module created');
    });
});

test("Create module without name and dependency",function (){
    expect(4);

    var Testing = Module.create(function(dependecy){
        deepEqual(dependecy,[],'Dependency empty');
        ok(true,'Module created');
    });

    Module.get_module('module_1')();
});

test("Create module without module function",function (){
    throws(function() { Module.create('Testing',['jquery']);},'empty module',
    'Error passed');
});


