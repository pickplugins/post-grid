<?php
if (!defined('ABSPATH')) exit();



class PGBlockFeaturedImage
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-featured-image/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-featured-image/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-featured-image', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "class" => "",
                            "useAsBackground" => "no"
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "height" => [],
                            "overflow" => [],
                            "color" => [],
                            "bgColor" => [],
                            "bgImage" => [],
                            "bgPosition" => [],
                            "bgSize" => [],
                            "display" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "featuredImage" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "linkTo" => "",
                            "customUrl" => "",
                            "linkToMetaKey" => "",
                            "altTextSrc" => "imgAltText",
                            "altTextCustom" => "",
                            "altTextMetaKey" => "",
                            "linkTarget" => "_blank",
                            "linkAttr" => [],
                            "class" => "",
                            "size" => [
                                "Desktop" => "full",
                                "Tablet" => "full",
                                "Mobile" => "full"
                            ]
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "display" => [],
                            "width" => [
                                "Desktop" => [
                                    "val" => "100",
                                    "unit" => "%"
                                ]
                            ],
                            "height" => [
                                "Desktop" => [
                                    "val" => "",
                                    "unit" => "auto"
                                ]
                            ],
                            "filter" => [],
                            "objectFit" => [],
                            "padding" => [],
                            "margin" => []
                        ],
                        "hoverStyles" => [
                            "filter" => []
                        ]
                    ]
                ],
                "customCss" => [
                    "type" => "string",
                    "default" => ""
                ],
                "blockId" => [
                    "type" => "string",
                    "default" => ""
                ],
                "blockCssY" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ]
            ]


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

        //var_dump($block->context);

        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
        $useAsBackground = isset($wrapperOptions['useAsBackground']) ? $wrapperOptions['useAsBackground'] : 'no';

        $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : '';


        $featuredImage = isset($attributes['featuredImage']) ? $attributes['featuredImage'] : [];
        $featuredImageOptions = isset($featuredImage['options']) ? $featuredImage['options'] : [];
        $featuredImageStyles = isset($featuredImage['styles']) ? $featuredImage['styles'] : [];

        $featuredImageLinkTo = isset($featuredImageOptions['linkTo']) ? $featuredImageOptions['linkTo'] : '';
        $featuredImageLinkToMetaKey = isset($featuredImageOptions['linkToMetaKey']) ? $featuredImageOptions['linkToMetaKey'] : '';

        $featuredImageAltTextSrc = isset($featuredImageOptions['altTextSrc']) ? $featuredImageOptions['altTextSrc'] : 'imgAltText';
        $featuredImageAltTextCustom = isset($featuredImageOptions['altTextCustom']) ? $featuredImageOptions['altTextCustom'] : '';
        $featuredImageAltTextMetaKey = isset($featuredImageOptions['altTextMetaKey']) ? $featuredImageOptions['altTextMetaKey'] : '';

        $featuredImageIsLink = isset($featuredImageOptions['isLink']) ? $featuredImageOptions['isLink'] : true;
        $linkTarget = isset($featuredImageOptions['linkTarget']) ? $featuredImageOptions['linkTarget'] : '_blank';
        $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';


        $linkAttr = isset($featuredImageOptions['linkAttr']) ? $featuredImageOptions['linkAttr'] : [];
        $rel = isset($featuredImageOptions['rel']) ? $featuredImageOptions['rel'] : '';
        $size = isset($featuredImageOptions['size']['Desktop']) ? $featuredImageOptions['size']['Desktop'] : 'full';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];


        $postGridCssY[] = $blockCssY['items'];



        $postGridCustomCss .= $customCss;



        //var_dump($size);


        $linkAttrStr = '';



        if (!empty($linkAttr))
            foreach ($linkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }



        $post_title = get_the_title($post_ID);

        $thumb_id = get_post_thumbnail_id($post_ID);
        $image_srcs = wp_get_attachment_image_src($thumb_id, $size);
        $image_src_url = isset($image_srcs[0]) ? $image_srcs[0] : '';
        $image_src_w = isset($image_srcs[1]) ? $image_srcs[1] : '';
        $image_src_h = isset($image_srcs[2]) ? $image_srcs[2] : '';

        $attachment_url = wp_get_attachment_url($thumb_id);
        $attachment_post = get_post($thumb_id);

        $image_srcset = wp_get_attachment_image_srcset($thumb_id);
        $attachment_metadata = wp_get_attachment_metadata($thumb_id);



        //$thumb = wp_get_attachment_image_src($thumb_id, $size);



        if ($featuredImageLinkTo == 'postUrl') {

            $linkUrl = get_permalink($post_ID);
        } else if ($featuredImageLinkTo == 'customField') {

            $linkUrl = get_post_meta($post_ID, $featuredImageLinkToMetaKey, true);
        } else if ($featuredImageLinkTo == 'authorUrl') {
            $author_id = get_post_field('post_author', $post_ID);
            $user = get_user_by('ID', $author_id);
            $linkUrl = $user->user_url;
        } else if ($featuredImageLinkTo == 'authorLink') {
            $author_id = get_post_field('post_author', $post_ID);
            $linkUrl = get_the_author_link($author_id);
        } else if ($featuredImageLinkTo == 'homeUrl') {
            $linkUrl = bloginfo('home');
        } else if ($featuredImageLinkTo == 'custom') {
            $linkUrl = $customUrl;
        }

        $altText = '';

        if ($featuredImageAltTextSrc == 'imgAltText') {

            $altText = get_post_meta($post_ID, '_wp_attachment_image_alt', true);
        } else if ($featuredImageAltTextSrc == 'imgCaption') {

            $altText = $attachment_post->post_excerpt;
        } else if ($featuredImageAltTextSrc == 'imgDescription') {
            $altText = $attachment_post->post_content;
        } else if ($featuredImageAltTextSrc == 'imgTitle') {
            $altText = get_the_title($thumb_id);
        } else if ($featuredImageAltTextSrc == 'imgSlug') {
            $altText = get_post_field('post_name', $post_ID);
        } else if ($featuredImageAltTextSrc == 'postTitle') {
            $altText = get_the_title($post_ID);
        } else if ($featuredImageAltTextSrc == 'excerpt') {
            $altText = get_the_excerpt($post_ID);
        } else if ($featuredImageAltTextSrc == 'postSlug') {
            $altText = get_the_excerpt($post_ID);
        } else if ($featuredImageAltTextSrc == 'customField') {
            $altText = get_post_meta($post_ID, $featuredImageAltTextMetaKey, true);
        } else if ($featuredImageAltTextSrc == 'custom') {
            $altText = $featuredImageAltTextCustom;
        }







        ob_start();



        if (!empty($wrapperTag) && $useAsBackground == 'no') :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <?php if (!empty($featuredImageLinkTo)) : ?>
                    <a href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>

                        <img srcset="<?php echo esc_attr($image_srcset); ?>" src="<?php echo esc_url_raw($image_src_url); ?>" width="<?php echo esc_attr($image_src_w); ?>" height="<?php echo esc_attr($image_src_h); ?>" alt="<?php echo esc_attr($altText); ?>">

                    </a>
                <?php else : ?>
                    <img srcset="<?php echo esc_attr($image_srcset); ?>" src="<?php echo esc_url_raw($image_src_url); ?>" width="<?php echo esc_attr($image_src_w); ?>" height="<?php echo esc_attr($image_src_h); ?>" alt="<?php echo esc_attr($altText); ?>">

                <?php endif; ?>
            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag) && $useAsBackground == 'no') :
        ?>
            <?php if (!empty($featuredImageLinkTo)) : ?>
                <a class="<?php echo esc_attr($blockId); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>
                    <img src="<?php echo esc_url_raw($attachment_url); ?>" alt="<?php echo esc_attr($altText); ?>">
                </a>
            <?php else : ?>
                <img src="<?php echo esc_url_raw($attachment_url); ?>" alt="<?php echo esc_attr($altText); ?>">
            <?php endif; ?>
        <?php

        endif;


        if (!empty($wrapperTag) && $useAsBackground == 'yes') :
        ?>
            <?php if (!empty($featuredImageLinkTo)) : ?>
                <a href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>
                    <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>" style="background-image: url(<?php echo esc_url_raw($attachment_url) ?>)">
                    </<?php echo esc_attr($wrapperTag); ?>>
                </a>
            <?php else : ?>

                <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>" style="background-image: url(<?php echo esc_url_raw($attachment_url) ?>)">

                </<?php echo esc_attr($wrapperTag); ?>>
            <?php endif; ?>

        <?php

        endif;


        ?>









<?php return ob_get_clean();
    }
}

$PGBlockFeaturedImage = new PGBlockFeaturedImage();
