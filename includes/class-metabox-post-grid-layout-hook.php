<?php
if ( ! defined('ABSPATH')) exit;  // if direct access


add_action('post_grid_layout_metabox_content_custom_scripts','post_grid_layout_metabox_content_custom_scripts');

if(!function_exists('post_grid_layout_metabox_content_custom_scripts')){
    function post_grid_layout_metabox_content_custom_scripts($post_id){


        $settings_tabs_field = new settings_tabs_field();
        $custom_scripts = get_post_meta($post_id,'custom_scripts', true);
        $layout_options = get_post_meta($post_id,'layout_options', true);


        $custom_css = isset($custom_scripts['custom_css']) ? $custom_scripts['custom_css'] : '';
        $custom_js = isset($custom_scripts['custom_js']) ? $custom_scripts['custom_js'] : '';
        $layout_preview_img = isset($layout_options['layout_preview_img']) ? $layout_options['layout_preview_img'] : '';




        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Custom scripts', 'woocommerce-products-slider'); ?></div>
            <p class="description section-description"><?php echo __('Write custom scripts to override CSS and scripts.', 'woocommerce-products-slider'); ?></p>


            <?php
            $args = array(
                'id'		=> 'custom_css',
                'parent'		=> 'custom_scripts',
                'title'		=> __('Custom CSS','woocommerce-products-slider'),
                'details'	=> __('Write custom CSS to override default style, do not use <code>&lt;style>&lt;/style></code> tag. use <code>__ID__</code> to replace by layout id <code>layout-'.$post_id.'</code>.','woocommerce-products-slider'),
                'type'		=> 'scripts_css',
                'value'		=> $custom_css,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'custom_js',
                'parent'		=> 'custom_scripts',
                'title'		=> __('Custom JS','woocommerce-products-slider'),
                'details'	=> __('Write custom JS to override default style, do not use <code>&lt;script>&lt;/script></code> tag.','woocommerce-products-slider'),
                'type'		=> 'scripts_js',
                'value'		=> $custom_js,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'layout_preview_img',
                'parent'		=> 'layout_options',
                'title'		=> __('Preview image','woocommerce-products-slider'),
                'details'	=> __('Set layout preview image.','woocommerce-products-slider'),
                'type'		=> 'media_url',
                'value'		=> $layout_preview_img,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);





            ?>
        </div>
        <?php


    }

}








add_action('post_grid_layout_metabox_content_layout_builder','post_grid_layout_metabox_content_layout_builder');

if(!function_exists('post_grid_layout_metabox_content_layout_builder')){

    function post_grid_layout_metabox_content_layout_builder($post_id){


        $settings_tabs_field = new settings_tabs_field();

        $layout_elements_data = get_post_meta($post_id,'layout_elements_data', true);



        ?>
        <div class="section">
            <div class="section-title"><?php echo __('Layout builder', 'woocommerce-products-slider'); ?></div>
            <p class="description section-description"><?php echo __('Customize layout settings.', 'woocommerce-products-slider'); ?></p>
            <div class="setting-field ">

                <?php

                $elements_group['general'] = array(
                    'group_title'=>'General',
                    'items'=>array(
                        'wrapper_start'=>array('name' =>__('Wrapper start','woocommerce-products-slider')),
                        'wrapper_end'=>array('name' =>__('Wrapper start','woocommerce-products-slider')),
                        'custom_text'=>array('name' =>__('Custom text','woocommerce-products-slider')),
                        'title'=>array('name' =>__('Post title','woocommerce-products-slider')),
                        'title_link'=>array('name' =>__('Title with link','woocommerce-products-slider')),
                        'read_more'=>array('name' =>__('Read more','woocommerce-products-slider')),
                        'thumb'=>array('name' =>__('Thumbnail','woocommerce-products-slider')),
                        'thumb_link'=>array('name' =>__('thumb with link ','woocommerce-products-slider')),

                        'excerpt'=>array('name' =>__('Post excerpt','woocommerce-products-slider')),
                        'excerpt_read_more'=>array('name' =>__('excerpt with','woocommerce-products-slider')),
                        'content'=>array('name' =>__('Content','woocommerce-products-slider')),
                        'post_date'=>array('name' =>__('Post date','woocommerce-products-slider')),
                        'author'=>array('name' =>__('Author','woocommerce-products-slider')),
                        'author_link'=>array('name' =>__('Author with link','woocommerce-products-slider')),
                        'categories'=>array('name' =>__('Categories','woocommerce-products-slider')),
                        'tags'=>array('name' =>__('Tags','woocommerce-products-slider')),
                        'comments_count'=>array('name' =>__('Comments count','woocommerce-products-slider')),
                        'share_button'=>array('name' =>__('Share button','woocommerce-products-slider')),
                        'hr'=>array('name' =>__('Horizontal line','woocommerce-products-slider')),
                        'five_star'=>array('name' =>__('Five star','woocommerce-products-slider')),


                        ),

                );





                $elements_group['woo'] = array('group_title'=>'WooCommerce');
                $elements_group['edd'] = array('group_title'=>'Easy Digital Download');
                $elements_group['acf'] = array('group_title'=>'Advance Field Manager');
                $elements_group['events_manager'] = array('group_title'=>'Events manager');





                $elements_group = apply_filters('post_grid_layout_elements', $elements_group);


                $layout_elements_option = array();

                if(!empty($elements_group))
                    foreach ($elements_group as $group_index => $element_group):
                        $group_items = $element_group['items'];

                        foreach ($group_items as $elementIndex => $element):
                            ob_start();

                            do_action('post_grid_layout_elements_option_'.$elementIndex);

                            $layout_elements_option[$elementIndex] = ob_get_clean();
                        endforeach;
                endforeach;


                ?>

                <script>
                    jQuery(document).ready(function($){
                        layout_elements_option = <?php echo json_encode($layout_elements_option); ?>;

                        $(document).on('click','.layout-tags .element_index',function(){
                            tag_id = $(this).attr('tag_id');
                            input_name = $(this).attr('input_name');
                            id = $.now();

                            console.log(id);

                            tag_options_html = layout_elements_option[tag_id];
                            var res = tag_options_html.replace("{input_name}", input_name+'['+id+']');

                            $('.layout-elements').append(res);

                        })
                    })
                </script>

                <div class="layout-builder">
                    <div class="layout-tags expandable">



                        <?php

                        if(!empty($elements_group))
                            foreach ($elements_group as $group_index => $element_group):

                                $group_title = $element_group['group_title'];
                                $group_items = $element_group['items'];

                                ?>
                                <div class="item">
                                    <div class="element-title header ">
                                        <span class="expand"><i class="fas fa-expand"></i><i class="fas fa-compress"></i></span>
                                        <span class="expand"><?php echo $group_title; ?></span>
                                    </div>
                                    <div class="element-options options">
                                        <?php
                                        foreach ($group_items as $elementIndex => $element):
                                            $element_name = isset($element['name']) ? $element['name'] : '';
                                            ?>
                                            <span class="element_index" input_name="<?php echo 'layout_elements_data'; ?>"  tag_id="<?php echo $elementIndex; ?>"><?php echo $element_name; ?></span>
                                            <?php
                                        endforeach;
                                        ?>
                                    </div>
                                </div>
                                <?php
                            endforeach;
                        ?>
                    </div>

                    <div class="layout-elements expandable sortable">

                        <?php

                        if(!empty($layout_elements_data)):
                            foreach ($layout_elements_data as $index => $item_data){
                                foreach ($item_data as $elementIndex => $element_data){

                                    $args = array('input_name'=> 'layout_elements_data['.$index.']', 'element_data'=> $element_data, 'index'=>$index);
                                    do_action('post_grid_layout_elements_option_'.$elementIndex, $args);
                                }


                            }
                        else:
                            ?>
                            <div class="empty-element">
                                <?php echo sprintf(__('%s Click to add tags.','woocommerce-products-slider'), '<i class="far fa-hand-point-up"></i>') ?>
                            </div>
                        <?php
                        endif;

                        ?>

                    </div>


                </div>

                <style type="text/css">
                    .layout-builder{
                        clear: both;
                    }
                    .layout-tags{
                        margin-bottom: 20px;
                        position: sticky;
                        top: 32px;
                        z-index: 999;
                        background: #fff;
                        padding: 5px 5px;
                        border-bottom: 1px solid #ddd;

                        display: inline-block;
                        width: 360px;
                        float: left;
                    }
                    .layout-tags .element_index{
                        background: #fff;
                        padding: 3px 7px;
                        display: inline-block;
                        margin: 2px 2px;
                        border-radius: 3px;
                        border: 1px solid #616161;
                        cursor: pointer;
                        font-size: 13px;
                    }

                    .layout-tags .element_index:hover{
                        background: #e0e0e0;

                    }

                    .layout-elements{
                        margin-left: 390px;
                    }

                </style>

            </div>
            <div class="clear"></div>

            <?php


            ob_start();

            ?>

            <?php

            $html = ob_get_clean();


//            $args = array(
//                'id'		=> 'layout_builder',
//                //'parent'		=> '',
//                'title'		=> __('Layout elements','woocommerce-products-slider'),
//                'details'	=> __('Customize layout elements.','woocommerce-products-slider'),
//                'type'		=> 'custom_html',
//                'html'		=> $html,
//                'default'		=> '',
//            );
//
//            $settings_tabs_field->generate_field($args);


            ob_start();



            $item_layout_id = get_the_id();
            $args['layout_id'] = $item_layout_id;

            ?>
            <div class="layout-preview">

                <div class="elements-wrapper layout-<?php echo $item_layout_id; ?>">
                    <?php
                    if(!empty($layout_elements_data))
                    foreach ($layout_elements_data as $elementGroupIndex => $elementGroupData){
                        foreach ($elementGroupData as $elementIndex => $elementData){

                            $args['post_id'] = 50207;
                            $args['element'] = $elementData;
                            $args['index'] = $elementGroupIndex;

                            //var_dump($elementIndex);

                            do_action('post_grid_layout_element_'.$elementIndex, $args);
                        }
                    }

                    //echo '<pre>'.var_export($args, true).'</pre>';

                    ?>
                </div>







            </div>

            <?php

            if(!empty($layout_elements_data))
            foreach ($layout_elements_data as $elementGroupIndex => $elementGroupData){
                foreach ($elementGroupData as $elementIndex => $elementData){


                    $args['elementData'] = $elementData;
                    $args['element_index'] = $elementGroupIndex;

                    //echo $elementIndex;
                    do_action('post_grid_layout_element_css_'.$elementIndex, $args);
                }
            }

            $custom_scripts = get_post_meta($item_layout_id,'custom_scripts', true);
            $custom_css = isset($custom_scripts['custom_css']) ? $custom_scripts['custom_css'] : '';

            ?>
            <style type="text/css">
                .layout-preview{
                    background: url(<?php echo post_grid_plugin_url; ?>assets/admin/images/tile.png);
                    padding: 20px;
                }
                .layout-preview .elements-wrapper{
                    width: 400px;
                    overflow: hidden;
                    margin: 0 auto;
                }
                .layout-preview img{
                    width: 100%;
                    height: auto;
                }
                <?php
                echo str_replace('__ID__', 'layout-'.$item_layout_id, $custom_css);
                ?>
            </style>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'layout_preview',
                //'parent'		=> '',
                'title'		=> __('Layout preview','woocommerce-products-slider'),
                'details'	=> __('Layout preview','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);



            ?>
        </div>
        <?php


    }



}











add_action('post_grid_layout_metabox_save','post_grid_layout_metabox_save');

function post_grid_layout_metabox_save($job_id){

    $layout_options = isset($_POST['layout_options']) ? stripslashes_deep($_POST['layout_options']) : '';
    update_post_meta($job_id, 'layout_options', $layout_options);

    $layout_elements_data = isset($_POST['layout_elements_data']) ? stripslashes_deep($_POST['layout_elements_data']) : '';
    update_post_meta($job_id, 'layout_elements_data', $layout_elements_data);

    $custom_scripts = isset($_POST['custom_scripts']) ? stripslashes_deep($_POST['custom_scripts']) : '';
    update_post_meta($job_id, 'custom_scripts', $custom_scripts);

}

