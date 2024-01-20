<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockPostTableOfContents
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    // wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/text/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/text/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      'post-grid/table-of-contents',
      array(
        //'editor_script' => 'editor_script',
        //'editor_style' => 'editor_style',
        //'script' => 'front_script',
        'uses_context' => ["postId", "loopIndex", "postType", "queryId"],
        //'style' => 'front_style',
        'render_callback' => array($this, 'theHTML'),
        'attributes' => [
          "text" => [
            "type" => "object",
            "default" => [
              "options" => [
                "content" => "",
                "tag" => "div",
                "class" => "pg-text"
              ],
              "styles" => [

                "color" => [],

                "padding" => [],
                "margin" => [],
                "display" => [],
                "fontSize" => [],
                "lineHeight" => [],
                "letterSpacing" => [],
                "fontFamily" => [],
                "fontWeight" => [],
                "textDecoration" => [],
                "textTransform" => []
              ]
            ]
          ],
          "blockId" => [
            "type" => "string",
            "default" => ""
          ],
          "blockCssY" => [
            "type" => "object",
            "default" => [
              "items" => []
            ]
          ]
        ]


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
    $text = '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $text = isset($attributes['text']) ? $attributes['text'] : [];



    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];

    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    $content = isset($textOptions['content']) ? $textOptions['content'] : '';



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];








    ob_start();




    if (!empty($wrapperTag)):
      ?>
            <<?php echo esc_attr($wrapperTag); ?> class="
              <?php echo esc_attr($blockId); ?>">
              <?php echo $content; ?>
            </<?php echo esc_attr($wrapperTag); ?>>
            <?php

    endif;



    ?>









        <?php return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockPostTableOfContents();