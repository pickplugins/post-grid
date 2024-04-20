<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockWordpressOrg
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}


	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		// wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/wordpress-org/index.css');
		//wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/wordpress-org/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/wordpress-org/block.json',
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



		global $postGridCssY;



		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';


		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



		$object = isset($attributes['object']) ? $attributes['object'] : [];
		$objectOptions = isset($object['options']) ? $object['options'] : [];
		$objectType = isset($objectOptions['type']) ? $objectOptions['type'] : 'plugin';
		$objectSlug = isset($objectOptions['slug']) ? $objectOptions['slug'] : 'post-grid';


		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'ul';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


		$item = isset($attributes['item']) ? $attributes['item'] : [];
		$itemOptions = isset($item['options']) ? $item['options'] : [];
		$itemTag = isset($itemOptions['tag']) ? $itemOptions['tag'] : 'li';

		$elements = isset($attributes['elements']) ? $attributes['elements'] : [];
		$elementsItems = isset($elements['items']) ? $elements['items'] : [];


		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




		$transientData = get_transient($blockId . '_data');

		$obj['id'] = $post_ID;
		$obj['type'] = 'post';



		$wrapperClass = parse_css_class($wrapperClass, $obj);

		ob_start();






		if (!empty($wrapperTag)) :


?>


			<<?php echo esc_html($wrapperTag); ?> class="
										<?php echo esc_attr($blockId); ?>
										<?php echo esc_attr($wrapperClass); ?>">


				<?php
				echo $content ?>


			</<?php echo esc_html($wrapperTag); ?>>
			<?php










			?>




		<?php

		endif;



		?>









<?php return ob_get_clean();
	}
}

$BlockPostGrid = new PGBlockWordpressOrg();
