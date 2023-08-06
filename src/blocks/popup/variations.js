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
        name: 'preset-1',
        title: __('preset-1'),
        description: __('preset-1'),

        isPro: false,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "backgroundColor": { "Desktop": "#9DD6DF" }, "position": { "Desktop": "fixed" }, "top": { "Desktop": "30px" }, "left": { "Desktop": "0px" }, "width": { "Desktop": "100% !important" }, "height": { "Desktop": "100% !important" }, "maxWidth": { "Desktop": "100% !important" }, "zIndex": { "Desktop": "99" }, "borderRadius": {}, "padding": { "Desktop": "20px 20px 20px 20px" } } },
            inner: { "options": { "tag": "div", "class": "" }, "styles": { "width": { "Desktop": "700px" }, "height": { "Desktop": "400px" }, "top": { "Desktop": "50%" }, "left": { "Desktop": "50%" }, "position": { "Desktop": "absolute" }, "transform": { "Desktop": "translateX(-50%) translateY(-50%) " }, "backgroundColor": { "Desktop": "#A084CF" }, "padding": { "Desktop": "15px 15px 15px 15px" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "overflow": {} } },
            closeWrap: { "options": { "tag": "span", "class": "", "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-times", "animation": "zoomOutLeft" }, "styles": { "backgroundColor": { "Desktop": "#ff6565" }, "padding": { "Desktop": "8px 15px 7px 15px" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "color": { "Desktop": "#ffffff" }, "right": { "Desktop": "-21px" }, "top": { "Desktop": "-21px" }, "position": { "Desktop": "absolute" }, "cursor": { "Desktop": "pointer" } }, "hover": { "backgroundColor": { "Desktop": "#a82b2b" } } },

            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        innerBlocks: [
            ['post-grid/text', {}],
        ],
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#bcbec0" x="16.02" y="29.98" width="302.52" height="201.47" rx="0.73" /><circle fill="#939598" cx="318.54" cy="29.98" r="25.44" /><path fill="#fff" d="M320.11,30l9.54-9.54a1.12,1.12,0,0,0,0-1.57,1.1,1.1,0,0,0-1.56,0l-9.55,9.55L309,18.87a1.1,1.1,0,0,0-1.56,0,1.12,1.12,0,0,0,0,1.57L317,30l-9.55,9.55a1.12,1.12,0,0,0,0,1.57,1.13,1.13,0,0,0,.78.32,1.1,1.1,0,0,0,.78-.32l9.55-9.55,9.55,9.55a1.11,1.11,0,1,0,1.56-1.57Z" /></svg>


        ),

    },


    {
        name: 'preset-2',
        title: __('preset-2'),
        description: __('preset-2'),
        isPro: false,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "backgroundColor": { "Desktop": "#9DD6DF" }, "position": { "Desktop": "fixed" }, "top": { "Desktop": "30px" }, "left": { "Desktop": "0px" }, "width": { "Desktop": "100% !important" }, "height": { "Desktop": "100% !important" }, "maxWidth": { "Desktop": "100% !important" }, "zIndex": { "Desktop": "99" }, "borderRadius": {}, "padding": { "Desktop": "20px 20px 20px 20px" } } },
            inner: { "options": { "tag": "div", "class": "" }, "styles": { "width": { "Desktop": "700px" }, "height": { "Desktop": "400px" }, "top": { "Desktop": "50%" }, "left": { "Desktop": "50%" }, "position": { "Desktop": "absolute" }, "transform": { "Desktop": "translateX(-50%) translateY(-50%) " }, "backgroundColor": { "Desktop": "#A084CF" }, "padding": { "Desktop": "15px 15px 15px 15px" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "overflow": {} } },
            closeWrap: { "options": { "tag": "span", "class": "", "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-times", "animation": "zoomOutLeft" }, "styles": { "backgroundColor": { "Desktop": "#ff6565" }, "padding": { "Desktop": "8px 15px 7px 15px" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "color": { "Desktop": "#ffffff" }, "left": { "Desktop": "-21px" }, "top": { "Desktop": "-21px" }, "position": { "Desktop": "absolute" }, "cursor": { "Desktop": "pointer" } }, "hover": { "backgroundColor": { "Desktop": "#a82b2b" } } },
            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        innerBlocks: [
            ['post-grid/text', {}],
        ],
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#bcbec0" x="41.46" y="29.98" width="302.52" height="201.47" rx="0.73" /><circle fill="#939598" cx="41.46" cy="29.98" r="25.44" /><path fill="#fff" d="M43,30l9.55-9.54a1.12,1.12,0,0,0,0-1.57,1.1,1.1,0,0,0-1.56,0l-9.55,9.55-9.55-9.55a1.1,1.1,0,0,0-1.56,0,1.12,1.12,0,0,0,0,1.57L39.89,30l-9.54,9.55a1.11,1.11,0,0,0,1.56,1.57l9.55-9.55L51,41.1a1.1,1.1,0,0,0,.78.32,1.13,1.13,0,0,0,.78-.32,1.12,1.12,0,0,0,0-1.57Z" /></svg>
        ),
    },


    {
        name: 'preset-3',
        title: __('preset-3'),
        description: __('preset-3'),
        isPro: false,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "backgroundColor": { "Desktop": "#9DD6DF" }, "position": { "Desktop": "fixed" }, "top": { "Desktop": "30px" }, "left": { "Desktop": "0px" }, "width": { "Desktop": "100% !important" }, "height": { "Desktop": "100% !important" }, "maxWidth": { "Desktop": "100% !important" }, "zIndex": { "Desktop": "99" }, "borderRadius": {}, "padding": { "Desktop": "20px 20px 20px 20px" } } },
            inner: { "options": { "tag": "div", "class": "" }, "styles": { "width": { "Desktop": "700px" }, "height": { "Desktop": "400px" }, "top": { "Desktop": "50%" }, "left": { "Desktop": "50%" }, "position": { "Desktop": "absolute" }, "transform": { "Desktop": "translateX(-50%) translateY(-50%) " }, "backgroundColor": { "Desktop": "#A084CF" }, "padding": { "Desktop": "15px 15px 15px 15px" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "overflow": {} } },
            closeWrap: { "options": { "tag": "span", "class": "", "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-times", "animation": "zoomOutLeft" }, "styles": { "backgroundColor": { "Desktop": "#ff6565" }, "padding": { "Desktop": "8px 15px 7px 15px" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "color": { "Desktop": "#ffffff" }, "left": { "Desktop": "-21px" }, "bottom": { "Desktop": "-21px" }, "position": { "Desktop": "absolute" }, "cursor": { "Desktop": "pointer" } }, "hover": { "backgroundColor": { "Desktop": "#a82b2b" } } },
            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        innerBlocks: [
            ['post-grid/text', {}],
        ],
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#bcbec0" x="41.46" y="4.54" width="302.52" height="201.47" rx="0.73" /><circle fill="#939598" cx="41.46" cy="206.02" r="25.44" /><path fill="#fff" d="M43,206l9.55-9.55a1.12,1.12,0,0,0,0-1.57,1.1,1.1,0,0,0-1.56,0l-9.55,9.55-9.55-9.55a1.1,1.1,0,0,0-1.56,0,1.12,1.12,0,0,0,0,1.57L39.89,206l-9.54,9.54a1.11,1.11,0,0,0,1.56,1.57l9.55-9.55L51,217.13a1.1,1.1,0,0,0,.78.32,1.13,1.13,0,0,0,.78-.32,1.12,1.12,0,0,0,0-1.57Z" /></svg>
        ),
    },



    {
        name: 'preset-4',
        title: __('preset-4'),
        description: __('preset-4'),
        isPro: false,
        atts: {
            wrapper: { "options": { "tag": "div", "class": "" }, "styles": { "backgroundColor": { "Desktop": "#9DD6DF" }, "position": { "Desktop": "fixed" }, "top": { "Desktop": "30px" }, "left": { "Desktop": "0px" }, "width": { "Desktop": "100% !important" }, "height": { "Desktop": "100% !important" }, "maxWidth": { "Desktop": "100% !important" }, "zIndex": { "Desktop": "99" }, "borderRadius": {}, "padding": { "Desktop": "20px 20px 20px 20px" } } },
            inner: { "options": { "tag": "div", "class": "" }, "styles": { "width": { "Desktop": "700px" }, "height": { "Desktop": "400px" }, "top": { "Desktop": "50%" }, "left": { "Desktop": "50%" }, "position": { "Desktop": "absolute" }, "transform": { "Desktop": "translateX(-50%) translateY(-50%) " }, "backgroundColor": { "Desktop": "#A084CF" }, "padding": { "Desktop": "15px 15px 15px 15px" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "overflow": {} } },
            closeWrap: { "options": { "tag": "span", "class": "", "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-times", "animation": "zoomOutLeft" }, "styles": { "backgroundColor": { "Desktop": "#ff6565" }, "padding": { "Desktop": "8px 15px 7px 15px" }, "borderRadius": { "Desktop": "50px 50px 50px 50px" }, "color": { "Desktop": "#ffffff" }, "right": { "Desktop": "-21px" }, "bottom": { "Desktop": "-21px" }, "position": { "Desktop": "absolute" }, "cursor": { "Desktop": "pointer" } }, "hover": { "backgroundColor": { "Desktop": "#a82b2b" } } },
            blockId: "", customCss: "", blockCssY: { items: {} }
        },
        innerBlocks: [
            ['post-grid/text', {}],
        ],
        scope: ['block'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236"><rect fill="#bcbec0" x="16.02" y="4.54" width="302.52" height="201.47" rx="0.73" /><circle fill="#939598" cx="318.54" cy="206.02" r="25.44" /><path fill="#fff" d="M320.11,206l9.54-9.55a1.12,1.12,0,0,0,0-1.57,1.1,1.1,0,0,0-1.56,0l-9.55,9.55L309,194.9a1.1,1.1,0,0,0-1.56,0,1.12,1.12,0,0,0,0,1.57L317,206l-9.55,9.54a1.12,1.12,0,0,0,0,1.57,1.13,1.13,0,0,0,.78.32,1.1,1.1,0,0,0,.78-.32l9.55-9.55,9.55,9.55a1.11,1.11,0,1,0,1.56-1.57Z" /></svg>
        ),
    },







];

export default variations;