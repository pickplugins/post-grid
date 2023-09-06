<?php
if (!defined('ABSPATH')) exit();



class PGBlockFormFieldFileMulti
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/form-field-file-multi/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/form-field-file-multi/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/form-field-file-multi', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  array(
                'wrapper' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'label' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'label',
                            'for' => 'label',
                            'enable' => true,
                            'text' => 'Your Name',
                            'class' => 'pg-form-field-label',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'item' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'itemLabel' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'addItem' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'postion' => 'afterFiles',
                            'class' => '',
                            'text' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'file' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'value' => NULL,
                            'name' => '',
                            'required' => false,
                            'disabled' => false,
                            'multiple' => false,
                            'autofocus' => NULL,
                            'readonly' => false,
                            'maxCount' => 5,
                            'maxSize' => NULL,
                            'fileTypes' =>
                            array(
                                0 => 'jpg',
                                1 => 'jpeg',
                                2 => 'png',
                                3 => 'gif',
                                4 => 'pdf',
                            ),
                            'id' => '',
                            'class' => 'pg-form-field-file-multi',
                            'postion' => 'afterLabel',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'inputWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'enable' => true,
                            'class' => '',
                        ),
                    ),
                ),
                'labelWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'enable' => true,
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'errorWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'enable' => true,
                            'text' => '',
                            'position' => 'afterInput',
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'requiredWrap' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'span',
                            'enable' => true,
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'customCss' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'blockCssY' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' =>
                        array(),
                    ),
                ),
            )


        ));
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
        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $text = '';

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $labelWrap = isset($attributes['labelWrap']) ? $attributes['labelWrap'] : [];
        $labelWrapOptions = isset($labelWrap['options']) ? $labelWrap['options'] : [];

        $input = isset($attributes['file']) ? $attributes['file'] : [];
        $inputOptions = isset($input['options']) ? $input['options'] : [];
        $inputType = isset($inputOptions['type']) ? $inputOptions['type'] : 'text';
        $inputPlaceholder = isset($inputOptions['placeholder']) ? $inputOptions['placeholder'] : '';
        $inputValue = isset($inputOptions['value']) ? $inputOptions['value'] : '';
        $inputMaxCount = isset($inputOptions['maxCount']) ? (int) $inputOptions['maxCount'] : 3;

        $inputName = isset($inputOptions['name']) ? $inputOptions['name'] : $blockId;
        $inputRequired = isset($inputOptions['required']) ? $inputOptions['required'] : false;
        $inputDisabled = isset($inputOptions['disabled']) ? $inputOptions['disabled'] : false;
        $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;

        $inputName = $inputName . '[]';

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

        $addItem = isset($attributes['addItem']) ? $attributes['addItem'] : [];
        $addItemOptions = isset($addItem['options']) ? $addItem['options'] : [];
        $addItemPosition = isset($addItemOptions['position']) ? $addItemOptions['position'] : '';
        $addItemText = isset($addItemOptions['text']) ? $addItemOptions['text'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;







        ob_start();


?>

        <div class="<?php echo esc_attr($blockId); ?>">
            <div class='label-wrap'>

                <?php if ($labelEnable) : ?>
                    <label for=""><?php echo wp_kses_post($labelText); ?></label>
                <?php endif; ?>

                <?php if ($addItemPosition == 'afterLabel') : ?>
                    <div class='add-item'><?php echo wp_kses_post($addItemText); ?></div>
                <?php endif; ?>

                <?php if ($errorWrapPosition == 'afterLabel') : ?>
                    <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
                <?php endif; ?>



            </div>
            <div class='input-wrap'>


                <?php if ($addItemPosition == 'beforeFiles') : ?>
                    <div class='add-item'><?php echo wp_kses_post($addItemText); ?></div>
                <?php endif; ?>


                <?php

                for ($i = 0; $i < $inputMaxCount; $i++) {

                ?><div class="item">
                        <input type="file" placeholder="<?php echo esc_attr($inputPlaceholder); ?>" value="<?php echo esc_attr($inputValue); ?>" name="<?php echo esc_attr($inputName); ?>" <?php if ($inputRequired) : ?> required <?php endif; ?> <?php if ($inputDisabled) : ?> disabled <?php endif; ?> <?php if ($inputReadonly) : ?> readonly <?php endif; ?> />
                    </div>

                <?php
                }

                ?>





                <?php if ($addItemPosition == 'afterFiles') : ?>
                    <div class='add-item'><?php echo wp_kses_post($addItemText); ?></div>
                <?php endif; ?>

                <?php if ($errorWrapPosition == 'afterInput') : ?>
                    <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
                <?php endif; ?>
            </div>






        </div>

<?php
        return ob_get_clean();
    }
}

$PGBlockFormFieldFileMulti = new PGBlockFormFieldFileMulti();
