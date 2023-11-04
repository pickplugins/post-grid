<?php
if (!defined('ABSPATH'))
    exit();



class BlockPostMeta
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-meta/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-meta/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/post-meta/block.json',
            array(

                'render_callback' => array($this, 'theHTML'),



            )
        );
    }

    function front_script($attributes)
    {
    }
    function front_style($attributes)
    {
    }


    function nestedToSingle($array, $slug = '')
    {
        $singleDimArray = [];

        if (is_array($array))
            foreach ($array as $index => $item) {

                if (is_array($item)) {
                    $singleDimArray = array_merge($singleDimArray, $this->nestedToSingle($item, $index));
                } else {
                    $index1 = !empty($slug) ? $slug . '-' . $index : $index;


                    $singleDimArray['{' . $index1 . '}'] = $item;
                }
            }

        return $singleDimArray;
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';




        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'build/blocks/post-categories/index.js', array('wp-element'));

            // wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'src/blocks/post-categories/index.css');
        }



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $post_url = get_the_permalink($post_ID);

        $template = isset($attributes['template']) ? $attributes['template'] : '';
        $templateLoop = isset($attributes['templateLoop']) ? $attributes['templateLoop'] : '<div>{title}</div><div>{details}</div>';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

        $meta = isset($attributes['meta']) ? $attributes['meta'] : [];
        $metaOptions = isset($meta['options']) ? $meta['options'] : [];

        $metaKey = isset($metaOptions['key']) ? $metaOptions['key'] : '';
        $metaKeyType = isset($metaOptions['type']) ? $metaOptions['type'] : '';

        $templateFront = isset($attributes['templateFront']) ? $attributes['templateFront'] : '';


        $metaValue = '';


        if ($metaKeyType != 'string') {

            if (is_plugin_active('advanced-custom-fields/acf.php') || is_plugin_active('advanced-custom-fields-pro/acf.php')) {

                $metaValue = get_field($metaKey, $post_ID);
            }
        } else {

            $metaValue = get_post_meta($post_ID, $metaKey, true);
        }


        $obj['id'] = $post_ID;
        $obj['type'] = 'post';



        $wrapperClass = parse_css_class($wrapperClass, $obj);




        ob_start();




        //echo strtr($templateFront, $vars);







        if (!empty($wrapperTag)):
            ?>
                        <<?php echo esc_attr($wrapperTag); ?> class="
                            <?php echo esc_attr($blockId); ?>
                            <?php echo esc_attr($wrapperClass); ?>">

                            <?php


                            if (gettype($metaValue) == 'array' || gettype($metaValue) == 'object') {


                                if (!empty($templateLoop)) {

                                    if (is_array($metaValue))
                                        foreach ($metaValue as $items) {

                                            $tempArgs = [];

                                            if (is_array($items))
                                                foreach ($items as $itemIndex => $item) {
                                                    $tempArgs['{' . $itemIndex . '}'] = $item;
                                                }

                                            echo strtr($templateLoop, (array) $tempArgs);
                                        }
                                } else {
                                    $singleArrayForCategory = $this->nestedToSingle($metaValue);
                                    echo strtr($template, (array) $singleArrayForCategory);
                                }
                            } else {

                                $singleArray = ['{metaValue}' => $metaValue];

                                echo strtr($template, (array) $singleArray);
                            }

                            ?>


                        </<?php echo esc_attr($wrapperTag); ?>>

                        <?php

        endif;





        return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostMeta();