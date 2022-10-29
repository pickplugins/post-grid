<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostTaxonomies
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-taxonomies/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-taxonomies/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-taxonomies', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
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

        //var_dump($block);

        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';

        $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : '';

        $taxonomies = isset($attributes['taxonomies']) ? $attributes['taxonomies'] : [];
        $taxonomiesOptions = isset($taxonomies['options']) ? $taxonomies['options'] : [];

        $taxName = isset($taxonomiesOptions['taxName']) ? $taxonomiesOptions['taxName'] : '';


        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];
        $itemsStyles = isset($items['styles']) ? $items['styles'] : [];
        $itemsTypo = isset($items['typo']) ? $items['typo'] : [];

        $itemsPrefix = isset($itemsOptions['prefix']) ? $itemsOptions['prefix'] : '';
        $itemsPostfix = isset($itemsOptions['postfix']) ? $itemsOptions['postfix'] : '';
        $itemsMaxCount = isset($itemsOptions['maxCount']) ? (int) $itemsOptions['maxCount'] : 99;
        $itemsPostCount = isset($itemsOptions['postCount']) ? $itemsOptions['postCount'] : true;
        $itemsClass = isset($itemsOptions['class']) ? $itemsOptions['class'] : '';
        $itemsLinkTarget = isset($itemsOptions['linkTarget']) ? $itemsOptions['linkTarget'] : '';
        $itemsLinkAttr = isset($itemsOptions['linkAttr']) ? $itemsOptions['linkAttr'] : [];

        $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
        $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];
        $frontTextStyles = isset($frontText['styles']) ? $frontText['styles'] : [];
        $frontTextTypo = isset($frontText['typo']) ? $frontText['typo'] : [];

        $frontTexttext = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : __('Categories:', 'post-grid');
        $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
        $separatorStyles = isset($separator['styles']) ? $separator['styles'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $postGridCustomCss .= $customCss;

        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





        $linkAttrStr = '';



        if (!empty($itemsLinkAttr))
            foreach ($itemsLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }

        $taxonomy = $taxName;

        $terms = get_the_terms($post_ID, $taxonomy);




        $termsCount = (is_array($terms)) ? count($terms) : 0;

        $maxCount = ($termsCount >  $itemsMaxCount) ? $itemsMaxCount : $termsCount;
        $maxCount = (empty($maxCount)) ? $termsCount : $maxCount;

        ob_start();



?>



        <div class="<?php echo $blockId; ?>">
            <span class='frontText '><?php echo $frontTexttext; ?></span>
            <?php

            $i = 1;
            foreach ($terms as $term) {

                $term_id = $term->term_id;
                $term_post_count = $term->count;

                $link = get_term_link($term_id);

                if ($i > $maxCount) break;

            ?>
                <a href="<?php echo esc_url_raw($link); ?>" <?php echo esc_attr($linkAttrStr); ?> target="<?php echo esc_attr($itemsLinkTarget); ?>" class="<?php echo esc_attr($itemsClass); ?>">

                    <?php if (!empty($itemsPrefix)) : ?>
                        <span class='prefix'><?php echo wp_kses_post($itemsPrefix); ?></span>

                    <?php endif; ?>

                    <span class='termTitle'><?php echo wp_kses_post($term->name); ?></span>
                    <?php if ($itemsPostCount) : ?>
                        <span class='postCount'>(<?php echo wp_kses_post($term_post_count); ?>)</span>
                    <?php endif; ?>

                    <?php if (!empty($itemsPostfix)) : ?>
                        <span class='postfix'><?php echo wp_kses_post($itemsPostfix); ?></span>

                    <?php endif; ?>

                    <?php if ($maxCount > $i) : ?>
                        <span className='separator'><?php echo esc_html($separatorText); ?></span>
                    <?php endif; ?>
                </a>
            <?php
                $i++;
            }

            ?>

        </div>











<?php return ob_get_clean();
    }
}

$PGBlockPostTaxonomies = new PGBlockPostTaxonomies();
