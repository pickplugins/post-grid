<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostAuthorields
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-author-fields/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-author-fields/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/post-author-fields/block.json',
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
    $post_data = get_post($post_ID);

    $post_url = get_the_permalink($post_ID);
    $post_author_id = $post_data->post_author;
    //$author_data = get_user_by('ID', $post_author_id);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $metaKey = isset($attributes['metaKey']) ? $attributes['metaKey'] : '';


    $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
    $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];

    $frontTextText = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : '';
    $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';



    $field = isset($attributes['field']) ? $attributes['field'] : [];
    $fieldOptions = isset($field['options']) ? $field['options'] : [];

    $fieldIsLink = isset($fieldOptions['isLink']) ? $fieldOptions['isLink'] : false;
    $fieldLinkTo = isset($fieldOptions['linkTo']) ? $fieldOptions['linkTo'] : '';
    $fieldLinkToMeta = isset($fieldOptions['linkToMeta']) ? $fieldOptions['linkToMeta'] : '';

    $fieldLinkTarget = isset($fieldOptions['linkTarget']) ? $fieldOptions['linkTarget'] : '';
    $fieldAvatarSize = isset($fieldOptions['avatarSize']) ? $fieldOptions['avatarSize'] : '';
    $fieldDateFormat = isset($fieldOptions['dateFormat']) ? $fieldOptions['dateFormat'] : '';
    $fieldCustomUrl = isset($fieldOptions['customUrl']) ? $fieldOptions['customUrl'] : '';
    $fieldPrefix = isset($fieldOptions['prefix']) ? $fieldOptions['prefix'] : '';
    $fieldPrefix = isset($fieldOptions['prefix']) ? $fieldOptions['prefix'] : '';
    $fieldlinkAttr = isset($fieldOptions['linkAttr']) ? $fieldOptions['linkAttr'] : '';


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
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : '';
    $prefixPosition = isset($prefixOptions['position']) ? $prefixOptions['position'] : '';

    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';
    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : '';
    $postfixPosition = isset($postfixOptions['position']) ? $postfixOptions['position'] : '';



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];



    //
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

    $fieldLink = '';

    if ($fieldLinkTo == 'postUrl') {
      $fieldLink = get_permalink($post_ID);
    } else if ($fieldLinkTo == 'homeUrl') {
      $fieldLink = get_home_url();
    } else if ($fieldLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $post_author_id);

      $fieldLink = $user->user_url;
    } else if ($fieldLinkTo == 'authorMail') {
      $user = get_user_by('ID', $post_author_id);

      $fieldLink = $user->user_email;
    } else if ($fieldLinkTo == 'authorLink') {
      $fieldLink = get_author_posts_url($post_author_id);
    } else if ($fieldLinkTo == 'customUrl') {

      $fieldLink = $fieldCustomUrl;
    } else if ($fieldLinkTo == 'authorMeta') {
      $fieldLink = get_user_meta($post_author_id, $fieldLinkToMeta, true);
    }


    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';



    $linkAttrStr = '';



    if (!empty($itemsLinkAttr))
      foreach ($itemsLinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';

    $wrapperClass = parse_css_class($wrapperClass, $obj);
    $prefixText = parse_css_class($prefixText, $obj);
    $postfixText = parse_css_class($postfixText, $obj);


    ob_start();


    ?>


    <<?php echo esc_attr($wrapperTag); ?> class="
      <?php echo $blockId; ?>
      <?php echo esc_attr($wrapperClass); ?>">

      <?php if ($iconPosition == 'beforeFronttext'): ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>


      <?php if (!empty($frontTextText)): ?>
        <span class='frontText'>
          <?php echo wp_kses_post($frontTextText); ?>
        </span>
      <?php endif; ?>

      <?php if ($iconPosition == 'afterFronttext'): ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

      <?php if ($iconPosition == 'beforeField'): ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

      <?php if (!empty($fieldLink)): ?>
        <a <?php if ($fieldLinkTo == 'authorMail'): ?> href="<?php echo esc_url_raw('mailto:' . $fieldLink); ?>" <?php else: ?>
            href="<?php echo esc_url_raw($fieldLink); ?>" <?php endif; ?>>
        <?php endif; ?>

        <?php

        if ($metaKey == 'id' || $metaKey == 'login' || $metaKey == 'nickname' || $metaKey == 'url' || $metaKey == 'registered' || $metaKey == 'display_name' || $metaKey == 'display_name' || $metaKey == 'last_name' || $metaKey == 'description' || $metaKey == 'display_name'):
          ?>
          <span class="fieldVal">
            <?php echo wp_kses_post(get_the_author_meta($metaKey, $post_author_id)) ?>
          </span>
          <?php
        elseif ($metaKey == 'avatar'):
          ?>
          <img class="fieldVal" src="<?php echo esc_url_raw(get_avatar_url($post_author_id, ['size' => $fieldAvatarSize])) ?>"
            alt=" <?php echo esc_attr(get_the_author_meta('display_name', $post_author_id)) ?> " />

          <?php
        endif;

        ?>

        <?php if (!empty($fieldLink)): ?>
        </a>
      <?php endif; ?>
      <?php if ($iconPosition == 'afterField'): ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
    </<?php echo esc_attr($wrapperTag); ?>>











    <?php return ob_get_clean();
  }
}

$PGBlockPostAuthorields = new PGBlockPostAuthorields();