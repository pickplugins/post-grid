<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockMasonryWrap
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
		add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
	}


	function front_scripts($attributes)
	{
		wp_register_script('pgmasonry-wrap_image_loaded', post_grid_plugin_url . 'includes/blocks/masonry-wrap/imagesloaded.pkgd.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);

		wp_register_script('pgmasonry-wrap_masonry_core', post_grid_plugin_url . 'includes/blocks/masonry-wrap/masonry.pkgd.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
		wp_register_script('pgmasonry-wrap_masonry_min', post_grid_plugin_url . 'includes/blocks/masonry-wrap/masonry.pkgd.min.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
		wp_register_script('pgmasonry-wrap_front_script', post_grid_plugin_url . 'includes/blocks/masonry-wrap/front-scripts.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);


		if (has_block('post-grid/masonry-wrap')) {




			// wp_enqueue_style('jquery-ui');

			wp_enqueue_script('jquery');
			// wp_enqueue_script('jquery-ui-core');
			// wp_enqueue_script('jquery-ui-accordion');
			// wp_enqueue_script('jquery-effects-core');


			wp_enqueue_script('pgmasonry-wrap_image_loaded');

			wp_enqueue_script('pgmasonry-wrap_masonry_core');
			wp_enqueue_script('pgmasonry-wrap_masonry_min');

			wp_enqueue_script('pgmasonry-wrap_front_script');
		}
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		//wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/layers/index.css');
		//wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/masonry-wrap/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),



			)
		);
	}

	function front_script($attributes) {}
	function front_style($attributes) {}

	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{





		global $postGridCssY;



		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


		$masonryOpt = isset($attributes['masonryOpt']) ? $attributes['masonryOpt'] : [];
		$masonryOptOptions = isset($masonryOpt['options']) ? $masonryOpt['options'] : [];



		$masonryOptItemSelector = isset($masonryOpt['itemSelector']) ? $masonryOpt['itemSelector'] : ".pg-masonryOpt-wrap-item";
		$masonryOptColumnWidth = isset($masonryOpt['columnWidth']) ? $masonryOpt['columnWidth'] : "";
		$masonryOptGutter = isset($masonryOpt['gutter']) ? $masonryOpt['gutter'] : "";
		$masonryOptHorizontalOrder = isset($masonryOpt['horizontalOrder']) ? $masonryOpt['horizontalOrder'] : true;
		$masonryOPtpercentPosition = isset($masonryOpt['percentPosition']) ? $masonryOpt['percentPosition'] : true;
		$masonryOptStamp = isset($masonryOpt['stamp']) ? $masonryOpt['stamp'] : ".stamp";
		$masonryOptFitWidth = isset($masonryOpt['fitWidth']) ? $masonryOpt['fitWidth'] : true;
		$masonryOptOriginLeft = isset($masonryOpt['originLeft']) ? $masonryOpt['originLeft'] : true;
		$masonryOptOriginTop = isset($masonryOpt['originTop']) ? $masonryOpt['originTop'] : true;
		$masonryOptStagger = isset($masonryOpt['stagger']) ? $masonryOpt['stagger'] : 30;
		$masonryOptResize = isset($masonryOpt['resize']) ? $masonryOpt['resize'] : true;



		$masonryOptions = isset($attributes['masonryOptions']) ? $attributes['masonryOptions'] : [];






		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


		$dataBlockId = [
			"blockId" => $blockId,
		];

		// $dataAtts = [

		// 	// "itemSelector" => $masonryOptItemSelector,
		// 	// "columnWidth" => $masonryOptColumnWidth,
		// 	// "gutter" => $masonryOptGutter,
		// 	// "horizontalOrder" => $masonryOptHorizontalOrder,
		// 	// "percentPosition" => $masonryOPtpercentPosition,
		// 	// "stamp" => $masonryOptStamp,
		// 	// "fitWidth" => $masonryOptFitWidth,
		// 	// "originLeft" => $masonryOptOriginLeft,
		// 	// "originTop" => $masonryOptOriginTop,
		// 	// "stagger" => $masonryOptStagger,
		// 	// "resize" => $masonryOptResize,
		// 	"masonryOptions" => $masonryOptions
		// ];






		$obj['id'] = $post_ID;
		$obj['type'] = 'post';



		$wrapperClass = post_grid_parse_css_class($wrapperClass, $obj);


		// //* Visible condition
		$visible = isset($attributes['visible']) ? $attributes['visible'] : [];
		if (!empty($visible['rules'])) {
			$isVisible = post_grid_visible_parse($visible);



			if (!$isVisible) return;
		}

		// //* Visible condition


		ob_start();



?>
		<div id="<?php echo esc_attr($blockId); ?>" class="PGBlockMasonryWrap <?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?>	<?php echo esc_attr($blockAlign); ?>" data-masonry="<?php echo esc_attr(json_encode($masonryOptions)) ?>" data-block-id="<?php echo esc_attr(json_encode($dataBlockId)) ?>">

			<?php echo $content ?>
		</div>
		<style>
			.pg-masonry-wrap-item {
				display: inline-block;
			}

			.pg-masonry-wrap-item {
				margin-bottom: 20px;
			}
		</style>
<?php



		return ob_get_clean();
	}
}

$BlockPostGrid = new PGBlockMasonryWrap();
