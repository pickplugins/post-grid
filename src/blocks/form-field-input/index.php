<?php
if (!defined('ABSPATH')) exit();



class PGBlockFormFieldInput
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/form-field-input/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/form-field-input/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/form-field-input', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["post-grid/formId"],
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
                    ),
                ),
                'input' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'type' => 'text',
                            'placeholder' => 'Write your name',
                            'value' => '',
                            'valueSource' => '',

                            'name' => '',
                            'required' => false,
                            'disabled' => false,
                            'size' => false,
                            'minLength' => NULL,
                            'maxLength' => NULL,
                            'readonly' => false,
                            'step' => NULL,
                            'pattern' => NULL,
                            'patternCustom' => '',

                            'max' => NULL,
                            'min' => NULL,
                            'checked' => false,
                            'autocomplete' => false,
                            'includeMailBody' => true,

                            'id' => '',
                            'class' => 'pg-form-field-input',
                            'postion' => 'afterLabel',
                        ),
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
        global $PGFormProps;

        $formId = isset($block->context['post-grid/formId']) ? $block->context['post-grid/formId'] : '';


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
        $inputValueSource = isset($inputOptions['valueSource']) ? $inputOptions['valueSource'] : '';

        $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
        $inputRequired = isset($inputOptions['required']) ? $inputOptions['required'] : false;
        $inputDisabled = isset($inputOptions['disabled']) ? $inputOptions['disabled'] : false;
        $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
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


        $postGridCustomCss .= $customCss;


        //var_dump($formId);

        $PGFormProps[$formId][$blockId] = ['errorText' => $errorWrapText, 'inputName' => $inputName, 'includeMail' => $includeMailBody, 'labelText' => $labelText, 'required' => $inputRequired];


        if (!empty($inputValueSource)) {

            if ($inputValueSource == 'postID') {

                global $post;
                $inputValue = isset($post->ID) ? $post->ID : 0;
            } else if ($inputValueSource == 'postSlug') {
                global $post;
                $inputValue = isset($post->post_name) ? $post->post_name : 0;
            } else if ($inputValueSource == 'postTitle') {

                global $post;
                $inputValue = isset($post->post_title) ? $post->post_title : 0;
            } else if ($inputValueSource == 'postAuthorID') {

                global $post;
                $inputValue = isset($post->post_author) ? $post->post_author : 0;
            } else if ($inputValueSource == 'postTags') {
                $inputValue = '';
            } else if ($inputValueSource == 'postCategoryIds') {
                $inputValue = '';
            } else if ($inputValueSource == 'postCategorySlugs') {
                $inputValue = '';
            } else if ($inputValueSource == 'userId') {

                $currentUser = wp_get_current_user();
                echo var_export($currentUser, true);

                $inputValue = isset($currentUser->ID) ? $currentUser->ID : 0;
            } else if ($inputValueSource == 'userEmail') {

                $currentUser = wp_get_current_user();
                $inputValue = isset($currentUser->user_email) ? $currentUser->user_email : '';
            } else if ($inputValueSource == 'userDisplayName') {
                $currentUser = wp_get_current_user();
                $inputValue = isset($currentUser->display_name) ? $currentUser->display_name : '';
            } else if ($inputValueSource == 'userLogin') {
                $currentUser = wp_get_current_user();
                $inputValue = isset($currentUser->user_login) ? $currentUser->user_login : '';
            } else if ($inputValueSource == 'userNicename') {
                $currentUser = wp_get_current_user();
                $inputValue = isset($currentUser->user_nicename) ? $currentUser->user_nicename : '';
            }
        }



        ob_start();

?>

        <div class="<?php echo esc_attr($blockId); ?> pg-form-field" id="<?php echo esc_attr($blockId); ?>">


            <div class='label-wrap'>

                <?php if ($labelEnable) : ?>
                    <label for=""><?php echo wp_kses_post($labelText); ?></label>
                <?php endif; ?>


                <?php if ($errorWrapPosition == 'afterlabel') : ?>
                    <?php if (!empty($errorWrapText)) : ?>
                        <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
                    <?php endif; ?>
                <?php endif; ?>

            </div>
            <div class='input-wrap'>
                <input type="<?php echo esc_attr($inputType); ?>" placeholder="<?php echo esc_attr($inputPlaceholder); ?>" value="<?php echo esc_attr($inputValue); ?>" name="<?php echo esc_attr($inputName); ?>" <?php if (!empty($errorWrapText)) : ?> errortext="<?php echo esc_attr($errorWrapText); ?>" <?php endif; ?> <?php if ($inputDisabled) : ?> disabled <?php endif; ?> <?php if ($inputReadonly) : ?> readonly <?php endif; ?> />
                <?php if ($errorWrapPosition == 'afterInput') : ?>


                    <?php if (!empty($errorWrapText)) : ?>
                        <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
                    <?php endif; ?>

                <?php endif; ?>
            </div>






        </div>

<?php

        return ob_get_clean();
    }
}

$PGBlockFormFieldInput = new PGBlockFormFieldInput();
