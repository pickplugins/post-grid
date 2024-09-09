<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockTermsList
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {



    register_block_type(
      post_grid_plugin_dir . 'build/blocks/terms-list/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }





  function addUTMTracking($link, $utmTracking)
  {

    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';



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


    $link = add_query_arg($utmValue, $link);



    return $link;
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {






    global $postGridCssY;

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';



    $items = isset($attributes['items']) ? $attributes['items'] : [];
    $itemsOptions = isset($items['options']) ? $items['options'] : [];
    $itemsLinkTo = isset($itemsOptions['linkTo']) ? $itemsOptions['linkTo'] : '';
    $itemsLinkToAuthorMeta = isset($itemsOptions['linkToAuthorMeta']) ? $itemsOptions['linkToAuthorMeta'] : '';
    $itemsCustomUrl = isset($itemsOptions['customUrl']) ? $itemsOptions['customUrl'] : '';
    $itemsLinkToCustomMeta = isset($itemsOptions['linkToCustomMeta']) ? $itemsOptions['linkToCustomMeta'] : '';


    $itemsPrefix = isset($itemsOptions['prefix']) ? $itemsOptions['prefix'] : '';
    $itemsPostfix = isset($itemsOptions['postfix']) ? $itemsOptions['postfix'] : '';
    $itemsMaxCount = isset($itemsOptions['maxCount']) ? (int) $itemsOptions['maxCount'] : 99;
    $itemsPostCount = isset($itemsOptions['postCount']) ? $itemsOptions['postCount'] : true;
    $itemsClass = isset($itemsOptions['class']) ? $itemsOptions['class'] : '';
    $itemsLinkTarget = isset($itemsOptions['linkTarget']) ? $itemsOptions['linkTarget'] : '';
    $itemsLinkAttr = isset($itemsOptions['linkAttr']) ? $itemsOptions['linkAttr'] : [];

    $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
    $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];

    $frontTexttext = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : __('Categories:', 'post-grid');
    $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';


    $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];
    $queryItems = isset($queryArgs['items']) ? $queryArgs['items'] : [];

    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';





    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];

    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


    $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
    $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

    $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
    $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';
    $separatorPosition = isset($separatorOptions['position']) ? $separatorOptions['position'] : '';



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];






    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



    $fontIconHtml = !empty($iconSrc) ? '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>' : '';



    $linkAttrStr = '';



    if (!empty($itemsLinkAttr))
      foreach ($itemsLinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }

    $taxonomy = 'category';
    $query_args = post_grid_parse_query_terms(isset($queryArgs['items']) ? $queryArgs['items'] : []);

    $term_ID = isset($block->context['term_id']) ? $block->context['term_id'] : '';
    $post_parent_value = isset($query_args['parent']) ? $query_args['parent'] : '';
    $post_taxonomy_value = isset($query_args['taxonomy']) ? $query_args['taxonomy'] : '';

    if ($post_parent_value == '{ID}') {
      // $post_id = get_the_id();
      $parent_id = wp_get_term_taxonomy_parent_id($term_ID, $post_taxonomy_value);
      $query_args['parent'] = $parent_id;
    }

    // $query_args['post_parent'] = $parent_id;

    $terms = get_terms($query_args);
    $termsX = [];

    foreach ($terms as $term) :

      if (is_wp_error($term)) {
        continue;
      }


      $term_id = isset($term->term_id) ? $term->term_id : "";
      $term_taxonomy = isset($term->taxonomy) ? $term->taxonomy : "";


      $term_link = get_term_link($term_id, $term_taxonomy);


      if ($utmTrackingEnable) {

        // UTM tracking
        $term_link = $this->addUTMTracking($term_link, $utmTracking);
      }

      if (gettype($term) == "array") {

        $term['link'] = $term_link;
      } else {

        $term->link = $term_link;
      }


      $termsX[] = $term;




    endforeach;






    $termsCount = (is_array($terms)) ? count($terms) : 0;

    $maxCount = ($termsCount > $itemsMaxCount) ? $itemsMaxCount : $termsCount;
    $maxCount = (empty($maxCount)) ? $termsCount : $maxCount;






    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = post_grid_parse_css_class($wrapperClass, $obj);


    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);



      if (!$isVisible) return;
    }

    // //* Visible condition

    ob_start();


    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }






?>


    <<?php echo pg_tag_escape($wrapperTag); ?> class="
                                        <?php echo esc_attr($blockId); ?>
                                        <?php echo esc_attr($wrapperClass); ?>">

      <?php if ($iconPosition == 'beforeFronttext') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

      <?php if (!empty($frontTexttext)) : ?>
        <span class='frontText '>
          <?php echo esc_attr($frontTexttext); ?>
        </span>
      <?php endif; ?>


      <?php if ($iconPosition == 'afterFronttext') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>


      <?php if ($iconPosition == 'beforeItems') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

      <?php

      $i = 1;
      if (!empty($termsX))

        foreach ($termsX as $term) {


          $term_id = isset($term->term_id) ? $term->term_id : "";

          $term_post_count = isset($term->count) ? $term->count : "";
          $term_link = isset($term->link) ? $term->link : "";
          $linkUrl = $term_link;



          // if ($itemsLinkTo == 'postUrl') {

          //   $linkUrl = get_permalink($post_ID);
          // } else if ($itemsLinkTo == 'termUrl') {
          //   $linkUrl = get_term_link($term_id);
          // } else if ($itemsLinkTo == 'customField') {
          //   $linkUrl = get_post_meta($post_ID, $itemsLinkToCustomMeta, true);
          // } else if ($itemsLinkTo == 'authorUrl') {
          //   $author_id = get_post_field('post_author', $post_ID);
          //   $user = get_user_by('ID', $author_id);
          //   $linkUrl = $user->user_url;
          // } else if ($itemsLinkTo == 'authorLink') {
          //   $author_id = get_post_field('post_author', $post_ID);
          //   $linkUrl = get_author_posts_url($author_id);
          // } else if ($itemsLinkTo == 'homeUrl') {
          //   $linkUrl = get_bloginfo('url');
          // } else if ($itemsLinkTo == 'custom') {
          //   $linkUrl = $itemsCustomUrl;
          // }


          // if ($i > $maxCount)
          //   break;

          /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
      ?>

        <?php if (!empty($itemsLinkTo)) : ?>

          <a href="<?php echo esc_url_raw($linkUrl); ?>" target="<?php echo esc_attr($itemsLinkTarget); ?>" class="<?php echo esc_attr($itemsClass); ?> ">

            <?php if ($iconPosition == 'beforeLabel') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($itemsPrefix)) : ?>
              <span class='prefix'>
                <?php echo wp_kses_post($itemsPrefix); ?>
              </span>

            <?php endif; ?>

            <span class='termTitle'>
              <?php echo isset($term->name) ? wp_kses_post($term->name) : ''; ?>
            </span>
            <?php if ($itemsPostCount) : ?>
              <span class='postCount'>
                <?php echo wp_kses_post($term_post_count); ?>
              </span>
            <?php endif; ?>



            <?php if (!empty($itemsPostfix)) : ?>
              <span class='postfix'>
                <?php echo wp_kses_post($itemsPostfix); ?>
              </span>

            <?php endif; ?>

            <?php if ($iconPosition == 'afterLabel') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($maxCount > $i && !empty($separatorText) && ($separatorPosition == "afterTermTitle")) : ?>
              <span class='separator'>
                <?php echo esc_html($separatorText); ?>
              </span>
            <?php endif; ?>
          </a>
        <?php else : ?>

          <span <?php //echo ($linkAttrStr); 
                ?> class="<?php echo esc_attr($itemsClass); ?>">

            <?php if ($iconPosition == 'beforeLabel') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($itemsPrefix)) : ?>
              <span class='prefix'>
                <?php echo wp_kses_post($itemsPrefix); ?>
              </span>

            <?php endif; ?>

            <span class='termTitle'>
              <?php echo isset($term->name) ? wp_kses_post($term->name) : ''; ?>
            </span>
            <?php if ($itemsPostCount) : ?>
              <span class='postCount'>
                <?php echo wp_kses_post($term_post_count); ?>
              </span>
            <?php endif; ?>

            <?php if (!empty($itemsPostfix)) : ?>
              <span class='postfix'>
                <?php echo wp_kses_post($itemsPostfix); ?>
              </span>

            <?php endif; ?>

            <?php if ($iconPosition == 'afterLabel') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($maxCount > $i && !empty($separatorText) && ($separatorPosition == "afterTermTitle")) : ?>
              <span class='separator'>
                <?php echo esc_html($separatorText); ?>
              </span>
            <?php endif; ?>
          </span>
        <?php endif; ?>


        <?php if ($maxCount > $i && !empty($separatorText) && ($separatorPosition == "afterItem")) : ?>
          <span class='separator'>
            <?php echo esc_html($separatorText); ?>
          </span>
        <?php endif; ?>
      <?php
          $i++;
        }

      ?>

      <?php if ($iconPosition == 'afterItems') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>


    </<?php echo pg_tag_escape($wrapperTag); ?>>











<?php

    return ob_get_clean();
  }
}

$PGBlockTermsList = new PGBlockTermsList();
