<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockSocialShare
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}


	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		//wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/social-share-x/index.css');
		// wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/social-share-x/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/social-share/block.json',
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


		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];



		//
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





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
				if (!empty($elementsItems))
					foreach ($elementsItems as $index => $item) {
						$label = isset($item['label']) ? $item['label'] : '';
						$count = isset($item['count']) ? $item['count'] : '';
						$url = isset($item['url']) ? $item['url'] : '';

						$siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';

						$iconLibrary = isset($siteIcon['library']) ? $siteIcon['library'] : '';
						$iconSrcType = isset($siteIcon['srcType']) ? $siteIcon['srcType'] : '';
						$iconSrc = isset($siteIcon['iconSrc']) ? $siteIcon['iconSrc'] : '';

						//echo //var_export($url, true);


						if ($iconLibrary == 'fontAwesome') {
							wp_enqueue_style('fontawesome-icons');
						} else if ($iconLibrary == 'iconFont') {
							wp_enqueue_style('icofont-icons');
						} else if ($iconLibrary == 'bootstrap') {
							wp_enqueue_style('bootstrap-icons');
						}

						$fontIconHtml = '<span class="icon ' . $iconClass . ' ' . $iconSrc . '"></span>';

						$pramsArr = ['{URL}' => $post_url, '{TITLE}' => $post_title, '{IMAGE}' => $post_thumb_url,];
						$url = strtr($url, (array) $pramsArr);



				?>
					<a href="<?php echo esc_url_raw($url); ?>" class="<?php echo esc_attr('media-item item-' . $index); ?>">

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

					</a>
				<?php

					}


				?>
			</<?php echo esc_html($wrapperTag); ?>>

		<?php

		endif;

		?>














<?php return ob_get_clean();
	}
}

$PGBlockSocialShare = new PGBlockSocialShare();
