<?php
if (!defined('ABSPATH')) exit();



class PGBlockList
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('pglist_editor_style', post_grid_plugin_url . 'src/blocks/list/index.css');
        wp_register_script('pglist_editor_script', post_grid_plugin_url . 'src/blocks/list/index.js', array('wp-blocks', 'wp-element'));
        wp_register_style('pglist_front_style', post_grid_plugin_url . 'src/blocks/list/index.css');



        register_block_type('post-grid/list', array(
            //'editor_script' => 'pglist_editor_script',
            //'script' => 'pglist_front_script',

            //'editor_style' => 'pglist_editor_style',
            //'style' => 'pglist_front_style',

            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'render_callback' => array($this, 'theHTML')
        ));
    }

    // function front_script($attributes)
    // {
    // }
    function front_style($attributes)
    {
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


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

        $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'ul';

        $items = isset($attributes['items']) ? $attributes['items'] : [];


        $item = isset($attributes['item']) ? $attributes['item'] : [];
        $itemOptions = isset($item['options']) ? $item['options'] : [];
        $itemStyles = isset($item['styles']) ? $item['styles'] : [];
        $itemTag = isset($itemOptions['tag']) ? $itemOptions['tag'] : 'li';





        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


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


        ob_start();




        if (!empty($wrapperTag)) :
?>

            <<?php echo $wrapperTag; ?> class="PGBlockAccordion <?php echo $blockId; ?>">



                <?php
                foreach ($items as $index => $item) {

                ?>
                    <<?php echo $itemTag; ?> class="ac-item ac-trigger <?php echo $itemOptions['class']; ?>" index=<?php echo esc_attr($index); ?> blockId=<?php echo esc_attr($blockId); ?>>


                        <?php if ($iconPosition == 'left') : ?>
                            <?php echo $iconHtml; ?>
                        <?php endif; ?>

                        <span>

                            <?php if ($iconPosition == 'before') : ?>
                                <?php echo $iconHtml; ?>
                            <?php endif; ?>
                            <?php echo $item['text']; ?></span>
                        <?php if ($iconPosition == 'after') : ?>
                            <?php echo $iconHtml; ?>
                        <?php endif; ?>


                        <?php if ($iconPosition == 'right') : ?>
                            <span class="float-right"><?php echo $iconHtml; ?></span>
                        <?php endif; ?>


                    </<?php echo $itemTag; ?>>





                <?php
                }

                ?>
            </<?php echo $wrapperTag; ?>>
        <?php

        endif;



        ?>








<?php return ob_get_clean();
    }
}

$PGBlockList = new PGBlockList();