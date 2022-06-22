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
            'style' => 'front_style',
            'view_script' => 'front_script',
            'uses_context' =>  ["postId", "postType", "queryId"],

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






        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-title/index.js', array('wp-element'));

            wp_enqueue_style('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-title/index.css');
        }



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $isLink = $attributes['isLink'];
        $linkTarget = $attributes['linkTarget'];
        $linkAttr = $attributes['linkAttr'];
        $rel = $attributes['rel'];

        $textAlign = $attributes['textAlign'];
        $tag = $attributes['tag'];
        $color = $attributes['color'];
        $bgColor = $attributes['bgColor'];


        $linkAttrStr = '';

        if (!empty($linkAttr))
            foreach ($linkAttr as $attr) {

                $linkAttrStr .= $attr->id . '=' . $attr->val . ' ';
            }


        global $postGridCss;

        $postGridCss[] = ['id' => 'post-title-' . $post_ID, 'style' => 'color:' . $color['val']];


        var_dump($linkAttrStr);


        ob_start(); ?>

        <div class="pg-postTitle pg-postTitle-<?php echo $post_ID; ?>">

            <?php if ($isLink) : ?>
                <a href="<?php echo esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>><?php echo get_the_title($post_ID); ?></a>
            <?php else : ?>
                <?php echo get_the_title($post_ID); ?>
            <?php endif; ?>




            <pre><code><?php echo var_export(($attributes));
                        ?></code></pre>


        </div>

<?php return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostTitle();
