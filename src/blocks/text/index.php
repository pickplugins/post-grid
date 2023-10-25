<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockPostText
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/text/block.json',
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

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCustomCss;
        global $postGridCssY;




        $text = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $text = isset($attributes['text']) ? $attributes['text'] : [];



        $text = isset($attributes['text']) ? $attributes['text'] : [];
        $textOptions = isset($text['options']) ? $text['options'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
        $content = isset($textOptions['content']) ? $textOptions['content'] : '';


        $limitBy = isset($textOptions['limitBy']) ? $textOptions['limitBy'] : '';
        $limitCount = !empty($textOptions['limitCount']) ? $textOptions['limitCount'] : 999;

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;


        if ($limitBy == 'character') {
            $content = wp_strip_all_tags($content);
            $content = substr($content, 0, (int) $limitCount);
        } elseif ($limitBy == 'word') {

            $content = wp_trim_words($content, (int) $limitCount, '');
        }






        ob_start();




        if (!empty($wrapperTag)):
            ?>
            <<?php echo esc_attr($wrapperTag); ?> class="
                <?php echo esc_attr($blockId); ?>">
                <?php echo $content; ?>
            </<?php echo esc_attr($wrapperTag); ?>>
            <?php

        endif;



        ?>









        <?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostText();