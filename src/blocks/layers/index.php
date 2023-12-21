<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockLayers
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/layers/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/layers/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      post_grid_plugin_dir . 'build/blocks/layers/block.json',
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
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];



    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperLinkTo = isset($wrapperOptions['linkTo']) ? $wrapperOptions['linkTo'] : '';
    //$content = isset($wrapperOptions['content']) ? $wrapperOptions['content'] : '';

    $wrapperLinkTo = isset($wrapperOptions['linkTo']) ? $wrapperOptions['linkTo'] : '';

    $wrapperLinkTarget = isset($wrapperOptions['linkTarget']) ? $wrapperOptions['linkTarget'] : '_blank';
    $wrapperCustomUrl = isset($wrapperOptions['customUrl']) ? $wrapperOptions['customUrl'] : '';
    $wrapperLinkAttr = isset($wrapperOptions['linkAttr']) ? $wrapperOptions['linkAttr'] : [];
    $wrapperRel = isset($wrapperOptions['rel']) ? $wrapperOptions['rel'] : '';
    $wrapperLinkToMetaKey = isset($wrapperOptions['linkToMetaKey']) ? $wrapperOptions['linkToMetaKey'] : '';

    


    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




    $linkUrl = '';

    if ($wrapperLinkTo == 'postUrl') {

      $linkUrl = get_permalink($post_ID);
    } else if ($wrapperLinkTo == 'customField') {
      $linkUrl = get_post_meta($post_ID, $wrapperLinkToMetaKey, true);
    } else if ($wrapperLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($wrapperLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_author_posts_url($author_id);
    } else if ($wrapperLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($wrapperLinkTo == 'customUrl') {
      $linkUrl = $wrapperCustomUrl;
    }

    ////var_dump($blockAlign);


    $obj['id'] = $post_ID;
    $obj['type'] = 'post';



    $wrapperClass = parse_css_class($wrapperClass, $obj);

    ob_start();


    if ($wrapperTag == 'a') { ?>
      <a class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" target="<?php echo esc_attr($wrapperLinkTarget); ?>" rel="<?php echo esc_attr($wrapperRel); ?>" href="<?php echo esc_url_raw($linkUrl); ?>">
        <?php echo $content ?>
      </a>
    <?php

    } else { ?>
      <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>"> <?php echo $content ?> </<?php echo esc_attr($wrapperTag); ?>>
<?php
    }

    return ob_get_clean();
  }
}

$BlockPostGrid = new PGBlockLayers();
