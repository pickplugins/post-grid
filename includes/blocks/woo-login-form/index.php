<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockWooLoginForm
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}


	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		//wp_register_style('editor_style', post_grid_plugin_url . 'includes/blocks/woo-price/index.css');
		//wp_register_script('editor_script', post_grid_plugin_url . 'includes/blocks/woo-price/index.js', array('wp-blocks', 'wp-element'));


		register_block_type(
			post_grid_plugin_dir . 'build/blocks/woo-login-form/block.json',
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

		$icon = isset($attributes['icon']) ? $attributes['icon'] : '';
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
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




		// var_dump(generateShortcode($shortcodeParam, "product_categories"));


		ob_start();


		if (!empty($wrapperTag)) :

?>
			<<?php echo tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockAlign); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>">
				LOGIN
				<?php
				woocommerce_login_form(
					array(
						'message'  => esc_html__('If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.', 'woocommerce'),
						'redirect' => wc_get_checkout_url(),
						'hidden'   => true,
					)
				);
				?>

			</<?php echo tag_escape($wrapperTag); ?>>
		<?php

		endif;


		?>








<?php return ob_get_clean();
	}
}

$PGBlockWooLoginForm = new PGBlockWooLoginForm();
