<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostTaxonomies
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/post-taxonomies/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/post-taxonomies/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/post-taxonomies/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }

  function front_script($attributes) {}
  function front_style($attributes) {}

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

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


    $taxonomies = isset($attributes['taxonomies']) ? $attributes['taxonomies'] : [];
    $taxonomiesOptions = isset($taxonomies['options']) ? $taxonomies['options'] : [];

    $taxName = isset($taxonomiesOptions['taxName']) ? $taxonomiesOptions['taxName'] : '';


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


    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';

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



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];





    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



    $fontIconHtml = !empty($iconSrc) ? '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>' : '';


    $linkAttrStr = '';



    if (!empty($itemsLinkAttr))
      foreach ($itemsLinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }

    $taxonomy = $taxName;

    $terms = get_the_terms($post_ID, $taxonomy);




    $termsCount = (is_array($terms)) ? count($terms) : 0;

    $maxCount = ($termsCount > $itemsMaxCount) ? $itemsMaxCount : $termsCount;
    $maxCount = (empty($maxCount)) ? $termsCount : $maxCount;

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);

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
      <?php echo $blockId; ?>
      <?php echo esc_attr($wrapperClass); ?>">

      <?php if ($iconPosition == 'beforeFronttext') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

      <?php if (!empty($frontTexttext)) : ?>
        <span class='frontText '>
          <?php echo $frontTexttext; ?>
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
      if (!empty($terms))
        foreach ($terms as $term) {

          $term_id = $term->term_id;
          $term_post_count = $term->count;


          if ($itemsLinkTo == 'postUrl') {

            $linkUrl = get_permalink($post_ID);
          } else if ($itemsLinkTo == 'termUrl') {
            $linkUrl = get_term_link($term_id);
          } else if ($itemsLinkTo == 'customField') {
            $linkUrl = get_post_meta($post_ID, $itemsLinkToCustomMeta, true);
          } else if ($itemsLinkTo == 'authorUrl') {
            $author_id = get_post_field('post_author', $post_ID);
            $user = get_user_by('ID', $author_id);
            $linkUrl = $user->user_url;
          } else if ($itemsLinkTo == 'authorLink') {
            $author_id = get_post_field('post_author', $post_ID);
            $linkUrl = get_author_posts_url($author_id);
          } else if ($itemsLinkTo == 'homeUrl') {
            $linkUrl = get_bloginfo('url');
          } else if ($itemsLinkTo == 'custom') {
            $linkUrl = $itemsCustomUrl;
          }

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

          if ($i > $maxCount)
            break;

          /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
      ?>
        <?php if (!empty($itemsLinkTo)) : ?>
          <a href="<?php echo esc_url_raw($linkUrl); ?>" <?php echo ($linkAttrStr); ?> target="<?php echo esc_attr($itemsLinkTarget); ?>" class="<?php echo esc_attr($itemsClass); ?>">

            <?php if ($iconPosition == 'beforeItem') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($itemsPrefix)) : ?>
              <span class='prefix'>
                <?php echo wp_kses_post($itemsPrefix); ?>
              </span>

            <?php endif; ?>

            <span class='termTitle'>
              <?php echo wp_kses_post($term->name); ?>
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



            <?php if ($iconPosition == 'afterItem') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
        <?php else : ?>
          <span <?php echo ($linkAttrStr); ?> class="<?php echo esc_attr($itemsClass); ?>">

            <?php if ($iconPosition == 'beforeItem') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($itemsPrefix)) : ?>
              <span class='prefix'>
                <?php echo wp_kses_post($itemsPrefix); ?>
              </span>

            <?php endif; ?>

            <span class='termTitle'>
              <?php echo wp_kses_post($term->name); ?>
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



            <?php if ($iconPosition == 'afterItem') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </span>
        <?php endif; ?>


        <?php if ($maxCount > $i) : ?>
          <?php if (!empty($separatorText)) : ?>
            <span className='separator'>
              <?php echo esc_html($separatorText); ?>
            </span>
          <?php endif; ?>
        <?php endif; ?>

      <?php
          $i++;
        }

      ?>

      <?php if ($iconPosition == 'afterItems') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

    </<?php echo pg_tag_escape($wrapperTag); ?>>











<?php return ob_get_clean();
  }
}

$PGBlockPostTaxonomies = new PGBlockPostTaxonomies();
