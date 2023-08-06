<?php
if (!defined('ABSPATH')) exit();



class PGBlockSocialShare
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/social-share-x/index.css');
        // wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/social-share-x/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/social-share', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  array(
                'wrapper' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' => array(
                            'tag' => 'div',
                            'class' => '',
                        ),
                        'styles' =>
                        array(

                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
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
                            'class' => 'icon',
                            'position' => 'beforeLabel',
                        ),
                        'styles' =>
                        array(

                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'label' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                        ),
                        'styles' =>
                        array(

                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'count' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                        ),
                        'styles' =>
                        array(

                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'elements' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'linkTarget' => '_blank',
                            'showLabel' => false,
                            'showCount' => false,
                            'showIcon' => true,
                            'iconPositon' => 'beforeLabel',
                        ),
                        'styles' =>
                        array(

                            'color' =>
                            array(
                                'Desktop' => '#18978F',
                            ),
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' =>
                            array(
                                'Desktop' =>
                                array(
                                    'top' => '5px',
                                    'right' => '5px',
                                    'bottom' => '5px',
                                    'left' => '5px',
                                ),
                            ),
                            'display' => [],
                            'borderRadius' => [],
                            'fontSize' =>
                            array(
                                'Desktop' =>
                                array(
                                    'val' => '35',
                                ),
                            ),
                            'lineHeight' => [],
                            'letterSpacing' => [],
                            'fontWeight' => [],
                            'textDecoration' => [],
                            'textTransform' => [],
                        ),
                        'items' =>
                        array(
                            0 =>
                            array(
                                'id' => 'facebook',
                                'label' => 'Facebook',
                                'count' => 125,
                                'url' => 'https://www.facebook.com/sharer.php?u={URL}',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => 'fab fa-facebook-square',
                                ),
                                'styles' =>
                                array(

                                    'color' => [],
                                    'backgroundColor' => [],
                                    'padding' => [],
                                    'margin' => [],
                                    'display' => [],
                                ),
                            ),
                            1 =>
                            array(
                                'id' => 'twitter',
                                'label' => 'Twitter',
                                'count' => 125,
                                'url' => 'https://twitter.com/intent/tweet?url={URL}',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => 'fab fa-twitter-square',
                                ),
                                'styles' =>
                                array(

                                    'color' => [],
                                    'backgroundColor' => [],
                                    'padding' => [],
                                    'margin' => [],
                                    'display' => [],
                                ),
                            ),
                            2 =>
                            array(
                                'id' => 'linkedin',
                                'label' => 'Linkedin',
                                'count' => 125,
                                'url' => 'https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => 'fab fa-linkedin',
                                ),
                                'styles' =>
                                array(

                                    'color' => [],
                                    'backgroundColor' => [],
                                    'padding' => [],
                                    'margin' => [],
                                    'display' => [],
                                ),
                            ),
                        ),
                    ),
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
                        [],
                    ),
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
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


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
        $post_data = get_post($post_ID);

        $post_url = get_the_permalink($post_ID);
        $post_title = get_the_title($post_ID);
        $post_thumb_url = get_the_post_thumbnail_url($post_ID, 'full');

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

        $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
        $elementsOptions = isset($elements['options']) ? $elements['options'] : [];
        $elementsItems = isset($elements['items']) ? $elements['items'] : [];
        $showLabel = isset($elementsOptions['showLabel']) ? $elementsOptions['showLabel'] : false;
        $showIcon = isset($elementsOptions['showIcon']) ? $elementsOptions['showIcon'] : true;
        $showCount = isset($elementsOptions['showCount']) ? $elementsOptions['showCount'] : false;



        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';

        $label = isset($attributes['label']) ? $attributes['label'] : [];
        $labelOptions = isset($label['options']) ? $label['options'] : [];




        $count = isset($attributes['count']) ? $attributes['count'] : [];
        $countOptions = isset($count['options']) ? $count['options'] : [];


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : [];


        //$postGridCustomCss .= $customCss;
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];








        ob_start();

        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <?php
                if (!empty($elementsItems))
                    foreach ($elementsItems as $index => $item) {
                        $label = isset($item['label']) ? $item['label'] : '';
                        $count = isset($item['count']) ? $item['count'] : '';
                        $url = isset($item['url']) ? $item['url'] : '';

                        $siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';

                        $iconLibrary = isset($siteIcon['library']) ? $siteIcon['library'] : '';
                        $iconSrcType = isset($siteIcon['srcType']) ? $siteIcon['srcType'] : '';
                        $iconSrc = isset($siteIcon['iconSrc']) ? $siteIcon['iconSrc'] : '';

                        //echo var_export($url, true);


                        if ($iconLibrary == 'fontAwesome') {
                            wp_enqueue_style('fontawesome-icons');
                        } else if ($iconLibrary == 'iconFont') {
                            wp_enqueue_style('icofont-icons');
                        } else if ($iconLibrary == 'bootstrap') {
                            wp_enqueue_style('bootstrap-icons');
                        }

                        $fontIconHtml = '<span class="icon ' . $iconClass . ' ' . $iconSrc . '"></span>';

                        $pramsArr = ['{URL}' => $post_url, '{TITLE}' => $post_title, '{IMAGE}' => $post_thumb_url,];
                        $url = strtr($url, (array)$pramsArr);



                ?>
                    <a href="<?php echo esc_url_raw($url); ?>" class="<?php echo esc_attr('media-item item-' . $index); ?>">

                        <?php if ($showLabel) : ?>
                            <span class='media-label'>
                                <?php echo esc_html($label); ?>

                            </span>
                        <?php endif; ?>

                        <?php if ($showIcon) : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>

                        <?php if ($showCount) : ?>
                            <span class="media-count">(<?php echo esc_html($count); ?>)</span>
                        <?php endif; ?>

                    </a>
                <?php

                    }


                ?>
            </<?php echo esc_attr($wrapperTag); ?>>

        <?php

        endif;

        ?>














<?php return ob_get_clean();
    }
}

$PGBlockSocialShare = new PGBlockSocialShare();
