<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockAccordionNestedItem
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}


	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		//wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layer/index.css');
		//wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layer/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/accordion-nested-item/block.json',
			array(
				'title' => 'Accordion Item',
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


		global $postGridCustomCss;
		global $postGridCssY;

		$parentIcon = isset($block->context['post-grid/accordionNestedIcon']) ? $block->context['post-grid/accordionNestedIcon'] : '';
		$parentIconToggle = isset($block->context['post-grid/accordionNestedIconToggle']) ? $block->context['post-grid/accordionNestedIconToggle'] : '';
		$parentLabelIcon = isset($block->context['post-grid/accordionNestedLabelIcon']) ? $block->context['post-grid/accordionNestedLabelIcon'] : '';

		$wrapper = '';

		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

		$count = isset($attributes['count']) ? $attributes['count'] : '';


		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

		$wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
		//$content = isset($textOptions['content']) ? $textOptions['content'] : '';


		$headerLabel = isset($attributes['headerLabel']) ? $attributes['headerLabel'] : [];
		$headerLabelOptions = isset($headerLabel['options']) ? $headerLabel['options'] : [];

		$headerLabelText = isset($headerLabelOptions['text']) ? $headerLabelOptions['text'] : '';
		$headerLabelSlug = isset($headerLabelOptions['slug']) ? $headerLabelOptions['slug'] : '';
		$headerLabelTag = isset($headerLabelOptions['tag']) ? $headerLabelOptions['tag'] : 'div';


		$icon = isset($attributes['icon']) ? $attributes['icon'] : $parentIcon;
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$parentIconOptions = isset($parentIcon['options']) ? $parentIcon['options'] : [];

		$iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : $parentIconOptions['library'];
		$iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : $parentIconOptions['srcType'];
		$iconSrc = !empty($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : (isset($parentIconOptions['iconSrc']) ? $parentIconOptions['iconSrc'] : '');
		$iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : $parentIconOptions['position'];
		$iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : $parentIconOptions['class'];

		$iconHtml = !empty($iconSrc) ? '<span class="accordion-icon ' . $iconClass . ' ' . $iconSrc . '"></span>' : '';


		$iconToggle = isset($attributes['iconToggle']) ? $attributes['iconToggle'] : $parentIconToggle;
		$iconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];
		$parentIconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];

		$iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : $parentIconToggleOptions['library'];
		$iconToggleSrcType = !empty($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : $parentIconToggleOptions['srcType'];
		$iconToggleSrc = !empty($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : $parentIconToggleOptions['iconSrc'];
		$iconToggleClass = !empty($iconToggleOptions['class']) ? $iconToggleOptions['class'] : $parentIconToggleOptions['class'];

		$iconToggleHtml = !empty($iconToggleSrc) ? '<span class="accordion-icon-toggle accordion-icon ' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>' : '';




		$labelCounter = isset($attributes['labelCounter']) ? $attributes['labelCounter'] : '';
		$labelCounterOptions = isset($labelCounter['options']) ? $labelCounter['options'] : [];

		$labelCounterEnable = isset($labelCounterOptions['enable']) ? $labelCounterOptions['enable'] : false;




		$labelIcon = isset($attributes['labelIcon']) ? $attributes['labelIcon'] : $parentLabelIcon;
		$labelIconOptions = isset($labelIcon['options']) ? $labelIcon['options'] : [];
		$parentLabelIconOptions = isset($labelIcon['options']) ? $labelIcon['options'] : [];

		$labelIconLibrary = isset($labelIconOptions['library']) ? $labelIconOptions['library'] : $parentLabelIconOptions['library'];
		$labelIconSrcType = !empty($labelIconOptions['srcType']) ? $labelIconOptions['srcType'] : $parentLabelIconOptions['srcType'];
		$labelIconSrc = !empty($labelIconOptions['iconSrc']) ? $labelIconOptions['iconSrc'] : $parentLabelIconOptions['iconSrc'];
		$labelIconPosition = !empty($labelIconOptions['position']) ? $labelIconOptions['position'] : $parentLabelIconOptions['position'];
		$labelIconClass = !empty($labelIconOptions['class']) ? $labelIconOptions['class'] : $parentLabelIconOptions['class'];

		$labelIconHtml = !empty($labelIconSrc) ? '<span class="accordion-label-icon ' . $labelIconClass . ' ' . $labelIconSrc . '"></span>' : '';


		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


		$postGridCustomCss .= $customCss;



		if ($iconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($iconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($iconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}


		if ($iconToggleLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($iconToggleLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($iconToggleLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}




		if ($labelIconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($labelIconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($labelIconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}


		////var_dump($labelIconSrc);
		////var_dump($labelIconOptions);

		// echo '<pre>' . //var_export($parentIconOptions, true) . '</pre>';
		// echo '<pre>' . //var_export($iconOptions, true) . '</pre>';
		// echo '<pre>' . //var_export($iconSrc, true) . '</pre>';

		ob_start();


		?>


		<div class="<?php echo esc_attr($blockId); ?>-accordion-header accordion-header ">
			<?php if ($iconPosition == 'left'): ?>
				<?php echo wp_kses_post($iconHtml); ?>
				<?php echo wp_kses_post($iconToggleHtml); ?>
			<?php endif; ?>
			<?php if ($labelCounterEnable): ?>
				<span class="<?php echo esc_attr($blockId); ?>-accordion-label-counter accordion-label-counter">
					<?php echo wp_kses_post($count); ?>
				</span>
			<?php endif; ?>
			<?php if ($labelIconPosition == 'beforeLabel'): ?>
				<?php echo wp_kses_post($labelIconHtml); ?>
			<?php endif; ?>





			<<?php echo esc_attr($headerLabelTag); ?> class="
				<?php echo esc_attr($blockId); ?>-accordion-header-label accordion-header-label" <?php if ($headerLabelTag == 'a'): ?> href="#<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?> 		<?php if ($headerLabelTag == 'a'): ?>
					id="<?php echo esc_attr($headerLabelSlug); ?>" <?php endif; ?>>
				<?php if ($labelIconPosition == 'beforeLabelText'): ?>
					<?php echo wp_kses_post($labelIconHtml); ?>
				<?php endif; ?>

				<?php echo wp_kses_post($headerLabelText); ?>
				<?php if ($labelIconPosition == 'afterLabelText'): ?>
					<?php echo wp_kses_post($labelIconHtml); ?>
				<?php endif; ?>

			</<?php echo esc_attr($headerLabelTag); ?>>
			<?php if ($labelIconPosition == 'afterLabel'): ?>
				<?php echo wp_kses_post($labelIconHtml); ?>
			<?php endif; ?>
			<?php if ($iconPosition == 'right'): ?>
				<?php echo wp_kses_post($iconHtml); ?>
				<?php echo wp_kses_post($iconToggleHtml); ?>
			<?php endif; ?>
		</div>
		<div class="<?php echo esc_attr($blockId); ?>-accordion-content accordion-content">
			<?php echo $content; ?>
		</div>

		<?php return ob_get_clean();
	}
}

$BlockPostGrid = new PGBlockAccordionNestedItem();