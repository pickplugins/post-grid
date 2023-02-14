<?php
if (!defined('ABSPATH')) exit;  // if direct access

class class_post_grid_post_types
{


    public function __construct()
    {
        add_action('init', array($this, '_posttype_post_grid'), 0);

        add_action('init', array($this, '_posttype_post_grid_layout'), 80);
        add_action('init', array($this, '_posttype_saved_template'),);
    }


    public function _posttype_post_grid()
    {

        if (post_type_exists("post_grid"))
            return;

        $singular  = __('Post Grid', 'post-grid');
        $plural    = __('Post Grid', 'post-grid');
        $post_grid_settings = get_option('post_grid_settings');
        $post_grid_preview = isset($post_grid_settings['post_grid_preview']) ? $post_grid_settings['post_grid_preview'] : 'yes';


        register_post_type(
            "post_grid",
            apply_filters("post_grid_posttype_post_grid", array(
                'labels' => array(
                    'name'                     => $plural,
                    'singular_name'         => $singular,
                    'menu_name'             => $singular,
                    'all_items'             => sprintf(__('All %s', 'post-grid'), $plural),
                    'add_new'                 => __('Add New', 'post-grid'),
                    'add_new_item'             => sprintf(__('Add %s', 'post-grid'), $singular),
                    'edit'                     => __('Edit', 'post-grid'),
                    'edit_item'             => sprintf(__('Edit %s', 'post-grid'), $singular),
                    'new_item'                 => sprintf(__('New %s', 'post-grid'), $singular),
                    'view'                     => sprintf(__('View %s', 'post-grid'), $singular),
                    'view_item'             => sprintf(__('View %s', 'post-grid'), $singular),
                    'search_items'             => sprintf(__('Search %s', 'post-grid'), $plural),
                    'not_found'             => sprintf(__('No %s found', 'post-grid'), $plural),
                    'not_found_in_trash'     => sprintf(__('No %s found in trash', 'post-grid'), $plural),
                    'parent'                 => sprintf(__('Parent %s', 'post-grid'), $singular)
                ),
                'description' => sprintf(__('This is where you can create and manage %s.', 'post-grid'), $plural),
                'public'                 => false,
                'show_ui'                 => true,
                'capability_type'         => 'post',
                'map_meta_cap'          => true,
                'publicly_queryable'     => ($post_grid_preview == 'yes') ? true : false,
                'exclude_from_search'     => false,
                'hierarchical'             => false,
                'query_var'             => true,
                'supports'                 => array('title'),
                'show_in_nav_menus'     => true,
                'menu_icon' => 'dashicons-grid-view',
                'show_in_menu'     => 'post-grid',


            ))
        );
    }



    public function _posttype_post_grid_layout()
    {

        if (post_type_exists("post_grid_layout"))
            return;

        $singular  = __('Layout', 'post-grid');
        $plural    = __('Layouts', 'post-grid');


        register_post_type(
            "post_grid_layout",
            apply_filters("post_grid_posttype_post_grid_layout", array(
                'labels' => array(
                    'name'                     => $plural,
                    'singular_name'         => $singular,
                    'menu_name'             => $singular,
                    'all_items'             => sprintf(__('All %s (Old)', 'post-grid'), $plural),
                    'add_new'                 => __('Add New', 'post-grid'),
                    'add_new_item'             => sprintf(__('Add %s', 'post-grid'), $singular),
                    'edit'                     => __('Edit', 'post-grid'),
                    'edit_item'             => sprintf(__('Edit %s', 'post-grid'), $singular),
                    'new_item'                 => sprintf(__('New %s', 'post-grid'), $singular),
                    'view'                     => sprintf(__('View %s', 'post-grid'), $singular),
                    'view_item'             => sprintf(__('View %s', 'post-grid'), $singular),
                    'search_items'             => sprintf(__('Search %s', 'post-grid'), $plural),
                    'not_found'             => sprintf(__('No %s found', 'post-grid'), $plural),
                    'not_found_in_trash'     => sprintf(__('No %s found in trash', 'post-grid'), $plural),
                    'parent'                 => sprintf(__('Parent %s', 'post-grid'), $singular)
                ),
                'description' => sprintf(__('This is where you can create and manage %s.', 'post-grid'), $plural),
                'public'                 => false,
                'show_ui'                 => true,
                'capability_type'         => 'post',
                'map_meta_cap'          => true,
                'publicly_queryable'     => false,
                'exclude_from_search'     => false,
                'hierarchical'             => false,
                'query_var'             => true,
                'supports'                 => array('title'), // 'editor'
                'show_in_nav_menus'     => false,
                'show_in_menu'     => 'post-grid',
                'menu_icon' => 'dashicons-businessman',
                'show_in_rest' => true,

            ))
        );





        $singular  = __('Category', 'post-grid');
        $plural    = __('Categories', 'post-grid');

        register_taxonomy(
            "layout_cat",
            apply_filters('register_taxonomy_layout_cat_object_type', array('post_grid_layout')),
            apply_filters('register_taxonomy_layout_cat_args', array(
                'hierarchical'             => true,
                'show_admin_column'     => true,
                'update_count_callback' => '_update_post_term_count',
                'label'                 => $plural,
                'labels' => array(
                    'name'              => $plural,
                    'singular_name'     => $singular,
                    'menu_name'         => ucwords($plural),
                    'search_items'      => sprintf(__('Search %s', 'post-grid'), $plural),
                    'all_items'         => sprintf(__('All %s', 'post-grid'), $plural),
                    'parent_item'       => sprintf(__('Parent %s', 'post-grid'), $singular),
                    'parent_item_colon' => sprintf(__('Parent %s:', 'post-grid'), $singular),
                    'edit_item'         => sprintf(__('Edit %s', 'post-grid'), $singular),
                    'update_item'       => sprintf(__('Update %s', 'post-grid'), $singular),
                    'add_new_item'      => sprintf(__('Add New %s', 'post-grid'), $singular),
                    'new_item_name'     => sprintf(__('New %s Name', 'post-grid'),  $singular)
                ),
                'show_ui'                 => true,
                'public'                  => true,
                'show_in_rest' => true,
                'show_in_menu'     => 'post-grid',

                'rewrite' => array(
                    'slug' => 'layout_cat', // This controls the base slug that will display before each term
                    'with_front' => false, // Don't display the category base before "/locations/"
                    'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
                ),
            ))
        );
    }






    public function _posttype_saved_template()
    {

        if (post_type_exists("post_grid_template"))
            return;

        $singular  = __('Saved Template', 'post-grid');
        $plural    = __('Saved Templates', 'post-grid');


        register_post_type(
            "post_grid_template",
            apply_filters("post_grid_posttype_template", array(
                'labels' => array(
                    'name'                     => $plural,
                    'singular_name'         => $singular,
                    'menu_name'             => $singular,
                    'all_items'             => sprintf(__('All %s', 'post-grid'), $plural),
                    'add_new'                 => __('Add New', 'post-grid'),
                    'add_new_item'             => sprintf(__('Add %s', 'post-grid'), $singular),
                    'edit'                     => __('Edit', 'post-grid'),
                    'edit_item'             => sprintf(__('Edit %s', 'post-grid'), $singular),
                    'new_item'                 => sprintf(__('New %s', 'post-grid'), $singular),
                    'view'                     => sprintf(__('View %s', 'post-grid'), $singular),
                    'view_item'             => sprintf(__('View %s', 'post-grid'), $singular),
                    'search_items'             => sprintf(__('Search %s', 'post-grid'), $plural),
                    'not_found'             => sprintf(__('No %s found', 'post-grid'), $plural),
                    'not_found_in_trash'     => sprintf(__('No %s found in trash', 'post-grid'), $plural),
                    'parent'                 => sprintf(__('Parent %s', 'post-grid'), $singular)
                ),
                'description' => sprintf(__('This is where you can create and manage %s.', 'post-grid'), $plural),
                'public'                 => true,
                'show_ui'                 => true,
                'capability_type'         => 'post',
                'map_meta_cap'          => true,
                'publicly_queryable'     => false,
                'exclude_from_search'     => false,
                'hierarchical'             => false,
                'query_var'             => true,
                'supports'                 => array('title', 'editor', 'thumbnail', 'author', 'revisions', 'excerpt', 'custom-fields', 'comments'),
                'show_in_nav_menus'     => false,
                'show_in_menu'     => 'post-grid',
                'menu_icon' => 'dashicons-businessman',
                'show_in_rest' => true,

            ))
        );





        $singular  = __('Category', 'post-grid');
        $plural    = __('Categories', 'post-grid');

        register_taxonomy(
            "template_cat",
            apply_filters('register_taxonomy_template_cat_object_type', array('post_grid_template')),
            apply_filters('register_taxonomy_template_cat_args', array(
                'hierarchical'             => true,
                'show_admin_column'     => true,
                'update_count_callback' => '_update_post_term_count',
                'label'                 => $plural,
                'labels' => array(
                    'name'              => $plural,
                    'singular_name'     => $singular,
                    'menu_name'         => ucwords($plural),
                    'search_items'      => sprintf(__('Search %s', 'post-grid'), $plural),
                    'all_items'         => sprintf(__('All %s', 'post-grid'), $plural),
                    'parent_item'       => sprintf(__('Parent %s', 'post-grid'), $singular),
                    'parent_item_colon' => sprintf(__('Parent %s:', 'post-grid'), $singular),
                    'edit_item'         => sprintf(__('Edit %s', 'post-grid'), $singular),
                    'update_item'       => sprintf(__('Update %s', 'post-grid'), $singular),
                    'add_new_item'      => sprintf(__('Add New %s', 'post-grid'), $singular),
                    'new_item_name'     => sprintf(__('New %s Name', 'post-grid'),  $singular)
                ),
                'show_ui'                 => true,
                'public'                  => true,
                'show_in_rest' => true,
                'show_in_menu'     => 'post-grid',

                'rewrite' => array(
                    'slug' => 'template_cat', // This controls the base slug that will display before each term
                    'with_front' => false, // Don't display the category base before "/locations/"
                    'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
                ),
            ))
        );
    }
}


new class_post_grid_post_types();
