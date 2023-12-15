/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


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
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    left: { Desktop: '0px' },
                    top: { Desktop: '0px' },
                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    paddingTop: { Desktop: '30px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },
                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="73.83" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="12.25" y="7.53" width="9.63" height="5.68" /><path fill="#fff" d="M16.45,11.77a.13.13,0,0,1-.11,0,.15.15,0,0,1,0-.21l1.13-1.14L16.34,9.24A.16.16,0,1,1,16.56,9l1.35,1.35-1.35,1.35A.13.13,0,0,1,16.45,11.77Z" /><rect fill="#3c3c3b" y="7.53" width="9.63" height="5.68" transform="translate(9.63 20.74) rotate(180)" /><path fill="#fff" d="M5.44,9a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22L4.41,10.37l1.14,1.14a.16.16,0,1,1-.22.22L4.08,10.48a.16.16,0,0,1,0-.22L5.33,9A.16.16,0,0,1,5.44,9Z" /></svg>
        ),

    },
    {
        name: 'preset-2',
        title: __('preset-2'),
        description: __('preset-2'),

        isPro: false,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    left: { Desktop: '0px' },
                    top: { Desktop: '0px' },
                    justifyContent: { Desktop: 'center' },
                    width: { Desktop: '100%' },


                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    paddingTop: { Desktop: '30px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (


            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="73.83" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="77.46" y="7.53" width="9.63" height="5.68" /><path fill="#fff" d="M81.65,11.77a.13.13,0,0,1-.11,0,.14.14,0,0,1,0-.21l1.13-1.14L81.54,9.24A.16.16,0,1,1,81.76,9l1.35,1.35-1.35,1.35A.13.13,0,0,1,81.65,11.77Z" /><rect fill="#3c3c3b" x="65.2" y="7.53" width="9.63" height="5.68" transform="translate(140.04 20.74) rotate(180)" /><path fill="#fff" d="M70.64,9a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22l-1.13,1.13,1.13,1.14a.16.16,0,1,1-.22.22l-1.24-1.25a.16.16,0,0,1,0-.22L70.53,9A.16.16,0,0,1,70.64,9Z" /></svg>
        ),

    },
    {
        name: 'preset-3',
        title: __('preset-3'),
        description: __('preset-3'),

        isPro: false,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    right: { Desktop: '0px' },
                    top: { Desktop: '0px' },
                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    paddingTop: { Desktop: '30px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (


            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="73.83" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="142.66" y="7.53" width="9.63" height="5.68" /><path fill="#fff" d="M146.85,11.77a.13.13,0,0,1-.11,0,.15.15,0,0,1,0-.21l1.14-1.14-1.14-1.13A.16.16,0,0,1,147,9l1.36,1.35L147,11.72A.13.13,0,0,1,146.85,11.77Z" /><rect fill="#3c3c3b" x="130.41" y="7.53" width="9.63" height="5.68" transform="translate(270.44 20.74) rotate(180)" /><path fill="#fff" d="M135.84,9A.16.16,0,0,1,136,9a.16.16,0,0,1,0,.22l-1.13,1.13L136,11.51a.16.16,0,0,1-.22.22l-1.24-1.25a.16.16,0,0,1,0-.22L135.73,9A.16.16,0,0,1,135.84,9Z" /></svg>
        ),

    },

    {
        name: 'preset-4',
        title: __('preset-4'),
        description: __('preset-4'),

        isPro: false,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    left: { Desktop: '0px' },
                    top: { Desktop: '0px' },
                    justifyContent: { Desktop: 'space-between' },
                    width: { Desktop: '100%' },


                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    paddingTop: { Desktop: '30px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (


            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="73.83" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="73.83" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="53.99" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="57.47" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="19.41" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="142.66" y="7.53" width="9.63" height="5.68" /><path fill="#fff" d="M146.85,11.77a.13.13,0,0,1-.11,0,.15.15,0,0,1,0-.21l1.14-1.14-1.14-1.13A.16.16,0,0,1,147,9l1.36,1.35L147,11.72A.13.13,0,0,1,146.85,11.77Z" /><rect fill="#3c3c3b" y="7.53" width="9.63" height="5.68" transform="translate(9.63 20.74) rotate(180)" /><path fill="#fff" d="M5.44,9a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22L4.41,10.37l1.14,1.14a.16.16,0,1,1-.22.22L4.08,10.48a.16.16,0,0,1,0-.22L5.33,9A.16.16,0,0,1,5.44,9Z" /></svg>
        ),

    },
    {
        name: 'preset-5',
        title: __('preset-5'),
        description: __('preset-5'),

        isPro: false,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    "display": { "Desktop": "flex" },
                    "position": { "Desktop": "absolute" },
                    "left": { "Desktop": "0px" },
                    "top": { "Desktop": "50%" },
                    "justifyContent": { "Desktop": "space-between" },
                    "width": { "Desktop": "100%" },
                    "transform": { "Desktop": "translateY(-50%) " }


                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    paddingTop: { Desktop: '30px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (


            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="67.89" r="1.21" /><circle fill="#3c3c3b" cx="76.14" cy="67.89" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="67.89" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="48.05" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="51.53" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="13.47" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="48.05" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="51.53" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="13.47" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="48.05" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="51.53" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="13.47" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="142.66" y="24.82" width="9.63" height="5.68" /><path fill="#fff" d="M146.85,29.06a.16.16,0,0,1-.11,0,.16.16,0,0,1,0-.22l1.14-1.13-1.14-1.13a.16.16,0,0,1,.22-.22l1.36,1.35L147,29A.16.16,0,0,1,146.85,29.06Z" /><rect fill="#3c3c3b" y="24.82" width="9.63" height="5.68" transform="translate(9.63 55.32) rotate(180)" /><path fill="#fff" d="M5.44,26.26a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22L4.41,27.66l1.14,1.13a.16.16,0,0,1-.22.22L4.08,27.77a.16.16,0,0,1,0-.22l1.25-1.24A.16.16,0,0,1,5.44,26.26Z" /></svg>
        ),

    },
    {
        name: 'preset-6',
        title: __('preset-6'),
        description: __('preset-6'),

        isPro: false,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    left: { Desktop: '0px' },
                    bottom: { Desktop: '0px' },
                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    position: { Desktop: 'absolute' },
                    width: { Desktop: '100%' },
                    top: { Desktop: '0px' },
                    left: { Desktop: '0px' },


                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },


                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="9.35" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="12.25" y="68.75" width="9.63" height="5.68" /><path fill="#fff" d="M16.45,73a.15.15,0,0,1-.11,0,.16.16,0,0,1,0-.22l1.13-1.14-1.13-1.13a.16.16,0,0,1,.22-.22l1.35,1.35L16.56,73A.15.15,0,0,1,16.45,73Z" /><rect fill="#3c3c3b" y="68.75" width="9.63" height="5.68" transform="translate(9.63 143.19) rotate(180)" /><path fill="#fff" d="M5.44,70.19a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22L4.41,71.59l1.14,1.14a.16.16,0,0,1-.22.22L4.08,71.7a.16.16,0,0,1,0-.22l1.25-1.24A.16.16,0,0,1,5.44,70.19Z" /></svg>
        ),

    },

    {
        name: 'preset-7',
        title: __('preset-7'),
        description: __('preset-7'),

        isPro: true,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '70px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    right: { Desktop: '0px' },
                    bottom: { Desktop: '0px' },
                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    position: { Desktop: 'absolute' },
                    width: { Desktop: '100%' },
                    top: { Desktop: '0px' },
                    left: { Desktop: '0px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="9.35" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="142.66" y="68.75" width="9.63" height="5.68" /><path fill="#fff" d="M146.85,73a.15.15,0,0,1-.11,0,.16.16,0,0,1,0-.22l1.14-1.14-1.14-1.13a.16.16,0,0,1,.22-.22l1.36,1.35L147,73A.15.15,0,0,1,146.85,73Z" /><rect fill="#3c3c3b" x="130.41" y="68.75" width="9.63" height="5.68" transform="translate(270.44 143.19) rotate(180)" /><path fill="#fff" d="M135.84,70.19a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22l-1.13,1.13L136,72.73a.16.16,0,0,1-.22.22l-1.24-1.25a.16.16,0,0,1,0-.22l1.24-1.24A.16.16,0,0,1,135.84,70.19Z" /></svg>
        ),

    },

    {
        name: 'preset-8',
        title: __('preset-8'),
        description: __('preset-8'),

        isPro: true,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    padding: { Desktop: '30px 0px 0px 0px' },

                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    position: { Desktop: 'absolute' },
                    width: { Desktop: '100%' },
                    top: { Desktop: '0px' },
                    left: { Desktop: '0px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="9.35" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="77.46" y="68.75" width="9.63" height="5.68" /><path fill="#fff" d="M81.65,73a.15.15,0,0,1-.11,0,.16.16,0,0,1,0-.22l1.13-1.14-1.13-1.13a.16.16,0,0,1,.22-.22l1.35,1.35L81.76,73A.15.15,0,0,1,81.65,73Z" /><rect fill="#3c3c3b" x="65.2" y="68.75" width="9.63" height="5.68" transform="translate(140.04 143.19) rotate(180)" /><path fill="#fff" d="M70.64,70.19a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22l-1.13,1.13,1.13,1.14a.16.16,0,0,1-.22.22L69.29,71.7a.16.16,0,0,1,0-.22l1.24-1.24A.16.16,0,0,1,70.64,70.19Z" /></svg>
        ),

    },

    {
        name: 'preset-9',
        title: __('preset-9'),
        description: __('preset-9'),

        isPro: true,
        atts: {
            wrapper: {
                options: { class: '' },
                styles: { padding: { Desktop: '50px 0px 50px 0px' } }
            },
            navsWrap: {
                options: { class: '' },
                styles: {
                    display: { Desktop: 'flex' },
                    position: { Desktop: 'absolute' },
                    left: { Desktop: '0px' },
                    bottom: { Desktop: '0px' },
                    justifyContent: { Desktop: 'space-between' },
                    width: { Desktop: '100%' },


                }
            },
            perv: {
                options: {
                    text: 'Prev',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            pervIcon: {
                options: {
                    position: 'before',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-left',
                },
                styles: {
                }
            },
            next: {
                options: {
                    text: 'Next',
                    class: '',
                },
                styles: {
                    padding: { Desktop: '5px 30px 5px 30px' },
                    backgroundColor: { Desktop: '#1418FF8F' },
                    color: { Desktop: '#fff' },
                }
            },
            nextIcon: {
                options: {
                    position: 'after',
                    class: '',
                    library: 'fontAwesome',
                    srcType: "class", /*class, html, img, svg */
                    iconSrc: 'fas fa-chevron-right',
                },
                styles: {
                }
            },
            paginationWrap: {
                options: {
                    tag: 'ul',
                    class: '',
                },
                styles: {
                    display: { Desktop: 'flex' },
                    justifyContent: { Desktop: 'center' },
                    position: { Desktop: 'absolute' },
                    width: { Desktop: '100%' },
                    top: { Desktop: '0px' },
                    left: { Desktop: '0px' },
                }
            },
            pagination: {
                options: {
                    tag: 'span',
                    class: '',
                },
                styles: {

                    backgroundColor: { Desktop: '#1418FF8F' },
                    width: { Desktop: '15px' },
                    height: { Desktop: '15px' },
                    margin: { Desktop: '0px 10px 0px 0px' },
                    borderRadius: { Desktop: ' 20px 20px 20px 20px' },

                }
            },
            paginationActive: {
                options: {
                    class: '',
                },
                styles: {
                    backgroundColor: { Desktop: '#0003B6F5' },
                }
            },

            sliderOptions: {
                perPage: 3,
                perMove: 1,
                gap: '1em'

            },
            sliderOptionsRes: {

            },
        },
        innerBlocks: [
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],
            ['post-grid/content-slider-item', {}],


        ],
        scope: ['block'],
        icon: (



            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><circle fill="#3c3c3b" cx="70.84" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="76.15" cy="9.35" r="1.21" /><circle fill="#3c3c3b" cx="81.45" cy="9.35" r="1.21" /><rect fill="#3c3c3b" x="4.39" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="7.81" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="57.76" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="61.18" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="53.37" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="111.13" y="52.96" width="36.77" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="114.54" y="56.44" width="29.93" height="1.91" rx="0.69" /><rect fill="#3c3c3b" x="106.73" y="18.38" width="45.55" height="28.38" /><rect fill="#3c3c3b" x="142.66" y="68.75" width="9.63" height="5.68" /><path fill="#fff" d="M146.85,73a.15.15,0,0,1-.11,0,.16.16,0,0,1,0-.22l1.14-1.14-1.14-1.13a.16.16,0,0,1,.22-.22l1.36,1.35L147,73A.15.15,0,0,1,146.85,73Z" /><rect fill="#3c3c3b" y="68.75" width="9.63" height="5.68" transform="translate(9.63 143.19) rotate(180)" /><path fill="#fff" d="M5.44,70.19a.16.16,0,0,1,.11,0,.16.16,0,0,1,0,.22L4.41,71.59l1.14,1.14a.16.16,0,0,1-.22.22L4.08,71.7a.16.16,0,0,1,0-.22l1.25-1.24A.16.16,0,0,1,5.44,70.19Z" /></svg>
        ),

    },












];

export default variations;