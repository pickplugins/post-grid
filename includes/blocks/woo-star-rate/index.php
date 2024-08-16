<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockWooStarRate
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/woo-star-rate/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/woo-star-rate/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/woo-star-rate/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),



      )
    );
  }

  function front_script($attributes) {}
  function front_style($attributes)
  {

    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {




    global $postGridCssY;
    global $product;


    if ($product == NULL) return;


    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $sku = isset($attributes['sku']) ? $attributes['sku'] : [];
    $skuOptions = isset($sku['options']) ? $sku['options'] : [];


    $skuLinkTarget = isset($skuOptions['linkTarget']) ? $skuOptions['linkTarget'] : '_blank';
    $skuCustomUrl = isset($skuOptions['customUrl']) ? $skuOptions['customUrl'] : '';
    $skuLinkAttr = isset($skuOptions['linkAttr']) ? $skuOptions['linkAttr'] : [];
    $skuRel = isset($skuOptions['rel']) ? $skuOptions['rel'] : '';
    $skuLinkTo = isset($skuOptions['linkTo']) ? $skuOptions['linkTo'] : '';
    $skuLinkToMetaKey = isset($skuOptions['linkToMetaKey']) ? $skuOptions['linkToMetaKey'] : '';



    $iconsWrap = isset($attributes['iconsWrap']) ? $attributes['iconsWrap'] : '';
    $iconsWrapOptions = isset($iconsWrap['options']) ? $iconsWrap['options'] : [];

    $iconsWrapLibrary = isset($iconsWrapOptions['library']) ? $iconsWrapOptions['library'] : '';
    $iconsWrapSrcType = isset($iconsWrapOptions['srcType']) ? $iconsWrapOptions['srcType'] : '';
    $iconsWrapSrc = isset($iconsWrapOptions['iconSrc']) ? $iconsWrapOptions['iconSrc'] : '';
    $iconsWrapPosition = isset($iconsWrapOptions['position']) ? $iconsWrapOptions['position'] : '';
    $iconsWrapClass = isset($iconsWrapOptions['class']) ? $iconsWrapOptions['class'] : '';


    $iconsWrap = isset($attributes['iconsWrap']) ? $attributes['iconsWrap'] : '';
    $iconsWrapOptions = isset($iconsWrap['options']) ? $iconsWrap['options'] : '';

    $iconsIdle = isset($attributes['iconsIdle']) ? $attributes['iconsIdle'] : '';
    $iconsIdleOptions = isset($iconsIdle['options']) ? $iconsIdle['options'] : '';

    $iconsFilled = isset($attributes['iconsFilled']) ? $attributes['iconsFilled'] : '';
    $iconsFilledOptions = isset($iconsFilled['options']) ? $iconsFilled['options'] : '';

    $summary = isset($attributes['summary']) ? $attributes['summary'] : '';
    $summaryOptions = isset($summary['options']) ? $summary['options'] : '';
    $summaryType = isset($summaryOptions['type']) ? $summaryOptions['type'] : '';
    $summarytypeCustom = isset($summaryOptions['typeCustom']) ? $summaryOptions['typeCustom'] : '';




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






    $productSKu = ($product == null) ? '' : $product->get_sku();
    $productRatingCount = ($product == null) ? '' : $product->get_rating_count();
    $productReviewCount = ($product == null) ? '' : $product->get_review_count();
    $productAverageRating = ($product == null) ? '' : $product->get_average_rating();
    $product_title = ($product == null) ? '' : $product->get_title();


    $summaryVars = array(
      '{rating_count}' => $productRatingCount,
      '{review_count}' => $productReviewCount,
      '{average_rating}' => $productAverageRating,
      '{product_title}' => $product_title,
    );


    if ($iconsWrapLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconsWrapLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconsWrapLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }



    $filled_width = (!empty($productAverageRating)) ? $productAverageRating * 20 : 0;





    $fontIconHtml = '<span class="' . $iconsWrapClass . ' ' . $iconsWrapSrc . '"></span>';


    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);
    $prefixText = parse_css_class($prefixText, $obj);
    $postfixText = parse_css_class($postfixText, $obj);
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);



      if (!$isVisible) return;
    }

    // //* Visible condition

    ob_start();


    if (!empty($wrapperTag)) :

?>
      <<?php echo pg_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>       <?php echo esc_attr($wrapperClass); ?>">



        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>




        <div class="icons-wrap">
          <div class="icons-idle">
            <?php echo wp_kses_post($fontIconHtml); ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
            <div class="icons-filled" style="width:<?php echo esc_attr($filled_width) . '%'; ?>">
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            </div>
          </div>
        </div>


        <?php if (!empty($summarytypeCustom)) : ?>
          <div class="summary">
            <?php
            echo wp_kses_post(strtr($summarytypeCustom, $summaryVars));
            ?>
          </div>
        <?php endif; ?>

        <?php if (empty($summarytypeCustom)) : ?>

          <?php if (!empty($summaryType)) : ?>
            <div class="summary">
              <?php
              echo wp_kses_post(strtr($summaryType, $summaryVars));
              ?>
            </div>
          <?php endif; ?>
        <?php endif; ?>






        <?php if ($postfixText) : ?>
          <span class="<?php echo $postfixClass; ?>">
            <?php echo $postfixText; ?>
          </span>
        <?php endif; ?>



      </<?php echo pg_tag_escape($wrapperTag); ?>>
    <?php

    endif;

    if (empty($wrapperTag)) :

    ?>
      <?php if ($iconsWrapPosition == 'beforePrefix') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
      <?php if ($prefixText) : ?>
        <span class="<?php echo esc_attr($prefixClass); ?>">
          <?php echo $prefixText; ?>
        </span>
      <?php endif; ?>

      <?php if ($iconsWrapPosition == 'afterPrefix') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>

      <?php if (!empty($skuLinkTo)) :
      ?>

        <a class='sku-text' target="<?php echo esc_attr($skuLinkTarget); ?>" rel="<?php echo esc_attr($skuRel); ?>">
          <?php if ($iconsWrapPosition == 'beforeSku') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($productSKu); ?>C
          <?php if ($iconsWrapPosition == 'afterSku') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        </a>
      <?php else : ?>
        <?php if ($iconsWrapPosition == 'beforeSku') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <span class='sku-text'>
          <?php echo wp_kses_post($productSKu); ?>
        </span>
        <?php if ($iconsWrapPosition == 'afterSku') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
      <?php endif; ?>



      <?php if ($iconsWrapPosition == 'beforePostfix') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
      <?php if ($postfixText) : ?>
        <span class="<?php echo $postfixClass; ?>">
          <?php echo $postfixText; ?>
        </span>
      <?php endif; ?>
      <?php if ($iconsWrapPosition == 'afterPostfix') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
    <?php

    endif;

    ?>








<?php return ob_get_clean();
  }
}

$PGBlockWooStarRate = new PGBlockWooStarRate();
