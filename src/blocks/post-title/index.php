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
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-title/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-title/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-title', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'editor_style',

            'render_callback' => array($this, 'theHTML')
        ));
    }

    function front_script($attributes)
    {


        var_dump('asdasdasd');
    }
    function front_style($attributes)
    {
        var_dump('asdasdasd');
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;




        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-title/index.js', array('wp-element'));

            // wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'src/blocks/post-title/index.css');
        }

        // echo "<pre>";
        // var_dump($attributes["postTitle"]["isLink"]);
        // echo "</pre>";
        

        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $isLink = isset($attributes["postTitle"]["isLink"]) ? $attributes["postTitle"]["isLink"] : '';
        $linkTarget = isset($attributes['linkTarget']) ? $attributes['linkTarget'] : '';
        $linkAttr = isset($attributes['linkAttr']) ? $attributes['linkAttr'] : [];
        $rel = isset($attributes['rel']) ? $attributes['rel'] : '';
        $textAlign = isset($attributes['textAlign']) ? $attributes['textAlign'] : '';
        $color = isset($attributes['color']) ? $attributes['color'] : ['val' => '', 'responsive' => ''];
        $bgColor = isset($attributes['bgColor']) ? $attributes['bgColor'] : ['val' => '', 'responsive' => ''];


        $postGridCss[] = ['attr' => 'color', 'id' => '.pg-postTitle-' . $post_ID . ' a', 'default' => $color['val'], 'reponsive' => $color['responsive']];

        $postGridCss[] = ['attr' => 'background-color', 'id' => '.pg-postTitle-' . $post_ID . ' a', 'default' => $bgColor['val'], 'reponsive' => $bgColor['responsive']];

        $tag = isset($attributes['tag']) ? $attributes['tag'] : 'h2';
        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';


        $linkAttrStr = '';



        if (!empty($linkAttr))
            foreach ($linkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }







        ob_start();




?>




        <<?php echo $tag; ?> class="pg-postTitle pg-postTitle-<?php echo $post_ID; ?>">
            <?php if ($isLink) : ?>
                <a href="<?php echo $attributes["postTitle"]["customUrl"]["url"]; ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>><?php echo $prefix; ?><?php echo get_the_title($post_ID); ?><?php echo $postfix; ?></a>
            <?php else : ?>
                <?php echo get_the_title($post_ID); ?>
            <?php endif; ?>
        </<?php echo $tag; ?>>



<?php return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostTitle();
