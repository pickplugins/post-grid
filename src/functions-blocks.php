<?php
if (!defined('ABSPATH')) exit;  // if direct access


function post_grid_global_css()
{

    global $postGridCss;

    //var_dump($postGridCss);


    $defaultCss = '';
    $reponsiveCssGroups = [];
    $reponsiveCss = '';


    foreach ($postGridCss as $arg) {

        $attr = isset($arg['attr']) ? $arg['attr'] : '';
        $id = isset($arg['id']) ? $arg['id'] : '';
        $default = isset($arg['default']) ? $arg['default'] : '';
        $reponsive = isset($arg['reponsive']) ? $arg['reponsive'] : '';

        if (!empty($default)) {
            $defaultCss .= $id . '{' . $attr . ':' . $default . '}';
        }



        foreach ($reponsive as $device => $value) {

            if (!empty($value))
                $reponsiveCssGroups[$device][] = ['id' => $id, 'attr' => $attr,  'val' => $value];
        }
    }





    foreach ($reponsiveCssGroups as $index => $media) {



        if ($index === 'Mobile') {
            $reponsiveCss .= '@media only screen and (min-width: 0px) and (max-width: 360px){';
        }
        if ($index === 'Tablet') {
            $reponsiveCss .= '@media only screen and (min-width: 361px) and (max-width: 780px){';
        }
        if ($index === 'Desktop') {
            $reponsiveCss .= '@media only screen and (min-width: 781px) and (max-width: 1024px){';
        }



        foreach ($media as  $arg) {




            $attr = isset($arg['attr']) ? $arg['attr'] : '';
            $id = isset($arg['id']) ? $arg['id'] : '';
            $val = isset($arg['val']) ? $arg['val'] : '';

            if (!empty($val))
                $reponsiveCss .= $id . '{' . $attr . ':' . $val . '}';
        }

        $reponsiveCss .= '}';
    }




?>
    <style>
        <?php echo $defaultCss; ?>
    </style>

    <style>
        <?php echo $reponsiveCss; ?>
    </style>

<?php

    //$postGridCss .= 'asdasdasd';
    //echo serialize($postGridCss);

    //echo $postGridCss;
}
add_action('wp_footer', 'post_grid_global_css');



add_filter('block_categories_all', 'post_grid_block_categories', 10, 2);


/**
 * Register custom category for blocks
 */

function post_grid_block_categories($categories, $post)
{
    return array_merge(
        array(
            array(
                'slug'  => 'post-grid',
                'title' => __('Post Grid', 'boilerplate'),
            ),
        ),
        $categories,
    );
}



function post_grid_allowed_block_types($allowed_block_types, $editor_context)
{

    $post_grid_settings = get_option('post_grid_settings');

    $block_list = isset($post_grid_settings['block_list']) ? $post_grid_settings['block_list'] : [];

    ////error_log(serialize($block_list));

    return $allowed_block_types;
}
add_filter('allowed_block_types_all', 'post_grid_allowed_block_types', 99, 2);
