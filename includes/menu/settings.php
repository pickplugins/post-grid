<?php
if (!defined('ABSPATH')) exit;  // if direct access


$current_tab = isset($_REQUEST['tab']) ? sanitize_text_field($_REQUEST['tab']) : 'general';

$post_grid_settings_tab = array();

$post_grid_settings_tab[] = array(
    'id' => 'general',
    'title' => sprintf(__('%s General', 'post-grid'), '<i class="fas fa-list-ul"></i>'),
    'priority' => 1,
    'active' => ($current_tab == 'general') ? true : false,
);

//$post_grid_settings_tab[] = array(
//    'id' => 'templates',
//    'title' => sprintf(__('%s Templates','post-grid'),'<i class="far fa-newspaper"></i>'),
//    'priority' => 3,
//    'active' => ($current_tab == 'templates') ? true : false,
//);

$post_grid_settings_tab[] = array(
    'id' => 'help_support',
    'title' => sprintf(__('%s Help & support', 'post-grid'), '<i class="fas fa-hands-helping"></i>'),
    'priority' => 90,
    'active' => ($current_tab == 'help_support') ? true : false,
);



$post_grid_settings_tab[] = array(
    'id' => 'buy_pro',
    'title' => sprintf(__('%s Buy Pro', 'post-grid'), '<i class="fas fa-store"></i>'),
    'priority' => 95,
    'active' => ($current_tab == 'buy_pro') ? true : false,
);







$post_grid_settings_tab = apply_filters('post_grid_settings_tabs', $post_grid_settings_tab);

$tabs_sorted = array();

if (!empty($post_grid_settings_tab))
    foreach ($post_grid_settings_tab as $page_key => $tab) $tabs_sorted[$page_key] = isset($tab['priority']) ? $tab['priority'] : 0;
array_multisort($tabs_sorted, SORT_ASC, $post_grid_settings_tab);



$post_grid_settings = get_option('post_grid_settings');

?>
<div class="wrap">


    <div class="p-5 bg-white">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6 ">

                <h2 class="text-[40px] font-black text-gray-600 ">
                    <a href="">Post Grid</a>
                    - 3.0.0
                </h2>

                <p class="text-lg">Welcome to Post Grid, Create Beautiful and Advance Grid and Post Loop Without Coding.</p>


            </div>
            <div class="col-span-6 text-right">

                <a href="" class="inline-block px-4 py-2 rounded-sm bg-blue-600 text-white text-lg mx-2 hover:text-white ">Create Support</a>


                <a href="" class="inline-block px-4 py-2 rounded-sm bg-blue-600 text-white text-lg mx-2 hover:text-white ">Documentation</a>



            </div>

        </div>

    </div>


    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl gap-10 mx-auto">
            <div class="col-span-8 bg-white">

                <div class="p-5">

                    <iframe width="100%" height="415" src="https://www.youtube.com/embed/5IJFpmTOFfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


                    <div class="text-center">

                        <a href="" class="inline-block mt-5 px-6 py-1 rounded-sm  text-center border-4 border-indigo-600	 text-gray-600  text-lg mx-2  ">Live Demo</a>
                        <a href="" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-600	 text-white text-lg mx-2 hover:text-white ">Plugin Details</a>

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

                        <li><span class="dashicons dashicons-format-status align-middle"></span> Comming More Blocks... </li>



                    </ul>







                    <a href="" class="inline-block mt-10 px-4 py-2 rounded-sm w-full text-center bg-amber-500		 text-white text-lg hover:text-white "><span class="text-2xl mr-3 dashicons dashicons-cart"></span> Buy Pro Version</a>
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


                    <a href="" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-500		 text-white text-lg hover:text-white "><span class="dashicons dashicons-buddicons-groups align-middle"></span> See Layouts Library</a>

                </div>
            </div>


        </div>
    </div>
    <div class=" my-10 container mx-auto">
        <div class="grid grid-cols-12 max-w-6xl mx-auto">


            <div class="col-span-6 bg-white">

                <div class="p-5 py-20">

                    <h3 class="text-3xl mb-5 font-bold text-gray-600">

                        <span class="text-4xl mr-3 dashicons dashicons-images-alt  "></span> Grid Layout Presets
                    </h3>

                    <p class="text-[16px]">Our Post Grid plugin is master for creating advance and complex layout for grid. We use most advantage for grid CSS to build beautifull and complex grid layout, Hope it will save your time and help you to create post grid quickly.</p>


                    <a href="" class="inline-block mt-5 px-4 py-2 rounded-sm  text-center bg-indigo-500		 text-white text-lg hover:text-white "><span class="dashicons dashicons-buddicons-groups align-middle"></span> See Grid Layout Presets</a>

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

                    <img src="https://img.freepik.com/free-vector/blue-voronoi-pattern-background_1409-1288.jpg?t=st=1655210997~exp=1655211597~hmac=b36a1567ffbfdac3fd733508d258978f33d9f7006b260735a5518a59048a2c7e&w=1480" alt="">

                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Paginations
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>
            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <img src="https://img.freepik.com/free-vector/blue-voronoi-pattern-background_1409-1288.jpg?t=st=1655210997~exp=1655211597~hmac=b36a1567ffbfdac3fd733508d258978f33d9f7006b260735a5518a59048a2c7e&w=1480" alt="">

                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Ready Post Layouts
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <img src="https://img.freepik.com/free-vector/blue-voronoi-pattern-background_1409-1288.jpg?t=st=1655210997~exp=1655211597~hmac=b36a1567ffbfdac3fd733508d258978f33d9f7006b260735a5518a59048a2c7e&w=1480" alt="">

                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Query Arguments
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <img src="https://img.freepik.com/free-vector/blue-voronoi-pattern-background_1409-1288.jpg?t=st=1655210997~exp=1655211597~hmac=b36a1567ffbfdac3fd733508d258978f33d9f7006b260735a5518a59048a2c7e&w=1480" alt="">

                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Complex Grid Layouts
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>

            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <img src="https://img.freepik.com/free-vector/blue-voronoi-pattern-background_1409-1288.jpg?t=st=1655210997~exp=1655211597~hmac=b36a1567ffbfdac3fd733508d258978f33d9f7006b260735a5518a59048a2c7e&w=1480" alt="">

                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        Advance Post Search
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
                </div>

            </div>


            <div class="col-span-6 bg-white ">

                <div class="p-5">

                    <img src="https://img.freepik.com/free-vector/blue-voronoi-pattern-background_1409-1288.jpg?t=st=1655210997~exp=1655211597~hmac=b36a1567ffbfdac3fd733508d258978f33d9f7006b260735a5518a59048a2c7e&w=1480" alt="">

                    <h3 class="text-2xl my-5 font-bold text-gray-600">

                        More Blocks
                    </h3>
                    <p class="text-[16px]">Read the documentations our techincal writer team already solve many issues for your needs. We update our documentation frequently.</p>

                    <a href="" class="inline-block mt-5 text-blue-700	 font-bold py-2 rounded-sm  text-center 		  text-lg  "> See Documentations</a>
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




    <div id="icon-tools" class="icon32"><br></div>
    <h2><?php echo esc_html(sprintf(__('%s Settings', 'post-grid'), post_grid_plugin_name)); ?></h2>
    <form method="post" action="<?php echo esc_url(str_replace('%7E', '~', esc_url($_SERVER['REQUEST_URI']))); ?>">
        <input type="hidden" name="post_grid_hidden" value="Y">
        <input type="hidden" name="tab" value="<?php echo esc_attr($current_tab); ?>">
        <?php
        if (!empty($_POST['post_grid_hidden'])) {
            $nonce = sanitize_text_field($_POST['_wpnonce']);
            if (wp_verify_nonce($nonce, 'post_grid_nonce') && $_POST['post_grid_hidden'] == 'Y') {
                do_action('post_grid_settings_save');
        ?>
                <div class="updated notice  is-dismissible">
                    <p><strong><?php _e('Changes Saved.', 'post-grid'); ?></strong></p>
                </div>
        <?php
            }
        }
        ?>
        <div class="settings-tabs-loading" style="">Loading...</div>
        <div class="settings-tabs vertical has-right-panel" style="display: none">
            <div class="settings-tabs-right-panel">
                <?php
                if (!empty($post_grid_settings_tab))
                    foreach ($post_grid_settings_tab as $tab) {
                        $id = $tab['id'];
                        $active = $tab['active'];
                ?>
                    <div class="right-panel-content <?php if ($active) echo 'active'; ?> right-panel-content-<?php echo esc_attr($id); ?>">
                        <?php
                        do_action('post_grid_settings_tabs_right_panel_' . $id);
                        ?>
                    </div>
                <?php
                    }
                ?>
            </div>
            <ul class="tab-navs">
                <?php
                if (!empty($post_grid_settings_tab))
                    foreach ($post_grid_settings_tab as $tab) {

                        $id = isset($tab['id']) ? $tab['id'] : '';
                        $title = isset($tab['title']) ? $tab['title'] : '';
                        $active = isset($tab['active']) ? $tab['active'] : '';
                        $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                        $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                        $is_pro = isset($tab['is_pro']) ? $tab['is_pro'] : false;
                        $pro_text = isset($tab['pro_text']) ? $tab['pro_text'] : '';
                ?>
                    <li <?php if (!empty($data_visible)) :  ?> data_visible="<?php echo esc_attr($data_visible); ?>" <?php endif; ?> class="tab-nav <?php if ($hidden) echo 'hidden'; ?> <?php if ($active) echo 'active'; ?>" data-id="<?php echo esc_attr($id); ?>">
                        <?php echo ($title); ?>
                        <?php
                        if ($is_pro) :
                        ?><span class="pro-feature"><?php echo esc_html($pro_text); ?></span> <?php
                                                                                            endif;
                                                                                                ?>
                    </li>
                <?php
                    }
                ?>
            </ul>
            <?php
            if (!empty($post_grid_settings_tab))
                foreach ($post_grid_settings_tab as $tab) {
                    $id = $tab['id'];
                    $title = $tab['title'];
                    $active = $tab['active'];
            ?>
                <div class="tab-content <?php if ($active) echo 'active'; ?>" id="<?php echo esc_attr($id); ?>">
                    <?php
                    do_action('post_grid_settings_content_' . $id, $tab);
                    ?>
                </div>
            <?php
                }
            ?>
            <div class="clear clearfix"></div>
            <p class="submit">
                <?php wp_nonce_field('post_grid_nonce'); ?>
                <input class="button button-primary" type="submit" name="Submit" value="<?php _e('Save Changes', 'post-grid'); ?>" />
            </p>
        </div>
    </form>
</div>