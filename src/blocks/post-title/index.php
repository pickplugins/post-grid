<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostTitle
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-title/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-title/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-title', array(
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

        //var_dump($block);

        global $postGridCss;



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';


        $postTitle = isset($attributes['postTitle']) ? $attributes['postTitle'] : [];
        $postTitleOptions = isset($postTitle['options']) ? $postTitle['options'] : [];
        $postTitleStyles = isset($postTitle['styles']) ? $postTitle['styles'] : [];
        $postTitleTypo = isset($postTitle['typo']) ? $postTitle['typo'] : [];


        $postTitleIsLink = isset($postTitleOptions['isLink']) ? $postTitleOptions['isLink'] : true;
        $linkTarget = isset($postTitleOptions['linkTarget']) ? $postTitleOptions['linkTarget'] : '';
        $customUrl = isset($postTitleOptions['customUrl']) ? $postTitleOptions['customUrl'] : '';

        $linkAttr = isset($postTitleOptions['linkAttr']) ? $postTitleOptions['linkAttr'] : [];
        $rel = isset($postTitleOptions['rel']) ? $postTitleOptions['rel'] : '';


        $postTitleColor = isset($postTitleStyles['color']) ? $postTitleStyles['color'] : [];
        $postTitlebgColor = isset($postTitleStyles['bgColor']) ? $postTitleStyles['bgColor'] : [];
        $postTitlePadding = isset($postTitleStyles['padding']) ? $postTitleStyles['padding'] : [];
        $postTitleMargin = isset($postTitleStyles['margin']) ? $postTitleStyles['margin'] : [];

        $postTitleFontSize = isset($postTitleTypo['fontSize']) ? $postTitleTypo['fontSize'] : [];
        $postTitleFontFamily = isset($postTitleTypo['fontFamily']) ? $postTitleTypo['fontFamily'] : [];
        $postTitleLineHeight = isset($postTitleTypo['lineHeight']) ? $postTitleTypo['lineHeight'] : [];
        $postTitleLetterSpacing = isset($postTitleTypo['letterSpacing']) ? $postTitleTypo['letterSpacing'] : [];
        $postTitleFontWeight = isset($postTitleTypo['fontWeight']) ? $postTitleTypo['fontWeight'] : [];
        $postTitleTextDecoration = isset($postTitleTypo['textDecoration']) ? $postTitleTypo['textDecoration'] : [];
        $postTitleTextTransform = isset($postTitleTypo['textTransform']) ? $postTitleTypo['textTransform'] : [];


        // var_dump($postTitle);
        // var_dump('#############');
        // var_dump($wrapper);


        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


        $prefixText = isset($prefixOptions['text']) ? $prefixOptions['text'] : '';
        $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
        $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

        $postfixText = isset($postfixOptions['text']) ? $postfixOptions['text'] : '';
        $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';



        if (empty($wrapperTag)) :

            $postGridCss['.' . $blockId] = [
                'color' => $postTitleColor,
                'background-color' => $postTitlebgColor,
                'padding' => $postTitlePadding,
                'margin' => $postTitleMargin,
                'font-size' => $postTitleFontSize,
                'font-family' => $postTitleFontFamily,
                'font-weight' => $postTitleFontWeight,
                'line-height' => $postTitleLineHeight,
                'letter-spacing' => $postTitleLetterSpacing,
                'text-decoration' => $postTitleTextDecoration,
                'text-transform' => $postTitleTextTransform,
            ];


        else :
            $postGridCss['.' . $blockId . ' a'] = [
                'color' => $postTitleColor,
                'background-color' => $postTitlebgColor,
                'padding' => $postTitlePadding,
                'margin' => $postTitleMargin,
                'font-size' => $postTitleFontSize,
                'font-family' => $postTitleFontFamily,
                'font-weight' => $postTitleFontWeight,
                'line-height' => $postTitleLineHeight,
                'letter-spacing' => $postTitleLetterSpacing,
                'text-decoration' => $postTitleTextDecoration,
                'text-transform' => $postTitleTextTransform,
            ];


        endif;





        $linkAttrStr = '';



        if (!empty($linkAttr))
            foreach ($linkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }







        ob_start();



?>
        <?php

        if (!empty($wrapperTag)) :

        ?>
            <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>">
                <?php if ($postTitleIsLink) : ?>
                    <a href="<?php echo (!empty($customUrl)) ? esc_url_raw($customUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>
                        <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>

                        <?php echo  get_the_title($post_ID); ?>

                        <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                    </a>
                <?php else : ?>
                    <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
                    <?php echo get_the_title($post_ID); ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>

                <?php endif; ?>
            </<?php echo $wrapperTag; ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>

            <?php if ($postTitleIsLink) : ?>
                <a class="<?php echo $blockId; ?>" href="<?php echo (!empty($customUrl)) ? esc_url_raw($customUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>

                    <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>

                    <?php echo get_the_title($post_ID); ?>

                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                </a>
            <?php else : ?>
                <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
                <?php echo get_the_title($post_ID); ?>
                <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
            <?php endif; ?>

        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostTitle();
