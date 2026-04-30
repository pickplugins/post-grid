<?php
if (!defined('ABSPATH')) exit;  // if direct access
//remove_filter('post_grid_settings_tabs', 'post_grid_pro_settings_tabs', 90);
//remove_action('post_grid_settings_content_license', 'post_grid_settings_content_license', 10);
//remove_action('post_grid_settings_save', 'post_grid_pro_settings_save');
add_action('post_grid_settings_content_general', 'post_grid_settings_content_general');
function post_grid_settings_content_general()
{
    $settings_tabs_field = new settings_tabs_field();
    $post_grid_settings = get_option('post_grid_settings');
    $font_aw_version = isset($post_grid_settings['font_aw_version']) ? $post_grid_settings['font_aw_version'] : 'none';
    $post_grid_preview = isset($post_grid_settings['post_grid_preview']) ? $post_grid_settings['post_grid_preview'] : 'yes';
    $post_options_post_types = isset($post_grid_settings['post_options_post_types']) ? $post_grid_settings['post_options_post_types'] : array();
    $posttypes_array = post_grid_posttypes_array();
?>
    <div class="section">
        <div class="section-title"><?php echo esc_html__('General', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo esc_html__('Choose some general options.', 'post-grid'); ?></p>
        <?php
        $args = array(
            'id'        => 'post_options_post_types',
            'parent'        => 'post_grid_settings',
            'title'        => esc_html__('Post option by post types', 'post-grid'),
            'details'    => esc_html__('Enable post options for selected post types', 'post-grid'),
            'type'        => 'select',
            'value'        => $post_options_post_types,
            'default'        => array(),
            'multiple'        => true,
            'args'        => $posttypes_array,
        );
        $settings_tabs_field->generate_field($args);
        $args = array(
            'id'        => 'font_aw_version',
            'parent'        => 'post_grid_settings',
            'title'        => esc_html__('Font-awesome version', 'post-grid'),
            'details'    => esc_html__('Choose font awesome version you want to load.', 'post-grid'),
            'type'        => 'select',
            'value'        => $font_aw_version,
            'default'        => '',
            'args'        => array('v_5' => esc_html__('Version 5+', 'post-grid'), 'v_4' => esc_html__('Version 4+', 'post-grid'), 'none' => esc_html__('None', 'post-grid')),
        );
        $settings_tabs_field->generate_field($args);
        $args = array(
            'id'        => 'post_grid_preview',
            'parent'        => 'post_grid_settings',
            'title'        => esc_html__('Enable post grid preview', 'post-grid'),
            'details'    => esc_html__('You can enable preview post grid.', 'post-grid'),
            'type'        => 'select',
            'value'        => $post_grid_preview,
            'default'        => 'yes',
            'args'        => array('yes' => esc_html__('Yes', 'post-grid'), 'no' => esc_html__('No', 'post-grid')),
        );
        $settings_tabs_field->generate_field($args);
        ?>
    </div>
    <?php
}
add_action('post_grid_settings_content_help_support', 'post_grid_settings_content_help_support');
if (!function_exists('post_grid_settings_content_help_support')) {
    function post_grid_settings_content_help_support($tab)
    {
        $settings_tabs_field = new settings_tabs_field();
        $layouts_pro_url = '';
        $layouts_pro_url_json = '';
        if (is_plugin_active('post-grid-pro/post-grid-pro.php')) {
            $layouts_pro_url = post_grid_pro_plugin_url . 'sample-data/post-grid-layouts.xml';
            $layouts_pro_url_json = post_grid_pro_plugin_url . 'sample-data/post-grid-layouts.json';
        }
        $layouts_free_url = post_grid_plugin_url . 'sample-data/post-grid-layouts.xml';
        $layouts_free_url_json = post_grid_plugin_url . 'sample-data/post-grid-layouts.json';
    ?>
        <div class="section">
            <div class="section-title"><?php echo esc_html__('Get support', 'post-grid'); ?></div>
            <p class="description section-description">
                <?php echo esc_html__('Use following to get help and support from our expert team.', 'post-grid'); ?></p>
            <?php
            ob_start();
            ?>
            <ul>
                <li>Step - 1: Go to Tools > <a href="<?php echo esc_url(admin_url() . 'export.php'); ?>">Export</a> menu.</li>
                <li>Step - 2: Choose "Layouts" post types from list.</li>
                <li>Step - 3: Then click to "Download Export File' button.</li>
                <li>Step - 4: Save the file on your local machine.</li>
            </ul>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'export_layouts',
                //'parent'		=> '',
                'title'        => esc_html__('Export layouts', 'post-grid'),
                'details'    => '',
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <p>
                <?php echo esc_html__('Ask question for free on our forum and get quick reply from our expert team members.', 'post-grid'); ?>
            </p>
            <a class="button"
                href="https://www.pickplugins.com/create-support-ticket/"><?php echo esc_html__('Create support ticket', 'post-grid'); ?></a>
            <p><?php echo esc_html__('Read our documentation before asking your question.', 'post-grid'); ?></p>
            <a class="button" href="https://comboblocks.com/documentations/"><?php echo esc_html__('Documentation', 'post-grid'); ?></a>
            <p><?php echo esc_html__('Watch video tutorials.', 'post-grid'); ?></p>
            <a class="button" href="https://www.youtube.com/playlist?list=PL0QP7T2SN94Yut5Y0MSVg1wqmqWz0UYpt"><i
                    class="fab fa-youtube"></i> <?php echo esc_html__('All tutorials', 'post-grid'); ?></a>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'get_support',
                //'parent'		=> '',
                'title'        => esc_html__('Ask question', 'post-grid'),
                'details'    => '',
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <p class="">We wish your 2 minutes to write your feedback about the <b>Post Grid</b> plugin. give us <span
                    style="color: #ffae19"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                        class="fas fa-star"></i><i class="fas fa-star"></i></span></p>
            <a target="_blank" href="https://wordpress.org/support/plugin/post-grid/reviews/#new-post" class="button"><i
                    class="fab fa-wordpress"></i> Write a review</a>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'reviews',
                //'parent'		=> '',
                'title'        => esc_html__('Submit reviews', 'post-grid'),
                'details'    => '',
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ?>
        </div>
<?php
    }
}



add_action('post_grid_settings_save', 'post_grid_settings_save');
function post_grid_settings_save()
{
    $post_grid_settings = isset($_POST['post_grid_settings']) ?  post_grid_recursive_sanitize_arr(wp_unslash($_POST['post_grid_settings'])) : array();
    update_option('post_grid_settings', $post_grid_settings);
    $post_grid_license = isset($_POST['post_grid_license']) ?  post_grid_recursive_sanitize_arr(wp_unslash($_POST['post_grid_license'])) : array();
    update_option('post_grid_license', $post_grid_license);
}
