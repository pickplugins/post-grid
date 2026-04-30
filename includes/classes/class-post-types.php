<?php
if (!defined('ABSPATH')) exit;  // if direct access
class class_post_grid_post_types
{
	public function __construct()
	{
		add_action('init', array($this, '_posttype_post_grid'), 0);
		add_action('init', array($this, '_posttype_setting'), 0);
		add_action('init', array($this, '_posttype_post_grid_layout'), 80);
		add_action('init', array($this, '_posttype_saved_template'));
		add_action('admin_init', array($this, 'add_capability'));
	}
	public function add_capability()
	{
		$role = get_role('administrator');
		$role->add_cap('publish_post_grids');
		$role->add_cap('edit_post_grids');
		$role->add_cap('edit_others_post_grids');
		$role->add_cap('read_private_post_grids');
		$role->add_cap('edit_post_grid');
		$role->add_cap('read_post_grid');
		$role->add_cap('delete_post_grid', false);
		$role->add_cap('publish_post_grid_templates');
		$role->add_cap('edit_post_grid_templates');
		$role->add_cap('edit_others_post_grid_templates');
		$role->add_cap('read_private_post_grid_templates');
		$role->add_cap('edit_post_grid_template');
		$role->add_cap('read_post_grid_template');
		$role->add_cap('delete_post_grid_template', false);
		$role->add_cap('publish_post_grid_layouts');
		$role->add_cap('edit_post_grid_layouts');
		$role->add_cap('edit_others_post_grid_layouts');
		$role->add_cap('read_private_post_grid_layouts');
		$role->add_cap('edit_post_grid_layout');
		$role->add_cap('read_post_grid_layout');
		$role->add_cap('delete_post_grid_layout', false);
	}
	public function _posttype_setting()
	{
		$post_grid_block_editor = get_option('post_grid_block_editor');
		$post_types = isset($post_grid_block_editor['postTypes']) ? $post_grid_block_editor['postTypes'] : [];
		$taxonomies = isset($post_grid_block_editor['taxonomies']) ? $post_grid_block_editor['taxonomies'] : [];


		if (empty($post_types)) return;
		foreach ($post_types as $post_type) {
			$slug = isset($post_type['slug']) ? $post_type['slug'] : '';
			if (empty($slug)) continue;
			if (post_type_exists($slug)) continue;
			$plural = isset($post_type['labels']['name']) ? $post_type['labels']['name'] : '';
			$singular_name = isset($post_type['labels']['singular_name']) ? $post_type['labels']['singular_name'] : $plural;
			$menu_name = isset($post_type['labels']['menu_name']) ? $post_type['labels']['menu_name'] : $plural;
			$add_new = isset($post_type['labels']['add_new']) ? $post_type['labels']['add_new'] : "Add New";
			$all_items = isset($post_type['labels']['all_items']) ? $post_type['labels']['all_items'] : "All %s";
			$add_new_item = isset($post_type['labels']['add_new_item']) ? $post_type['labels']['add_new_item'] : "Add %s";
			$edit = isset($post_type['labels']['edit']) ? $post_type['labels']['edit'] : "Edit";
			$edit_item = isset($post_type['labels']['edit_item']) ? $post_type['labels']['edit_item'] : "Edit %s";
			$new_item = isset($post_type['labels']['new_item']) ? $post_type['labels']['new_item'] : "New %s";
			$view = isset($post_type['labels']['view']) ? $post_type['labels']['view'] : "View %s";
			$view_item = isset($post_type['labels']['view_item']) ? $post_type['labels']['view_item'] : "View %s";
			$search_items = isset($post_type['labels']['search_items']) ? $post_type['labels']['search_items'] : "Search %s";
			$not_found = isset($post_type['labels']['not_found']) ? $post_type['labels']['not_found'] : "No %s found";
			$not_found_in_trash = isset($post_type['labels']['not_found_in_trash']) ? $post_type['labels']['not_found_in_trash'] : "No %s found in trash";
			$parent = isset($post_type['labels']['parent']) ? $post_type['labels']['parent'] : "Parent %s";
			$description = isset($post_type['description']) ? $post_type['description'] : "This is where you can create and manage %s.";
			$public = isset($post_type['public']) ? $post_type['public'] : true;
			$show_ui = isset($post_type['show_ui']) ? $post_type['show_ui'] : true;
			$show_in_rest = isset($post_type['show_in_rest']) ? $post_type['show_in_rest'] : false;
			$capability_type = isset($post_type['capability_type']) ? $post_type['capability_type'] : "post";
			// $publish_posts = isset($post_type['capabilities']['publish_posts']) ? $post_type['labels']['publish_posts'] : "publish_" . $slug . "s";
			// $edit_posts = isset($post_type['capabilities']['edit_posts']) ? $post_type['labels']['edit_posts'] : "edit_" . $slug . "s";
			// $edit_others_posts = isset($post_type['capabilities']['edit_others_posts']) ? $post_type['labels']['edit_others_posts'] : "edit_others_" . $slug . "s";
			// $read_private_posts = isset($post_type['capabilities']['read_private_posts']) ? $post_type['labels']['read_private_posts'] : "read_private_" . $plural;
			// $edit_post = isset($post_type['capabilities']['edit_post']) ? $post_type['labels']['edit_post'] : "edit_" . $slug;
			// $delete_post = isset($post_type['capabilities']['delete_post']) ? $post_type['labels']['delete_post'] : "delete_" . $slug;
			// $read_post = isset($post_type['capabilities']['read_post']) ? $post_type['labels']['read_post'] : "read_" . $slug;
			$map_meta_cap = isset($post_type['map_meta_cap']) ? $post_type['map_meta_cap'] : true;
			$publicly_queryable = isset($post_type['publicly_queryable']) ? $post_type['publicly_queryable'] : true;
			$rewrite = isset($post_type['rewrite']) ? $post_type['rewrite'] : true;
			$exclude_from_search = isset($post_type['exclude_from_search']) ? $post_type['exclude_from_search'] : false;
			$hierarchical = isset($post_type['hierarchical']) ? $post_type['hierarchical'] : false;
			$query_var = isset($post_type['query_var']) ? $post_type['query_var'] : true;
			$show_in_nav_menus = isset($post_type['show_in_nav_menus']) ? $post_type['show_in_nav_menus'] : true;
			$menu_icon = isset($post_type['menu_icon']) ? $post_type['menu_icon'] : 'dashicons-grid-view';
			$show_in_menu = isset($post_type['show_in_menu']) ? $post_type['show_in_menu'] : $slug;
			$supports = isset($post_type['supports']) ? $post_type['supports'] : array("title");
			// $map_meta_cap =  true;
			// $publicly_queryable =  true;
			// $exclude_from_search =  false;
			// $hierarchical =  false;
			// $query_var = true;
			// $show_in_nav_menus = true;
			// $rewrite = true;
			// $menu_icon =  'dashicons-grid-view';
			// $supports =  array('title', 'author', 'comments', 'custom-fields');
			$post_type_args = [];
			$post_type_args['labels']['name'] = $plural;
			$post_type_args['labels']['singular_name'] = $singular_name;
			$post_type_args['labels']['menu_name'] = $menu_name;
			$post_type_args['labels']['all_items'] = $all_items;
			$post_type_args['labels']['add_new'] = $add_new;
			$post_type_args['labels']['add_new_item'] = $add_new_item;
			$post_type_args['labels']['edit'] = $edit;
			$post_type_args['labels']['edit_item'] = $edit_item;
			$post_type_args['labels']['new_item'] = $new_item;
			$post_type_args['labels']['view'] = $view;
			$post_type_args['labels']['view_item'] = $view_item;
			$post_type_args['labels']['search_items'] = $search_items;
			$post_type_args['labels']['not_found'] = $not_found;
			$post_type_args['labels']['not_found_in_trash'] = $not_found_in_trash;
			$post_type_args['labels']['parent'] = $parent;
			//$post_type_args['capabilities']['publish_posts'] = $publish_posts;
			$post_type_args['capability_type'] = $capability_type;
			//($public);
			$post_type_args['description'] = $description;
			$post_type_args['public'] = (bool) $public;
			$post_type_args['show_ui'] = (bool) $show_ui;
			$post_type_args['show_in_rest'] = (bool) $show_in_rest;
			$post_type_args['map_meta_cap'] = (bool) $map_meta_cap;
			$post_type_args['publicly_queryable'] = (bool) $publicly_queryable;
			$post_type_args['exclude_from_search'] = (bool) $exclude_from_search;
			$post_type_args['hierarchical'] = (bool) $hierarchical;
			$post_type_args['query_var'] = (bool)$query_var;
			$post_type_args['supports'] = $supports;
			$post_type_args['show_in_nav_menus'] = (bool)$show_in_nav_menus;
			$post_type_args['menu_icon'] = $menu_icon;
			$post_type_args['rewrite'] = $rewrite;
			if (!empty($show_in_menu)) {
				//$post_type_args['show_in_menu'] = $show_in_menu;
			}
			register_post_type(
				$slug,
				apply_filters("post_grid_posttype_{$slug}", $post_type_args)
			);
		}
		foreach ($taxonomies as $taxonomy) {
			$slug = isset($taxonomy['slug']) ? $taxonomy['slug'] : '';
			if (empty($slug)) continue;
			if (post_type_exists($slug)) continue;
			$plural = isset($taxonomy['labels']['name']) ? $taxonomy['labels']['name'] : '';
			$singular_name = isset($taxonomy['labels']['singular_name']) ? $taxonomy['labels']['singular_name'] : $plural;
			$menu_name = isset($taxonomy['labels']['menu_name']) ? $taxonomy['labels']['menu_name'] : $plural;
			$add_new = isset($taxonomy['labels']['add_new']) ? $taxonomy['labels']['add_new'] : "Add New";
			$all_items = isset($taxonomy['labels']['all_items']) ? $taxonomy['labels']['all_items'] : "All %s";
			$add_new_item = isset($taxonomy['labels']['add_new_item']) ? $taxonomy['labels']['add_new_item'] : "Add %s";
			$edit = isset($taxonomy['labels']['edit']) ? $taxonomy['labels']['edit'] : "Edit";
			$edit_item = isset($taxonomy['labels']['edit_item']) ? $taxonomy['labels']['edit_item'] : "Edit %s";
			$new_item = isset($taxonomy['labels']['new_item']) ? $taxonomy['labels']['new_item'] : "New %s";
			$view = isset($taxonomy['labels']['view']) ? $taxonomy['labels']['view'] : "View %s";
			$view_item = isset($taxonomy['labels']['view_item']) ? $taxonomy['labels']['view_item'] : "View %s";
			$search_items = isset($taxonomy['labels']['search_items']) ? $taxonomy['labels']['search_items'] : "Search %s";
			$not_found = isset($taxonomy['labels']['not_found']) ? $taxonomy['labels']['not_found'] : "No %s found";
			$not_found_in_trash = isset($taxonomy['labels']['not_found_in_trash']) ? $taxonomy['labels']['not_found_in_trash'] : "No %s found in trash";
			$parent = isset($taxonomy['labels']['parent']) ? $taxonomy['labels']['parent'] : "Parent %s";
			$description = isset($taxonomy['description']) ? $taxonomy['description'] : "This is where you can create and manage %s.";
			$object_types = isset($taxonomy['object_types']) ? $taxonomy['object_types'] : "";

			$object_types = explode(",", $object_types);

			$public = isset($taxonomy['public']) ? $taxonomy['public'] : true;
			$show_ui = isset($taxonomy['show_ui']) ? $taxonomy['show_ui'] : true;
			$show_in_rest = isset($taxonomy['show_in_rest']) ? $taxonomy['show_in_rest'] : false;
			$capability_type = isset($taxonomy['capability_type']) ? $taxonomy['capability_type'] : "post";
			// $publish_posts = isset($taxonomy['capabilities']['publish_posts']) ? $taxonomy['labels']['publish_posts'] : "publish_" . $slug . "s";
			// $edit_posts = isset($taxonomy['capabilities']['edit_posts']) ? $taxonomy['labels']['edit_posts'] : "edit_" . $slug . "s";
			// $edit_others_posts = isset($taxonomy['capabilities']['edit_others_posts']) ? $taxonomy['labels']['edit_others_posts'] : "edit_others_" . $slug . "s";
			// $read_private_posts = isset($taxonomy['capabilities']['read_private_posts']) ? $taxonomy['labels']['read_private_posts'] : "read_private_" . $plural;
			// $edit_post = isset($taxonomy['capabilities']['edit_post']) ? $taxonomy['labels']['edit_post'] : "edit_" . $slug;
			// $delete_post = isset($taxonomy['capabilities']['delete_post']) ? $taxonomy['labels']['delete_post'] : "delete_" . $slug;
			// $read_post = isset($taxonomy['capabilities']['read_post']) ? $taxonomy['labels']['read_post'] : "read_" . $slug;
			$map_meta_cap = isset($taxonomy['map_meta_cap']) ? $taxonomy['map_meta_cap'] : true;
			$publicly_queryable = isset($taxonomy['publicly_queryable']) ? $taxonomy['publicly_queryable'] : true;
			$show_admin_column = isset($taxonomy['show_admin_column']) ? $taxonomy['show_admin_column'] : true;
			$rewrite = isset($taxonomy['rewrite']) ? $taxonomy['rewrite'] : true;
			$exclude_from_search = isset($taxonomy['exclude_from_search']) ? $taxonomy['exclude_from_search'] : false;
			$hierarchical = isset($taxonomy['hierarchical']) ? $taxonomy['hierarchical'] : false;
			$query_var = isset($taxonomy['query_var']) ? $taxonomy['query_var'] : true;
			$show_in_nav_menus = isset($taxonomy['show_in_nav_menus']) ? $taxonomy['show_in_nav_menus'] : true;
			$menu_icon = isset($taxonomy['menu_icon']) ? $taxonomy['menu_icon'] : 'dashicons-grid-view';
			$show_in_menu = isset($taxonomy['show_in_menu']) ? $taxonomy['show_in_menu'] : $slug;
			$supports = isset($taxonomy['supports']) ? $taxonomy['supports'] : array("title");
			// $map_meta_cap =  true;
			// $publicly_queryable =  true;
			// $exclude_from_search =  false;
			// $hierarchical =  false;
			// $query_var = true;
			// $show_in_nav_menus = true;
			// $rewrite = true;
			// $menu_icon =  'dashicons-grid-view';
			// $supports =  array('title', 'author', 'comments', 'custom-fields');
			$taxonomy_args = [];
			$taxonomy_args['labels']['name'] = $plural;
			$taxonomy_args['labels']['singular_name'] = $singular_name;
			$taxonomy_args['labels']['menu_name'] = $menu_name;
			$taxonomy_args['labels']['all_items'] = $all_items;
			$taxonomy_args['labels']['add_new'] = $add_new;
			$taxonomy_args['labels']['add_new_item'] = $add_new_item;
			$taxonomy_args['labels']['edit'] = $edit;
			$taxonomy_args['labels']['edit_item'] = $edit_item;
			$taxonomy_args['labels']['new_item'] = $new_item;
			$taxonomy_args['labels']['view'] = $view;
			$taxonomy_args['labels']['view_item'] = $view_item;
			$taxonomy_args['labels']['search_items'] = $search_items;
			$taxonomy_args['labels']['not_found'] = $not_found;
			$taxonomy_args['labels']['not_found_in_trash'] = $not_found_in_trash;
			$taxonomy_args['labels']['parent'] = $parent;
			//$taxonomy_args['capabilities']['publish_posts'] = $publish_posts;
			//($public);
			$taxonomy_args['description'] = $description;
			$taxonomy_args['public'] = (bool) $public;
			$taxonomy_args['show_ui'] = (bool) $show_ui;
			$taxonomy_args['show_in_rest'] = (bool) $show_in_rest;
			$taxonomy_args['map_meta_cap'] = (bool) $map_meta_cap;
			$taxonomy_args['publicly_queryable'] = (bool) $publicly_queryable;
			$taxonomy_args['show_admin_column'] = (bool) $show_admin_column;
			$taxonomy_args['exclude_from_search'] = (bool) $exclude_from_search;
			$taxonomy_args['hierarchical'] = (bool) $hierarchical;
			$taxonomy_args['query_var'] = (bool)$query_var;
			$taxonomy_args['supports'] = $supports;
			$taxonomy_args['show_in_nav_menus'] = (bool)$show_in_nav_menus;
			$taxonomy_args['menu_icon'] = $menu_icon;
			$taxonomy_args['rewrite'] = $rewrite;
			if (!empty($show_in_menu)) {
				//$taxonomy_args['show_in_menu'] = $show_in_menu;
			}
			register_taxonomy(
				$slug,
				$object_types,
				apply_filters("post_grid_taxonomy_{$slug}", $taxonomy_args)
			);
		}
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
					/* translators: %s: Post type plural name */
					'all_items'             => sprintf(__('All %s', 'post-grid'), $plural),
					/* translators: Add new post type item label */
					'add_new'                 => __('Add New', 'post-grid'),
					/* translators: %s: Post type singular name */
					'add_new_item'             => sprintf(__('Add %s', 'post-grid'), $singular),
					/* translators: Edit label */
					'edit'                     => __('Edit', 'post-grid'),
					/* translators: %s: Post type singular name */
					'edit_item'             => sprintf(__('Edit %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'new_item'                 => sprintf(__('New %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'view'                     => sprintf(__('View %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'view_item'             => sprintf(__('View %s', 'post-grid'), $singular),
					/* translators: %s: Post type plural name */
					'search_items'             => sprintf(__('Search %s', 'post-grid'), $plural),
					/* translators: %s: Post type plural name */
					'not_found'             => sprintf(__('No %s found', 'post-grid'), $plural),
					/* translators: %s: Post type plural name */
					'not_found_in_trash'     => sprintf(__('No %s found in trash', 'post-grid'), $plural),
					/* translators: %s: Post type singular name */
					'parent'                 => sprintf(__('Parent %s', 'post-grid'), $singular)
				),
				/* translators: %s: Post type plural name */
				'description' => sprintf(__('This is where you can create and manage %s.', 'post-grid'), $plural),
				'public'                 => false,
				'show_ui'                 => true,
				'capability_type'         => 'post',
				'capabilities' => array(
					'publish_posts' => 'publish_post_grids',
					'edit_posts' => 'edit_post_grids',
					'edit_others_posts' => 'edit_others_post_grids',
					'read_private_posts' => 'read_private_post_grids',
					'edit_post' => 'edit_post_grid',
					'delete_post' => 'delete_post_grid',
					'read_post' => 'read_post_grid',
				),
				'show_in_rest' => true,

				'map_meta_cap'          => true,
				'publicly_queryable'     => ($post_grid_preview == 'yes') ? true : false,
				'exclude_from_search'     => false,
				'hierarchical'             => false,
				'query_var'             => true,
				'supports'                 => array('title'),
				'show_in_nav_menus'     => true,
				'menu_icon' => 'dashicons-grid-view',
				//'show_in_menu'     => 'post-grid',
			))
		);
	}
	public function _posttype_post_grid_layout()
	{
		if (post_type_exists("post_grid_layout"))
			return;
		$singular  = __('Saved Layout', 'post-grid');
		$plural    = __('Saved Layouts', 'post-grid');
		register_post_type(
			"post_grid_layout",
			apply_filters("post_grid_posttype_post_grid_layout", array(
				'labels' => array(
					'name'                     => $plural,
					'singular_name'         => $singular,
					'menu_name'             => $singular,
					/* translators: %s: Post type plural name */
					'all_items'             => sprintf(__('All %s', 'post-grid'), $plural),
					/* translators: Add new post type item label */
					'add_new'                 => __('Add New', 'post-grid'),
					/* translators: %s: Post type singular name */
					'add_new_item'             => sprintf(__('Add %s', 'post-grid'), $singular),
					/* translators: Edit label */
					'edit'                     => __('Edit', 'post-grid'),
					/* translators: %s: Post type singular name */
					'edit_item'             => sprintf(__('Edit %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'new_item'                 => sprintf(__('New %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'view'                     => sprintf(__('View %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'view_item'             => sprintf(__('View %s', 'post-grid'), $singular),
					/* translators: %s: Post type plural name */
					'search_items'             => sprintf(__('Search %s', 'post-grid'), $plural),
					/* translators: %s: Post type plural name */
					'not_found'             => sprintf(__('No %s found', 'post-grid'), $plural),
					/* translators: %s: Post type plural name */
					'not_found_in_trash'     => sprintf(__('No %s found in trash', 'post-grid'), $plural),
					/* translators: %s: Post type singular name */
					'parent'                 => sprintf(__('Parent %s', 'post-grid'), $singular)
				),
				/* translators: %s: Post type plural name */
				'description' => sprintf(__('This is where you can create and manage %s.', 'post-grid'), $plural),
				'public'                 => false,
				'show_ui'                 => true,
				'capability_type'         => 'post',
				'capabilities' => array(
					'publish_posts' => 'publish_post_grid_layouts',
					'edit_posts' => 'edit_post_grid_layouts',
					'edit_others_posts' => 'edit_others_post_grid_layouts',
					'read_private_posts' => 'read_private_post_grid_layouts',
					'edit_post' => 'edit_post_grid_layout',
					'delete_post' => 'delete_post_grid_layout',
					'read_post' => 'read_post_grid_layout',
				),
				'map_meta_cap'          => true,
				'publicly_queryable'     => false,
				'exclude_from_search'     => false,
				'hierarchical'             => false,
				'query_var'             => true,
				'supports'                 => array('title'), // 'editor'
				'show_in_nav_menus'     => false,
				'show_in_menu'     => 'edit.php?post_type=post_grid',
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
					/* translators: %s: Taxonomy plural name */
					'search_items'      => sprintf(__('Search %s', 'post-grid'), $plural),
					/* translators: %s: Taxonomy plural name */
					'all_items'         => sprintf(__('All %s', 'post-grid'), $plural),
					/* translators: %s: Taxonomy singular name */
					'parent_item'       => sprintf(__('Parent %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'parent_item_colon' => sprintf(__('Parent %s:', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'edit_item'         => sprintf(__('Edit %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'update_item'       => sprintf(__('Update %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'add_new_item'      => sprintf(__('Add New %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
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
					/* translators: %s: Post type plural name */
					'all_items'             => sprintf(__('All %s', 'post-grid'), $plural),
					/* translators: Add new post type item label */
					'add_new'                 => __('Add New', 'post-grid'),
					/* translators: %s: Post type singular name */
					'add_new_item'             => sprintf(__('Add %s', 'post-grid'), $singular),
					/* translators: Edit label */
					'edit'                     => __('Edit', 'post-grid'),
					/* translators: %s: Post type singular name */
					'edit_item'             => sprintf(__('Edit %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'new_item'                 => sprintf(__('New %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'view'                     => sprintf(__('View %s', 'post-grid'), $singular),
					/* translators: %s: Post type singular name */
					'view_item'             => sprintf(__('View %s', 'post-grid'), $singular),
					/* translators: %s: Post type plural name */
					'search_items'             => sprintf(__('Search %s', 'post-grid'), $plural),
					/* translators: %s: Post type plural name */
					'not_found'             => sprintf(__('No %s found', 'post-grid'), $plural),
					/* translators: %s: Post type plural name */
					'not_found_in_trash'     => sprintf(__('No %s found in trash', 'post-grid'), $plural),
					/* translators: %s: Post type singular name */
					'parent'                 => sprintf(__('Parent %s', 'post-grid'), $singular)
				),
				/* translators: %s: Post type plural name */
				'description' => sprintf(__('This is where you can create and manage %s.', 'post-grid'), $plural),
				'public'                 => true,
				'show_ui'                 => true,
				'capability_type'         => 'post',
				'capabilities' => array(
					'publish_posts' => 'publish_post_grid_templates',
					'edit_posts' => 'edit_post_grid_templates',
					'edit_others_posts' => 'edit_others_post_grid_templates',
					'read_private_posts' => 'read_private_post_grid_templates',
					'edit_post' => 'edit_post_grid_template',
					'delete_post' => 'delete_post_grid_template',
					'read_post' => 'read_post_grid_template',
				),
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
					/* translators: %s: Taxonomy plural name */
					'search_items'      => sprintf(__('Search %s', 'post-grid'), $plural),
					/* translators: %s: Taxonomy plural name */
					'all_items'         => sprintf(__('All %s', 'post-grid'), $plural),
					/* translators: %s: Taxonomy singular name */
					'parent_item'       => sprintf(__('Parent %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'parent_item_colon' => sprintf(__('Parent %s:', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'edit_item'         => sprintf(__('Edit %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'update_item'       => sprintf(__('Update %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
					'add_new_item'      => sprintf(__('Add New %s', 'post-grid'), $singular),
					/* translators: %s: Taxonomy singular name */
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
// function book_setup_post_type()
// {
// 	$args = array(
// 		'public'    => true,
// 		'label'     => __('Books', 'textdomain'),
// 		'menu_icon' => 'dashicons-book',
// 	);
// 	register_post_type('book', $args);
// }
// add_action('init', 'book_setup_post_type');