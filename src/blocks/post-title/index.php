<?php
if (!defined('ABSPATH')) exit();



class BlockPostTitle
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_dir . 'src/blocks/post-title/index.css');
        wp_register_script('editor_script', post_grid_plugin_dir . 'src/blocks/post-title/index.js', array('wp-blocks', 'wp-element'));
        register_block_type('post-grid/post-title', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {






        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-title/index.js', array('wp-element'));

            wp_enqueue_style('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-title/index.css');
        }



        $post_ID = $block->context['postId'];

        $color = $attributes['color'];

        global $postGridCss;

        $postGridCss[] = ['id' => 'post-title-' . $post_ID, 'style' => 'color:' . $color['val']];




        ob_start(); ?>

        <div class="post-title-wrap post-title-<?php echo $post_ID; ?>">
            <?php echo get_the_title($post_ID); ?>

            <?php echo var_export(serialize($block->context));
            ?>


        </div>

<?php return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostTitle();
