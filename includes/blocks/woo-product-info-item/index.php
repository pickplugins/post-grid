<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockWooProductInfoItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/woo-product-info/index.css');
    // wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/woo-product-info/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/woo-product-info-item/block.json',
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




    global $postGridCssY;

    $post_ID = get_the_ID();
    $post_data = get_post($post_ID);

    $post_url = get_the_permalink($post_ID);
    $post_title = get_the_title($post_ID);
    $post_thumb_url = get_the_post_thumbnail_url($post_ID, 'full');


    // $post_author_id = $post_data->post_author;
    //$author_data = get_user_by('ID', $post_author_id);

    $POST_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';

    $schema = isset($attributes['schema']) ? $attributes['schema'] : [];
    $schemaOptions = isset($schema['options']) ? $schema['options'] : [];
    $schemaEnable = isset($schemaOptions['enable']) ? $schemaOptions['enable'] : true;


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'span';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : 'pg-woo-product-info-item';

    $items = isset($attributes['items']) ? $attributes['items'] : [];
    $itemsOptions = isset($items['options']) ? $items['options'] : [];
    $itemsElements = isset($items['elements']) ? $items['elements'] : [];


    $field = isset($attributes["field"])
      ? $attributes["field"]
      : [];
    $fieldOptions = isset($field["options"])
      ? $field["options"]
      : [];
    $fieldClass = isset($fieldOptions["class"])
      ? $fieldOptions["class"]
      : "";

    $fieldTag = isset($fieldOptions["tag"])
      ? $fieldOptions["tag"]
      : "span";
    $fieldValue = isset($fieldOptions["fieldValue"])
      ? $fieldOptions["fieldValue"]
      : "weight";
    // var_dump($fieldValue);
    $fieldCustomMeta = isset($fieldOptions["customMeta"])
      ? $fieldOptions["customMeta"]
      : "";
    // var_dump($fieldCustomMeta);
    $fieldMetaType = isset($fieldOptions["metaType"])
      ? $fieldOptions["metaType"]
      : "";
    // var_dump($fieldMetaType);




    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : 'icon';
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';

    $label = isset($attributes['label']) ? $attributes['label'] : [];
    $labelOptions = isset($label['options']) ? $label['options'] : [];

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

    $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
    $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

    $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];



    //
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


    if (function_exists("wc_get_product")) {

      $product = wc_get_product($post_ID);
    } else {
      $product = null;
    }



    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);


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


<<?php echo tag_escape($wrapperTag); ?> class="
                            <?php echo esc_attr($blockId); ?>
                            <?php echo esc_attr($wrapperClass); ?>">

  <?php if ($iconPosition == 'beforePrefix') : ?>
  <?php echo wp_kses_post($fontIconHtml); ?>
  <?php endif; ?>
  <?php if (!empty($prefixText)) : ?>
  <span class="<?php echo esc_attr($prefixClass); ?>">
    <?php echo wp_kses_post($prefixText); ?>
  </span>
  <?php endif; ?>
  <?php if ($iconPosition == 'afterPrefix') : ?>
  <?php echo wp_kses_post($fontIconHtml); ?>
  <?php endif; ?>

  <<?php echo tag_escape($fieldTag); ?> class="  <?php echo esc_attr($fieldClass); ?>">


    <<?php echo tag_escape($fieldTag); ?> class="<?php echo esc_attr($fieldClass); ?>">

      <?php
          if ($product != null) {
            if ($fieldValue == 'weight') {

              $finalValue = ($product == null) ? 0 : $product->get_weight();

              echo $finalValue . ' kg';
            }
            if ($fieldValue == 'length') {

              $finalValue = ($product == null) ? 0 : $product->get_length();
              echo $finalValue . ' cm';
            }
            if ($fieldValue == 'width') {

              $finalValue = ($product == null) ? 0 : $product->get_width();
              echo $finalValue . ' cm';
            }
            if ($fieldValue == 'height') {

              $finalValue = ($product == null) ? 0 : $product->get_height();
              echo $finalValue . ' cm';
            }
            if ($fieldValue == 'dimensions') {

              $finalValue = ($product == null) ? 0 : $product->get_dimensions();
              echo wp_kses_post($finalValue);
            }
            if ($fieldValue == 'meta') {
              // if ($fieldMetaType == "ID")


              $finalValue = get_post_meta($POST_ID, $fieldCustomMeta, true);
              // $finalValue = get_field($fieldCustomMeta, $POST_ID);

              // var_dump($finalValue);
              echo wp_kses_post($finalValue);
            }
          }
          ?>













    </<?php echo tag_escape($fieldTag); ?>>
    <?php if ($iconPosition == 'beforePostfix') : ?>
    <?php echo wp_kses_post($fontIconHtml); ?>
    <?php endif; ?>
    <?php if (!empty($postfixText)) : ?> <span class=" <?php echo esc_attr($postfixClass); ?>">
      <?php echo wp_kses_post($postfixText); ?>
    </span>
    <?php endif; ?>
    <?php if ($iconPosition == 'afterPostfix') : ?>
    <?php echo wp_kses_post($fontIconHtml); ?>
    <?php endif; ?>











  </<?php echo tag_escape($wrapperTag); ?>>







  <?php return ob_get_clean();
  }
}

$PGBlockWooProductInfoItem = new PGBlockWooProductInfoItem();