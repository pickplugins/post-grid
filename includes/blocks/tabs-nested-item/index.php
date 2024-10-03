<?php
if (!defined('ABSPATH'))
	exit();
class PGBlockTabsNestedItem
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			post_grid_plugin_dir . 'build/blocks/tabs-nested-item/block.json',
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
		$the_post = get_post($post_ID);
		$wrapper = '';
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$activeTab = isset($block->context['activeTab']) ? $block->context['activeTab'] : null;
		//$activeTab = isset($attributes['activeTab']) ? $attributes['activeTab'] : '';
		$uid = isset($attributes['uid']) ? $attributes['uid'] : '';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
		//$content = isset($textOptions['content']) ? $textOptions['content'] : '';
		$icon = isset($attributes['icon']) ? $attributes['icon'] : '';
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
		$iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
		$iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
		$iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
		$iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		if ($iconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($iconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($iconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}
		// $obj['id'] = $post_ID;
		// $obj['type'] = 'post';
		// $wrapperClass = post_grid_parse_css_class($wrapperClass, $obj);
		// //* Visible condition
		$visible = isset($attributes['visible']) ? $attributes['visible'] : [];
		if (!empty($visible['rules'])) {
			$isVisible = post_grid_visible_parse($visible);
			if (!$isVisible) return;
		}
		// //* Visible condition
		ob_start();
?>
		<div class="pg-tabs-panel  <?php echo ($uid == $activeTab) ? '' : '' ?>" data-tab-id="<?php echo esc_attr($uid); ?>" hidden="true" aria-hidden="true" role="tabpanel" aria-labelledby="<?php echo esc_attr($uid); ?>">
			<?php echo wp_kses_post($content); ?>
		</div>
<?php
		return ob_get_clean();
	}
}
$BlockPostGrid = new PGBlockTabsNestedItem();
