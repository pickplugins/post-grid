<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockWooProductInfo
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/woo-product-info/index.css');
        // wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/woo-product-info/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/woo-product-info/block.json',
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


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = get_the_ID();
        $post_data = get_post($post_ID);

        $post_url = get_the_permalink($post_ID);
        $post_title = get_the_title($post_ID);
        $post_thumb_url = get_the_post_thumbnail_url($post_ID, 'full');


        $post_author_id = $post_data->post_author;
        //$author_data = get_user_by('ID', $post_author_id);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';

        $schema = isset($attributes['schema']) ? $attributes['schema'] : [];
        $schemaOptions = isset($schema['options']) ? $schema['options'] : [];
        $schemaEnable = isset($schemaOptions['enable']) ? $schemaOptions['enable'] : true;


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];
        $itemsElements = isset($items['elements']) ? $items['elements'] : [];

        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';

        $label = isset($attributes['label']) ? $attributes['label'] : [];
        $labelOptions = isset($label['options']) ? $label['options'] : [];

        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : [];


        //$postGridCustomCss .= $customCss;
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

        //$product = wc_get_product($post_ID);
        //global $product;
        if (function_exists("wc_get_product")) {

            $product = wc_get_product($post_ID);

        } else {
            $product = null;
        }



        ob_start();

        if (!empty($wrapperTag)):

            ?>
                        <<?php echo esc_attr($wrapperTag); ?> class="
                            <?php echo esc_attr($blockId); ?>">


                            <?php



                            $i = 0;

                            if (!empty($itemsElements))
                                foreach ($itemsElements as $index => $item) {
                                    $id = isset($item['id']) ? $item['id'] : '';

                                    $label = isset($item['label']) ? $item['label'] : '';
                                    $value = isset($item['value']) ? $item['value'] : '';

                                    $prefix = isset($item['prefix']) ? $item['prefix'] : '';
                                    $postfix = isset($item['postfix']) ? $item['postfix'] : '';
                                    $type = isset($item['type']) ? $item['type'] : '';

                                    $siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';

                                    $iconLibrary = isset($siteIcon['library']) ? $siteIcon['library'] : '';
                                    $iconSrcType = isset($siteIcon['srcType']) ? $siteIcon['srcType'] : '';
                                    $iconSrc = isset($siteIcon['iconSrc']) ? $siteIcon['iconSrc'] : '';



                                    if ($iconLibrary == 'fontAwesome') {
                                        wp_enqueue_style('fontawesome-icons');
                                    } else if ($iconLibrary == 'iconFont') {
                                        wp_enqueue_style('icofont-icons');
                                    } else if ($iconLibrary == 'bootstrap') {
                                        wp_enqueue_style('bootstrap-icons');
                                    }

                                    $fontIconHtml = '<span class="icon ' . $iconClass . ' ' . $iconSrc . '"></span>';

                                    ?>

                                            <li class="item item-<?php echo esc_attr($i); ?>">


                                                <?php if (!empty($prefix)): ?>
                                                        <span class='prefix'>
                                                            <?php echo wp_kses_post($prefix); ?>
                                                        </span>
                                                <?php endif; ?>

                                                <?php echo wp_kses_post($fontIconHtml); ?>

                                                <?php


                                                if ($product != null) {

                                                    if ($id == 'weight') {

                                                        $weight = ($product == null) ? 0 : $product->get_weight();

                                                        ?>
                                                                <span class='value'>
                                                                    <?php echo wp_kses_post($weight); ?>kg
                                                                </span>
                                                                <?php
                                                    }
                                                    if ($id == 'text') {


                                                        ?>
                                                                <span class='value'>
                                                                    <?php echo wp_kses_post($value); ?>
                                                                </span>
                                                                <?php
                                                    }



                                                    if ($id == 'length') {
                                                        $length = ($product == null) ? 0 : $product->get_length();

                                                        ?>
                                                                <span class='value'>
                                                                    <?php echo wp_kses_post($length); ?>cm
                                                                </span>
                                                                <?php
                                                    }
                                                    if ($id == 'width') {
                                                        $width = ($product == null) ? 0 : $product->get_width();

                                                        ?>
                                                                <span class='value'>
                                                                    <?php echo wp_kses_post($width); ?>cm
                                                                </span>
                                                                <?php
                                                    }
                                                    if ($id == 'height') {
                                                        $height = ($product == null) ? 0 : $product->get_height();
                                                        ?>
                                                                <span class='value'>
                                                                    <?php echo wp_kses_post($height); ?>cm
                                                                </span>
                                                                <?php
                                                    }
                                                    if ($id == 'dimensions') {
                                                        //$dimensions = $product->get_dimensions();
                            
                                                        ?>
                                                                <span class='value'>
                                                                    <?php //echo wp_kses_post($dimensions); 
                                                                                                ?>
                                                                </span>
                                                                <?php
                                                    }

                                                    if ($type == 'taxonomy') {
                                                        if (function_exists("wc_get_product_terms")) {

                                                            $terms = wc_get_product_terms($post_ID, $id, array('fields' => 'names'));
                                                        } else {
                                                            $terms = [];
                                                        }

                                                        $termsCount = count($terms);

                                                        if (!empty($terms)) {
                                                            $j = 1;
                                                            foreach ($terms as $term) {
                                                                echo $term;
                                                                $termsCount = count($terms);
                                                                if ($termsCount > $j) {
                                                                    echo ', ';
                                                                }

                                                                $j++;
                                                            }
                                                        }
                                                    }
                                                }





                                                ?>



                                                <?php if (!empty($postfix)): ?>
                                                        <span class='postfix'>
                                                            <?php echo wp_kses_post($postfix); ?>
                                                        </span>
                                                <?php endif; ?>

                                            </li>

                                            <?php
                                            $i++;
                                }


                            ?>





                        </<?php echo esc_attr($wrapperTag); ?>>





                        <?php

        endif;

        ?>

                <?php return ob_get_clean();
    }
}

$PGBlockWooProductInfo = new PGBlockWooProductInfo();