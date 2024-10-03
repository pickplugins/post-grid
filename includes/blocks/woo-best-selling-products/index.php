<?php
if (!defined('ABSPATH'))
	exit();
class PGBlockWooBestSellingProducts
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			post_grid_plugin_dir . 'build/blocks/woo-best-selling-products/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		global $postGridCssY;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$post_url = get_the_permalink($post_ID);
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$shortcodeParam = isset($attributes['shortcodeParam']) ? $attributes['shortcodeParam'] : [];
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		// function generateShortcode($params, $default)
		// {
		// 	$shortcode = '[' . $default;
		// 	foreach ($params as $key => $value) {
		// 		if (!empty($value)) {
		// 			$shortcode .= ' ' . $key . '="' . $value . '"';
		// 		}
		// 	}
		// 	$shortcode .= ']';
		// 	return $shortcode;
		// }
		// //* Visible condition
		$visible = isset($attributes['visible']) ? $attributes['visible'] : [];
		if (!empty($visible['rules'])) {
			$isVisible = post_grid_visible_parse($visible);
			if (!$isVisible) return;
		}
		// //* Visible condition
		ob_start();
		if (!empty($wrapperTag)) :
?>
			<<?php echo pg_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockAlign); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>">
				<?php
				// echo do_shortcode(generateShortcode($shortcodeParam, "best_selling_products"));
				?>
				<?php echo wp_kses_post($content) ?>
			</<?php echo pg_tag_escape($wrapperTag); ?>>
		<?php
		endif;
		?>
<?php
		return ob_get_clean();
	}
}
$PGBlockWooBestSellingProducts = new PGBlockWooBestSellingProducts();
