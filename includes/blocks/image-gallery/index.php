<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockImageGallery
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  function front_scripts($attributes)
  {
    wp_register_script('pgimage-gallery_front_script', post_grid_plugin_url . 'includes/blocks/image-gallery/front-scripts.js', [], '', true);

    if (has_block('post-grid/image-gallery')) {

      wp_enqueue_style('jquery-ui');

      wp_enqueue_script('jquery');
      wp_enqueue_script('jquery-ui-core');
      wp_enqueue_script('jquery-ui-accordion');
      wp_enqueue_script('jquery-effects-core');

      wp_enqueue_script('pgimage-gallery_front_script');
    }
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/layers/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/image-gallery/block.json',
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

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';





    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




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
<div
  class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
  <?php echo $content ?>
</div>
<?php

            return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockImageGallery();