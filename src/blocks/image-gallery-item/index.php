<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockImageGalleryItem
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


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/image-gallery-item/block.json',
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

        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $galleryId = isset($block->context['post-grid/galleryId']) ? $block->context['post-grid/galleryId'] : '';
        $galleryLightbox = isset($block->context['post-grid/lightbox']) ? $block->context['post-grid/lightbox'] : null;

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';




        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






        $obj['id'] = $post_ID;
        $obj['type'] = 'post';



        $wrapperClass = parse_css_class($wrapperClass, $obj);

        ob_start();

        ?>
                <div
                    class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
                    <?php echo $content ?>
                </div>
                <?php
                return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockImageGalleryItem();