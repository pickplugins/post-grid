<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockFormFieldFile
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/form-field-file/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/form-field-file/index.js', array('wp-blocks', 'wp-element'));


        register_block_type(post_grid_plugin_dir . 'src/blocks/form-field-file/block.json', array(
            
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


        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



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


        $postGridCustomCss .= $customCss;



        ////var_dump($content);




        ob_start();


        ?>

                <div class="<?php echo esc_attr($blockId); ?>">


                    <div class='label-wrap'>

                        <?php if ($labelEnable): ?>
                                <label for=""><?php echo wp_kses_post($labelText); ?></label>
                        <?php endif; ?>


                        <?php if ($errorWrapPosition == 'afterlabel'): ?>
                                <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
                        <?php endif; ?>


                    </div>
                    <div class='input-wrap'>
                        <input type="file" 
                        placeholder="<?php echo esc_attr($inputPlaceholder); ?>" 
                        value="<?php echo esc_attr($inputValue); ?>" name="<?php echo esc_attr($inputName); ?>" <?php if ($inputRequired): ?> required <?php endif; ?>         <?php if ($inputDisabled): ?> disabled <?php endif; ?>         
                            <?php if ($inputReadonly): ?> readonly <?php endif; ?> />
                        <?php if ($errorWrapPosition == 'afterInput'): ?>
                                <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>

                        <?php endif; ?>
                    </div>






                </div>

        <?php
        return ob_get_clean();
    }
}

$PGBlockFormFieldFile = new PGBlockFormFieldFile();