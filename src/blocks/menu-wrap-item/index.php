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
    wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css', []);


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
    $subMenuWrapOptions = isset($subMenuWrap['options']) ? $subMenuWrap['options'] : [];
    $subMenuWrapClass = isset($subMenuWrapOptions['class']) ? $subMenuWrapOptions['class'] : '';


    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';



    $link = isset($attributes['link']) ? $attributes['link'] : [];
    $linkOptions = isset($link['options']) ? $link['options'] : [];
    $linkClass = isset($linkOptions['class']) ? $linkOptions['class'] : '';


    $linktext = isset($linkOptions['text']) ? $linkOptions['text'] : '';
    $linkurl = isset($linkOptions['url']) ? $linkOptions['url'] : '';


    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }


    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    ////var_dump($link);

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);

    ob_start();

?>


    <li class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">



      <?php if (!empty($linktext)) : ?>
        <?php if ($iconPosition == 'beforeLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <a class=<?php echo esc_attr($linkClass); ?> href="<?php echo esc_url_raw($linkurl); ?>">
          <?php if ($iconPosition == 'beforeLabel') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php echo esc_html($linktext) ?>
          <?php if ($iconPosition == 'afterLabel') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        </a>
        <?php if ($iconPosition == 'afterLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
      <?php endif; ?>

      <ul class=<?php echo esc_attr($subMenuWrapClass); ?>>
        <?php echo $content ?>
      </ul>
    </li>


<?php
    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockMenuWrapItem();
