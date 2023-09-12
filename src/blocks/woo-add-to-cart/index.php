<?php
if (!defined('ABSPATH')) exit();



class PGBlockWooAddToCart
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pgwoo-add-to-cart_front_script', post_grid_plugin_url . 'src/blocks/woo-add-to-cart/front-scripts.js', [], '', true);
        //wp_register_style('pgwoo-add-to-cart_front_style', post_grid_plugin_url . 'src/blocks/woo-add-to-cart/index.css');

        if (has_block('post-grid/woo-add-to-cart')) {


            wp_enqueue_script('pgwoo-add-to-cart_front_script');
            wp_enqueue_style('pgwoo-add-to-cart_front_style');
        }
    }



    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/woo-add-to-cart/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/woo-add-to-cart/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/woo-add-to-cart', array(
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
                'cartBtn' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'postId' => '',
                            'sku' => '',
                            'text' => 'Add to cart',
                            'class' => '',
                            'ajax' => true,
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
                        ),
                    ),
                ),
                'quantityWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'enable' => true,
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
                        ),
                    ),
                ),
                'quantityInput' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
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
                        ),
                    ),
                ),
                'quantityIncrease' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
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
                        ),
                    ),
                ),
                'quantityDecrease' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
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
                            'position' => 'beforeCartText',
                            'class' => 'sku-icon',
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
                            'text' => ' ',
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



        $post_ID = get_the_id();
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $cartBtn = isset($attributes['cartBtn']) ? $attributes['cartBtn'] : [];
        $cartBtnOptions = isset($cartBtn['options']) ? $cartBtn['options'] : [];

        $cartBtnRel = isset($cartBtnOptions['rel']) ? $cartBtnOptions['rel'] : '';
        $cartBtnText = isset($cartBtnOptions['text']) ? $cartBtnOptions['text'] : '';
        $cartBtnAjax = isset($cartBtnOptions['ajax']) ? $cartBtnOptions['ajax'] : true;

        $quantityWrap = isset($attributes['quantityWrap']) ? $attributes['quantityWrap'] : [];
        $quantityWrapOptions = isset($quantityWrap['options']) ? $quantityWrap['options'] : [];
        $quantityWrapEnable = isset($quantityWrapOptions['enable']) ? $quantityWrapOptions['enable'] : true;


        $quantityInput = isset($attributes['quantityInput']) ? $attributes['quantityInput'] : [];
        $quantityInputOptions = isset($quantityInput['options']) ? $quantityInput['options'] : [];

        $quantityInputQuantity = isset($quantityInputOptions['quantity']) ? $quantityInputOptions['quantity'] : 1;






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

        $productSku = ($product == null) ? '' : $product->get_sku();
        $productType = ($product == null) ? '' : $product->get_type();

        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }


        //var_dump($productType);



        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        if ($productType == 'simple') {
            $cartUrl = ($cartBtnAjax) ? '?add-to-cart=' . esc_attr($post_ID) : '?add-to-cart=' . $post_ID . '&quantity=' . esc_attr($quantityInputQuantity);
        } else {
            $cartUrl = get_permalink($post_ID);
            $cartBtnText = __("View Product", 'post-grid');
        }


        // var_dump($cartBtnAjax);

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

                <?php

                if ($productType == 'simple') :
                ?>
                    <div class='quantity-wrap' data-blockid="<?php echo esc_attr($blockId); ?>">
                        <span class='quantity-decrease'>-</span>
                        <input class='quantity-input' size="3" type="text" value="<?php echo esc_attr($quantityInputQuantity); ?>" />
                        <span class='quantity-increase'>+</span>
                    </div>
                    <a class='<?php echo ($cartBtnAjax) ? 'ajax_add_to_cart' : ''; ?> cartBtn' data-quantity="<?php echo esc_attr($quantityInputQuantity); ?>" data-product_id="<?php echo esc_attr($post_ID); ?>" data-product_sku="<?php echo esc_attr($productSku); ?>" aria-label="<?php echo esc_attr($cartBtnRel); ?>" aria-describedby="<?php echo esc_attr($cartBtnRel); ?>" rel="<?php echo esc_attr($cartBtnRel); ?>" href="<?php echo esc_attr($cartUrl); ?>">
                        <?php if ($iconPosition == 'beforeCartText') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($cartBtnText); ?>
                        <?php if ($iconPosition == 'afterCartText') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>
                <?php else : ?>
                    <a class='cartBtn' aria-label="<?php echo esc_attr($cartBtnRel); ?>" aria-describedby="<?php echo esc_attr($cartBtnRel); ?>" rel="<?php echo esc_attr($cartBtnRel); ?>" href="<?php echo esc_attr($cartUrl); ?>">
                        <?php if ($iconPosition == 'beforeCartText') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($cartBtnText); ?>
                        <?php if ($iconPosition == 'afterCartText') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>
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


        ?>








<?php return ob_get_clean();
    }
}

$PGBlockWooAddToCart = new PGBlockWooAddToCart();
