 var _LTracker = _LTracker || [];
    _LTracker.push({
        'logglyKey': 'TOKEN',
        'sendConsoleErrors' : true,
        'tag' : 'click-tracking' 
    });
    
/* global jQuery */
(function ($) {
     $.fn.captureMeOn.engines.loggly = function(logObject) {
        _LTracker.push(logObject);
     }
})(jQuery);