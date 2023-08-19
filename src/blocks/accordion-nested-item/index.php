<?php
if (!defined('ABSPATH')) exit();



class PGBlockAccordionNestedItem
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layer/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layer/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/accordion-nested-item', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  [],
            //'style' => 'front_style',
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
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'content' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => 'accordion-content',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'header' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => 'accordion-header',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                            'display' =>
                            array(
                                'Desktop' => 'flex',
                            ),
                        ),
                    ),
                ),
                'headerLabel' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'text' => 'Accordion Header Text',
                            'tag' => 'div',
                            'slug' => '',
                            'class' => 'accordion-header-label',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'labelCounter' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'position' => '',
                            'tag' => 'div',
                            'class' => 'accordion-header-counter',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
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
                        ),
                    ),
                ),
                'labelIcon' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'library' => 'fontAwesome',
                            'srcType' => 'class',
                            'iconSrc' => 'fas fa-angle-down',
                            'position' => 'left',
                            'enable' => false,
                            'class' => 'accordion-icon',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
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
                            'fontWeight' =>
                            array(
                                'Desktop' => '700',
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
                            'iconSrc' => 'fas fa-angle-down',
                            'position' => 'left',
                            'class' => 'accordion-icon',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
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
                            'lineHeight' =>
                            array(),
                            'fontWeight' =>
                            array(
                                'Desktop' => '',
                            ),
                            'textDecoration' =>
                            array(),
                        ),
                    ),
                ),
                'iconToggle' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'library' => 'fontAwesome',
                            'srcType' => 'class',
                            'iconSrc' => 'fas fa-angle-up',
                            'class' => 'accordion-icon-toggle',
                        ),
                        'styles' =>
                        array(
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
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
                            'fontWeight' =>
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
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCustomCss;
        global $postGridCssY;


        $wrapper = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $count = isset($attributes['count']) ? $attributes['count'] : '';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
        //$content = isset($textOptions['content']) ? $textOptions['content'] : '';


        $headerLabel = isset($attributes['headerLabel']) ? $attributes['headerLabel'] : [];
        $headerLabelOptions = isset($headerLabel['options']) ? $headerLabel['options'] : [];

        $headerLabelText = isset($headerLabelOptions['text']) ? $headerLabelOptions['text'] : '';
        $headerLabelSlug = isset($headerLabelOptions['slug']) ? $headerLabelOptions['slug'] : '';
        $headerLabelTag = isset($headerLabelOptions['tag']) ? $headerLabelOptions['tag'] : 'div';


        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';

        $iconHtml = !empty($iconSrc) ? '<span class="accordion-icon ' . $iconClass . ' ' . $iconSrc . '"></span>' : '';


        $iconToggle = isset($attributes['iconToggle']) ? $attributes['iconToggle'] : '';
        $iconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];

        $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : '';
        $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : '';
        $iconToggleSrc = isset($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : '';
        $iconTogglePosition = isset($iconToggleOptions['position']) ? $iconToggleOptions['position'] : '';
        $iconToggleClass = isset($iconToggleOptions['class']) ? $iconToggleOptions['class'] : '';

        $iconToggleHtml = !empty($iconToggleSrc) ? '<span class="accordion-icon-toggle ' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>' : '';




        $labelCounter = isset($attributes['labelCounter']) ? $attributes['labelCounter'] : '';
        $labelCounterOptions = isset($labelCounter['options']) ? $labelCounter['options'] : [];

        $labelCounterEnable = isset($labelCounterOptions['enable']) ? $labelCounterOptions['enable'] : false;


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


        //var_dump($iconToggle);
        //var_dump($iconHtml);


        ob_start();


?>



        <div class="<?php echo esc_attr($blockId); ?>-accordion-header accordion-header ">

            <?php if ($iconPosition == 'left') : ?>
                <?php echo  wp_kses_post($iconHtml); ?>
                <?php echo  wp_kses_post($iconToggleHtml); ?>
            <?php endif; ?>

            <?php if ($labelCounterEnable) : ?>
                <span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter">
                    <?php echo  wp_kses_post($count); ?>
                </span>
            <?php endif; ?>

            <<?php echo esc_attr($headerLabelTag); ?> class="<?php echo esc_attr($blockId); ?>-accordion-header-label" <?php if ($headerLabelTag == 'a') : ?> href="#<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?> <?php if ($headerLabelTag == 'a') : ?> id="<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?>>
                <?php echo  wp_kses_post($headerLabelText); ?>
            </<?php echo esc_attr($headerLabelTag); ?>>

            <?php if ($iconPosition == 'right') : ?>
                <?php echo  wp_kses_post($iconHtml); ?>
                <?php echo  wp_kses_post($iconToggleHtml); ?>
            <?php endif; ?>
        </div>

        <div class="<?php echo esc_attr($blockId); ?>-accordion-content">
            <?php echo  $content; ?>
        </div>

<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockAccordionNestedItem();
