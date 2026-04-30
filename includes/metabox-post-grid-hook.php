<?php
if (!defined('ABSPATH')) exit;  // if direct access
add_action('post_grid_metabox_tabs_content_shortcode', 'post_grid_metabox_tabs_content_shortcode', 10, 2);
function post_grid_metabox_tabs_content_shortcode($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
?>
  <div class="section">
    <div class="section-title">Shortcodes</div>
    <p class="description section-description">Simply copy these shortcode and user under content</p>
    <?php
    ob_start();
    ?>
    <div class="copy-to-clipboard">
      <input type="text" value="[post_grid id='<?php echo esc_attr($post_id);  ?>']"> <span class="copied">Copied</span>
      <p class="description">You can use this shortcode under post content</p>
    </div>
    <div class="copy-to-clipboard">
      To avoid conflict:<br>
      <input type="text" value="[post_grid_pickplugins id='<?php echo esc_attr($post_id);  ?>']"> <span class="copied">Copied</span>
      <p class="description">To avoid conflict with 3rd party shortcode also used same <code>[post_grid]</code>You can use
        this shortcode under post content</p>
    </div>
    <div class="copy-to-clipboard">
      <textarea cols="50" rows="1" onClick="this.select();"><?php echo '<?php echo do_shortcode("[post_grid id=';
                                                            echo "'" . esc_attr($post_id) . "']";
                                                            echo '"); ?>'; ?></textarea> <span class="copied">Copied</span>
      <p class="description">PHP Code, you can use under theme .php files.</p>
    </div>
    <div class="copy-to-clipboard">
      <textarea cols="50" rows="1" onClick="this.select();"><?php echo '<?php echo do_shortcode("[post_grid_pickplugins id=';
                                                            echo "'" . esc_attr($post_id) . "']";
                                                            echo '"); ?>'; ?></textarea> <span class="copied">Copied</span>
      <p class="description">To avoid conflict, PHP code you can use under theme .php files.</p>
    </div>

    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'post_grid_shortcodes',
      'title'        => esc_html__('Post Grid Shortcode', 'post-grid'),
      'details'    => '',
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
  <style type="text/css">
    .copy-to-clipboard {}

    .copy-to-clipboard .copied {
      display: none;
      background: #e5e5e5;
      padding: 4px 10px;
      line-height: normal;
    }
  </style>
  <script>
    jQuery(document).ready(function($) {
      $(document).on('click', '.copy-to-clipboard input, .copy-to-clipboard textarea', function() {
        $(this).focus();
        $(this).select();
        document.execCommand('copy');
        $(this).parent().children('.copied').fadeIn().fadeOut(2000);
      })
    })
  </script>
<?php
}
add_action('post_grid_metabox_tabs_content_general', 'post_grid_metabox_tabs_content_general', 10, 2);
function post_grid_metabox_tabs_content_general($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $lazy_load_enable = !empty($post_grid_meta_options['lazy_load_enable']) ? $post_grid_meta_options['lazy_load_enable'] : 'yes';
  $lazy_load_image_src = !empty($post_grid_meta_options['lazy_load_image_src']) ? $post_grid_meta_options['lazy_load_image_src'] : '';
  $lazy_load_alt_text = !empty($post_grid_meta_options['lazy_load_alt_text']) ? $post_grid_meta_options['lazy_load_alt_text'] : '';
  $load_fontawesome = !empty($post_grid_meta_options['load_fontawesome']) ? $post_grid_meta_options['load_fontawesome'] : '';
  $container_padding = !empty($post_grid_meta_options['container']['padding']) ? $post_grid_meta_options['container']['padding'] : '';
  $container_bg_color = !empty($post_grid_meta_options['container']['bg_color']) ? $post_grid_meta_options['container']['bg_color'] : '';
  $container_bg_image = !empty($post_grid_meta_options['container']['bg_image']) ? $post_grid_meta_options['container']['bg_image'] : '';
  $items_wrapper_text_align = !empty($post_grid_meta_options['items_wrapper']['text_align']) ? $post_grid_meta_options['items_wrapper']['text_align'] : '';
?>
  <div class="section">
    <div class="section-title"><?php echo esc_html__('Lazy load', 'post-grid'); ?></div>
    <p class="description section-description"><?php echo esc_html__('Choose lazy load options.', 'post-grid'); ?></p>
    <?php
    $args = array(
      'id'        => 'lazy_load_enable',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Enable lazy load', 'post-grid'),
      'details'    => esc_html__('Choose enable or disable lazy load.', 'post-grid'),
      'type'        => 'radio',
      'multiple'        => true,
      'value'        => $lazy_load_enable,
      'default'        => 'no',
      'args'        => array(
        'no' => esc_html__('No', 'post-grid'),
        'yes' => esc_html__('Yes', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'lazy_load_image_src',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Lazy load image source', 'post-grid'),
      'details'    => esc_html__('Set custom lazy load image source.', 'post-grid'),
      'type'        => 'media_url',
      'placeholder'        => '',
      'placeholder_img'        => '',
      'value'        => $lazy_load_image_src,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'lazy_load_alt_text',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Lazy load image alt text', 'post-grid'),
      'details'    => esc_html__('Set custom lazy load image alt text.', 'post-grid'),
      'type'        => 'text',
      'value'        => $lazy_load_alt_text,
      'placeholder'        => 'Post Grid lazy load',
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'load_fontawesome',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Load font awesome', 'post-grid'),
      'details'    => esc_html__('Choose enable or disable font-awesome load.', 'post-grid'),
      'type'        => 'radio',
      'multiple'        => true,
      'value'        => $load_fontawesome,
      'default'        => 'no',
      'args'        => array(
        'no' => esc_html__('No', 'post-grid'),
        'yes' => esc_html__('Yes', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
  <div class="section">
    <div class="section-title"><?php echo esc_html__('Container settings', 'post-grid'); ?></div>
    <p class="description section-description"><?php echo esc_html__('Choose container options.', 'post-grid'); ?></p>
    <?php
    $args = array(
      'id'        => 'padding',
      'parent'        => 'post_grid_meta_options[container]',
      'title'        => esc_html__('Container padding', 'post-grid'),
      'details'    => esc_html__('Set custom padding for grid container, ex: 10px 15px 10px 15px', 'post-grid'),
      'type'        => 'text',
      'value'        => $container_padding,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'bg_color',
      'parent'        => 'post_grid_meta_options[container]',
      'title'        => esc_html__('Container background color', 'post-grid'),
      'details'    => esc_html__('Set custom background color for grid container.', 'post-grid'),
      'type'        => 'colorpicker',
      'value'        => $container_bg_color,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'bg_image',
      'parent'        => 'post_grid_meta_options[container]',
      'title'        => esc_html__('Container background color', 'post-grid'),
      'details'    => esc_html__('Set custom background color for grid container.', 'post-grid'),
      'type'        => 'media_url',
      'value'        => $container_bg_image,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
  <div class="section">
    <div class="section-title"><?php echo esc_html__('Items wrapper settings', 'post-grid'); ?></div>
    <p class="description section-description"><?php echo esc_html__('Choose items wrapper options.', 'post-grid'); ?></p>
    <?php
    $args = array(
      'id'        => 'text_align',
      'parent'        => 'post_grid_meta_options[items_wrapper]',
      'title'        => esc_html__('Text align', 'post-grid'),
      'details'    => esc_html__('Container text align.', 'post-grid'),
      'type'        => 'select',
      'value'        => $items_wrapper_text_align,
      'default'        => 'center',
      'args'        => array(
        'left' => esc_html__('Left', 'post-grid'),
        'center' => esc_html__('Center', 'post-grid'),
        'right' => esc_html__('Right', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_query_post', 'post_grid_metabox_tabs_content_query_post', 10, 2);
function post_grid_metabox_tabs_content_query_post($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $class_post_grid_functions = new class_post_grid_functions();
  $post_grid_posttypes_array = post_grid_posttypes_array();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $post_types = !empty($post_grid_meta_options['post_types']) ? $post_grid_meta_options['post_types'] : array('post');
  $categories = !empty($post_grid_meta_options['categories']) ? $post_grid_meta_options['categories'] : array();
  $categories_relation = !empty($post_grid_meta_options['categories_relation']) ? $post_grid_meta_options['categories_relation'] : 'OR';
  $taxonomies = !empty($post_grid_meta_options['taxonomies']) ? $post_grid_meta_options['taxonomies'] : array();
  $post_status = !empty($post_grid_meta_options['post_status']) ? $post_grid_meta_options['post_status'] : array();
  $query_order = !empty($post_grid_meta_options['query_order']) ? $post_grid_meta_options['query_order'] : '';
  $query_orderby = !empty($post_grid_meta_options['query_orderby']) ? $post_grid_meta_options['query_orderby'] : '';
  $query_orderby_meta_key = !empty($post_grid_meta_options['query_orderby_meta_key']) ? $post_grid_meta_options['query_orderby_meta_key'] : '';
  $posts_per_page = !empty($post_grid_meta_options['posts_per_page']) ? $post_grid_meta_options['posts_per_page'] : 10;
  $offset = isset($post_grid_meta_options['offset']) ? $post_grid_meta_options['offset'] : '0';
  $ignore_paged = isset($post_grid_meta_options['ignore_paged']) ? $post_grid_meta_options['ignore_paged'] : 'no';
  $exclude_post_id = isset($post_grid_meta_options['exclude_post_id']) ? $post_grid_meta_options['exclude_post_id'] : '';
  $include_post_id = isset($post_grid_meta_options['include_post_id']) ? $post_grid_meta_options['include_post_id'] : '';
  $keyword = !empty($post_grid_meta_options['keyword']) ? $post_grid_meta_options['keyword'] : '';
  $no_post_text = !empty($post_grid_meta_options['no_post_text']) ? $post_grid_meta_options['no_post_text'] : '';
  $post_taxonomies_arr = post_grid_get_taxonomies($post_types);



?>
  <div class="section">
    <div class="section-title">Query Post</div>
    <p class="description section-description">Set the option for display and query posts.</p>
    <?php
    $args = array(
      'id'        => 'post_types',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Post types', 'post-grid'),
      'details'    => esc_html__('Select your desired post types here you want to display post from, you can choose multiple post type.', 'post-grid'),
      'type'        => 'select2',
      'multiple'        => true,
      'value'        => $post_types,
      'default'        => array('post'),
      'attributes'        => array('grid_id' => $post_id),
      'args'        => $post_grid_posttypes_array,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
    <div class="setting-field">
      <div class="field-lable">Post Taxonomies & terms</div>
      <div class="field-input">
        <div class="expandable" id="taxonomies-terms">
          <?php
          if (!empty($post_taxonomies_arr)) :
            foreach ($post_taxonomies_arr as $taxonomyIndex => $taxonomy) {
              $taxonomy_term_arr = array();
              $the_taxonomy = get_taxonomy($taxonomy);
              $terms_relation = isset($taxonomies[$taxonomy]['terms_relation']) ? $taxonomies[$taxonomy]['terms_relation'] : 'IN';
              $terms = isset($taxonomies[$taxonomy]['terms']) ? $taxonomies[$taxonomy]['terms'] : array();
              $checked = isset($taxonomies[$taxonomy]['checked']) ? $taxonomies[$taxonomy]['checked'] : '';
              $taxonomy_terms = get_terms(array(
                'taxonomy' => $taxonomy,
                'hide_empty' => false,
              ));
              if (!empty($taxonomy_terms))
                foreach ($taxonomy_terms as $taxonomy_term) {
                  $taxonomy_term_arr[$taxonomy_term->term_id] = $taxonomy_term->name . '(' . $taxonomy_term->count . ')';
                }
              $taxonomy_term_arr = !empty($taxonomy_term_arr) ? $taxonomy_term_arr : array();
          ?>
              <div class="item">
                <div class="header">
                  <span class="expand  ">
                    <i class="fas fa-expand"></i>
                    <i class="fas fa-compress"></i>
                  </span>
                  <label><input type="checkbox" <?php if (!empty($checked)) echo 'checked'; ?> name="post_grid_meta_options[taxonomies][<?php echo esc_attr($taxonomy); ?>][checked]" value="<?php echo esc_attr($taxonomy); ?>" /> </label>
                  <span class="header-text expand  "><?php echo esc_html($the_taxonomy->labels->name); ?>(<?php echo esc_html($taxonomy); ?>)</span>
                </div>
                <div class="options <?php echo ($taxonomy == 'category') ? 'active' : ''; ?>">
                  <?php
                  $args = array(
                    'id'        => 'terms',
                    'css_id'        => 'terms-' . $taxonomyIndex,
                    'parent'        => 'post_grid_meta_options[taxonomies][' . $taxonomy . ']',
                    'title'        => esc_html__('Categories or Terms', 'post-grid'),
                    'details'    => esc_html__('Select post terms or categories', 'post-grid'),
                    'type'        => 'select2',
                    'multiple'        => true,
                    'value'        => $terms,
                    'default'        => array(),
                    'args'        => $taxonomy_term_arr,
                  );
                  $settings_tabs_field->generate_field($args, $post_id);
                  $args = array(
                    'id'        => 'terms_relation',
                    'parent'        => 'post_grid_meta_options[taxonomies][' . $taxonomy . ']',
                    'title'        => esc_html__('Terms relation', 'post-grid'),
                    'details'    => esc_html__('Choose term relation. some option only available in pro', 'post-grid'),
                    'type'        => 'radio',
                    'for'        => $taxonomy,
                    'multiple'        => true,
                    'value'        => $terms_relation,
                    'default'        => 'IN',
                    'args'        => array(
                      'IN' => esc_html__('IN', 'post-grid'),
                      'NOT IN' => esc_html__('NOT IN', 'post-grid'),
                      'AND' => esc_html__('AND', 'post-grid'),
                      'EXISTS' => esc_html__('EXISTS', 'post-grid'),
                      'NOT EXISTS' => esc_html__('NOT EXISTS', 'post-grid'),
                    ),
                  );
                  $settings_tabs_field->generate_field($args, $post_id);
                  ?>
                </div>
              </div>
          <?php
            }
          else :
            echo esc_html__('Please choose at least one post types. save/update post grid', 'post-grid');
          endif;
          ?>
        </div>
        <p class="description"><?php echo esc_html__('Select post categories & terms.', 'post-grid'); ?></p>
      </div>
    </div>
    <?php
    $args = array(
      'id'        => 'categories_relation',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Taxonomies relation', 'post-grid'),
      'details'    => esc_html__('Choose Taxonomies relation.', 'post-grid'),
      'type'        => 'radio',
      //'for'		=> $taxonomy,
      'multiple'        => true,
      'value'        => $categories_relation,
      'default'        => 'IN',
      'args'        => array(
        'OR' => esc_html__('OR', 'post-grid'),
        'AND' => esc_html__('AND', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'post_status',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Post status', 'post-grid'),
      'details'    => esc_html__('Display post from following post status.', 'post-grid'),
      'type'        => 'select2',
      'multiple'        => true,
      'value'        => $post_status,
      'default'        => array('publish'),
      'args'        => $class_post_grid_functions->get_post_status(),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'query_order',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Post query order', 'post-grid'),
      'details'    => esc_html__('Query order ascending or descending.', 'post-grid'),
      'type'        => 'select',
      //'for'		=> $taxonomy,
      //'multiple'		=> true,
      'value'        => $query_order,
      'default'        => 'DESC',
      'args'        => array(
        'ASC' => esc_html__('Ascending', 'post-grid'),
        'DESC' => esc_html__('Descending', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'query_orderby',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Post query orderby', 'post-grid'),
      'details'    => esc_html__('Select post query orderby', 'post-grid'),
      'type'        => 'select2',
      'multiple'        => true,
      'value'        => $query_orderby,
      'default'        => array('date'),
      'args'        => $class_post_grid_functions->get_query_orderby(),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'query_orderby_meta_key',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Query orderby meta key', 'post-grid'),
      'details'    => esc_html__('You can use custom meta field key for orderby meta key', 'post-grid'),
      'type'        => 'text',
      'value'        => $query_orderby_meta_key,
      'default'        => '',
      'placeholder'        => 'my_meta_key',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'posts_per_page',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Posts per page', 'post-grid'),
      'details'    => esc_html__('Number of post each pagination. -1 to display all. default is 10 if you left empty.', 'post-grid'),
      'type'        => 'text',
      'value'        => $posts_per_page,
      'default'        => '',
      'placeholder'        => '10',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'offset',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Offset', 'post-grid'),
      'details'    => esc_html__('Display posts from the n\'th, if you set Posts per page to -1 will not work offset.', 'post-grid'),
      'type'        => 'text',
      'value'        => $offset,
      'default'        => '',
      'placeholder'        => '3',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'ignore_paged',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Ignore paged/page query', 'post-grid'),
      'details'    => esc_html__('Ignore paged/page variable from query.', 'post-grid'),
      'type'        => 'select',
      //'for'		=> $taxonomy,
      //'multiple'		=> true,
      'value'        => $ignore_paged,
      'default'        => 'no',
      'args'        => array(
        'no' => esc_html__('No', 'post-grid'),
        'yes' => esc_html__('Yes', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'exclude_post_id',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Exclude by post ID', 'post-grid'),
      'details'    => esc_html__('You can exclude any post by ids here, use comma separate post id value, ex: 45,48', 'post-grid'),
      'type'        => 'text',
      'value'        => $exclude_post_id,
      'default'        => '',
      'placeholder'        => '45,48,50',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'include_post_id',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Include by post ID', 'post-grid'),
      'details'    => esc_html__('You can include any post by ids here, use comma separate post id value, ex: 45,48', 'post-grid'),
      'type'        => 'text',
      'value'        => $include_post_id,
      'default'        => '',
      'placeholder'        => '45,48,50',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'keyword',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Search parameter', 'post-grid'),
      'details'    => esc_html__('Query post by search keyword, please follow the reference https://codex.wordpress.org/Class_Reference/WP_Query#Search_Parameter', 'post-grid'),
      'type'        => 'text',
      'value'        => $keyword,
      'default'        => '',
      'placeholder'        => 'Keyword',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'no_post_text',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('No post found text', 'post-grid'),
      'details'    => esc_html__('Custom text for no post found. default: No post found', 'post-grid'),
      'type'        => 'text',
      'value'        => $no_post_text,
      'default'        => '',
      'placeholder'        => 'No post found',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_layouts', 'post_grid_metabox_tabs_content_layouts', 10, 2);
function post_grid_metabox_tabs_content_layouts($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $layout_id = !empty($post_grid_meta_options['layout_id']) ? $post_grid_meta_options['layout_id'] : ''; //post_grid_get_first_post('post_grid_layout')
  $post_grid_info = get_option('post_grid_info');
  $import_layouts = isset($post_grid_info['import_layouts']) ? $post_grid_info['import_layouts'] : '';
?>
  <div class="section">
    <div class="section-title"><?php echo esc_html__('Layouts', 'post-grid'); ?></div>
    <p class="description section-description"><?php echo esc_html__('Choose item layouts.', 'post-grid'); ?></p>
    <?php
    $layout_convert_url = get_permalink($post_id) . '?post_grid_layout_convert=true';
    $layout_convert_url = wp_nonce_url($layout_convert_url, 'post_grid_layout_convert');
    ob_start();
    ?>
    <span><a target="_blank" class="button" href="<?php echo esc_url(admin_url() . 'post-new.php?post_type=post_grid_layout'); ?>"><?php echo esc_html__('Create layout', 'post-grid'); ?></a>
    </span>
    <span><a target="_blank" class="button" href="<?php echo esc_url(admin_url() . 'edit.php?post_type=post_grid_layout'); ?>"><?php echo esc_html__('Manage layouts', 'post-grid'); ?></a>
    </span>
    <?php
    //if ($import_layouts != 'done') :
    ?>
    <span><a target="_blank" href="<?php echo esc_url(admin_url() . 'admin.php?page=import_layouts'); ?>" class="button import-default-layouts"><?php echo esc_html__('Layouts library', 'post-grid'); ?></a> </span>
    <?php
    // endif;
    $html = ob_get_clean();
    $args = array(
      'id'        => 'create_post_grid_layout',
      'parent'        => 'post_grid_meta_options[query]',
      'title'        => esc_html__('Create layout', 'post-grid'),
      'details'    => esc_html__('Please follow the links to create layouts or manage.', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args);
    $item_layout_args = array();
    $query_args['post_type']         = array('post_grid_layout');
    $query_args['post_status']         = array('publish');
    $query_args['orderby']          = 'date';
    $query_args['order']              = 'DESC';
    $query_args['posts_per_page']     = -1;
    $wp_query = new WP_Query($query_args);
    $item_layout_args[''] = array('name' => 'Empty layout',  'thumb' => post_grid_plugin_url . 'assets/images/placeholder.jpg',);
    if ($wp_query->have_posts()) :
      while ($wp_query->have_posts()) : $wp_query->the_post();
        $post_id = get_the_id();
        $layout_name = get_the_title();
        $product_thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id), 'full');
        $product_thumb_url = isset($product_thumb['0']) ? esc_url($product_thumb['0']) : '';
        $layout_options = get_post_meta($post_id, 'layout_options', true);
        $layout_preview_img = !empty($layout_options['layout_preview_img']) ? $layout_options['layout_preview_img'] : post_grid_plugin_url . 'assets/images/placeholder.jpg';
        $product_thumb_url = !empty($product_thumb_url) ? $product_thumb_url : $layout_preview_img;
        $item_layout_args[$post_id] = array('name' => $layout_name, 'link_text' => 'Edit', 'link' => get_edit_post_link($post_id), 'thumb' => $product_thumb_url,);
      endwhile;
    endif;
    $args = array(
      'id'        => 'layout_id',
      'parent' => 'post_grid_meta_options',
      'title'        => esc_html__('Item layouts', 'post-grid'),
      'details'    => esc_html__('Choose grid item layout. When "Empty layout" is selecetd old layout data will be loaded.', 'post-grid'),
      'type'        => 'radio_image',
      'value'        => $layout_id,
      'default'        => '',
      'width'        => '300px',
      'lazy_load_img'        => post_grid_plugin_url . 'assets/images/loading.gif',
      'args'        => $item_layout_args,
    );
    $settings_tabs_field->generate_field($args);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_skin_layout', 'post_grid_metabox_tabs_content_skin_layout', 10, 2);
function post_grid_metabox_tabs_content_skin_layout($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $class_post_grid_functions = new class_post_grid_functions();
  $post_grid_posttypes_array = post_grid_posttypes_array();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $layout_content = !empty($post_grid_meta_options['layout']['content']) ? $post_grid_meta_options['layout']['content'] : 'OR';
  $enable_multi_skin = !empty($post_grid_meta_options['enable_multi_skin']) ? $post_grid_meta_options['enable_multi_skin'] : 'no';
  $skin = !empty($post_grid_meta_options['skin']) ? $post_grid_meta_options['skin'] : 'flat';
?>
  <div class="section">
    <div class="section-title">Slin & Layout</div>
    <p class="description section-description">Choose skin and customize layout.</p>
    <?php
    $class_post_grid_functions = new class_post_grid_functions();
    ob_start();
    ?>
    <div class="layout-list">
      <div class="idle  ">
        <div class="name">
          <select class="select-layout-content" name="post_grid_meta_options[layout][content]">
            <?php
            $post_grid_layout_content = get_option('post_grid_layout_content');
            if (empty($post_grid_layout_content)) {
              $layout_content_list = $class_post_grid_functions->layout_content_list();
            } else {
              $layout_content_list = $post_grid_layout_content;
            }
            foreach ($layout_content_list as $layout_key => $layout_info) {
            ?>
              <option <?php if ($layout_content == $layout_key) echo 'selected'; ?> value="<?php echo esc_attr($layout_key); ?>"><?php echo esc_html($layout_key); ?></option>
            <?php
            }
            ?>
          </select>
          <a target="_blank" class="edit-layout button" href="<?php echo esc_url(admin_url() . 'edit.php?post_type=post_grid&page=layout_editor&layout_content=' . $layout_content); ?>"><?php echo esc_html__('Edit', 'post-grid'); ?></a>
        </div>
        <script>
          jQuery(document).ready(function($) {
            $(document).on('change', '.select-layout-content', function() {
              var layout = $(this).val();
              $('.edit-layout').attr('href',
                '<?php echo esc_url(admin_url() . 'edit.php?post_type=post_grid&page=layout_editor&layout_content='); ?>' +
                layout);
            })
          })
        </script>
        <?php
        if (empty($layout_content)) {
          $layout_content = 'flat-left';
        }
        ?>
        <div class="layer-content">
          <div class="<?php echo esc_attr($layout_content); ?>">
            <?php
            $post_grid_layout_content = get_option('post_grid_layout_content');
            if (empty($post_grid_layout_content)) {
              $layout = $class_post_grid_functions->layout_content($layout_content);
            } else {
              if (!empty($post_grid_layout_content[$layout_content])) {
                $layout = $post_grid_layout_content[$layout_content];
              } else {
                $layout = array();
              }
            }
            //  $layout = $class_post_grid_functions->layout_content($layout_content);
            foreach ($layout as $item_key => $item_info) {
              $item_key = $item_info['key'];
            ?>
              <div class="item <?php echo esc_attr($item_key); ?>" style=" <?php echo esc_attr($item_info['css']); ?> ">
                <?php
                if ($item_key == 'thumb') {
                ?>
                  <img style="width:100%; height:auto;" src="<?php echo esc_url(post_grid_plugin_url . 'assets/images/placeholder.png'); ?>" />
                <?php
                } elseif ($item_key == 'title') {
                ?>
                  Lorem Ipsum is simply
                <?php
                } elseif ($item_key == 'excerpt') {
                ?>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text
                <?php
                } else {
                  echo esc_html($item_info['name']);
                }
                ?>
              </div>
            <?php
            }
            ?>
          </div>
        </div>
      </div>
    </div>
    <style type="text/css">
      #post-grid .layout-list .idle,
      #post-grid .layout-list .hover {
        display: inline-block;
        height: auto;
        margin: 0 10px;
        vertical-align: top;
        width: 400px;
      }

      #post-grid .layout-list .hover {
        display: none;
      }

      #post-grid .layout-list .idle .name,
      #post-grid .layout-list .hover .name {
        background: rgb(240, 240, 240) none repeat scroll 0 0;
        border-bottom: 1px solid rgb(153, 153, 153);
        font-size: 20px;
        line-height: normal;
        padding: 5px 0;
        text-align: center;
      }

      #post-grid .layout-list .idle .name .edit-layout {
        background: #ddd none repeat scroll 0 0;
        padding: 2px 10px;
        text-decoration: none;
      }
    </style>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'content_layout',
      'title'        => esc_html__('Content Layout', 'post-grid'),
      'details'    => 'Choose Content Layout',
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $skins = $class_post_grid_functions->skins();
    // ob_start();
    ?>
    <div class="setting-field">
      <div class="field-lable">Skins</div>
      <p class="description">Select grid skins</p>
      <div class="field-input">
      </div>
    </div>
    <div class="skin-list">
      <?php
      if (!empty($skins))
        foreach ($skins as $skin_slug => $skin_info) {
      ?>
        <div class="skin-container">
          <?php
          if ($skin == $skin_slug) {
            $checked = 'checked';
            $selected_skin = 'selected';
          } else {
            $checked = '';
            $selected_skin = '';
          }
          ?>
          <div class="header <?php echo esc_attr($selected_skin); ?>">
            <!--                            <span class="edit-link"><a href="#">Edit</a></span>-->
            <label><input <?php echo esc_attr($checked); ?> type="radio" name="post_grid_meta_options[skin]" value="<?php echo esc_attr($skin_slug); ?>"><?php echo esc_html($skin_info['name']); ?></label>
          </div>
          <div class="skin <?php echo esc_attr($skin_slug); ?>">
            <div class="layer-media">
              <div class="thumb "><img src="<?php echo esc_url(post_grid_plugin_url . 'assets/images/placeholder.png'); ?>" /></div>
            </div>
            <div class="layer-content">
              <div class="title "> title</div>
              <div class="content ">There are many variations of passages of Lorem Ipsum available, but the majority have
              </div>
            </div>
          </div>
        </div>
      <?php
        }
      ?>
    </div>
    <style type="text/css">
      #post-grid .skin-list {
        text-align: center;
      }

      #post-grid .skin-list .skin-container {
        display: inline-block;
        margin: 10px;
        width: 310px;
        overflow: hidden;
        vertical-align: top;
        padding: 15px;
      }

      #post-grid .skin-list .skin-container .header {
        background: rgb(252, 110, 60) none repeat scroll 0 0;
        padding: 3px 10px;
        text-align: left;
      }

      #post-grid .skin-list .skin-container .header.selected {
        background: rgb(58, 212, 127) none repeat scroll 0 0;
      }

      #post-grid .skin-list .edit-link {
        float: right;
      }

      #post-grid .skin-list .edit-link a {
        color: #fff;
        text-decoration: none;
      }

      #post-grid .skin-list .skin-container label {
        color: rgb(255, 255, 255);
      }

      #post-grid .skin-list .skin {
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
      }

      #post-grid .skin-list .skin .thumb img {
        height: auto;
        width: 100%;
      }

      #post-grid .skin-list .skin .title {
        font-size: 16px;
        line-height: normal;
        padding: 5px 0;
      }

      #post-grid .skin-list .skin .content {
        font-size: 13px;
        line-height: normal;
        padding: 5px 0;
      }

      #post-grid .skin-list .layer-content>div {
        padding: 5px 15px !important;
      }
    </style>
    <?php
    //            $html = ob_get_clean();
    //
    //            $args = array(
    //                'id'		=> 'skins',
    //                'title'		=> esc_html__('Skins','post-grid'),
    //                'details'	=> 'Select grid Skins',
    //                'type'		=> 'custom_html',
    //                'html'		=> $html,
    //
    //
    //            );
    //
    //            $settings_tabs_field->generate_field($args, $post_id);
    $items_media_height_style = !empty($post_grid_meta_options['media_height']['style']) ? $post_grid_meta_options['media_height']['style'] : 'auto_height';
    $items_media_fixed_height = !empty($post_grid_meta_options['media_height']['fixed_height']) ? $post_grid_meta_options['media_height']['fixed_height'] : '220px';
    $featured_img_size = !empty($post_grid_meta_options['featured_img_size']) ? $post_grid_meta_options['featured_img_size'] : '';
    $thumb_linked = !empty($post_grid_meta_options['thumb_linked']) ? $post_grid_meta_options['thumb_linked'] : 'yes';
    $media_source = !empty($post_grid_meta_options['media_source']) ? $post_grid_meta_options['media_source'] : array();
    ob_start();
    ?>
    <label><input <?php if ($items_media_height_style == 'auto_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[media_height][style]" value="auto_height" /><?php esc_html_e('Auto height', 'post-grid'); ?></label><br />
    <label><input <?php if ($items_media_height_style == 'fixed_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[media_height][style]" value="fixed_height" /><?php esc_html_e('Fixed height', 'post-grid'); ?></label><br />
    <label><input <?php if ($items_media_height_style == 'max_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[media_height][style]" value="max_height" /><?php esc_html_e('Max height', 'post-grid'); ?></label><br />
    <div class="">
      <input type="text" name="post_grid_meta_options[media_height][fixed_height]" value="<?php echo esc_attr($items_media_fixed_height); ?>" />
    </div>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'skins',
      'title'        => esc_html__('Media height', 'post-grid'),
      'details'    => esc_html__('Grid item media height for different device, you can use % or px, em and etc, example: 80% or 250px', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'featured_img_size',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Featured image size', 'post-grid'),
      'details'    => esc_html__('Select media image size', 'post-grid'),
      'type'        => 'select',
      'value'        => $featured_img_size,
      'default'        => 'large',
      'args'        => post_grid_image_sizes(),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'thumb_linked',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Featured image linked to post', 'post-grid'),
      'details'    => esc_html__('Select if you want to link to post with featured image.', 'post-grid'),
      'type'        => 'radio',
      'multiple'        => true,
      'value'        => $thumb_linked,
      'default'        => 'yes',
      'args'        => array(
        'yes' => esc_html__('Yes', 'post-grid'),
        'no' => esc_html__('No', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ob_start();
    ?>
    <?php
    if (empty($media_source)) {
      $media_source = $class_post_grid_functions->media_source();
    } else {
      //$media_source_main = $class_post_grid_functions->media_source();
      $media_source = $media_source;
    }
    ?>
    <div class="media-source-list expandable">
      <?php
      foreach ($media_source as $source_key => $source_info) {
      ?>
        <div class="item">
          <div class="header">
            <span class="move" title="<?php echo esc_html__('Move', 'post-grid'); ?>"><i class="fas fa-bars"></i></span>
            <input type="hidden" name="post_grid_meta_options[media_source][<?php echo esc_attr($source_info['id']); ?>][id]" value="<?php echo esc_attr($source_info['id']); ?>" />
            <input type="hidden" name="post_grid_meta_options[media_source][<?php echo esc_attr($source_info['id']); ?>][title]" value="<?php echo esc_attr($source_info['title']); ?>" />
            <label>
              <input <?php if (!empty($source_info['checked'])) echo 'checked'; ?> type="checkbox" name="post_grid_meta_options[media_source][<?php echo esc_attr($source_info['id']); ?>][checked]" value="yes" /><?php echo esc_html($source_info['title']); ?>
            </label>
          </div>
        </div>
      <?php
      }
      ?>
    </div>
    <script>
      jQuery(document).ready(function($) {
        $(".media-source-list").sortable({
          revert: "invalid",
          handle: '.move'
        });
      })
    </script>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'skins',
      'title'        => esc_html__('Media source', 'post-grid'),
      'details'    => esc_html__('Choose media source you want to display from.', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_item_style', 'post_grid_metabox_tabs_content_item_style', 10, 2);
function post_grid_metabox_tabs_content_item_style($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $class_post_grid_functions = new class_post_grid_functions();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $items_height_style = !empty($post_grid_meta_options['item_height']['style']) ? $post_grid_meta_options['item_height']['style'] : 'auto_height';
  $items_height_style_tablet = !empty($post_grid_meta_options['item_height']['style_tablet']) ? $post_grid_meta_options['item_height']['style_tablet'] : 'auto_height';
  $items_height_style_mobile = !empty($post_grid_meta_options['item_height']['style_mobile']) ? $post_grid_meta_options['item_height']['style_mobile'] : 'auto_height';
  $items_fixed_height = !empty($post_grid_meta_options['item_height']['fixed_height']) ? $post_grid_meta_options['item_height']['fixed_height'] : '220px';
  $items_fixed_height_tablet = !empty($post_grid_meta_options['item_height']['fixed_height_tablet']) ? $post_grid_meta_options['item_height']['fixed_height_tablet'] : '220px';
  $items_fixed_height_mobile = !empty($post_grid_meta_options['item_height']['fixed_height_mobile']) ? $post_grid_meta_options['item_height']['fixed_height_mobile'] : '220px';
  $items_bg_color_type = !empty($post_grid_meta_options['items_bg_color_type']) ? $post_grid_meta_options['items_bg_color_type'] : 'fixed';
  $items_bg_color = !empty($post_grid_meta_options['items_bg_color']) ? $post_grid_meta_options['items_bg_color'] : '#fff';
  $items_margin = !empty($post_grid_meta_options['margin']) ? $post_grid_meta_options['margin'] : '10px';
  $item_padding = !empty($post_grid_meta_options['item_padding']) ? $post_grid_meta_options['item_padding'] : '0px';
?>
  <div class="section">
    <div class="section-title">Item style settings</div>
    <p class="description section-description">Customize item style</p>
    <?php
    ob_start();
    ?>
    <table>
      <tr>
        <td style="padding: 0 20px 0  0">
          <div class="">
            <p><b>Desktop:</b>(min-width:1024px)</p>
            <label><input <?php if ($items_height_style == 'auto_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style]" value="auto_height" /><?php esc_html_e('Auto height', 'post-grid'); ?></label><br />
            <label><input <?php if ($items_height_style == 'fixed_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style]" value="fixed_height" /><?php esc_html_e('Fixed height', 'post-grid'); ?></label><br />
            <label><input <?php if ($items_height_style == 'max_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style]" value="max_height" /><?php esc_html_e('Max height', 'post-grid'); ?></label><br />
            <input type="text" name="post_grid_meta_options[item_height][fixed_height]" value="<?php echo esc_attr($items_fixed_height); ?>" />
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:  0 20px 0  0">
          <div class="">
            <p><b>Tablet:</b>( min-width:768px )</p>
            <label><input <?php if ($items_height_style_tablet == 'auto_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style_tablet]" value="auto_height" /><?php esc_html_e('Auto height', 'post-grid'); ?></label><br />
            <label><input <?php if ($items_height_style_tablet == 'fixed_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style_tablet]" value="fixed_height" /><?php esc_html_e('Fixed height', 'post-grid'); ?></label><br />
            <label><input <?php if ($items_height_style_tablet == 'max_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style_tablet]" value="max_height" /><?php esc_html_e('Max height', 'post-grid'); ?></label><br />
            <input type="text" name="post_grid_meta_options[item_height][fixed_height_tablet]" value="<?php echo esc_attr($items_fixed_height_tablet); ?>" />
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px 0  0">
          <div class="">
            <p><b>Mobile:</b>( min-width : 320px, )</p>
            <label><input <?php if ($items_height_style_mobile == 'auto_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style_mobile]" value="auto_height" /><?php esc_html_e('Auto height', 'post-grid'); ?></label><br />
            <label><input <?php if ($items_height_style_mobile == 'fixed_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style_mobile]" value="fixed_height" /><?php esc_html_e('Fixed height', 'post-grid'); ?></label><br />
            <label><input <?php if ($items_height_style_mobile == 'max_height') echo 'checked'; ?> type="radio" name="post_grid_meta_options[item_height][style_mobile]" value="max_height" /><?php esc_html_e('Max height', 'post-grid'); ?></label><br />
            <input type="text" name="post_grid_meta_options[item_height][fixed_height_mobile]" value="<?php echo esc_attr($items_fixed_height_mobile); ?>" />
          </div>
        </td>
      </tr>
    </table>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'items_height',
      'title'        => esc_html__('Grid item height', 'post-grid'),
      'details'    => esc_html__('Grid item height for different device, you can use % or px, em and etc, example: 80% or 250px', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'items_bg_color_type',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Items background color type', 'post-grid'),
      'details'    => esc_html__('Select items background color type.', 'post-grid'),
      'type'        => 'radio',
      'multiple'        => true,
      'value'        => $items_bg_color_type,
      'default'        => 'fixed',
      'args'        => array(
        'fixed' => esc_html__('Fixed', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'items_bg_color',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Grid item background color', 'post-grid'),
      'details'    => esc_html__('Set custom color for grid item.', 'post-grid'),
      'type'        => 'colorpicker',
      'value'        => $items_bg_color,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'margin',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Grid item margin', 'post-grid'),
      'details'    => esc_html__('Grid item wrapper margin, you can use top right bottom left style, ex: 10px 15px 10px 15px', 'post-grid'),
      'type'        => 'text',
      'value'        => $items_margin,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'item_padding',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Grid item padding', 'post-grid'),
      'details'    => esc_html__('Grid item wrapper padding, you can use top right bottom left style, ex: 10px 15px 10px 15px', 'post-grid'),
      'type'        => 'text',
      'value'        => $item_padding,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_grid_settings', 'post_grid_metabox_tabs_content_grid_settings', 10, 2);
function post_grid_metabox_tabs_content_grid_settings($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $class_post_grid_functions = new class_post_grid_functions();
  $post_grid_posttypes_array = post_grid_posttypes_array();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $items_width_desktop = !empty($post_grid_meta_options['width']['desktop']) ? $post_grid_meta_options['width']['desktop'] : 3;
  $items_width_tablet = !empty($post_grid_meta_options['width']['tablet']) ? $post_grid_meta_options['width']['tablet'] : 2;
  $items_width_mobile = !empty($post_grid_meta_options['width']['mobile']) ? $post_grid_meta_options['width']['mobile'] : 1;
  $grid_layout_name = !empty($post_grid_meta_options['grid_layout']['name']) ? $post_grid_meta_options['grid_layout']['name'] : 'layout_grid';
  $grid_layout_col_multi = !empty($post_grid_meta_options['grid_layout']['col_multi']) ? $post_grid_meta_options['grid_layout']['col_multi'] : '2';
?>
  <div class="section">
    <div class="section-title">Grid settings</div>
    <p class="description section-description">Customize the grid options</p>
    <?php
    ob_start();
    ?>
    <div class="">
      Desktop:(min-width:1024px)<br>
      <input placeholder="250px or 30% or column number(3)" type="text" name="post_grid_meta_options[width][desktop]" value="<?php echo esc_attr($items_width_desktop); ?>" />
    </div>
    <br>
    <div class="">
      Tablet:( min-width: 768px and max-width: 1023px )<br>
      <input placeholder="250px or 30% or column number(3)" type="text" name="post_grid_meta_options[width][tablet]" value="<?php echo esc_attr($items_width_tablet); ?>" />
    </div>
    <br>
    <div class="">
      Mobile:( max-width : 767px, )<br>
      <input placeholder="250px or 30% or column number(3)" type="text" name="post_grid_meta_options[width][mobile]" value="<?php echo esc_attr($items_width_mobile); ?>" />
    </div>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'skins',
      'title'        => esc_html__('Grid item width or column number', 'post-grid'),
      'details'    => esc_html__('Grid item width for different device, you can use % or px, em and  etc, example: 80% or 250px or column number(ex: 3)', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_grid', 'post_grid_metabox_tabs_content_grid', 10, 2);
function post_grid_metabox_tabs_content_grid($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
?>
  <div class="section">
    <div class="section-title">Grid Settings</div>
    <p class="description section-description">Customize the Grid.</p>
    <?php
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_pagination', 'post_grid_metabox_tabs_content_pagination', 10, 2);
function post_grid_metabox_tabs_content_pagination($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $pagination_type = !empty($post_grid_meta_options['nav_bottom']['pagination_type']) ? $post_grid_meta_options['nav_bottom']['pagination_type'] : 'normal';
  $max_num_pages = !empty($post_grid_meta_options['pagination']['max_num_pages']) ? $post_grid_meta_options['pagination']['max_num_pages'] : '0';
  $prev_text = !empty($post_grid_meta_options['pagination']['prev_text']) ? $post_grid_meta_options['pagination']['prev_text'] : __('« Previous', 'post-grid');
  $next_text = !empty($post_grid_meta_options['pagination']['next_text']) ? $post_grid_meta_options['pagination']['next_text'] : __('Next »', 'post-grid');
  $font_size = !empty($post_grid_meta_options['pagination']['font_size']) ? $post_grid_meta_options['pagination']['font_size'] : '16px';
  $font_color = !empty($post_grid_meta_options['pagination']['font_color']) ? $post_grid_meta_options['pagination']['font_color'] : '#fff';
  $bg_color = !empty($post_grid_meta_options['pagination']['bg_color']) ? $post_grid_meta_options['pagination']['bg_color'] : '#646464';
  $active_bg_color = !empty($post_grid_meta_options['pagination']['active_bg_color']) ? $post_grid_meta_options['pagination']['active_bg_color'] : '#4b4b4b';
?>
  <div class="section">
    <div class="section-title">Pagination Settings</div>
    <p class="description section-description">Customize the pagination.</p>
    <?php
    $pagination_types = apply_filters(
      'post_grid_pagination_types',
      array(
        'none' => esc_html__('None', 'post-grid'),
        'normal' => esc_html__('Normal Pagination', 'post-grid'),
      )
    );
    $args = array(
      'id'        => 'pagination_type',
      'parent'        => 'post_grid_meta_options[nav_bottom]',
      'title'        => esc_html__('Pagination type', 'post-grid'),
      'details'    => esc_html__('Select pagination you want to display.', 'post-grid'),
      'type'        => 'radio',
      'multiple'        => true,
      'value'        => $pagination_type,
      'default'        => 'inline',
      'args'        => $pagination_types,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'max_num_pages',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Max number of pagination', 'post-grid'),
      'details'    => esc_html__('Display max number of pagination item, default: 0', 'post-grid'),
      'type'        => 'text',
      'value'        => $max_num_pages,
      'default'        => 0,
      //            'conditions' => array(
      //                'field' => 'post_grid_meta_options','value' => 'normal','type' => '='
      //            )
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'prev_text',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Previous text', 'post-grid'),
      'details'    => esc_html__('Custom text for previous page', 'post-grid'),
      'type'        => 'text',
      'value'        => $prev_text,
      'default'        => '',
      'placeholder'        => '« Previous',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'next_text',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Next text', 'post-grid'),
      'details'    => esc_html__('Custom text for next page', 'post-grid'),
      'type'        => 'text',
      'value'        => $next_text,
      'default'        => '',
      'placeholder'        => 'Next »',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'font_size',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Font size', 'post-grid'),
      'details'    => esc_html__('Custom font size for pagination', 'post-grid'),
      'type'        => 'text',
      'value'        => $font_size,
      'default'        => '16px',
      'placeholder'        => '16px',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'font_color',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Text or link color', 'post-grid'),
      'details'    => esc_html__('Set custom text or link color.', 'post-grid'),
      'type'        => 'colorpicker',
      'value'        => $font_color,
      'default'        => '#ddd',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'bg_color',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Default background color', 'post-grid'),
      'details'    => esc_html__('Set custom background color.', 'post-grid'),
      'type'        => 'colorpicker',
      'value'        => $bg_color,
      'default'        => '#ddd',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'active_bg_color',
      'parent'        => 'post_grid_meta_options[pagination]',
      'title'        => esc_html__('Active or hover background color', 'post-grid'),
      'details'    => esc_html__('Set custom background color.', 'post-grid'),
      'type'        => 'colorpicker',
      'value'        => $active_bg_color,
      'default'        => '#ddd',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_search', 'post_grid_metabox_tabs_content_search', 10, 2);
function post_grid_metabox_tabs_content_search($tab, $post_id)
{
  $class_post_grid_functions = new class_post_grid_functions();
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $search_action_type = !empty($post_grid_meta_options['nav_top']['action_type']) ? $post_grid_meta_options['nav_top']['action_type'] : 'form_submit';
  $nav_top_search = !empty($post_grid_meta_options['nav_top']['search']) ? $post_grid_meta_options['nav_top']['search'] : 'no';
  $nav_top_search_placeholder = !empty($post_grid_meta_options['nav_top']['search_placeholder']) ? $post_grid_meta_options['nav_top']['search_placeholder'] : __('Start typing', 'post-grid');
  $nav_top_search_icon = !empty($post_grid_meta_options['nav_top']['search_icon']) ? $post_grid_meta_options['nav_top']['search_icon'] : '<i class="fas fa-search"></i>';
  $search_loading_icon = !empty($post_grid_meta_options['nav_top']['search_loading_icon']) ? $post_grid_meta_options['nav_top']['search_loading_icon'] : '<i class="fas fa-spinner fa-spin"></i>';
  $query_order = !empty($post_grid_meta_options['nav_top']['query_order']) ? $post_grid_meta_options['nav_top']['query_order'] : 'DESC';
  $query_orderby = !empty($post_grid_meta_options['nav_top']['query_orderby']) ? $post_grid_meta_options['nav_top']['query_orderby'] : array('date');
?>
  <div class="section">
    <div class="section-title">Search Settings</div>
    <p class="description section-description">Choose option for search.</p>
    <?php
    $args = array(
      'id'        => 'action_type',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Search action', 'post-grid'),
      'details'    => esc_html__('Select search action type.', 'post-grid'),
      'type'        => 'radio',
      'value'        => $search_action_type,
      'default'        => 'form_submit',
      'args'        => array(
        'ajax' => esc_html__('Ajax - on change keyword', 'post-grid'),
        'form_submit' => esc_html__('On form submit(GET method)', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'search',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Display search form', 'post-grid'),
      'details'    => esc_html__('Display or hide search form at top.', 'post-grid'),
      'type'        => 'radio',
      'value'        => $nav_top_search,
      'default'        => 'no',
      'args'        => array(
        'yes' => esc_html__('Yes', 'post-grid'),
        'no' => esc_html__('No', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'search_placeholder',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Placeholder text', 'post-grid'),
      'details'    => esc_html__('Custom text for search input field', 'post-grid'),
      'type'        => 'text',
      'value'        => $nav_top_search_placeholder,
      'default'        => esc_html__('Start typing', 'post-grid'),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'search_icon',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Search icon', 'post-grid'),
      'details'    => esc_html__('Custom icon for search input field, you can use <a target="_blank" href="https://fontawesome.com/icons">fontawesome</a> icons.', 'post-grid'),
      'type'        => 'text',
      'value'        => $nav_top_search_icon,
      'default'        => '<i class="fas fa-search"></i>',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'search_loading_icon',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Loading icon', 'post-grid'),
      'details'    => esc_html__('Custom icon for search input field, you can use <a target="_blank" href="https://fontawesome.com/icons">fontawesome</a> icons.', 'post-grid'),
      'type'        => 'text',
      'value'        => $search_loading_icon,
      'default'        => '<i class="fas fa-spinner fa-spin"></i>',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'query_order',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Post query order', 'post-grid'),
      'details'    => esc_html__('Query order ascending or descending.', 'post-grid'),
      'type'        => 'select',
      //'for'		=> $taxonomy,
      //'multiple'		=> true,
      'value'        => $query_order,
      'default'        => 'DESC',
      'args'        => array(
        'ASC' => esc_html__('Ascending', 'post-grid'),
        'DESC' => esc_html__('Descending', 'post-grid'),
      ),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'query_orderby',
      'parent'        => 'post_grid_meta_options[nav_top]',
      'title'        => esc_html__('Post query orderby', 'post-grid'),
      'details'    => esc_html__('Select post query orderby', 'post-grid'),
      'type'        => 'select2',
      'multiple'        => true,
      'value'        => $query_orderby,
      'default'        => array('date'),
      'args'        => $class_post_grid_functions->get_query_orderby(),
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_masonry', 'post_grid_metabox_tabs_content_masonry', 10, 2);
function post_grid_metabox_tabs_content_masonry($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $masonry = !empty($post_grid_meta_options['masonry']) ? $post_grid_meta_options['masonry'] : [];
  $masonry_enable = !empty($post_grid_meta_options['masonry_enable']) ? $post_grid_meta_options['masonry_enable'] : 'no';
  $masonry_gutter = isset($masonry['gutter']) ? $masonry['gutter'] : 20;
  $columns_desktop = !empty($masonry['columns']['desktop']) ? $masonry['columns']['desktop'] : '3';
  $columns_tablet = !empty($masonry['columns']['tablet']) ? $masonry['columns']['tablet'] : '2';
  $columns_mobile = !empty($masonry['columns']['mobile']) ? $masonry['columns']['mobile'] : '1';
?>
  <div class="section">
    <div class="section-title">Masonry Settings</div>
    <p class="description section-description">Customize the masonry.</p>
    <?php
    ob_start();
    ?>
    <div class="">
      Desktop:(min-width:1024px)<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[masonry][columns][desktop]" value="<?php echo esc_attr($columns_desktop); ?>" />
    </div>
    <br>
    <div class="">
      Tablet:( min-width: 768px and max-width: 1023px )<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[masonry][columns][tablet]" value="<?php echo esc_attr($columns_tablet); ?>" />
    </div>
    <br>
    <div class="">
      Mobile:( max-width : 767px, )<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[masonry][columns][mobile]" value="<?php echo esc_attr($columns_mobile); ?>" />
    </div>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'html',
      'title'        => esc_html__('Masonry Column number', 'post-grid'),
      'details'    => esc_html__('Number of columns for responsive device', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'gutter',
      'parent'        => 'post_grid_meta_options[masonry]',
      'title'        => esc_html__('Masonry gutter', 'post-grid'),
      'details'    => esc_html__('Set custom gutter size of masonry. ex: 5', 'post-grid'),
      'type'        => 'number',
      'value'        => $masonry_gutter,
      'default'        => '20',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_tiles', 'post_grid_metabox_tabs_content_tiles', 10, 2);
function post_grid_metabox_tabs_content_tiles($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $tiles = !empty($post_grid_meta_options['tiles']) ? $post_grid_meta_options['tiles'] : [];
  $tiles_gutter = isset($tiles['gutter']) ? $tiles['gutter'] : 20;
  $columns_desktop = !empty($tiles['columns']['desktop']) ? $tiles['columns']['desktop'] : '3';
  $columns_tablet = !empty($tiles['columns']['tablet']) ? $tiles['columns']['tablet'] : '2';
  $columns_mobile = !empty($tiles['columns']['mobile']) ? $tiles['columns']['mobile'] : '1';
?>
  <div class="section">
    <div class="section-title">Tiles Settings</div>
    <p class="description section-description">Customize the tiles.</p>
    <?php
    ob_start();
    ?>
    <div class="">
      Desktop:(min-width:1024px)<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[tiles][columns][desktop]" value="<?php echo esc_attr($columns_desktop); ?>" />
    </div>
    <br>
    <div class="">
      Tablet:( min-width: 768px and max-width: 1023px )<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[tiles][columns][tablet]" value="<?php echo esc_attr($columns_tablet); ?>" />
    </div>
    <br>
    <div class="">
      Mobile:( max-width : 767px, )<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[tiles][columns][mobile]" value="<?php echo esc_attr($columns_mobile); ?>" />
    </div>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'skins',
      'title'        => esc_html__('Grid item width or column number', 'post-grid'),
      'details'    => esc_html__('Number of columns for responsive device', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'gutter',
      'parent'        => 'post_grid_meta_options[tiles]',
      'title'        => esc_html__('Tiles gutter', 'post-grid'),
      'details'    => esc_html__('Set custom gutter size of tiles. ex: 5', 'post-grid'),
      'type'        => 'number',
      'value'        => $tiles_gutter,
      'default'        => '20',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_justified', 'post_grid_metabox_tabs_content_justified', 10, 2);
function post_grid_metabox_tabs_content_justified($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $justified = !empty($post_grid_meta_options['justified']) ? $post_grid_meta_options['justified'] : [];
  $justified_gutter = isset($justified['gutter']) ? $justified['gutter'] : 20;
  $maxHeight = isset($justified['maxHeight']) ? $justified['maxHeight'] : 180;
  $columns_desktop = !empty($justified['columns']['desktop']) ? $justified['columns']['desktop'] : '3';
  $columns_tablet = !empty($justified['columns']['tablet']) ? $justified['columns']['tablet'] : '2';
  $columns_mobile = !empty($justified['columns']['mobile']) ? $justified['columns']['mobile'] : '1';
?>
  <div class="section">
    <div class="section-title">Justified Settings</div>
    <p class="description section-description">Customize the justified.</p>
    <?php
    ob_start();
    ?>
    <div class="">
      Desktop:(min-width:1024px)<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[justified][columns][desktop]" value="<?php echo esc_attr($columns_desktop); ?>" />
    </div>
    <br>
    <div class="">
      Tablet:( min-width: 768px and max-width: 1023px )<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[justified][columns][tablet]" value="<?php echo esc_attr($columns_tablet); ?>" />
    </div>
    <br>
    <div class="">
      Mobile:( max-width : 767px, )<br>
      <input placeholder="250px or 30% or column number(3)" type="number" name="post_grid_meta_options[justified][columns][mobile]" value="<?php echo esc_attr($columns_mobile); ?>" />
    </div>
    <?php
    $html = ob_get_clean();
    $args = array(
      'id'        => 'html',
      'title'        => esc_html__('Column number', 'post-grid'),
      'details'    => esc_html__('Number of columns for responsive device', 'post-grid'),
      'type'        => 'custom_html',
      'html'        => $html,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'gutter',
      'parent'        => 'post_grid_meta_options[justified]',
      'title'        => esc_html__('Justified gutter', 'post-grid'),
      'details'    => esc_html__('Set custom gutter size of justified. ex: 5', 'post-grid'),
      'type'        => 'number',
      'value'        => $justified_gutter,
      'default'        => '20',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    $args = array(
      'id'        => 'maxHeight',
      'parent'        => 'post_grid_meta_options[justified]',
      'title'        => esc_html__('Justified max height', 'post-grid'),
      'details'    => esc_html__('Set custom max height', 'post-grid'),
      'type'        => 'number',
      'value'        => $maxHeight,
      'default'        => '180',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
<?php
}
add_action('post_grid_metabox_tabs_content_custom_scripts', 'post_grid_metabox_tabs_content_custom_scripts', 10, 2);
function post_grid_metabox_tabs_content_custom_scripts($tab, $post_id)
{
  $settings_tabs_field = new settings_tabs_field();
  $post_grid_meta_options = get_post_meta($post_id, 'post_grid_meta_options', true);
  $custom_js = !empty($post_grid_meta_options['custom_js']) ? $post_grid_meta_options['custom_js'] : '';
  $custom_css = !empty($post_grid_meta_options['custom_css']) ? $post_grid_meta_options['custom_css'] : '';
?>
  <div class="section">
    <div class="section-title">Custom Scripts & CSS</div>
    <p class="description section-description">Write your custom Scripts and CSS here.</p>
    <?php
    $args = array(
      'id'        => 'custom_js',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Custom Js.', 'post-grid'),
      'details'    => esc_html__('You can add custom scripts here, do not use <code>&lt;script&gt; &lt;/script&gt;</code> tag', 'post-grid'),
      'type'        => 'scripts_js',
      'default'        => '',
      'value'        => $custom_js,
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
    <?php
    $args = array(
      'id'        => 'custom_css',
      'parent'        => 'post_grid_meta_options',
      'title'        => esc_html__('Custom CSS.', 'post-grid'),
      'details'    => esc_html__('You can add custom css here, do not use <code>  &lt;style&gt; &lt;/style&gt;</code> tag', 'post-grid'),
      'type'        => 'scripts_css',
      'value'        => $custom_css,
      'default'        => '',
    );
    $settings_tabs_field->generate_field($args, $post_id);
    ?>
  </div>
  <?php
}
function post_grid_update_taxonomies_terms_by_posttypes()
{
  $settings_tabs_field = new settings_tabs_field();
  $response = array();
  //$taxonomies = array();
  if (current_user_can('manage_options')) {
    $post_types = isset($_POST['post_types']) ? post_grid_recursive_sanitize_arr(wp_unslash($_POST['post_types'])) : array();
    $grid_id = isset($_POST['grid_id']) ? sanitize_text_field(wp_unslash($_POST['grid_id'])) : '';
    $post_grid_meta_options = get_post_meta($grid_id, 'post_grid_meta_options', true);
    $taxonomies = !empty($post_grid_meta_options['taxonomies']) ? $post_grid_meta_options['taxonomies'] : array();
    $post_taxonomies_arr = post_grid_get_taxonomies($post_types);
    ob_start();
    if (!empty($post_taxonomies_arr)) :
      foreach ($post_taxonomies_arr as $taxonomyIndex => $taxonomy) {
        $taxonomy_term_arr = array();
        $the_taxonomy = get_taxonomy($taxonomy);
        $terms_relation = isset($taxonomies[$taxonomy]['terms_relation']) ? $taxonomies[$taxonomy]['terms_relation'] : 'IN';
        $terms = isset($taxonomies[$taxonomy]['terms']) ? $taxonomies[$taxonomy]['terms'] : array();
        $checked = isset($taxonomies[$taxonomy]['checked']) ? $taxonomies[$taxonomy]['checked'] : '';
        $taxonomy_terms = get_terms(array(
          'taxonomy' => $taxonomy,
          'hide_empty' => false,
        ));
        if (!empty($taxonomy_terms))
          foreach ($taxonomy_terms as $taxonomy_term) {
            $taxonomy_term_arr[$taxonomy_term->term_id] = $taxonomy_term->name . '(' . $taxonomy_term->count . ')';
          }
        $taxonomy_term_arr = !empty($taxonomy_term_arr) ? $taxonomy_term_arr : array();
  ?>
        <div class="item">
          <div class="header">
            <span class="expand">
              <i class="fas fa-expand"></i>
              <i class="fas fa-compress"></i>
            </span>
            <label><input type="checkbox" <?php if (!empty($checked)) echo 'checked'; ?> name="post_grid_meta_options[taxonomies][<?php echo esc_attr($taxonomy); ?>][checked]" value="<?php echo esc_attr($taxonomy); ?>" />
              <?php echo esc_html($the_taxonomy->labels->name); ?>(<?php echo esc_html($taxonomy); ?>)</label>
          </div>
          <div class="options">
            <?php
            $args = array(
              'id'        => 'terms',
              'css_id'        => 'terms-' . esc_attr($taxonomyIndex),
              'parent'        => 'post_grid_meta_options[taxonomies][' . esc_attr($taxonomy) . ']',
              'title'        => esc_html__('Categories or Terms', 'post-grid'),
              'details'    => esc_html__('Select post terms or categories', 'post-grid'),
              'type'        => 'select2',
              'multiple'        => true,
              'value'        => $terms,
              'default'        => array(),
              'args'        => $taxonomy_term_arr,
            );
            $settings_tabs_field->generate_field($args, $grid_id);
            $args = array(
              'id'        => 'terms_relation',
              'parent'        => 'post_grid_meta_options[taxonomies][' . esc_attr($taxonomy) . ']',
              'title'        => esc_html__('Terms relation', 'post-grid'),
              'details'    => esc_html__('Choose term relation.', 'post-grid'),
              'type'        => 'radio',
              'for'        => esc_attr($taxonomy),
              'multiple'        => true,
              'value'        => $terms_relation,
              'default'        => 'IN',
              'args'        => array(
                'IN' => esc_html__('IN', 'post-grid'),
                'NOT IN' => esc_html__('NOT IN', 'post-grid'),
                'AND' => esc_html__('AND', 'post-grid'),
                'EXISTS' => esc_html__('EXISTS', 'post-grid'),
                'NOT EXISTS' => esc_html__('NOT EXISTS', 'post-grid'),
              ),
            );
            $settings_tabs_field->generate_field($args, $grid_id);
            ?>
          </div>
        </div>
<?php
      }
    else :
      echo esc_html__('Please choose at least one post types. save/update post grid', 'post-grid');
    endif;
    $response['html'] = ob_get_clean();
    echo wp_json_encode($response);
  }
  die();
}
add_action('wp_ajax_post_grid_update_taxonomies_terms_by_posttypes', 'post_grid_update_taxonomies_terms_by_posttypes');
