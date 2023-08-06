<?php
if (!defined('ABSPATH')) exit();



class PGBlockDateCountdown
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/date-countdown/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/date-countdown/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/date-countdown', array(
            // 'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  [],
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
                            'class' => 'date-countdown',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'numberCount' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'start' => 0,
                            'end' => 500,
                            'duration' => 1000,
                            'onScroll' => false,

                            'class' => '',
                        ),
                        'styles' =>
                        array(),
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
                            'iconSrc' => 'far fa-calendar-alt',
                            'position' => 'beforeCommentCount',
                            'class' => 'numberCount-icon',
                        ),
                        'styles' =>
                        array(),
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
                        array(),
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
                            'class' => 'prefix',
                        ),
                        'styles' =>
                        array(),
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
                        'items' => [],
                    ),
                ),
            )


        ));
    }

    function front_scripts($attributes)
    {

        wp_register_script('pg-date-countdown', post_grid_plugin_url . 'src/blocks/date-countdown/front-scripts.js', [], '', true);

        if (has_block('post-grid/date-countdown')) {

            wp_enqueue_script('pg-date-countdown');
        }
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


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $numberCount = isset($attributes['numberCount']) ? $attributes['numberCount'] : [];
        $numberCountOptions = isset($numberCount['options']) ? $numberCount['options'] : [];

        $start = isset($numberCountOptions['start']) ? (int)$numberCountOptions['start'] : 0;
        $end = isset($numberCountOptions['end']) ? (int)$numberCountOptions['end'] : 500;
        $duration = isset($numberCountOptions['duration']) ? (int) $numberCountOptions['duration'] : 1000;
        $onScroll = isset($numberCountOptions['onScroll']) ? $numberCountOptions['onScroll'] : false;


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





        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }




        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

        $dataAtts = [
            "start" => $start,
            "end" => $end,
            "duration" => $duration,
            "blockId" => $blockId,
            "onScroll" => $onScroll,

        ];


        ob_start();


        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="PGBlockNumberCount <?php echo esc_attr($blockId); ?>" data-date-countdown="<?php echo esc_attr(json_encode($dataAtts)) ?>">


                <?php if ($iconPosition == 'beforePrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>



                <span class='number-count'>

                    <?php echo wp_kses_post($start); ?>

                </span>


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

$PGBlockDateCountdown = new PGBlockDateCountdown();
