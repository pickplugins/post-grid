import apiFetch from "@wordpress/api-fetch";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { subscribe, select } from "@wordpress/data";

//const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);

window.PostGridPluginData = {
	freeUrl: "https://wordpress.org/plugins/post-grid/",
	proUrl: "https://pickplugins.com/post-grid/",
	websiteUrl: "https://pickplugins.com/",
	demoUrl: "http://getpostgrid.com/",
	wpReviewUrl:
		"https://wordpress.org/support/plugin/post-grid/reviews/#new-post",
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
	},
};

window.postGridBlockEditor = null;

apiFetch({
	path: "/post-grid/v2/get_plugin_data",
	method: "POST",
	data: {},
}).then((res) => {
	window.PostGridPluginData = res;
});

apiFetch({
	path: "/post-grid/v2/get_options",
	method: "POST",
	data: { option: "post_grid_block_editor" },
}).then((res) => {
	window.postGridBlockEditor = res;
});

wp.domReady(function () {
	postGridDisabledBlocks.forEach(function (blockName) {
		if (blockName && wp.blocks.getBlockType(blockName) !== undefined) {
			wp.blocks.unregisterBlockType(blockName);
		}
	});
});

//var generalSidebarName = wp.data.select('core/edit-post').getActiveGeneralSidebarName();
//const isSidebarOpened = wp.data.select('post-grid-sidebar').isPluginSidebarOpened();

// if (!isSidebarOpened) {
//     wp.data.dispatch('post-grid-sidebar').openGeneralSidebar();
// }

// subscribe(() => {
//     if (select('core/edit-post').isPluginSidebarOpened()) {
//         // Is open..
//         console.log(generalSidebarName);

//     } else {
//         // Is closed..
//         console.log(generalSidebarName);

//     }
// });

import "./store";
import "./templates";
import "./sidebars";

import "./blocks/post-grid";
import "./blocks/post-query";
import "./blocks/post-query-pagination";

import "./blocks/post-grid-filterable";

import "./blocks/content-slider";
import "./blocks/content-slider-item";
import "./blocks/popup";

import "./blocks/post-title";
import "./blocks/post-excerpt";
import "./blocks/post-featured-image";
import "./blocks/image";

import "./blocks/post-author";
import "./blocks/post-author-fields";
import "./blocks/post-categories";
import "./blocks/post-tags";
import "./blocks/post-taxonomies";
import "./blocks/post-date";
import "./blocks/post-meta";
import "./blocks/read-more";
import "./blocks/post-comment-count";



import "./blocks/menu-wrap";
import "./blocks/menu-wrap-item";

import "./blocks/progress-bar";

import "./blocks/form-wrap";

import "./blocks/form-field-input";
import "./blocks/form-field-submit";

import "./blocks/form-field-select";
import "./blocks/form-field-checkbox";
import "./blocks/form-field-radio";

import "./blocks/form-field-textarea";

import "./blocks/form-field-file-multi";
import "./blocks/form-field-file";

// import "./blocks/table-of-contents";
import "./blocks/number-counter";
import "./blocks/date-countdown";

import "./blocks/list";
import "./blocks/list-nested";
import "./blocks/list-nested-item";
// import './blocks/steps-wrap'
// import './blocks/steps-wrap-item'

import "./blocks/icon";
import "./blocks/text";
import "./blocks/star-rate";
import "./blocks/breadcrumb";
import "./blocks/shortcode";
import "./blocks/social-share";

import "./blocks/terms-list";
import "./blocks/archive-title";
import "./blocks/archive-description";

import "./blocks/layers";
import "./blocks/layer";
import "./blocks/flex-wrap";
import "./blocks/flex-wrap-item";
import "./blocks/masonry-wrap";
import "./blocks/masonry-wrap-item";
// import "./blocks/justified-wrap";
// import "./blocks/justified-image";
// import "./blocks/justified-wrap-item";

import "./blocks/grid-wrap";
import "./blocks/grid-wrap-item";
import "./blocks/image-gallery";
import "./blocks/image-gallery-item";

import "./blocks/accordion";

import "./blocks/accordion-nested";
import "./blocks/accordion-nested-item";
import "./blocks/tabs";

import "./blocks/tabs-nested";
import "./blocks/tabs-nested-item";

import "./blocks/woo-sku";
import "./blocks/woo-total-sales";
import "./blocks/woo-stock-quantity";
import "./blocks/woo-product-info";
import "./blocks/woo-price";
import "./blocks/woo-sale";
import "./blocks/woo-stock";
import "./blocks/woo-star-rate";
import "./blocks/woo-add-to-cart";

import "./blocks/wordpress-org";

// const addBlockEditAttributes = createHigherOrderComponent((BlockEdit) => {
//     return (props) => {
//         const { attributes, setAttributes, clientId } = props;

//         const {
//             blockId,
//         } = attributes;

//         console.log(props);
//         //props.attributes.blockId = 'pg' + clientId.split('-').pop();

//         return <BlockEdit {...props} />;
//     };
// }, 'addBlockEditAttributes');

// addFilter(
//     'editor.BlockEdit',
//     'post-grid/text',
//     addBlockEditAttributes
// );
// addFilter(
//     'editor.BlockEdit',
//     'post-grid/layers',
//     addBlockEditAttributes
// );
