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
        <div class="section-title"><?php echo __('General', 'post-grid'); ?></div>
        <p class="description section-description"><?php echo __('Choose some general options.', 'post-grid'); ?></p>
        <?php
        $args = array(
            'id'        => 'post_options_post_types',
            'parent'        => 'post_grid_settings',
            'title'        => __('Post option by post types', 'post-grid'),
            'details'    => __('Enable post options for selected post types', 'post-grid'),
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
            'title'        => __('Font-awesome version', 'post-grid'),
            'details'    => __('Choose font awesome version you want to load.', 'post-grid'),
            'type'        => 'select',
            'value'        => $font_aw_version,
            'default'        => '',
            'args'        => array('v_5' => __('Version 5+', 'post-grid'), 'v_4' => __('Version 4+', 'post-grid'), 'none' => __('None', 'post-grid')),
        );
        $settings_tabs_field->generate_field($args);
        $args = array(
            'id'        => 'post_grid_preview',
            'parent'        => 'post_grid_settings',
            'title'        => __('Enable post grid preview', 'post-grid'),
            'details'    => __('You can enable preview post grid.', 'post-grid'),
            'type'        => 'select',
            'value'        => $post_grid_preview,
            'default'        => 'yes',
            'args'        => array('yes' => __('Yes', 'post-grid'), 'no' => __('No', 'post-grid')),
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
            <div class="section-title"><?php echo __('Get support', 'post-grid'); ?></div>
            <p class="description section-description">
                <?php echo __('Use following to get help and support from our expert team.', 'post-grid'); ?></p>
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
                'title'        => __('Export layouts', 'post-grid'),
                'details'    => '',
                'type'        => 'custom_html',
                'html'        => $html,
            );
            $settings_tabs_field->generate_field($args);
            ob_start();
            ?>
            <p>
                <?php echo __('Ask question for free on our forum and get quick reply from our expert team members.', 'post-grid'); ?>
            </p>
            <a class="button"
                href="https://www.pickplugins.com/create-support-ticket/"><?php echo __('Create support ticket', 'post-grid'); ?></a>
            <p><?php echo __('Read our documentation before asking your question.', 'post-grid'); ?></p>
            <a class="button" href="https://comboblocks.com/documentations/"><?php echo __('Documentation', 'post-grid'); ?></a>
            <p><?php echo __('Watch video tutorials.', 'post-grid'); ?></p>
            <a class="button" href="https://www.youtube.com/playlist?list=PL0QP7T2SN94Yut5Y0MSVg1wqmqWz0UYpt"><i
                    class="fab fa-youtube"></i> <?php echo __('All tutorials', 'post-grid'); ?></a>
            <?php
            $html = ob_get_clean();
            $args = array(
                'id'        => 'get_support',
                //'parent'		=> '',
                'title'        => __('Ask question', 'post-grid'),
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
                'title'        => __('Submit reviews', 'post-grid'),
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
add_action('post_grid_settings_content_disable_blocks', 'post_grid_settings_content_disable_blocks');
if (!function_exists('post_grid_settings_content_disable_blocks')) {
    function post_grid_settings_content_disable_blocks($tab)
    {
        $settings_tabs_field = new settings_tabs_field();
        $post_grid_settings = get_option('post_grid_settings');
        $disable_blocks = isset($post_grid_settings['disable_blocks']) ? $post_grid_settings['disable_blocks'] : [];
    ?>
        <div class="section">
            <div class="section-title"><?php echo __('Disable/Enable Blocks', 'post-grid'); ?></div>
            <p class="description section-description text-lg">
                <?php echo __('Choose blocks to enable or disable', 'post-grid'); ?></p>
            <?php
            $blocks_list = [
                'post-grid/accordion' => 'Accordion',
                'post-grid/accordion-nested' => 'Accordion Nested',
                'post-grid/accordion-nested-item' => 'Accordion Nested Item',
                'post-grid/archive-title' => 'Archive Title',
                'post-grid/archive-description' => 'Archive Description',
                'post-grid/breadcrumb' => 'Breadcrumb',
                'post-grid/content-slider' => 'Content Slider',
                'post-grid/content-slider-item' => 'Content Slider Stem',
                'post-grid/date-countdown' => 'Date Countdown',
                'post-grid/flex-wrap' => 'Flex Wrap',
                'post-grid/flex-wrap-item' => 'Flex Wrap Item',
                'post-grid/form-field-checkbox' => 'Form Field Checkbox',
                'post-grid/form-field-file' => 'Form Field File',
                'post-grid/form-field-file-multi' => 'Form Field File Multi',
                'post-grid/form-field-input' => 'Form Field Input',
                'post-grid/form-field-radio' => 'Form Field Radio',
                'post-grid/form-field-select' => 'Form Field Select',
                'post-grid/form-field-submit' => 'Form Field Submit',
                'post-grid/form-field-textarea' => 'Form Field Textarea',
                'post-grid/form-wrap' => 'Form Wrap',
                'post-grid/grid-wrap' => 'Grid Wrap',
                'post-grid/grid-wrap-item' => 'Grid Wrap Item',
                'post-grid/icon' => 'Icon',
                'post-grid/image' => 'Image',
                'post-grid/image-gallery' => 'Image Gallery',
                'post-grid/image-gallery-item' => 'image Gallery Item',
                'post-grid/justified-image' => 'Justified Image',
                'post-grid/justified-wrap' => 'Justified Maker',
                'post-grid/justified-wrap-item' => 'Justified Wrap Item',
                'post-grid/layer' => 'Layer',
                'post-grid/layers' => 'Layers',
                'post-grid/list' => 'List',
                'post-grid/list-nested' => 'List Nested',
                'post-grid/list-nested-item' => 'List Nested Item',
                'post-grid/masonry-wrap' => 'masonry-wrap',
                'post-grid/masonry-wrap-item' => 'Masonry Wrap Item',
                'post-grid/menu-wrap' => 'Menu Wrap',
                'post-grid/menu-wrap-item' => 'Menu Wrap Item',
                'post-grid/number-counter' => 'Number Counter',
                'post-grid/popup' => 'Popup',
                'post-grid/post-author' => 'Post author',
                'post-grid/post-author-fields' => 'Post author fields',
                'post-grid/post-categories' => 'Post categories',
                'post-grid/post-comment-count' => 'Post Comment Count',
                'post-grid/post-date' => 'Post date',
                'post-grid/post-excerpt' => 'Post excerpt',
                'post-grid/post-featured-image' => 'Post featured image',
                'post-grid/post-grid' => 'Post Grid',
                'post-grid/post-grid-filterable' => 'Post grid filterable',
                'post-grid/post-grid-filterable-nav' => 'Post Grid Filterable Nav',
                'post-grid/post-meta' => 'Post meta',
                'post-grid/post-query' => 'Post Query',
                'post-grid/post-query-pagination' => 'Post Query Pagination',
                'post-grid/post-tags' => 'Post Tags',
                'post-grid/post-taxonomies' => 'Post Taxonomies',
                'post-grid/post-title' => 'Post Title',
                'post-grid/progress-bar' => 'Progress Bar',
                'post-grid/read-more' => 'Read more',
                'post-grid/shortcode' => 'Shortcode',
                'post-grid/social-share' => 'Social Share',
                'post-grid/star-rate' => 'Star Rate',
                'post-grid/table-of-contents' => 'Table Of Contents',
                'post-grid/tabs' => 'Tabs',
                'post-grid/tabs-nested' => 'Tabs Nested',
                'post-grid/tabs-nested-item' => 'Tabs Nested Item',
                'post-grid/terms-list' => 'Terms List',
                'post-grid/text' => 'Text',
                'post-grid/woo-add-to-cart' => 'Woo Add To Cart',
                'post-grid/woo-price' => 'Woo Price',
                'post-grid/woo-product-info' => 'Woo Product Info',
                'post-grid/woo-sale' => 'Woo Sale',
                'post-grid/woo-sku' => 'Woo SKU',
                'post-grid/woo-star-rate' => 'Woo Star Rate',
                'post-grid/woo-stock' => 'Woo Stock',
                'post-grid/woo-stock-quantity' => 'Woo Stock Quantity',
                'post-grid/woo-total-sales' => 'Woo Total Sales',
                'post-grid/wordpress-org' => 'Wordpress.org',
            ];
            $args = array(
                'id'        => 'disable_blocks',
                'parent'        => 'post_grid_settings',
                'title'        => __('Disbale/Enable Blocks', 'post-grid'),
                'details'    => __('Enable or disable blocks from here.', 'post-grid'),
                'type'        => 'checkbox',
                'value'        => $disable_blocks,
                'default'        => array(),
                'multiple'        => true,
                'style'        => ['inline' => false],
                'args'        => $blocks_list,
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
    $post_grid_settings = isset($_POST['post_grid_settings']) ?  post_grid_recursive_sanitize_arr($_POST['post_grid_settings']) : array();
    update_option('post_grid_settings', $post_grid_settings);
    $post_grid_license = isset($_POST['post_grid_license']) ?  post_grid_recursive_sanitize_arr($_POST['post_grid_license']) : array();
    update_option('post_grid_license', $post_grid_license);
}
