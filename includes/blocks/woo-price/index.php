<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockWooPrice
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
      post_grid_plugin_dir . 'build/blocks/woo-price/block.json',
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
    $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';






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













    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';




    $product_type = ($product != null) ? $product->get_type() : '';

    if (function_exists("get_woocommerce_currency_symbol")) {

      $currency_symbol = get_woocommerce_currency_symbol();
    } else {
      $currency_symbol = "$";
    }

    $obj['id'] = $post_ID;
    $obj['type'] = 'post';


    $wrapperClass = parse_css_class($wrapperClass, $obj);
    $prefixText = parse_css_class($prefixText, $obj);
    $postfixText = parse_css_class($postfixText, $obj);


    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);

      // var_dump($isVisible);

      if (!$isVisible) return;
    }

    // //* Visible condition


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

        <?php if ($product_type == 'simple' || $product_type == 'external') :
          $regular_price = ($product != null) ? $product->get_regular_price() : '';
          $sale_price = ($product != null) ? $product->get_sale_price() : ''; ?>

          <?php if (empty($sale_price)) : ?>

            <span class=' regular'>
              <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($regular_price); ?>
            </span>

          <?php endif; ?>
          <?php if (!empty($sale_price)) : ?>


            <span class='regular'>
              <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($regular_price); ?>
            </span>

            <span class=' discounted'>
              <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($sale_price); ?>
            </span>

          <?php endif; ?>





        <?php endif;
        if ($product_type == 'variable') :
          $min_price = ($product != null) ? $product->get_variation_price() : '';
          $max_price = ($product != null) ? $product->get_variation_price('max') : '';
        ?>
          <span class='regular'>
            <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($min_price); ?>
          </span>
          <span class='regular'>
            <?php echo wp_kses_post($separatorText); ?>
          </span>
          <span class='regular'>
            <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($max_price); ?>
          </span>
        <?php endif;

        if ($product_type == 'grouped') :
          $child_prices = array();
          foreach ($product->get_children() as $child_id) {
            $child_prices[] = get_post_meta($child_id, '_price', true);
          }
          $child_prices = array_unique($child_prices);
          $min_price = min($child_prices);
          $max_price = max($child_prices);
        ?>
          <span class='regular'>
            <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($min_price); ?>
          </span>
          <span class='regular'>
            <?php echo wp_kses_post($separatorText); ?>
          </span>
          <span class='regular'>
            <span class='currency'><?php echo wp_kses_post($currency_symbol); ?></span><?php echo wp_kses_post($max_price); ?>
          </span>
        <?php endif; ?>

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
    <?php endif; ?>


<?php return ob_get_clean();
  }
}

$PGBlockWooPrice = new PGBlockWooPrice();
