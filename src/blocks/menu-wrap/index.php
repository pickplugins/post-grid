<?php
if (!defined('ABSPATH')) exit();



class PGBlockMenuWrap
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_style('pgmenu_wrap_style', post_grid_plugin_url . 'src/blocks/menu-wrap/index.css');

        if (has_block('post-grid/menu-wrap')) {
            wp_enqueue_style('pgmenu_wrap_style');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('pgmenu_wrap_editor_style', post_grid_plugin_url . 'src/blocks/menu-wrap/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/menu-wrap/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/menu-wrap', array(
            //'editor_script' => 'editor_script',
            'editor_style' => 'pgmenu_wrap_editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => [$this, 'front_style'],
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
                            'display' =>
                            array(
                                'Desktop' => 'flex',
                            ),
                        ),
                    ),
                ),
                'menuWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'ul',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'display' =>
                            array(
                                'Desktop' => 'flex',
                            ),
                        ),
                    ),
                ),
                'subMenuWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                            'type' => '',
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



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $menuWrap = isset($attributes['menuWrap']) ? $attributes['menuWrap'] : [];
        $subMenuWrap = isset($attributes['subMenuWrap']) ? $attributes['subMenuWrap'] : [];



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;

        //var_dump($blockCssY);

        ob_start();



?>
        <div class="pg-menu-wrap <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
            <ul class="menu"><?php echo $content ?></ul>
        </div>
<?php

        return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockMenuWrap();
