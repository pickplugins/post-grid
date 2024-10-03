<?php
if (!defined('ABSPATH'))
  exit();
class PGBlockFormWrap
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      post_grid_plugin_dir . 'build/blocks/form-wrap/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('post-grid/form-wrap')) {
      wp_enqueue_script('pg_block_scripts');
      wp_enqueue_style('pg_block_styles');
    }
    global $postGridCssY;
    global $PGFormProps;
    $popupId = isset($block->context['post-grid/popupId']) ? $block->context['post-grid/popupId'] : '';
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    $rules = isset($visible['rules']) ? $visible['rules'] : [];
    $onSubmit = isset($attributes['onSubmit']) ? $attributes['onSubmit'] : '';
    $onProcess = isset($attributes['onProcess']) ? $attributes['onProcess'] : '';
    $afterSubmit = isset($attributes['afterSubmit']) ? $attributes['afterSubmit'] : '';
    $form = isset($attributes['form']) ? $attributes['form'] : [];
    $formOptions = isset($form['options']) ? $form['options'] : '';
    $formClass = isset($formOptions['class']) ? $formOptions['class'] : '';
    $formType = isset($formOptions['type']) ? $formOptions['type'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    $formArgs = [];
    $user_id = get_current_user_id();
    $user = wp_get_current_user();
    $roles = (array) $user->roles;
    $formArgs['type'] = $formType;
    //$formArgs['isLogged'] = !empty($user_id) ? true : false;
    //$formArgs['userId'] = $user_id;
    // $formArgs['userRoles'] = $roles;
    //$formArgs['userHasCapabilities'] = false;
    $formArgs['fieldInfo'] = isset($PGFormProps[$blockId]) ? $PGFormProps[$blockId] : '';
    $formArgs['popupId'] = $popupId;
    $formArgs['refererr'] = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : '';
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
    <div
      class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
      <form class="<?php echo esc_attr($formClass); ?> " id="<?php echo esc_attr($blockId); ?>"
        data-formId="<?php echo esc_attr($blockId); ?>" method="GET"
        data-onsubmitprams='<?php echo esc_attr(json_encode($onSubmit)); ?>'
        data-formArgs='<?php echo esc_attr(json_encode($formArgs)); ?>' <?php if (!empty($onProcess)) : ?>
        data-onProcessArgs='<?php echo esc_attr(json_encode($onProcess)); ?>' <?php endif; ?>
        <?php if (!empty($afterSubmit)) : ?> data-afterSubmitArgs='<?php echo esc_attr(json_encode($afterSubmit)); ?>'
        <?php endif; ?> <?php if (!empty($visible)) : ?> data-pgfw-visible='<?php echo esc_attr(json_encode($visible)); ?>'
        <?php endif; ?>>
        <?php echo ($content) ?>
        <?php wp_nonce_field('wp_rest', '_wpnonce'); ?>
      </form>
      <div class="<?php echo esc_attr($blockId); ?>-loading pg-form-loading" style="display: none;">Loading...</div>
      <div class="<?php echo esc_attr($blockId); ?>-responses pg-form-responses" style="display: none;"></div>
    </div>
<?php
    return ob_get_clean();
  }
}
$BlockPostGrid = new PGBlockFormWrap();
