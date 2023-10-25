<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockContentSlider
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  function front_scripts($attributes)
  {
    wp_register_script('pgcontent-slider_front_script', post_grid_plugin_url . 'src/blocks/content-slider/front-scripts.js', [], '', true);
    wp_register_script('pgcontent_slider_splide', post_grid_plugin_url . 'src/blocks/content-slider/splide.min.js', [], '', true);

    wp_register_style('pgcontent_slider_splide', post_grid_plugin_url . 'src/blocks/content-slider/splide.min.css', []);
    wp_register_style('pgcontent_slider_splide_core', post_grid_plugin_url . 'src/blocks/content-slider/splide-core.min.css', []);




    if (has_block('post-grid/content-slider')) {

      wp_enqueue_style('jquery-ui');

      // wp_enqueue_style('pgcontent_slider_splide');
      wp_enqueue_style('pgcontent_slider_splide_core');

      wp_enqueue_script('pgcontent_slider_splide');



      wp_enqueue_script('jquery');
      wp_enqueue_script('jquery-ui-core');
      wp_enqueue_script('jquery-ui-accordion');
      wp_enqueue_script('jquery-effects-core');

      wp_enqueue_script('pgcontent-slider_front_script');
    }
  }

  function editor_style()
  {
    wp_register_style('splide-core.min', post_grid_plugin_url . 'src/blocks/content-slider/splide-core.min.css');
    wp_enqueue_style('splide-core.min');
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));
    wp_register_style('pgcontent-slider-splide-core', post_grid_plugin_url . 'src/blocks/content-slider/splide-core.min.css');


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/content-slider/block.json',
      array(

        'title' => 'Content Slider',
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


    global $postGridCustomCss;
    global $postGridCssY;

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

    $sliderOptions = isset($attributes['sliderOptions']) ? $attributes['sliderOptions'] : [];
    $sliderOptionsRes = isset($attributes['sliderOptionsRes']) ? $attributes['sliderOptionsRes'] : [];


    $perv = isset($attributes['perv']) ? $attributes['perv'] : [];
    $pervOptions = isset($perv['options']) ? $perv['options'] : [];

    $pervText = isset($pervOptions['text']) ? $pervOptions['text'] : '';

    $next = isset($attributes['next']) ? $attributes['next'] : [];
    $nextOptions = isset($next['options']) ? $next['options'] : [];

    $nextText = isset($nextOptions['text']) ? $nextOptions['text'] : '';



    $pervIcon = isset($attributes['pervIcon']) ? $attributes['pervIcon'] : [];
    $pervIconOptions = isset($pervIcon['options']) ? $pervIcon['options'] : [];

    $pervIconLibrary = isset($pervIconOptions['library']) ? $pervIconOptions['library'] : '';
    $pervIconSrcType = isset($pervIconOptions['srcType']) ? $pervIconOptions['srcType'] : '';
    $pervIconSrc = isset($pervIconOptions['iconSrc']) ? $pervIconOptions['iconSrc'] : '';
    $pervIconClass = isset($pervIconOptions['class']) ? $pervIconOptions['class'] : '';
    $pervIconPosition = isset($pervIconOptions['position']) ? $pervIconOptions['position'] : '';


    $nextIcon = isset($attributes['nextIcon']) ? $attributes['nextIcon'] : [];
    $nextIconOptions = isset($nextIcon['options']) ? $nextIcon['options'] : [];

    $nextIconLibrary = isset($nextIconOptions['library']) ? $nextIconOptions['library'] : '';
    $nextIconSrcType = isset($nextIconOptions['srcType']) ? $nextIconOptions['srcType'] : '';
    $nextIconSrc = isset($nextIconOptions['iconSrc']) ? $nextIconOptions['iconSrc'] : '';

    $nextIconClass = isset($nextIconOptions['class']) ? $nextIconOptions['class'] : '';
    $nextIconPosition = isset($nextIconOptions['position']) ? $nextIconOptions['position'] : '';




    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


    $postGridCustomCss .= $customCss;


    if ($pervIconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($pervIconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($pervIconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    if ($nextIconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($nextIconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($nextIconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }




    $pervIconHtml = '<span class="' . $pervIconClass . ' ' . $pervIconSrc . '"></span>';
    $nextIconHtml = '<span class="' . $nextIconClass . ' ' . $nextIconSrc . '"></span>';


    $sliderOptionsResNew = [];


    foreach ($sliderOptionsRes as $id => $arg) {

      foreach ($arg as $view => $value) {

        if ($view == 'Desktop') {
          $viewNum = '1280';
        }

        if ($view == 'Tablet') {
          $viewNum = '991';
        }
        if ($view == 'Mobile') {
          $viewNum = '767';
        }
        $sliderOptionsResNew[$viewNum][$id] = $value;
      }
    }




    $sliderOptions['breakpoints'] = $sliderOptionsResNew;







    ob_start();



    ?>


        <div class="pg-content-slider <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">

          <div class="splide" id="splide-<?php echo esc_attr($blockId); ?>"
            data-splide="<?php echo esc_attr(json_encode($sliderOptions)) ?>">


            <div class="splide__arrows">
              <div class='perv splide__arrow splide__arrow--prev'>

                <?php if ($pervIconPosition == 'before'): ?>
                    <span class='icon'>
                      <?php echo wp_kses_post($pervIconHtml); ?>
                    </span>
                <?php endif; ?>

                <?php if (!empty($pervText)): ?>
                    <span>
                      <?php echo $pervText; ?>
                    </span>
                <?php endif; ?>



                <?php if ($pervIconPosition == 'after'): ?>
                    <span class='icon'>
                      <?php echo wp_kses_post($pervIconHtml); ?>
                    </span>
                <?php endif; ?>

              </div>
              <div class='next splide__arrow splide__arrow--next'>



                <?php if ($nextIconPosition == 'before'): ?>
                    <span class='icon'>
                      <?php echo wp_kses_post($nextIconHtml); ?>
                    </span>
                <?php endif; ?>
                <?php if (!empty($nextText)): ?>
                    <span>
                      <?php echo $nextText; ?>
                    </span>
                <?php endif; ?>



                <?php if ($nextIconPosition == 'after'): ?>
                    <span class='icon'>
                      <?php echo wp_kses_post($nextIconHtml); ?>
                    </span>
                <?php endif; ?>
              </div>
            </div>

            <div class="splide__track">
              <ul class="splide__list">
                <?php echo $content ?>
              </ul>
            </div>




            <ul class="splide__pagination "></ul>


          </div>
        </div>
        <?php

        return ob_get_clean();
  }
}

$PGBlockContentSlider = new PGBlockContentSlider();