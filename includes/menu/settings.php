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

//$post_grid_settings_tab[] = array(
//    'id' => 'templates',
//    'title' => sprintf(__('%s Templates','post-grid'),'<i class="far fa-newspaper"></i>'),
//    'priority' => 3,
//    'active' => ($current_tab == 'templates') ? true : false,
//);

// $post_grid_settings_tab[] = array(
//     'id' => 'help_support',
//     'title' => sprintf(__('%s Help & support', 'post-grid'), '<i class="fas fa-hands-helping"></i>'),
//     'priority' => 90,
//     'active' => ($current_tab == 'help_support') ? true : false,
// );



// $post_grid_settings_tab[] = array(
//     'id' => 'buy_pro',
//     'title' => sprintf(__('%s Buy Pro', 'post-grid'), '<i class="fas fa-store"></i>'),
//     'priority' => 95,
//     'active' => ($current_tab == 'buy_pro') ? true : false,
// );


$post_grid_settings_tab[] = array(
    'id' => 'disable_blocks',
    'title' => sprintf(__('%s Disable Blocks', 'post-grid'), '<i class="fas fa-store"></i>'),
    'priority' => 95,
    'active' => ($current_tab == 'disable_blocks') ? true : false,
);

$post_grid_settings_tab[] = array(
    'id' => 'license_free',
    'title' => __('<i class="fas fa-laptop-code"></i> License', 'post-grid'),
    'priority' => 90,
    'active' => ($current_tab == 'license_free') ? true : false,
);



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

                <div class="text-[40px] font-black text-indigo-600  ">
                    <img class="inline-block w-12 align-middle" src="<?php echo post_grid_plugin_url . 'assets/admin/images/post-grid-50.png'; ?>" alt="">
                    <a class="hover:text-blue-600" href="">Post Grid</a>
                    - 3.0.0
                </div>



            </div>
            <div class="col-span-6 text-right">

                <a href="" class="inline-block px-4 py-2 rounded-sm bg-blue-600 text-white text-lg mx-2 hover:text-white ">Create Support</a>


                <a href="" class="inline-block px-4 py-2 rounded-sm bg-blue-600 text-white text-lg mx-2 hover:text-white ">Documentation</a>



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