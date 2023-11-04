<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostText
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
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




    $text = '';
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $text = isset($attributes['text']) ? $attributes['text'] : [];



    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $textClass = isset($textOptions['class']) ? $textOptions['class'] : '';

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



    $textClass = parse_css_class($textClass, $obj);






    ob_start();




    if (!empty($wrapperTag)):
      ?>
                  <<?php echo esc_attr($wrapperTag); ?> class="
                    <?php echo esc_attr($blockId); ?>
                    <?php echo esc_attr($textClass); ?>">
                    <?php echo $content; ?>
                  </<?php echo esc_attr($wrapperTag); ?>>
                  <?php

    endif;



    ?>









            <?php return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostText();