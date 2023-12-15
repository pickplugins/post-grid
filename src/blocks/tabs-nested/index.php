<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockTabs
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pgtabs_front_script', post_grid_plugin_url . 'src/blocks/tabs-nested/front-scripts.js', [], '', true);
        wp_register_style('pgtabs_front_style', post_grid_plugin_url . 'src/blocks/tabs-nested/index.css');

        if (has_block('post-grid/tabs-nested')) {

            wp_enqueue_style('jquery-ui');

            wp_enqueue_script('jquery');
            wp_enqueue_script('jquery-ui-core');
            wp_enqueue_script('jquery-ui-accordion');
            wp_enqueue_script('jquery-effects-core');

            wp_enqueue_script('pgtabs_front_script');
            wp_enqueue_style('pgtabs_front_style');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layers/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/tabs-nested/block.json',
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
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $wrapper = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';




        $activeTab = isset($attributes['activeTab']) ? $attributes['activeTab'] : '';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

        $tabs = isset($attributes['tabs']) ? $attributes['tabs'] : [];




        $tabsWrap = isset($attributes['tabsWrap']) ? $attributes['tabsWrap'] : [];
        $tabsWrapOptions = isset($tabsWrap['options']) ? $tabsWrap['options'] : [];


        $navsWrap = isset($attributes['navsWrap']) ? $attributes['navsWrap'] : [];
        $navsWrapOptions = isset($navsWrap['options']) ? $navsWrap['options'] : [];

        $navItem = isset($attributes['navItem']) ? $attributes['navItem'] : [];
        $navItemOptions = isset($navItem['options']) ? $navItem['options'] : [];

        $activeNavItem = isset($attributes['activeNavItem']) ? $attributes['activeNavItem'] : [];
        $activeNavItemOptions = isset($activeNavItem['options']) ? $activeNavItem['options'] : [];

        $navLabel = isset($attributes['navLabel']) ? $attributes['navLabel'] : [];
        $navLabelOptions = isset($navLabel['options']) ? $navLabel['options'] : [];

        $contentWrap = isset($attributes['contentWrap']) ? $attributes['contentWrap'] : [];
        $contentWrapOptions = isset($contentWrap['options']) ? $contentWrap['options'] : [];



        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
        $iconHtml = !empty($iconSrc) ? '<span class=" ' . $iconClass . ' ' . $iconSrc . '"></span>' : '';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }



        $obj['id'] = $post_ID;
        $obj['type'] = 'post';



        $wrapperClass = parse_css_class($wrapperClass, $obj);

        ob_start();



        ?>
                <div id="<?php echo esc_attr($blockId); ?>"
                    class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
                    <div class="navs-wrapper">
                        <?php

                        foreach ($tabs as $tab) {

                            ?>
                                <div id="<?php echo esc_attr($tab['uid']); ?>" data-tab-id="<?php echo esc_attr($tab['uid']); ?>"
                                    class="<?php echo ($tab['uid'] == $activeTab) ? 'nav-item nav-item-active  ' : 'nav-item ' ?>" role="tab"
                                    tabIndex="0">

                                    <?php if ($iconPosition == 'before'): ?>
                                            <div class='nav-icon'>
                                                <?php echo wp_kses_post($iconHtml); ?>
                                            </div>
                                    <?php endif; ?>


                                    <div class="nav-label">
                                        <?php echo wp_kses_post($tab['title']); ?>
                                    </div>
                                    <?php if ($iconPosition == 'after'): ?>
                                            <div class='nav-icon'>
                                                <?php echo wp_kses_post($iconHtml); ?>
                                            </div>
                                    <?php endif; ?>

                                </div>

                                <?php

                        }

                        ?>


                    </div>
                    <div class='panels-wrap'>
                        <?php echo $content; ?>
                    </div>
                </div>





                <?php




                ?>









                <?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockTabs();