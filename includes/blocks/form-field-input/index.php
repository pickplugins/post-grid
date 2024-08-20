<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockFormFieldInput
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/form-field-input/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/form-field-input/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/form-field-input/block.json',
            array(

                'render_callback' => array($this, 'theHTML'),



            )
        );
    }

    function front_script($attributes) {}
    function front_style($attributes) {}

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {





        global $postGridCssY;
        global $PGFormProps;
        global $post;



        $formId = isset($block->context['post-grid/formId']) ? $block->context['post-grid/formId'] : '';

        $global_post_id = isset($post->ID) ? $post->ID : 0;

        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : $global_post_id;
        $global_post = get_post($post_ID);
        $currentUser = wp_get_current_user();




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
        $inputValueSource = isset($inputOptions['valueSource']) ? $inputOptions['valueSource'] : '';

        $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
        $inputNameOriginal = $inputName;
        $inputRequired = isset($inputOptions['required']) ? $inputOptions['required'] : false;
        $inputDisabled = isset($inputOptions['disabled']) ? $inputOptions['disabled'] : false;
        $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
        $inputObjMap = isset($inputOptions['objMap']) ? $inputOptions['objMap'] : "";

        $inputPattern = isset($inputOptions['pattern']) ? $inputOptions['pattern'] : '';
        $inputPatternCustom = isset($inputOptions['patternCustom']) ? $inputOptions['patternCustom'] : '';
        $includeMailBody = isset($inputOptions['includeMailBody']) ? $inputOptions['includeMailBody'] : false;

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



        $PGFormProps[$formId][$blockId] = ['errorText' => $errorWrapText, 'inputName' => $inputName, 'includeMail' => $includeMailBody, 'labelText' => $labelText, 'required' => $inputRequired];

        $inputName = form_wrap_input_name($inputOptions, ["blockId" => $blockId]);
        $inputValue = form_wrap_input_default_value($inputOptions, ["post_ID" => $post_ID, "blockId" => $blockId]);



        $obj['id'] = $post_ID;
        $obj['type'] = 'post';



        $wrapperClass = parse_css_class($wrapperClass, $obj);


        ob_start();


?>

        <div class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" id="<?php echo esc_attr($blockId); ?>">


            <div class='label-wrap'>

                <?php if ($labelEnable) : ?>
                    <label for="" class="font-medium text-slate-900 ">
                        <?php echo wp_kses_post($labelText); ?>
                    </label>
                <?php endif; ?>


                <?php if ($errorWrapPosition == 'afterlabel') : ?>
                    <?php if (!empty($errorWrapText)) : ?>
                        <div class='error-wrap'>
                            <?php echo wp_kses_post($errorWrapText); ?>
                        </div>
                    <?php endif; ?>
                <?php endif; ?>

            </div>
            <div class='input-wrap'>
                <input type="<?php echo esc_attr($inputType); ?>" placeholder="<?php echo esc_attr($inputPlaceholder); ?>" value="<?php echo esc_attr($inputValue); ?>" name="<?php echo esc_attr($inputName); ?>" <?php if (!empty($errorWrapText)) : ?> errortext="<?php echo esc_attr($errorWrapText); ?>" <?php endif; ?> <?php if ($inputDisabled) : ?> disabled <?php endif; ?> <?php if ($inputReadonly) : ?> readonly <?php endif; ?> <?php if ($inputRequired) : ?> required <?php endif; ?> />
                <?php if ($errorWrapPosition == 'afterInput') : ?>


                    <?php if (!empty($errorWrapText)) : ?>
                        <div class='error-wrap'>
                            <?php echo wp_kses_post($errorWrapText); ?>
                        </div>
                    <?php endif; ?>

                <?php endif; ?>
            </div>






        </div>

<?php



        return ob_get_clean();
    }
}

$PGBlockFormFieldInput = new PGBlockFormFieldInput();
