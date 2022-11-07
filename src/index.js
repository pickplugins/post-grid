
import apiFetch from '@wordpress/api-fetch';

window.PostGridPluginData = {
    freeUrl: "https://wordpress.org/plugins/post-grid/",
    proUrl: "https://pickplugins.com/post-grid/",
    websiteUrl: "https://pickplugins.com/",
    demoUrl: "http://getpostgrid.com/",
    wpReviewUrl: "https://wordpress.org/support/plugin/post-grid/reviews/#new-post",
    reviewUrl: "http://getpostgrid.com/submit-review",

    renewLicense: "https://pickplugins.com/renew-license/?licenseKey=",
    hasSubscribed: false,

    utm: {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        utm_term: "",
        utm_id: "",
    }

};

apiFetch({
    path: '/post-grid/v2/get_plugin_data',
    method: 'POST',
    data: {},
}).then((res) => {

    //console.log(res);

    window.PostGridPluginData = res;
});



import './store'



import './blocks/post-grid'

import './blocks/post-title'
import './blocks/post-excerpt'
import './blocks/post-author'
import './blocks/post-author-fields'

import './blocks/post-featured-image'
import './blocks/image'

import './blocks/post-categories'
import './blocks/post-tags'
import './blocks/post-taxonomies'
import './blocks/post-date'
import './blocks/post-meta'
import './blocks/read-more'



import './blocks/text'
import './blocks/layers'
import './blocks/layer'
// import './blocks/accordions'
import './blocks/accordion'
import './blocks/tabs'
import './blocks/list'
import './blocks/icon'

//import './blocks/shortcode'

// import './blocks/link'
// import './blocks/query'
// import './blocks/post-template'
// import './blocks/innerblocks'


 import './blocks/post-grid-filterable'

