<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostText
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/text/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }

  function front_scripts($attributes)
  {
    wp_register_script('pg-text', post_grid_plugin_url . 'includes/blocks/text/front-scripts.js', [], '', true);

    if (has_block('post-grid/text')) {

      $other = isset($attributes['other']) ? $attributes['other'] : [];
      $otherOptions = isset($other['options']) ? $other['options'] : [];
      $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;

      if ($otherCopyObj) {
        wp_enqueue_script('pg-text');
      }
    }
  }
  function front_style($attributes)
  {
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {



    global $postGridCssY;




    $text = '';
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : get_the_ID();

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $text = isset($attributes['text']) ? $attributes['text'] : [];



    $other = isset($attributes['other']) ? $attributes['other'] : [];
    $otherOptions = isset($other['options']) ? $other['options'] : [];
    $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;

    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    $rules = isset($visible['rules']) ? $visible['rules'] : [];

    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $textClass = isset($textOptions['class']) ? $textOptions['class'] : '';
    $textId = isset($textOptions['id']) ? $textOptions['id'] : '';

    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    $content = isset($textOptions['content']) ? $textOptions['content'] : '';


    $limitBy = isset($textOptions['limitBy']) ? $textOptions['limitBy'] : '';
    $limitCount = !empty($textOptions['limitCount']) ? $textOptions['limitCount'] : 999;

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





    if ($limitBy == 'character') {
      $content = wp_strip_all_tags($content);
      $content = substr($content, 0, (int) $limitCount);
    } elseif ($limitBy == 'word') {

      $content = wp_trim_words($content, (int) $limitCount, '');
    }

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';

    ////var_dump($obj);
    $textClass = parse_css_class($textClass, $obj);



    //$textClass = parse_css_class($textClass, $obj);

// //* Visible condition
if (!empty($visible['rules'])) {
  $isVisible = post_grid_visible_parse($visible);

  // var_dump($isVisible);
  
  if (!$isVisible) return;
}

// //* Visible condition


    ob_start();





    if (!empty($wrapperTag)) :
?>



<<?php echo esc_html($wrapperTag); ?> class="
        <?php echo esc_attr($blockId); ?>
        <?php echo esc_attr($textClass); ?>" id="<?php echo esc_attr($textId); ?>" <?php

                                                                                    if ($otherCopyObj) :
                                                                                    ?>
  clickToCopy="<?php echo esc_attr($otherCopyObj); ?>" <?php endif; ?>><?php echo $content; ?>
</<?php echo esc_html($wrapperTag); ?>>
<?php

    endif;



    ?>









<?php return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostText();