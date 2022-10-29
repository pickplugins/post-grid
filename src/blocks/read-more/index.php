<?php
if (!defined('ABSPATH')) exit();



class PGBlockReadmore
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/read-more/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/read-more/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/read-more', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'style' => 'front_style',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    function front_script($attributes)
    {
    }
    function front_style($attributes)
    {

        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';







        //var_dump($iconLibrary);
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $post_excerpt = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $readMore = isset($attributes['readMore']) ? $attributes['readMore'] : [];
        $readMoreOptions = isset($readMore['options']) ? $readMore['options'] : [];
        $readMoreStyles = isset($readMore['styles']) ? $readMore['styles'] : [];
        $readMoreTypo = isset($readMore['typo']) ? $readMore['typo'] : [];

        $readMoreText = isset($readMoreOptions['text']) ? $readMoreOptions['text'] : __('Read More', 'post-grid');

        $readMoreIsLink = isset($readMoreOptions['isLink']) ? $readMoreOptions['isLink'] : true;
        $readMoreLinkTarget = isset($readMoreOptions['linkTarget']) ? $readMoreOptions['linkTarget'] : '_blank';
        $readMoreCustomUrl = isset($readMoreOptions['customUrl']) ? $readMoreOptions['customUrl'] : '';
        $readMoreLinkAttr = isset($readMoreOptions['linkAttr']) ? $readMoreOptions['linkAttr'] : [];
        $readMoreRel = isset($readMoreOptions['rel']) ? $readMoreOptions['rel'] : '';



        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];
        $iconTypo = isset($icon['typo']) ? $icon['typo'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


        $prefixText = isset($prefixOptions['text']) ? $prefixOptions['text'] : '';
        $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
        $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

        $postfixText = isset($postfixOptions['text']) ? $postfixOptions['text'] : '';
        $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }

        $linkAttrStr = '';



        if (!empty($postExcerptlinkAttr))
            foreach ($postExcerptlinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $linkAttrStrReadmore = '';



        if (!empty($readMoreLinkAttr))
            foreach ($readMoreLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrReadmore .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        ob_start();




        if (!empty($wrapperTag)) :

?>
            <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>">


                <?php if ($iconPosition == 'beforePrefix') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>

                <?php if ($prefixText) : ?>
                    <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>

                <a class='readmore' <?php echo esc_attr($linkAttrStrReadmore); ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo (!empty($readMoreCustomUrl)) ? esc_url_raw($readMoreCustomUrl) :  esc_url_raw($post_url); ?>">
                    <?php if ($iconPosition == 'beforeRedmore') : ?>
                        <?php echo $fontIconHtml; ?>
                    <?php endif; ?>
                    <?php echo $readMoreText; ?>
                    <?php if ($iconPosition == 'afterRedmore') : ?>
                        <?php echo $fontIconHtml; ?>
                    <?php endif; ?>
                </a>



                <?php if ($iconPosition == 'beforePostfix') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPostfix') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>

            </<?php echo $wrapperTag; ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>
            <?php if ($prefixText) : ?>
                <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
            <?php endif; ?>
            <a class='readmore' <?php echo esc_attr($linkAttrStrReadmore); ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo (!empty($readMoreCustomUrl)) ? esc_url_raw($readMoreCustomUrl) :  esc_url_raw($post_url); ?>"><?php echo $readMoreText; ?></a>


            <?php if ($postfixText) : ?>
                <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
            <?php endif; ?>
        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockReadmore();
