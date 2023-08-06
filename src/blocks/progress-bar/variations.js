/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

let isProFeature = applyFilters('isProFeature', true);



/**
 * Template option choices for predefined columns layouts.
 */
const variations = [

    {
        name: 'layout-1',
        title: __('layout-1'),
        description: __('layout-1'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": { "Desktop": "flex" }, "justifyContent": { "Desktop": "space-between" }, "padding": { "Desktop": "10px 0px 10px 0px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "backgroundColor": { "Desktop": "#9DD6DF" }, "height": { "Desktop": "50px" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "backgroundColor": { "Desktop": "#18978F" }, "height": { "Desktop": "50px" }, "width": { "Desktop": "40%" } } }, progressCount: { "options": { "position": "afterLabel", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },


            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },


    {
        name: 'layout-2',
        title: __('layout-2'),
        description: __('layout-2'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": { "Desktop": "flex" }, "justifyContent": { "Desktop": "space-between" }, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "70%" } } }, progressCount: { "options": { "position": "afterLabel", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, progressLabel: { "options": { "tag": "div", "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": {}, "fontSize": {}, "order": { "Desktop": "10" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },



    {
        name: 'layout-3',
        title: __('layout-3'),
        description: __('layout-3'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": { "Desktop": "0px 100px 0px 0px" }, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "afterBar" }, "styles": { "display": { "Desktop": "flex" }, "justifyContent": { "Desktop": "space-between" }, "paddingTop": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "60%" } } }, progressCount: { "options": { "position": "afterLabel", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-4',
        title: __('layout-4'),
        description: __('layout-4'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "afterBar" }, "styles": { "display": { "Desktop": "flex" }, "justifyContent": { "Desktop": "space-between" }, "paddingTop": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "80%" } } }, progressCount: { "options": { "position": "afterLabel", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, progressLabel: { "options": { "tag": "div", "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": {}, "fontSize": {}, "order": { "Desktop": "10" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-5',
        title: __('layout-5'),
        description: __('layout-5'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": {}, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "50%" }, "paddingBottom": {} } }, progressCount: { "options": { "tag": "div", "position": "insideFill", "class": "" }, "styles": { "color": { "Desktop": "#ffffff" }, "fontSize": {}, "padding": { "Desktop": "10px 10px 10px 10px" }, "backgroundColor": {} } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-6',
        title: __('layout-6'),
        description: __('layout-6'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": {}, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "50%" }, "paddingBottom": {}, "position": { "Desktop": "relative" } } }, progressCount: { "options": { "tag": "div", "position": "insideFill", "class": "" }, "styles": { "color": { "Desktop": "#ffffff" }, "fontSize": {}, "padding": { "Desktop": "5px 8px 5px 8px" }, "backgroundColor": { "Desktop": "#A084CF" }, "position": { "Desktop": "absolute" }, "right": { "Desktop": "0px" }, "top": { "Desktop": "50%" }, "transform": { "Desktop": "translateY(-50%) " } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-7',
        title: __('layout-7'),
        description: __('layout-7'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": {}, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "75%" }, "paddingBottom": {}, "position": { "Desktop": "relative" } } }, progressCount: { "options": { "tag": "div", "position": "insideFill", "class": "" }, "styles": { "color": { "Desktop": "#ffffff" }, "fontSize": {}, "padding": { "Desktop": "4px 8px 4px 8px" }, "backgroundColor": { "Desktop": "#774360" }, "position": { "Desktop": "absolute" }, "right": { "Desktop": "-14px" }, "top": { "Desktop": "50%" }, "transform": { "Desktop": "translateY(-50%) " }, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-7',
        title: __('layout-7'),
        description: __('layout-7'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": {}, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "75%" }, "paddingBottom": {}, "position": { "Desktop": "relative" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressCount: { "options": { "tag": "div", "position": "insideFill", "class": "" }, "styles": { "color": { "Desktop": "#ffffff" }, "fontSize": {}, "padding": { "Desktop": "4px 8px 4px 8px" }, "backgroundColor": { "Desktop": "#774360" }, "position": { "Desktop": "absolute" }, "right": { "Desktop": "10px" }, "top": { "Desktop": "50%" }, "transform": { "Desktop": "translateY(-50%) " }, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-8',
        title: __('layout-8'),
        description: __('layout-8'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": {}, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "position": { "Desktop": "relative" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "75%" }, "paddingBottom": {}, "position": {}, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressCount: { "options": { "tag": "div", "position": "afterFill", "class": "" }, "styles": { "color": { "Desktop": "#ffffff" }, "fontSize": {}, "padding": { "Desktop": "4px 8px 4px 8px" }, "backgroundColor": { "Desktop": "#774360" }, "position": { "Desktop": "absolute" }, "right": { "Desktop": "10px" }, "top": { "Desktop": "50%" }, "transform": { "Desktop": "translateY(-50%) " }, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },

    {
        name: 'layout-9',
        title: __('layout-9'),
        description: __('layout-9'),

        isPro: false,
        //isPro: !isProFeature ? false : true,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "margin": {}, "paddingBottom": { "Desktop": "50px" } } }, progressData: { "type": "horizontal", "animate": "onVisible", "animateDuration": 1, "animateIteration": 2, "animateDelay": 2, "fill": 45, "unit": "%" }, progressInfo: { "options": { "tag": "div", "class": "", "position": "beforeBar" }, "styles": { "display": {}, "paddingBottom": { "Desktop": "10px" } } }, progressBar: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#9DD6DF" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "position": { "Desktop": "relative !important" } } }, progressFill: { "options": { "tag": "div", "class": "" }, "styles": { "color": {}, "fontSize": {}, "height": { "Desktop": "50px" }, "backgroundColor": { "Desktop": "#18978F" }, "width": { "Desktop": "75%" }, "paddingBottom": {}, "position": { "Desktop": "relative" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" } } }, progressCount: { "options": { "tag": "div", "position": "insideFill", "class": "" }, "styles": { "color": { "Desktop": "#ffffff" }, "fontSize": {}, "padding": { "Desktop": "4px 8px 4px 8px" }, "backgroundColor": { "Desktop": "#774360" }, "position": { "Desktop": "absolute" }, "right": {}, "top": { "Desktop": "50%" }, "transform": { "Desktop": "translateY(-50%) " }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "left": { "Desktop": "8px" } } }, progressLabel: { "options": { "text": "Digital Marketing", "position": "", "class": "" }, "styles": { "color": { "Desktop": "" }, "fontSize": { "Desktop": "" } } }, icon: { "options": { "library": "fontAwesome", "position": "beforeprogressCount", "srcType": "class", "iconSrc": "far fa-calendar-alt", "class": "number-count-icon" }, "styles": { "color": { "Desktop": "" }, "backgroundColor": { "Desktop": "" }, "fontSize": { "Desktop": "" } } },

            circleMask: {},
            circleOverlay: {},


            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect fill="#1d4ed8" x="41.67" y="13.33" width="76.67" height="23.34" /><rect fill="#1d4ed8" x="41.67" y="43.33" width="76.67" height="23.34" /></svg>
        ),

    },










];

export default variations;