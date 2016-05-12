/* global jQuery */
(function ($) {
    $.fn.captureMeOn = function (event, options) {
        var opts = $.extend({}, $.fn.captureMeOn.defaults, options);

        return this.each(function () {
            var $this = $(this);
            var logObj = {};
            var data = $this.data();
            
            var executeFunction = function (fnEvent) {
                for (var key in data) {
                    if (key !== "captureMeOn_ran" && $.inArray(key, opts.dataExclude) === -1) {
                        logObj[key] = data[key];
                    }
                }
            
                for (var key in opts.alwaysInclude) {
                    if (typeof opts.alwaysInclude[key] === 'function') {
                        logObj[key] = opts.alwaysInclude[key]();
                    } else {
                        logObj[key] = opts.alwaysInclude[key];
                    }
                }
            
                if (opts.includeHref && $this.prop('href')) {
                    logObj['href'] = $this.prop('href');
                }
            
                $.fn.captureMeOn.engines[opts.engine](logObj);
            };

            if(!data['captureMeOn_ran']) {
                $this.on(event, executeFunction);
                data['captureMeOn_ran'] = true;
            }
        });
    }

    $.fn.captureMeOn.defaults = {
        "engine": "console", //name of the engine to use.  Default is console.
        "dataExclude": ["bind"], //exclude all things using data-*, based on list.  data-bind is popular amongst knockout
        "alwaysInclude": {}, //key/value list of objects to always include.  If it needs to run at runtime, wrap in a function
        "includeHref": true,
        "alwaysBind": false, //if set to true, 
    }

    $.fn.captureMeOn.engines = {
        "console": function (jsonObject) {
            console.log(jsonObject);
        }
    }
})(jQuery);