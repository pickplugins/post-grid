<?php
if (!defined('ABSPATH')) exit;  // if direct access
add_filter('post_grid_layout_elements', 'post_grid_wpjobmanager_layout_elements', 5);
function post_grid_wpjobmanager_layout_elements($elements_group)
{
    $elements_group['wpjobmanager'] = array(
        'group_title' => 'WP Job Manager',
        'items' => array(
            'wpjobmanager_location' => array('name' => esc_html__('Location', 'post-grid')),
            'wpjobmanager_company_name' => array('name' => esc_html__('Company name', 'post-grid')),
            'wpjobmanager_company_website' => array('name' => esc_html__('Company website', 'post-grid')),
            'wpjobmanager_company_tagline' => array('name' => esc_html__('Company tagline', 'post-grid')),
            'wpjobmanager_job_expires' => array('name' => esc_html__('Job expire date', 'post-grid')),
        ),
    );
    return $elements_group;
}
add_action('post_grid_layout_element_option_wpjobmanager_location', 'post_grid_layout_element_option_wpjobmanager_location');
function post_grid_layout_element_option_wpjobmanager_location($parameters)
{
    $settings_tabs_field = new settings_tabs_field();
    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';
    $wck_key = isset($element_data['wck_key']) ? $element_data['wck_key'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = !empty($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '%s';
    $css = isset($element_data['css']) ? $element_data['css'] : '';
    $css_hover = isset($element_data['css_hover']) ? $element_data['css_hover'] : '';
?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>
            <span class="expand"><?php echo esc_html__('Location', 'post-grid'); ?></span>
        </div>
        <div class="element-options options">
            <?php
            $args = array(
                'id'        => 'wrapper_html',
                'css_id'        => $element_index . '_wrapper_html',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Wrapper html', 'post-grid'),
                // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                // phpcs:ignore WordPress.WP.I18n.MissingTranslatorsComment
                'details'    => esc_html__('Write wrapper html, use <code>%s</code> to replace output. ex: <code>Email: &lt;a href="mailto:%s">Send mail&lt;/a></code>', 'post-grid'),
                'type'        => 'text',
                'value'        => $wrapper_html,
                'default'        => '',
                'placeholder'        => 'Email: %s',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'color',
                'css_id'        => $element_index . '_wpjobmanager_location',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Color', 'post-grid'),
                'details'    => esc_html__('Title text color.', 'post-grid'),
                'type'        => 'colorpicker',
                'value'        => $color,
                'default'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_size',
                'css_id'        => $element_index . '_font_size',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Font size', 'post-grid'),
                'details'    => esc_html__('Set font size.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_size,
                'default'        => '',
                'placeholder'        => '14px',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_family',
                'css_id'        => $element_index . '_font_family',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Font family', 'post-grid'),
                'details'    => esc_html__('Set font family.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_family,
                'default'        => '',
                'placeholder'        => 'Open Sans',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'margin',
                'css_id'        => $element_index . '_margin',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Margin', 'post-grid'),
                'details'    => esc_html__('Set margin.', 'post-grid'),
                'type'        => 'text',
                'value'        => $margin,
                'default'        => '',
                'placeholder'        => '5px 0',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'text_align',
                'css_id'        => $element_index . '_text_align',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Text align', 'post-grid'),
                'details'    => esc_html__('Choose text align.', 'post-grid'),
                'type'        => 'select',
                'value'        => $text_align,
                'default'        => 'left',
                'args'        => array('left' => esc_html__('Left', 'post-grid'), 'right' => esc_html__('Right', 'post-grid'), 'center' => esc_html__('Center', 'post-grid')),
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css',
                'css_id'        => $element_index . '_css',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Custom CSS', 'post-grid'),
                'details'    => esc_html__('Set csutom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css_hover',
                'css_id'        => $element_index . '_css_hover',
                'parent' => $input_name . '[wpjobmanager_location]',
                'title'        => esc_html__('Hover CSS', 'post-grid'),
                'details'    => esc_html__('Set hover custom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css_hover,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <textarea readonly type="text" onclick="this.select();">.element_<?php echo esc_attr($element_index); ?>{}</textarea>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'use_css',
                'title'        => esc_html__('Use of CSS', 'post-grid'),
                'details'    => esc_html__('Use following class selector to add custom CSS for this element.', 'post-grid'),
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ?>
        </div>
    </div>
    <?php
}
add_action('post_grid_layout_element_wpjobmanager_location', 'post_grid_layout_element_wpjobmanager_location');
function post_grid_layout_element_wpjobmanager_location($args)
{
    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';
    if (empty($post_id)) return;
    $title = get_the_title($post_id);
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $meta_value = get_post_meta($post_id, '_job_location', true);
    if (!empty($meta_value)) :
        $meta_value = sprintf($wrapper_html, $meta_value);
    ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> wpjobmanager_location ">
            <?php echo esc_html($meta_value); ?>
        </div>
    <?php
    endif;
}
add_action('post_grid_layout_element_css_wpjobmanager_location', 'post_grid_layout_element_css_wpjobmanager_location', 10);
function post_grid_layout_element_css_wpjobmanager_location($args)
{
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';
    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : 'left';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo esc_attr($layout_id);
                ?>.element_<?php echo esc_attr($index);
                            ?> {
            <?php if (!empty($color)) : ?>color: <?php echo esc_attr($color);
                                                    ?>;
            <?php endif;
            ?><?php if (!empty($font_size)) : ?>font-size: <?php echo esc_attr($font_size);
                                                            ?>;
            <?php endif;
            ?><?php if (!empty($font_family)) : ?>font-family: <?php echo esc_attr($font_family);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($margin)) : ?>margin: <?php echo esc_attr($margin);
                                                        ?>;
            <?php endif;
            ?><?php if (!empty($text_align)) : ?>text-align: <?php echo esc_attr($text_align);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($css)) : ?><?php echo esc_attr($css);
                                            ?><?php endif;
                                                ?>
        }

        <?php if (!empty($css_hover)) : ?>.layout-<?php echo esc_attr($layout_id);
                                                    ?>.element_<?php echo esc_attr($index);
                                                                ?>:hover {
            <?php echo esc_attr($css_hover);
            ?>
        }

        <?php endif;
        ?>
    </style>
<?php
}
add_action('post_grid_layout_element_option_wpjobmanager_company_name', 'post_grid_layout_element_option_wpjobmanager_company_name');
function post_grid_layout_element_option_wpjobmanager_company_name($parameters)
{
    $settings_tabs_field = new settings_tabs_field();
    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';
    $wck_key = isset($element_data['wck_key']) ? $element_data['wck_key'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = !empty($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '%s';
    $css = isset($element_data['css']) ? $element_data['css'] : '';
    $css_hover = isset($element_data['css_hover']) ? $element_data['css_hover'] : '';
?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>
            <span class="expand"><?php echo esc_html__('Company Name', 'post-grid'); ?></span>
        </div>
        <div class="element-options options">
            <?php
            $args = array(
                'id'        => 'wrapper_html',
                'css_id'        => $element_index . '_wrapper_html',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Wrapper html', 'post-grid'),
                // phpcs:ignore WordPress.WP.I18n.MissingTranslatorsComment
                // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                'details'    => esc_html__('Write wrapper html, use <code>%s</code> to replace output. ex: <code>Company name: %s</code>', 'post-grid'),
                'type'        => 'text',
                'value'        => $wrapper_html,
                'default'        => '',
                'placeholder'        => 'Company name: %s',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'color',
                'css_id'        => $element_index . '_wpjobmanager_company_name',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Color', 'post-grid'),
                'details'    => esc_html__('Title text color.', 'post-grid'),
                'type'        => 'colorpicker',
                'value'        => $color,
                'default'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_size',
                'css_id'        => $element_index . '_font_size',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Font size', 'post-grid'),
                'details'    => esc_html__('Set font size.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_size,
                'default'        => '',
                'placeholder'        => '14px',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_family',
                'css_id'        => $element_index . '_font_family',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Font family', 'post-grid'),
                'details'    => esc_html__('Set font family.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_family,
                'default'        => '',
                'placeholder'        => 'Open Sans',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'margin',
                'css_id'        => $element_index . '_margin',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Margin', 'post-grid'),
                'details'    => esc_html__('Set margin.', 'post-grid'),
                'type'        => 'text',
                'value'        => $margin,
                'default'        => '',
                'placeholder'        => '5px 0',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'text_align',
                'css_id'        => $element_index . '_text_align',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Text align', 'post-grid'),
                'details'    => esc_html__('Choose text align.', 'post-grid'),
                'type'        => 'select',
                'value'        => $text_align,
                'default'        => 'left',
                'args'        => array('left' => esc_html__('Left', 'post-grid'), 'right' => esc_html__('Right', 'post-grid'), 'center' => esc_html__('Center', 'post-grid')),
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css',
                'css_id'        => $element_index . '_css',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Custom CSS', 'post-grid'),
                'details'    => esc_html__('Set csutom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css_hover',
                'css_id'        => $element_index . '_css_hover',
                'parent' => $input_name . '[wpjobmanager_company_name]',
                'title'        => esc_html__('Hover CSS', 'post-grid'),
                'details'    => esc_html__('Set hover custom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css_hover,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <textarea readonly type="text" onclick="this.select();">.element_<?php echo esc_attr($element_index); ?>{}</textarea>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'use_css',
                'title'        => esc_html__('Use of CSS', 'post-grid'),
                'details'    => esc_html__('Use following class selector to add custom CSS for this element.', 'post-grid'),
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ?>
        </div>
    </div>
    <?php
}
add_action('post_grid_layout_element_wpjobmanager_company_name', 'post_grid_layout_element_wpjobmanager_company_name');
function post_grid_layout_element_wpjobmanager_company_name($args)
{
    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';
    if (empty($post_id)) return;
    $title = get_the_title($post_id);
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $meta_value = get_post_meta($post_id, '_company_name', true);
    if (!empty($meta_value)) :
        $meta_value = sprintf($wrapper_html, $meta_value);
    ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> wpjobmanager_company_name ">
            <?php echo esc_html($meta_value); ?>
        </div>
    <?php
    endif;
}
add_action('post_grid_layout_element_css_wpjobmanager_company_name', 'post_grid_layout_element_css_wpjobmanager_company_name', 10);
function post_grid_layout_element_css_wpjobmanager_company_name($args)
{
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';
    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : 'left';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo esc_attr($layout_id);
                ?>.element_<?php echo esc_attr($index);
                            ?> {
            <?php if (!empty($color)) : ?>color: <?php echo esc_attr($color);
                                                    ?>;
            <?php endif;
            ?><?php if (!empty($font_size)) : ?>font-size: <?php echo esc_attr($font_size);
                                                            ?>;
            <?php endif;
            ?><?php if (!empty($font_family)) : ?>font-family: <?php echo esc_attr($font_family);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($margin)) : ?>margin: <?php echo esc_attr($margin);
                                                        ?>;
            <?php endif;
            ?><?php if (!empty($text_align)) : ?>text-align: <?php echo esc_attr($text_align);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($css)) : ?><?php echo esc_attr($css);
                                            ?><?php endif;
                                                ?>
        }

        <?php if (!empty($css_hover)) : ?>.layout-<?php echo esc_attr($layout_id);
                                                    ?>.element_<?php echo esc_attr($index);
                                                                ?>:hover {
            <?php echo esc_attr($css_hover);
            ?>
        }

        <?php endif;
        ?>
    </style>
<?php
}
add_action('post_grid_layout_element_option_wpjobmanager_company_website', 'post_grid_layout_element_option_wpjobmanager_company_website');
function post_grid_layout_element_option_wpjobmanager_company_website($parameters)
{
    $settings_tabs_field = new settings_tabs_field();
    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';
    $wck_key = isset($element_data['wck_key']) ? $element_data['wck_key'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = !empty($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '%s';
    $css = isset($element_data['css']) ? $element_data['css'] : '';
    $css_hover = isset($element_data['css_hover']) ? $element_data['css_hover'] : '';
?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>
            <span class="expand"><?php echo esc_html__('Company website', 'post-grid'); ?></span>
        </div>
        <div class="element-options options">
            <?php
            $args = array(
                'id'        => 'wrapper_html',
                'css_id'        => $element_index . '_wrapper_html',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Wrapper html', 'post-grid'),
                // phpcs:ignore WordPress.WP.I18n.MissingTranslatorsComment
                // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                'details'    => esc_html__('Write wrapper html, use <code>%s</code> to replace output. ex: <code>Website: &lt;a href="%s">Go link&lt;/a></code> <code>Website: &lt;a href="%1$s">%2$s&lt;/a></code>', 'post-grid'),
                'type'        => 'text',
                'value'        => $wrapper_html,
                'default'        => '',
                'placeholder'        => 'Website: %s',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'color',
                'css_id'        => $element_index . '_wpjobmanager_company_website',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Color', 'post-grid'),
                'details'    => esc_html__('Title text color.', 'post-grid'),
                'type'        => 'colorpicker',
                'value'        => $color,
                'default'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_size',
                'css_id'        => $element_index . '_font_size',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Font size', 'post-grid'),
                'details'    => esc_html__('Set font size.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_size,
                'default'        => '',
                'placeholder'        => '14px',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_family',
                'css_id'        => $element_index . '_font_family',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Font family', 'post-grid'),
                'details'    => esc_html__('Set font family.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_family,
                'default'        => '',
                'placeholder'        => 'Open Sans',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'margin',
                'css_id'        => $element_index . '_margin',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Margin', 'post-grid'),
                'details'    => esc_html__('Set margin.', 'post-grid'),
                'type'        => 'text',
                'value'        => $margin,
                'default'        => '',
                'placeholder'        => '5px 0',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'text_align',
                'css_id'        => $element_index . '_text_align',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Text align', 'post-grid'),
                'details'    => esc_html__('Choose text align.', 'post-grid'),
                'type'        => 'select',
                'value'        => $text_align,
                'default'        => 'left',
                'args'        => array('left' => esc_html__('Left', 'post-grid'), 'right' => esc_html__('Right', 'post-grid'), 'center' => esc_html__('Center', 'post-grid')),
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css',
                'css_id'        => $element_index . '_css',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Custom CSS', 'post-grid'),
                'details'    => esc_html__('Set csutom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css_hover',
                'css_id'        => $element_index . '_css_hover',
                'parent' => $input_name . '[wpjobmanager_company_website]',
                'title'        => esc_html__('Hover CSS', 'post-grid'),
                'details'    => esc_html__('Set hover custom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css_hover,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <textarea readonly type="text" onclick="this.select();">.element_<?php echo esc_attr($element_index); ?>{}</textarea>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'use_css',
                'title'        => esc_html__('Use of CSS', 'post-grid'),
                'details'    => esc_html__('Use following class selector to add custom CSS for this element.', 'post-grid'),
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ?>
        </div>
    </div>
    <?php
}
add_action('post_grid_layout_element_wpjobmanager_company_website', 'post_grid_layout_element_wpjobmanager_company_website');
function post_grid_layout_element_wpjobmanager_company_website($args)
{
    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';
    if (empty($post_id)) return;
    $title = get_the_title($post_id);
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $meta_value = get_post_meta($post_id, '_company_website', true);
    if (!empty($meta_value)) :
        $meta_value = sprintf($wrapper_html, $meta_value, $meta_value);
    ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> wpjobmanager_company_website ">
            <?php echo esc_html($meta_value); ?>
        </div>
    <?php
    endif;
}
add_action('post_grid_layout_element_css_wpjobmanager_company_website', 'post_grid_layout_element_css_wpjobmanager_company_website', 10);
function post_grid_layout_element_css_wpjobmanager_company_website($args)
{
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';
    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : 'left';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo esc_attr($layout_id);
                ?>.element_<?php echo esc_attr($index);
                            ?> {
            <?php if (!empty($color)) : ?>color: <?php echo esc_attr($color);
                                                    ?>;
            <?php endif;
            ?><?php if (!empty($font_size)) : ?>font-size: <?php echo esc_attr($font_size);
                                                            ?>;
            <?php endif;
            ?><?php if (!empty($font_family)) : ?>font-family: <?php echo esc_attr($font_family);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($margin)) : ?>margin: <?php echo esc_attr($margin);
                                                        ?>;
            <?php endif;
            ?><?php if (!empty($text_align)) : ?>text-align: <?php echo esc_attr($text_align);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($css)) : ?><?php echo esc_attr($css);
                                            ?><?php endif;
                                                ?>
        }

        <?php if (!empty($css_hover)) : ?>.layout-<?php echo esc_attr($layout_id);
                                                    ?>.element_<?php echo esc_attr($index);
                                                                ?>:hover {
            <?php echo esc_attr($css_hover);
            ?>
        }

        <?php endif;
        ?>
    </style>
<?php
}
add_action('post_grid_layout_element_option_wpjobmanager_company_tagline', 'post_grid_layout_element_option_wpjobmanager_company_tagline');
function post_grid_layout_element_option_wpjobmanager_company_tagline($parameters)
{
    $settings_tabs_field = new settings_tabs_field();
    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';
    $wck_key = isset($element_data['wck_key']) ? $element_data['wck_key'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = !empty($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '%s';
    $css = isset($element_data['css']) ? $element_data['css'] : '';
    $css_hover = isset($element_data['css_hover']) ? $element_data['css_hover'] : '';
?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>
            <span class="expand"><?php echo esc_html__('Company tagline', 'post-grid'); ?></span>
        </div>
        <div class="element-options options">
            <?php
            $args = array(
                'id'        => 'wrapper_html',
                'css_id'        => $element_index . '_wrapper_html',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Wrapper html', 'post-grid'),
                // phpcs:ignore WordPress.WP.I18n.MissingTranslatorsComment
                // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                'details'    => esc_html__('Write wrapper html, use <code>%s</code> to replace output.', 'post-grid'),
                'type'        => 'text',
                'value'        => $wrapper_html,
                'default'        => '',
                'placeholder'        => 'Tagline: %s',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'color',
                'css_id'        => $element_index . '_wpjobmanager_company_tagline',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Color', 'post-grid'),
                'details'    => esc_html__('Title text color.', 'post-grid'),
                'type'        => 'colorpicker',
                'value'        => $color,
                'default'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_size',
                'css_id'        => $element_index . '_font_size',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Font size', 'post-grid'),
                'details'    => esc_html__('Set font size.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_size,
                'default'        => '',
                'placeholder'        => '14px',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_family',
                'css_id'        => $element_index . '_font_family',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Font family', 'post-grid'),
                'details'    => esc_html__('Set font family.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_family,
                'default'        => '',
                'placeholder'        => 'Open Sans',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'margin',
                'css_id'        => $element_index . '_margin',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Margin', 'post-grid'),
                'details'    => esc_html__('Set margin.', 'post-grid'),
                'type'        => 'text',
                'value'        => $margin,
                'default'        => '',
                'placeholder'        => '5px 0',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'text_align',
                'css_id'        => $element_index . '_text_align',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Text align', 'post-grid'),
                'details'    => esc_html__('Choose text align.', 'post-grid'),
                'type'        => 'select',
                'value'        => $text_align,
                'default'        => 'left',
                'args'        => array('left' => esc_html__('Left', 'post-grid'), 'right' => esc_html__('Right', 'post-grid'), 'center' => esc_html__('Center', 'post-grid')),
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css',
                'css_id'        => $element_index . '_css',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Custom CSS', 'post-grid'),
                'details'    => esc_html__('Set csutom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css_hover',
                'css_id'        => $element_index . '_css_hover',
                'parent' => $input_name . '[wpjobmanager_company_tagline]',
                'title'        => esc_html__('Hover CSS', 'post-grid'),
                'details'    => esc_html__('Set hover custom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css_hover,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <textarea readonly type="text" onclick="this.select();">.element_<?php echo esc_attr($element_index); ?>{}</textarea>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'use_css',
                'title'        => esc_html__('Use of CSS', 'post-grid'),
                'details'    => esc_html__('Use following class selector to add custom CSS for this element.', 'post-grid'),
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ?>
        </div>
    </div>
    <?php
}
add_action('post_grid_layout_element_wpjobmanager_company_tagline', 'post_grid_layout_element_wpjobmanager_company_tagline');
function post_grid_layout_element_wpjobmanager_company_tagline($args)
{
    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';
    if (empty($post_id)) return;
    $title = get_the_title($post_id);
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $meta_value = get_post_meta($post_id, '_company_tagline', true);
    if (!empty($meta_value)) :
        $meta_value = sprintf($wrapper_html, $meta_value);
    ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> wpjobmanager_company_tagline ">
            <?php echo esc_html($meta_value); ?>
        </div>
    <?php
    endif;
}
add_action('post_grid_layout_element_css_wpjobmanager_company_tagline', 'post_grid_layout_element_css_wpjobmanager_company_tagline', 10);
function post_grid_layout_element_css_wpjobmanager_company_tagline($args)
{
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';
    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : 'left';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo esc_attr($layout_id);
                ?>.element_<?php echo esc_attr($index);
                            ?> {
            <?php if (!empty($color)) : ?>color: <?php echo esc_attr($color);
                                                    ?>;
            <?php endif;
            ?><?php if (!empty($font_size)) : ?>font-size: <?php echo esc_attr($font_size);
                                                            ?>;
            <?php endif;
            ?><?php if (!empty($font_family)) : ?>font-family: <?php echo esc_attr($font_family);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($margin)) : ?>margin: <?php echo esc_attr($margin);
                                                        ?>;
            <?php endif;
            ?><?php if (!empty($text_align)) : ?>text-align: <?php echo esc_attr($text_align);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($css)) : ?><?php echo esc_attr($css);
                                            ?><?php endif;
                                                ?>
        }

        <?php if (!empty($css_hover)) : ?>.layout-<?php echo esc_attr($layout_id);
                                                    ?>.element_<?php echo esc_attr($index);
                                                                ?>:hover {
            <?php echo esc_attr($css_hover);
            ?>
        }

        <?php endif;
        ?>
    </style>
<?php
}
add_action('post_grid_layout_element_option_wpjobmanager_job_expires', 'post_grid_layout_element_option_wpjobmanager_job_expires');
function post_grid_layout_element_option_wpjobmanager_job_expires($parameters)
{
    $settings_tabs_field = new settings_tabs_field();
    $input_name = isset($parameters['input_name']) ? $parameters['input_name'] : '{input_name}';
    $element_data = isset($parameters['element_data']) ? $parameters['element_data'] : array();
    $element_index = isset($parameters['index']) ? $parameters['index'] : '';
    $wck_key = isset($element_data['wck_key']) ? $element_data['wck_key'] : '';
    $color = isset($element_data['color']) ? $element_data['color'] : '';
    $font_size = isset($element_data['font_size']) ? $element_data['font_size'] : '';
    $font_family = isset($element_data['font_family']) ? $element_data['font_family'] : '';
    $margin = isset($element_data['margin']) ? $element_data['margin'] : '';
    $text_align = isset($element_data['text_align']) ? $element_data['text_align'] : '';
    $wrapper_html = !empty($element_data['wrapper_html']) ? $element_data['wrapper_html'] : '%s';
    $css = isset($element_data['css']) ? $element_data['css'] : '';
    $css_hover = isset($element_data['css_hover']) ? $element_data['css_hover'] : '';
?>
    <div class="item">
        <div class="element-title header ">
            <span class="remove" onclick="jQuery(this).parent().parent().remove()"><i class="fas fa-times"></i></span>
            <span class="sort"><i class="fas fa-sort"></i></span>
            <span class="expand"><?php echo esc_html__('Job expire date', 'post-grid'); ?></span>
        </div>
        <div class="element-options options">
            <?php
            $args = array(
                'id'        => 'wrapper_html',
                'css_id'        => $element_index . '_wrapper_html',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Wrapper html', 'post-grid'),
                // phpcs:ignore WordPress.WP.I18n.MissingTranslatorsComment
                // phpcs:ignore WordPress.WP.I18n.UnorderedPlaceholdersText
                'details'    => esc_html__('Write wrapper html, use <code>%s</code> to replace output.', 'post-grid'),
                'type'        => 'text',
                'value'        => $wrapper_html,
                'default'        => '',
                'placeholder'        => 'Expire date: %s',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'color',
                'css_id'        => $element_index . '_wpjobmanager_job_expires',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Color', 'post-grid'),
                'details'    => esc_html__('Title text color.', 'post-grid'),
                'type'        => 'colorpicker',
                'value'        => $color,
                'default'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_size',
                'css_id'        => $element_index . '_font_size',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Font size', 'post-grid'),
                'details'    => esc_html__('Set font size.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_size,
                'default'        => '',
                'placeholder'        => '14px',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'font_family',
                'css_id'        => $element_index . '_font_family',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Font family', 'post-grid'),
                'details'    => esc_html__('Set font family.', 'post-grid'),
                'type'        => 'text',
                'value'        => $font_family,
                'default'        => '',
                'placeholder'        => 'Open Sans',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'margin',
                'css_id'        => $element_index . '_margin',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Margin', 'post-grid'),
                'details'    => esc_html__('Set margin.', 'post-grid'),
                'type'        => 'text',
                'value'        => $margin,
                'default'        => '',
                'placeholder'        => '5px 0',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'text_align',
                'css_id'        => $element_index . '_text_align',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Text align', 'post-grid'),
                'details'    => esc_html__('Choose text align.', 'post-grid'),
                'type'        => 'select',
                'value'        => $text_align,
                'default'        => 'left',
                'args'        => array('left' => esc_html__('Left', 'post-grid'), 'right' => esc_html__('Right', 'post-grid'), 'center' => esc_html__('Center', 'post-grid')),
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css',
                'css_id'        => $element_index . '_css',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Custom CSS', 'post-grid'),
                'details'    => esc_html__('Set csutom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            $args = array(
                'id'        => 'css_hover',
                'css_id'        => $element_index . '_css_hover',
                'parent' => $input_name . '[wpjobmanager_job_expires]',
                'title'        => esc_html__('Hover CSS', 'post-grid'),
                'details'    => esc_html__('Set hover custom CSS.', 'post-grid'),
                'type'        => 'textarea',
                'value'        => $css_hover,
                'default'        => '',
                'placeholder'        => '',
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <textarea readonly type="text" onclick="this.select();">.element_<?php echo esc_attr($element_index); ?>{}</textarea>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'use_css',
                'title'        => esc_html__('Use of CSS', 'post-grid'),
                'details'    => esc_html__('Use following class selector to add custom CSS for this element.', 'post-grid'),
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ?>
        </div>
    </div>
    <?php
}
add_action('post_grid_layout_element_wpjobmanager_job_expires', 'post_grid_layout_element_wpjobmanager_job_expires');
function post_grid_layout_element_wpjobmanager_job_expires($args)
{
    $element  = isset($args['element']) ? $args['element'] : array();
    $elementIndex  = isset($args['index']) ? $args['index'] : '';
    $post_id = isset($args['post_id']) ? $args['post_id'] : '';
    if (empty($post_id)) return;
    $title = get_the_title($post_id);
    $custom_class = isset($element['custom_class']) ? $element['custom_class'] : '';
    $wrapper_html = isset($element['wrapper_html']) ? $element['wrapper_html'] : '%s';
    $meta_value = get_post_meta($post_id, '_job_expires', true);
    if (!empty($meta_value)) :
        $meta_value = sprintf($wrapper_html, $meta_value);
    ?>
        <div class="element element_<?php echo esc_attr($elementIndex); ?> <?php echo esc_attr($custom_class); ?> wpjobmanager_job_expires ">
            <?php echo esc_html($meta_value); ?>
        </div>
    <?php
    endif;
}
add_action('post_grid_layout_element_css_wpjobmanager_job_expires', 'post_grid_layout_element_css_wpjobmanager_job_expires', 10);
function post_grid_layout_element_css_wpjobmanager_job_expires($args)
{
    $index = isset($args['index']) ? $args['index'] : '';
    $element = isset($args['element']) ? $args['element'] : array();
    $layout_id = isset($args['layout_id']) ? $args['layout_id'] : '';
    $color = isset($element['color']) ? $element['color'] : '';
    $font_size = isset($element['font_size']) ? $element['font_size'] : '';
    $font_family = isset($element['font_family']) ? $element['font_family'] : '';
    $margin = isset($element['margin']) ? $element['margin'] : '';
    $text_align = isset($element['text_align']) ? $element['text_align'] : 'left';
    $css = isset($element['css']) ? $element['css'] : '';
    $css_hover = isset($element['css_hover']) ? $element['css_hover'] : '';
    ?>
    <style type="text/css">
        .layout-<?php echo esc_attr($layout_id);
                ?>.element_<?php echo esc_attr($index);
                            ?> {
            <?php if (!empty($color)) : ?>color: <?php echo esc_attr($color);
                                                    ?>;
            <?php endif;
            ?><?php if (!empty($font_size)) : ?>font-size: <?php echo esc_attr($font_size);
                                                            ?>;
            <?php endif;
            ?><?php if (!empty($font_family)) : ?>font-family: <?php echo esc_attr($font_family);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($margin)) : ?>margin: <?php echo esc_attr($margin);
                                                        ?>;
            <?php endif;
            ?><?php if (!empty($text_align)) : ?>text-align: <?php echo esc_attr($text_align);
                                                                ?>;
            <?php endif;
            ?><?php if (!empty($css)) : ?><?php echo esc_attr($css);
                                            ?><?php endif;
                                                ?>
        }

        <?php if (!empty($css_hover)) : ?>.layout-<?php echo esc_attr($layout_id);
                                                    ?>.element_<?php echo esc_attr($index);
                                                                ?>:hover {
            <?php echo esc_attr($css_hover);
            ?>
        }

        <?php endif;
        ?>
    </style>
<?php
}
