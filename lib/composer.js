(function(){
    //Define standalone helpers

    /**
     * Utils objects;
     * @type {Object}
     */
    var $ = {};

    /**
     * alias for toSting function of object
     * @type {*}
     */
    var toString = Object.prototype.toString;

    /**
     * Helper regexp for checking name of function
     * @type {RegExp}
     */
    var fntest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    /**
     * check fn input is Function
     * @param fn
     * @return {Boolean}
     */
    $.isFunction = function (fn) {
        return toString.call(fn) === '[object Function]';
    };

    /**
     * check if arr is Array
     * @param arr
     * @return {Boolean}
     */
    $.isArray = function (arr) {
        return toString.call(arr) === '[object Array]';
    };

    /**
     * check if obj is Object
     * @param obj
     * @return {Boolean}
     */
    $.isObject = function (obj) {
        return toString.call(obj) === '[object Object]';
    };

    /**
     * check if str is String
     * @param str
     * @return {Boolean}
     */
    $.isString = function (str) {
        return toString.call(str) == '[object String]';
    };

    /**
     * create main application
     * @type {Function}
     * @return {Object}
     */
    var Application = function () {
        var app = {};
        app.modules = {};
        app.classes = {};
        this.app = app;
        return app;
    }.call(this);


    /**
     * Private function that creates new class based on input properties and
     * extend current class from base class
     * @param base
     * @param prop
     * @return {Function}
     * @private
     */
    var __Class = function (base,prop) {
        base = base.prototype;

        function Class () {
            if (this.init) {
                this.init.apply(this, arguments);
            }
        }

        var ctor = function () {};
        ctor.prototype = base;
        ctor = new ctor();

        Class.prototype = ctor;
        for (var name in prop) {
            ctor[name] = typeof prop[name] == "function" &&
                typeof base[name] == "function" && fntest.test(prop[name]) ?
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

    /**
     * Class creator
     * @return {Function}
     * @constructor
     */
    var Class = function () {

        /**
         * Index for non name classe
         * @type {Number}
         */
        var index = 0;

        /**
         * Link to application core classes object
         * @type {*}
         */
        var classes = Application.classes;

        /**
         * Returns next function name based on index value
         * @return {String}
         */
        var get_next_name = function () {
            return "class_"+ ++index
        };

        /**
         * Throws error with custom message
         * @param msg
         */
        //TODO: implement default error
        var put_error = function (msg) {
            throw msg;
        };

        /**
         * Parameter parser, parse intput parameters, checking what params are
         * availible, if something not availible, throws an error or define it
         * with default values
         * @param name
         * @param base
         * @param klass
         * @return {Array}
         */
        var parse_params = function (name,base,klass) {
            if (!name && !base && !klass) put_error("empty params");
            if ($.isString(name)){
                if ($.isFunction(base)){
                    if (!$.isObject(klass)) {
                        put_error("empty klass");
                    }
                } else if ($.isObject(base)) {
                    klass = base;
                    base = function () {};
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
                    base = function () {};
                    name = get_next_name();
                } else {
                    put_error("invalid params");
                }
            }
            return [name,base,klass];
        };

        /**
         * Creating class constructor on input params, stroing it to global
         * app core via link and returns class constructor
         * @param name
         * @param base
         * @param klass
         * @return {*}
         */
        var make_class = function (name,base,klass) {
            classes[name] = __Class(base,klass);
            return classes[name];
        };

        /**
         * Create class object, that contains class contructor.
         * @param name
         * @param base
         * @param klass
         * @return {*}
         */
        var class_obj = function (name,base,klass) {
            var _ref = parse_params(name,base,klass);
            name = _ref[0]; base = _ref[1]; klass = _ref[2];
            return make_class(name,base,klass)
        };

        /**
         * Extends class object, returns class constructor based on name
         * @param name
         * @return {*}
         */
        class_obj.get_class = function (name) {
            if (classes[name]) return classes[name];
            return false;
        };

        return class_obj;
    };



    var Module = function () {

        /**
         * Index for non name classe
         * @type {Number}
         */
        var index = 0;

        /**
         * Link to application core classes object
         * @type {*}
         */
        var modules = Application.modules;

        /**
         * Returns next function name based on index value
         * @return {String}
         */
        var get_next_name = function () {
            return "module_"+ ++index
        };

        /**
         * Throws error with custom message
         * @param msg
         */
        //TODO: implement default error
        var put_error = function (msg) {
            throw msg;
        };

        /**
         * Returns current class dependency
         * @param dependencies
         * @return {*}
         */
        //TODO: implement dependency feeder
        var get_dependency = function (dependencies) {
            return dependencies;
        };

        /**
         * Parameter parser, parse intput parameters, checking what params are
         * availible, if something not availible, throws an error or define it
         * with default values
         * @param name
         * @param dependency
         * @param module
         * @return {Array}
         */
        var parse_params = function (name,dependency,module) {
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
            return [name,dependency,module];
        };

        /**
         * Creating module based on input params, stroing it to global app core
         * @param dependency
         * @param module
         * @param name
         * @return {*}
         */
        var make_module = function (dependency,module,name) {
            modules[name] = function () {
                return new module(dependency);
            };
            return modules[name]
        };

        /**
         * Create module object
         * @param name
         * @param dependency
         * @param module
         * @return {*}
         */
        var module_object = function (name,dependency,module) {
            var _ref = parse_params(name,dependency,module);
            name = _ref[0]; dependency = _ref[1]; module = _ref[2];
            return make_module(get_dependency(dependency),module,name);
        };

        /**
         * Alias for eye catching use
         * @param name
         * @param dependency
         * @param module
         * @return {*}
         */
        module_object.define = function (name,dependency,module) {
            return this(name,dependency,module);
        };

        /**
         * Helper for auto module creating
         * @param name
         * @param dependency
         * @param module
         * @return {*}
         */
        module_object.create = function (name,dependency,module) {
            return this(name,dependency,module)();
        };

        /**
         * Helper that returns module based on name
         * @param name
         * @return {*}
         */
        module_object.get_module = function (name) {
            if (modules[name]) return modules[name];
            return false;
        };

        return module_object;
    };

    /**
     * Make Module a link in "this" object
     * @type {*}
     */
    this.Module = Module();

    /**
     * Make Class link in "this" object
     * @type {*}
     */
    this.Class = Class();

}).call(this);