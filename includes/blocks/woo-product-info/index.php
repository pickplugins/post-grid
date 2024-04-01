<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockWooProductInfo
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
      post_grid_plugin_dir . 'build/blocks/woo-product-info/block.json',
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

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';

    $schema = isset($attributes['schema']) ? $attributes['schema'] : [];
    $schemaOptions = isset($schema['options']) ? $schema['options'] : [];
    $schemaEnable = isset($schemaOptions['enable']) ? $schemaOptions['enable'] : true;


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $items = isset($attributes['items']) ? $attributes['items'] : [];
    $itemsOptions = isset($items['options']) ? $items['options'] : [];
    $itemsElements = isset($items['elements']) ? $items['elements'] : [];

    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';

    $label = isset($attributes['label']) ? $attributes['label'] : [];
    $labelOptions = isset($label['options']) ? $label['options'] : [];

    $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
    $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

    $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];



    //
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

    //$product = wc_get_product($post_ID);
    //global $product;
    if (function_exists("wc_get_product")) {

      $product = wc_get_product($post_ID);
    } else {
      $product = null;
    }

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);

    ob_start();



?>
    <<?php echo esc_attr($wrapperTag); ?> class="  <?php echo esc_attr($blockId); ?>  <?php echo esc_attr($wrapperClass); ?>">

      <?php
      echo $content ?>
    </<?php echo esc_attr($wrapperTag); ?>>







<?php return ob_get_clean();
  }
}

$PGBlockWooProductInfo = new PGBlockWooProductInfo();
