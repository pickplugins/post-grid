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
    wp_register_script('pgmenu_wrap_front_script', post_grid_plugin_url . 'includes/blocks/menu-wrap/front-scripts.js', [], '', true);


    if (has_block('post-grid/menu-wrap')) {
      wp_enqueue_style('pgmenu_wrap_style');
      wp_enqueue_script('pgmenu_wrap_front_script');
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


    $mobileMenuToggle = isset($attributes['mobileMenuToggle']) ? $attributes['mobileMenuToggle'] : [];
    $mobileMenuToggleOptions = isset($mobileMenuToggle['options']) ? $mobileMenuToggle['options'] : [];

    $mobileMenuToggleLibrary = isset($mobileMenuToggleOptions['library']) ? $mobileMenuToggleOptions['library'] : '';
    $mobileMenuToggleSrcType = isset($mobileMenuToggleOptions['srcType']) ? $mobileMenuToggleOptions['srcType'] : '';
    $mobileMenuToggleSrc = isset($mobileMenuToggleOptions['iconSrc']) ? $mobileMenuToggleOptions['iconSrc'] : '';
    $mobileMenuTogglePosition = isset($mobileMenuToggleOptions['position']) ? $mobileMenuToggleOptions['position'] : '';
    $mobileMenuToggleClass = isset($mobileMenuToggleOptions['class']) ? $mobileMenuToggleOptions['class'] : '';








    if ($mobileMenuToggleLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($mobileMenuToggleLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($mobileMenuToggleLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $mobileMenuToggleHtml = '<span class=" ' . $mobileMenuToggleSrc . '"></span>';



    $mobileMenuClose = isset($attributes['mobileMenuClose']) ? $attributes['mobileMenuClose'] : [];
    $mobileMenuCloseOptions = isset($mobileMenuClose['options']) ? $mobileMenuClose['options'] : [];

    $mobileMenuCloseLibrary = isset($mobileMenuCloseOptions['library']) ? $mobileMenuCloseOptions['library'] : '';
    $mobileMenuCloseSrcType = isset($mobileMenuCloseOptions['srcType']) ? $mobileMenuCloseOptions['srcType'] : '';
    $mobileMenuCloseSrc = isset($mobileMenuCloseOptions['iconSrc']) ? $mobileMenuCloseOptions['iconSrc'] : '';
    $mobileMenuClosePosition = isset($mobileMenuCloseOptions['position']) ? $mobileMenuCloseOptions['position'] : '';
    $mobileMenuCloseClass = isset($mobileMenuCloseOptions['class']) ? $mobileMenuCloseOptions['class'] : '';


    if ($mobileMenuCloseLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($mobileMenuCloseLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($mobileMenuCloseLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }


    $mobileMenuCloseIconHtml = '<span class="' .  $mobileMenuCloseClass . ' ' .  $mobileMenuCloseSrc . '"></span>';









    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);




    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);



      if (!$isVisible) return;
    }

    // //* Visible condition

    ob_start();



?>
    <div class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
      <nav>
        <ul class="<?php echo esc_attr($menuWrapClass); ?>">
          <?php echo $content ?>
        </ul>
        <div class="mobile-menu-toggle">
          <?php echo wp_kses_post($mobileMenuToggleHtml); ?>
        </div>
      </nav>


      <div class="mobile-menu-wrap">
        <div class="mobile-menu-close">
          <?php echo wp_kses_post($mobileMenuCloseIconHtml); ?>
        </div>
        <ul class="<?php echo esc_attr($menuWrapClass);
                    ?>">
          <?php echo $content ?>
        </ul>
      </div>
    </div>
<?php

    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockMenuWrap();
