<?php
if (!defined('ABSPATH')) exit();



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


        register_block_type('post-grid/woo-product-info', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  array(
                'wrapper' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'ul',
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
                            'class' => 'icon',
                            'position' => 'beforePrefix',
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
                'prefix' =>
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
                'postfix' =>
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
                'itemInfo' =>
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
                'items' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'linkTarget' => '_blank',
                            'showIcon' => false,
                            'iconPositon' => 'beforePrefix',
                            'tag' => 'li',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '#18978F',
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
                            'borderRadius' =>
                            array(
                                'Desktop' => '',
                            ),
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                        'elements' =>
                        array(
                            0 =>
                            array(
                                'id' => 'text',
                                'label' => 'Text',
                                'prefix' => '',
                                'postfix' => '',
                                'value' => '',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(
                                    'text' => 'You are here: ',
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
                            1 =>
                            array(
                                'id' => 'weight',
                                'label' => 'Weight',
                                'prefix' => 'Weight: ',
                                'postfix' => '',
                                'value' => '10kg',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(),
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
                            2 =>
                            array(
                                'id' => 'length',
                                'label' => 'Length',
                                'prefix' => 'Length: ',
                                'postfix' => '',
                                'value' => '10cm',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(),
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
                            3 =>
                            array(
                                'id' => 'width',
                                'label' => 'Width',
                                'prefix' => 'Width: ',
                                'postfix' => '',
                                'value' => '10cm',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(),
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
                            4 =>
                            array(
                                'id' => 'height',
                                'label' => 'Height',
                                'prefix' => 'Height: ',
                                'postfix' => '',
                                'value' => '10cm',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(),
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
                            5 =>
                            array(
                                'id' => 'dimensions',
                                'label' => 'Dimensions',
                                'prefix' => 'Dimensions: ',
                                'postfix' => '',
                                'value' => '10cm X 10cm X 10cm',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(),
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
                    ),
                ),
                'customCss' =>
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
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
            )


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
        $product = wc_get_product($post_ID);



        ob_start();

        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">


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


                        <?php if (!empty($prefix)) : ?>
                            <span className='prefix'>
                                <?php echo wp_kses_post($prefix); ?>
                            </span>
                        <?php endif; ?>

                        <?php echo wp_kses_post($fontIconHtml); ?>

                        <?php


                        if ($product != null) {

                            if ($id == 'weight') {

                                $weight = $product->get_weight();

                        ?>
                                <span className='value'>
                                    <?php echo wp_kses_post($weight); ?>kg
                                </span>
                            <?php
                            }
                            if ($id == 'text') {


                            ?>
                                <span className='value'>
                                    <?php echo wp_kses_post($value); ?>
                                </span>
                            <?php
                            }



                            if ($id == 'length') {
                                $length = $product->get_length();

                            ?>
                                <span className='value'>
                                    <?php echo wp_kses_post($length); ?>cm
                                </span>
                            <?php
                            }
                            if ($id == 'width') {
                                $width = $product->get_width();

                            ?>
                                <span className='value'>
                                    <?php echo wp_kses_post($width); ?>cm
                                </span>
                            <?php
                            }
                            if ($id == 'height') {
                                $height = $product->get_height();
                            ?>
                                <span className='value'>
                                    <?php echo wp_kses_post($height); ?>cm
                                </span>
                            <?php
                            }
                            if ($id == 'dimensions') {
                                //$dimensions = $product->get_dimensions();

                            ?>
                                <span className='value'>
                                    <?php //echo wp_kses_post($dimensions); 
                                    ?>
                                </span>
                        <?php
                            }

                            if ($type == 'taxonomy') {
                                $terms = wc_get_product_terms($post_ID, $id, array('fields' => 'names'));
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



                        <?php if (!empty($postfix)) : ?>
                            <span className='postfix'>
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
