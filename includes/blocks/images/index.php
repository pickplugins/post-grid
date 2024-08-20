<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockGalleryImages
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {



    register_block_type(
      post_grid_plugin_dir . 'build/blocks/images/block.json',
      array(

        'render_callback' => array($this, 'theHTML'),


      )
    );
  }

  function front_scripts($attributes)
  {
    // wp_register_script('pgpostquery_front_script', post_grid_plugin_url . 'includes/blocks/images/front-scripts.js', []);
    // wp_register_style('pgpostquery_front_style', post_grid_plugin_url . 'includes/blocks/images/index.css');
    if (has_block('post-grid/images')) {

      //wp_enqueue_script('pgpostquery_front_script');
      //wp_enqueue_style('pgpostquery_front_style');
    }
  }
  function front_style($attributes) {}




  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {



    wp_register_script('fslightbox', post_grid_plugin_url . 'includes/blocks/image/fslightbox.js', [], '', true);

    global $postGridCssY;
    global $postGridScriptData;
    global $PGUserQuery;
    global $PGBlockPostQuery;

    $block_instance = $block->parsed_block;




    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



    $parentBlock = isset($block->context['parentBlock']) ? $block->context['parentBlock'] : '';
    $galleryId = isset($block->context['post-grid/galleryId']) ? $block->context['post-grid/galleryId'] : $blockId;

    $galleryLightbox = isset($block->context['post-grid/lightbox']) ? $block->context['post-grid/lightbox'] : null;
    $lightboxOptions = isset($galleryLightbox['options']) ? $galleryLightbox['options'] : [];

    $lightboxEnable = isset($lightboxOptions['enable']) ? $lightboxOptions['enable'] : false;

    //if (has_block('images')) {
    if ($lightboxEnable == true) {
      wp_enqueue_script('fslightbox');
    }
    //}

    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


    $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
    $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];
    $itemsWrapExcluded = isset($itemsWrapOptions['excludedWrapper']) ? $itemsWrapOptions['excludedWrapper'] : false;

    /*#######itemWrap######*/
    $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
    $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];
    $itemWrapTag = isset($itemWrapOptions['tag']) ? $itemWrapOptions['tag'] : 'div';
    $itemWrapClass = isset($itemWrapOptions['class']) ? $itemWrapOptions['class'] : 'item';
    $itemWrapCounterClass = isset($itemWrapOptions['counterClass']) ? $itemWrapOptions['counterClass'] : false;
    $itemWrapTermsClass = isset($itemWrapOptions['termsClass']) ? $itemWrapOptions['termsClass'] : false;
    $itemWrapOddEvenClass = isset($itemWrapOptions['oddEvenClass']) ? $itemWrapOptions['oddEvenClass'] : false;


    /*#########$noPostsWrap#########*/
    $noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
    $noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];

    $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
    $gridOptions = isset($grid['options']) ? $grid['options'] : [];
    $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];

    $galleryItems = isset($attributes['galleryItems']) ? $attributes['galleryItems'] : [];


    /*#######pagination######*/

    $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
    $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
    $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';




    $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];


    $parsed_block = isset($block->parsed_block) ? $block->parsed_block : [];
    $innerBlocks = isset($parsed_block['innerBlocks']) ? $parsed_block['innerBlocks'] : [];





    $block_type = WP_Block_Type_Registry::get_instance()->get_registered($block->clientId);




    $posts = [];
    $responses = [];





    $blockArgs = [
      'blockId' => $blockId,
      'noPosts' => false
    ];


    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = post_grid_visible_parse($visible);



      if (!$isVisible) return;
    }




    // //* Visible condition
    if (!empty($galleryItems)) {

      //return;
    }



    ob_start();

?>


    <?php
    if (!$itemsWrapExcluded) :
    ?>
      <div class="loop-loading"></div>
      <div class="<?php echo esc_attr($blockId); ?> pg-images items-loop" id="items-loop-<?php echo esc_attr($blockId); ?>" blockArgs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
      <?php
    endif;
      ?>
      <?php


      $counter = 1;


      if (!empty($galleryItems))
        foreach ($galleryItems as $index => $galleryItem) {

          $imageId = isset($galleryItem['id']) ? $galleryItem['id'] : "";



          //if (empty($imageId)) continue;



          if ($counter % 2 == 0) {
            $odd_even_class = 'even';
          } else {
            $odd_even_class = 'odd';
          }
          $html = '';

          $filter_block_context = static function ($context) use ($imageId, $galleryItem, $index, $lightboxEnable, $blockId) {
            $context['imageId']   = $imageId;
            //$context['imageData']   = $galleryItem;
            $context['loopIndex']   = $index;
            $context['galleryId']   = $blockId;
            $context['lightbox']   = $lightboxEnable;
            return $context;
          };


          add_filter('render_block_context', $filter_block_context, 1);


          foreach ($innerBlocks as $block) {


            //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
            $html .= render_block($block);
          }

          remove_filter('render_block_context', $filter_block_context, 1);







      ?>
        <<?php echo pg_tag_escape($itemWrapTag); ?> class=" 
            <?php echo esc_attr($itemWrapClass); ?>
            <?php ?>
            <?php if ($itemWrapCounterClass) {
              echo esc_attr("item-" . $counter);
            } ?>
            <?php if ($itemWrapOddEvenClass) {
              echo esc_attr($odd_even_class);
            } ?> ">
          <?php echo wp_kses_post($html);
          ?>
        </<?php echo pg_tag_escape($itemWrapTag); ?>>
      <?php
          $counter++;
        }



      ?>

      <?php
      if (!$itemsWrapExcluded) : ?>
      </div>
    <?php
      endif; ?>
<?php

    return ob_get_clean();
  }
}

$PGBlockGalleryImages = new PGBlockGalleryImages();
