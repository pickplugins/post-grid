<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockListNested
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('pglist_editor_style', post_grid_plugin_url . 'src/blocks/list-nested/index.css');
    //wp_register_script('pglist_editor_script', post_grid_plugin_url . 'src/blocks/list-nested/index.js', array('wp-blocks', 'wp-element'));
    //wp_register_style('pglist_front_style', post_grid_plugin_url . 'src/blocks/list-nested/index.css');



    register_block_type(
      post_grid_plugin_dir . 'build/blocks/list-nested/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),

      )
    );
  }

  // function front_script($attributes)
  // {
  // }
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

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'ul';

    $itemsX = isset($attributes['itemsX']) ? $attributes['itemsX'] : [];
    $items = isset($itemsX['items']) ? $itemsX['items'] : [];


    $item = isset($attributes['item']) ? $attributes['item'] : [];
    $itemOptions = isset($item['options']) ? $item['options'] : [];
    $itemTag = isset($itemOptions['tag']) ? $itemOptions['tag'] : 'li';





    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];

    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $iconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';



    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);



    ob_start();




//     if (!empty($wrapperTag)) :
?>

      <<?php echo esc_attr($wrapperTag); ?> class="
              <?php echo esc_attr($blockId); ?>
              <?php echo esc_attr($wrapperClass); ?>
              <?php echo esc_attr($blockAlign); ?>">



        <?php echo $content ?>
        
      </<?php echo esc_attr($wrapperTag); ?>>
    <?php

    // endif;



    ?>








<?php return ob_get_clean();
  }
}

$PGBlockListNested = new PGBlockListNested();
