<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockTermsQueryItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/terms-query-item/block.json',
      array(
        'title' => "Terms Field",

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }

  function front_scripts($attributes)
  {
    // wp_register_script('pg-text', post_grid_plugin_url . 'includes/blocks/text/front-scripts.js', [], '', true);

    //     if (has_block('post-grid/text')) {

    //         wp_enqueue_script('pg-text');
    //     }
  }
  function front_style($attributes)
  {
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {



    global $postGridCssY;


    require_once ABSPATH . 'wp-admin/includes/file.php';

    $text = '';
    $term_ID = isset($block->context['term_id']) ? $block->context['term_id'] : '';
    $taxonomy = isset($block->context['taxonomy']) ? $block->context['taxonomy'] : 'category';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';





    $termField = isset($attributes['termField']) ? $attributes['termField'] : [];
    $termFieldOptions = isset($termField['options']) ? $termField['options'] : [];
    $termFieldTag = isset($termFieldOptions['tag']) ? $termFieldOptions['tag'] : [];
    $termFieldField = isset($termFieldOptions['field']) ? $termFieldOptions['field'] : '';
    $termFieldMetaKey = isset($termFieldOptions['metaKey']) ? $termFieldOptions['metaKey'] : '';
    $termFieldMetaKeyType = isset($termFieldOptions['metaKeyType']) ? $termFieldOptions['metaKeyType'] : '';
    $termFieldLimitBy = isset($termFieldOptions['limitBy']) ? $termFieldOptions['limitBy'] : '';
    $termFieldLimitCount = isset($termFieldOptions['limitCount']) ? $termFieldOptions['limitCount'] : '';
    $termFieldIsLink = isset($termFieldOptions['isLink']) ? $termFieldOptions['isLink'] : '';
    $termFieldLinkTo = isset($termFieldOptions['linkTo']) ? $termFieldOptions['linkTo'] : '';
    $termFieldLinkToAuthorMeta = isset($termFieldOptions['linkToAuthorMeta']) ? $termFieldOptions['linkToAuthorMeta'] : '';
    $termFieldLinkToCustomMeta = isset($termFieldOptions['linkToCustomMeta']) ? $termFieldOptions['linkToCustomMeta'] : '';
    $termFieldLinkTarget = isset($termFieldOptions['linkTarget']) ? $termFieldOptions['linkTarget'] : '';
    $termFieldLinkAttr = isset($termFieldOptions['linkAttr']) ? $termFieldOptions['linkAttr'] : [];
    $termFieldCustomUrl = isset($termFieldOptions['customUrl']) ? $termFieldOptions['customUrl'] : '';
    $termFieldClass = isset($termFieldOptions['class']) ? $termFieldOptions['class'] : '';



    $prefix = isset($attributes["prefix"]) ? $attributes["prefix"] : "";
    $prefixOptions = isset($prefix["options"]) ? $prefix["options"] : "";

    $prefixText = isset($prefixOptions["text"])
      ? _wp_specialchars($prefixOptions["text"])
      : "";
    $prefixClass = isset($prefixOptions["class"])
      ? $prefixOptions["class"]
      : "";
    $prefixPosition = isset($prefixOptions["position"])
      ? $prefixOptions["position"]
      : "";

    $postfix = isset($attributes["postfix"]) ? $attributes["postfix"] : "";
    $postfixOptions = isset($postfix["options"]) ? $postfix["options"] : "";
    $postfixText = isset($postfixOptions["text"])
      ? _wp_specialchars($postfixOptions["text"])
      : "";
    $postfixClass = isset($postfixOptions["class"])
      ? $postfixOptions["class"]
      : "";
    $postfixPosition = isset($postfixOptions["position"])
      ? $postfixOptions["position"]
      : "";


    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';

    $other = isset($attributes['other']) ? $attributes['other'] : [];
    $otherOptions = isset($other['options']) ? $other['options'] : [];
    $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : [];

    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $wrapperId = isset($wrapperOptions['id']) ? $wrapperOptions['id'] : '';

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';




    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


    // $fieldValue = get_term($term_ID);
    $term = get_term($term_ID, $taxonomy);



    $fieldValue = "";

    if (!is_wp_error($term)) {

      if ($termFieldField == "name") {
        $fieldValue = $term->name;
      }
      if ($termFieldField == "description") {
        $fieldValue = $term->description;
      }
      if ($termFieldField == "slug") {
        $fieldValue = $term->slug;
      }


      if ($termFieldField == "termId") {
        $fieldValue = $term->id;
      }
      if ($termFieldField == "count") {
        $fieldValue = $term->count;
      }
      if ($termFieldField == "meta") {
        // $fieldValue = $term->name;
        if ($termFieldMetaKeyType == 'ID') {

          $thumb_id = get_term_meta($term_ID, $termFieldMetaKey, true);
          //echo '<pre>' . //var_export($thumb_id, true) . '</pre>';
          // $term_vals = get_term_meta(17);

          // var_dump($term_vals);
          // var_dump($term_ID);
          // var_dump($termFieldMetaKey);
          // var_dump($thumb_id);
          $fieldValue = wp_get_attachment_image_url($thumb_id, 'full');
          $attachment_post = get_post($thumb_id);

          $image_srcset = wp_get_attachment_image_srcset($thumb_id);
        } else {
          $fieldValue = get_term_meta($term_ID, $termFieldMetaKey, true);
        }
        // $fieldValue = get_term_meta($term_ID, $termFieldMetaKey);
      }
    }
    // //var_dump($term_ID);
    // //var_dump($taxonomy);
    // //var_dump($termFieldField);
    // //var_dump($termFieldLinkTo);
    // //var_dump($fieldValue);
    // //var_dump(get_term_link($term_ID, $taxonomy));
    // $urlX = get_term_link($term_ID, $taxonomy);
    // //var_dump($urlX);


    // var_dump($term_ID);
    // var_dump($fieldValue);
    // // var_dump($image_srcset);
    // // var_dump($termFieldField);
    // var_dump($termFieldMetaKey);
    // var_dump($termFieldMetaKeyType);


    $post_url = "";
    if ($termFieldLinkTo == 'termUrl') {
      // $post_url = "$urlX";
    } elseif ($termFieldLinkTo == 'homeUrl') {
      $post_url = get_home_url();
    } elseif ($termFieldLinkTo == 'customUrl') {
      $post_url = $termFieldCustomUrl;
    }


    // //var_dump($prefixPosition);
    // //var_dump($termFieldLinkTo);


    ////var_dump($term_ID);



    $obj["id"] = $term_ID;
    $obj["type"] = "post";

    $wrapperClass = parse_css_class($wrapperClass, $obj);
    $fieldValue = parse_css_class($fieldValue, $obj);
    $prefixText = parse_css_class($prefixText, $obj);
    $postfixText = parse_css_class($postfixText, $obj);


  // //* Visible condition
  $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
  if (!empty($visible['rules'])) {
    $isVisible = post_grid_visible_parse($visible);

    // var_dump($isVisible);

    if (!$isVisible) return;
  }

    // //* Visible condition

    ob_start();



?>

<?php if (!empty($wrapperTag)) : ?>

<<?php echo tag_escape($wrapperTag); ?> class="
        <?php echo esc_attr($blockId); ?>
        <?php echo esc_attr($wrapperClass); ?>">
  <?php if (!empty($prefixText)  && ($prefixPosition == "afterbegin")) : ?>
  <span class="<?php echo esc_attr($prefixClass); ?>">
    <?php echo wp_kses_post($prefixText); ?>
  </span>
  <?php endif; ?>



  <?php if ($termFieldIsLink) : ?>
  <a class="<?php echo esc_attr($termFieldClass); ?>" href="<?php echo esc_url_raw($post_url); ?>"
    target="<?php echo esc_attr($termFieldLinkTarget); ?>">
    <?php if (!empty($prefixText)  && ($prefixPosition == "beforebegin")) : ?>
    <span class="<?php echo esc_attr($prefixClass); ?>">
      <?php echo wp_kses_post($prefixText); ?>
    </span>
    <?php endif; ?>


    <?php
            if (!empty($fieldValue)) {
              if (preg_match('(.jpg|.png|.jpeg)', $fieldValue) === 1) {
                echo '<img src="' . $fieldValue . '" alt="' . $fieldValue . '" />';
              } else {
                echo wp_kses_post($fieldValue);
              }
            } ?>

    <?php if (!empty($postfixText) && ($postfixPosition == "afterend")) : ?>
    <span class="<?php echo esc_attr($postfixClass); ?>">
      <?php echo wp_kses_post($postfixText); ?>
    </span>
    <?php endif; ?>
  </a>


  <?php else : ?>
  <?php if (!empty($fieldValue)) {
            if (preg_match('(.jpg|.png|.jpeg)', $fieldValue) === 1) {
              echo '<img src="' . $fieldValue . '" alt="' . $fieldValue . '" />';
            } else {

              echo wp_kses_post($fieldValue);
            }
          } ?>
  <?php endif; ?>

  <?php if (!empty($postfixText) && ($postfixPosition == "beforeend")) : ?>
  <span class="<?php echo esc_attr($postfixClass); ?>">
    <?php echo wp_kses_post($postfixText); ?>
  </span>
  <?php endif; ?>





</<?php echo tag_escape($wrapperTag); ?>>

<?php elseif (empty($wrapperTag)) : ?>




<?php if (!empty($prefixText)  && ($prefixPosition == "afterbegin")) : ?>
<span class="<?php echo esc_attr($prefixClass); ?>">
  <?php echo wp_kses_post($prefixText); ?>
</span>
<?php endif; ?>
<?php if ($termFieldIsLink) : ?>
<a class="<?php echo esc_attr($termFieldClass); ?>" href="<?php echo esc_url_raw($post_url); ?>"
  target="<?php echo esc_attr($termFieldLinkTarget); ?>" <?php echo $termFieldLinkAttr; ?>>
  <?php if (!empty($prefixText)  && ($prefixPosition == "afterbegin")) : ?>
  <span class="<?php echo esc_attr($prefixClass); ?>">
    <?php echo wp_kses_post($prefixText); ?>
  </span>
  <?php endif; ?>
  <?php if (!empty($fieldValue)) {
            if (preg_match('(.jpg|.png|.jpeg)', $fieldValue) === 1) {
              echo '<img src="' . $fieldValue . '" alt="' . $fieldValue . '" />';
            } else {

              echo wp_kses_post($fieldValue);
            }
          } ?>
  <?php if (!empty($postfixText) && ($postfixPosition == "afterend")) : ?>
  <span class="<?php echo esc_attr($postfixClass); ?>">
    <?php echo wp_kses_post($postfixText); ?>
  </span>
  <?php endif; ?>
</a>



<?php else : ?>

<?php if (!empty($fieldValue)) {
          if (preg_match('(.jpg|.png|.jpeg)', $fieldValue) === 1) {
            echo '<img src="' . $fieldValue . '" alt="' . $fieldValue . '" />';
          } else {

            echo wp_kses_post($fieldValue);
          }
        } ?>
<?php endif; ?>
<?php if (!empty($postfixText) && ($postfixPosition == "afterend")) : ?>
<span class="<?php echo esc_attr($postfixClass); ?>">
  <?php echo wp_kses_post($postfixText); ?>
</span>






<?php endif; ?>


<?php endif; ?>










<?php return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockTermsQueryItem();