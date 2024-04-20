<?php
if (!defined('ABSPATH')) exit;  // if direct access


// add_shortcode('blockData', 'blockData');

// function blockData()
// {
//     $build_dir = post_grid_plugin_dir . 'build/blocks';

//     foreach (scandir($build_dir) as $result) {
//         $block_location = $build_dir . '/' . $result;
//         if (!is_dir($block_location) || '.' === $result || '..' === $result) {
//             continue;
//         }
//         $blockJson = $block_location . '/block.json';

//         $json = file_get_contents($blockJson);
//         $jsonObj = json_decode($json);
//         //echo $jsonObj->name;

//         echo "registerBlockType('$jsonObj->name', { title: '$jsonObj->title', description: '$jsonObj->description' });
// ";

//         echo '<br>';
//     }
// }






//add_image_size( 'custom-size', 435, 435, true );
//add_image_size( 'center-435', 220, 220, array( 'center', 'center' ) );


function eventQuery()
{


    $meta_query = array(
        'relation' => 'OR',
        array(
            'key' => 'event_date',
            'value' => 20220623,
            'compare' => '<',
            'type' => 'DATE',
        )
    );


    $args = array(
        'post_type'    => 'post',

        'meta_query' => $meta_query,


    );




    $query = new WP_Query($args);


    $html = ob_start();

    while ($query->have_posts()) : $query->the_post();
        $post_id = get_the_ID();

        $title = get_the_title($post_id);

        echo $title;
        echo '<br/>';
    endwhile;

    return ob_get_clean();
}

add_shortcode('eventQuery', 'eventQuery');



function post_grid_get_first_post($post_type = 'post')
{

    $args = array(
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => 1,
    );

    $post_id = '';

    $wp_query = new WP_Query($args);

    if ($wp_query->have_posts()) :
        while ($wp_query->have_posts()) : $wp_query->the_post();
            $product_id = get_the_id();
            return $product_id;
        endwhile;

    endif;
}



function post_grid_recursive_sanitize_arr($array)
{

    foreach ($array as $key => &$value) {
        if (is_array($value)) {
            $value = post_grid_recursive_sanitize_arr($value);
        } else {
            $value = wp_kses_post($value);
        }
    }

    return $array;
}




function post_grid_add_shortcode_column($columns)
{
    return array_merge(
        $columns,
        array('shortcode' => __('Shortcode', 'post-grid'))
    );
}
add_filter('manage_post_grid_posts_columns', 'post_grid_add_shortcode_column');


function post_grid_posts_shortcode_display($column, $post_id)
{
    if ($column == 'shortcode') {
?>
<input style="background:#bfefff" type="text" onClick="this.select();"
  value="[post_grid <?php echo 'id=&quot;' . esc_attr($post_id) . '&quot;'; ?>]" /><br />
<textarea cols="50" rows="1" style="background:#bfefff"
  onClick="this.select();"><?php echo '<?php echo do_shortcode("[post_grid id=';
                                                                                            echo "'" . esc_attr($post_id) . "']";
                                                                                            echo '"); ?>'; ?></textarea>
<?php

    }
}
add_action('manage_post_grid_posts_custom_column', 'post_grid_posts_shortcode_display', 10, 2);







function post_grid_get_media($item_post_id, $media_source, $featured_img_size, $thumb_linked)
{

    $item_post_permalink = apply_filters('post_grid_item_post_permalink', get_permalink($item_post_id));

    $post_grid_post_settings = get_post_meta($item_post_id, 'post_grid_post_settings');
    $item_thumb_placeholder = apply_filters('post_grid_item_thumb_placeholder', post_grid_plugin_url . 'assets/images/placeholder.png');

    $custom_thumb_source = isset($post_grid_post_settings[0]['custom_thumb_source']) ? $post_grid_post_settings[0]['custom_thumb_source'] : $item_thumb_placeholder;
    $thumb_custom_url = isset($post_grid_post_settings[0]['thumb_custom_url']) ? $post_grid_post_settings[0]['thumb_custom_url'] : '';
    $font_awesome_icon = isset($post_grid_post_settings[0]['font_awesome_icon']) ? $post_grid_post_settings[0]['font_awesome_icon'] : '';
    $font_awesome_icon_color = isset($post_grid_post_settings[0]['font_awesome_icon_color']) ? $post_grid_post_settings[0]['font_awesome_icon_color'] : '#737272';
    $font_awesome_icon_size = isset($post_grid_post_settings[0]['font_awesome_icon_size']) ? $post_grid_post_settings[0]['font_awesome_icon_size'] : '50px';
    $custom_youtube_id = isset($post_grid_post_settings[0]['custom_youtube_id']) ? $post_grid_post_settings[0]['custom_youtube_id'] : '';
    $custom_vimeo_id = isset($post_grid_post_settings[0]['custom_vimeo_id']) ? $post_grid_post_settings[0]['custom_vimeo_id'] : '';
    $custom_dailymotion_id = isset($post_grid_post_settings[0]['custom_dailymotion_id']) ? $post_grid_post_settings[0]['custom_dailymotion_id'] : '';
    $custom_mp3_url = isset($post_grid_post_settings[0]['custom_mp3_url']) ? $post_grid_post_settings[0]['custom_mp3_url'] : '';
    $custom_soundcloud_id = isset($post_grid_post_settings[0]['custom_soundcloud_id']) ? $post_grid_post_settings[0]['custom_soundcloud_id'] : '';


    $html_thumb = '';


    if ($media_source == 'featured_image') {
        $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($item_post_id), $featured_img_size);
        $alt_text = get_post_meta(get_post_thumbnail_id($item_post_id), '_wp_attachment_image_alt', true);
        $thumb_url = isset($thumb['0']) ? $thumb['0'] : '';

        if (!empty($thumb_url)) {
            if ($thumb_linked == 'yes') {
                if (!empty($thumb_custom_url)) {
                    $html_thumb .= '<a href="' . esc_url_raw($thumb_custom_url) . '"><img alt="' . $alt_text . '" src="' . esc_url_raw(esc_url_raw($thumb_url)) . '" /></a>';
                } else {
                    $html_thumb .= '<a href="' . esc_url_raw($item_post_permalink) . '"><img alt="' . $alt_text . '" src="' .  esc_url_raw($thumb_url) . '" /></a>';
                }
            } else {
                $html_thumb .= '<img alt="' . $alt_text . '" src="' .  esc_url_raw($thumb_url) . '" />';
            }
        } else {
            $html_thumb .= '';
        }
    } elseif ($media_source == 'empty_thumb') {

        if ($thumb_linked == 'yes') {
            $html_thumb .= '<a class="custom" href="' . esc_url_raw($item_post_permalink) . '"><img src="' . post_grid_plugin_url . 'assets/images/placeholder.png" /></a>';
        } else {
            $html_thumb .= '<img class="custom" src="' . post_grid_plugin_url . 'assets/images/placeholder.png" />';
        }
    } elseif ($media_source == 'custom_thumb') {
        if (!empty($custom_thumb_source)) {
            if ($thumb_linked == 'yes') {
                $html_thumb .= '<a href="' . esc_url_raw($item_post_permalink) . '"><img src="' .  esc_url_raw($custom_thumb_source) . '" /></a>';
            } else {
                $html_thumb .= '<img src="' .  esc_url_raw($custom_thumb_source) . '" />';
            }
        }
    } elseif ($media_source == 'font_awesome') {
        if (!empty($custom_thumb_source)) {
            if ($thumb_linked == 'yes') {
                $html_thumb .= '<a href="' . esc_url_raw($item_post_permalink) . '"><i style="color:' . $font_awesome_icon_color . ';font-size:' . $font_awesome_icon_size . '" class="fa ' . $font_awesome_icon . '"></i></a>';
            } else {
                $html_thumb .= '<i style="color:' . $font_awesome_icon_color . ';font-size:' . $font_awesome_icon_size . '" class="fa ' . $font_awesome_icon . '"></i>';
            }
        }
    } elseif ($media_source == 'first_image') {
        //global $post, $posts;
        $post = get_post($item_post_id);
        // $post_content = $post->post_content;
        $post_content = isset($post->post_content) ? ($post->post_content) : '';

        $first_img = '';
        ob_start();
        ob_end_clean();
        $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post_content, $matches);

        if (!empty($matches[1][0]))
            $first_img = isset($matches[1][0]) ? $matches[1][0] : '';

        if (empty($first_img)) {
            $html_thumb .= '';
        } else {

            if ($thumb_linked == 'yes') {
                $html_thumb .= '<a href="' . esc_url_raw($item_post_permalink) . '"><img src="' . esc_url_raw($first_img) . '" /></a>';
            } else {
                $html_thumb .= '<img src="' . esc_url_raw($first_img) . '" />';
            }
        }
    } elseif ($media_source == 'first_gallery') {

        $gallery = get_post_gallery($item_post_id, false);

        if (!empty($gallery)) {
            $html_thumb .= '<div class="gallery owl-carousel">';

            if (!empty($gallery['ids'])) {
                $ids = $gallery['ids'];
                $ids = explode(',', $ids);
            } else {
                $ids = array();
            }


            foreach ($ids as $id) {

                $src = wp_get_attachment_url($id);
                $alt_text = get_post_meta($id, '_wp_attachment_image_alt', true);
                $html_thumb .= '<img src="' . esc_url_raw($src) . '" class="gallery-item" alt="' . $alt_text . '" />';
            }

            $html_thumb .= '</div>';
        }
    } elseif ($media_source == 'first_youtube') {
        $post = get_post($item_post_id);
        //$post_type = $post->post_type;
        $post_type = isset($post->post_type) ? $post->post_type : '';

        if ($post_type == 'page') {
            $content = '';
            $html_thumb .= '';
        } else {
            //$content = do_shortcode($post->post_content);
            $content = isset($post->post_content) ? do_shortcode($post->post_content) : '';
        }

        $content = apply_filters('the_content', $content);
        $embeds = get_media_embedded_in_content($content);


        foreach ($embeds as $key => $embed) {

            if (strchr($embed, 'youtube')) {
                $embed_youtube = $embed;
            }
        }

        if (!empty($embed_youtube)) {
            $html_thumb .= $embed_youtube;
        } else {
            $html_thumb .= '';
        }
    } elseif ($media_source == 'first_vimeo') {

        $post = get_post($item_post_id);
        //$post_type = $post->post_type;
        $post_type = isset($post->post_type) ? $post->post_type : '';

        if ($post_type == 'page') {
            $content = '';
            $html_thumb .= '';
        } else {

            //$content = do_shortcode($post->post_content);
            $content = isset($post->post_content) ? do_shortcode($post->post_content) : '';
        }
        $embeds = get_media_embedded_in_content($content);

        foreach ($embeds as $key => $embed) {

            if (strchr($embed, 'vimeo')) {

                $embed_youtube = $embed;
            }
        }

        if (!empty($embed_youtube)) {
            $html_thumb .= $embed_youtube;
        } else {
            $html_thumb .= '';
        }
    } elseif ($media_source == 'first_dailymotion') {

        $post = get_post($item_post_id);
        $post_type = isset($post->post_type) ? $post->post_type : '';

        if ($post_type == 'page') {
            $content = '';
            $html_thumb .= '';
        } else {

            $content = isset($post->post_content) ? do_shortcode($post->post_content) : '';
        }

        $content = apply_filters('the_content', $content);
        $embeds = get_media_embedded_in_content($content);

        foreach ($embeds as $key => $embed) {

            if (strchr($embed, 'dailymotion')) {

                $embed_youtube = $embed;
            }
        }

        if (!empty($embed_youtube)) {
            $html_thumb .= $embed_youtube;
        } else {
            $html_thumb .= '';
        }
    } elseif ($media_source == 'first_mp3') {

        $post = get_post($item_post_id);
        $post_type = isset($post->post_type) ? $post->post_type : '';

        if ($post_type == 'page') {
            $content = '';
            $html_thumb .= '';
        } else {

            $content = isset($post->post_content) ? do_shortcode($post->post_content) : '';
        }

        $content = apply_filters('the_content', $content);
        $embeds = get_media_embedded_in_content($content);

        foreach ($embeds as $key => $embed) {

            if (strchr($embed, 'mp3')) {

                $embed_youtube = $embed;
            }
        }

        if (!empty($embed_youtube)) {
            $html_thumb .= $embed_youtube;
        } else {
            $html_thumb .= '';
        }
    } elseif ($media_source == 'first_soundcloud') {

        $post = get_post($item_post_id);
        //$post_type = $post->post_type;
        $post_type = isset($post->post_type) ? $post->post_type : '';

        ////var_dump($post_type);

        if ($post_type == 'page') {
            $content = '';
            $html_thumb .= '';
        } else {

            // $content = do_shortcode($post->post_content);
            $content = isset($post->post_content) ? do_shortcode($post->post_content) : '';
        }

        $content = apply_filters('the_content', $content);
        $embeds = get_media_embedded_in_content($content);

        foreach ($embeds as $key => $embed) {

            if (strchr($embed, 'soundcloud')) {

                $embed_youtube = $embed;
            }
        }

        if (!empty($embed_youtube)) {
            $html_thumb .= $embed_youtube;
        } else {
            $html_thumb .= '';
        }
    } elseif ($media_source == 'custom_youtube') {

        if (!empty($custom_youtube_id)) {
            $html_thumb .= '<iframe frameborder="0" allowfullscreen="" src="http://www.youtube.com/embed/' . $custom_youtube_id . '?feature=oembed"></iframe>';
        }
    } elseif ($media_source == 'custom_vimeo') {

        if (!empty($custom_vimeo_id)) {
            $html_thumb .= '<iframe frameborder="0" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" src="https://player.vimeo.com/video/' . $custom_vimeo_id . '"></iframe>';
        }
    } elseif ($media_source == 'custom_dailymotion') {

        if (!empty($custom_dailymotion_id)) {
            $html_thumb .= '<iframe frameborder="0" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" src="//www.dailymotion.com/embed/video/' . $custom_dailymotion_id . '"></iframe>';
        }
    } elseif ($media_source == 'custom_mp3') {

        if (!empty($custom_mp3_url)) {
            $html_thumb .= do_shortcode('[audio src="' . esc_url_raw($custom_mp3_url) . '"]');
        }
    } elseif ($media_source == 'custom_video') {

        ////var_dump($post_grid_post_settings);

        $video_html = '';


        if (!empty($post_grid_post_settings[0]['custom_video_MP4'])) :

            $video_html .= 'mp4="' . $post_grid_post_settings[0]['custom_video_MP4'] . '"';

        elseif (!empty($post_grid_post_settings[0]['custom_video_WEBM'])) :

            $video_html .= 'webm="' . $post_grid_post_settings[0]['custom_video_WEBM'] . '"';

        elseif (!empty($post_grid_post_settings[0]['custom_video_OGV'])) :

            $video_html .= 'ogv="' . $post_grid_post_settings[0]['custom_video_OGV'] . '"';

        endif;

        $html_thumb .= do_shortcode('[video ' . $video_html . '][/video]');
    } elseif ($media_source == 'custom_soundcloud') {

        if (!empty($custom_soundcloud_id)) {
            $html_thumb .= '<iframe width="100%" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' . $custom_soundcloud_id . '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
        }
    }




    return $html_thumb;
}






function post_grid_media($post_id, $args)
{

    $source_id = $args['source_id'];
    $source_args = $args['source_args'];
    $post_settings = $args['post_settings'];

    $thumb_linked = '';

    $item_post_permalink = apply_filters('post_grid_item_post_permalink', get_permalink($post_id));



    $html_thumb = '';

    ob_start();


    if ($source_id == 'featured_image') {


        $image_size = isset($source_args['image_size']) ? $source_args['image_size'] : 'large';
        $link_to = isset($source_args['link_to']) ? $source_args['link_to'] : 'post_link';
        $link_target = isset($source_args['link_target']) ? $source_args['link_target'] : '';

        $thumb_custom_url = isset($post_settings['thumb_custom_url']) ? $post_settings['thumb_custom_url'] : '';



        $post_thumbnail = get_the_post_thumbnail($post_id, $image_size);



        if (!empty($post_thumbnail)) {
            if ($link_to == 'post_link') {
                if (!empty($thumb_custom_url)) {

                    $html_thumb .= '<a target="' . esc_attr($link_target) . '" href="' . esc_url($thumb_custom_url) . '">' . ($post_thumbnail) . '</a>';
                } else {

                    $html_thumb .= '<a target="' . esc_attr($link_target) . '" href="' . esc_url($item_post_permalink) . '">' . ($post_thumbnail) . '</a>';
                }
            } else {
                $html_thumb .= $post_thumbnail;
            }
        } else {
            $html_thumb .= '';
        }
    } elseif ($source_id == 'empty_thumb') {

        $link_to = isset($source_args['link_to']) ? $source_args['link_to'] : 'post_link';
        $link_target = isset($source_args['link_target']) ? $source_args['link_target'] : '';

        $default_thumb_src = isset($source_args['default_thumb_src']) ? $source_args['default_thumb_src'] : post_grid_plugin_url . 'assets/images/placeholder.png';


        if ($link_to == 'post_link') {
            $html_thumb .= '<a target="' . esc_attr($link_target) . '" class="custom" href="' . esc_url($item_post_permalink) . '"><img src="' . esc_url($default_thumb_src) . '" /></a>';
        } else {
            $html_thumb .= '<img class="custom" src="' . esc_url($default_thumb_src) . '" />';
        }
    } elseif ($source_id == 'first_image') {

        $link_to = isset($source_args['link_to']) ? $source_args['link_to'] : 'post_link';
        $link_target = isset($source_args['link_target']) ? $source_args['link_target'] : '';


        //global $post, $posts;
        $post = get_post($post_id);
        //$post_content = $post->post_content;
        $post_content = isset($post->post_content) ? ($post->post_content) : '';

        $first_img = '';
        ob_start();
        ob_end_clean();
        $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post_content, $matches);

        if (!empty($matches[1][0]))
            $first_img = isset($matches[1][0]) ? $matches[1][0] : '';

        if (empty($first_img)) {
            $html_thumb .= '';
        } else {

            if ($link_to == 'post_link') {
                $html_thumb .= '<a target="' . esc_attr($link_target) . '" href="' . esc_url($item_post_permalink) . '"><img src="' . esc_url($first_img) . '" /></a>';
            } else {
                $html_thumb .= '<img src="' . esc_url($first_img) . '" />';
            }
        }
    } elseif ($source_id == 'siteorigin_first_image') {

        $link_to = isset($source_args['link_to']) ? $source_args['link_to'] : 'post_link';
        $link_target = isset($source_args['link_target']) ? $source_args['link_target'] : '';

        //global $post, $posts;
        $post = get_post($post_id);
        /**$post_content = $post->post_content; */
        $post_content = htmlspecialchars_decode($post->post_content, ENT_QUOTES);
        $first_img = '';
        ob_start();
        ob_end_clean();


        if (class_exists('SiteOrigin_Widgets_Bundle')) {
            $output = str_replace(array('\/'), "\\", $post_content); // SiteOrigin adds \/ combinations
            $output = str_replace(array('src=\\'), 'src=', esc_url_raw($output));   // SiteOrigin adds \\
            $output = str_replace(array('"url":'), ' <img src=', esc_url_raw($output));  //SiteOrigin does change the src to url
            $output = str_replace(array('&lt;img src=&quot;'), '<img src="', esc_url_raw($output));    //SiteOrigin does add &&lt and &quot combinations which are not removed
            $output = str_replace(array('&quot;"'), '"', $output); // Remove this quot combination
            $output = str_replace(array('&quot;'), '', $output);   // Remove this quot combination

            /** search for post containing SiteOrigin image */
            $findme = '"image":';
            $start = strpos($post_content, $findme);
            $findme = ',"image_fallback"';
            $end = strpos($post_content, $findme);
            $lengte = $end - $start;
            $search = (substr($post_content, $start, $lengte));

            if ($search != "") {
                /** split the text */
                $stringParts = explode(":", $search);
                $firstPart = isset($stringParts[0]) ? $stringParts[0] : '';
                /** copy the post_id */
                $ImagePost = isset($stringParts[1]) ? $stringParts[1] : '';

                $getimage = wp_get_attachment_image($ImagePost, $size = 'medium');

                if ($getimage != "") {
                    $output = $getimage;
                }
            }
        } else {
            /** no SiteOrigin image so get the matches */
            $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post_content, $matches);
        }

        $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*?>/i', $output, $matches);
if ($output = '0') {
$output = preg_match_all('/?<img src=[\'"]([^\'"]+)[\'"].*?>/i', $output, $matches);
}
if (!empty($matches[1][0])) {
$first_img = isset($matches[1][0]) ? $matches[1][0] : '';

$last_char = $first_img[strlen($first_img) - 1]; // Check to see if a slash is at the end of the line
if ($last_char == '\\') {
$first_img = substr($first_img, 0, -1);
}
}


if (empty($first_img)) {
$html_thumb .= '';
} else {

if ($link_to == 'post_link') {
$html_thumb .= '<a target="' . esc_attr($link_target) . '" href="' . esc_url($item_post_permalink) . '"><img
    src="' . esc_url($first_img) . '" /></a>';
} else {
$html_thumb .= '<img src="' . esc_url($first_img) . '" />';
}
}
} else {
do_action('post_grid_media', $post_id, $args);
}


echo $html_thumb;

$html_thumb = ob_get_clean();

return $html_thumb;
}














function post_grid_term_slug_list($post_id)
{


$term_slug_list = '';

$post_taxonomies = get_post_taxonomies($post_id);

foreach ($post_taxonomies as $taxonomy) {

$term_list[] = wp_get_post_terms($post_id, $taxonomy, array("fields" => "all"));
}

if (!empty($term_list)) {
foreach ($term_list as $term_key => $term) {
foreach ($term as $term_id => $term) {
$term_slug_list .= $term->slug . ' ';
}
}
}


return $term_slug_list;
}










function post_grid_layout_content_ajax()
{

if (current_user_can('manage_options')) {


$layout_key = sanitize_text_field($_POST['layout']);

$class_post_grid_functions = new class_post_grid_functions();
$post_grid_layout_content = get_option('post_grid_layout_content');

if (empty($post_grid_layout_content)) {
$layout = $class_post_grid_functions->layout_content($layout_key);
} else {
$layout = $post_grid_layout_content[$layout_key];
}



?>
<div class="<?php echo esc_attr($layout_key); ?>">
  <?php

            foreach ($layout as $item_key => $item_info) {
                $item_key = $item_info['key'];
            ?>
  <div class="item <?php echo esc_attr($item_key); ?>" style=" <?php echo esc_attr($item_info['css']); ?> ">

    <?php

                    if ($item_key == 'thumb') {

                    ?>
    <img src="<?php echo esc_url(post_grid_plugin_url . 'assets/images/placeholder.png'); ?>" />
    <?php
                    } elseif ($item_key == 'title') {

                    ?>
    Lorem Ipsum is simply

    <?php
                    } elseif ($item_key == 'excerpt') {

                    ?>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text
    <?php
                    } elseif ($item_key == 'excerpt_read_more') {

                    ?>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text <a href="#">Read more</a>
    <?php
                    } elseif ($item_key == 'read_more') {

                    ?>
    <a href="#">Read more</a>
    <?php
                    } elseif ($item_key == 'post_date') {

                    ?>
    18/06/2015
    <?php
                    } elseif ($item_key == 'author') {

                    ?>
    PickPlugins
    <?php
                    } elseif ($item_key == 'categories') {

                    ?>
    <a hidden="#">Category 1</a> <a hidden="#">Category 2</a>
    <?php
                    } elseif ($item_key == 'tags') {

                    ?>
    <a hidden="#">Tags 1</a> <a hidden="#">Tags 2</a>
    <?php
                    } elseif ($item_key == 'comments_count') {

                    ?>
    3 Comments
    <?php
                    }

                    // WooCommerce
                    elseif ($item_key == 'wc_full_price') {

                    ?>
    <del>$45</del> - <ins>$40</ins>
    <?php
                    } elseif ($item_key == 'wc_sale_price') {

                    ?>
    $45
    <?php
                    } elseif ($item_key == 'wc_regular_price') {

                    ?>
    $45
    <?php
                    } elseif ($item_key == 'wc_add_to_cart') {

                    ?>
    Add to Cart
    <?php
                    } elseif ($item_key == 'wc_rating_star') {

                    ?>
    *****
    <?php
                    } elseif ($item_key == 'wc_rating_text') {

                    ?>
    2 Reviews
    <?php
                    } elseif ($item_key == 'wc_categories') {

                    ?>
    <a hidden="#">Category 1</a> <a hidden="#">Category 2</a>
    <?php
                    } elseif ($item_key == 'wc_tags') {

                    ?>
    <a hidden="#">Tags 1</a> <a hidden="#">Tags 2</a>
    <?php
                    } elseif ($item_key == 'edd_price') {

                    ?>
    $45
    <?php
                    } else {

                        echo esc_html($item_info['name']);
                    }

                    ?>



  </div>
  <?php
            }

            ?>
</div>
<?php

    }




    die();
}

add_action('wp_ajax_post_grid_layout_content_ajax', 'post_grid_layout_content_ajax');