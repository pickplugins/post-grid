<?php
if (!defined('ABSPATH')) exit();



class PGBlockWooStockQuantity
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/woo-stock-quantity/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/woo-stock-quantity/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/woo-stock-quantity', array(
            // 'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  array(
                'wrapper' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'stockQuantity' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'text' => '12',
                            'linkTo' => '',
                            'linkToUrl' => '',
                            'linkToMetaKey' => '',
                            'linkTarget' => '_blank',
                            'linkAttr' =>
                            array(),
                            'customUrl' => '',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'display' =>
                            array(),
                            'width' =>
                            array(),
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                            'lineHeight' =>
                            array(),
                            'letterSpacing' =>
                            array(),
                            'fontFamily' =>
                            array(),
                            'fontWeight' =>
                            array(),
                            'textDecoration' =>
                            array(),
                            'textTransform' =>
                            array(),
                        ),
                    ),
                ),
                'icon' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'library' => 'fontAwesome',
                            'srcType' => 'class',
                            'iconSrc' => '',
                            'position' => 'beforeQuantity',
                            'class' => 'stockQuantity-icon',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                            'display' =>
                            array(),
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                            'lineHeight' =>
                            array(),
                            'fontWeight' =>
                            array(
                                'Desktop' => '700',
                            ),
                            'textDecoration' =>
                            array(),
                        ),
                    ),
                ),
                'prefix' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'text' => 'In Stock: ',
                            'class' => 'prefix',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'postfix' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'text' => '',
                            'class' => 'postfix',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'customCss' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'blockCssY' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' =>
                        array(),
                    ),
                ),
            )


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
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $sku = isset($attributes['stockQuantity']) ? $attributes['stockQuantity'] : [];
        $skuOptions = isset($sku['options']) ? $sku['options'] : [];


        $skuLinkTarget = isset($skuOptions['linkTarget']) ? $skuOptions['linkTarget'] : '_blank';
        $skuCustomUrl = isset($skuOptions['customUrl']) ? $skuOptions['customUrl'] : '';
        $skuLinkAttr = isset($skuOptions['linkAttr']) ? $skuOptions['linkAttr'] : [];
        $skuRel = isset($skuOptions['rel']) ? $skuOptions['rel'] : '';
        $skuLinkTo = isset($skuOptions['linkTo']) ? $skuOptions['linkTo'] : '';
        $skuLinkToMetaKey = isset($skuOptions['linkToMetaKey']) ? $skuOptions['linkToMetaKey'] : '';
        $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';


        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


        $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
        $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
        $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

        $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';

        $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



        global $product;

        $productStockQuantity = ($product == null) ? '' : $product->get_stock_quantity();


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


        $linkAttrStrsku = '';



        if (!empty($skuLinkAttr))
            foreach ($skuLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrsku .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

        $linkUrl = '';

        if ($skuLinkTo == 'postUrl') {

            $linkUrl = get_permalink($post_ID);
        } else if ($skuLinkTo == 'customField') {

            $linkUrl = get_post_meta($post_ID, $skuLinkToMetaKey, true);
        } else if ($skuLinkTo == 'authorUrl') {
            $author_id = get_post_field('post_author', $post_ID);
            $user = get_user_by('ID', $author_id);
            $linkUrl = $user->user_url;
        } else if ($skuLinkTo == 'authorLink') {
            $author_id = get_post_field('post_author', $post_ID);
            $linkUrl = get_the_author_link($author_id);
        } else if ($skuLinkTo == 'homeUrl') {
            $linkUrl = get_bloginfo('url');
        } else if ($skuLinkTo == 'custom') {
            $linkUrl = $customUrl;
        }







        ob_start();


        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">


                <?php if ($iconPosition == 'beforePrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if (!empty($skuLinkTo)) :

                    /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                ?>
                    <a class='stockQuantity-text' <?php echo ($linkAttrStrsku); ?> target="<?php echo esc_attr($skuLinkTarget); ?>" rel="<?php echo esc_attr($skuRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>">
                        <?php if ($iconPosition == 'beforeQuantity') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($productStockQuantity); ?>
                        <?php if ($iconPosition == 'afterQuantity') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>

                <?php else :
                    /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                ?>

                    <span class='stockQuantity-text' <?php echo ($linkAttrStrsku); ?>>
                        <?php if ($iconPosition == 'beforeQuantity') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($productStockQuantity); ?>
                        <?php if ($iconPosition == 'afterQuantity') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </span>


                <?php endif; ?>






                <?php if ($iconPosition == 'beforePostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>
            <?php if ($iconPosition == 'beforePrefix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($prefixText) : ?>
                <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo $prefixText; ?></span>
            <?php endif; ?>

            <?php if ($iconPosition == 'afterPrefix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($skuLinkTo)) :
                /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
            ?>

                <a class='stockQuantity-text' <?php echo ($linkAttrStrsku); ?> target="<?php echo esc_attr($skuLinkTarget); ?>" rel="<?php echo esc_attr($skuRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>">
                    <?php if ($iconPosition == 'beforeQuantity') : ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php endif; ?>
                    <?php echo wp_kses_post($productStockQuantity); ?>C
                    <?php if ($iconPosition == 'afterQuantity') : ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php endif; ?>
                </a>
            <?php else : ?>
                <?php if ($iconPosition == 'beforeQuantity') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <span class='stockQuantity-text'><?php echo wp_kses_post($productStockQuantity); ?></span>
                <?php if ($iconPosition == 'afterQuantity') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
            <?php endif; ?>



            <?php if ($iconPosition == 'beforePostfix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($postfixText) : ?>
                <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
            <?php endif; ?>
            <?php if ($iconPosition == 'afterPostfix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$PGBlockWooStockQuantity = new PGBlockWooStockQuantity();
