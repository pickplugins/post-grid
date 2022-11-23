<?php
if (!defined('ABSPATH')) exit();



class PGBlockIcon
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/icon/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/icon/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/icon', array(
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
        $wrapperAttr = isset($wrapperOptions['attr']) ? $wrapperOptions['attr'] : [];

        $text = isset($attributes['text']) ? $attributes['text'] : [];
        $textOptions = isset($text['options']) ? $text['options'] : [];
        $textStyles = isset($text['styles']) ? $text['styles'] : [];

        $textText = isset($textOptions['text']) ? $textOptions['text'] : '';

        $textIsLink = isset($textOptions['isLink']) ? $textOptions['isLink'] : true;
        $textLinkTarget = isset($textOptions['linkTarget']) ? $textOptions['linkTarget'] : '_blank';
        $textCustomUrl = isset($textOptions['customUrl']) ? $textOptions['customUrl'] : '';
        $textLinkAttr = isset($textOptions['linkAttr']) ? $textOptions['linkAttr'] : [];
        $textRel = isset($textOptions['rel']) ? $textOptions['rel'] : '';



        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];

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


        $linkAttrStrText = '';

        if (!empty($textLinkAttr))
            foreach ($textLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $wrapperAttrText = '';

        if (!empty($wrapperAttr))
            foreach ($wrapperAttr as $attr) {

                if (!empty($attr['val']))
                    $wrapperAttrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        ob_start();


        if (!empty($wrapperTag)) :

?>
            <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>" <?php echo esc_attr($wrapperAttrText); ?>>


                <?php if ($iconPosition == 'beforePrefix') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>

                <?php if ($prefixText) : ?>
                    <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>
                <?php if ($textIsLink) : ?>
                    <a class='text' <?php echo esc_attr($linkAttrStrText); ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url_raw($textCustomUrl) :  esc_url_raw($post_url); ?>">
                        <?php if ($iconPosition == 'beforeText') : ?>
                            <?php echo $fontIconHtml; ?>
                        <?php endif; ?>
                        <?php echo $textText; ?>
                        <?php if ($iconPosition == 'afterText') : ?>
                            <?php echo $fontIconHtml; ?>
                        <?php endif; ?>
                    </a>

                <?php else : ?>
                    <?php if ($iconPosition == 'beforeText') : ?>
                        <?php echo $fontIconHtml; ?>
                    <?php endif; ?>
                    <?php echo $textText; ?>
                    <?php if ($iconPosition == 'afterText') : ?>
                        <?php echo $fontIconHtml; ?>
                    <?php endif; ?>
                <?php endif; ?>




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


            <?php if (!$textIsLink) : ?>
                <?php if ($prefixText) : ?>
                    <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
                <?php endif; ?>


                <?php if ($iconPosition == 'beforeText') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>
                <?php echo $textText; ?>
                <?php if ($iconPosition == 'afterText') : ?>
                    <?php echo $fontIconHtml; ?>
                <?php endif; ?>


                <?php if ($postfixText) : ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>
            <?php else : ?>
                <?php if ($prefixText) : ?>
                    <span class="<?php echo $prefixClass; ?>"><?php echo $prefixText; ?></span>
                <?php endif; ?>
                <a class='text' <?php echo esc_attr($linkAttrStrText); ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url_raw($textCustomUrl) :  esc_url_raw($post_url); ?>">

                    <?php if ($iconPosition == 'beforeText') : ?>
                        <?php echo $fontIconHtml; ?>
                    <?php endif; ?>
                    <?php echo $textText; ?>
                    <?php if ($iconPosition == 'afterText') : ?>
                        <?php echo $fontIconHtml; ?>
                    <?php endif; ?>

                </a>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>
            <?php endif; ?>


        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$PGBlockIcon = new PGBlockIcon();
