<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockFormWrap
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }


    function front_scripts($attributes)
    {
        wp_register_script('pgform-wrap_front_script', post_grid_plugin_url . 'src/blocks/form-wrap/front-scripts.js', [], '', true);
        wp_register_style('pgform-wrap_front_style', post_grid_plugin_url . 'src/blocks/form-wrap/index.css');

        if (has_block('post-grid/form-wrap')) {

            wp_enqueue_style('jquery-ui');

            wp_enqueue_script('jquery');
            wp_enqueue_script('jquery-ui-core');
            wp_enqueue_script('jquery-ui-accordion');
            wp_enqueue_script('jquery-effects-core');

            wp_enqueue_script('pgform-wrap_front_script');
            wp_enqueue_style('pgform-wrap_front_style');
        }
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layers/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/form-wrap', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' => ["post-grid/popupId"],
            'provides_context' => array(
                'post-grid/formId' => 'blockId',
            ),
            //'style' => [$this, 'front_style'],
            'render_callback' => array($this, 'theHTML'),
            'attributes' => array(
                'form' =>
                    array(
                        'type' => 'object',
                        'default' =>
                            array(
                                'type' => '',
                            ),
                    ),
                'form' =>
                    array(
                        'type' => 'object',
                        'default' =>
                            array(
                                'options' =>
                                    array(
                                        'type' => '',
                                    ),
                                'styles' =>
                                    array(),
                            ),
                    ),
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
                'visible' =>
                    array(
                        'type' => 'object',
                        'default' =>
                            array(),
                    ),
                'onSubmit' =>
                    array(
                        'type' => 'object',
                        'default' =>
                            array(),
                    ),
                'afterSubmit' =>
                    array(
                        'type' => 'object',
                        'default' =>
                            array(),
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

        global $PGFormProps;

        $popupId = isset($block->context['post-grid/popupId']) ? $block->context['post-grid/popupId'] : '';


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $visible = isset($attributes['visible']) ? $attributes['visible'] : [];


        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';
        $onSubmit = isset($attributes['onSubmit']) ? $attributes['onSubmit'] : '';
        $onProcess = isset($attributes['onProcess']) ? $attributes['onProcess'] : '';
        $afterSubmit = isset($attributes['afterSubmit']) ? $attributes['afterSubmit'] : '';


        $form = isset($attributes['form']) ? $attributes['form'] : [];
        $formOptions = isset($form['options']) ? $form['options'] : '';

        $formType = isset($formOptions['type']) ? $formOptions['type'] : '';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;

        $formArgs = [];
        $user_id = get_current_user_id();
        $user = wp_get_current_user();

        $roles = (array) $user->roles;

        ////var_dump($formType);

        $formArgs['type'] = $formType;
        $formArgs['isLogged'] = !empty($user_id) ? true : false;
        $formArgs['userId'] = $user_id;
        $formArgs['userRoles'] = $roles;
        $formArgs['userHasCapabilities'] = false;
        $formArgs['fieldInfo'] = isset($PGFormProps[$blockId]) ? $PGFormProps[$blockId] : '';
        $formArgs['popupId'] = $popupId;


        $formArgs['refererr'] = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : '';


        ob_start();






        ?>

                <div class="pg-form-wrap <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">



                    <div class="<?php echo esc_attr($blockId); ?>-loading pg-form-loading" style="display: none;">Loading...</div>

                    <form class=" " formId="<?php echo esc_attr($blockId); ?>" method="GET" onsubmitprams='<?php echo esc_attr(json_encode($onSubmit)); ?>' formArgs='<?php echo esc_attr(json_encode($formArgs)); ?>' <?php if (!empty($onProcess)): ?> onProcessArgs='<?php echo esc_attr(json_encode($onProcess)); ?>' <?php endif; ?>         <?php if (!empty($afterSubmit)): ?> afterSubmitArgs='<?php echo esc_attr(json_encode($afterSubmit)); ?>' <?php endif; ?>         <?php if (!empty($visible)): ?> data-pgfw-visible='<?php echo esc_attr(json_encode($visible)); ?>' <?php endif; ?>>
                        <?php echo $content ?>
                        <?php wp_nonce_field('form_wrap_nonce', 'form_wrap_nonce'); ?>
                    </form>

                    <div class="<?php echo esc_attr($blockId); ?>-responses pg-form-responses" style="display: none;"></div>
                </div>

        <?php

        return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockFormWrap();