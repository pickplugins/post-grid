<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('post-grid-addons');
wp_enqueue_style('post-grid-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');
$admin_email = get_option('admin_email');


?>
<div class="wrap">
    <div class="p-5 bg-white ">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6 ">

                <div class="text-[40px] font-black flex text-indigo-600 items-center ">

                    <div class="mr-5">
                        <svg width="50" height="50" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M267.846 117.688C267.846 114.926 270.085 112.688 272.846 112.688H450C452.761 112.688 455 114.926 455 117.688V144.205C455 146.967 452.761 149.205 450 149.205H272.846C270.085 149.205 267.846 146.967 267.846 144.205V117.688Z" fill="#4f46e5" />
                            <path d="M267.846 194.375C267.846 191.614 270.085 189.375 272.846 189.375H450C452.761 189.375 455 191.614 455 194.375V220.893C455 223.654 452.761 225.893 450 225.893H272.846C270.085 225.893 267.846 223.654 267.846 220.893V194.375Z" fill="#4f46e5" />
                            <path d="M267.846 41C267.846 38.2386 270.085 36 272.846 36H450C452.761 36 455 38.2386 455 41V67.5179C455 70.2793 452.761 72.5179 450 72.5179H272.846C270.085 72.5179 267.846 70.2793 267.846 67.5179V41Z" fill="#4f46e5" />
                            <rect x="66" y="56" width="149.893" height="149.893" stroke="#4f46e5" stroke-width="40" />
                            <path d="M233.154 383.355C233.154 386.116 230.915 388.355 228.154 388.355L51 388.355C48.2386 388.355 46 386.116 46 383.355L46 356.837C46 354.076 48.2386 351.837 51 351.837L228.154 351.837C230.915 351.837 233.154 354.076 233.154 356.837L233.154 383.355Z" fill="#4f46e5" />
                            <path d="M233.154 306.667C233.154 309.429 230.915 311.667 228.154 311.667L51 311.667C48.2386 311.667 46 309.429 46 306.667L46 280.15C46 277.388 48.2386 275.15 51 275.15L228.154 275.15C230.915 275.15 233.154 277.388 233.154 280.15L233.154 306.667Z" fill="#4f46e5" />
                            <path d="M233.154 460.042C233.154 462.804 230.915 465.042 228.154 465.042L51 465.042C48.2386 465.042 46 462.804 46 460.042L46 433.525C46 430.763 48.2386 428.525 51 428.525L228.154 428.525C230.915 428.525 233.154 430.763 233.154 433.525L233.154 460.042Z" fill="#4f46e5" />
                            <rect x="435" y="445.042" width="149.893" height="149.893" transform="rotate(-180 435 445.042)" stroke="#4f46e5" stroke-width="40" />
                        </svg>

                    </div>

                    <div>
                        Post Grid Combo - <?php echo post_grid_version; ?>
                    </div>
                </div>

                <p class="text-lg">Welcome to <span class="font-bold">Post Grid Combo</span>, We have started diving with Gutenberg.</p>


            </div>
            <div class="col-span-6 text-right">

                <a target="_blank" href="https://pickplugins.com/create-support-ticket/" class="inline-block px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-400 text-white text-lg mx-2 hover:text-white ">Contact Support</a>
                <a target="_blank" href="https://pickplugins.com/documentation/post-grid-combo/" class="inline-block px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-400 text-white text-lg mx-2 hover:text-white ">Documentations</a>



            </div>
        </div>
    </div>





    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl gap-10 mx-auto">
            <div class="col-span-8 bg-white">

                <div class="p-5">

                    <iframe width="100%" height="415" src="https://www.youtube.com/embed/5IJFpmTOFfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


                    <div class="text-center">

                        <a target="_blank" href="https://getpostgrid.com/" class="inline-block mt-5 px-6 py-1 rounded-sm  text-center border-4 border-indigo-600 hover:border-indigo-400	 text-gray-600  text-lg mx-2  ">Live Demo</a>
                        <a target="_blank" href="https://pickplugins.com/post-grid/" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-600	hover:bg-indigo-400 text-white text-lg mx-2 hover:text-white ">Plugin Details</a>

                    </div>


                </div>
            </div>
            <div class="col-span-4 bg-white">

                <div class="p-5 text-lg">



                    <h3 class="text-2xl mb-5 font-bold text-gray-600"><span class="text-4xl mr-3 dashicons dashicons-megaphone"></span> Why Post Grid?</h3>
                    <ul class="	">


                        <li><span class="dashicons dashicons-yes-alt align-middle"></span> Most Advance Query Builder</li>
                        <li><span class="dashicons dashicons-yes-alt align-middle"></span> Ready Post Query Presets
                            <span class="text-rose-700 font-bold">[Pro]</span>
                        </li>
                        <li><span class="dashicons dashicons-yes-alt align-middle"></span> Ready Post Layouts
                        </li>
                        <li><span class="dashicons dashicons-yes-alt align-middle"></span> Archive Post Query
                            <span class="text-rose-700 font-bold">[Pro]</span>

                        </li>
                        <li><span class="dashicons dashicons-yes-alt align-middle"></span> Advance Grid Layout Builder </li>
                        <li><span class="dashicons dashicons-yes-alt align-middle"></span> Advance Grid Layout Presets <span class="text-rose-700 font-bold">[Pro]</span></li>

                        <li><span class="dashicons dashicons-format-status align-middle"></span> More Blocks Comming... </li>

                    </ul>


                    <a href="https://pickplugins.com/post-grid/#purchase-license" target="_blank" class="inline-block mt-10 px-4 py-2 rounded-sm w-full text-center bg-amber-500 hover:bg-amber-600	cursor-pointer	 text-white text-lg hover:text-white "><span class="text-2xl mr-3 dashicons dashicons-cart"></span> Purchase License</a>
                </div>

            </div>



        </div>

    </div>



    <div class="p-5 ">


        <div class="p-5 max-w-6xl mx-auto my-10">
            <h2 class=" text-center text-3xl font-bold">Available Gutenberg Blocks</h2>
        </div>

        <div class="grid grid-cols-12 gap-3 max-w-6xl mx-auto text-center">

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Title
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>



            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Excerpt
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>
            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Author
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Author Fields
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>


            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Featured Image
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Image
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>


            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Categories
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Tags
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>


            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Terms
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Date
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Read More
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Advance Text
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Grid
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>
                </div>
            </div>



            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        List Items
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Icons
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>


            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Layers
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>


            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Accordion
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Tabs
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-lime-600 px-3 py-1 text-white">Released</span>

                </div>
            </div>


            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Grid - Filterable
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-orange-400 px-3 py-1 text-white">Comming soon</span>

                </div>
            </div>
            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Grid - Glossary
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-orange-400 px-3 py-1 text-white">Comming soon</span>

                </div>
            </div>
            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Post Carusel
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-orange-400 px-3 py-1 text-white">Comming soon</span>

                </div>
            </div>
            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Category Grid
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-orange-400 px-3 py-1 text-white">Comming soon</span>

                </div>
            </div>
            <div class="col-span-4 bg-white">
                <div class="p-5 relative">
                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        Category Carusel
                    </h3>
                    <span class="absolute bottom-0 right-0 bg-orange-400 px-3 py-1 text-white">Comming soon</span>

                </div>
            </div>
        </div>
    </div>


    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl mx-auto">
            <div class="col-span-6 bg-white bg-[url('https://freepik.cdnpk.net/img/banner/microfunnel.webp')]">


            </div>

            <div class="col-span-6 bg-white">

                <div class="p-5 py-20">

                    <h3 class="text-3xl mb-5 font-bold text-gray-600">
                        <span class="text-4xl mr-3 dashicons dashicons-welcome-widgets-menus"></span> Post Layout Library
                    </h3>
                    <p class="text-[16px]">We create ready post layout templates for you. so that you don't have to wast time for creating complex and advance layout by own. Our designer and developer team continuesly sketch, build new layouts everyday, just take a search and pick the best templates that you need.</p>
                    <a target="_blank" href="https://getpostgrid.com/post-layouts" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-500	hover:bg-indigo-400	 text-white text-lg hover:text-white "><span class="dashicons dashicons-buddicons-groups align-middle"></span> See Layouts Library</a>

                </div>
            </div>


        </div>
    </div>
    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl mx-auto">


            <div class="col-span-6 bg-white">

                <div class="p-5 py-20">

                    <h3 class="text-3xl mb-5 font-bold text-gray-600">

                        <span class="text-4xl mr-3 dashicons dashicons-images-alt  "></span> Complex Grid Layout Presets
                    </h3>

                    <p class="text-[16px]">Our Post Grid plugin is master for creating advance and complex layout for grid. We use most advantage for grid CSS to build beautifull and complex grid layout, Hope it will save your time and help you to create post grid quickly.</p>


                    <a target="_blank" href="https://getpostgrid.com/grid-layouts" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-500	hover:bg-indigo-400	 text-white text-lg hover:text-white "><span class="dashicons dashicons-buddicons-groups align-middle"></span> See Grid Layout Presets</a>

                </div>
            </div>
            <div class="col-span-6 bg-white bg-[url('https://freepik.cdnpk.net/img/banner/microfunnel.webp')]">


            </div>

        </div>
    </div>
    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 gap-4 max-w-6xl mx-auto">




            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Query Arguments
                    </h3>
                    <p class="text-[16px]">We have provided all support for WP_Query Class query arguments, you don't have to code your own, just choose query arguments from drop down and set your options values and your post will be displyed for your desired post query arguments.</p>

                    <a target="_blank" href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>

            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Paginations
                    </h3>
                    <p class="text-[16px]">We provide 5 different type of pagination, you can choose as you need, there is normal pagination, Ajax Pagination, Next Previous Button, Load More and infinite loading.</p>

                    <a target="_blank" href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Post Search
                    </h3>
                    <p class="text-[16px]">Our post grid also support for search query arguments, there is default search form avilable on top of post grid, you can customize or override the form input fields as your need.</p>

                    <a target="_blank" href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Taxonomy & Terms Query
                    </h3>
                    <p class="text-[16px]">By advance post query arguments you can query post by custom taxonomies & terms. you can also provide multiple taxonomies & terms with complex relations.</p>

                    <a target="_blank" href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Custom Fields Query
                    </h3>
                    <p class="text-[16px]">By advance post query arguments you can query post by custom fields or meta field query. you can also provide multiple meta key value with complex relations.</p>

                    <a target="_blank" href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>











        </div>
    </div>


    <div class=" my-10 container mx-auto">

        <div class="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
            <div class="col-span-12  ">

                <div class="p-5 ">
                    <h2 class="mx-auto text-center text-3xl font-bold">3rd Party Plugins Support</h2>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-4 max-w-6xl mx-auto my-10">
            <div class="col-span-4 bg-white ">
                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        WooCommerce Support
                    </h3>
                    <p class="text-[16px]">We have provided many support to display custom post types like WooCommerce product and there is layout block avilable to display various WooCommerce elements.</p>


                </div>
            </div>




            <div class="col-span-4 bg-white ">
                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advanced Custom Fields(ACF) Support
                    </h3>
                    <p class="text-[16px]">Advanced Custom Fields is #1 custom fields plugin for WordPress and we added full support to display following meta fields for any post types.</p>


                </div>
            </div>

            <div class="col-span-4 bg-white ">
                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Easy Digital Download(EDD) Support

                    </h3>
                    <p class="text-[16px]">Easy Digital Download is another best eCommerce for digital products and we provide full support to display following elements for downloads on the post grid.</p>


                </div>
            </div>
            <div class="col-span-4 bg-white ">
                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        CMB2

                    </h3>
                    <p class="text-[16px]">CMB2 is another best custom field’s plugin for WordPress and we added full support to display following meta fields for any post types.</p>


                </div>
            </div>
            <div class="col-span-4 bg-white ">
                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        Custom Field Suite
                    </h3>
                    <p class="text-[16px]">Custom Field Suite is another best custom field’s plugin for WordPress and we added full support to display following meta fields for any post types.
                    </p>


                </div>
            </div>


            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        Rank Math
                    </h3>
                    <p class="text-[16px]">Rank Math is one of the best popular SEO plugin for WordPress SEO, so we have added integration with Rank math
                    </p>
                </div>
            </div>

            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        Yoast SEO
                    </h3>
                    <p class="text-[16px]">Yoast is #1 SEO plugin for WordPress SEO, so we have added integration with Yoast.
                    </p>
                </div>
            </div>



            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        AIO SEO
                    </h3>
                    <p class="text-[16px]">AIO SEO. is one of the best popular SEO plugin for WordPress SEO, so we have added integration with AIO SEO.
                    </p>
                </div>
            </div>

            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        SEOPress
                    </h3>
                    <p class="text-[16px]">SEOPress. is one of the best popular SEO plugin for WordPress SEO, so we have added integration with SEOPress.
                    </p>
                </div>
            </div>

            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        WP Meta SEO
                    </h3>
                    <p class="text-[16px]">WP Meta SEO is one of the best SEO plugin for WordPress SEO, so we have added integration with WP Meta SEO .
                    </p>
                </div>
            </div>


            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        The SEO Framework
                    </h3>
                    <p class="text-[16px]">The SEO Framework is one of the best SEO plugin for WordPress SEO, so we have added integration with The SEO Framework .
                    </p>
                </div>
            </div>

            <div class="col-span-4 bg-white ">
                <div class="p-5">
                    <h3 class="text-2xl my-5 font-bold text-gray-600">
                        SEO SIMPLE PACK
                    </h3>
                    <p class="text-[16px]">SEO SIMPLE PACK is one of the best SEO plugin for WordPress SEO, so we have added integration with SEO SIMPLE PACK .
                    </p>
                </div>
            </div>


        </div>
    </div>



    <div id="purchase-license" class="p-5 ">
        <div class="p-5 max-w-6xl mx-auto my-10">
            <h2 class=" text-center text-3xl font-bold">Purchse a License</h2>
        </div>

        <div class="grid grid-cols-12 gap-3 max-w-6xl mx-auto text-center">

            <div class="col-span-4  bg-white">
                <div class="px-8 relative py-5">
                    <h3 class="text-2xl py-5 font-bold text-gray-600">
                        1 Site License
                    </h3>
                    <div class="py-6 pb-10">
                        <span class="line-through inline-block text-2xl font-black text-gray-500">$49</span>
                        <span class=" inline-block text-6xl font-black  text-indigo-700">$38</span>
                        <span class=" inline-block  text-lg  text-gray-600">/ Year</span>

                    </div>

                    <a target="_blank" href="https://pickplugins.com/post-grid/#purchase-license" class="bg-indigo-300 hover:bg-indigo-600 block border-indigo-700 border rounded-sm py-3 font-bold text-[16px] text-white mb-10 cursor-pointer">Get Started</a>
                    <div class="py-3 text-[18px] ">1 Domain License</div>
                    <div class="py-3 text-[18px] ">1 Year of Support</div>
                    <div class="py-3 text-[18px] ">1 Year of Updates</div>
                    <div class="py-3 text-[18px] ">All Upcoming Features</div>
                    <div class="py-3 text-[18px] ">14 Day Guarantee</div>
                    <div class="py-3 text-[18px] ">Including Pro Blocks</div>
                    <div class="py-3 text-[18px] ">25% Renewal Discount</div>

                </div>
            </div>

            <div class="col-span-4 bg-white">
                <div class="px-8 relative py-5">
                    <h3 class="text-2xl py-5 font-bold text-gray-600">
                        Unlimited Sites License
                    </h3>

                    <div class="py-6 pb-10">
                        <span class="line-through inline-block text-2xl font-black text-gray-500">$99</span>
                        <span class=" inline-block text-6xl font-black  text-indigo-700">$88</span>
                        <span class=" inline-block  text-lg  text-gray-600">/ Year</span>

                    </div>

                    <a target="_blank" href="https://pickplugins.com/post-grid/#purchase-license" class="bg-indigo-600 rounded-sm block py-3 font-bold text-[16px] text-white mb-10 cursor-pointer">Get Started</a>
                    <div class="py-3 text-[18px] ">Unlimited Domain License</div>
                    <div class="py-3 text-[18px] ">1 Year of Support</div>
                    <div class="py-3 text-[18px] ">1 Year of Updates</div>
                    <div class="py-3 text-[18px] ">All Upcoming Features</div>
                    <div class="py-3 text-[18px] ">14 Day Guarantee</div>
                    <div class="py-3 text-[18px] ">Including Pro Blocks</div>
                    <div class="py-3 text-[18px] ">25% Renewal Discount</div>

                </div>
            </div>
            <div class="col-span-4 bg-white">
                <div class="px-8 relative py-5">
                    <h3 class="text-2xl py-5 font-bold text-gray-600">
                        10 Sites License
                    </h3>

                    <div class="py-6 pb-10">
                        <span class="line-through inline-block text-2xl font-black text-gray-500">$79</span>
                        <span class=" inline-block text-6xl font-black  text-indigo-700">$68</span>
                        <span class=" inline-block  text-lg  text-gray-600">/ Year</span>
                    </div>

                    <a target="_blank" href="https://pickplugins.com/post-grid/#purchase-license" class="bg-indigo-300 hover:bg-indigo-600 rounded-sm block border-indigo-700 border py-3 font-bold text-[16px] text-white mb-10 cursor-pointer">Get Started</a>

                    <div class="py-3 text-[18px] ">10 Domain License</div>
                    <div class="py-3 text-[18px] ">1 Year of Support</div>
                    <div class="py-3 text-[18px] ">1 Year of Updates</div>
                    <div class="py-3 text-[18px] ">All Upcoming Features</div>
                    <div class="py-3 text-[18px] ">14 Day Guarantee</div>
                    <div class="py-3 text-[18px] ">Including Pro Blocks</div>
                    <div class="py-3 text-[18px] ">25% Renewal Discount</div>

                </div>
            </div>



        </div>



        <div class="max-w-6xl mx-auto my-10">

            <div class="grid grid-cols-12">

                <div class="col-span-8">


                    <div class="grid grid-cols-3 gap-3 ">

                        <div class="bg-white ">
                            <div class="p-3 text-center">
                                <div class="text-lg ">Active User </div>
                                <div class="text-3xl font-black my-5">60000+</div>
                            </div>
                        </div>

                        <div class="bg-white ">
                            <div class="p-3 text-center">
                                <div class="text-lg ">Total Downloads </div>
                                <div class="text-3xl font-black my-5">1,727,151+</div>
                            </div>
                        </div>

                        <div class="bg-white ">
                            <div class="p-3 text-center">
                                <div class="text-lg ">Star Ratting </div>
                                <div class="text-3xl font-black my-5">4.5/5</div>
                            </div>
                        </div>

                        <div class="bg-white ">
                            <div class="p-3 text-center">
                                <div class="text-lg ">Support Issue Solved </div>
                                <div class="text-3xl font-black my-5">5000+</div>
                            </div>
                        </div>

                        <div class="bg-white ">
                            <div class="p-3 text-center">
                                <div class="text-lg ">Years We Serving </div>
                                <div class="text-3xl font-black my-5">8 Years</div>
                            </div>
                        </div>

                        <div class="bg-white ">
                            <div class="p-3 text-center">
                                <div class="text-lg ">3rd Party Integration </div>
                                <div class="text-3xl font-black my-5">12+</div>
                            </div>
                        </div>

                    </div>





                </div>

                <div class="col-span-4 text-right">
                    <div class="col-span-8 mb-5 text-lg font-bold">Secure Checkout by Paddle.com</div>
                    <img class="inline-block w-28" src="<?php echo post_grid_plugin_url; ?>assets/admin/images/paddle-net.png" alt="">
                </div>



            </div>




        </div>
    </div>




    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl mx-auto just">
            <div class="col-span-4 bg-white ">
                <div class="p-5">

                    <h3 class="text-lg inline-block mr-12 font-bold">Follow Us</h3>
                    <div class="inline-block  "><a target="_blank" target="_blank" class="p-2 " href="https://www.facebook.com/PickPlugins/"><span class="dashicons   dashicons-facebook"></span></a></div>
                    <div class="inline-block "><a target="_blank" class="p-2 " href="https://twitter.com/pickplugins"><span class="dashicons  dashicons-twitter"></span></a></div>
                    <div class="inline-block "><a target="_blank" class="p-2 " href="https://www.pinterest.com/pickplugins/"><span class="dashicons  dashicons-pinterest"></span></a></div>
                    <div class="inline-block "><a target="_blank" class="p-2 " href="https://www.linkedin.com/in/pickplugins"><span class="dashicons  dashicons-linkedin"></span></a></div>

                </div>
            </div>
            <div class="col-span-8 bg-white ">
                <div class="p-5">

                    <a target="_blank" class="inline-block px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-400 text-white text-lg mx-2 hover:text-white " href="https://www.facebook.com/groups/PickPlugins">Join Our Facebook Group</a>

                </div>
            </div>


        </div>
    </div>

    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <h3 class="text-2xl mb-5 font-bold text-gray-600">

                        Documentation
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a target="_blank" href="https://pickplugins.com/documentation/post-grid-combo/" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>

                </div>



            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <h3 class="text-2xl mb-5 font-bold text-gray-600">

                        Video Tutorials
                    </h3>
                    <p class="text-[16px]">Our content creator team is preparing video tutorials for you. Keep watching these and we have many more video tutorials on the pipeline.</p>

                    <a target="_blank" href="https://getpostgrid.com/video-tutorials" class="inline-block mt-5 text-red-500	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> Watch on YouTube</a>

                </div>



            </div>

            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <h3 class="text-2xl mb-5 font-bold text-gray-600">
                        Need Support?
                    </h3>
                    <p class="text-[16px]">Do you have any question that need to be answered as soon as possible, our support tech person is ready to help you and resolve.</p>


                    <a target="_blank" href="https://pickplugins.com/create-support-ticket/" class="inline-block mt-5 text-indigo-700 font-bold	  py-2 rounded-sm  text-center text-lg"> Create Support Ticket</a>

                </div>

            </div>
            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <h3 class="text-2xl mb-5 font-bold text-gray-600">
                        Write Feedback & Reviews
                    </h3>
                    <p class="text-[16px]">
                        Our team is continuesly planing, updating and fixing many issues, we need your feedback about our services, support and plugins, how we help your bussiness growth.
                    </p>
                    <a target="_blank" href="https://wordpress.org/support/plugin/post-grid/reviews/#new-post" class="inline-block mt-5 text-amber-500 font-bold	  py-2 rounded-sm  text-center 		  text-lg  "> Write a Review</a>

                </div>

            </div>



        </div>
    </div>

</div>