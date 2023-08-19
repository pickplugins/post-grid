<?php
if (!defined('ABSPATH')) exit();



class PGBlockMenuWrapItem
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        //add_action('wp_enqueue_scripts', array($this, 'front_scripts'));

    }

    function front_scripts($attributes)
    {
        wp_register_script('pgmenu-wrap-item_style', post_grid_plugin_url . 'src/blocks/menu-wrap-item/front-scripts.js', [], '', true);

        if (has_block('post-grid/menu-wrap-item')) {



            wp_enqueue_script('pgflex-wrap_front_script');
        }
    }

    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/menu-wrap-item/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/menu-wrap-item/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/menu-wrap-item', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
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
                            'tag' => 'li',
                            'class' => 'flex-item-wrap',
                            'isActive' => false,
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
                'link' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                            'text' => '',
                            'url' => '',
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
                'icon' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'enable' => true,
                            'library' => 'fontAwesome',
                            'srcType' => 'class',
                            'iconSrc' => 'fas fa-check-circle',
                            'position' => 'beforeText',
                            'class' => 'link-icon',
                        ),
                        'styles' =>
                        array(
                            'color' =>
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


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $menuWrap = isset($attributes['menuWrap']) ? $attributes['menuWrap'] : [];
        $subMenuWrap = isset($attributes['subMenuWrap']) ? $attributes['subMenuWrap'] : [];


        $link = isset($attributes['link']) ? $attributes['link'] : [];
        $linkOptions = isset($link['options']) ? $link['options'] : [];


        $linktext = isset($linkOptions['text']) ? $linkOptions['text'] : '';
        $linkurl = isset($linkOptions['url']) ? $linkOptions['url'] : '';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;

        //var_dump($link);


        ob_start();

?>


        <li class="pg-menu-wrap-item <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">

            <?php if (!empty($linktext)) : ?>
                <a class='menuLink' href="<?php echo esc_url_raw($linkurl); ?>"><?php echo esc_html($linktext) ?></a>
            <?php endif; ?>

            <ul class='subMenu'> <?php echo $content ?></ul>
        </li>


<?php
        return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockMenuWrapItem();
