<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockIcon
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  function front_scripts($attributes)
  {
    //wp_register_script('pgicon_front_script', post_grid_plugin_url . 'src/blocks/icon/front-scripts.js', [], '', true);
    wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css', []);


    if (has_block('post-grid/icon')) {

      wp_enqueue_style('font-awesome-5');


      //wp_enqueue_script('pgicon_front_script');
    }
  }

  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/icon/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/icon/index.js', array('wp-blocks', 'wp-element'));
    wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css', []);



    register_block_type(
      post_grid_plugin_dir . 'build/blocks/icon/block.json',
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

    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {


    global $postGridCss;

    global $postGridCssY;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_excerpt = '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $wrapperAttr = isset($wrapperOptions['attr']) ? $wrapperOptions['attr'] : [];

    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];

    $textText = isset($textOptions['text']) ? $textOptions['text'] : 'Custom Text';

    $textEnable = isset($textOptions['enable']) ? $textOptions['enable'] : true;

    $textLinkTo = isset($textOptions['linkTo']) ? $textOptions['linkTo'] : '';
    $textLinkTarget = isset($textOptions['linkTarget']) ? $textOptions['linkTarget'] : '_blank';
    $textCustomUrl = isset($textOptions['customUrl']) ? $textOptions['customUrl'] : '';
    $textLinkAttr = isset($textOptions['linkAttr']) ? $textOptions['linkAttr'] : [];
    $textRel = isset($textOptions['rel']) ? $textOptions['rel'] : '';



    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];

    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


    $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
    $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


    $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';

    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $linkAttrStr = '';



    if (!empty($postExcerptlinkAttr))
      foreach ($postExcerptlinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }


    $linkAttrStrText = '';

    if (!empty($textLinkAttr))
      foreach ($textLinkAttr as $attr) {

        if (!empty($attr['val']))
          $linkAttrStrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }


    $wrapperAttrText = '';

    if (!empty($wrapperAttr))
      foreach ($wrapperAttr as $attr) {

        if (!empty($attr['val']))
          $wrapperAttrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }





    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);
    $textText = parse_css_class($textText, $obj);
    $prefixText = parse_css_class($prefixText, $obj);
    $postfixText = parse_css_class($postfixText, $obj);

    ob_start();



    if (!empty($wrapperTag)) :

?>
      <<?php echo esc_attr($wrapperTag); ?> class="
                            <?php echo esc_attr($blockId); ?>
                            <?php echo esc_attr($wrapperClass); ?>" <?php echo esc_attr($wrapperAttrText); ?>>


        <?php if ($iconPosition == 'beforePrefix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPrefix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if (!empty($textLinkTo)) :
          /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
        ?>
          <?php if ($iconPosition == 'beforeLink') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <a class='text' <?php echo ($linkAttrStrText); ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url_raw($textCustomUrl) : esc_url_raw($post_url); ?>">
            <?php if ($iconPosition == 'beforeText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if ($textEnable) : ?>
              <span>
                <?php echo wp_kses_post($textText); ?>
              </span>
            <?php endif; ?>


            <?php if ($iconPosition == 'afterText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
          <?php if ($iconPosition == 'afterLink') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>

        <?php else : ?>
          <?php if ($iconPosition == 'beforeText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>


          <?php if ($textEnable) : ?>
            <span class="text">
              <?php echo wp_kses_post($textText); ?>
            </span>
          <?php endif; ?>


          <?php if ($iconPosition == 'afterText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        <?php endif; ?>




        <?php if ($iconPosition == 'beforePostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

      </<?php echo esc_attr($wrapperTag); ?>>
    <?php

    endif;

    if (empty($wrapperTag)) :

    ?>


      <?php if (empty($textLinkTo)) : ?>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>


        <?php if ($iconPosition == 'beforeText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>


        <?php if ($textEnable) : ?>
          <span class="text">
            <?php echo wp_kses_post($textText); ?>
          </span>
        <?php endif; ?>


        <?php if ($iconPosition == 'afterText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>


        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
      <?php else :
        /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
      ?>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'beforeLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <a class="<?php echo esc_attr($blockId); ?>" <?php echo ($linkAttrStrText); ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url_raw($textCustomUrl) : esc_url_raw($post_url); ?>">

          <?php if ($iconPosition == 'beforeText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>


          <?php if ($textEnable) : ?>
            <span class='text'>
              <?php echo wp_kses_post($textText); ?>
            </span>
          <?php endif; ?>


          <?php if ($iconPosition == 'afterText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>

        </a>
        <?php if ($iconPosition == 'afterLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
      <?php endif; ?>


    <?php

    endif;

    ?>









<?php return ob_get_clean();
  }
}

$PGBlockIcon = new PGBlockIcon();
