<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockListNestedItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/list-nested-item/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/list-nested-item/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/list-nested-item/block.json',
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
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $wrapper = '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];




    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';



    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';

    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';



    $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'li';
    //$content = isset($textOptions['content']) ? $textOptions['content'] : '';



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];







    ob_start();
?>

    <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" <?php //echo esc_attr($wrapperAttrText); ?>>

      

      

        <?php if ($iconPosition == 'before') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

        <?php echo $content; ?>
      
      <?php if ($iconPosition == 'after') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>






    </<?php echo esc_attr($wrapperTag); ?>>




<?php return ob_get_clean();
  }
}

$PGBlockListNestedItem = new PGBlockListNestedItem();
