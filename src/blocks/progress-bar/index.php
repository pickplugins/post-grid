<?php
if (!defined('ABSPATH')) exit();



class PGBlockProgressBar
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/progress-bar/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/progress-bar/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/progress-bar', array(
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
                        ),
                    ),
                ),
                'progressData' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'type' => 'horizontal',
                        'animate' => 'onVisible',
                        'animateDuration' => 2,
                        'animateIteration' => 1,
                        'animateDelay' => 2,
                        'max' => 100,
                        'min' => 0,
                        'fill' => 45,
                        'unit' => '%',
                    ),
                ),
                'progressInfo' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => '',
                            'position' => 'beforeBar',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'progressBar' =>
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
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'progressFill' =>
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
                            'fontSize' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'progressCount' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'position' => 'afterLabel',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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
                'progressCountPrefix' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'span',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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
                'progressCountPostfix' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'span',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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
                'progressLabel' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'text' => 'Digital Marketing',
                            'position' => '',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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
                            'position' => 'beforeprogressCount',
                            'class' => 'number-count-icon',
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
                            'fontSize' =>
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
                        array(),
                    ),
                ),
            )


        ));
    }

    function front_scripts($attributes)
    {

        wp_register_script('pg-progress-bar', post_grid_plugin_url . 'src/blocks/progress-bar/front-scripts.js', [], '', true);

        if (has_block('post-grid/progress-bar')) {

            wp_enqueue_script('pg-progress-bar');
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

        $progressData = isset($attributes['progressData']) ? $attributes['progressData'] : [];

        $type = isset($progressData['type']) ? $progressData['type'] : "horizontal";
        $max = isset($progressData['max']) ? (int)$progressData['max'] : 0;
        $min = isset($progressData['min']) ? (int)$progressData['min'] : 100;
        $fill = isset($progressData['fill']) ? (int) $progressData['fill'] : 45;
        $unit = isset($progressData['unit']) ? $progressData['unit'] : "%";
        $animate = isset($progressData['animate']) ? $progressData['animate'] : "onVisible";
        $animateDuration = isset($progressData['animateDuration']) ? $progressData['animateDuration'] : 1;
        $animateIteration = isset($progressData['animateIteration']) ? $progressData['animateIteration'] : 1;
        $animateDelay = isset($progressData['animateDelay']) ? $progressData['animateDelay'] : 1;



        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';



        $progressInfo = isset($attributes['progressInfo']) ? $attributes['progressInfo'] : '';
        $progressInfoOptions = isset($progressInfo['options']) ? $progressInfo['options'] : '';

        $progressInfoPosition = isset($progressInfoOptions['position']) ? $progressInfoOptions['position'] : '';



        $progressBar = isset($attributes['progressBar']) ? $attributes['progressBar'] : '';
        $progressBarOptions = isset($progressBar['options']) ? $progressBar['options'] : '';

        $progressFill = isset($attributes['progressFill']) ? $attributes['progressFill'] : '';
        $progressFillOptions = isset($progressFill['options']) ? $progressFill['options'] : '';

        $progressCount = isset($attributes['progressCount']) ? $attributes['progressCount'] : '';
        $progressCountOptions = isset($progressCount['options']) ? $progressCount['options'] : '';

        $progressCountPosition = isset($progressCountOptions['position']) ? $progressCountOptions['position'] : '';


        $progressLabel = isset($attributes['progressLabel']) ? $attributes['progressLabel'] : '';
        $progressLabelOptions = isset($progressLabel['options']) ? $progressLabel['options'] : '';

        $progressLabelText = isset($progressLabelOptions['text']) ? _wp_specialchars($progressLabelOptions['text']) : '';
        $progressLabelPosition = isset($progressLabelOptions['position']) ? _wp_specialchars($progressLabelOptions['position']) : '';



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
            "fill" => $fill,
            "unit" => $unit,
            "animate" => $animate,
            "animateDuration" => $animateDuration,
            "animateIteration" => $animateIteration,
            "animateDelay" => $animateDelay,
            "blockId" => $blockId,
            "type" => $type,

        ];

        $animatename = "animateWidthProgress";

        if ($type == 'horizontal') :
            $animatename = "animateWidthProgress";
        elseif ($type == 'vertical') :
            $animatename = "animateHeightProgress";
        endif;



        ob_start();


        if (!empty($wrapperTag)) :

?>
            <div class="PGBlockProgressBar <?php echo esc_attr($blockId); ?>" data-progress-bar="<?php echo esc_attr(json_encode($dataAtts)) ?>">


                <?php if ($progressInfoPosition == 'beforeBar') : ?>
                    <div class="progress-info">

                        <?php if ($progressCountPosition == 'beforeLabel') : ?>
                            <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                        <?php endif; ?>

                        <div class="progress-label">
                            <?php echo wp_kses_post($progressLabelText); ?>
                        </div>

                        <?php if ($progressCountPosition == 'afterLabel') : ?>
                            <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                        <?php endif; ?>

                    </div>
                <?php endif; ?>




                <div class='progress-bar'>

                    <?php if ($progressLabelPosition == 'beforeFill') : ?>
                        <div class="progress-label">
                            <?php echo wp_kses_post($progressLabelText); ?>
                        </div>
                    <?php endif; ?>
                    <?php if ($progressCountPosition == 'beforeFill') : ?>
                        <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                    <?php endif; ?>

                    <div class="progress-fill">

                        <?php if ($progressLabelPosition == 'insideFill') : ?>
                            <div class="progress-label">
                                <?php echo wp_kses_post($progressLabelText); ?>
                            </div>
                        <?php endif; ?>
                        <?php if ($progressCountPosition == 'insideFill') : ?>
                            <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                        <?php endif; ?>




                    </div>

                    <?php if ($progressLabelPosition == 'afterFill') : ?>
                        <div class="progress-label">
                            <?php echo wp_kses_post($progressLabelText); ?>
                        </div>
                    <?php endif; ?>
                    <?php if ($progressCountPosition == 'afterFill') : ?>
                        <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                    <?php endif; ?>


                </div>

                <?php if ($progressInfoPosition == 'afterBar') : ?>
                    <div class="progress-info">
                        <?php if ($progressCountPosition == 'beforeLabel') : ?>
                            <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                        <?php endif; ?>

                        <div class="progress-label">
                            <?php echo wp_kses_post($progressLabelText); ?>
                        </div>

                        <?php if ($progressCountPosition == 'afterLabel') : ?>
                            <div class="progress-count"><?php echo wp_kses_post($fill); ?><?php echo wp_kses_post($unit); ?></div>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>


                </<?php echo esc_attr($wrapperTag); ?>>
            <?php

        endif;




            ?>



            <style>
                <?php
                if ($type == 'horizontal') :
                    $animatename = "animateWidthProgress";

                ?>@keyframes animateWidthProgress {
                    0% {
                        width: 0px;
                    }

                    100% {
                        width: <?php echo esc_attr($fill); ?>%;
                    }
                }

                <?php
                elseif ($type == 'vertical') :
                    $animatename = "animateHeightProgress";

                ?>@keyframes animateHeightProgress {
                    0% {
                        height: 0px;
                    }

                    100% {
                        height: <?php echo esc_attr($fill); ?>%;
                    }
                }

                <?php
                endif;
                ?><?php echo esc_attr('.' . $animatename); ?> {
                    animation: <?php echo esc_attr($animatename); ?> ease <?php echo esc_attr($animateDuration); ?>s;
                }
            </style>





    <?php return ob_get_clean();
    }
}

$PGBlockProgressBar = new PGBlockProgressBar();
