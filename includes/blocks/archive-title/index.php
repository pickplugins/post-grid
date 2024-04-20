<?php
if (!defined('ABSPATH'))
  exit();



class PGBlocArchiveTitle
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/archive-title/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/archive-title/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/archive-title/block.json',
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

    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {



    global $postGridCssY;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_excerpt = '';
    // $post_date = $the_post->post_date;

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


    $archiveTitle = isset($attributes['archiveTitle']) ? $attributes['archiveTitle'] : [];
    $archiveTitleOptions = isset($archiveTitle['options']) ? $archiveTitle['options'] : [];

    $archiveType = isset($archiveTitleOptions['archiveType']) ? $archiveTitleOptions['archiveType'] : 'auto';
    $customLabel = isset($archiveTitleOptions['customLabel']) ? $archiveTitleOptions['customLabel'] : 'Archive: %s';


    $archiveTitleLinkTarget = isset($archiveTitleOptions['linkTarget']) ? $archiveTitleOptions['linkTarget'] : '_blank';
    $archiveTitleCustomUrl = isset($archiveTitleOptions['customUrl']) ? $archiveTitleOptions['customUrl'] : '';
    $archiveTitleLinkAttr = isset($archiveTitleOptions['linkAttr']) ? $archiveTitleOptions['linkAttr'] : [];
    $archiveTitleTag = isset($archiveTitleOptions['tag']) ? $archiveTitleOptions['tag'] : [];
    $archiveTitleRel = isset($archiveTitleOptions['rel']) ? $archiveTitleOptions['rel'] : '';
    $dateFormat = isset($archiveTitleOptions['dateFormat']) ? $archiveTitleOptions['dateFormat'] : 'y-m-d';
    $archiveTitleLinkTo = isset($archiveTitleOptions['linkTo']) ? $archiveTitleOptions['linkTo'] : '';
    $archiveTitleLinkToMetaKey = isset($archiveTitleOptions['linkToMetaKey']) ? $archiveTitleOptions['linkToMetaKey'] : '';
    $customUrl = isset($archiveTitleOptions['customUrl']) ? $archiveTitleOptions['customUrl'] : '';


    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];

    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


    $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
    $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


    $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';

    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


    $archive_title = '';

    if (function_exists('is_woocommerce') && function_exists('is_shop') && is_woocommerce() && is_shop()) {
      //////var_dump('woocommerce/woocommerce.php');
      $post_id = wc_get_page_id('shop');
      $post_title = get_the_title($post_id);

      $archive_title = $post_title;
    } else if (is_tax()) {
      $queried_object = get_queried_object();
      $term_name = $queried_object->name;
      $archive_title = $term_name;
    } else if (is_category()) {

      $queried_object = get_queried_object();

      $term_name = $queried_object->name;
      $archive_title = $term_name;
    } else if (is_tag()) {
      $current_tag_id = get_query_var('tag_id');
      $current_tag = get_tag($current_tag_id);
      $current_tag_name = $current_tag->name;
      $archive_title = $current_tag_name;
    } else if (is_author()) {
      $archive_title = get_the_author();
    } else if (is_search()) {
      $current_query = sanitize_text_field(get_query_var('s'));

      $archive_title = $current_query;
    } else if (is_year()) {
      $currentArchiveTitle = get_the_archive_title();
      $date = get_the_date($dateFormat);


      $archive_title = !empty($dateFormat) ? $date : $currentArchiveTitle;
    } else if (is_month()) {
      $currentArchiveTitle = get_the_archive_title();
      $date = get_the_date($dateFormat);

      $archive_title = !empty($dateFormat) ? $date : $currentArchiveTitle;
    } else if (is_date()) {

      $currentArchiveTitle = get_the_archive_title();
      $date = get_the_date($dateFormat);
      $archive_title = !empty($dateFormat) ? $date : $currentArchiveTitle;
    } elseif (is_404()) {
    }


    $customLabel = !empty($customLabel) ? $customLabel : '%s';
    $formatedArchiveTitle = sprintf($customLabel, $archive_title);


    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $linkAttrStr = '';



    if (!empty($postExcerptlinkAttr))
      foreach ($postExcerptlinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }


    $linkAttrStrarchiveTitle = '';



    if (!empty($archiveTitleLinkAttr))
      foreach ($archiveTitleLinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStrarchiveTitle .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }





    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

    $linkUrl = '';

    if ($archiveTitleLinkTo == 'postUrl') {

      $linkUrl = get_permalink($post_ID);
    } else if ($archiveTitleLinkTo == 'customField') {

      $linkUrl = get_post_meta($post_ID, $archiveTitleLinkToMetaKey, true);
    } else if ($archiveTitleLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($archiveTitleLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_the_author_link($author_id);
    } else if ($archiveTitleLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($archiveTitleLinkTo == 'customUrl') {
      $linkUrl = $customUrl;
    }


    $obj['id'] = $post_ID;
    $obj['type'] = 'post';

    $wrapperClass = parse_css_class($wrapperClass, $obj);







    ob_start();


    if (!empty($wrapperTag)) :

?>
      <<?php echo esc_html($wrapperTag); ?> class="
                                <?php echo esc_attr($blockId); ?>
                                <?php echo esc_attr($wrapperClass); ?>">


        <?php if ($iconPosition == 'beforePrefix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPrefix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

        <?php if (!empty($archiveTitleLinkTo)) : ?>
          <a class='archiveTitle' <?php echo ($linkAttrStrarchiveTitle); ?> target="<?php echo esc_attr($archiveTitleLinkTarget); ?>" rel="<?php echo esc_attr($archiveTitleRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) : esc_url_raw($post_url); ?>">
            <?php if ($iconPosition == 'beforeArchiveTitle') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($formatedArchiveTitle); ?>
            <?php if ($iconPosition == 'afterArchiveTitle') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>

        <?php else : ?>

          <<?php echo esc_attr($archiveTitleTag); ?> class='archiveTitle' <?php echo ($linkAttrStrarchiveTitle); ?>>
            <?php if ($iconPosition == 'beforeArchiveTitle') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($formatedArchiveTitle); ?>
            <?php if ($iconPosition == 'afterArchiveTitle') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </<?php echo esc_attr($archiveTitleTag); ?>>


        <?php endif; ?>






        <?php if ($iconPosition == 'beforePostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo $postfixClass; ?>">
            <?php echo $postfixText; ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

      </<?php echo esc_html($wrapperTag); ?>>
    <?php

    endif;

    if (empty($wrapperTag)) :

    ?>


      <?php if (!empty($archiveTitleLinkTo)) : ?>

        <a class='<?php echo esc_attr($blockId); ?> archiveTitle' <?php echo ($linkAttrStrarchiveTitle); ?> target="<?php echo esc_attr($archiveTitleLinkTarget); ?>" rel="<?php echo esc_attr($archiveTitleRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) : esc_url_raw($post_url); ?>">

          <?php if ($iconPosition == 'beforePrefix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if ($prefixText) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo $prefixText; ?>
            </span>
          <?php endif; ?>

          <?php if ($iconPosition == 'afterPrefix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>


          <?php if ($iconPosition == 'beforeArchiveTitle') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($formatedArchiveTitle); ?>C
          <?php if ($iconPosition == 'afterArchiveTitle') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>

          <?php if ($iconPosition == 'beforePostfix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if ($postfixText) : ?>
            <<?php echo esc_attr($archiveTitleTag); ?> class="<?php echo $postfixClass; ?>">
              <?php echo $postfixText; ?>
            </<?php echo esc_attr($archiveTitleTag); ?>>
          <?php endif; ?>
          <?php if ($iconPosition == 'afterPostfix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        </a>
      <?php else : ?>

        <<?php echo esc_attr($archiveTitleTag); ?> class='<?php echo esc_attr($blockId); ?> archiveTitle'>

          <?php if ($iconPosition == 'beforePrefix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if ($prefixText) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo $prefixText; ?>
            </span>
          <?php endif; ?>

          <?php if ($iconPosition == 'afterPrefix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>


          <?php if ($iconPosition == 'beforeArchiveTitle') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($formatedArchiveTitle); ?>C
          <?php if ($iconPosition == 'afterArchiveTitle') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>

          <?php if ($iconPosition == 'beforePostfix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if ($postfixText) : ?>
            <<?php echo esc_attr($archiveTitleTag); ?> class="<?php echo $postfixClass; ?>">
              <?php echo $postfixText; ?>
            </<?php echo esc_attr($archiveTitleTag); ?>>
          <?php endif; ?>
          <?php if ($iconPosition == 'afterPostfix') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>

        </<?php echo esc_attr($archiveTitleTag); ?>>

      <?php endif; ?>




    <?php

    endif;

    ?>









<?php return ob_get_clean();
  }
}


$PGBlocArchiveTitle = new PGBlocArchiveTitle();
