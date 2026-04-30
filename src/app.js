import Builder from './components/Builder'
import apiFetch from "@wordpress/api-fetch";

document.addEventListener("DOMContentLoaded", DOMContentLoadedImport);

function DOMContentLoadedImport() {


    var appData = {
        name: "Post Grid",
        version: "1.0.0",
        demoUrl: "https://demo.pickplugins.com/post-grid/",
        reviewsUrl: "https://wordpress.org/support/plugin/post-grid/reviews/#new-post/"
    }

    const url = new URL(window.location.href);
    const path = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
    const baseUrl = `${url.origin}${path}/`;

    window.PostGrid = {};
    window.PostGrid = appData;
    window.PostGrid.baseUrl = baseUrl;

    apiFetch({
        path: "/post-grid/v2/get_options",
        method: "POST",
        data: { option: "post_grid_settings" },
    }).then((res) => {
        if (res.length != 0) {
            var resX = { ...res };
            var license_key = resX?.license_key;


            window.PostGrid = { ...appData, license_key: license_key };


        }
    });

    // console.log(window.PostGrid)

    setTimeout(() => {

        var builderWrap = document.querySelector('#builder');


        if (builderWrap != null) {
            wp.element.render(<Builder appData={appData} />, builderWrap)
        }
    }, 2000)



}



