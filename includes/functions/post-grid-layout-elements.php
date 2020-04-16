<?php
if ( ! defined('ABSPATH')) exit;  // if direct access



add_action('post_grid_layout_element_custom_text', 'post_grid_layout_element_custom_text');

function post_grid_layout_element_custom_text($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';


    $title = get_the_title($post_id);

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $text = isset($element['text']) ?  $element['text'] : '';




    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> custom_text ">
        <?php echo esc_html($text); ?>
    </div>
    <?php
}



add_action('post_grid_layout_element_title', 'post_grid_layout_element_title');

function post_grid_layout_element_title($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';

    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $layout_id  = isset($args['layout_id']) ? $args['layout_id'] : '';


    $title = get_the_title($post_id);

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $char_end = isset($element['char_end']) ? $element['char_end'] : '...';


    if($char_limit > 0){
        $title = wp_trim_words($title, $char_limit, $char_end);
    }

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> title ">
        <?php echo esc_html($title); ?>
    </div>
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

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $char_end = isset($element['char_end']) ? $element['char_end'] : '...';


    if($char_limit > 0){
        $title = wp_trim_words($title, $char_limit, $char_end);
    }


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> title_link ">
        <a target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($title); ?></a>
    </div>
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


    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $char_limit = isset($element['char_limit']) ? (int) $element['char_limit'] : 0;
    $char_end = isset($element['char_end']) ? $element['char_end'] : '...';


    if($char_limit > 0){
        $post_excerpt = wp_trim_words($post_excerpt, $char_limit, $char_end);
    }


    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> excerpt ">
        <?php echo ($post_excerpt); ?>
    </div>
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
    $read_more_text = isset($element['read_more_text']) ? $element['read_more_text'] : '...';
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




add_action('post_grid_layout_element_read_more', 'post_grid_layout_element_read_more');

function post_grid_layout_element_read_more($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $post_link = get_permalink($post_id);


    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $read_more_text = isset($element['read_more_text']) ? $element['read_more_text'] : '...';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';


    ?>
    <a class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> read_more " target="<?php echo esc_attr($link_target); ?>" href="<?php echo esc_url_raw($post_link); ?>"><?php echo esc_html($read_more_text); ?></a>

    <?php
}


add_action('post_grid_layout_element_thumb', 'post_grid_layout_element_thumb');

function post_grid_layout_element_thumb($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $default_thumb = isset($element['default_thumb']) ? $element['default_thumb'] : '';
    $thumb_size = isset($element['thumb_size']) ?  $element['thumb_size'] : 'large';

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : '';


    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), $thumb_size );
    $thumb_url = !empty($thumb['0']) ? $thumb['0'] : $default_thumb;

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


add_action('post_grid_layout_element_thumb_link', 'post_grid_layout_element_thumb_link');

function post_grid_layout_element_thumb_link($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $default_thumb = isset($element['default_thumb']) ? $element['default_thumb'] : '';
    $thumb_size = isset($element['thumb_size']) ?  $element['thumb_size'] : 'large';

    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : '';


    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), $thumb_size );
    $thumb_url = !empty($thumb['0']) ? $thumb['0'] : $default_thumb;

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


add_action('post_grid_layout_element_post_date', 'post_grid_layout_element_post_date');

function post_grid_layout_element_post_date($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : '';
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



add_action('post_grid_layout_element_author', 'post_grid_layout_element_author');

function post_grid_layout_element_author($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : '';
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
        else:
            ?>
            <?php echo esc_html($post_author); ?>
        <?php
        endif;
        ?>

    </div>
    <?php
}



add_action('post_grid_layout_element_author_link', 'post_grid_layout_element_author_link');

function post_grid_layout_element_author_link($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_to = isset($element['link_to']) ? $element['link_to'] : 'author_link'; // author_link, post_link
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $date_format = isset($element['date_format']) ? $element['date_format'] : 'd-m-Y';

    $post_author_link = get_author_posts_url( get_the_author_meta( 'ID' ) ) ;
    $post_author = get_the_author();

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> author_link ">
        <?php
        if($link_to == 'author_link'):
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






add_action('post_grid_layout_element_categories', 'post_grid_layout_element_categories');

function post_grid_layout_element_categories($args){

    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';

    if(empty($post_id)) return;

    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $link_target = isset($element['link_target']) ? $element['link_target'] : '';
    $max_count = isset($element['max_count']) ? (int) $element['max_count'] : 3;
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
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

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> categories ">
        <?php echo sprintf($wrapper_html, $categories_html); ?>
    </div>
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
            $comments_count_html.= $comments_number . __(' Comments', 'post-grid');
        } else {
            $comments_count_html.= __('1 Comment', 'post-grid');
        }
    }

    ?>
    <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> tags ">
        <?php echo sprintf($wrapper_html, $comments_count_html); ?>
    </div>
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








