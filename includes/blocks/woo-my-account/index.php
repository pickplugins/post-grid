<?php
if (!defined('ABSPATH'))
  exit();
class PGBlockWooMyAccount
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      post_grid_plugin_dir . 'build/blocks/woo-my-account/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('post-grid/woo-my-account')) {
      wp_enqueue_script('pg_block_scripts');
    }
    global $postGridCssY;
    global $postGridScriptData;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : "beforeLabel";
    $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
    $items = isset($elements['items']) ? $elements['items'] : [];
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    $postGridScriptData[$blockId]['elements'] = $elements;
    $postGridScriptData[$blockId]['icon']['position'] = $iconPosition;
    $blockArgs = [
      'blockId' => $blockId,
    ];
    foreach ($items as $item) {
      $siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';
      $iconLibrary = isset($item['library']) ? $item['library'] : '';
      if ($iconLibrary == 'fontAwesome') {
        wp_enqueue_style('fontawesome-icons');
      } else if ($iconLibrary == 'iconFont') {
        wp_enqueue_style('icofont-icons');
      } else if ($iconLibrary == 'bootstrap') {
        wp_enqueue_style('bootstrap-icons');
      }
    }
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
      <<?php echo pg_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockAlign); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" data-blockargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <?php
        echo do_shortcode("[woocommerce_my_account]");
        //woocommerce_output_product_data_tabs();
        ?>
      </<?php echo pg_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    ?>
<?php
    return ob_get_clean();
  }
}
$PGBlockWooMyAccount = new PGBlockWooMyAccount();
