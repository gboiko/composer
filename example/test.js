Module.create("Emitter",["Class","jquery"],function(){
    console.log(arguments)

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