/* global jQuery */
(function ($) {
     $.fn.captureMeOn.engines.alert = function(logObject) {
         var jsonString = JSON.stringify(logObject);
         alert(jsonString);
     }
})(jQuery);