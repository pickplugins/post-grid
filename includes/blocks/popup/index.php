<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPopup
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {



    register_block_type(
      post_grid_plugin_dir . 'build/blocks/popup/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }


  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {


    if (has_block('post-grid/popup')) {
      wp_enqueue_style('pgpopup_animate');
      wp_enqueue_script('pg_block_scripts');
    }


    global $postGridCssY;




    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    $trigger = isset($attributes['trigger']) ? $attributes['trigger'] : [];
    $triggerRules = isset($trigger['rules']) ? $trigger['rules'] : [];
    $closeTrigger = isset($attributes['closeTrigger']) ? $attributes['closeTrigger'] : [];
    $closeTriggerRules = isset($closeTrigger['rules']) ? $closeTrigger['rules'] : [];

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


    $closeWrap = isset($attributes['closeWrap']) ? $attributes['closeWrap'] : [];
    $closeWrapOptions = isset($closeWrap['options']) ? $closeWrap['options'] : [];

    $closeWrapLibrary = isset($closeWrapOptions['library']) ? $closeWrapOptions['library'] : '';
    $closeWrapSrcType = isset($closeWrapOptions['srcType']) ? $closeWrapOptions['srcType'] : '';
    $closeWrapIconSrc = isset($closeWrapOptions['iconSrc']) ? $closeWrapOptions['iconSrc'] : '';
    $closeIconClass = isset($closeWrapOptions['class']) ? $closeWrapOptions['class'] : '';

    $closeWrapAnimation = isset($closeWrapOptions['animation']) ? $closeWrapOptions['animation'] : '';


    $entranceWrap = isset($attributes['entranceWrap']) ? $attributes['entranceWrap'] : [];
    $entranceWrapOptions = isset($entranceWrap['options']) ? $entranceWrap['options'] : [];

    $entranceWrapLibrary = isset($entranceWrapOptions['library']) ? $entranceWrapOptions['library'] : '';
    $entranceWrapSrcType = isset($entranceWrapOptions['srcType']) ? $entranceWrapOptions['srcType'] : '';
    $entranceWrapIconSrc = isset($entranceWrapOptions['iconSrc']) ? $entranceWrapOptions['iconSrc'] : '';
    $entranceIconClass = isset($entranceWrapOptions['class']) ? $entranceWrapOptions['class'] : '';

    $entranceWrapAnimation = isset($entranceWrapOptions['animation']) ? $entranceWrapOptions['animation'] : '';














    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






    if ($closeWrapLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($closeWrapLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($closeWrapLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }


    $closeIconHtml = '<span class="' . $closeIconClass . ' ' . $closeWrapIconSrc . '"></span>';

    $user_id = get_current_user_id();

    $prams = [];
    $prams['isLogged'] = !empty($user_id) ? true : false;
    $prams['userId'] = $user_id;
    $prams['refererr'] = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : "";



    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = post_grid_parse_css_class($wrapperClass, $obj);

    // //* Visible condition
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);



      if (!$isVisible) return;
    }

    // //* Visible condition


    ob_start();




?>
    <div class="<?php echo esc_attr($wrapperClass); ?>   <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" entrance-animation="<?php echo esc_attr($entranceWrapAnimation); ?>" close-animation="<?php echo esc_attr($closeWrapAnimation); ?>" popup-id="<?php echo esc_attr($blockId); ?>" pgpopup-trigger="<?php echo esc_attr(json_encode($triggerRules)) ?>" pgpopup-close-trigger="<?php echo esc_attr(json_encode($closeTriggerRules)) ?>" data-prams="<?php echo esc_attr(json_encode($prams)) ?>" style="display: none;">
      <div class='inner'>
        <span class='close' popup-id="<?php echo esc_attr($blockId); ?>" close-animation="<?php echo esc_attr($closeWrapAnimation); ?>">
          <?php echo wp_kses_post($closeIconHtml); ?>
        </span>
        <?php echo wp_kses_post($content) ?>
      </div>
    </div>

<?php



    return ob_get_clean();
  }
}

$PGBlockPopup = new PGBlockPopup();
