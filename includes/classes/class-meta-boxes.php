<?php
if (!defined('ABSPATH')) exit;  // if direct access

class post_grid_meta_boxs
{

    public function __construct()
    {


        // meta box for post_grid
        add_action('add_meta_boxes', array($this, 'post_grid'));
        add_action('save_post', array($this, 'post_grid_save'));

        // Post options
        add_action('add_meta_boxes', array($this, 'post_options'));
        add_action('save_post', array($this, 'post_options_save'));


        //meta box for "post_grid_layout"
        add_action('add_meta_boxes', array($this, 'post_grid_layout'));
        add_action('save_post', array($this, 'post_grid_layout_save'));
    }


    public function post_grid_layout($post_type)
    {

        add_meta_box('post-grid-layout', __('Layout data', 'post-grid'), array($this, 'post_grid_layout_display'), 'post_grid_layout', 'normal', 'high');
    }

    public function post_grid($post_type)
    {

        add_meta_box('post-grid', __('Post Grid Options', 'post-grid'), array($this, 'post_grid_display'), 'post_grid', 'normal', 'high');
        add_meta_box('post-grid-side', __('Post Grid Info', 'post-grid'), array($this, 'post_grid_side'), 'post_grid', 'side', 'low');
    }

    public function post_options($post_type)
    {

        $post_grid_settings = get_option('post_grid_settings');
        $post_options_post_types = isset($post_grid_settings['post_options_post_types']) ? $post_grid_settings['post_options_post_types'] : array('post');


        add_meta_box('post-grid-post-option', __('Post Grid - Post Options', 'post-grid'), array($this, 'post_options_display'), $post_options_post_types, 'normal', 'high');
    }





    public function post_grid_layout_display($post)
    {

        // Add an nonce field so we can check for it later.
        wp_nonce_field('post_grid_nonce_check', 'post_grid_nonce_check_value');

        $post_id = $post->ID;


        $settings_tabs_field = new settings_tabs_field();

        $post_grid_settings_tab = array();

        $post_grid_settings_tab[] = array(
            'id' => 'layout_builder',
            'title' => sprintf(__('%s Layout editor', 'post-grid'), '<i class="fas fa-qrcode"></i>'),
            'priority' => 4,
            'active' => true,
        );


        $post_grid_settings_tab[] = array(
            'id' => 'custom_scripts',
            'title' => sprintf(__('%s Custom scripts', 'post-grid'), '<i class="far fa-building"></i>'),
            'priority' => 5,
            'active' => false,
        );



        $post_grid_settings_tab = apply_filters('post_grid_layout_metabox_navs', $post_grid_settings_tab);

        $tabs_sorted = array();
        foreach ($post_grid_settings_tab as $page_key => $tab) $tabs_sorted[$page_key] = isset($tab['priority']) ? $tab['priority'] : 0;
        array_multisort($tabs_sorted, SORT_ASC, $post_grid_settings_tab);



        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-sortable');
        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_script('jquery-ui-accordion');
        wp_enqueue_script('wp-color-picker');
        wp_enqueue_style('wp-color-picker');


        wp_enqueue_style('jquery-ui');
        wp_enqueue_style('font-awesome-5');
        wp_enqueue_style('settings-tabs');
        wp_enqueue_script('settings-tabs');

        wp_enqueue_style('post-grid-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');

?>



        <div class="settings-tabs vertical">
            <ul class="tab-navs">
                <?php
                foreach ($post_grid_settings_tab as $tab) {
                    $id = $tab['id'];
                    $title = $tab['title'];
                    $active = $tab['active'];
                    $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                    $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                ?>
                    <li <?php if (!empty($data_visible)) :  ?> data_visible="<?php echo esc_attr($data_visible); ?>" <?php endif; ?> class="tab-nav <?php if ($hidden) echo 'hidden'; ?> <?php if ($active) echo 'active'; ?>" data-id="<?php echo esc_attr($id); ?>"><?php echo ($title); ?></li>
                <?php
                }
                ?>
            </ul>
            <?php
            foreach ($post_grid_settings_tab as $tab) {
                $id = $tab['id'];
                $title = $tab['title'];
                $active = $tab['active'];
            ?>

                <div class="tab-content <?php if ($active) echo 'active'; ?>" id="<?php echo esc_attr($id); ?>">
                    <?php
                    do_action('post_grid_layout_metabox_content_' . $id, $post_id);
                    ?>
                </div>
            <?php
            }
            ?>
        </div>
        <div class="clear clearfix"></div>

    <?php

    }




    public function post_grid_layout_save($post_id)
    {

        /*
         * We need to verify this came from the our screen and with
         * proper authorization,
         * because save_post can be triggered at other times.
         */

        // Check if our nonce is set.
        if (!isset($_POST['post_grid_nonce_check_value']))
            return $post_id;

        $nonce = sanitize_text_field($_POST['post_grid_nonce_check_value']);

        // Verify that the nonce is valid.
        if (!wp_verify_nonce($nonce, 'post_grid_nonce_check'))
            return $post_id;

        // If this is an autosave, our form has not been submitted,
        //     so we don't want to do anything.
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            return $post_id;

        // Check the user's permissions.
        if ('page' == $_POST['post_type']) {

            if (!current_user_can('edit_page', $post_id))
                return $post_id;
        } else {

            if (!current_user_can('edit_post', $post_id))
                return $post_id;
        }

        /* OK, its safe for us to save the data now. */

        // Sanitize the user input.
        //$grid_item_layout = post_grid_recursive_sanitize_arr($_POST['grid_item_layout']);


        // Update the meta field.
        //update_post_meta($post_id, 'grid_item_layout', $grid_item_layout);

        do_action('post_grid_layout_metabox_save', $post_id);
    }






    function post_grid_display($post)
    {

        global $post;
        wp_nonce_field('meta_boxes_post_grid_input', 'meta_boxes_post_grid_input_nonce');

        $post_id = $post->ID;
        $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);

        $grid_type =     $post_types = !empty($post_grid_meta_options['grid_type']) ? $post_grid_meta_options['grid_type'] : 'grid';
        $masonry_enable =     $post_types = !empty($post_grid_meta_options['masonry_enable']) ? $post_grid_meta_options['masonry_enable'] : 'no';

        //$grid_type = ($masonry_enable == 'yes') ? 'masonry' : $grid_type;

        $current_tab = isset($post_grid_meta_options['current_tab']) ? $post_grid_meta_options['current_tab'] : 'query_post';

        $settings_tabs_field =  new settings_tabs_field();

        $settings_tabs = array();



        $settings_tabs[] = array(
            'id' => 'shortcode',
            'title' => sprintf(__('%s Shortcode', 'post-grid'), '<i class="fas fa-laptop-code"></i>'),
            'priority' => 5,
            'active' => ($current_tab == 'shortcode') ? true : false,
        );

        $settings_tabs[] = array(
            'id' => 'general',
            'title' => sprintf(__('%s General', 'post-grid'), '<i class="fas fa-cogs"></i>'),
            'priority' => 10,
            'active' => ($current_tab == 'general') ? true : false,
        );

        $settings_tabs[] = array(
            'id' => 'query_post',
            'title' => sprintf(__('%s Query Post', 'post-grid'), '<i class="fas fa-cubes"></i>'),
            'priority' => 15,
            'active' => ($current_tab == 'query_post') ? true : false,
        );

        //        $settings_tabs[] = array(
        //            'id' => 'skin_layout',
        //            'title' => sprintf(__('%s Skin & Layout (Old)','post-grid'), '<i class="fas fa-magic"></i>'),
        //            'priority' => 20,
        //            'active' => ($current_tab == 'skin_layout') ? true : false,
        //        );


        $settings_tabs[] = array(
            'id' => 'grid_settings',
            'title' => sprintf(__('%s Grid settings', 'post-grid'), '<i class="fas fa-th"></i>'),
            'priority' => 30,
            'active' => ($current_tab == 'grid_settings') ? true : false,
            'data_visible' => 'grid   ',
            'hidden' => ((($grid_type == 'slider') ? true : false) || (($grid_type == 'masonry') ? true : false) || (($grid_type == 'justified') ? true : false) || (($grid_type == 'filterable') ? true : false) || (($grid_type == 'tiles') ? true : false)),

        );


        $settings_tabs[] = array(
            'id' => 'layouts',
            'title' => sprintf(__('%s Layouts', 'post-grid'), '<i class="fas fa-qrcode"></i>'),
            'priority' => 35,
            'active' => ($current_tab == 'layouts') ? true : false,
        );





        $settings_tabs[] = array(
            'id' => 'item_style',
            'title' => sprintf(__('%s Item style', 'post-grid'), '<i class="fas fa-qrcode"></i>'),
            'priority' => 38,
            'active' => ($current_tab == 'item_style') ? true : false,
        );



        $settings_tabs[] = array(
            'id' => 'masonry',
            'title' => sprintf(__('%s Masonry', 'post-grid'), '<i class="fas fa-th-large"></i>'),
            'priority' => 40,
            'active' => ($current_tab == 'masonry') ? true : false,
            'data_visible' => 'masonry',
            'hidden' => ((($grid_type == 'grid') ? true : false) || (($grid_type == 'tiles') ? true : false) || (($grid_type == 'slider') ? true : false) || (($grid_type == 'justified') ? true : false) || (($grid_type == 'filterable') ? true : false) || (($grid_type == 'glossary') ? true : false)),
        );


        $settings_tabs[] = array(
            'id' => 'justified',
            'title' => sprintf(__('%s Justified', 'post-grid'), '<i class="fas fa-th-large"></i>'),
            'priority' => 40,
            'active' => ($current_tab == 'justified') ? true : false,
            'data_visible' => 'justified',
            'hidden' => ((($grid_type == 'grid') ? true : false) || (($grid_type == 'tiles') ? true : false) || (($grid_type == 'slider') ? true : false) || (($grid_type == 'masonry') ? true : false) || (($grid_type == 'filterable') ? true : false) || (($grid_type == 'glossary') ? true : false)),
        );

        $settings_tabs[] = array(
            'id' => 'tiles',
            'title' => sprintf(__('%s Tiles', 'post-grid'), '<i class="fas fa-th-large"></i>'),
            'priority' => 40,
            'active' => ($current_tab == 'tiles') ? true : false,
            'data_visible' => 'tiles',
            'hidden' => ((($grid_type == 'grid') ? true : false) ||  (($grid_type == 'slider') ? true : false) || (($grid_type == 'masonry') ? true : false) || (($grid_type == 'filterable') ? true : false)) || (($grid_type == 'justified') ? true : false) || (($grid_type == 'glossary') ? true : false),
        );


        $settings_tabs[] = array(
            'id' => 'pagination',
            'title' => sprintf(__('%s Pagination', 'post-grid'), '<i class="fas fa-pager"></i>'),
            'priority' => 45,
            'active' => ($current_tab == 'pagination') ? true : false,
            'data_visible' => ' grid justified masonry tiles glossary timeline filterable collapsible',
            'hidden' => ($grid_type == 'slider') ? true : false,
        );

        $settings_tabs[] = array(
            'id' => 'custom_scripts',
            'title' => sprintf(__('%s Custom Scripts', 'post-grid'), '<i class="fas fa-code"></i>'),
            'priority' => 50,
            'active' => ($current_tab == 'custom_scripts') ? true : false,
        );

        $settings_tabs[] = array(
            'id' => 'search',
            'title' => sprintf(__('%s Search', 'post-grid'), '<i class="fas fa-search"></i>'),
            'priority' => 55,
            'active' => ($current_tab == 'search') ? true : false,
        );

        $settings_tabs = apply_filters('post_grid_metabox_tabs', $settings_tabs);

        //var_dump($settings_tabs);


        $tabs_sorted = array();
        foreach ($settings_tabs as $page_key => $tab) $tabs_sorted[$page_key] = isset($tab['priority']) ? $tab['priority'] : 0;
        array_multisort($tabs_sorted, SORT_ASC, $settings_tabs);

        wp_enqueue_style('post-grid-output', post_grid_plugin_url . '/dist/output.css', [], time(), 'all');

    ?>

        <div id="post-grid-editor">
            <?php

            do_action('postgrid_editor', $post_id)
            ?>
        </div>


        <div class="post-grid-meta-box">

            <script>
                jQuery(document).ready(function($) {

                    var griType = '<?php echo esc_attr($grid_type); ?>'


                    if (griType == 'filterable' || griType == 'glossary') {
                        $('[for="pagination_type-none"]').fadeOut();
                        $('[for="pagination_type-normal"]').fadeOut();
                        $('[for="pagination_type-ajax_pagination"]').fadeOut();
                        $('[for="pagination_type-next_previous"]').fadeOut();
                        $('[for="pagination_type-loadmore"]').fadeOut();
                        $('[for="pagination_type-jquery"]').fadeIn();


                    } else {


                        $('[for="pagination_type-none"]').fadeIn();
                        $('[for="pagination_type-normal"]').fadeIn();
                        $('[for="pagination_type-ajax_pagination"]').fadeIn();
                        $('[for="pagination_type-next_previous"]').fadeIn();
                        $('[for="pagination_type-loadmore"]').fadeIn();
                        $('[for="pagination_type-jquery"]').fadeOut();

                    }



                    $(document).on('click', '#post-grid-view-types .radio-img label', function() {
                        var val = $(this).attr('data-value');


                        if (val == 'filterable' || val == 'glossary') {
                            $('[for="pagination_type-none"]').fadeOut();
                            $('[for="pagination_type-normal"]').fadeOut();
                            $('[for="pagination_type-ajax_pagination"]').fadeOut();
                            $('[for="pagination_type-next_previous"]').fadeOut();
                            $('[for="pagination_type-loadmore"]').fadeOut();
                            $('[for="pagination_type-jquery"]').fadeIn();


                        } else {


                            $('[for="pagination_type-none"]').fadeIn();
                            $('[for="pagination_type-normal"]').fadeIn();
                            $('[for="pagination_type-ajax_pagination"]').fadeIn();
                            $('[for="pagination_type-next_previous"]').fadeIn();
                            $('[for="pagination_type-loadmore"]').fadeIn();
                            $('[for="pagination_type-jquery"]').fadeOut();

                        }



                        if (!$(this).hasClass('disabled')) {
                            $('.settings-tabs .tab-navs li').each(function(index) {
                                data_visible = $(this).attr('data_visible');
                                if (typeof data_visible != 'undefined') {
                                    n = data_visible.indexOf(val);
                                    if (n < 0) {
                                        $(this).hide();
                                    } else {
                                        $(this).show();
                                    }
                                } else {}
                            });
                        }


                    })








                })
            </script>

            <div class="settings-tabs vertical">
                <input class="current_tab" type="hidden" name="post_grid_meta_options[current_tab]" value="<?php echo esc_attr($current_tab); ?>">

                <?php


                $view_types_args['grid'] = array('name' => 'Grid',  'thumb' => post_grid_plugin_url . 'assets/admin/images/grid.png',);
                $view_types_args['masonry'] = array('name' => 'Masonry',  'thumb' => post_grid_plugin_url . 'assets/admin/images/masonry.png',);
                $view_types_args['justified'] = array('name' => 'Justified',  'thumb' => post_grid_plugin_url . 'assets/admin/images/justified.png',);
                $view_types_args['tiles'] = array('name' => 'Tiles',  'thumb' => post_grid_plugin_url . 'assets/admin/images/tiles.png',);

                $view_types_args['filterable'] = array('name' => 'Filterable',  'disabled' => true, 'pro_msg' => 'Pro', 'thumb' => post_grid_plugin_url . 'assets/admin/images/filterable.png',);
                $view_types_args['glossary'] = array('name' => 'Glossary', 'disabled' => true, 'pro_msg' => 'Pro', 'thumb' => post_grid_plugin_url . 'assets/admin/images/glossary.png',);
                $view_types_args['slider'] = array('name' => 'Carousel', 'disabled' => true, 'pro_msg' => 'Pro',  'thumb' => post_grid_plugin_url . 'assets/admin/images/carousel.png',);



                $view_types_args = apply_filters('post_grid_view_types', $view_types_args);


                ?>
                <div id="post-grid-view-types">

                    <?php

                    $args = array(
                        'id'        => 'grid_type',
                        'parent'        => 'post_grid_meta_options',
                        'title'        => __('View Type', 'post-grid'),
                        'details'    => '',
                        'type'        => 'radio_image',
                        'value'        => $grid_type,
                        'default'        => '',
                        'width'        => '100px',
                        'lazy_load_img'        => post_grid_plugin_url . 'assets/admin/images/loading.gif',

                        'args'        => $view_types_args,
                    );

                    $settings_tabs_field->generate_field($args);

                    ?>

                </div>

                <?php












                ?>


                <ul class="tab-navs">
                    <?php
                    foreach ($settings_tabs as $tab) {
                        $id = isset($tab['id']) ? $tab['id'] : '';
                        $title = isset($tab['title']) ? $tab['title'] : '';
                        $active = isset($tab['active']) ? $tab['active'] : '';
                        $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                        $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                    ?>
                        <li <?php if (!empty($data_visible)) :  ?> data_visible="<?php echo esc_attr($data_visible); ?>" <?php endif; ?> class="tab-nav <?php if ($hidden) echo 'hidden'; ?> <?php if ($active) echo 'active'; ?>" data-id="<?php echo esc_attr($id); ?>"><?php echo $title; ?></li>
                    <?php
                    }
                    ?>
                </ul>
                <?php
                foreach ($settings_tabs as $tab) {

                    $id = isset($tab['id']) ? $tab['id'] : '';
                    $title = isset($tab['title']) ? $tab['title'] : '';
                    $active = isset($tab['active']) ? $tab['active'] : '';


                ?>

                    <div class="tab-content <?php if ($active) echo 'active'; ?>" id="<?php echo esc_attr($id); ?>">
                        <?php
                        do_action('post_grid_metabox_tabs_content_' . $id, $tab, $post_id);
                        ?>
                    </div>
                <?php
                }
                ?>
            </div>
            <div class="clear clearfix"></div>

        </div>










    <?php



    }


    function post_grid_save($post_id)
    {

        /*
         * We need to verify this came from the our screen and with proper authorization,
         * because save_post can be triggered at other times.
         */

        // Check if our nonce is set.
        if (!isset($_POST['meta_boxes_post_grid_input_nonce']))
            return $post_id;

        $nonce = sanitize_text_field($_POST['meta_boxes_post_grid_input_nonce']);

        // Verify that the nonce is valid.
        if (!wp_verify_nonce($nonce, 'meta_boxes_post_grid_input'))
            return $post_id;

        // If this is an autosave, our form has not been submitted, so we don't want to do anything.
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            return $post_id;



        /* OK, its safe for us to save the data now. */

        // Sanitize user input.
        //$post_grid_collapsible = sanitize_text_field( $_POST['post_grid_collapsible'] );


        $post_grid_meta_options = post_grid_recursive_sanitize_arr($_POST['post_grid_meta_options']);
        update_post_meta($post_id, 'post_grid_meta_options', $post_grid_meta_options);
    }


    function post_grid_side($post)
    {

    ?>




        <div class="post-grid-meta-box">


            <ul>
                <li>Post Grid Version: <?php echo esc_html(post_grid_version); ?></li>

            </ul>
            <br><br>
            <h3>Try Pro</h3>
            <br>
            <a class="button" href="https://www.pickplugins.com/post-grid/" target="_blank">Buy Pro</a>
            <p class="description">If you are looking some extra feature you may try our premium version.</p>
            <br><br>
            <h3>Documentation</h3>
            <br>
            <a class="button" href="https://www.pickplugins.com/documentation/post-grid/?ref=dashboard" target="_blank">Documentation</a>
            <p class="description">Before asking, submitting reviews please take a look on our documentation, may help your issue fast.</p>
            <br><br>
            <h3>Video Tutorials</h3>
            <br>
            <a class="button" href="https://www.youtube.com/playlist?list=PL0QP7T2SN94bpTVghETSePuVvRROpuEW6" target="_blank">Go to YouTube</a>

            <br><br>
            <h3>Looking for support?</h3>
            <br>
            <a class="button" href="https://pickplugins.com/create-support-ticket/" target="_blank">Create Support Ticket</a>
            <p class="description">Its free and you can ask any question about our plugins and get support fast.</p>
            <br><br>
            <h3>Provide your feedback</h3>
            <br>
            <a class="button" href="https://wordpress.org/support/plugin/post-grid/reviews/#new-post" target="_blank">Submit Reviews</a> <a class="button" href="https://wordpress.org/support/plugin/post-grid/#new-topic-0" target="_blank">Ask wordpress.org</a>
            <p>We spent thousand+ hours to development on this plugin, please submit your reviews wisely.</p>
            <p>If you have any issue with this plugin please submit our forums or contact our support first.</p>
            <p class="description">Your feedback and reviews are most important things to keep our development on track. If you have time please submit us five star <a href="https://wordpress.org/support/plugin/post-grid/reviews/"><span style="color: orange"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></a> reviews.</p>


        </div>
    <?php

    }



    function post_options_display($post)
    {

        global $post;
        wp_nonce_field('post_grid_post_settings_input', 'post_grid_post_settings_input_nonce');

        $post_id = $post->ID;
        $post_grid_post_settings = get_post_meta($post_id, 'post_grid_post_settings', true);


        $post_grid_settings_tab = array();
        $current_tab = isset($post_grid_post_settings['current_tab']) ? $post_grid_post_settings['current_tab'] : 'options';


        $post_grid_settings_tab[] = array(
            'id' => 'options',
            'title' => sprintf(__('%s Options', 'post-grid'), '<i class="fas fas fa-tools"></i>'),
            'priority' => 1,
            'active' => ($current_tab == 'options') ? true : false,
        );


        $post_grid_settings_tabs = apply_filters('post_grid_post_options_tabs', $post_grid_settings_tab);


        $tabs_sorted = array();
        foreach ($post_grid_settings_tabs as $page_key => $tab) $tabs_sorted[$page_key] = isset($tab['priority']) ? $tab['priority'] : 0;
        array_multisort($tabs_sorted, SORT_ASC, $post_grid_settings_tabs);

        $settings_tabs_field = new settings_tabs_field();
        $settings_tabs_field->admin_scripts();

    ?>

        <div class="settings-tabs vertical">
            <input class="current_tab" type="hidden" name="post_grid_post_settings[current_tab]" value="<?php echo esc_attr($current_tab); ?>">

            <ul class="tab-navs">
                <?php
                foreach ($post_grid_settings_tabs as $tab) {
                    $id = $tab['id'];
                    $title = $tab['title'];
                    $active = $tab['active'];
                    $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                    $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                ?>
                    <li <?php if (!empty($data_visible)) :  ?> data_visible="<?php echo esc_attr($data_visible); ?>" <?php endif; ?> class="tab-nav <?php if ($hidden) echo 'hidden'; ?> <?php if ($active) echo 'active'; ?>" data-id="<?php echo esc_attr($id); ?>"><?php echo ($title); ?></li>
                <?php
                }
                ?>
            </ul>
            <?php
            foreach ($post_grid_settings_tabs as $tab) {
                $id = $tab['id'];
                $title = $tab['title'];
                $active = $tab['active'];


            ?>

                <div class="tab-content <?php if ($active) echo 'active'; ?>" id="<?php echo esc_attr($id); ?>">
                    <?php
                    do_action('post_grid_post_options_content_' . $id, $tab, $post_id);
                    ?>
                </div>
            <?php
            }
            ?>
        </div>
        <div class="clear clearfix"></div>


<?php

    }


    function post_options_save($post_id)
    {

        /*
         * We need to verify this came from the our screen and with proper authorization,
         * because save_post can be triggered at other times.
         */

        // Check if our nonce is set.
        if (!isset($_POST['post_grid_post_settings_input_nonce']))
            return $post_id;

        $nonce = sanitize_text_field($_POST['post_grid_post_settings_input_nonce']);

        // Verify that the nonce is valid.
        if (!wp_verify_nonce($nonce, 'post_grid_post_settings_input'))
            return $post_id;

        // If this is an autosave, our form has not been submitted, so we don't want to do anything.
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            return $post_id;

        /* OK, its safe for us to save the data now. */

        // Sanitize user input.
        $post_grid_post_settings = post_grid_recursive_sanitize_arr($_POST['post_grid_post_settings']);
        update_post_meta($post_id, 'post_grid_post_settings', $post_grid_post_settings);
    }
}


new post_grid_meta_boxs();
