<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockJustifiedWrap
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
		add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
	}


	function front_scripts($attributes)
	{
		wp_register_script('pgjustified-wrap_front_script', post_grid_plugin_url . 'includes/blocks/justified-wrap/front-scripts.js', [], '', true);

		wp_register_script('pgjustified-wrap_justified_core', post_grid_plugin_url . 'includes/blocks/justified-wrap/lightgallery.min.js', [], '', true);
		// wp_register_script('pgjustified-wrap_justified_min', post_grid_plugin_url . 'includes/blocks/justified-wrap/justified.pkgd.min.js', [], '', true);


		if (has_block('post-grid/justified-wrap')) {

			wp_enqueue_script('pgjustified-wrap_front_script');

			//wp_enqueue_script('pgjustified-wrap_justified_core');
			wp_enqueue_script('pgjustified-wrap_justified_min');



			wp_enqueue_style('jquery-ui');

			wp_enqueue_script('jquery');
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('jquery-ui-accordion');
			wp_enqueue_script('jquery-effects-core');

			wp_enqueue_script('pgflex-wrap_front_script');
		}
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/justified-wrap/lightgallery.css');
		//wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/justified-wrap/block.json',
			array(
				'title' => 'justified Wrap',
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



		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


		$justifiedOpt = isset($attributes['justifiedOpt']) ? $attributes['justifiedOpt'] : [];
		$justifiedOptOptions = isset($justifiedOpt['options']) ? $justifiedOpt['options'] : [];



		$justifiedOptItemSelector = isset($justifiedOpt['itemSelector']) ? $justifiedOpt['itemSelector'] : ".pg-justifiedOpt-wrap-item";
		$justifiedOptColumnWidth = isset($justifiedOpt['columnWidth']) ? $justifiedOpt['columnWidth'] : "";
		$justifiedOptGutter = isset($justifiedOpt['gutter']) ? $justifiedOpt['gutter'] : "";
		$justifiedOptHorizontalOrder = isset($justifiedOpt['horizontalOrder']) ? $justifiedOpt['horizontalOrder'] : true;
		$justifiedOPtpercentPosition = isset($justifiedOpt['percentPosition']) ? $justifiedOpt['percentPosition'] : true;
		$justifiedOptStamp = isset($justifiedOpt['stamp']) ? $justifiedOpt['stamp'] : ".stamp";
		$justifiedOptFitWidth = isset($justifiedOpt['fitWidth']) ? $justifiedOpt['fitWidth'] : true;
		$justifiedOptOriginLeft = isset($justifiedOpt['originLeft']) ? $justifiedOpt['originLeft'] : true;
		$justifiedOptOriginTop = isset($justifiedOpt['originTop']) ? $justifiedOpt['originTop'] : true;
		$justifiedOptStagger = isset($justifiedOpt['stagger']) ? $justifiedOpt['stagger'] : 30;
		$justifiedOptResize = isset($justifiedOpt['resize']) ? $justifiedOpt['resize'] : true;



		$justifiedOptions = isset($attributes['justifiedOptions']) ? $attributes['justifiedOptions'] : [];






		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


		$dataBlockId = [
			"blockId" => $blockId,
		];

		// $dataAtts = [

		// 	// "itemSelector" => $justifiedOptItemSelector,
		// 	// "columnWidth" => $justifiedOptColumnWidth,
		// 	// "gutter" => $justifiedOptGutter,
		// 	// "horizontalOrder" => $justifiedOptHorizontalOrder,
		// 	// "percentPosition" => $justifiedOPtpercentPosition,
		// 	// "stamp" => $justifiedOptStamp,
		// 	// "fitWidth" => $justifiedOptFitWidth,
		// 	// "originLeft" => $justifiedOptOriginLeft,
		// 	// "originTop" => $justifiedOptOriginTop,
		// 	// "stagger" => $justifiedOptStagger,
		// 	// "resize" => $justifiedOptResize,
		// 	"justifiedOptions" => $justifiedOptions
		// ];






		$obj['id'] = $post_ID;
		$obj['type'] = 'post';



		$wrapperClass = parse_css_class($wrapperClass, $obj);


		ob_start();



		?>
		<div id="<?php echo esc_attr($blockId); ?>"
			class="PGBlockJustifiedWrap <?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?>	<?php echo esc_attr($blockAlign); ?>"
			data-justified="<?php echo esc_attr(json_encode($justifiedOptions)) ?>"
			data-block-id="<?php echo esc_attr(json_encode($dataBlockId)) ?>">

			<div class='aaa'
				data-src="https://images.pexels.com/photos/19049834/pexels-photo-19049834/free-photo-of-surface-of-a-sandstone-wall.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
				<img alt="img1"
					src="https://images.pexels.com/photos/19049834/pexels-photo-19049834/free-photo-of-surface-of-a-sandstone-wall.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
			</div>
			<div class='aaa'
				data-src="https://images.pexels.com/photos/18968224/pexels-photo-18968224/free-photo-of-light.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
				<img alt="img2"
					src="https://images.pexels.com/photos/18968224/pexels-photo-18968224/free-photo-of-light.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
			</div>
			<div class='aaa'
				data-src="https://images.pexels.com/photos/19042206/pexels-photo-19042206/free-photo-of-model-in-sombrero-and-in-traditional-clothing.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
				<img alt="img1"
					src="https://images.pexels.com/photos/19042206/pexels-photo-19042206/free-photo-of-model-in-sombrero-and-in-traditional-clothing.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
			</div>
			<div class='aaa'
				data-src="https://images.pexels.com/photos/18889183/pexels-photo-18889183/free-photo-of-portrait-of-a-hooded-man-standing-in-rain.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
				<img alt="img2"
					src="https://images.pexels.com/photos/18889183/pexels-photo-18889183/free-photo-of-portrait-of-a-hooded-man-standing-in-rain.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
			</div>
			<div class='aaa'
				data-src="https://images.pexels.com/photos/18885164/pexels-photo-18885164/free-photo-of-wedding-couple-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
				<img alt="img1"
					src="https://images.pexels.com/photos/18885164/pexels-photo-18885164/free-photo-of-wedding-couple-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
			</div>
			<div class='aaa'
				data-src="https://images.pexels.com/photos/13566084/pexels-photo-13566084.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load">
				<img alt="img2"
					src="https://images.pexels.com/photos/13566084/pexels-photo-13566084.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
			</div>
		</div>
		<style>
		.pg-justified-wrap-item {
			display: inline-block;
		}

		.pg-justified-wrap-item {
			margin-bottom: 20px;
		}
		</style>
		<?php

		return ob_get_clean();
	}
}

$BlockPostGrid = new PGBlockJustifiedWrap();