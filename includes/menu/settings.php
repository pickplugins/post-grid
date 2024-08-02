<?php
if (!defined('ABSPATH')) exit;  // if direct access


$current_tab = isset($_REQUEST['tab']) ? sanitize_text_field($_REQUEST['tab']) : 'general';

$post_grid_settings_tab = array();

$post_grid_settings_tab[] = array(
  'id' => 'general',
  'title' => sprintf(__('%s General', 'post-grid'), '<i class="fas fa-list-ul"></i>'),
  'priority' => 1,
  'active' => ($current_tab == 'general') ? true : false,
);


// $post_grid_settings_tab[] = array(
//   'id' => 'disable_blocks',
//   'title' => sprintf(__('%s Disable Blocks', 'post-grid'), '<i class="fas fa-list-ul"></i>'),
//   'priority' => 10,
//   'active' => ($current_tab == 'disable_blocks') ? true : false,
// );

$post_grid_settings_tab = apply_filters('post_grid_settings_tabs', $post_grid_settings_tab);




$tabs_sorted = array();

if (!empty($post_grid_settings_tab))
  foreach ($post_grid_settings_tab as $page_key => $tab) $tabs_sorted[$page_key] = isset($tab['priority']) ? $tab['priority'] : 0;
array_multisort($tabs_sorted, SORT_ASC, $post_grid_settings_tab);



$post_grid_settings = get_option('post_grid_settings');

?>
<div class="wrap">



  <div class="p-5 bg-white">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-6 ">

        <div class="text-[40px] font-black flex text-indigo-600 items-center ">

          <div class="mr-5">
            <svg width="50" height="50" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M267.846 117.688C267.846 114.926 270.085 112.688 272.846 112.688H450C452.761 112.688 455 114.926 455 117.688V144.205C455 146.967 452.761 149.205 450 149.205H272.846C270.085 149.205 267.846 146.967 267.846 144.205V117.688Z" fill="#4f46e5" />
              <path d="M267.846 194.375C267.846 191.614 270.085 189.375 272.846 189.375H450C452.761 189.375 455 191.614 455 194.375V220.893C455 223.654 452.761 225.893 450 225.893H272.846C270.085 225.893 267.846 223.654 267.846 220.893V194.375Z" fill="#4f46e5" />
              <path d="M267.846 41C267.846 38.2386 270.085 36 272.846 36H450C452.761 36 455 38.2386 455 41V67.5179C455 70.2793 452.761 72.5179 450 72.5179H272.846C270.085 72.5179 267.846 70.2793 267.846 67.5179V41Z" fill="#4f46e5" />
              <rect x="66" y="56" width="149.893" height="149.893" stroke="#4f46e5" stroke-width="40" />
              <path d="M233.154 383.355C233.154 386.116 230.915 388.355 228.154 388.355L51 388.355C48.2386 388.355 46 386.116 46 383.355L46 356.837C46 354.076 48.2386 351.837 51 351.837L228.154 351.837C230.915 351.837 233.154 354.076 233.154 356.837L233.154 383.355Z" fill="#4f46e5" />
              <path d="M233.154 306.667C233.154 309.429 230.915 311.667 228.154 311.667L51 311.667C48.2386 311.667 46 309.429 46 306.667L46 280.15C46 277.388 48.2386 275.15 51 275.15L228.154 275.15C230.915 275.15 233.154 277.388 233.154 280.15L233.154 306.667Z" fill="#4f46e5" />
              <path d="M233.154 460.042C233.154 462.804 230.915 465.042 228.154 465.042L51 465.042C48.2386 465.042 46 462.804 46 460.042L46 433.525C46 430.763 48.2386 428.525 51 428.525L228.154 428.525C230.915 428.525 233.154 430.763 233.154 433.525L233.154 460.042Z" fill="#4f46e5" />
              <rect x="435" y="445.042" width="149.893" height="149.893" transform="rotate(-180 435 445.042)" stroke="#4f46e5" stroke-width="40" />
            </svg>

          </div>

          <div>
            Combo Blcoks - <?php echo post_grid_version; ?>
          </div>
        </div>



      </div>
      <div class="col-span-6 text-right">

        <a href="https://pickplugins.com/create-support-ticket/" target="_blank" class="inline-block px-4 py-2 rounded-sm bg-blue-600 text-white text-lg mx-2 hover:text-white ">Create
          Support</a>


        <a href="https://comboblocks.com/documentations/" target="_blank" class="inline-block px-4 py-2 rounded-sm bg-blue-600 text-white text-lg mx-2 hover:text-white ">Documentation</a>



      </div>

    </div>

  </div>

  <form method="post" action="<?php echo esc_url(str_replace('%7E', '~', esc_url($_SERVER['REQUEST_URI']))); ?>">
    <input type="hidden" name="post_grid_hidden" value="Y">
    <input type="hidden" name="tab" value="<?php echo esc_attr($current_tab); ?>">
    <?php
    if (!empty($_POST['post_grid_hidden'])) {
      $nonce = sanitize_text_field($_POST['_wpnonce']);
      if (wp_verify_nonce($nonce, 'post_grid_nonce') && $_POST['post_grid_hidden'] == 'Y') {
        do_action('post_grid_settings_save');
    ?>
        <div class="updated notice  is-dismissible">
          <p><strong><?php _e('Changes Saved.', 'post-grid'); ?></strong></p>
        </div>
    <?php
      }
    }
    ?>
    <div class="settings-tabs-loading" style="">Loading...</div>
    <div class="settings-tabs vertical has-right-panel" style="display: none">
      <div class="settings-tabs-right-panel">
        <?php
        if (!empty($post_grid_settings_tab))
          foreach ($post_grid_settings_tab as $tab) {
            $id = $tab['id'];
            $active = $tab['active'];
        ?>
          <div class="right-panel-content <?php if ($active) echo 'active'; ?> right-panel-content-<?php echo esc_attr($id); ?>">
            <?php
            do_action('post_grid_settings_tabs_right_panel_' . $id);
            ?>
          </div>
        <?php
          }
        ?>
      </div>
      <ul class="tab-navs">
        <?php
        if (!empty($post_grid_settings_tab))
          foreach ($post_grid_settings_tab as $tab) {

            $id = isset($tab['id']) ? $tab['id'] : '';
            $title = isset($tab['title']) ? $tab['title'] : '';
            $active = isset($tab['active']) ? $tab['active'] : '';
            $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
            $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
            $is_pro = isset($tab['is_pro']) ? $tab['is_pro'] : false;
            $pro_text = isset($tab['pro_text']) ? $tab['pro_text'] : '';
        ?>
          <li <?php if (!empty($data_visible)) :  ?> data_visible="<?php echo esc_attr($data_visible); ?>" <?php endif; ?> class="tab-nav <?php if ($hidden) echo 'hidden'; ?> <?php if ($active) echo 'active'; ?>" data-id="<?php echo esc_attr($id); ?>">
            <?php echo ($title); ?>
            <?php
            if ($is_pro) :
            ?><span class="pro-feature"><?php echo esc_html($pro_text); ?></span> <?php
                                                                                endif;
                                                                                  ?>
          </li>
        <?php
          }
        ?>
      </ul>
      <?php
      if (!empty($post_grid_settings_tab))
        foreach ($post_grid_settings_tab as $tab) {
          $id = $tab['id'];
          $title = $tab['title'];
          $active = $tab['active'];
      ?>
        <div class="tab-content <?php if ($active) echo 'active'; ?>" id="<?php echo esc_attr($id); ?>">
          <?php
          do_action('post_grid_settings_content_' . $id, $tab);
          ?>
        </div>
      <?php
        }
      ?>
      <div class="clear clearfix"></div>
      <p class="submit">
        <?php wp_nonce_field('post_grid_nonce'); ?>
        <input class="button button-primary" type="submit" name="Submit" value="<?php _e('Save Changes', 'post-grid'); ?>" />
      </p>
    </div>
  </form>
</div>