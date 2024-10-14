<?php
if (!defined('ABSPATH'))
	exit();
class PGBlockReactions
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			post_grid_plugin_dir . 'build/blocks/reactions/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		if (has_block('post-grid/reactions')) {
			wp_enqueue_script('pg_block_scripts');
		}
		global $postGridCssY;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$post_data = get_post($post_ID);
		$post_url = get_the_permalink($post_ID);
		$post_title = get_the_title($post_ID);
		$post_thumb_url = get_the_post_thumbnail_url($post_ID, 'full');
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$wrapperType = isset($wrapperOptions['type']) ? $wrapperOptions['type'] : '';
		$elements = isset($attributes['elements']) ? $attributes['elements'] : [];
		$elementsOptions = isset($elements['options']) ? $elements['options'] : [];
		$elementsItems = isset($elements['items']) ? $elements['items'] : [];
		$showLabel = isset($elementsOptions['showLabel']) ? $elementsOptions['showLabel'] : false;
		$showIcon = isset($elementsOptions['showIcon']) ? $elementsOptions['showIcon'] : true;
		$showCount = isset($elementsOptions['showCount']) ? $elementsOptions['showCount'] : false;
		$icon = isset($attributes['icon']) ? $attributes['icon'] : [];
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';
		$iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : 'beforeLabel';
		$label = isset($attributes['label']) ? $attributes['label'] : [];
		$labelOptions = isset($label['options']) ? $label['options'] : [];
		$count = isset($attributes['count']) ? $attributes['count'] : [];
		$countOptions = isset($count['options']) ? $count['options'] : [];
		$summary = isset($attributes['summary']) ? $attributes['summary'] : '';
		$summaryOptions = isset($summary['options']) ? $summary['options'] : '';
		$summaryType = isset($summaryOptions['type']) ? $summaryOptions['type'] : '';
		$summarytypeCustom = isset($summaryOptions['typeCustom']) ? $summaryOptions['typeCustom'] : '';
		$summaryRatingCount = isset($summaryOptions['rating_count']) ? $summaryOptions['rating_count'] : '';
		$summaryAvgRating = isset($summaryOptions['avg_rating']) ? (float)$summaryOptions['avg_rating'] : '';
		$summaryVars = array(
			'{rating_count}' => $summaryRatingCount,
			'{average_rating}' => $summaryAvgRating,
		);
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		//
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
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
		if (!empty($wrapperTag)) :
?>
			<<?php echo pg_tag_escape($wrapperTag); ?> class="
                            <?php echo esc_attr($blockId); ?>
                            <?php echo esc_attr($wrapperClass); ?>" data-reactions="<?php echo esc_attr(json_encode($obj)); ?>">
				<?php
				if (!empty($elementsItems))
					foreach ($elementsItems as $index => $item) {
						$label = isset($item['label']) ? $item['label'] : '';
						$id = isset($item['id']) ? $item['id'] : '';
						$count = isset($item['count']) ? $item['count'] : '';
						$url = isset($item['url']) ? $item['url'] : '';
						$siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';
						$iconLibrary = isset($siteIcon['library']) ? $siteIcon['library'] : '';
						$iconSrcType = isset($siteIcon['srcType']) ? $siteIcon['srcType'] : '';
						$iconSrc = isset($siteIcon['iconSrc']) ? $siteIcon['iconSrc'] : '';
						if ($iconLibrary == 'fontAwesome') {
							wp_enqueue_style('fontawesome-icons');
						} else if ($iconLibrary == 'iconFont') {
							wp_enqueue_style('icofont-icons');
						} else if ($iconLibrary == 'bootstrap') {
							wp_enqueue_style('bootstrap-icons');
						}
						$fontIconHtml = '<span class="icon ' . $iconClass . ' ' . $iconSrc . '"></span>';
						$pramsArr = ['{URL}' => $post_url, '{TITLE}' => $post_title, '{IMAGE}' => $post_thumb_url,];
						if ($wrapperType == 'share') {
							$url = strtr($url, (array) $pramsArr);
						} else {
							$url = isset($item['profileLink']) ? $item['profileLink'] : '';
						}
				?>
					<span class="<?php echo esc_attr('media-item item-' . $index); ?>" data-name="<?php echo esc_attr($id); ?>">
						<?php if ($showIcon && $iconPosition == "beforeLabel") : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
						<?php if ($showLabel) : ?>
							<span class='media-label'>
								<?php echo esc_html($label); ?>
							</span>
						<?php endif; ?>
						<?php if ($showIcon && $iconPosition == "afterLabel") : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
						<?php if ($showCount) : ?>
							<span class="media-count">(
								<?php echo esc_html($count); ?>)
							</span>
						<?php endif; ?>
					</span>
				<?php
					}
				?>

				<!-- summary -->
				<?php if (!empty($summarytypeCustom)) : ?>
					<div class="summary">
						<?php
						echo wp_kses_post(strtr($summarytypeCustom, $summaryVars));
						?>
					</div>
				<?php endif; ?>
				<?php if (empty($summarytypeCustom)) : ?>
					<?php if (!empty($summaryType)) : ?>
						<div class="summary">
							<?php
							echo wp_kses_post(strtr($summaryType, $summaryVars));
							?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				<!-- summary -->
				<div class="overlay"></div>
			</<?php echo pg_tag_escape($wrapperTag); ?>>
		<?php
		endif;
		?>
<?php
		return ob_get_clean();
	}
}
$PGBlockReactions = new PGBlockReactions();
