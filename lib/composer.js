(function(){

    var $ = this.$u;

    var Application = function () {
        var app = {};
        app.modules = {};
        app.classes = {};
        this.app = app;
        return app;
    }.call(this);

    var fntest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    var __Class = function (base,prop) {
        if (!prop) {
            prop = base;
            base = function () {};
        }

        function Class () {
            if (this.init) {
                this.init.apply(this, arguments);
            }
        }

        var ctor = function () {};
        ctor.prototype = base.prototype;
        ctor = new ctor();

        Class.prototype = ctor;
        for (var name in prop) {
            ctor[name] = typeof prop[name] == "function" &&
                typeof base[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = base[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }
        Class.prototype.constructor = Class;
        return Class;
    };

    var Class = function () {

        var index = 0;

        var classes = Application.classes;

        var get_next_name = function () {
            return "class_"+ ++index
        };

        var put_error = function (msg) {
            throw msg;
        };

        return function (name,base,klass) {
            if (!name && !base && !klass) put_error("empty params");
            if ($.isString(name)){
                if ($.isFunction(base)){
                    if (!$.isObject(klass)) {
                        put_error("empty klass");
                    }
                } else if ($.isObject(base)) {
                    klass = base;
                    base = [];
                } else {
                    put_error("missing params");
                }

            } else {
                if ($.isFunction(name) && $.isObject(base)){
                    klass = base;
                    base = name;
                    name = get_next_name();
                } else if ($.isObject(name)) {
                    klass = name;
                    base = [];
                    name = get_next_name();
                } else {
                    put_error("invalid params");
                }
            }
            var klass_obj = __Class(base,klass);
            classes[name] = klass_obj;
            return klass_obj;
        };
    };



    var Module = function () {

        var index = 0;

        var modules = Application.modules;

        var get_next_name = function () {
            return "module_"+ ++index
        };

        var put_error = function (msg) {
            throw msg;
        };

        var get_dependency = function (dependencies) {
            return dependencies;
        };

        return function (name,dependency,module) {
            if (!name && !dependency && !module) put_error("empty params");
            if ($.isString(name)){
                if ($.isArray(dependency)){
                    if (!$.isFunction(module)) {
                        put_error("empty module");
                    }
                } else if ($.isFunction(dependency)) {
                    module = dependency;
                    dependency = [];
                } else {
                    put_error("missing params");
                }

            } else {
                if ($.isArray(name) && $.isFunction(dependency)){
                    module = dependency;
                    dependency = name;
                    name = get_next_name();
                } else if ($.isFunction(name)) {
                    module = name;
                    dependency = [];
                    name = get_next_name();
                } else {
                    put_error("invalid params");
                }
            }
            var module_creator = function (dependency,module) {
                var extractor = function () {
                    return new module(dependency);
                };
                extractor['make'] = extractor;
                extractor['init'] = extractor;
                extractor['create'] = extractor;
                return extractor;
            }(get_dependency(dependency),module);
            modules[name] = module_creator;
            return module_creator;
        }
    };

    window.Module = Module();
    window.Class = Class();

}).call(this);