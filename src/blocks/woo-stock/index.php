<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockWooStock
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/woo-price/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/woo-price/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            'post-grid/woo-stock',
            array(
                // 'editor_script' => 'editor_script',
                //'editor_style' => 'editor_style',
                //'script' => 'front_script',
                'uses_context' => ["postId", "loopIndex", "postType", "queryId"],
                'style' => 'front_style',
                'render_callback' => array($this, 'theHTML'),
                'attributes' => array(
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
                    'stock' =>
                    array(
                        'type' => 'object',
                        'default' =>
                        array(
                            'options' =>
                            array(
                                'inStock' => ' In Stock',
                                'outOfStock' => 'Out of Stock',
                                'backOrder' => 'Backorder Enabled',
                                'tag' => 'span',
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
                                'position' => '',
                                'class' => 'icon',
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
                                array(
                                ),
                                'fontSize' =>
                                array(
                                    'Desktop' => '',
                                ),
                                'lineHeight' =>
                                array(
                                ),
                                'fontWeight' =>
                                array(
                                    'Desktop' => '700',
                                ),
                                'textDecoration' =>
                                array(
                                ),
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
                                'text' => '',
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
                            array(
                            ),
                        ),
                    ),
                )


            )
        );
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



        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : [];

        $stock = isset($attributes['stock']) ? $attributes['stock'] : [];
        $stockOptions = isset($stock['options']) ? $stock['options'] : [];
        $stockInStock = isset($stockOptions['inStock']) ? $stockOptions['inStock'] : [];
        $stockOutOfStock = isset($stockOptions['outOfStock']) ? $stockOptions['outOfStock'] : [];
        $stockBackOrder = isset($stockOptions['backOrder']) ? $stockOptions['backOrder'] : [];




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



        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }










        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        // var_dump($product->get_price());
        // var_dump($product->get_onStock());
        // var_dump($product->get_onStock());


        $product_type = ($product != null) ? $product->get_type() : '';
        // $currency_symbol = get_woocommerce_currency_symbol();

        $manageStock = ($product != null) ? $product->get_manage_stock() : '';



        ob_start();


        if (!empty($wrapperTag)):

            ?>
            <<?php echo esc_attr($wrapperTag); ?> class="
                <?php echo esc_attr($blockId); ?>">


                <?php if ($iconPosition == 'beforePrefix'): ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if ($prefixText): ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix'): ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php

                if ($manageStock):
                    $onStock = ($product != null) ? $product->get_stock_status() : '';

                    ?>


                    <?php if ($onStock == "instock"): ?>

                        <span class='stock'>

                            <?php
                            echo wp_kses_post($stockInStock);
                            ?>


                        </span>

                    <?php endif; ?>
                    <?php if ($onStock == "outofstock"): ?>

                        <span class='stock'>

                            <?php
                            echo wp_kses_post($stockOutOfStock);
                            ?>


                        </span>

                    <?php endif; ?>
                    <?php if ($onStock == "onbackorder"): ?>

                        <span class='stock'>

                            <?php
                            echo wp_kses_post($stockBackOrder);
                            ?>


                        </span>

                    <?php endif; ?>

                    <?php
                endif;
                if (!$manageStock):

                    $onStock = ($product != null) ? $product->get_stock_status() : '';

                    ?>
                    <?php if ($onStock == "instock"): ?>

                        <span class='stock'>

                            <?php
                            echo wp_kses_post($stockInStock);
                            ?>


                        </span>

                    <?php endif; ?>
                    <?php if ($onStock == "outofstock"): ?>

                        <span class='stock'>

                            <?php
                            echo wp_kses_post($stockOutOfStock);
                            ?>


                        </span>

                    <?php endif; ?>
                    <?php if ($onStock == "onbackorder"): ?>

                        <span class='stock'>

                            <?php
                            echo wp_kses_post($stockBackOrder);
                            ?>


                        </span>

                    <?php endif; ?>

                    <?php

                endif;




                ?>






                <?php if ($iconPosition == 'beforePostfix'): ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <?php if ($postfixText): ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPostfix'): ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

            </<?php echo esc_attr($wrapperTag); ?>>
            <?php

        endif;


        ?>








        <?php return ob_get_clean();
    }
}

$PGBlockWooStock = new PGBlockWooStock();