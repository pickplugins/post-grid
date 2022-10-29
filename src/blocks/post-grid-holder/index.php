<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostText
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/text/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/text/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/text', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML')
        ));
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


        global $postGridCss;
        global $postGridCustomCss;



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $text = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $text = isset($attributes['text']) ? $attributes['text'] : [];



        $text = isset($attributes['text']) ? $attributes['text'] : [];
        $textOptions = isset($text['options']) ? $text['options'] : [];
        $textStyles = isset($text['styles']) ? $text['styles'] : [];
        $textTypo = isset($text['typo']) ? $text['typo'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
        $content = isset($textOptions['content']) ? $textOptions['content'] : '';


        $textColor = isset($textStyles['color']) ? $textStyles['color'] : [];
        $textbgColor = isset($textStyles['bgColor']) ? $textStyles['bgColor'] : [];
        $textPadding = isset($textStyles['padding']) ? $textStyles['padding'] : [];
        $textMargin = isset($textStyles['margin']) ? $textStyles['margin'] : [];
        $textTextAlign = isset($textStyles['textAlign']) ? $textStyles['textAlign'] : [];
        $textDisplay = isset($textStyles['display']) ? $textStyles['display'] : [];


        $textFontSize = isset($textTypo['fontSize']) ? $textTypo['fontSize'] : [];
        $textFontFamily = isset($textTypo['fontFamily']) ? $textTypo['fontFamily'] : [];
        $textLineHeight = isset($textTypo['lineHeight']) ? $textTypo['lineHeight'] : [];
        $textLetterSpacing = isset($textTypo['letterSpacing']) ? $textTypo['letterSpacing'] : [];
        $textFontWeight = isset($textTypo['fontWeight']) ? $textTypo['fontWeight'] : [];
        $textTextDecoration = isset($textTypo['textDecoration']) ? $textTypo['textDecoration'] : [];
        $textTextTransform = isset($textTypo['textTransform']) ? $textTypo['textTransform'] : [];



        $postGridCss['.' . $blockId] = [
            'color' => $textColor,
            'background-color' => $textbgColor,
            'padding' => $textPadding,
            'margin' => $textMargin,
            'text-align' => $textTextAlign,
            'display' => $textDisplay,

            'font-size' => $textFontSize,
            'font-family' => $textFontFamily,
            'font-weight' => $textFontWeight,
            'line-height' => $textLineHeight,
            'letter-spacing' => $textLetterSpacing,
            'text-decoration' => $textTextDecoration,
            'text-transform' => $textTextTransform,
        ];



        $postGridCustomCss .= $customCss;





        ob_start();




        if (!empty($wrapperTag)) :
?>
            <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>">
                <?php echo  $content; ?>
            </<?php echo $wrapperTag; ?>>
        <?php

        endif;



        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostText();
