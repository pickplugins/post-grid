<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockFormFieldHcaptcha
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }

  function front_scripts($attributes)
  {
    wp_register_script('hcaptcha-script', 'https://hcaptcha.com/1/api.js');

    if (has_block('post-grid/form-field-hcaptcha')) {

      wp_enqueue_script('hcaptcha-script');
    }
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    // wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/text/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/text/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/form-field-hcaptcha/block.json',
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

    $post_grid_block_editor = get_option('post_grid_block_editor');
    $apiKeys = isset($post_grid_block_editor['apiKeys']) ? $post_grid_block_editor['apiKeys'] : [];
    $hCAPTCHA = isset($apiKeys['hCAPTCHA']['args']) ? $apiKeys['hCAPTCHA']['args'] : [];
    $site_key = isset($hCAPTCHA['site_key']) ? $hCAPTCHA['site_key'] : "";
    // var_dump($site_key);
    // $secret_key = isset($hCAPTCHA['secret_key']) ? $hCAPTCHA['secret_key'] : "";
    // $version = isset($hCAPTCHA['version']) ? $hCAPTCHA['version'] : "v2Checkbox";



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $text = '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';



    $labelWrap = isset($attributes['labelWrap']) ? $attributes['labelWrap'] : [];
    $labelWrapOptions = isset($labelWrap['options']) ? $labelWrap['options'] : [];

    $input = isset($attributes['input']) ? $attributes['input'] : [];
    $inputOptions = isset($input['options']) ? $input['options'] : [];
    $inputType = isset($inputOptions['type']) ? $inputOptions['type'] : 'text';
    $inputPlaceholder = isset($inputOptions['placeholder']) ? $inputOptions['placeholder'] : '';
    $inputValue = isset($inputOptions['value']) ? $inputOptions['value'] : '';
    $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
    $inputRequired = isset($inputOptions['required']) ? $inputOptions['required'] : false;
    $inputDisabled = isset($inputOptions['disabled']) ? $inputOptions['disabled'] : false;
    $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
    $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
    $inputAutocomplete = isset($inputOptions['autocomplete']) ? $inputOptions['autocomplete'] : false;
    $inputSpellcheck = isset($inputOptions['spellcheck']) ? $inputOptions['spellcheck'] : false;
    $inputAutocorrect = isset($inputOptions['autocorrect']) ? $inputOptions['autocorrect'] : false;

    $inputMinLength = isset($inputOptions['minLength']) ? $inputOptions['minLength'] : null;
    $inputMaxLength = isset($inputOptions['maxLength']) ? $inputOptions['maxLength'] : null;
    $inputCols = isset($inputOptions['cols']) ? $inputOptions['cols'] : null;
    $inputRows = isset($inputOptions['rows']) ? $inputOptions['rows'] : null;


    $inputWrap = isset($attributes['inputWrap']) ? $attributes['inputWrap'] : [];
    $inputWrapOptions = isset($inputWrap['options']) ? $inputWrap['options'] : [];


    $label = isset($attributes['label']) ? $attributes['label'] : [];
    $labelOptions = isset($label['options']) ? $label['options'] : [];
    $labelEnable = isset($labelOptions['enable']) ? $labelOptions['enable'] : true;
    $labelText = isset($labelOptions['text']) ? $labelOptions['text'] : '';



    $errorWrap = isset($attributes['errorWrap']) ? $attributes['errorWrap'] : [];
    $errorWrapOptions = isset($errorWrap['options']) ? $errorWrap['options'] : [];
    $errorWrapPosition = isset($errorWrapOptions['position']) ? $errorWrapOptions['position'] : '';
    $errorWrapText = isset($errorWrapOptions['text']) ? $errorWrapOptions['text'] : '';


    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);


    ob_start();


?>

<div class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>"
  id="<?php echo esc_attr($blockId); ?>">


  <div class='label-wrap'>

    <?php if ($labelEnable) : ?>
    <label for="" class="font-medium text-slate-900 "><?php echo wp_kses_post($labelText); ?></label>
    <?php endif; ?>


    <?php if ($errorWrapPosition == 'afterlabel') : ?>
    <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
    <?php endif; ?>


  </div>
  <div class='input-wrap'>



    <div class="h-captcha" data-sitekey="<?php echo wp_kses_post($site_key); ?>"></div>


  </div>






</div>

<?php

    return ob_get_clean();
  }
}

$PGBlockFormFieldHcaptcha = new PGBlockFormFieldHcaptcha();