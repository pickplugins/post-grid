<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockWooStock
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/woo-price/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/woo-price/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/woo-stock/block.json',
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




    global $postGridCssY;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';



    $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
    $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
    $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : [];

    $stock = isset($attributes['stock']) ? $attributes['stock'] : [];
    $stockOptions = isset($stock['options']) ? $stock['options'] : [];
    $stockInStock = isset($stockOptions['inStock']) ? $stockOptions['inStock'] : [];
    $stockOutOfStock = isset($stockOptions['outOfStock']) ? $stockOptions['outOfStock'] : [];
    $stockBackOrder = isset($stockOptions['backOrder']) ? $stockOptions['backOrder'] : [];

    $stockIconLibrary = isset($stockOptions['library']) ? $stockOptions['library'] : '';
    $stockIconSrcType = isset($stockOptions['srcType']) ? $stockOptions['srcType'] : '';
    $stockIconSrc = isset($stockOptions['iconSrc']) ? $stockOptions['iconSrc'] : '';

    $outOfStock = isset($attributes['outOfStock']) ? $attributes['outOfStock'] : '';
    $outOfStockOptions = isset($outOfStock['options']) ? $outOfStock['options'] : [];

    $outOfStockIconLibrary = isset($outOfStockOptions['library']) ? $outOfStockOptions['library'] : '';
    $outOfStockIconSrcType = isset($outOfStockOptions['srcType']) ? $outOfStockOptions['srcType'] : '';
    $outOfStockIconSrc = isset($outOfStockOptions['iconSrc']) ? $outOfStockOptions['iconSrc'] : '';

    $backOrder = isset($attributes['backOrder']) ? $attributes['backOrder'] : '';
    $backOrderOptions = isset($backOrder['options']) ? $backOrder['options'] : [];

    $backOrderIconLibrary = isset($backOrderOptions['library']) ? $backOrderOptions['library'] : '';
    $backOrderIconSrcType = isset($backOrderOptions['srcType']) ? $backOrderOptions['srcType'] : '';
    $backOrderIconSrc = isset($backOrderOptions['iconSrc']) ? $backOrderOptions['iconSrc'] : '';




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



    global $product;



    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }


    $onStock = ($product != null) ? $product->get_stock_status() : '';

    if ($onStock == "instock") {
      $iconSrc = $stockIconSrc;
      if (!empty($iconSrc)) {
        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
      }
    }
    if ($onStock == "outofstock") {
      $iconSrc = $outOfStockIconSrc;
      if (!empty($iconSrc)) {
        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
      }
    }
    if ($onStock == "onbackorder") {
      $iconSrc = $backOrderIconSrc;
      if (!empty($iconSrc)) {
        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
      }
    }









    //$fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';


    // ////var_dump($product->get_price());
    // ////var_dump($product->get_onStock());
    // ////var_dump($product->get_onStock());


    $product_type = ($product != null) ? $product->get_type() : '';
    // $currency_symbol = get_woocommerce_currency_symbol();

    $manageStock = ($product != null) ? $product->get_manage_stock() : '';

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);
    $prefixText = parse_css_class($prefixText, $obj);
    $postfixText = parse_css_class($postfixText, $obj);

    ob_start();


    if (!empty($wrapperTag)) :

?>
      <<?php echo tag_escape($wrapperTag); ?> class="
				<?php echo esc_attr($blockId); ?>
				<?php echo esc_attr($wrapperClass); ?>">


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

        <?php

        if ($manageStock) :
          $onStock = ($product != null) ? $product->get_stock_status() : '';

        ?>


          <?php if ($onStock == "instock") : ?>

            <span class='stock'>

              <?php
              echo wp_kses_post($stockInStock);
              ?>


            </span>

          <?php endif; ?>
          <?php if ($onStock == "outofstock") : ?>

            <span class='out-of-stock'>

              <?php
              echo wp_kses_post($stockOutOfStock);
              ?>


            </span>

          <?php endif; ?>
          <?php if ($onStock == "onbackorder") : ?>

            <span class='backorder'>

              <?php
              echo wp_kses_post($stockBackOrder);
              ?>


            </span>

          <?php endif; ?>

        <?php
        endif;
        if (!$manageStock) :

          $onStock = ($product != null) ? $product->get_stock_status() : '';

        ?>
          <?php if ($onStock == "instock") : ?>

            <span class='stock'>

              <?php
              echo wp_kses_post($stockInStock);
              ?>


            </span>

          <?php endif; ?>
          <?php if ($onStock == "outofstock") : ?>

            <span class='out-of-stock'>

              <?php
              echo wp_kses_post($stockOutOfStock);
              ?>


            </span>

          <?php endif; ?>
          <?php if ($onStock == "onbackorder") : ?>

            <span class='backorder'>

              <?php
              echo wp_kses_post($stockBackOrder);
              ?>


            </span>

          <?php endif; ?>

        <?php

        endif;

        ?>

        <?php if ($iconPosition == 'beforePostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo $postfixClass; ?>">
            <?php echo $postfixText; ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

      </<?php echo tag_escape($wrapperTag); ?>>
    <?php

    endif;


    ?>








<?php return ob_get_clean();
  }
}

$PGBlockWooStock = new PGBlockWooStock();
