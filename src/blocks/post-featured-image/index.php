<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockFeaturedImage
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-featured-image/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-featured-image/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/post-featured-image/block.json',
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


    global $postGridCss;

    global $postGridCssY;

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $useAsBackground = isset($wrapperOptions['useAsBackground']) ? $wrapperOptions['useAsBackground'] : 'no';

    // $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : '';


    $featuredImage = isset($attributes['featuredImage']) ? $attributes['featuredImage'] : [];
    $featuredImageOptions = isset($featuredImage['options']) ? $featuredImage['options'] : [];

    $featuredImageLinkTo = isset($featuredImageOptions['linkTo']) ? $featuredImageOptions['linkTo'] : '';
    $featuredImageLinkToMetaKey = isset($featuredImageOptions['linkToMetaKey']) ? $featuredImageOptions['linkToMetaKey'] : '';

    $featuredImageAltTextSrc = isset($featuredImageOptions['altTextSrc']) ? $featuredImageOptions['altTextSrc'] : 'imgAltText';
    $featuredImageTitleTextSrc = isset($featuredImageOptions['titleTextSrc']) ? $featuredImageOptions['titleTextSrc'] : 'imgTitle';

    $featuredImageAltTextCustom = isset($featuredImageOptions['altTextCustom']) ? $featuredImageOptions['altTextCustom'] : '';
    $featuredImageAltTextMetaKey = isset($featuredImageOptions['altTextMetaKey']) ? $featuredImageOptions['altTextMetaKey'] : '';

    $featuredImageIsLink = isset($featuredImageOptions['isLink']) ? $featuredImageOptions['isLink'] : true;
    $linkTarget = isset($featuredImageOptions['linkTarget']) ? $featuredImageOptions['linkTarget'] : '_blank';
    $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';


    $linkAttr = isset($featuredImageOptions['linkAttr']) ? $featuredImageOptions['linkAttr'] : [];
    $rel = isset($featuredImageOptions['rel']) ? $featuredImageOptions['rel'] : '';
    $size = isset($featuredImageOptions['size']['Desktop']) ? $featuredImageOptions['size']['Desktop'] : 'full';

  $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
  $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
  $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
  $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
  $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
  $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
  $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
  $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';


    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];


    $postGridCssY[] = $blockCssY['items'];






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

    $linkUrl = "";

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
      $linkUrl = get_bloginfo('url');
    } else if ($featuredImageLinkTo == 'custom') {
      $linkUrl = $customUrl;
    }

    $altText = '';

    if ($featuredImageAltTextSrc == 'imgAltText') {

      $altText = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
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



    $titleText = '';

    if ($featuredImageTitleTextSrc == 'imgAltText') {

      $titleText = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
    } else if ($featuredImageTitleTextSrc == 'imgCaption') {

      $titleText = $attachment_post->post_excerpt;
    } else if ($featuredImageTitleTextSrc == 'imgDescription') {
      $titleText = $attachment_post->post_content;
    } else if ($featuredImageTitleTextSrc == 'imgTitle') {
      $titleText = get_the_title($thumb_id);
    } else if ($featuredImageTitleTextSrc == 'imgSlug') {
      $titleText = get_post_field('post_name', $post_ID);
    } else if ($featuredImageTitleTextSrc == 'postTitle') {
      $titleText = get_the_title($post_ID);
    } else if ($featuredImageTitleTextSrc == 'excerpt') {
      $titleText = get_the_excerpt($post_ID);
    } else if ($featuredImageTitleTextSrc == 'postSlug') {
      $titleText = get_the_excerpt($post_ID);
    } else if ($featuredImageTitleTextSrc == 'customField') {
      $titleText = get_post_meta($post_ID, $featuredImageAltTextMetaKey, true);
    } else if ($featuredImageTitleTextSrc == 'custom') {
      $titleText = $featuredImageAltTextCustom;
    }


    $obj['id'] = $post_ID;
    $obj['type'] = 'post';




    if (!empty($featuredImageLinkTo)) {
      if ($utmTrackingEnable == true) {
        $utmValue = [];

        if (!empty($utmTrackingID))
          $utmValue['utm_id'] = $utmTrackingID;
        if (!empty($utmTrackingSource))
          $utmValue['utm_source'] = $utmTrackingSource;
        if (!empty($utmTrackingMedium))
          $utmValue['utm_medium'] = $utmTrackingMedium;
        if (!empty($utmTrackingCampaign))
          $utmValue['utm_campaign'] = $utmTrackingCampaign;
        if (!empty($utmTrackingTerm))
          $utmValue['utm_term'] = $utmTrackingTerm;
        if (!empty($utmTrackingContent))
          $utmValue['utm_content'] = $utmTrackingContent;

        $utmUrl = add_query_arg($utmValue, $linkUrl);

        $linkUrl = $utmUrl;
      }
    }




    $wrapperClass = parse_css_class($wrapperClass, $obj);


    ob_start();



    if (!empty($wrapperTag) && $useAsBackground == 'no') :

?>
      <<?php echo esc_attr($wrapperTag); ?> class="
                                                    <?php echo esc_attr($blockId); ?>
                                                    <?php echo esc_attr($wrapperClass); ?>">
        <?php if (!empty($featuredImageLinkTo)) : ?>
          <a href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) : esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>">

            <img <?php echo esc_attr($linkAttrStr); ?> srcset="<?php echo esc_attr($image_srcset); ?>" src="<?php echo esc_url_raw($image_src_url); ?>" width="<?php echo esc_attr($image_src_w); ?>" height="<?php echo esc_attr($image_src_h); ?>" alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />

          </a>
        <?php else : ?>
          <img <?php echo esc_attr($linkAttrStr); ?> srcset="<?php echo esc_attr($image_srcset); ?>" src="<?php echo esc_url_raw($image_src_url); ?>" width="<?php echo esc_attr($image_src_w); ?>" height="<?php echo esc_attr($image_src_h); ?>" alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />

        <?php endif; ?>
      </<?php echo esc_attr($wrapperTag); ?>>
    <?php

    endif;

    if (empty($wrapperTag) && $useAsBackground == 'no') :
    ?>
      <?php if (!empty($featuredImageLinkTo)) : ?>
        <a class="<?php echo esc_attr($blockId); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) : esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>">
          <img <?php echo esc_attr($linkAttrStr); ?> src="<?php echo esc_url_raw($attachment_url); ?>" alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
        </a>
      <?php else : ?>
        <img <?php echo esc_attr($linkAttrStr); ?> src="<?php echo esc_url_raw($attachment_url); ?>" alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
      <?php endif; ?>
    <?php

    endif;


    if (!empty($wrapperTag) && $useAsBackground == 'yes') :
    ?>
      <?php if (!empty($featuredImageLinkTo)) : ?>
        <a href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) : esc_url_raw($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>">
          <<?php echo esc_attr($wrapperTag); ?> class="
                                                                        <?php echo esc_attr($blockId); ?>" style="background-image: url(<?php echo esc_url_raw($attachment_url) ?>)">
          </<?php echo esc_attr($wrapperTag); ?>>
        </a>
      <?php else : ?>

        <<?php echo esc_attr($wrapperTag); ?> class="
                                                                    <?php echo esc_attr($blockId); ?>" style="background-image: url(<?php echo esc_url_raw($attachment_url) ?>)">

        </<?php echo esc_attr($wrapperTag); ?>>
      <?php endif; ?>

    <?php

    endif;


    ?>









<?php return ob_get_clean();
  }
}

$PGBlockFeaturedImage = new PGBlockFeaturedImage();
