<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockMenuWrapItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    //add_action('wp_enqueue_scripts', array($this, 'front_scripts'));

  }

  function front_scripts($attributes)
  {
    wp_register_script('pgmenu-wrap-item_style', post_grid_plugin_url . 'src/blocks/menu-wrap-item/front-scripts.js', [], '', true);

    if (has_block('post-grid/menu-wrap-item')) {



      wp_enqueue_script('pgflex-wrap_front_script');
    }
  }

  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/menu-wrap-item/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/menu-wrap-item/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/menu-wrap-item/block.json',
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


    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_ID = !empty($post_ID) ? $post_ID : get_the_ID();


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $menuWrap = isset($attributes['menuWrap']) ? $attributes['menuWrap'] : [];
    $subMenuWrap = isset($attributes['subMenuWrap']) ? $attributes['subMenuWrap'] : [];


    $link = isset($attributes['link']) ? $attributes['link'] : [];
    $linkOptions = isset($link['options']) ? $link['options'] : [];


    $linktext = isset($linkOptions['text']) ? $linkOptions['text'] : '';
    $linkurl = isset($linkOptions['url']) ? $linkOptions['url'] : '';


    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




    ////var_dump($link);

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);

    ob_start();

    ?>


    <li
      class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">

      <?php if (!empty($linktext)): ?>
        <a class='menuLink' href="<?php echo esc_url_raw($linkurl); ?>">
          <?php echo esc_html($linktext) ?>
        </a>
      <?php endif; ?>

      <ul class='subMenu'>
        <?php echo $content ?>
      </ul>
    </li>


    <?php
    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockMenuWrapItem();