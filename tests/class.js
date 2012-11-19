module('Test class testing');

test('Test class creating',function(){
   expect(1);
   var Test = Class('Test',{
       init: function () {
           ok(true,'Class created')
       }
   });
   new Test();
});

test('Test class creating without name',function(){
    expect(1);
    Class({
        init: function () {
            ok(true,'Class created');
            return this;
        }
    });
    var Test = Class.get_class('class_1');
    new Test();
});

test('Test class extending',function (){
    expect(7);

    var Base = Class('Base',{
        init: function (name) {
            this.name = name;
            equal(name,'base_1','Arguments passed');
            ok(true,'Base class creating');
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
            equal(name,'sub_1','Arguments passed');
            ok(true,'Sub class creating');
        },
        get_name_twice: function () {
            this.name = 'sub_super';
            return this._super();
        }

    });

    var base = new Base('base_1'),
        sub = new Sub('sub_1');

    equal(base.get_name(),'base_1');
    equal(sub.get_name(),'sub_1');
    equal(sub.get_name_twice(),'sub_super_sub_super','Super passed');
});

test('Test class prototype',function(){
    expect(3);
    var Test = Class('Test',{
        init: function (name) {
            equal(name,'qw1','Arguments passed');
            this.name = name;
            ok(true,'Class created')
        },
        get_name: function () {
            return this.name;
        }
    });
    var test = new Test('qw1');
    equal(test.get_name(),'qw1',"Prototype ok");
});
