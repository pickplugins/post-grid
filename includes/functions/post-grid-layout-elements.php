<?php
if ( ! defined('ABSPATH')) exit;  // if direct access


add_action('post_grid_layout_element_wrapper_start', 'post_grid_layout_element_wrapper_start', 10);
function post_grid_layout_element_wrapper_start($args){

    $index = isset($args['index']) ? $args['index'] : '';
    $element_class = !empty($index) ? 'element_'.$index : '';

    //echo '<pre>'.var_export($args, true).'</pre>';
    $element = isset($args['element']) ? $args['element'] : array();
    $wrapper_class = isset($element['wrapper_class']) ? $element['wrapper_class'] : '';
    $wrapper_id = isset($element['wrapper_id']) ? $element['wrapper_id'] : '';



    ?>
    <div class="<?php echo $wrapper_class; ?> <?php echo $element_class; ?>" id="<?php echo $wrapper_id; ?>">
    <?php

}


add_action('post_grid_layout_element_css_wrapper_start', 'post_grid_layout_element_css_wrapper_start', 10);
function post_grid_layout_element_css_wrapper_start($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}



add_action('post_grid_layout_element_wrapper_end', 'post_grid_layout_element_wrapper_end', 10);
function post_grid_layout_element_wrapper_end($args){


    ?>
    </div>
    <?php

}





add_action('post_grid_layout_element_custom_text', 'post_grid_layout_element_custom_text');
function post_grid_layout_element_custom_text($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $title = get_the_title($post_id);

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $text = isset($element['text']) ?  $element['text'] : '';

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> custom_text ">
        <?php echo esc_html($text); ?>
    </div>
    <?php
}



add_action('post_grid_layout_element_css_custom_text', 'post_grid_layout_element_css_custom_text', 10);
function post_grid_layout_element_css_custom_text($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}




add_action('post_grid_layout_element_title', 'post_grid_layout_element_title');

function post_grid_layout_element_title($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';

    $post_link = get_permalink($post_id);
    $title = get_the_title($post_id);

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $char_end = isset($element['char_end']) ? $element['char_end'] : '...';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';


    if($char_limit > 0){
        $title = wp_trim_words($title, $char_limit, $char_end);
    }

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> title ">
        <?php if($link_to == 'post_link'): ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($title); ?></a>
        <?php else: ?>
            <?php echo esc_html($title); ?>
        <?php endif; ?>


    </div>
    <?php
}


add_action('post_grid_layout_element_css_title', 'post_grid_layout_element_css_title', 10);
function post_grid_layout_element_css_title($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}





add_action('post_grid_layout_element_title_link', 'post_grid_layout_element_title_link');

function post_grid_layout_element_title_link($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';


    $title = get_the_title($post_id);
    $post_link = get_permalink($post_id);

    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $char_end = isset($element['char_end']) ? $element['char_end'] : '...';


    if($char_limit > 0){
        $title = wp_trim_words($title, $char_limit, $char_end);
    }


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> title_link ">
        <?php if($link_to == 'post_link'): ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($title); ?></a>
        <?php else: ?>
            <?php echo esc_html($title); ?>
        <?php endif; ?>
    </div>
    <?php
}



add_action('post_grid_layout_element_css_title_link', 'post_grid_layout_element_css_title_link', 10);
function post_grid_layout_element_css_title_link($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}



add_action('post_grid_layout_element_content', 'post_grid_layout_element_content');

function post_grid_layout_element_content($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';

    $post_content = get_the_content($post_id);


    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $char_end = isset($element['char_end']) ? $element['char_end'] : '...';


    if($char_limit > 0){
        $post_content = wp_trim_words($post_content, $char_limit, $char_end);
    }

    $post_content = wpautop($post_content);
    $post_content = do_shortcode($post_content);


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> content ">
        <?php echo ($post_content); ?>
    </div>
    <?php
}



add_action('post_grid_layout_element_excerpt', 'post_grid_layout_element_excerpt');

function post_grid_layout_element_excerpt($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';

    $post_excerpt = get_the_excerpt($post_id);
    $post_link = get_permalink($post_id);

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $read_more_text = isset($element['read_more_text']) ? $element['read_more_text'] : __('Read more', 'post-grid');


    if($char_limit > 0){
        $post_excerpt = wp_trim_words($post_excerpt, $char_limit, '');
    }


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> excerpt ">
        <?php echo ($post_excerpt); ?>
        <?php
        if(!empty($read_more_text)):
            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($read_more_text); ?></a>
        <?php
        endif;
        ?>
    </div>
    <?php
}


add_action('post_grid_layout_element_css_excerpt', 'post_grid_layout_element_css_excerpt', 10);
function post_grid_layout_element_css_excerpt($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}




add_action('post_grid_layout_element_excerpt_read_more', 'post_grid_layout_element_excerpt_read_more');

function post_grid_layout_element_excerpt_read_more($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';

    $post_excerpt = get_the_excerpt($post_id);

    if(empty($post_excerpt)) return;

    $post_link = get_permalink($post_id);


    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $read_more_text = isset($element['read_more_text']) ? $element['read_more_text'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';


    if($char_limit > 0){
        $post_excerpt = wp_trim_words($post_excerpt, $char_limit, '');
    }


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> excerpt_read_more ">
        <?php echo ($post_excerpt); ?>
        <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($read_more_text); ?></a>

    </div>
    <?php
}


add_action('post_grid_layout_element_css_excerpt_read_more', 'post_grid_layout_element_css_excerpt_read_more', 10);
function post_grid_layout_element_css_excerpt_read_more($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}



add_action('post_grid_layout_element_read_more', 'post_grid_layout_element_read_more');

function post_grid_layout_element_read_more($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $post_link = get_permalink($post_id);


    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $read_more_text = isset($element['read_more_text']) ? $element['read_more_text'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';


    ?>
    <?php if($link_to == 'post_link'): ?>
        <a class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> read_more " target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($read_more_text); ?></a>
    <?php else: ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> read_more ">
            <?php echo esc_html($read_more_text); ?>
        </div>
    <?php endif; ?>

    <?php
}



add_action('post_grid_layout_element_css_read_more', 'post_grid_layout_element_css_read_more', 10);
function post_grid_layout_element_css_read_more($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}


add_action('post_grid_layout_element_media', 'post_grid_layout_element_media');

function post_grid_layout_element_media($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $media_source = isset($element['media_source']) ? $element['media_source'] : '';

    $featured_img_size = !empty($element['featured_img_size']) ? $element['featured_img_size'] : 'full';
    $thumb_linked = !empty($element['thumb_linked']) ? $element['thumb_linked'] : 'yes';

    $post_grid_post_settings = get_post_meta($post_id, 'post_grid_post_settings', true);


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> element-media ">
        <?php

        $html_media = '';

        $is_image = false;
        foreach($media_source as $source_id => $source_info){

            $args['source_id'] = $source_id;
            $args['source_args'] = $source_info;
            $args['post_settings'] = $post_grid_post_settings;


            //var_dump($source_id);
           // var_dump($source_info);

            $is_enable = isset($source_info['enable']) ? $source_info['enable'] : '';

            $media = post_grid_media($post_id, $args);

            if ( $is_image ) continue;

            if($is_enable == 'yes'){
                if(!empty($media)){

                    $html_media = post_grid_media($post_id, $args);
                    $is_image = true;
                }
                else{
                    $html_media = '';
                }
            }
        }

        echo $html_media;

        ?>


    </div>
    <?php
}


add_action('post_grid_layout_element_css_media', 'post_grid_layout_element_css_media', 10);
function post_grid_layout_element_css_media($args){

    //echo '<pre>'.var_export($args, true).'</pre>';
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $media_height = isset($element['media_height']) ? $element['media_height'] : '';
    $thumb_height_large = isset($media_height['large']) ? $media_height['large'] : '';
    $thumb_height_medium = isset($media_height['medium']) ? $media_height['medium'] : '';
    $thumb_height_small = isset($media_height['small']) ? $media_height['small'] : '';

    $height_large_type = isset($media_height['large_type']) ? $media_height['large_type'] : '';
    $height_medium_type = isset($media_height['medium_type']) ? $media_height['medium_type'] : '';
    $height_small_type = isset($media_height['small_type']) ? $media_height['small_type'] : '';

    $padding = isset($element['padding']) ? $element['padding'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            overflow: hidden;
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($padding)): ?>
            padding: <?php echo $padding; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        @media only screen and (min-width: 1024px ){
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{

                <?php if($height_large_type =='auto_height'):  ?>
                        height: auto;
                <?php elseif ($height_large_type =='fixed_height'): ?>
                    <?php if(!empty($thumb_height_large)): ?>
                        height: <?php echo $thumb_height_large; ?>;
                    <?php endif; ?>
                <?php elseif ($height_large_type =='max_height'): ?>
                    <?php if(!empty($thumb_height_large)): ?>
                        max-height: <?php echo $thumb_height_large; ?>;
                    <?php endif; ?>
                <?php endif; ?>
            }
        }
        @media only screen and ( min-width: 768px ) and ( max-width: 1023px ) {
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if($height_medium_type =='auto_height'):  ?>
                height: auto;
            <?php elseif ($height_medium_type =='fixed_height'): ?>
                <?php if(!empty($thumb_height_medium)): ?>
                    height: <?php echo $thumb_height_medium; ?>;
                <?php endif; ?>
            <?php elseif ($height_medium_type =='max_height'): ?>
                <?php if(!empty($thumb_height_medium)): ?>
                    max-height: <?php echo $thumb_height_medium; ?>;
                <?php endif; ?>
            <?php endif; ?>
            }
        }
        @media only screen and ( min-width: 0px ) and ( max-width: 767px ){
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if($height_small_type =='auto_height'):  ?>
                height: auto;
            <?php elseif ($height_small_type =='fixed_height'): ?>
                <?php if(!empty($thumb_height_small)): ?>
                    height: <?php echo $thumb_height_small; ?>;
                <?php endif; ?>
            <?php elseif ($height_small_type =='max_height'): ?>
                <?php if(!empty($thumb_height_small)): ?>
                    max-height: <?php echo $thumb_height_small; ?>;
                <?php endif; ?>
            <?php endif; ?>
            }
        }
    </style>
    <?php
}


add_action('post_grid_layout_element_thumb', 'post_grid_layout_element_thumb');

function post_grid_layout_element_thumb($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $default_thumb_src = isset($element['default_thumb_src']) ? $element['default_thumb_src'] : '';
    $thumb_size = isset($element['thumb_size']) ?  $element['thumb_size'] : 'large';

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';


    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), $thumb_size );
    $thumb_url = !empty($thumb['0']) ? $thumb['0'] : $default_thumb_src;

    if(empty($thumb_url)) return;


    $post_link = get_permalink($post_id);



    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> thumb ">
        <?php
        if($link_to == 'post_link'):
            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><img src="<?php echo esc_url_raw($thumb_url); ?>"></a>
        <?php
        else:
            ?>
            <img src="<?php echo esc_url_raw($thumb_url); ?>">
        <?php

        endif;
        ?>


    </div>
    <?php
}


add_action('post_grid_layout_element_css_thumb', 'post_grid_layout_element_css_thumb', 10);
function post_grid_layout_element_css_thumb($args){

    //echo '<pre>'.var_export($args, true).'</pre>';
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $thumb_height = isset($element['thumb_height']) ? $element['thumb_height'] : '';
    $thumb_height_large = isset($thumb_height['large']) ? $thumb_height['large'] : '';
    $thumb_height_medium = isset($thumb_height['medium']) ? $thumb_height['medium'] : '';
    $thumb_height_small = isset($thumb_height['small']) ? $thumb_height['small'] : '';

    $margin = isset($element['margin']) ? $element['margin'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">

        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            overflow: hidden;
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        }

        @media only screen and (min-width: 1024px ){
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if(!empty($thumb_height_large)): ?>
                max-height: <?php echo $thumb_height_large; ?>;
            <?php endif; ?>
            }
        }

        @media only screen and ( min-width: 768px ) and ( max-width: 1023px ) {
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if(!empty($thumb_height_medium)): ?>
                max-height: <?php echo $thumb_height_medium; ?>;
            <?php endif; ?>
            }
        }

        @media only screen and ( min-width: 0px ) and ( max-width: 767px ){
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if(!empty($thumb_height_small)): ?>
                max-height: <?php echo $thumb_height_small; ?>;
            <?php endif; ?>
            }
        }



    </style>
    <?php
}



add_action('post_grid_layout_element_thumb_link', 'post_grid_layout_element_thumb_link');

function post_grid_layout_element_thumb_link($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $default_thumb_src = isset($element['default_thumb_src']) ? $element['default_thumb_src'] : '';
    $thumb_size = isset($element['thumb_size']) ?  $element['thumb_size'] : 'large';

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';


    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), $thumb_size );
    $thumb_url = !empty($thumb['0']) ? $thumb['0'] : $default_thumb_src;

    if(empty($thumb_url)) return;


    $post_link = get_permalink($post_id);



    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> thumb_link ">
        <?php
        if($link_to == 'post_link'):
            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><img src="<?php echo esc_url_raw($thumb_url); ?>"></a>
        <?php
        else:
            ?>
            <img src="<?php echo esc_url_raw($thumb_url); ?>">
        <?php

        endif;
        ?>


    </div>
    <?php
}


add_action('post_grid_layout_element_css_thumb_link', 'post_grid_layout_element_css_thumb_link', 10);
function post_grid_layout_element_css_thumb_link($args){

    //echo '<pre>'.var_export($args, true).'</pre>';
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $thumb_height = isset($element['thumb_height']) ? $element['thumb_height'] : '';
    $thumb_height_large = isset($thumb_height['large']) ? $thumb_height['large'] : '';
    $thumb_height_medium = isset($thumb_height['medium']) ? $thumb_height['medium'] : '';
    $thumb_height_small = isset($thumb_height['small']) ? $thumb_height['small'] : '';

    $margin = isset($element['margin']) ? $element['margin'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">

        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            overflow: hidden;
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        }

        @media only screen and (min-width: 1024px ){
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if(!empty($thumb_height_large)): ?>
                max-height: <?php echo $thumb_height_large; ?>;
            <?php endif; ?>
            }
        }

        @media only screen and ( min-width: 768px ) and ( max-width: 1023px ) {
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if(!empty($thumb_height_medium)): ?>
                max-height: <?php echo $thumb_height_medium; ?>;
            <?php endif; ?>
            }
        }

        @media only screen and ( min-width: 0px ) and ( max-width: 767px ){
            .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
            <?php if(!empty($thumb_height_small)): ?>
                max-height: <?php echo $thumb_height_small; ?>;
            <?php endif; ?>
            }
        }



    </style>
    <?php
}













add_action('post_grid_layout_element_post_date', 'post_grid_layout_element_post_date');

function post_grid_layout_element_post_date($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $date_format = isset($element['date_format']) ? $element['date_format'] : 'd-m-Y';

    $post_link = get_permalink($post_id);
    $post_date = get_the_date($date_format, $post_id);

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> post_date ">
        <?php
        if($link_to == 'post_link'):
            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($post_date); ?></a>
            <?php
        else:
            ?>
            <?php echo esc_html($post_date); ?>
            <?php
        endif;
        ?>

    </div>
    <?php
}


add_action('post_grid_layout_element_css_post_date', 'post_grid_layout_element_css_post_date', 10);
function post_grid_layout_element_css_post_date($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}

add_action('post_grid_layout_element_author', 'post_grid_layout_element_author');

function post_grid_layout_element_author($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $date_format = isset($element['date_format']) ? $element['date_format'] : 'd-m-Y';

    $post_link = get_permalink($post_id);
    $post_author = get_the_author();

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> author ">
        <?php
        if($link_to == 'post_link'):
            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($post_author); ?></a>
        <?php
        elseif($link_to == 'author_posts_link'):
            $post_author_link = get_author_posts_url( get_the_author_meta( 'ID' ) ) ;

            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_author_link); ?>"><?php echo esc_html($post_author); ?></a>
            <?php

        else:
            ?>
            <?php echo esc_html($post_author); ?>
        <?php
        endif;
        ?>

    </div>
    <?php
}



add_action('post_grid_layout_element_css_author', 'post_grid_layout_element_css_author', 10);
function post_grid_layout_element_css_author($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}


add_action('post_grid_layout_element_author_link', 'post_grid_layout_element_author_link');

function post_grid_layout_element_author_link($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'post_link';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $date_format = isset($element['date_format']) ? $element['date_format'] : 'd-m-Y';

    $post_link = get_permalink($post_id);
    $post_author = get_the_author();

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> author ">
        <?php
        if($link_to == 'post_link'):
            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($post_author); ?></a>
        <?php
        elseif($link_to == 'author_posts_link'):
            $post_author_link = get_author_posts_url( get_the_author_meta( 'ID' ) ) ;

            ?>
            <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_author_link); ?>"><?php echo esc_html($post_author); ?></a>
        <?php

        else:
            ?>
            <?php echo esc_html($post_author); ?>
        <?php
        endif;
        ?>

    </div>
    <?php
}

add_action('post_grid_layout_element_css_author_link', 'post_grid_layout_element_css_author_link', 10);
function post_grid_layout_element_css_author_link($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
    </style>
    <?php
}





add_action('post_grid_layout_element_categories', 'post_grid_layout_element_categories');

function post_grid_layout_element_categories($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $max_count = isset($element['max_count']) ? (int) $element['max_count'] : 3;
    $wrapper_html = !empty($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $separator = isset($element['separator']) ? $element['separator'] : ', ';


    $term_list = wp_get_post_terms( $post_id, 'category', array( 'fields' => 'all' ) );

    $categories_html = '';
    $term_total_count = count($term_list);
    $max_term_limit = ($term_total_count < $max_count) ? $term_total_count : $max_count ;

    $i = 0;
    foreach ($term_list as $term){
        if($i >= $max_count) continue;

        $term_id = isset($term->term_id) ? $term->term_id : '';
        $term_name = isset($term->name) ? $term->name : '';
        $term_link = get_term_link($term_id);

        $categories_html .= '<a target="'.esc_attr($link_target).'" href="'.esc_url_raw($term_link).'">'.esc_html($term_name).'</a>';
        if( $i+1 < $max_term_limit){ $categories_html .= $separator;}

        $i++;
    }

    //var_dump($categories_html);

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> categories ">
        <?php echo sprintf($wrapper_html, $categories_html); ?>
    </div>
    <?php
}


add_action('post_grid_layout_element_css_categories', 'post_grid_layout_element_css_categories', 10);
function post_grid_layout_element_css_categories($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $link_color = isset($element['link_color']) ? $element['link_color'] : '';
    $text_color = isset($element['text_color']) ? $element['text_color'] : '';

    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($text_color)): ?>
            color: <?php echo $text_color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($link_color)): ?>
            color: <?php echo $link_color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}




add_action('post_grid_layout_element_tags', 'post_grid_layout_element_tags');

function post_grid_layout_element_tags($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $max_count = isset($element['max_count']) ? (int) $element['max_count'] : 3;
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $separator = isset($element['separator']) ? $element['separator'] : ', ';


    $term_list = wp_get_post_terms( $post_id, 'post_tag', array( 'fields' => 'all' ) );

    $categories_html = '';
    $term_total_count = count($term_list);
    $max_term_limit = ($term_total_count < $max_count) ? $term_total_count : $max_count ;

    $i = 0;
    foreach ($term_list as $term){
        if($i >= $max_count) continue;

        $term_id = isset($term->term_id) ? $term->term_id : '';
        $term_name = isset($term->name) ? $term->name : '';
        $term_link = get_term_link($term_id);

        $categories_html .= '<a target="'.esc_attr($link_target).'" href="'.esc_url_raw($term_link).'">'.esc_html($term_name).'</a>';
        if( $i+1 < $max_term_limit){ $categories_html .= $separator;}

        $i++;
    }

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> tags ">
        <?php echo sprintf($wrapper_html, $categories_html); ?>
    </div>
    <?php
}


add_action('post_grid_layout_element_css_tags', 'post_grid_layout_element_css_tags', 10);
function post_grid_layout_element_css_tags($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $link_color = isset($element['link_color']) ? $element['link_color'] : '';
    $text_color = isset($element['text_color']) ? $element['text_color'] : '';

    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($text_color)): ?>
            color: <?php echo $text_color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($link_color)): ?>
            color: <?php echo $link_color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}


add_action('post_grid_layout_element_comments_count', 'post_grid_layout_element_comments_count');

function post_grid_layout_element_comments_count($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';



    $comments_number = get_comments_number( $post_id );
    $comments_count_html = '';

    if(comments_open()){

        if ( $comments_number == 0 ) {
            $comments_count_html.= __('No Comments', 'post-grid');
        } elseif ( $comments_number > 1 ) {
            $comments_count_html.= sprintf(__('%s Comments', 'post-grid'), $comments_number);
        } else {
            $comments_count_html.= __('1 Comment', 'post-grid');
        }

        ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> tags ">
            <?php echo sprintf($wrapper_html, $comments_count_html); ?>
        </div>
        <?php

    }


}


add_action('post_grid_layout_element_css_comments_count', 'post_grid_layout_element_css_comments_count', 10);
function post_grid_layout_element_css_comments_count($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $color = isset($element['color']) ? $element['color'] : '';

    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($font_family)): ?>
            font-family: <?php echo $font_family; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}













add_action('post_grid_layout_element_share_button', 'post_grid_layout_element_share_button');

function post_grid_layout_element_share_button($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_color = isset($element['color']) ? $element['color'] : '';


    $post_title = get_the_title($post_id);
    $post_link = get_permalink($post_id);

    $share_button_html = '';

    $share_button_html.= '
		<span class="fb">
			<a target="'.$link_target.'" href="https://www.facebook.com/sharer/sharer.php?u='.$post_link.'"><i class="fab fa-facebook-square"></i></a>
		</span>
		<span class="twitter">
			<a target="'.$link_target.'" href="https://twitter.com/intent/tweet?url='.$post_link.'&text='.$post_title.'"><i class="fab fa-twitter-square"></i></a>
		</span>';

    $share_button_html = apply_filters('post_grid_filter_share_buttons', $share_button_html);

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> share_button ">
        <?php echo sprintf($wrapper_html, $share_button_html); ?>
    </div>
    <?php
}


add_action('post_grid_layout_element_css_share_button', 'post_grid_layout_element_css_share_button', 10);
function post_grid_layout_element_css_share_button($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $font_size = isset($element['font_size']) ? $element['font_size'] : '';

    $wrapper_margin = isset($element['wrapper_margin']) ? $element['wrapper_margin'] : '';

    $text_align = isset($element['text_align']) ? $element['text_align'] : '';
    $icon_margin = isset($element['icon_margin']) ? $element['icon_margin'] : '';
    $icon_color = isset($element['icon_color']) ? $element['icon_color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($icon_color)): ?>
            color: <?php echo $icon_color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($wrapper_margin)): ?>
            margin: <?php echo $wrapper_margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?> a{
        <?php if(!empty($icon_color)): ?>
            color: <?php echo $icon_color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($icon_margin)): ?>
            margin: <?php echo $icon_margin; ?>;
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}





add_action('post_grid_layout_element_hr', 'post_grid_layout_element_hr');

function post_grid_layout_element_hr($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $height = isset($element['height']) ? $element['height'] : '';
    $background_color = isset($element['background_color']) ? $element['background_color'] : '';


    ?>
    <hr class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> hr "></hr>
    <?php
}


add_action('post_grid_layout_element_css_hr', 'post_grid_layout_element_css_hr', 10);
function post_grid_layout_element_css_hr($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';

    $height = isset($element['height']) ? $element['height'] : '1px';

    $margin = isset($element['margin']) ? $element['margin'] : '';
    $background_color = isset($element['background_color']) ? $element['background_color'] : '';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($background_color)): ?>
            background-color: <?php echo $background_color; ?>;
        <?php endif; ?>
        <?php if(!empty($height)): ?>
            padding: <?php echo $height; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
        <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}





add_action('post_grid_layout_element_five_star', 'post_grid_layout_element_five_star');

function post_grid_layout_element_five_star($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $star_count = isset($element['star_count']) ? $element['star_count'] : 5;
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $star_icon = isset($element['star_html']) ? $element['star_html'] : '';

    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_color = isset($element['color']) ? $element['color'] : '';


    if(empty($star_count)) return;

    $load_fontawesome = !empty($post_grid_meta_options['load_fontawesome']) ? $post_grid_meta_options['load_fontawesome'] : 'no';
    $post_grid_settings = get_option('post_grid_settings');
    $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : '';

    if(empty($star_icon)){
        if($font_aw_version == 'v_5'){
            $star_icon =  '<i class="fas fa-star"></i>';
        }elseif ($font_aw_version =='v_4'){
            $star_icon =  '<i class="fa fa-star"></i>';
        }
    }



    $five_star_html = '';

    for($i=1; $i<=$star_count; $i++){

        $five_star_html.= $star_icon;
    }

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> five_star ">
        <?php echo sprintf($wrapper_html, $five_star_html); ?>
    </div>
    <?php
}



add_action('post_grid_layout_element_css_five_star', 'post_grid_layout_element_css_five_star', 10);
function post_grid_layout_element_css_five_star($args){


    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';


    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $color = isset($element['color']) ? $element['color'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : '';

    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';

    ?>
    <style type="text/css">
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>{
        <?php if(!empty($color)): ?>
            color: <?php echo $color; ?>;
        <?php endif; ?>
        <?php if(!empty($font_size)): ?>
            font-size: <?php echo $font_size; ?>;
        <?php endif; ?>
        <?php if(!empty($margin)): ?>
            margin: <?php echo $margin; ?>;
        <?php endif; ?>
        <?php if(!empty($text_align)): ?>
            text-align: <?php echo $text_align; ?>;
        <?php endif; ?>
        <?php if(!empty($css)): ?>
        <?php echo $css; ?>
        <?php endif; ?>
        }
        .layout-<?php echo $layout_id; ?> .element_<?php echo $index; ?>:hover{
        <?php if(!empty($css_hover)): ?>
            <?php echo $css_hover; ?>
        <?php endif; ?>
        }
    </style>
    <?php
}







