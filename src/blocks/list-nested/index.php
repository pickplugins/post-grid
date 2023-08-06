<?php
if (!defined('ABSPATH')) exit();



class PGBlockListNested
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('pglist_editor_style', post_grid_plugin_url . 'src/blocks/list-nested/index.css');
        //wp_register_script('pglist_editor_script', post_grid_plugin_url . 'src/blocks/list-nested/index.js', array('wp-blocks', 'wp-element'));
        //wp_register_style('pglist_front_style', post_grid_plugin_url . 'src/blocks/list-nested/index.css');



        register_block_type('post-grid/list-nested', array(
            //'editor_script' => 'pglist_editor_script',
            //'script' => 'pglist_front_script',

            //'editor_style' => 'pglist_editor_style',
            //'style' => 'pglist_front_style',

            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'render_callback' => array($this, 'theHTML'),
            'attributes' => array(
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
                            'padding' =>
                            array(
                                'Desktop' => '',
                            ),
                            'margin' =>
                            array(
                                'Desktop' => '',
                            ),
                            'display' => array(),
                        ),
                    ),
                ),
                'items' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' => array(),
                    ),
                ),
                'itemsX' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' => array(),
                    ),
                ),



                'item' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'text' => '',
                            'tag' => 'li',
                            'counter' => false,
                            'reversed' => false,
                            'start' => 1,
                            'type' => '1',
                            'class' => 'item',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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
                            'iconSrc' => 'fas fa-chevron-right',
                            'class' => 'icon',
                            'positon' => 'before',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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
                        ),
                    ),
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
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
                        'items' => array(),
                    ),
                ),
            )


        ));
    }

    // function front_script($attributes)
    // {
    // }
    function front_style($attributes)
    {
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'ul';

        $itemsX = isset($attributes['itemsX']) ? $attributes['itemsX'] : [];
        $items = isset($itemsX['items']) ? $itemsX['items'] : [];


        $item = isset($attributes['item']) ? $attributes['item'] : [];
        $itemOptions = isset($item['options']) ? $item['options'] : [];
        $itemTag = isset($itemOptions['tag']) ? $itemOptions['tag'] : 'li';





        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;



        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }

        $iconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


        ob_start();




        if (!empty($wrapperTag)) :
?>

            <<?php echo esc_attr($wrapperTag); ?> class=" <?php echo esc_attr($blockId); ?>">



                <?php
                if (!empty($items))
                    foreach ($items as $index => $item) {

                ?>
                    <<?php echo esc_attr($itemTag); ?> class=" <?php echo esc_attr($itemOptions['class']); ?>" index=<?php echo esc_attr($index); ?> blockId=<?php echo esc_attr($blockId); ?>>


                        <?php if ($iconPosition == 'left') : ?>
                            <?php echo wp_kses_post($iconHtml); ?>
                        <?php endif; ?>

                        <span>

                            <?php if ($iconPosition == 'before') : ?>
                                <?php echo wp_kses_post($iconHtml); ?>
                            <?php endif; ?>
                            <?php echo (isset($item['text'])) ? wp_kses_post($item['text']) : ''; ?></span>
                        <?php if ($iconPosition == 'after') : ?>
                            <?php echo wp_kses_post($iconHtml); ?>
                        <?php endif; ?>


                        <?php if ($iconPosition == 'right') : ?>
                            <span class="float-right"><?php echo wp_kses_post($iconHtml); ?></span>
                        <?php endif; ?>


                    </<?php echo esc_attr($itemTag); ?>>





                <?php
                    }

                ?>
            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;



        ?>








<?php return ob_get_clean();
    }
}

$PGBlockListNested = new PGBlockListNested();
