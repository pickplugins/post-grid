<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockWooProductTabs
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/woo-price/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/woo-price/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/woo-product-tabs/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }

  function front_scripts($attributes)
  {
    wp_register_script('pg-woo-product-tabs-scripts', post_grid_plugin_url . 'includes/blocks/woo-product-tabs/front-scripts.js', []);

    if (has_block('post-grid/woo-product-tabs')) {

      wp_enqueue_script('pg-woo-product-tabs-scripts');
    }
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
    global $postGridScriptData;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : "beforeLabel";

    $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
    $items = isset($elements['items']) ? $elements['items'] : [];

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

    $postGridScriptData[$blockId]['elements'] = $elements;
    $postGridScriptData[$blockId]['icon']['position'] = $iconPosition;


    $blockArgs = [
      'blockId' => $blockId,
    ];




    foreach ($items as $item) {

      $siteIcon = $item['siteIcon'];
      $iconLibrary = $siteIcon['library'];

      if ($iconLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
      } else if ($iconLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
      } else if ($iconLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
      }
    }



    //var_dump($blockAlign);

    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);

      // var_dump($isVisible);

      if (!$isVisible) return;
    }

    // //* Visible condition


    ob_start();


    if (!empty($wrapperTag)) :

?>
      <<?php echo tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockAlign); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">

        <?php

        //echo do_shortcode( "[woocommerce_my_account]" );

        if (function_exists('woocommerce_output_product_data_tabs')) :
          woocommerce_output_product_data_tabs();
        endif;

        ?>


      </<?php echo tag_escape($wrapperTag); ?>>
    <?php

    endif;


    ?>








<?php return ob_get_clean();
  }
}

$PGBlockWooProductTabs = new PGBlockWooProductTabs();
