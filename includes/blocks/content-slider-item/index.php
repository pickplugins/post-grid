<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockContentSliderItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/layer/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/layer/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/content-slider-item/block.json',
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


    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';




    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';




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

?>
    <div class="<?php echo esc_attr($wrapperClass); ?> splide__slide <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
      <?php echo $content ?>
    </div>
<?php


    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockContentSliderItem();
