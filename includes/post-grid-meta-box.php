<?php
if ( ! defined('ABSPATH')) exit;  // if direct access


/**
 * Adds a box to the main column on the Post and Page edit screens.
 */
function meta_boxes_post_grid(){

    $screens = array( 'post_grid' );
    global $post;
    $post_id = $post->ID;




    foreach ( $screens as $screen ){
        add_meta_box('post_grid_metabox',__('Post Grid Options', 'post-grid'),'meta_boxes_post_grid_input', $screen);
        add_meta_box('post_grid_metabox_side',__('Post Grid Information', 'post-grid'),'meta_boxes_post_grid_side', $screen,'side');
    }



}
add_action( 'add_meta_boxes', 'meta_boxes_post_grid' );





function meta_boxes_post_grid_input( $post ) {

    global $post;
    wp_nonce_field( 'meta_boxes_post_grid_input', 'meta_boxes_post_grid_input_nonce' );

    $post_id = $post->ID;
    $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);

    $grid_type =     $post_types = !empty($post_grid_meta_options['grid_type']) ? $post_grid_meta_options['grid_type'] : 'grid';

    $current_tab = isset($post_grid_meta_options['current_tab']) ? $post_grid_meta_options['current_tab'] : 'query_post';

    $settings_tabs_field =  new settings_tabs_field();

    $settings_tabs = array();

    //var_dump($current_tab);
    //var_dump($grid_type);


    $settings_tabs[] = array(
        'id' => 'shortcode',
        'title' => sprintf(__('%s Shortcode','post-grid'), '<i class="fas fa-laptop-code"></i>'),
        'priority' => 5,
        'active' => ($current_tab == 'shortcode') ? true : false,
    );

    $settings_tabs[] = array(
        'id' => 'general',
        'title' => sprintf(__('%s General','post-grid'), '<i class="fas fa-cogs"></i>'),
        'priority' => 10,
        'active' => ($current_tab == 'general') ? true : false,
    );

    $settings_tabs[] = array(
        'id' => 'query_post',
        'title' => sprintf(__('%s Query Post','post-grid'), '<i class="fas fa-cubes"></i>'),
        'priority' => 15,
        'active' => ($current_tab == 'query_post') ? true : false,
    );

    $settings_tabs[] = array(
        'id' => 'skin_layout',
        'title' => sprintf(__('%s Skin & Layout (Old)','post-grid'), '<i class="fas fa-magic"></i>'),
        'priority' => 20,
        'active' => ($current_tab == 'skin_layout') ? true : false,
    );

    $settings_tabs[] = array(
        'id' => 'layouts',
        'title' => sprintf(__('%s Layouts (New)','post-grid'),'<i class="fas fa-qrcode"></i>'),
        'priority' => 30,
        'active' => ($current_tab == 'layouts') ? true : false,
    );



    $settings_tabs[] = array(
        'id' => 'grid_settings',
        'title' => sprintf(__('%s Grid settings','post-grid'), '<i class="fas fa-th"></i>'),
        'priority' => 35,
        'active' => ($current_tab == 'grid_settings') ? true : false,
        'data_visible' => 'grid',
        'hidden' => ($grid_type == 'grid')? false : true ,
    );

    $settings_tabs[] = array(
        'id' => 'item_style',
        'title' => sprintf(__('%s Item style','post-grid'),'<i class="fas fa-qrcode"></i>'),
        'priority' => 38,
        'active' => ($current_tab == 'item_style') ? true : false,
    );



    $settings_tabs[] = array(
        'id' => 'masonry',
        'title' => sprintf(__('%s Masonry','post-grid'), '<i class="fas fa-th-large"></i>'),
        'priority' => 40,
        'active' => ($current_tab == 'masonry') ? true : false,
        'data_visible' => 'grid glossary timeline filterable',
        'hidden' => ($grid_type == 'slider')? true : false ,
    );

    $settings_tabs[] = array(
        'id' => 'pagination',
        'title' => sprintf(__('%s Pagination','post-grid'), '<i class="fas fa-pager"></i>'),
        'priority' => 45,
        'active' => ($current_tab == 'pagination') ? true : false,
        'data_visible' => ' grid glossary timeline filterable collapsible',
        'hidden' => ($grid_type == 'slider')? true : false ,
    );

    $settings_tabs[] = array(
        'id' => 'custom_scripts',
        'title' => sprintf(__('%s Custom Scripts','post-grid'), '<i class="fas fa-code"></i>'),
        'priority' => 50,
        'active' => ($current_tab == 'custom_scripts') ? true : false,
    );

    $settings_tabs[] = array(
        'id' => 'search',
        'title' => sprintf(__('%s Search','post-grid'), '<i class="fas fa-search"></i>'),
        'priority' => 55,
        'active' => ($current_tab == 'search') ? true : false,
    );

    $settings_tabs = apply_filters('post_grid_metabox_tabs', $settings_tabs);

    //var_dump($settings_tabs);


    $tabs_sorted = array();
    foreach ($settings_tabs as $page_key => $tab) $tabs_sorted[$page_key] = isset( $tab['priority'] ) ? $tab['priority'] : 0;
    array_multisort($tabs_sorted, SORT_ASC, $settings_tabs);




    //var_dump($current_tab);



    ?>

    <div class="post-grid-meta-box">

        <script>
            jQuery(document).ready(function($){
                $(document).on('click', '.settings-tabs input[name="post_grid_meta_options[grid_type]"]', function(){
                    var val = $(this).val();
                    console.log( val );
                    $('.settings-tabs .tab-navs li').each(function( index ) {
                        data_visible = $( this ).attr('data_visible');
                        if(typeof data_visible != 'undefined'){
                            n = data_visible.indexOf(val);
                            if(n<0){
                                $( this ).hide();
                            }else{
                                $( this ).show();
                            }
                        }else{
                            console.log('Not matched: '+ data_visible );
                        }
                    });
                })
            })
        </script>

        <div class="settings-tabs vertical">
            <input class="current_tab" type="hidden" name="post_grid_meta_options[current_tab]" value="<?php echo $current_tab; ?>">

            <?php


            $args = array(
                'id'		=> 'grid_type',
                'parent'		=> 'post_grid_meta_options',
                'title'		=> __('View Type','team'),
                'details'	=> '',
                'type'		=> 'radio',
                'value'		=> $grid_type,
                'default'		=> '',
                'args'		=> apply_filters('post_grid_view_types', array('grid' => 'Normal grid' )),
            );

            $settings_tabs_field->generate_field($args);

            ?>


            <ul class="tab-navs">
                <?php
                foreach ($settings_tabs as $tab){
                    $id = $tab['id'];
                    $title = $tab['title'];
                    $active = $tab['active'];
                    $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                    $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                    ?>
                    <li <?php if(!empty($data_visible)):  ?> data_visible="<?php echo $data_visible; ?>" <?php endif; ?> class="tab-nav <?php if($hidden) echo 'hidden';?> <?php if($active) echo 'active';?>" data-id="<?php echo $id; ?>"><?php echo $title; ?></li>
                    <?php
                }
                ?>
            </ul>
            <?php
            foreach ($settings_tabs as $tab){
                $id = $tab['id'];
                $title = $tab['title'];
                $active = $tab['active'];


                ?>

                <div class="tab-content <?php if($active) echo 'active';?>" id="<?php echo $id; ?>">
                    <?php
                    do_action('post_grid_metabox_tabs_content_'.$id, $tab, $post_id);
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



function meta_boxes_post_grid_side( $post ) {

    ?>
    <div class="plugin-help-search">
        <input type="search" value="" placeholder="Start typing">

        <ul>

            <?php
            $class_post_grid_support = new class_post_grid_support();

            $video_tutorials =  $class_post_grid_support->video_tutorials();

            foreach($video_tutorials as $item){
                $url = isset($item['url']) ?$item['url'] : '';
                $title = isset($item['title']) ?$item['title'] : '';
                $keywords = isset($item['keywords']) ? $item['keywords'] : '';

                ?>
                <li keywords="<?php echo $keywords; ?>" class="item">
                    <a target="_blank" href="<?php echo $url; ?>"><i class="far fa-dot-circle"></i> <?php echo $title; ?></a>

                </li>
                <?php

            }

            ?>


        </ul>
    </div>



    <style type="text/css">
        .plugin-help-search{}
        .plugin-help-search input[type=search]{
            width: 100%;
        }
    </style>

    <script>
        jQuery(document).ready(function($){
            jQuery(document).on('keyup', '.plugin-help-search input', function(){
                keyword = jQuery(this).val().toLowerCase();
                content_body = [];

                console.log(keyword);

                $('.plugin-help-search li').each(function( index ) {
                    $( this ).hide();
                    content = $( this ).text().toLowerCase();
                    content_body[index] = content;
                    n = content_body[index].indexOf(keyword);
                    if(n<0){
                        $( this ).hide();
                    }else{
                        $( this ).show();
                    }
                });
            })
        })
    </script>




    <div class="post-grid-meta-box">






        <ul>
            <li>Post Grid Version: <?php echo post_grid_version; ?></li>
            <li>Tested WP: 5.4</li>

        </ul>

        <h3>Try Pro</h3>
        <a class="button" href="https://www.pickplugins.com/item/post-grid-create-awesome-grid-from-any-post-type-for-wordpress/?ref=dashboard" target="_blank">Buy Pro</a><p class="description">If you are looking some extra feature you may try our premium version.</p>

        <h3>Documentation</h3>
        <a class="button" href="https://www.pickplugins.com/documentation/post-grid/?ref=dashboard" target="_blank">Documentation</a><p class="description">Before asking, submitting reviews please take a look on our documentation, may help your issue fast.</p>

        <h3>Looking for support?</h3>
        <a class="button" href="https://www.pickplugins.com/forum/?ref=dashboard" target="_blank">Create Support Ticket</a><p class="description">Its free and you can ask any question about our plugins and get support fast.</p>

        <h3>Provide your feedback</h3>

        <a class="button" href="https://wordpress.org/support/plugin/post-grid/reviews/#new-post" target="_blank">Submit Reviews</a> <a class="button" href="https://wordpress.org/support/plugin/post-grid/#new-topic-0" target="_blank">Ask wordpress.org</a><p>We spent thousand+ hours to development on this plugin, please submit your reviews wisely.</p><p>If you have any issue with this plugin please submit our forums or contact our support first.</p><p class="description">Your feedback and reviews are most important things to keep our development on track. If you have time please submit us five star <a href="https://wordpress.org/support/plugin/post-grid/reviews/"><span style="color: orange"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></a> reviews.</p>




        <h3>Video Tutorials</h3>
        <p class="description">Some tutorial contain pro features.</p>
        <div class="faq">
            <?php


            ?>

        </div>










    </div>
    <?php

}








/**
 * When the post is saved, saves our custom data.
 *
 * @param int $post_id The ID of the post being saved.
 */



function meta_boxes_post_grid_save( $post_id ) {

    /*
     * We need to verify this came from the our screen and with proper authorization,
     * because save_post can be triggered at other times.
     */

    // Check if our nonce is set.
    if ( ! isset( $_POST['meta_boxes_post_grid_input_nonce'] ) )
        return $post_id;

    $nonce = $_POST['meta_boxes_post_grid_input_nonce'];

    // Verify that the nonce is valid.
    if ( ! wp_verify_nonce( $nonce, 'meta_boxes_post_grid_input' ) )
        return $post_id;

    // If this is an autosave, our form has not been submitted, so we don't want to do anything.
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
        return $post_id;



    /* OK, its safe for us to save the data now. */

    // Sanitize user input.
    //$post_grid_collapsible = sanitize_text_field( $_POST['post_grid_collapsible'] );


    $post_grid_meta_options = stripslashes_deep( $_POST['post_grid_meta_options'] );
    update_post_meta( $post_id, 'post_grid_meta_options', $post_grid_meta_options );





}
add_action( 'save_post', 'meta_boxes_post_grid_save' );



