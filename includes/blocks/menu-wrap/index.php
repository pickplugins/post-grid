<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockMenuWrap
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  function front_scripts($attributes)
  {
    wp_register_style('pgmenu_wrap_style', post_grid_plugin_url . 'includes/blocks/menu-wrap/index.css');

    if (has_block('post-grid/menu-wrap')) {
      wp_enqueue_style('pgmenu_wrap_style');
    }
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    wp_register_style('pgmenu_wrap_editor_style', post_grid_plugin_url . 'includes/blocks/menu-wrap/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/menu-wrap/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/menu-wrap/block.json',
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

    $menuWrap = isset($attributes['menuWrap']) ? $attributes['menuWrap'] : [];
    $menuWrapOptions = isset($menuWrap['options']) ? $menuWrap['options'] : [];
    $menuWrapClass = isset($menuWrapOptions['class']) ? $menuWrapOptions['class'] : '';
    $subMenuWrap = isset($attributes['subMenuWrap']) ? $attributes['subMenuWrap'] : [];
    $subMenuWrapOptions = isset($subMenuWrap['options']) ? $subMenuWrap['options'] : [];
    $subMenuWrapClass = isset($subMenuWrapOptions['class']) ? $subMenuWrapOptions['class'] : '';



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);

    //////var_dump($blockCssY);

    ob_start();



?>
    <div class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
      <ul class="<?php echo esc_attr($menuWrapClass); ?>">
        <?php echo $content ?>
      </ul>
    </div>
<?php

    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockMenuWrap();
