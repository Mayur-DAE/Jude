(function ($) {
    closePopup = function (id) {
        'use strict';
        $('#' + id).modal('hide');
    };
    openPopup = function (id) {
        'use strict';
        $('#' + id).modal('show');
    };
})(jQuery);