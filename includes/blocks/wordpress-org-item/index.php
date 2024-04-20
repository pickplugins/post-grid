<?php
if (!defined('ABSPATH'))
	exit();



class PGBlockWordpressOrgItem
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
			post_grid_plugin_dir . 'build/blocks/wordpress-org-item/block.json',
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

		$wpObject = isset($block->context['post-grid/WPObject']) ? $block->context['post-grid/WPObject'] : 'category';

		$wpObjectData = isset($wpObject['data']) ? $wpObject['data'] : array();





		$object = isset($attributes['object']) ? $attributes['object'] : [];
		$objectOptions = isset($object['options']) ? $object['options'] : [];
		$objectType = isset($objectOptions['type']) ? $objectOptions['type'] : 'plugin';
		$objectSlug = isset($objectOptions['slug']) ? $objectOptions['slug'] : 'post-grid';
		$objectData = isset($objectOptions['data']) ? $objectOptions['data'] : array();

		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'ul';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$wrapperField = isset($wrapperOptions['field']) ? $wrapperOptions['field'] : 'name';
		$wrapperPrefix = isset($wrapperOptions['prefix']) ? $wrapperOptions['prefix'] : '';
		$wrapperIsLink = isset($wrapperOptions['isLink']) ? $wrapperOptions['isLink'] : true;
		$wrapperLinkText = isset($wrapperOptions['linkText']) ? $wrapperOptions['linkText'] : '';




		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




		$transientData = get_transient($blockId . '_data');

		$obj['id'] = $post_ID;
		$obj['type'] = 'post';



		$wrapperClass = parse_css_class($wrapperClass, $obj);

		ob_start();


?>


		<<?php echo esc_html($wrapperTag); ?> class="	<?php echo esc_attr($blockId); ?>	<?php echo esc_attr($wrapperClass); ?>">
			<span> <?php echo esc_attr($wrapperPrefix) ?> </span>
			<span>
				<?php if ($objectType == 'theme') : ?>
					<?php if ($wrapperField == 'name') {
						echo esc_attr($objectData['name']);
					} ?>
					<?php if ($wrapperField == 'version') {
						echo esc_attr($objectData['version']);
					} ?>
					<?php if ($wrapperField == 'is_commercial') {
						if ($objectData['is_commercial']) {
							echo "Yes";
						} else {
							echo "No";
						}
					} ?>
					<?php if ($wrapperField == 'preview_url') {
						if ($wrapperIsLink) { ?>
							<a href="<?php echo esc_url_raw($objectData['preview_url']); ?>">
								<?php echo esc_attr($wrapperLinkText); ?>
							</a>
					<?php } else {
							echo esc_attr($objectData['preview_url']);
						}
					}
					?>
					<?php if ($wrapperField == 'author') {
						echo esc_attr($objectData['author']);
					} ?>
					<?php if ($wrapperField == 'screenshot_url') {
						if ($wrapperIsLink) { ?>
							<a href="<?php echo esc_url_raw($objectData['screenshot_url']); ?>">
								<img src="<?php echo esc_url_raw($objectData['screenshot_url']); ?>" alt="<?php echo esc_attr($objectData['name']) ?>" /></a>
						<?php } else { ?>
							<img src="<?php echo esc_url_raw($objectData['screenshot_url']); ?>" alt="<?php echo esc_attr($objectData['name']) ?>" />
					<?php }
					} ?>
					<?php if ($wrapperField == 'rating') {
						echo esc_attr($objectData['rating']);
					} ?>
					<?php if ($wrapperField == 'num_ratings') {
						echo esc_attr($objectData['num_ratings']);
					} ?>
					<?php if ($wrapperField == 'ratings') { ?>
						<ul><?php
							if (isset($objectData['ratings'])) {
								foreach ($objectData['ratings'] as $x => $value) { ?>
									<li><?php echo $x; ?>: <?php echo $value; ?></li>
								<?php } ?>
						</ul><?php }
						} ?>
				<?php if ($wrapperField == 'reviews_url') {
						if ($wrapperIsLink) { ?>
						<a href="<?php echo esc_url_raw($objectData['reviews_url']); ?>">
							<?php echo esc_attr($wrapperLinkText) ?>
						</a> <?php } else {
								echo esc_attr($objectData['reviews_url']);
							}
						} ?>
				<?php if ($wrapperField == 'last_update') {
						echo esc_attr($objectData['last_update']);
					} ?>
				<?php if ($wrapperField == 'creation_time') {
						echo esc_attr($objectData['creation_time']);
					} ?>
				<?php if ($wrapperField == 'homepage') {
						if ($wrapperIsLink) { ?>
						<a href="<?php echo esc_url_raw($objectData['homepage']); ?>">
							<?php echo esc_attr($wrapperLinkText) ?>
						</a> <?php } else {
								echo esc_attr($objectData['homepage']);
							}
						} ?>
				<?php if ($wrapperField == 'tags') { ?>
					<ul><?php
						if (isset($objectData['tags'])) {
							foreach ($objectData['tags'] as $x => $value) { ?>
								<li><?php echo $value; ?></li>
							<?php } ?>
					</ul><?php }
					} ?>
			<?php if ($wrapperField == 'download_link') {
						if ($wrapperIsLink) { ?>
					<a href="<?php echo esc_url_raw($objectData['download_link']); ?>">
						<?php echo esc_attr($wrapperLinkText) ?>
					</a> <?php } else {
							echo esc_attr($objectData['download_link']);
						}
					} ?>
			<?php if ($wrapperField == 'requires') {
						echo esc_attr($objectData['requires']);
					} ?>
			<?php if ($wrapperField == 'requires_php') {
						echo esc_attr($objectData['requires_php']);
					} ?>
			<?php if ($wrapperField == 'external_support_url') {
						if ($wrapperIsLink) { ?>
					<a href="<?php echo esc_url_raw($objectData['external_support_url']); ?>">
						<?php echo esc_attr($wrapperLinkText) ?>
					</a> <?php } else {
							echo esc_attr($objectData['external_support_url']);
						}
					} ?>
			<?php if ($wrapperField == 'external_repository_url') {
						if ($wrapperIsLink) { ?>
					<a href="<?php echo esc_url_raw($objectData['external_repository_url']); ?>">
						<?php echo esc_attr($wrapperLinkText) ?>
					</a> <?php } else {
							echo esc_attr($objectData['external_repository_url']);
						}
					} ?>
		<?php endif; ?>
		<?php if ($objectType == 'plugin') : ?>
			<?php if ($wrapperField == 'name') {
				echo esc_attr($objectData['name']);
			} ?>
			<?php if ($wrapperField == 'version') {
				echo esc_attr($objectData['version']);
			} ?>
			<?php if ($wrapperField == 'author') {
				echo esc_attr($objectData['author']);
			} ?>
			<?php if ($wrapperField == 'author_profile') {
				echo esc_attr($objectData['author_profile']);
			} ?>
			<?php if ($wrapperField == 'contributors') { ?>
				<ul><?php
					if (isset($objectData['contributors'])) {

						foreach ($objectData['contributors'] as $x => $value) { ?>
							<li><?php echo $value; ?></li>
					<?php }
					} ?>
				</ul><?php } ?>
			<?php if ($wrapperField == 'tested') {
				echo esc_attr($objectData['tested']);
			} ?>
			<?php if ($wrapperField == 'requires') {
				echo esc_attr($objectData['requires']);
			} ?>
			<?php if ($wrapperField == 'requires_php') {
				echo esc_attr($objectData['requires_php']);
			} ?>
			<?php if ($wrapperField == 'requires_plugins') {
				echo esc_attr($objectData['requires_plugins']);
			} ?>
			<?php if ($wrapperField == 'rating') {
				echo esc_attr($objectData['rating']);
			} ?>
			<?php if ($wrapperField == 'num_ratings') {
				echo esc_attr($objectData['num_ratings']);
			} ?>
			<?php if ($wrapperField == 'support_threads') {
				echo esc_attr($objectData['support_threads']);
			} ?>
			<?php if ($wrapperField == 'support_threads_resolved') {
				echo esc_attr($objectData['support_threads_resolved']);
			} ?>
			<?php if ($wrapperField == 'active_installs') {
				echo esc_attr($objectData['active_installs']);
			} ?>
			<?php if ($wrapperField == 'last_updated') {
				echo esc_attr($objectData['last_updated']);
			} ?>
			<?php if ($wrapperField == 'added') {
				echo esc_attr($objectData['added']);
			} ?>
			<?php if ($wrapperField == 'ratings') { ?>
				<ul><?php
					if (isset($objectData['ratings'])) {
						foreach ($objectData['ratings'] as $x => $value) { ?>
							<li><?php echo $x; ?>: <?php echo $value; ?></li>
						<?php } ?>
				</ul><?php }
				} ?>
		<?php if ($wrapperField == 'homepage') {
				if ($wrapperIsLink) { ?>
				<a href="<?php echo esc_url_raw($objectData['homepage']); ?>">
					<?php echo esc_attr($wrapperLinkText) ?>
				</a> <?php } else {
						echo esc_attr($objectData['homepage']);
					}
				} ?>
		<?php if ($wrapperField == 'download_link') {
				if ($wrapperIsLink) { ?>
				<a href="<?php echo esc_url_raw($objectData['download_link']); ?>">
					<?php echo esc_attr($wrapperLinkText) ?>
				</a> <?php } else {
						echo esc_attr($objectData['download_link']);
					}
				} ?>
		<?php if ($wrapperField == 'banners') { ?>
			<img src="<?php echo $objectData['banners']; ?>" alt="<?php echo $objectData['name']; ?>" />
		<?php } ?>

		<?php if ($wrapperField == 'tags') { ?>
			<ul><?php
				if (isset($objectData['tags'])) {
					foreach ($objectData['tags'] as $x => $value) { ?>
						<li><?php echo $value; ?></li>
					<?php } ?>
			</ul><?php }
			} ?>

<?php endif; ?>
			</span>




		</<?php echo esc_html($wrapperTag); ?>>




<?php return ob_get_clean();
	}
}

$BlockPostGrid = new PGBlockWordpressOrgItem();
