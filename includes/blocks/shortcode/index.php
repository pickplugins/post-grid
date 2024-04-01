<?php
if (!defined('ABSPATH'))
	exit();



class BlockPostShortcode
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}


	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		//wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/shortcode/index.css');
		//wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/shortcode/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/shortcode/block.json',
			array(

				'render_callback' => array($this, 'theHTML'),



			)
		);
	}

	function front_script($attributes)
	{
	}
	function front_style($attributes)
	{
	}




	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{




		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';




		if (!is_admin()) {


			//wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'build/blocks/post-categories/index.js', array('wp-element'));

			// wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'includes/blocks/post-categories/index.css');
		}



		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

		$post_url = get_the_permalink($post_ID);



		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

		$shortcode = isset($attributes['shortcode']) ? $attributes['shortcode'] : [];
		$shortcodeOptions = isset($shortcode['options']) ? $shortcode['options'] : [];

		$shortcodeKey = isset($shortcodeOptions['key']) ? $shortcodeOptions['key'] : '';
		$shortcodePrams = isset($shortcodeOptions['prams']) ? $shortcodeOptions['prams'] : [];



		$user = wp_get_current_user();
		$currentUserId = isset($user->ID) ? (int) $user->ID : 0;

		$term = get_queried_object();
		$termParentId = isset($term->parent) ? (int) $term->parent : 0;
		$currentTermId = isset($term->ID) ? (int) $term->ID : 0;

		$post_Type = get_post_type();
		$postType = isset($post_Type) ? $post_Type : 'post';

		$post = get_post($post_ID);
		$postParentId = isset($post->post_parent) ? (int) $post->post_parent : 0;

		$obj['id'] = $post_ID;
		$obj['type'] = 'post';



		$wrapperClass = parse_css_class($wrapperClass, $obj);

		ob_start();

		$shortcodeAtts = '';

		if (!empty($shortcodePrams))
			foreach ($shortcodePrams as $item) {

				$val = isset($item['val']) ? $item['val'] : '';

				$singleArray = [
					'{currentPostId}' => $post_ID,
					'{currentUserId}' => $currentUserId,
					'{termParentId}' => $termParentId,
					'{currentTermId}' => $currentTermId,
					'{postType}' => $postType,
					'{postParentId}' => $postParentId,
				];
				$val = strtr($val, (array) $singleArray);

				$shortcodeAtts .= $item['id'] . '="' . $val . '" ';
			}


		//////var_dump($shortcodePrams);


		if (!empty($wrapperTag)) :



			echo do_shortcode('[' . $shortcodeKey . ' ' . $shortcodeAtts . ']');

		endif;





		return ob_get_clean();
	}
}

$BlockPostShortcode = new BlockPostShortcode();
