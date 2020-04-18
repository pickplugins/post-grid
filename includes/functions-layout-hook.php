<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

add_action('post_grid_layout_elements_option_custom_text','post_grid_layout_elements_option_custom_text');


function post_grid_layout_elements_option_custom_text($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $text = isset($element_data['text']) ? $element_data['text'] : '';

    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Custom text','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'text',
                'css_id'		=> $element_index.'_text',
                'parent' => $input_name.'[custom_text]',
                'title'		=> __('Custom text','woocommerce-products-slider'),
                'details'	=> __('Write custom text.','woocommerce-products-slider'),
                'type'		=> 'textarea',
                'value'		=> $text,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_custom_text',
                'parent' => $input_name.'[custom_text]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[custom_text]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[custom_text]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[custom_text]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[custom_text]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);





            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_title','post_grid_layout_elements_option_title');
function post_grid_layout_elements_option_title($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';
    $char_limit = isset($element_data['char_limit']) ? $element_data['char_limit'] : 0;

    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Post title','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[title]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'post_link',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[title]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'char_limit',
                'css_id'		=> $element_index.'_char_limit',
                'parent' => $input_name.'[title]',
                'title'		=> __('Character limit','woocommerce-products-slider'),
                'details'	=> __('Set character limit.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $char_limit,
                'default'		=> '20',
                'placeholder'		=> '5',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_title_color',
                'parent' => $input_name.'[title]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[title]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '20px',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[title]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[title]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '10px 0',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[title]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);







            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}





add_action('post_grid_layout_elements_option_title_link','post_grid_layout_elements_option_title_link');


function post_grid_layout_elements_option_title_link($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';
    $char_limit = isset($element_data['char_limit']) ? $element_data['char_limit'] : 0;

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Post title with link','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    //'meta_value'=> __('Meta value', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'char_limit',
                'css_id'		=> $element_index.'_char_limit',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Character limit','woocommerce-products-slider'),
                'details'	=> __('Set character limit.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $char_limit,
                'default'		=> '',
                'placeholder'		=> '5',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[title_link]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);




            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}





add_action('post_grid_layout_elements_option_excerpt_read_more','post_grid_layout_elements_option_excerpt_read_more');
function post_grid_layout_elements_option_excerpt_read_more($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';
    $char_limit = isset($element_data['char_limit']) ? $element_data['char_limit'] : 0;
    $read_more_text = isset($element_data['read_more_text']) ? $element_data['read_more_text'] : '';

    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Excerpt read more','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'char_limit',
                'css_id'		=> $element_index.'_char_limit',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Word limit','woocommerce-products-slider'),
                'details'	=> __('Set word limit.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $char_limit,
                'default'		=> '',
                'placeholder'		=> '20',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'read_more_text',
                'css_id'		=> $element_index.'_read_more_text',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Read more text','woocommerce-products-slider'),
                'details'	=> __('Custom read more text.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $read_more_text,
                'default'		=> '',
                'placeholder'		=> 'Read more',
            );

            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);






            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Text Color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[excerpt_read_more]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_read_more','post_grid_layout_elements_option_read_more');
function post_grid_layout_elements_option_read_more($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $read_more_text = isset($element_data['read_more_text']) ? $element_data['read_more_text'] : '';

    $color = isset($element_data['color']) ? $element_data['color'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Read more','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'read_more_text',
                'css_id'		=> $element_index.'_read_more_text',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Read more text','woocommerce-products-slider'),
                'details'	=> __('Custom read more text.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $read_more_text,
                'default'		=> '',
                'placeholder'		=> 'Read more',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    //'meta_value'=> __('Meta value', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Text Color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[read_more]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_media','post_grid_layout_elements_option_media');


function post_grid_layout_elements_option_media($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $thumb_size = isset($element_data['thumb_size']) ? $element_data['thumb_size'] : '';
    $default_thumb_src = isset($element_data['default_thumb_src']) ? $element_data['default_thumb_src'] : '';
    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';

    $thumb_height = isset($element_data['thumb_height']) ? $element_data['thumb_height'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';

    $thumb_height_large = isset($thumb_height['large']) ? $thumb_height['large'] : '';
    $thumb_height_medium = isset($thumb_height['medium']) ? $thumb_height['medium'] : '';
    $thumb_height_small = isset($thumb_height['small']) ? $thumb_height['small'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Media','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $thumbnail_sizes = array();
            $thumbnail_sizes['full'] = __('Full', '');
            $get_intermediate_image_sizes =  get_intermediate_image_sizes();

            if(!empty($get_intermediate_image_sizes))
                foreach($get_intermediate_image_sizes as $size_key){
                    $size_name = str_replace('_', ' ',$size_key);
                    $size_name = str_replace('-', ' ',$size_name);

                    $thumbnail_sizes[$size_key] = ucfirst($size_name);
                }
            //echo '<pre>'.var_export($thumbnail_sizes, true).'</pre>';

            $args = array(
                'id'		=> 'thumb_size',
                'parent' => $input_name.'[media]',
                'title'		=> __('Thumbnail size','woocommerce-products-slider'),
                'details'	=> __('Choose thumbnail size.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $thumb_size,
                'default'		=> 'large',
                'args'		=> $thumbnail_sizes,
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[media]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    //'meta_value'=> __('Meta value', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[media]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'thumb_height',
                'title'		=> __('Thumbnail height','woocommerce-products-slider'),
                'details'	=> __('Set thumbnail height.','woocommerce-products-slider'),
                'type'		=> 'option_group',
                'options'		=> array(
                    array(
                        'id'		=> 'large',
                        'parent'		=> $input_name.'[media][thumb_height]',
                        'title'		=> __('In desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 1200px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_large,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'medium',
                        'parent'		=> $input_name.'[media][thumb_height]',
                        'title'		=> __('In tablet & small desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 992px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_medium,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'small',
                        'parent'		=> $input_name.'[media][thumb_height]',
                        'title'		=> __('In mobile','woocommerce-products-slider'),
                        'details'	=> __('max-width: 768px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_small,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                ),

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'default_thumb_src',
                'parent' => $input_name.'[media]',
                'title'		=> __('Default thumbnail','woocommerce-products-slider'),
                'details'	=> __('Choose default thumbnail.','woocommerce-products-slider'),
                'type'		=> 'media_url',
                'value'		=> $default_thumb_src,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[media]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            ob_start();
            ?>
            <code onclick="this.select()">
                .element-<?php echo $element_index?>{}

            </code>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_thumb_link','post_grid_layout_elements_option_thumb_link');


function post_grid_layout_elements_option_thumb_link($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $thumb_size = isset($element_data['thumb_size']) ? $element_data['thumb_size'] : '';
    $default_thumb_src = isset($element_data['default_thumb_src']) ? $element_data['default_thumb_src'] : '';
    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';

    $thumb_height = isset($element_data['thumb_height']) ? $element_data['thumb_height'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';

    $thumb_height_large = isset($thumb_height['large']) ? $thumb_height['large'] : '';
    $thumb_height_medium = isset($thumb_height['medium']) ? $thumb_height['medium'] : '';
    $thumb_height_small = isset($thumb_height['small']) ? $thumb_height['small'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Thumbnail with link','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $thumbnail_sizes = array();
            $thumbnail_sizes['full'] = __('Full', '');
            $get_intermediate_image_sizes =  get_intermediate_image_sizes();

            if(!empty($get_intermediate_image_sizes))
            foreach($get_intermediate_image_sizes as $size_key){
                $size_name = str_replace('_', ' ',$size_key);
                $size_name = str_replace('-', ' ',$size_name);

                $thumbnail_sizes[$size_key] = ucfirst($size_name);
            }
            //echo '<pre>'.var_export($thumbnail_sizes, true).'</pre>';

            $args = array(
                'id'		=> 'thumb_size',
                'parent' => $input_name.'[thumb_link]',
                'title'		=> __('Thumbnail size','woocommerce-products-slider'),
                'details'	=> __('Choose thumbnail size.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $thumb_size,
                'default'		=> 'large',
                'args'		=> $thumbnail_sizes,
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[thumb_link]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    //'meta_value'=> __('Meta value', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[thumb_link]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'thumb_height',
                'title'		=> __('Thumbnail height','woocommerce-products-slider'),
                'details'	=> __('Set thumbnail height.','woocommerce-products-slider'),
                'type'		=> 'option_group',
                'options'		=> array(
                    array(
                        'id'		=> 'large',
                        'parent'		=> $input_name.'[thumb_link][thumb_height]',
                        'title'		=> __('In desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 1200px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_large,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'medium',
                        'parent'		=> $input_name.'[thumb_link][thumb_height]',
                        'title'		=> __('In tablet & small desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 992px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_medium,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'small',
                        'parent'		=> $input_name.'[thumb_link][thumb_height]',
                        'title'		=> __('In mobile','woocommerce-products-slider'),
                        'details'	=> __('max-width: 768px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_small,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                ),

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'default_thumb_src',
                'parent' => $input_name.'[thumb_link]',
                'title'		=> __('Default thumbnail','woocommerce-products-slider'),
                'details'	=> __('Choose default thumbnail.','woocommerce-products-slider'),
                'type'		=> 'media_url',
                'value'		=> $default_thumb_src,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[thumb_link]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            ob_start();
            ?>
            <code onclick="this.select()">
                .element-<?php echo $element_index?>{}

            </code>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_thumb','post_grid_layout_elements_option_thumb');


function post_grid_layout_elements_option_thumb($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $thumb_size = isset($element_data['thumb_size']) ? $element_data['thumb_size'] : '';
    $default_thumb_src = isset($element_data['default_thumb_src']) ? $element_data['default_thumb_src'] : '';

    $thumb_height = isset($element_data['thumb_height']) ? $element_data['thumb_height'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';

    $thumb_height_large = isset($thumb_height['large']) ? $thumb_height['large'] : '';
    $thumb_height_medium = isset($thumb_height['medium']) ? $thumb_height['medium'] : '';
    $thumb_height_small = isset($thumb_height['small']) ? $thumb_height['small'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Thumbnail','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $thumbnail_sizes = array();
            $thumbnail_sizes['full'] = __('Full', '');
            $get_intermediate_image_sizes =  get_intermediate_image_sizes();

            if(!empty($get_intermediate_image_sizes))
                foreach($get_intermediate_image_sizes as $size_key){
                    $size_name = str_replace('_', ' ',$size_key);
                    $size_name = str_replace('-', ' ',$size_name);

                    $thumbnail_sizes[$size_key] = ucfirst($size_name);
                }
            //echo '<pre>'.var_export($thumbnail_sizes, true).'</pre>';

            $args = array(
                'id'		=> 'thumb_size',
                'parent' => $input_name.'[thumb]',
                'title'		=> __('Thumbnail size','woocommerce-products-slider'),
                'details'	=> __('Choose thumbnail size.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $thumb_size,
                'default'		=> 'large',
                'args'		=> $thumbnail_sizes,
            );

            $settings_tabs_field->generate_field($args);




            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[thumb]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[thumb]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'thumb_height',
                'title'		=> __('Thumbnail height','woocommerce-products-slider'),
                'details'	=> __('Set thumbnail height.','woocommerce-products-slider'),
                'type'		=> 'option_group',
                'options'		=> array(
                    array(
                        'id'		=> 'large',
                        'parent'		=> $input_name.'[thumb][thumb_height]',
                        'title'		=> __('In desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 1200px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_large,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'medium',
                        'parent'		=> $input_name.'[thumb][thumb_height]',
                        'title'		=> __('In tablet & small desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 992px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_medium,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'small',
                        'parent'		=> $input_name.'[thumb][thumb_height]',
                        'title'		=> __('In mobile','woocommerce-products-slider'),
                        'details'	=> __('max-width: 768px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_small,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                ),

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'default_thumb_src',
                'parent' => $input_name.'[thumb]',
                'title'		=> __('Default thumbnail','woocommerce-products-slider'),
                'details'	=> __('Choose default thumbnail.','woocommerce-products-slider'),
                'type'		=> 'media_url',
                'value'		=> $default_thumb_src,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[thumb]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            ob_start();
            ?>
            <code onclick="this.select()">
                .element-<?php echo $element_index?>{}

            </code>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);


            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_content','post_grid_layout_elements_option_content');


function post_grid_layout_elements_option_content($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $content_source = isset($element_data['content_source']) ? $element_data['content_source'] : '';
    $word_count = isset($element_data['word_count']) ? $element_data['word_count'] : 15;
    $read_more_text = isset($element_data['read_more_text']) ? $element_data['read_more_text'] : __('Read more','woocommerce-products-slider');
    $read_more_color = isset($element_data['read_more_color']) ? $element_data['read_more_color'] : '';

    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Content','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'content_source',
                'css_id'		=> $element_index.'_content_source',
                'parent' => $input_name.'[content]',
                'title'		=> __('Content source','woocommerce-products-slider'),
                'details'	=> __('Choose content source.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $content_source,
                'default'		=> 'excerpt',
                'args'		=> array('short_description'=> __('Short description', 'woocommerce-products-slider'),'excerpt'=> __('Auto Excerpt', 'woocommerce-products-slider'), 'content'=> __('Content', 'woocommerce-products-slider')),
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'word_count',
                'css_id'		=> $element_index.'_word_count',
                'parent' => $input_name.'[content]',
                'title'		=> __('Word count','woocommerce-products-slider'),
                'details'	=> __('Set word count.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $word_count,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'read_more_text',
                'css_id'		=> $element_index.'_read_more_text',
                'parent' => $input_name.'[content]',
                'title'		=> __('Read more text','woocommerce-products-slider'),
                'details'	=> __('Set custom read more text.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $read_more_text,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'read_more_color',
                'css_id'		=> $element_index.'_read_more_color',
                'parent' => $input_name.'[content]',
                'title'		=> __('Read more color','woocommerce-products-slider'),
                'details'	=> __('Set custom read more color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $read_more_color,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_content_color',
                'parent' => $input_name.'[content]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[content]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[content]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[content]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[content]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);



            ob_start();
            ?>
            <code onclick="this.select()">
                .element-<?php echo $element_index?>{}

            </code>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[content]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to product link.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'product_link',
                'args'		=> array(
                    'none'=> __('None', 'woocommerce-products-slider'),
                    'product_link'=> __('Product link', 'woocommerce-products-slider'),
                    'external_product_url'=> __('External product', 'woocommerce-products-slider'),
//                    'popup_box'=> __('Popup box', 'woocommerce-products-slider'),
//                    'custom_link'=> __('Custom link', 'woocommerce-products-slider')
                ),
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_excerpt','post_grid_layout_elements_option_excerpt');
function post_grid_layout_elements_option_excerpt($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $link_target = isset($element_data['link_target']) ? $element_data['link_target'] : '';
    $char_limit = isset($element_data['char_limit']) ? $element_data['char_limit'] : 0;
    $read_more_text = isset($element_data['read_more_text']) ? $element_data['read_more_text'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Post excerpt','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'char_limit',
                'css_id'		=> $element_index.'_char_limit',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Word limit','woocommerce-products-slider'),
                'details'	=> __('Set word limit.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $char_limit,
                'default'		=> '',
                'placeholder'		=> '20',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'read_more_text',
                'css_id'		=> $element_index.'_read_more_text',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Read more text','woocommerce-products-slider'),
                'details'	=> __('Custom read more text.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $read_more_text,
                'default'		=> '',
                'placeholder'		=> 'Read more',
            );

            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'		=> 'link_target',
                'css_id'		=> $element_index.'_link_target',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Link target','woocommerce-products-slider'),
                'details'	=> __('Choose option link target.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_target,
                'default'		=> 'post_link',
                'args'		=> array(
                    '_blank'=> __('_blank', 'woocommerce-products-slider'),
                    '_parent'=> __('_parent', 'woocommerce-products-slider'),
                    '_self'=> __('_self', 'woocommerce-products-slider'),
                    '_top'=> __('_top', 'woocommerce-products-slider'),

                ),
            );

            $settings_tabs_field->generate_field($args);






            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '10px 0',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Text Color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[excerpt]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '15px',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}





add_action('post_grid_layout_elements_option_wrapper_start','post_grid_layout_elements_option_wrapper_start');


function post_grid_layout_elements_option_wrapper_start($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $wrapper_id = isset($element_data['wrapper_id']) ? $element_data['wrapper_id'] : '';
    $wrapper_class = isset($element_data['wrapper_class']) ? $element_data['wrapper_class'] : '';
    $css_idle = isset($element_data['css_idle']) ? $element_data['css_idle'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';

    ?>
    <div class="item wrapper_start">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Wrapper start','woocommerce-products-slider'); ?></span>

            <span class="handle-start"><i class="fas fa-level-up-alt"></i></span>

        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'wrapper_id',
                'parent' => $input_name.'[wrapper_start]',
                'title'		=> __('Wrapper id','woocommerce-products-slider'),
                'details'	=> __('Write wrapper id, ex: my-unique-id.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_id,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'wrapper_class',
                'parent' => $input_name.'[wrapper_start]',
                'title'		=> __('Wrapper class','woocommerce-products-slider'),
                'details'	=> __('Write wrapper class, ex: layer-thumbnail','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_class,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'css_idle',
                'css_id'		=> 'css_idle_'.preg_replace('/\D/', '', $input_name) ,
                'parent' => $input_name.'[wrapper_start]',
                'title'		=> __('Custom CSS','woocommerce-products-slider'),
                'details'	=> __('Write custom CSS. do not use <code>&lt;style>&lt;/style></code>','woocommerce-products-slider'),
                'type'		=> 'scripts_css',
                'value'		=> $css_idle,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[wrapper_start]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            ob_start();
            ?>
            <code onclick="this.select()">
                .element-<?php echo $element_index?>{}

            </code>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_wrapper_end','post_grid_layout_elements_option_wrapper_end');


function post_grid_layout_elements_option_wrapper_end($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();

    $meta_key = isset($element_data['meta_key']) ? $element_data['meta_key'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';

    ?>
    <div class="item wrapper_end">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Wrapper end','woocommerce-products-slider'); ?></span>
            <span class="handle-end"><i class="fas fa-level-down-alt"></i></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'wrapper_id',
                'wraper_class'		=> 'hidden',

                'parent' => $input_name.'[wrapper_end]',
                'title'		=> __('Wrapper id','woocommerce-products-slider'),
                'details'	=> __('Write wrapper id, ex: div, p, span.','woocommerce-products-slider'),
                'type'		=> 'hidden',
                'value'		=> $meta_key,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);





            ?>

        </div>
    </div>
    <?php

}





add_action('post_grid_layout_elements_option_categories','post_grid_layout_elements_option_categories');
function post_grid_layout_elements_option_categories($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $max_count = isset($element_data['max_count']) ? $element_data['max_count'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $wrapper_margin = isset($element_data['wrapper_margin']) ? $element_data['wrapper_margin'] : '';
    $link_color = isset($element_data['link_color']) ? $element_data['link_color'] : '';
    $text_color = isset($element_data['text_color']) ? $element_data['text_color'] : '';

    $separator = isset($element_data['separator']) ? $element_data['separator'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Post categories','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'max_count',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Max count','woocommerce-products-slider'),
                'details'	=> __('Write max count','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $max_count,
                'default'		=> 3,
                'placeholder'		=> '3',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'separator',
                'css_id'		=> $element_index.'_position_color',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Link separator','woocommerce-products-slider'),
                'details'	=> __('Choose link separator.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $separator,
                'default'		=> '',
                'placeholder'		=> ', ',

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace category output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Categories: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'wrapper_margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Choose font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',

            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_color',
                'css_id'		=> $element_index.'_link_color',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Link color','woocommerce-products-slider'),
                'details'	=> __('Choose link color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $link_color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'text_color',
                'css_id'		=> $element_index.'_text_color',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Text color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $text_color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[categories]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_tags','post_grid_layout_elements_option_tags');
function post_grid_layout_elements_option_tags($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $max_count = isset($element_data['max_count']) ? $element_data['max_count'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $wrapper_margin = isset($element_data['wrapper_margin']) ? $element_data['wrapper_margin'] : '';
    $link_color = isset($element_data['link_color']) ? $element_data['link_color'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $separator = isset($element_data['separator']) ? $element_data['separator'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Post tag','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'max_count',
                'parent' => $input_name.'[tags]',
                'title'		=> __('Max count','woocommerce-products-slider'),
                'details'	=> __('Write max count','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $max_count,
                'default'		=> 3,
                'placeholder'		=> '3',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'separator',
                'css_id'		=> $element_index.'_position_color',
                'parent' => $input_name.'[tags]',
                'title'		=> __('Link separator','woocommerce-products-slider'),
                'details'	=> __('Choose link separator.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $separator,
                'default'		=> '',
                'placeholder'		=> ', ',

            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[tags]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace tags output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Tags: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'wrapper_margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[tags]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'link_color',
                'css_id'		=> $element_index.'_link_color',
                'parent' => $input_name.'[tags]',
                'title'		=> __('Link color','woocommerce-products-slider'),
                'details'	=> __('Choose link color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $link_color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[tags]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);




            ?>

        </div>
    </div>
    <?php

}

add_action('post_grid_layout_elements_option_comments_count','post_grid_layout_elements_option_comments_count');
function post_grid_layout_elements_option_comments_count($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Comment count','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[comments_count]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace comment count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Total comments: %s',
            );

            $settings_tabs_field->generate_field($args);




            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[comments_count]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[comments_count]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[comments_count]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[comments_count]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[comments_count]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);







            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_five_star','post_grid_layout_elements_option_five_star');
function post_grid_layout_elements_option_five_star($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Five star','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php



            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[five_star]',
                'title'		=> __('Text color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[five_star]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Choose text font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[five_star]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Choose margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 10px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[five_star]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}

add_action('post_grid_layout_elements_option_hr','post_grid_layout_elements_option_hr');
function post_grid_layout_elements_option_hr($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $background_color = isset($element_data['background_color']) ? $element_data['background_color'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $height = isset($element_data['height']) ? $element_data['height'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Horizontal line','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php




            $args = array(
                'id'		=> 'background_color',
                'css_id'		=> $element_index.'_background_coloradd_to_cart',
                'parent' => $input_name.'[hr]',
                'title'		=> __('Background color','woocommerce-products-slider'),
                'details'	=> __('Choose background color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $background_color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'height',
                'css_id'		=> $element_index.'_height',
                'parent' => $input_name.'[hr]',
                'title'		=> __('Height','woocommerce-products-slider'),
                'details'	=> __('Choose height.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $height,
                'default'		=> '',
                'placeholder'		=> '5px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_padding',
                'parent' => $input_name.'[hr]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Choose margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 10px',
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}

add_action('post_grid_layout_elements_option_share_button','post_grid_layout_elements_option_share_button');
function post_grid_layout_elements_option_share_button($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $icon_color = isset($element_data['icon_color']) ? $element_data['icon_color'] : '';
    $icon_margin = isset($element_data['icon_margin']) ? $element_data['icon_margin'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Share button','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php






            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[share_button]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Choose text font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'icon_margin',
                'css_id'		=> $element_index.'_icon_margin',
                'parent' => $input_name.'[share_button]',
                'title'		=> __('Icon margin','woocommerce-products-slider'),
                'details'	=> __('Set icon margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $icon_margin,
                'default'		=> '',
                'placeholder'		=> '5px 10px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'icon_color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[share_button]',
                'title'		=> __('Icon color','woocommerce-products-slider'),
                'details'	=> __('Choose icon color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $icon_color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_author','post_grid_layout_elements_option_author');
function post_grid_layout_elements_option_author($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Author name','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[author]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    'author_posts_link'=> __('Author posts link', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[author]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Author: %s',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[author]',
                'title'		=> __('Text color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[author]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Choose text font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_padding',
                'parent' => $input_name.'[author]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Choose padding.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 10px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[author]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_author_link','post_grid_layout_elements_option_author_link');
function post_grid_layout_elements_option_author_link($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $background_color = isset($element_data['background_color']) ? $element_data['background_color'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Author name with link','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[author_link]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    'author_posts_link'=> __('Author posts link', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[author_link]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace on-sale output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Author: %s',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_color',
                'parent' => $input_name.'[author_link]',
                'title'		=> __('Text color','woocommerce-products-slider'),
                'details'	=> __('Choose text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);



            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[author_link]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Choose text font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '16px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_padding',
                'parent' => $input_name.'[author_link]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Choose padding.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 10px',
            );

            $settings_tabs_field->generate_field($args);



            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_post_date','post_grid_layout_elements_option_post_date');
function post_grid_layout_elements_option_post_date($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $date_format = isset($element_data['date_format']) ? $element_data['date_format'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';

    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';

    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Post date','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'date_format',
                'css_id'		=> $element_index.'_background_colorpost_date',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Background color','woocommerce-products-slider'),
                'details'	=> __('Choose background color.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $date_format,
                'default'		=> '',
                'placeholder'		=> 'd-m-Y',

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link title.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'none',
                'args'		=> array(
                    'post_link'=> __('Post link', 'woocommerce-products-slider'),
                    'none'=> __('None', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_custom_text',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[post_date]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}









add_action('post_grid_layout_elements_option_term_title','post_grid_layout_elements_option_term_title');


function post_grid_layout_elements_option_term_title($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Term title','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_term_title',
                'parent' => $input_name.'[term_title]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[term_title]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[term_title]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[term_title]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[term_title]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);




            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_term_thumb','post_grid_layout_elements_option_term_thumb');
function post_grid_layout_elements_option_term_thumb($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $thumb_size = isset($element_data['thumb_size']) ? $element_data['thumb_size'] : '';
    $default_thumb_src = isset($element_data['default_thumb_src']) ? $element_data['default_thumb_src'] : '';

    $thumb_height = isset($element_data['thumb_height']) ? $element_data['thumb_height'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';

    $thumb_height_large = isset($thumb_height['large']) ? $thumb_height['large'] : '';
    $thumb_height_medium = isset($thumb_height['medium']) ? $thumb_height['medium'] : '';
    $thumb_height_small = isset($thumb_height['small']) ? $thumb_height['small'] : '';


    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Term thumbnail','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $thumbnail_sizes = array();
            $thumbnail_sizes['full'] = __('Full', '');
            $get_intermediate_image_sizes =  get_intermediate_image_sizes();

            if(!empty($get_intermediate_image_sizes))
                foreach($get_intermediate_image_sizes as $size_key){
                    $size_name = str_replace('_', ' ',$size_key);
                    $size_name = str_replace('-', ' ',$size_name);

                    $thumbnail_sizes[$size_key] = ucfirst($size_name);
                }
            //echo '<pre>'.var_export($thumbnail_sizes, true).'</pre>';

            $args = array(
                'id'		=> 'thumb_size',
                'parent' => $input_name.'[term_thumb]',
                'title'		=> __('Thumbnail size','woocommerce-products-slider'),
                'details'	=> __('Choose thumbnail size.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $thumb_size,
                'default'		=> 'large',
                'args'		=> $thumbnail_sizes,
            );

            $settings_tabs_field->generate_field($args);





            $args = array(
                'id'		=> 'thumb_height',
                'title'		=> __('Thumbnail height','woocommerce-products-slider'),
                'details'	=> __('Set thumbnail height.','woocommerce-products-slider'),
                'type'		=> 'option_group',
                'options'		=> array(
                    array(
                        'id'		=> 'large',
                        'parent'		=> $input_name.'[term_thumb][thumb_height]',
                        'title'		=> __('In desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 1200px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_large,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'medium',
                        'parent'		=> $input_name.'[term_thumb][thumb_height]',
                        'title'		=> __('In tablet & small desktop','woocommerce-products-slider'),
                        'details'	=> __('min-width: 992px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_medium,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                    array(
                        'id'		=> 'small',
                        'parent'		=> $input_name.'[term_thumb][thumb_height]',
                        'title'		=> __('In mobile','woocommerce-products-slider'),
                        'details'	=> __('max-width: 768px, ex: 280px','woocommerce-products-slider'),
                        'type'		=> 'text',
                        'value'		=> $thumb_height_small,
                        'default'		=> '',
                        'placeholder'   => '280px',
                    ),
                ),

            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'default_thumb_src',
                'parent' => $input_name.'[term_thumb]',
                'title'		=> __('Default thumbnail','woocommerce-products-slider'),
                'details'	=> __('Choose default thumbnail.','woocommerce-products-slider'),
                'type'		=> 'media_url',
                'value'		=> $default_thumb_src,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[term_thumb]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);

            ob_start();
            ?>
            <code onclick="this.select()">
                .element-<?php echo $element_index?>{}

            </code>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);





            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_term_description','post_grid_layout_elements_option_term_description');


function post_grid_layout_elements_option_term_description($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Term description','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_term_description',
                'parent' => $input_name.'[term_description]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[term_description]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[term_description]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[term_description]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[term_description]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[term_description]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link product.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'product_link',
                'args'		=> array(
                    'none'=> __('None', 'woocommerce-products-slider'),
                    'product_link'=> __('product link', 'woocommerce-products-slider'),
                    'external_product_url'=> __('External product', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);




            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_term_slug','post_grid_layout_elements_option_term_slug');


function post_grid_layout_elements_option_term_slug($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Term slug','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_term_description',
                'parent' => $input_name.'[term_slug]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[term_slug]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[term_slug]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[term_slug]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[term_slug]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'link_to',
                'css_id'		=> $element_index.'_link_to',
                'parent' => $input_name.'[term_slug]',
                'title'		=> __('Link to','woocommerce-products-slider'),
                'details'	=> __('Choose option to link product.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $link_to,
                'default'		=> 'product_link',
                'args'		=> array(
                    'none'=> __('None', 'woocommerce-products-slider'),
                    'product_link'=> __('product link', 'woocommerce-products-slider'),
                    'external_product_url'=> __('External product', 'woocommerce-products-slider'),
                ),
            );

            $settings_tabs_field->generate_field($args);




            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_term_post_count','post_grid_layout_elements_option_term_post_count');


function post_grid_layout_elements_option_term_post_count($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Term post count','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[term_post_count]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Total post: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_term_description',
                'parent' => $input_name.'[term_post_count]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[term_post_count]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[term_post_count]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[term_post_count]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[term_post_count]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_dokan_store_name','post_grid_layout_elements_option_dokan_store_name');
function post_grid_layout_elements_option_dokan_store_name($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store name','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[dokan_store_name]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Store name: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_dokan_store_name',
                'parent' => $input_name.'[dokan_store_name]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[dokan_store_name]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[dokan_store_name]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_store_name]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_store_name]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_dokan_store_address','post_grid_layout_elements_option_dokan_store_address');
function post_grid_layout_elements_option_dokan_store_address($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store address','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[dokan_store_address]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Address: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_dokan_store_address',
                'parent' => $input_name.'[dokan_store_address]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[dokan_store_address]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[dokan_store_address]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_store_address]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_store_address]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_dokan_store_city','post_grid_layout_elements_option_dokan_store_city');
function post_grid_layout_elements_option_dokan_store_city($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store city','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[dokan_store_city]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'City: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_dokan_store_address',
                'parent' => $input_name.'[dokan_store_city]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[dokan_store_city]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[dokan_store_city]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_store_city]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_store_city]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_dokan_store_country','post_grid_layout_elements_option_dokan_store_country');
function post_grid_layout_elements_option_dokan_store_country($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store country','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[dokan_store_country]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Country: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_dokan_store_country',
                'parent' => $input_name.'[dokan_store_country]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[dokan_store_country]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[dokan_store_country]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_store_country]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_store_country]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_dokan_store_phone','post_grid_layout_elements_option_dokan_store_phone');
function post_grid_layout_elements_option_dokan_store_phone($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $link_to = isset($element_data['link_to']) ? $element_data['link_to'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store phone','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[dokan_store_phone]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_dokan_store_country',
                'parent' => $input_name.'[dokan_store_phone]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[dokan_store_phone]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[dokan_store_phone]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_store_phone]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_store_phone]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_dokan_banner','post_grid_layout_elements_option_dokan_banner');
function post_grid_layout_elements_option_dokan_banner($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $width = isset($element_data['width']) ? $element_data['width'] : '';
    $height = isset($element_data['height']) ? $element_data['height'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store banner','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'width',
                'css_id'		=> $element_index.'_width',
                'parent' => $input_name.'[dokan_banner]',
                'title'		=> __('Width','woocommerce-products-slider'),
                'details'	=> __('Set banner width. ex: 200px or 45%','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $width,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'height',
                'css_id'		=> $element_index.'_height',
                'parent' => $input_name.'[dokan_banner]',
                'title'		=> __('height','woocommerce-products-slider'),
                'details'	=> __('Set banner height. ex: 200px','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $height,
                'default'		=> '',
                'placeholder'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_banner]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_banner]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_dokan_avatar','post_grid_layout_elements_option_dokan_avatar');
function post_grid_layout_elements_option_dokan_avatar($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $width = isset($element_data['width']) ? $element_data['width'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Dokan store avatar','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'width',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[dokan_avatar]',
                'title'		=> __('Width','woocommerce-products-slider'),
                'details'	=> __('Set avatar width. ex: 200px or 50%','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $width,
                'default'		=> '',
                'placeholder'		=> '200px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[dokan_avatar]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[dokan_avatar]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_order_title','post_grid_layout_elements_option_order_title');
function post_grid_layout_elements_option_order_title($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Order title','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_title]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_title',
                'parent' => $input_name.'[order_title]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_title]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_title]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_title]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_title]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_order_date','post_grid_layout_elements_option_order_date');
function post_grid_layout_elements_option_order_date($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Order date','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_date]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_date',
                'parent' => $input_name.'[order_date]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_date]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_date]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_date]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_date]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_order_customer_name','post_grid_layout_elements_option_order_customer_name');
function post_grid_layout_elements_option_order_customer_name($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Customer name','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_customer_name]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_customer_name',
                'parent' => $input_name.'[order_customer_name]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_customer_name]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_customer_name]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_customer_name]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_customer_name]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_order_customer_thumb','post_grid_layout_elements_option_order_customer_thumb');
function post_grid_layout_elements_option_order_customer_thumb($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';

    $width = isset($element_data['width']) ? $element_data['width'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Customer thumbnail','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php

            $args = array(
                'id'		=> 'width',
                'css_id'		=> $element_index.'_width',
                'parent' => $input_name.'[order_customer_thumb]',
                'title'		=> __('width','woocommerce-products-slider'),
                'details'	=> __('Set width.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $width,
                'default'		=> '',
                'placeholder'		=> '200px',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_customer_thumb]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_customer_thumb]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_order_country','post_grid_layout_elements_option_order_country');
function post_grid_layout_elements_option_order_country($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Customer country','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_country]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_country',
                'parent' => $input_name.'[order_country]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_country]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_country]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_country]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_country]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}

add_action('post_grid_layout_elements_option_order_payment_method','post_grid_layout_elements_option_order_payment_method');
function post_grid_layout_elements_option_order_payment_method($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Customer payment method','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_payment_method]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_payment_method',
                'parent' => $input_name.'[order_payment_method]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_payment_method]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_payment_method]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_payment_method]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_payment_method]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}




add_action('post_grid_layout_elements_option_order_total','post_grid_layout_elements_option_order_total');
function post_grid_layout_elements_option_order_total($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Order total','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_total]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Phone: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_total',
                'parent' => $input_name.'[order_total]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_total]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_total]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_total]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_total]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}


add_action('post_grid_layout_elements_option_order_items','post_grid_layout_elements_option_order_items');
function post_grid_layout_elements_option_order_items($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Order items','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_items]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Order items: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_items',
                'parent' => $input_name.'[order_items]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_items]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_items]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_items]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_items]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}



add_action('post_grid_layout_elements_option_order_discount_total','post_grid_layout_elements_option_order_discount_total');
function post_grid_layout_elements_option_order_discount_total($parameters){

    $settings_tabs_field = new settings_tabs_field();

    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';


    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = isset($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '';

    $custom_css = isset($element_data['custom_css']) ? $element_data['custom_css'] : '';
    $custom_css_hover = isset($element_data['custom_css_hover']) ? $element_data['custom_css_hover'] : '';



    ?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>

            <span class="expand"><?php echo __('Order discount total','woocommerce-products-slider'); ?></span>
        </div>
        <div class="element-options options">

            <?php


            $args = array(
                'id'		=> 'wrapper_html',
                'css_id'		=> $element_index.'_wrapper_html',
                'parent' => $input_name.'[order_discount_total]',
                'title'		=> __('Wrapper html','woocommerce-products-slider'),
                'details'	=> __('Write wrapper html, use <code>%s</code> to replace sale count output.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $wrapper_html,
                'default'		=> '',
                'placeholder'		=> 'Discount total: %s',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'color',
                'css_id'		=> $element_index.'_order_discount_total',
                'parent' => $input_name.'[order_discount_total]',
                'title'		=> __('Color','woocommerce-products-slider'),
                'details'	=> __('Title text color.','woocommerce-products-slider'),
                'type'		=> 'colorpicker',
                'value'		=> $color,
                'default'		=> '',
            );

            $settings_tabs_field->generate_field($args);

            $args = array(
                'id'		=> 'font_size',
                'css_id'		=> $element_index.'_font_size',
                'parent' => $input_name.'[order_discount_total]',
                'title'		=> __('Font size','woocommerce-products-slider'),
                'details'	=> __('Set font size.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_size,
                'default'		=> '',
                'placeholder'		=> '14px',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'font_family',
                'css_id'		=> $element_index.'_font_family',
                'parent' => $input_name.'[order_discount_total]',
                'title'		=> __('Font family','woocommerce-products-slider'),
                'details'	=> __('Set font family.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $font_family,
                'default'		=> '',
                'placeholder'		=> 'Open Sans',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'margin',
                'css_id'		=> $element_index.'_margin',
                'parent' => $input_name.'[order_discount_total]',
                'title'		=> __('Margin','woocommerce-products-slider'),
                'details'	=> __('Set margin.','woocommerce-products-slider'),
                'type'		=> 'text',
                'value'		=> $margin,
                'default'		=> '',
                'placeholder'		=> '5px 0',
            );

            $settings_tabs_field->generate_field($args);


            $args = array(
                'id'		=> 'text_align',
                'css_id'		=> $element_index.'_text_align',
                'parent' => $input_name.'[order_discount_total]',
                'title'		=> __('Text align','woocommerce-products-slider'),
                'details'	=> __('Choose text align.','woocommerce-products-slider'),
                'type'		=> 'select',
                'value'		=> $text_align,
                'default'		=> 'left',
                'args'		=> array('left'=> __('Left', 'woocommerce-products-slider'),'right'=> __('Right', 'woocommerce-products-slider'),'center'=> __('Center', 'woocommerce-products-slider') ),
            );

            $settings_tabs_field->generate_field($args);


            ob_start();
            ?>
            <textarea readonly type="text"  onclick="this.select();">.element-<?php echo $element_index?>{}</textarea>
            <?php

            $html = ob_get_clean();

            $args = array(
                'id'		=> 'use_css',
                'title'		=> __('Use of CSS','woocommerce-products-slider'),
                'details'	=> __('Use following class selector to add custom CSS for this element.','woocommerce-products-slider'),
                'type'		=> 'custom_html',
                'html'		=> $html,

            );

            $settings_tabs_field->generate_field($args);

            ?>

        </div>
    </div>
    <?php

}







