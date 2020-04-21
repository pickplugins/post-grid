<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

class class_metabox_post_grid_layout{
	
	public function __construct(){

		//meta box action for "post_grid"
		add_action('add_meta_boxes', array($this, 'metabox_post_grid_layout'));
		add_action('save_post', array($this, 'metabox_post_grid_layout_save'));



		}


	public function metabox_post_grid_layout($post_type){

            add_meta_box('metabox-post_grid-layout',__('Layout data', 'post-grid'), array($this, 'meta_box_post_grid_layout_data'), 'post_grid_layout', 'normal', 'high');

		}






	public function meta_box_post_grid_layout_data($post) {
 
        // Add an nonce field so we can check for it later.
        wp_nonce_field('post_grid_nonce_check', 'post_grid_nonce_check_value');
 
        // Use get_post_meta to retrieve an existing value from the database.
       // $post_grid_data = get_post_meta($post -> ID, 'post_grid_data', true);

        $post_id = $post->ID;


        $settings_tabs_field = new settings_tabs_field();

        $post_grid_settings_tab = array();

        $post_grid_settings_tab[] = array(
            'id' => 'layout_builder',
            'title' => sprintf(__('%s Layout editor','post-grid'),'<i class="fas fa-qrcode"></i>'),
            'priority' => 4,
            'active' => true,
        );


        $post_grid_settings_tab[] = array(
            'id' => 'custom_scripts',
            'title' => sprintf(__('%s Custom scripts','post-grid'),'<i class="far fa-building"></i>'),
            'priority' => 5,
            'active' => false,
        );



        $post_grid_settings_tab = apply_filters('post_grid_layout_metabox_navs', $post_grid_settings_tab);

        $tabs_sorted = array();
        foreach ($post_grid_settings_tab as $page_key => $tab) $tabs_sorted[$page_key] = isset( $tab['priority'] ) ? $tab['priority'] : 0;
        array_multisort($tabs_sorted, SORT_ASC, $post_grid_settings_tab);



        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-sortable');
        wp_enqueue_script( 'jquery-ui-core' );
        wp_enqueue_script('jquery-ui-accordion');
        wp_enqueue_script('wp-color-picker');
        wp_enqueue_style('wp-color-picker');


        wp_enqueue_style( 'jquery-ui');
        wp_enqueue_style( 'font-awesome-5' );
        wp_enqueue_style( 'settings-tabs' );
        wp_enqueue_script( 'settings-tabs' );


		?>


        <div class="settings-tabs vertical">
            <ul class="tab-navs">
                <?php
                foreach ($post_grid_settings_tab as $tab){
                    $id = $tab['id'];
                    $title = $tab['title'];
                    $active = $tab['active'];
                    $data_visible = isset($tab['data_visible']) ? $tab['data_visible'] : '';
                    $hidden = isset($tab['hidden']) ? $tab['hidden'] : false;
                    ?>
                    <li <?php if(!empty($data_visible)):  ?> data_visible="<?php echo $data_visible; ?>" <?php endif; ?> class="tab-nav <?php if($hidden) echo 'hidden';?> <?php if($active) echo 'active';?>" data-id="<?php echo $id; ?>"><?php echo $title; ?></li>
                    <?php
                }
                ?>
            </ul>
            <?php
            foreach ($post_grid_settings_tab as $tab){
                $id = $tab['id'];
                $title = $tab['title'];
                $active = $tab['active'];
                ?>

                <div class="tab-content <?php if($active) echo 'active';?>" id="<?php echo $id; ?>">
                    <?php
                    do_action('post_grid_layout_metabox_content_'.$id, $post_id);
                    ?>
                </div>
                <?php
            }
            ?>
        </div>
        <div class="clear clearfix"></div>

        <?php






        //do_action('post_grid_metabox_post_grid_data', $post);


   		}




	public function metabox_post_grid_layout_save($post_id){

        /*
         * We need to verify this came from the our screen and with
         * proper authorization,
         * because save_post can be triggered at other times.
         */

        // Check if our nonce is set.
        if (!isset($_POST['post_grid_nonce_check_value']))
            return $post_id;

        $nonce = $_POST['post_grid_nonce_check_value'];

        // Verify that the nonce is valid.
        if (!wp_verify_nonce($nonce, 'post_grid_nonce_check'))
            return $post_id;

        // If this is an autosave, our form has not been submitted,
        //     so we don't want to do anything.
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            return $post_id;

        // Check the user's permissions.
        if ('page' == $_POST['post_type']) {

            if (!current_user_can('edit_page', $post_id))
                return $post_id;

        } else {

            if (!current_user_can('edit_post', $post_id))
                return $post_id;
        }

        /* OK, its safe for us to save the data now. */

        // Sanitize the user input.
        //$grid_item_layout = stripslashes_deep($_POST['grid_item_layout']);


        // Update the meta field.
        //update_post_meta($post_id, 'grid_item_layout', $grid_item_layout);

        do_action('post_grid_layout_metabox_save', $post_id);


					
		}
	
	}


new class_metabox_post_grid_layout();