/* global jQuery */
(function ($) {
    $.fn.captureMeOn = function (event, options) {
        var opts = $.extend({}, $.fn.captureMeOn.defaults, options);

        return this.each(function () {
            var $this = $(this);
            var logObj = {};

            var executeFunction = function (fnEvent) {
                //get all data elements
                var data = $this.data()
                for (var key in data) {
                    if ($.inArray(key, opts.dataExclude) === -1) {
                        logObj[key] = data[key];
                    }
                }
            
                //get all the "always includes"
                for (var key in opts.alwaysInclude) {
                    if (typeof opts.alwaysInclude[key] === 'function') {
                        logObj[key] = opts.alwaysInclude[key]();
                    } else {
                        logObj[key] = opts.alwaysInclude[key];
                    }
                }
            
                //get href, if applicable
                if (opts.includeHref && $this.prop('href')) {
                    logObj['href'] = $this.prop('href');
                }
            
                //finally, run the engine
                $.fn.captureMeOn.engines[opts.engine](logObj);
            };

            $this.on(event, executeFunction);
        });
    }

    $.fn.captureMeOn.defaults = {
        "engine": "console", //name of the engine to use.  Default is console.
        "dataExclude": ["bind"], //exclude all things using data-*, based on list.  data-bind is popular amongst knockout
        "alwaysInclude": {}, //key/value list of objects to always include.  If it needs to run at runtime, wrap in a function
        "includeHref": true
    }

    $.fn.captureMeOn.engines = {
        "console": function (jsonObject) {
            console.log(jsonObject);
        }
    }
})(jQuery)