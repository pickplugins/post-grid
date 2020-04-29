<?php	
if ( ! defined('ABSPATH')) exit;  // if direct access

$post_grid_info = get_option('post_grid_info');

$import_layouts = isset($post_grid_info['import_layouts']) ? $post_grid_info['import_layouts'] : '';

?>
<div class="wrap">
	<div id="icon-tools" class="icon32"><br></div><h2><?php echo sprintf(__('%s - Import layouts', 'post-grid'), post_grid_plugin_name)?></h2>


    <form  method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
        <input type="hidden" name="post_grid_hidden" value="Y">
        <?php
        if(!empty($_POST['post_grid_hidden'])){
            $nonce = sanitize_text_field($_POST['_wpnonce']);
            if(wp_verify_nonce( $nonce, 'post_grid_nonce' ) && $_POST['post_grid_hidden'] == 'Y') {

                $import_layouts = isset($_POST['import_layouts']) ? 'done' : '';
                $post_grid_info['import_layouts'] = $import_layouts;

                update_option('post_grid_info', $post_grid_info)

                ?>
                <div class="updated notice  is-dismissible"><p><strong><?php _e('Changes Saved.', 'post-grid' ); ?></strong></p></div>
                <?php
            }
        }


        if (is_plugin_active('post-grid-pro/post-grid-pro.php')){
            $layouts_plugin_url = post_grid_pro_plugin_url;
        }else{
            $layouts_plugin_url = post_grid_plugin_url;
        }



        ?>

        <p><b>Post Gird</b> provide some ready layouts to get started, please follow the steps bellow to import default layouts.</p>

        <ul>
            <li>Step - 1: Go to <a href="<?php echo admin_url(); ?>import.php">import</a> menu and install & activate <b>WordPress</b> Importer plugin. click to "Install Now" button to install.</li>
            <li>Step - 2: Download following xml file <a href="<?php echo $layouts_plugin_url; ?>sample-data/post-grid-layouts.xml">post-grid-layouts.xml</a>, save the file on your local machine.</li>
            <li>Step - 3: Go to importer page <a href="<?php echo admin_url(); ?>import.php?import=wordpress">Import WordPress</a> and chose the downloaded file and then click to <b>Upload file and import</b>.</li>
            <li>Step - 4: Go to <a href="<?php echo admin_url(); ?>edit.php?post_type=post_grid_layout">Post Grid layouts</a> page to see imported layouts.</li>

        </ul>


        <p><label><input type="checkbox" <?php if(!empty($import_layouts)) echo 'checked'; ?>  name="import_layouts" value="1"> Mark as done</label></p>


        <div class="clear clearfix"></div>
        <p class="submit">
            <?php wp_nonce_field( 'post_grid_nonce' ); ?>
            <input class="button button-primary" type="submit" name="Submit" value="<?php _e('Save Changes','post-grid' ); ?>" />
        </p>


    </form>


















</div>
