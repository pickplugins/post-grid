<?php
if (!defined('ABSPATH')) exit;  // if direct access

wp_enqueue_style('post-grid-addons');


$class_post_grid_functions = new class_post_grid_functions();
$addons_list = $class_post_grid_functions->addons_list();


wp_enqueue_style('post-grid-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');


?>
<div class="wrap">


    <div class="p-5 bg-white">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6 ">

                <h2 class="text-[40px] font-black text-indigo-600  ">
                    <img class="inline-block w-12 align-middle" src="<?php echo post_grid_plugin_url . 'assets/admin/images/post-grid-50.png'; ?>" alt="">
                    <a class="hover:text-blue-600" href="">Post Grid</a>
                    - 3.0.0
                </h2>

                <p class="text-lg">Welcome to Post Grid, Create Beautiful and Advance Grid and Post Loop Without Coding.</p>


            </div>
            <div class="col-span-6 text-right">

                <a href="" class="inline-block px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-400 text-white text-lg mx-2 hover:text-white ">Create Support</a>


                <a href="" class="inline-block px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-400 text-white text-lg mx-2 hover:text-white ">Documentation</a>



            </div>

        </div>

    </div>


    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl gap-10 mx-auto">
            <div class="col-span-8 bg-white">

                <div class="p-5">

                    <iframe width="100%" height="415" src="https://www.youtube.com/embed/5IJFpmTOFfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


                    <div class="text-center">

                        <a href="" class="inline-block mt-5 px-6 py-1 rounded-sm  text-center border-4 border-indigo-600 hover:border-indigo-400	 text-gray-600  text-lg mx-2  ">Live Demo</a>
                        <a href="" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-600	hover:bg-indigo-400 text-white text-lg mx-2 hover:text-white ">Plugin Details</a>

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







                    <a href="" class="inline-block mt-10 px-4 py-2 rounded-sm w-full text-center bg-amber-500 hover:bg-amber-600		 text-white text-lg hover:text-white "><span class="text-2xl mr-3 dashicons dashicons-cart"></span> Buy Pro Version</a>
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


                    <a href="" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-500	hover:bg-indigo-400	 text-white text-lg hover:text-white "><span class="dashicons dashicons-buddicons-groups align-middle"></span> See Layouts Library</a>

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


                    <a href="" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-500	hover:bg-indigo-400	 text-white text-lg hover:text-white "><span class="dashicons dashicons-buddicons-groups align-middle"></span> See Grid Layout Presets</a>

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

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>

            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Paginations
                    </h3>
                    <p class="text-[16px]">We provide 5 different type of pagination, you can choose as you need, there is normal pagination, Ajax Pagination, Next Previous Button, Load More and infinite loading.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Post Search
                    </h3>
                    <p class="text-[16px]">Our post grid also support for search query arguments, there is default search form avilable on top of post grid, you can customize or override the form input fields as your need.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Taxonomy & Terms Query
                    </h3>
                    <p class="text-[16px]">By advance post query arguments you can query post by custom taxonomies & terms. you can also provide multiple taxonomies & terms with complex relations.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Custom Fields Query
                    </h3>
                    <p class="text-[16px]">By advance post query arguments you can query post by custom fields or meta field query. you can also provide multiple meta key value with complex relations.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">


                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Custom Fields Query
                    </h3>
                    <p class="text-[16px]">By advance post query arguments you can query post by custom fields or meta field query. you can also provide multiple meta key value with complex relations.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
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

            </div>









        </div>
    </div>


    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl mx-auto just">
            <div class="col-span-4 bg-white ">
                <div class="p-5">

                    <h3 class="text-lg inline-block mr-12 font-bold">Follow Us</h3>
                    <div class="inline-block  "><a class="p-2 " href=""><span class="dashicons   dashicons-facebook"></span></a></div>
                    <div class="inline-block "><a class="p-2 " href=""><span class="dashicons  dashicons-twitter"></span></a></div>
                    <div class="inline-block "><a class="p-2 " href=""><span class="dashicons  dashicons-pinterest"></span></a></div>
                    <div class="inline-block "><a class="p-2 " href=""><span class="dashicons  dashicons-linkedin"></span></a></div>

                </div>
            </div>
            <div class="col-span-8 bg-white ">
                <div class="p-5">

                    <a class="inline-block px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-400 text-white text-lg mx-2 hover:text-white " href="">Join Our Facebook Group</a>

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

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>

                </div>



            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <h3 class="text-2xl mb-5 font-bold text-gray-600">

                        Video Tutorials
                    </h3>
                    <p class="text-[16px]">Our content creator team is preparing video tutorials for you. Keep watching these and we have many more video tutorials on the pipeline.</p>

                    <a href="" class="inline-block mt-5 text-red-500	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> Watch on YouTube</a>

                </div>



            </div>

            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <h3 class="text-2xl mb-5 font-bold text-gray-600">
                        Need Support?
                    </h3>
                    <p class="text-[16px]">Do you have any question that need to be answered as soon as possible, our support tech person is ready to help you and resolve.</p>


                    <a href="" class="inline-block mt-5 text-indigo-700 font-bold	  py-2 rounded-sm  text-center text-lg"> Create Support Ticket</a>

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
                    <a href="" class="inline-block mt-5 text-amber-500 font-bold	  py-2 rounded-sm  text-center 		  text-lg  "> Write a Review</a>

                </div>

            </div>



        </div>
    </div>

</div>