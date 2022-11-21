<?php
if (!defined('ABSPATH')) exit();



class PGBlockImage
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/image/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/image/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/image', array(
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

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
        $useAsBackground = isset($wrapperOptions['useAsBackground']) ? $wrapperOptions['useAsBackground'] : 'no';

        $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : '';


        $featuredImage = isset($attributes['image']) ? $attributes['image'] : [];
        $featuredImageOptions = isset($featuredImage['options']) ? $featuredImage['options'] : [];
        $featuredImageStyles = isset($featuredImage['styles']) ? $featuredImage['styles'] : [];

        $featuredImageSrcType = isset($featuredImageOptions['imgSrcType']) ? $featuredImageOptions['imgSrcType'] : '';
        $featuredImageSrcMetaKey = isset($featuredImageOptions['imgSrcMetaKey']) ? $featuredImageOptions['imgSrcMetaKey'] : '';
        $featuredImageSrcMetaKeyType = isset($featuredImageOptions['imgSrcMetaKeyType']) ? $featuredImageOptions['imgSrcMetaKeyType'] : '';

        $featuredImagesrcUrl = isset($featuredImageOptions['srcUrl']) ? $featuredImageOptions['srcUrl'] : '';

        $featuredImagesrcId = isset($featuredImageOptions['srcId']) ? $featuredImageOptions['srcId'] : '';
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
        $size = isset($featuredImageOptions['size']) ? $featuredImageOptions['size'] : '';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = $blockCssY['items'];



        $postGridCustomCss .= $customCss;


        // echo '<pre>' . var_export($featuredImageSrcType, true) . '</pre>';
        // echo '<pre>' . var_export($featuredImageSrcMetaKey, true) . '</pre>';
        // echo '<pre>' . var_export($featuredImageSrcMetaKeyType, true) . '</pre>';



        $linkAttrStr = '';



        if (!empty($linkAttr))
            foreach ($linkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }



        $post_title = get_the_title($post_ID);

        //$thumb_id = get_post_thumbnail_id($post_ID);
        $thumb_id = $featuredImagesrcId;



        $image_src = wp_get_attachment_image_src($thumb_id);
        $attachment_url = wp_get_attachment_url($thumb_id);
        $attachment_post = get_post($thumb_id);

        $image_srcset = wp_get_attachment_image_srcset($thumb_id);
        $attachment_metadata = wp_get_attachment_metadata($thumb_id);

        if ($featuredImageSrcType == 'customField') {

            if ($featuredImageSrcMetaKeyType == 'ID') {

                $thumb_id = get_post_meta($post_ID, $featuredImageSrcMetaKey, true);
                //echo '<pre>' . var_export($thumb_id, true) . '</pre>';


                $attachment_url = wp_get_attachment_url($thumb_id);
                $attachment_post = get_post($thumb_id);

                $image_srcset = wp_get_attachment_image_srcset($thumb_id);
            } else {
                $attachment_url = get_post_meta($post_ID, $featuredImageSrcMetaKey, true);
            }
        } elseif ($featuredImageSrcType == 'customUrl') {
            $attachment_url = $featuredImagesrcUrl;
        } elseif ($featuredImageSrcType == 'imgId') {
            $attachment_url = wp_get_attachment_url($featuredImagesrcId);
        }



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
            <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>">
                <?php if (!empty($featuredImageLinkTo)) : ?>
                    <a href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>

                        <img src="<?php echo esc_url_raw($attachment_url); ?>" srcset="<?php echo esc_attr($image_srcset); ?>" alt="<?php echo esc_attr($altText); ?>">

                    </a>
                <?php else : ?>
                    <img src="<?php echo esc_url_raw($attachment_url); ?>" srcset="<?php echo esc_attr($image_srcset); ?>" alt="<?php echo esc_attr($altText); ?>">

                <?php endif; ?>
            </<?php echo $wrapperTag; ?>>
        <?php

        endif;

        if (empty($wrapperTag) && $useAsBackground == 'no') :

        ?>

            <?php if (!empty($featuredImageLinkTo)) : ?>
                <a class="<?php echo $blockId; ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>


                    <img src="<?php echo esc_url_raw($attachment_url); ?>" srcset="<?php echo esc_attr($image_srcset); ?>" alt="<?php echo esc_attr($altText); ?>">

                </a>
            <?php else : ?>
                <img src="<?php echo esc_url_raw($attachment_url); ?>" srcset="<?php echo esc_attr($image_srcset); ?>" alt="<?php echo esc_attr($altText); ?>">
            <?php endif; ?>

        <?php

        endif;



        if (!empty($wrapperTag) && $useAsBackground == 'yes') :

        ?>

            <?php if (!empty($featuredImageLinkTo)) : ?>
                <a href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php echo esc_attr($linkAttrStr); ?>>
                    <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>">

                    </<?php echo $wrapperTag; ?>>
                </a>
            <?php else : ?>

                <<?php echo $wrapperTag; ?> class="<?php echo $blockId; ?>">

                </<?php echo $wrapperTag; ?>>
            <?php endif; ?>

        <?php

        endif;


        ?>









<?php return ob_get_clean();
    }
}

$PGBlockImage = new PGBlockImage();
