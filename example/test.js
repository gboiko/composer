App({
    name: 'Zevs',
    version: '1.0.0',
    build: '12.11.2012',
    namespace: 'Zevs',
    templates: {
        directory: '../templates/',
        extension: ['html','erb']
    },
    js: {
        directory: '../',
        extension: ['js','some_script']
    },
    style: {
        directory: '../style/css/',
        extension: ['css','less']
    }
});



var emmiter = Module.define("Emitter",["Class"],function(Class){


    var Test = Class("Test",{
        init: function () {
            console.log('test class inited');
            this.name = 'test';
        },
        get: function () {
            return this.name
        }
    });

    var Test1 = Class("Test1",Test,{
        init: function () {
            console.log('test1 class inited');
            this.name = 'test1';
        }
    });

    var test = new Test();
    var test1 = new Test1();


    return test;
    console.log(test.get());
    console.log(test1.get());

});

var Test2 = Class("Test2",{
    init: function () {
        console.log('test2 class inited');
        this.name = 'test2';
    },
    get: function () {
        return this.name
    }
});

var test2 = new Test2();

console.log(test2.get());