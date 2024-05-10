<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockAccordion
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  function front_scripts($attributes)
  {
    wp_register_script('pgaccordion_front_script', post_grid_plugin_url . 'includes/blocks/accordion/front-scripts.js', []);
    wp_register_style('pgaccordion_accordion_css', post_grid_plugin_url . 'includes/blocks/accordion/accordion.min.css', []);
    wp_register_script('pgaccordion_accordion_js', post_grid_plugin_url . 'includes/blocks/accordion/accordion.min.js', []);

    if (has_block('post-grid/accordion')) {

      wp_enqueue_script('pgaccordion_front_script');
      wp_enqueue_style('pgaccordion_accordion_css');
      wp_enqueue_script('pgaccordion_accordion_js');
    }
  }





  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('pgaccordion_editor_style', post_grid_plugin_url . 'includes/blocks/accordion/index.css');
    // wp_register_script('pgaccordion_editor_script', post_grid_plugin_url . 'includes/blocks/accordion/index.js', array('wp-blocks', 'wp-element'));






    register_block_type(
      post_grid_plugin_dir . 'build/blocks/accordion/block.json',

      array(
        'title' => 'Accordion (Old)',
        'render_callback' => array($this, 'theHTML'),




      )
    );
  }




  function front_style($attributes)
  {
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {




    global $postGridCssY;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';

    $items = isset($attributes['items']) ? $attributes['items'] : [];


    $header = isset($attributes['header']) ? $attributes['header'] : [];
    $headerOptions = isset($header['options']) ? $header['options'] : [];
    $headerTag = isset($headerOptions['tag']) ? $headerOptions['tag'] : 'h2';

    $headerActive = isset($attributes['headerActive']) ? $attributes['headerActive'] : [];
    $headerActiveOptions = isset($headerActive['options']) ? $headerActive['options'] : [];



    $content = isset($attributes['content']) ? $attributes['content'] : [];
    $contentOptions = isset($content['options']) ? $content['options'] : [];

    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];

    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';

    $iconToggle = isset($attributes['iconToggle']) ? $attributes['iconToggle'] : [];
    $iconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];

    $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : '';
    $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : '';
    $iconToggleSrc = isset($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : '';
    $iconTogglePosition = isset($iconToggleOptions['position']) ? $iconToggleOptions['position'] : '';
    $iconToggleClass = isset($iconToggleOptions['class']) ? $iconToggleOptions['class'] : '';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];






    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }

    $iconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $iconToggleHtml = '<span class="' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>';


    ob_start();




    if (!empty($wrapperTag)) :
?>

      <div class="PGBlockAccordion <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">



        <?php
        foreach ($items as $index => $item) {

        ?>
          <div class="ac">
            <<?php echo esc_html($headerTag); ?> class="ac-header ac-trigger
                            <?php echo esc_attr($headerOptions['class']); ?>" index=<?php echo esc_attr($index); ?> blockId=<?php echo esc_attr($blockId); ?>>
              <?php if ($iconPosition == 'beforeHeader') : ?>
                <span class="icon-idle">
                  <?php echo wp_kses_post($iconHtml); ?>
                </span>
                <span class="icon-toggled">
                  <?php echo wp_kses_post($iconToggleHtml); ?>
                </span>

              <?php endif; ?>
              <span>
                <?php echo $item['headerText']; ?>
              </span>
              <?php if ($iconPosition == 'afterHeader') : ?>
                <span class="float-right">
                  <span class="icon-idle">
                    <?php echo wp_kses_post($iconHtml); ?>
                  </span>
                  <span class="icon-toggled">
                    <?php echo wp_kses_post($iconToggleHtml); ?>
                  </span>
                </span>
              <?php endif; ?>
            </<?php echo tag_escape($headerTag); ?>>

            <div class="ac-panel <?php echo esc_attr($contentOptions['class']); ?>" id="<?php echo esc_attr($blockId . $index); ?>">

              <?php ?>
              <div class="ac-text">
                <?php echo wp_kses_post($item['content']); ?>
              </div>
              <?php ?>
            </div>
          </div>


        <?php
        }

        ?>
      </div>
    <?php

    endif;
    ?>
    <script>
      document.addEventListener("DOMContentLoaded", function(event) {
        new Accordion('.<?php echo esc_attr($blockId); ?>', {
          duration: 400,
          onOpen: (currElement) => {},
          onClose: (currElement) => {},
          beforeOpen: (currElement) => {
            var iconIdle = currElement.querySelector('.icon-idle');
            var iconToggled = currElement.querySelector('.icon-toggled');
            if (iconIdle != null) {
              iconIdle.style.display = 'none';
              iconToggled.style.display = 'inline-block';
            }
          },
          beforeClose: (currElement) => {
            var iconIdle = currElement.querySelector('.icon-idle');
            var iconToggled = currElement.querySelector('.icon-toggled');
            if (iconIdle != null) {
              iconIdle.style.display = 'inline-block';
              iconToggled.style.display = 'none';
            }
          }
        });
      })
    </script>
<?php return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockAccordion();
