<?php
if (!defined('ABSPATH')) exit();



class BlockRecentPost
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', PREFIX_PLUGIN_PATH . 'src/blocks/recent-posts/index.css');
        wp_register_script('editor_script', PREFIX_PLUGIN_PATH . 'src/blocks/blockxyz-recent-posts/index.js', array('wp-blocks', 'wp-element'));
        register_block_type('prefix-blocks/blockxyz-recent-posts', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {




        $recent_posts = wp_get_recent_posts(array(
            'numberposts' => 1,
            'post_status' => 'publish',
        ));
        if (count($recent_posts) === 0) {
            return 'No posts';
        }
        $post = $recent_posts[0];
        $post_id = $post['ID'];
        return sprintf(
            '<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
            esc_url(get_permalink($post_id)),
            esc_html(get_the_title($post_id))
        );
    }
}

$BlockPostGrid = new BlockRecentPost();
