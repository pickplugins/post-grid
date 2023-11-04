<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockPopup
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pgpopup_front_script', post_grid_plugin_url . 'src/blocks/popup/front-scripts.js', [], '', true);
        wp_register_style('pgpopup_animate', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', []);


        if (has_block('post-grid/popup')) {

            wp_enqueue_style('pgpopup_animate');
            wp_enqueue_script('pgpopup_front_script');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/popup/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/popup/index.js', array('wp-blocks', 'wp-element'));

        wp_register_style('pgpopup-animate', post_grid_plugin_url . 'src/blocks/popup/animate.min.css');


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/popup/block.json',
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



        global $postGridCssY;




        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


        $visible = isset($attributes['visible']) ? $attributes['visible'] : [];

        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


        $closeWrap = isset($attributes['closeWrap']) ? $attributes['closeWrap'] : [];
        $closeWrapOptions = isset($closeWrap['options']) ? $closeWrap['options'] : [];

        $closeWrapLibrary = isset($closeWrapOptions['library']) ? $closeWrapOptions['library'] : '';
        $closeWrapSrcType = isset($closeWrapOptions['srcType']) ? $closeWrapOptions['srcType'] : '';
        $closeWrapIconSrc = isset($closeWrapOptions['iconSrc']) ? $closeWrapOptions['iconSrc'] : '';
        $closeIconClass = isset($closeWrapOptions['class']) ? $closeWrapOptions['class'] : '';

        $closeWrapAnimation = isset($closeWrapOptions['animation']) ? $closeWrapOptions['animation'] : '';












        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






        if ($closeWrapLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($closeWrapLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($closeWrapLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }


        $closeIconHtml = '<span class="' . $closeIconClass . ' ' . $closeWrapIconSrc . '"></span>';

        $user_id = get_current_user_id();

        $prams = [];
        $prams['isLogged'] = !empty($user_id) ? true : false;
        $prams['userId'] = $user_id;
        $prams['refererr'] = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : "";



        $obj['id'] = $post_ID;
        $obj['type'] = 'post';



        $wrapperClass = parse_css_class($wrapperClass, $obj);


        ob_start();



        ?>
                <div class="<?php echo esc_attr($wrapperClass); ?>   <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>"
                    popup-id="<?php echo esc_attr($blockId); ?>" pgpopup-visible="<?php echo esc_attr(json_encode($visible)) ?>"
                    data-prams="<?php echo esc_attr(json_encode($prams)) ?>" style="display: none;">
                    <div class='inner'>
                        <span class='close' popup-id="<?php echo esc_attr($blockId); ?>"
                            close-animation="<?php echo esc_attr($closeWrapAnimation); ?>">
                            <?php echo $closeIconHtml; ?>
                        </span>
                        <?php echo $content ?>
                    </div>
                </div>
                <?php

                return ob_get_clean();
    }
}

$PGBlockPopup = new PGBlockPopup();