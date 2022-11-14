<?php
if (!defined('ABSPATH')) exit();



class PGBlockAccordion
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('pgaccordion_editor_style', post_grid_plugin_url . 'src/blocks/accordion/index.css');
        wp_register_script('pgaccordion_editor_script', post_grid_plugin_url . 'src/blocks/accordion/index.js', array('wp-blocks', 'wp-element'));
        wp_register_style('pgaccordion_front_style', post_grid_plugin_url . 'src/blocks/accordion/index.css');
        wp_register_script('pgaccordion_front_script', post_grid_plugin_url . 'src/blocks/accordion/front-scripts.js', []);
        wp_register_script('pgaccordion_accordion_js', post_grid_plugin_url . 'src/blocks/accordion/accordion.min.js', []);
        wp_register_style('pgaccordion_accordion_css', post_grid_plugin_url . 'src/blocks/accordion/accordion.min.css', []);



        register_block_type('post-grid/accordion', array(
            'editor_script' => 'pgaccordion_editor_script',
            'script' => 'pgaccordion_front_script',

            'editor_style' => 'pgaccordion_editor_style',
            'style' => 'pgaccordion_front_style',

            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'render_callback' => array($this, 'theHTML')
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

        wp_enqueue_style('pgaccordion_accordion_css');
        wp_enqueue_script('pgaccordion_accordion_js');

        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];
        $wrapperTypo = isset($wrapper['typo']) ? $wrapper['typo'] : [];

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';

        $items = isset($attributes['items']) ? $attributes['items'] : [];


        $header = isset($attributes['header']) ? $attributes['header'] : [];
        $headerOptions = isset($header['options']) ? $header['options'] : [];
        $headerStyles = isset($header['styles']) ? $header['styles'] : [];
        $headerTag = isset($headerOptions['tag']) ? $headerOptions['tag'] : 'h2';

        $headerActive = isset($attributes['headerActive']) ? $attributes['headerActive'] : [];
        $headerActiveOptions = isset($headerActive['options']) ? $headerActive['options'] : [];
        $headerActiveStyles = isset($headerActive['styles']) ? $headerActive['styles'] : [];



        $content = isset($attributes['content']) ? $attributes['content'] : [];
        $contentOptions = isset($content['options']) ? $content['options'] : [];
        $contentStyles = isset($content['styles']) ? $content['styles'] : [];

        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';

        $iconToggle = isset($attributes['iconToggle']) ? $attributes['iconToggle'] : [];
        $iconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];
        $iconToggleStyles = isset($iconToggle['styles']) ? $iconToggle['styles'] : [];

        $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : '';
        $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : '';
        $iconToggleSrc = isset($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : '';
        $iconTogglePosition = isset($iconToggleOptions['position']) ? $iconToggleOptions['position'] : '';
        $iconToggleClass = isset($iconToggleOptions['class']) ? $iconToggleOptions['class'] : '';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;

        //var_dump($icon);


        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }

        $iconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
        $iconToggleHtml = '<span class="' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>';


        ob_start();




        if (!empty($wrapperTag)) :
?>

            <div class="PGBlockAccordion <?php echo $blockId; ?>">



                <?php
                foreach ($items as $index => $item) {

                ?>
                    <div class="ac">
                        <<?php echo $headerTag; ?> class="ac-header ac-trigger <?php echo $headerOptions['class']; ?>" index=<?php echo esc_attr($index); ?> blockId=<?php echo esc_attr($blockId); ?>>
                            <?php if ($iconPosition == 'beforeHeader') : ?>
                                <span class="icon-idle"><?php echo $iconHtml; ?></span>
                                <span class="icon-toggled"><?php echo $iconToggleHtml; ?></span>

                            <?php endif; ?>
                            <span><?php echo $item['headerText']; ?></span>
                            <?php if ($iconPosition == 'afterHeader') : ?>
                                <span class="float-right">
                                    <span class="icon-idle"><?php echo $iconHtml; ?></span>
                                    <span class="icon-toggled"><?php echo $iconToggleHtml; ?></span>
                                </span>
                            <?php endif; ?>
                        </<?php echo $headerTag; ?>>

                        <div class="ac-panel <?php echo $contentOptions['class']; ?>" id="<?php echo $blockId . $index; ?>">

                            <?php  ?>
                            <div class="ac-text"><?php echo $item['content']; ?></div>
                            <?php  ?>
                        </div>
                    </div>


                <?php
                }

                ?>
            </div>
        <?php

        endif;



        ?>


        <script>
            document.addEventListener("DOMContentLoaded", function(event) {
                new Accordion('.PGBlockAccordion', {
                    duration: 400,
                    onOpen: (currElement) => {


                        //console.log('onOpen');

                    },
                    onClose: (currElement) => {
                        //console.log('onClose');
                        //console.log();

                    },
                    beforeOpen: (currElement) => {
                        console.log('beforeOpen');
                        var iconIdle = currElement.querySelector('.icon-idle');
                        var iconToggled = currElement.querySelector('.icon-toggled');

                        iconIdle.style.display = 'none';
                        iconToggled.style.display = 'inline-block';
                    },
                    beforeClose: (currElement) => {
                        console.log('beforeClose');
                        var iconIdle = currElement.querySelector('.icon-idle');
                        var iconToggled = currElement.querySelector('.icon-toggled');

                        iconIdle.style.display = 'inline-block';
                        iconToggled.style.display = 'none';
                    }

                });

            })
        </script>






<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockAccordion();
