/**
 * Accordion v3.3.4
 * Lightweight and accessible accordion module created in pure Javascript
 * https://github.com/michu2k/Accordion
 *
 * Copyright (c) Michał Strumpf
 * Published under MIT License
 */

(function (window) {
    'use strict';

    var uniqueId = 0;

    /**
     * Core
     * @param {string|HTMLElement} selectorOrElement = container in which the script will be initialized
     * @param {object} userOptions = options defined by user
     */
    var Accordion = function Accordion(selectorOrElement, userOptions) {
        var _this5 = this;
        var _this = this;
        var eventsAttached = false;

        // Break the array with the selectors
        if (Array.isArray(selectorOrElement)) {
            if (selectorOrElement.length) {
                return selectorOrElement.map(function (single) {
                    return new Accordion(single, userOptions);
                });
            }

            return false;
        }


        core.init();


    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Accordion;
    } else {
        window.Accordion = Accordion;
    }
})(window);
