<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostText
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    // 
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



  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {


    if (has_block('post-grid/text')) {
      wp_enqueue_script('pg_block_scripts');
    }

    // global $wp_query;
    // $taxterm = get_queried_object();


    global $postGridCssY;



    if (has_block('post-grid/text')) {

      $other = isset($attributes['other']) ? $attributes['other'] : [];
      $otherOptions = isset($other['options']) ? $other['options'] : [];
      $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;
      $otherCopyContent = isset($otherOptions['copyContent']) ? $otherOptions['copyContent'] : "";


      if ($otherCopyObj) {
        wp_enqueue_style('pg_block_styles');
        wp_enqueue_style('pgpopup_animate');
      }
    }




    $text = '';
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : get_the_ID();

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $text = isset($attributes['text']) ? $attributes['text'] : [];



    $other = isset($attributes['other']) ? $attributes['other'] : [];
    $otherOptions = isset($other['options']) ? $other['options'] : [];
    $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;
    $otherCopyContent = isset($otherOptions['copyContent']) ? $otherOptions['copyContent'] : "";
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    $rules = isset($visible['rules']) ? $visible['rules'] : [];
    $animateOn = isset($attributes['animateOn']) ? $attributes['animateOn'] : [];
    $animateRules = isset($animateOn['rules']) ? $animateOn['rules'] : [];


    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $textClass = isset($textOptions['class']) ? $textOptions['class'] : '';
    $textId = !empty($textOptions['id']) ? $textOptions['id'] : $blockId;

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

    $textClass = post_grid_parse_css_class($textClass, $obj);
    $content = post_grid_parse_css_class($content, $obj);



    //$textClass = post_grid_parse_css_class($textClass, $obj);

    // //* Visible condition
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);


      if (!$isVisible) return;
    }

    // //* Visible condition


    ob_start();

    if (empty($wrapperTag)) :
      echo $content;
    endif;


    if (!empty($wrapperTag)) :
?>
      <<?php echo pg_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($textClass); ?>"
        id="<?php echo esc_attr($textId); ?>" <?php if (!empty($animateRules)): ?>
        animateOn="<?php echo esc_attr(json_encode($animateRules)) ?>" <?php endif;

                                                                      if ($otherCopyObj) : ?> clickToCopy="<?php echo esc_attr($otherCopyObj); ?>"
        copyContent="<?php echo esc_attr($otherCopyContent); ?>" <?php endif; ?>>
        <?php echo $content; ?>
      </<?php echo pg_tag_escape($wrapperTag); ?>>
<?php

    endif;

    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostText();
