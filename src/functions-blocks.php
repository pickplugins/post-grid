<?php
if (!defined('ABSPATH'))
  exit; // if direct access

register_meta('post', 'pgc_meta', [
  'type' => 'string',
  'single' => true,
  'show_in_rest' => true,
]);



add_action('wp_footer', 'post_grid_global_css', 999);

function post_grid_global_css()
{

  global $postGridCustomCss;

  ?>
  <style>
    /*Custom CSS*/
    <?php echo $postGridCustomCss; ?>
  </style>

  <?php
}
function parse_css_class($classStr, $obj)
{
  $objType = $obj['type'];
  $objId = $obj['id'];


  $classArr = explode(' ', $classStr);

  $newArr = [];


  foreach ($classArr as $index => $item) {

    if (strpos($item, 'currentYear') !== false) {

      // $itemX = str_replace('currentYear', $objId, $item);

      $prams = str_replace(['currentYear[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = date($format);
    }
    if (strpos($item, 'currentMonth') !== false) {
      $params = str_replace(['currentMonth[\'', '\']'], '', $item);
      $params = explode(',', $params);
      $format = wp_kses_stripslashes($params[0]);

      $newArr[$index] = date($format);
    }
    if (strpos($item, 'currentDay') !== false) {
      $params = str_replace(['currentDay[\'', '\']'], '', $item);
      $params = explode(',', $params);
      $format = wp_kses_stripslashes($params[0]);
      $newArr[$index] = date($format);
    }
    if (strpos($item, 'currentDate') !== false) {
      $prams = str_replace(['currentDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);

      $newArr[$index] = date($format);
    }
    if (strpos($item, 'currentTime') !== false) {
      $prams = str_replace(['currentTime[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);

      $newArr[$index] = date($format);
    }
    if (strpos($item, 'postPublishDate') !== false) {
      $prams = str_replace(['postPublishDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);

      $newArr[$index] = get_the_date($format, $objId);
    }
    if (strpos($item, 'postModifiedDate') !== false) {
      $prams = str_replace(['postModifiedDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);

      $newArr[$index] = get_the_modified_date($format, $objId);
    }


    if (strpos($item, 'postTagTitle') !== false) {

      $posttags = get_the_tags();
      if ($posttags != false) {
        $posttags = $posttags[0]->name;
        $newArr[$index] = str_replace('postTagTitle', $posttags, $item);
      }
    }


    if (strpos($item, 'postTagsTitle') !== false) {
      $posttags = get_the_tags();
      $prams = str_replace(['postTagsTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $count = wp_kses_stripslashes($prams[0]);
      if ($posttags != false) {
        $str = "";
        $i = 1;
        foreach ($posttags as $itemx) {
          $str .= $itemx->name . " ";
          if ($i >= (int) $count)
            break;
          $i++;
        }
        $newArr[$index] = $str;
      }
    }

    if (strpos($item, 'postCategoryTitle') !== false) {
      $postcats = get_the_category();
      if ($postcats != false) {
        $postcats = $postcats[0]->name;
        $newArr[$index] = str_replace('postCategoryTitle', $postcats, $item);
      }
    }
    if (strpos($item, 'postCategoriesTitle') !== false) {
      $postcats = get_the_category();
      $prams = str_replace(['postCategoriesTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $count = wp_kses_stripslashes($prams[0]);
      if ($postcats != false) {
        $str = '';
        $i = 1;
        foreach ($postcats as $itemx) {
          $str .= $itemx->name . " ";
          if ($i >= (int) $count)
            break;
          $i++;
        }
        $newArr[$index] = $str;
      }
    }










    if (strpos($item, 'postTermTitle') !== false) {

      $prams = str_replace(['postTermTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $taxonomy = wp_kses_stripslashes($prams[0]);
      $postterms = get_the_terms($objId, $taxonomy);
      $newArr[$index] = $postterms[0]->name;
    }












    if (strpos($item, 'postTermsTitle') !== false) {
      $prams = str_replace(['postTermsTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $taxonomy = wp_kses_stripslashes($prams[0]);
      $count = wp_kses_stripslashes($prams[1]);
      $postterms = get_the_terms($objId, $taxonomy);
      if ($postterms != false) {
        $str = '';
        $i = 1;
        foreach ($postterms as $postterm) {
          $str .= $postterm->name . " ";
          if ($i >= (int) $count)
            break;
          $i++;
        }
        $newArr[$index] = $str;
      }
    }




    if (strpos($item, 'postSlug') !== false) {
      $postslug = get_post_field('post_name', get_post());
      $newArr[$index] = str_replace('postSlug', $postslug, $item);
    }
    if (strpos($item, 'postID') !== false) {
      $newArr[$index] = str_replace('postID', $objId, $item);
    }
    if (strpos($item, 'postStatus') !== false) {
      $poststatus = get_post_status();
      $newArr[$index] = str_replace('postStatus', $poststatus, $item);
    }
    if (strpos($item, 'authorId') !== false) {
      $postauthor = get_the_author_meta($field = 'ID');
      $newArr[$index] = str_replace('authorId', $postauthor, $item);
    }
    if (strpos($item, 'authorName') !== false) {
      $postauthor = get_the_author_meta($field = 'display_name');
      $newArr[$index] = str_replace('authorName', $postauthor, $item);
    }
    if (strpos($item, 'authorFirstName') !== false) {
      $postauthor = get_the_author_meta($field = 'first_name');
      $newArr[$index] = str_replace('authorFirstName', $postauthor, $item);
    }
    if (strpos($item, 'authorLastName') !== false) {
      $postauthor = get_the_author_meta($field = 'last_name');
      $newArr[$index] = str_replace('authorLastName', $postauthor, $item);
    }
    if (strpos($item, 'authorDescription') !== false) {
      $postauthor = get_the_author_meta($field = 'description');
      $newArr[$index] = str_replace('authorDescription', $postauthor, $item);
    }
    if (strpos($item, 'excerpt') !== false) {
      $excerpt = get_the_excerpt();
      $newArr[$index] = str_replace('expert', $excerpt, $item);
    }


    if (strpos($item, 'termId') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termId', $queried_object->term_id, $item);
    }
    if (strpos($item, 'termTitle') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termTitle', $queried_object->name, $item);
    }
    if (strpos($item, 'termDescription') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termDescription', $queried_object->description, $item);
    }
    if (strpos($item, 'termPostCount') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termPostCount', $queried_object->count, $item);
    }







    if (strpos($item, 'rankmathTitle') !== false) {


      $metaValue = get_post_meta($objId, 'rank_math_title', true);

      $newArr[$index] = str_replace('rankmathTitle', $metaValue, $item);
    }

    if (strpos($item, 'rankmathDescription') !== false) {
      $metaValue = get_post_meta($objId, 'rank_math_description', true);

      $newArr[$index] = str_replace('rankmathDescription', $metaValue, $item);
    }
    if (strpos($item, 'rankmathFocusKeyword') !== false) {
      $metaValue = get_post_meta($objId, 'rank_math_focus_keyword', true);

      $newArr[$index] = str_replace('rankmathFocusKeyword', $metaValue, $item);
    }
    // if (strpos($item, 'rankmathFocusKeywords') !== false) {
    //   $newArr[$index] = date('h:i:sa');
    // }
    if (strpos($item, 'rankmathOrgname') !== false) {
      $data = get_option('rank-math-options-titles');
      $orgname = $data['knowledgegraph_name'];
      $newArr[$index] = str_replace('rankmathOrgname', $orgname, $item);
    }
    if (strpos($item, 'rankmathOrgurl') !== false) {
      $data = get_option('rank-math-options-titles');
      $url = $data['url'];
      $newArr[$index] = str_replace('rankmathOrgurl', $url, $item);
    }
    if (strpos($item, 'rankmathOrglogo') !== false) {
      $data = get_option('rank-math-options-titles');
      $logo = $data['knowledgegraph_logo'];
      $newArr[$index] = str_replace('rankmathOrglogo', $logo, $item);
    }





    if (strpos($item, 'siteTitle') !== false) {
      $siteinfo = get_bloginfo();
      $newArr[$index] = str_replace('siteTitle', $siteinfo, $item);
    }
    if (strpos($item, 'siteDescription') !== false) {
      $siteinfo = get_bloginfo('description');
      $newArr[$index] = str_replace('siteDescription', $siteinfo, $item);
    }


    if (strpos($item, 'postMeta') !== false) {

      $prams = str_replace(['postMeta[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $key = wp_kses_stripslashes($prams[0]);
      $postmeta = get_post_meta($objId, $key);
      $newArr[$index] = $postmeta[0];
    }
    if (strpos($item, 'separator') !== false) {
      $prams = str_replace(['separator[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $separator = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = $separator;
    }
    if (strpos($item, 'searchTerms') !== false) {
      $current_query = sanitize_text_field(get_query_var('s'));
      $newArr[$index] = str_replace('searchTerms', $current_query, $item);
    }
    if (strpos($item, 'counter') !== false) {
      $newArr[$index] = date('h:i:sa');

    }
  }

  return join(' ', $newArr);
}


function post_grid_global_cssY()
{

  global $postGridCssY;
  global $postGridFonts;

  //$url = $_SERVER['REQUEST_URI'];


  $reponsiveCssGroups = [];
  $reponsiveCss = '';



  if (is_array($postGridCssY))
    foreach ($postGridCssY as $index => $blockCss) {

      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {

          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {

              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {

                  if ('font-family' == $att) {
                    $postGridFonts[$device][] = $val;
                  }
                  $reponsiveCssGroups[$device][$selector][$att] = $val;
                }
            }



          // $attr = isset($arg['attr']) ? $arg['attr'] : '';
          // $id = isset($arg['id']) ? $arg['id'] : '';
          // $reponsive = isset($arg['reponsive']) ? $arg['reponsive'] : '';


          // foreach ($reponsive as $device => $value) {

          //     if (!empty($value))
          //         $reponsiveCssGroups[$device][] = ['id' => $id, 'attr' => $attr,  'val' => $value];
          // }
        }
    }





  if (!empty($reponsiveCssGroups['Desktop'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 782px){';


    foreach ($reponsiveCssGroups['Desktop'] as $selector => $atts) {

      $reponsiveCss .= $selector . '{';

      if (!empty($atts))
        foreach ($atts as $attr => $val) {



          if (!empty($val) && !is_array($val)) {

            $reponsiveCss .= $attr . ':' . $val . ';';
          }
        }
      $reponsiveCss .= '}';
    }




    //$reponsiveCss .= '}';
  }



  if (!empty($reponsiveCssGroups['Tablet'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 361px) and (max-width: 780px){';
    // $reponsiveCss .= '@media(max-width: 780px){';
    $reponsiveCss .= '@media(max-width: 991px){';


    foreach ($reponsiveCssGroups['Tablet'] as $selector => $atts) {

      $reponsiveCss .= $selector . '{';

      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }


    $reponsiveCss .= '}';
  }


  if (!empty($reponsiveCssGroups['Mobile'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 0px) and (max-width: 360px){';
    //$reponsiveCss .= '@media(max-width:360px){';
    $reponsiveCss .= '@media(max-width:767px){';

    foreach ($reponsiveCssGroups['Mobile'] as $selector => $atts) {

      $reponsiveCss .= $selector . '{';

      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }



    $reponsiveCss .= '}';
  }

  //var_dump($postGridFonts);

  $fonts = '';
  $fontsArr = [];

  if (!empty($postGridFonts)) {
    foreach ($postGridFonts as $device => $itemFont) {
      if (!empty($itemFont)) {
        foreach ($itemFont as $itemFon) {
          $fonts .= $itemFon . ',';

          if (!in_array($itemFon, $fontsArr)) {
            $fontsArr[] = $itemFon . ':wght@100;200;300;400;500;600;700;800;900';
          }
        }
      }
    }
  }



  $fontsArrStr = implode('&family=', $fontsArr);

  //var_dump($fontsArrStr);

  // $fonts = substr($fonts, 0, -1);

  //$fonts = str_replace(",", "|", $fonts);
  $fonts = str_replace(" ", "+", $fontsArrStr);

  //echo '###############';
  //var_dump($fonts);

  if (!empty($fonts)) {
    ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts);

    ?>">
    <?php

  }

  ?>

  <style>
    <?php echo ($reponsiveCss); ?>
  </style>

  <?php

}
add_action('wp_footer', 'post_grid_global_cssY', 999);


function post_grid_global_vars()
{
  global $postGridScriptData;
  $postGridScriptData['siteUrl'] = get_bloginfo('url');


  ?>
  <script>     var post_grid_vars = <?php echo (wp_json_encode($postGridScriptData)); ?>
  </script>
  <?php
}
add_action('wp_footer', 'post_grid_global_vars', 999);





add_filter('block_categories_all', 'post_grid_block_categories', 10, 2);


/**
 * Register custom category for blocks
 */

function post_grid_block_categories($categories, $context)
{

  if (!empty($categories)) {

    $inserted = array(
      array(
        'slug' => 'post-grid',
        'title' => __('Post Grid Combo', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-woo',
        'title' => __('Post Grid Combo - WooCommerce', 'boilerplate'),
      ),
    );

    array_splice($categories, 3, 0, $inserted); // splice in at position 3

    return $categories;

    // return array_merge(
    //     $categories,
    //     array(
    //         array(
    //             'slug'  => 'post-grid',
    //             'title' => __('Post Grid Combo', 'boilerplate'),
    //         ),
    //         // array(
    //         //     'slug'  => 'post-grid-woo',
    //         //     'title' => __('Post Grid Combo - WooCommerce', 'boilerplate'),
    //         // ),
    //     ),
    // );
  } else {
    return $categories;
  }
}



// add_action('init', function () {

//     register_post_meta(
//         'page',
//         'pg_page_styles',
//         array(
//             'single'       => true,
//             'type'         => 'string',
//             'show_in_rest' => true,
//         )
//     );
// });


// register_meta('post', 'pg_page_styles', [
//     //'object_subtype' => 'my_article',
//     'show_in_rest' => true
// ]);

// add_filter('woocommerce_rest_check_permissions', 'my_woocommerce_rest_check_permissions', 90, 4);

// function my_woocommerce_rest_check_permissions($permission, $context, $object_id, $post_type)
// {
//     return true;
// }





function post_grid_page_styles()
{


  global $postGridCssY;
  global $postGridFonts;

  //$url = $_SERVER['REQUEST_URI'];


  $reponsiveCssGroups = [];
  $reponsiveCss = '';

  $pgc_meta = get_post_meta(get_the_ID(), 'pgc_meta', true);



  $pageStyles = [];

  if (!empty($pgc_meta)) {

    foreach ($pgc_meta as $i => $items) {

      $selector = isset($items['options']['selector']) ? $items['options']['selector'] : '';



      foreach ($items as $itemIndex => $blockCss) {



        if ($itemIndex != 'options') {



          $elementSelector = '';

          if ($itemIndex == 'styles') {
            $elementSelector = $selector;
          } else if ($itemIndex == 'hover') {
            $elementSelector = $selector . ':hover';
          } else if ($itemIndex == 'after') {
            $elementSelector = $selector . '::after';
          } else if ($itemIndex == 'before') {
            $elementSelector = $selector . '::before';
          } else if ($itemIndex == 'first-child') {
            $elementSelector = $selector . ':first-child';
          } else if ($itemIndex == 'last-child') {
            $elementSelector = $selector . ':last-child';
          } else if ($itemIndex == 'visited') {
            $elementSelector = $selector . ':visited';
          } else if ($itemIndex == 'selection') {
            $elementSelector = $selector . '::selection';
          } else if ($itemIndex == 'first-letter') {
            $elementSelector = $selector . '::first-letter';
          } else if ($itemIndex == 'first-line') {
            $elementSelector = $selector . '::first-line';
          }




          $pageStyles[$i][$elementSelector] = $blockCss;
        }
      }
    }
  }



  if (is_array($pageStyles))
    foreach ($pageStyles as $index => $blockCss) {

      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {

          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {

              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {

                  if ('font-family' == $att) {
                    $postGridFonts[$device][] = $val;
                  }
                  $cssAttr = cssAttrParse($att);

                  $reponsiveCssGroups[$device][$selector][$cssAttr] = $val;
                }
            }
        }
    }





  if (!empty($reponsiveCssGroups['Desktop'])) {


    foreach ($reponsiveCssGroups['Desktop'] as $selector => $atts) {

      $reponsiveCss .= $selector . '{';

      if (!empty($atts))
        foreach ($atts as $attr => $val) {



          if (!empty($val)) {

            $reponsiveCss .= $attr . ':' . $val . ';';
          }
        }
      $reponsiveCss .= '}';
    }
  }



  if (!empty($reponsiveCssGroups['Tablet'])) {

    $reponsiveCss .= '@media(max-width: 991px){';


    foreach ($reponsiveCssGroups['Tablet'] as $selector => $atts) {

      $reponsiveCss .= $selector . '{';

      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }


    $reponsiveCss .= '}';
  }


  if (!empty($reponsiveCssGroups['Mobile'])) {

    $reponsiveCss .= '@media(max-width:767px){';

    foreach ($reponsiveCssGroups['Mobile'] as $selector => $atts) {

      $reponsiveCss .= $selector . '{';

      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }



    $reponsiveCss .= '}';
  }


  $fonts = '';
  $fontsArr = [];

  if (!empty($postGridFonts)) {
    foreach ($postGridFonts as $device => $itemFont) {
      if (!empty($itemFont)) {
        foreach ($itemFont as $itemFon) {
          $fonts .= $itemFon . ',';

          if (!in_array($itemFon, $fontsArr)) {
            $fontsArr[] = $itemFon . ':wght@100;200;300;400;500;600;700;800;900';
          }
        }
      }
    }
  }



  $fontsArrStr = implode('&family=', $fontsArr);

  $fonts = str_replace(" ", "+", $fontsArrStr);

  ?>




  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts);
  ?>">
  <?php

  ?>


  <sty le>
    <?php echo ($reponsiveCss); ?>
  </sty>

  <?php

  ?>

  <!-- <pre> -->
  <?php
  //echo //var_export($reponsiveCss, true);
  ?>
  <!-- </pre> -->

  <?php



}
add_action('wp_footer', 'post_grid_page_styles', 999);



function cssAttrParse($key)
{



  $cssProp = '';

  if ($key == 'alignContent') {
    $cssProp = 'align-content';
  } else if ($key == 'alignItems') {
    $cssProp = 'align-items';
  } else if ($key == 'alignSelf') {
    $cssProp = 'align-self';
  } else if ($key == 'aspectRatio') {
    $cssProp = 'aspect-ratio';
  } else if ($key == 'backfaceVisibility') {
    $cssProp = 'backface-visibility';
  } else if ($key == 'backgroundAttachment') {
    $cssProp = 'background-attachment';
  } else if ($key == 'backgroundBlendMode') {
    $cssProp = 'background-blend-mode';
  } else if ($key == 'backgroundClip') {
    $cssProp = 'background-clip';
  } else if ($key == 'bgColor') {
    $cssProp = 'background-color';
  } else if ($key == 'backgroundColor') {
    $cssProp = 'background-color';
  } else if ($key == 'backgroundOrigin') {
    $cssProp = 'background-origin';
  } else if ($key == 'backgroundRepeat') {
    $cssProp = 'background-repeat';
  } else if ($key == 'backgroundSize') {
    $cssProp = 'background-size';
  } else if ($key == 'backgroundPosition') {
    $cssProp = 'background-position';
  } else if ($key == 'backgroundImage') {
    $cssProp = 'background-image';
  } else if ($key == 'border') {
    $cssProp = 'border';
  } else if ($key == 'borderTop') {
    $cssProp = 'border-top';
  } else if ($key == 'borderRight') {
    $cssProp = 'border-right';
  } else if ($key == 'borderBottom') {
    $cssProp = 'border-bottom';
  } else if ($key == 'borderLeft') {
    $cssProp = 'border-left';
  } else if ($key == 'borderRadius') {
    $cssProp = 'border-radius';
  } else if ($key == 'borderCollapse') {
    $cssProp = 'border-collapse';
  } else if ($key == 'borderSpacing') {
    $cssProp = 'border-spacing';
  } else if ($key == 'borderImage') {
    $cssProp = 'border-image';
  } else if ($key == 'boxShadow') {
    $cssProp = 'box-shadow';
  } else if ($key == 'backdropFilter') {
    $cssProp = 'backdrop-filter';
  } else if ($key == 'bottom' || $key == 'top' || $key == 'left' || $key == 'right' || $key == 'clear' || $key == 'color' || $key == 'filter' || $key == 'float') {
    $cssProp = $key;
  } else if ($key == 'boxSizing') {
    $cssProp = 'box-sizing';
  } else if ($key == 'cursor') {
    $cssProp = 'cursor';
  } else if ($key == 'content') {
    $cssProp = 'content';
  } else if ($key == 'columnCount') {
    $cssProp = 'column-count';
  } else if ($key == 'columnRule') {
    $cssProp = 'column-rule';
  } else if ($key == 'direction') {
    $cssProp = 'direction';
  } else if ($key == 'fontFamily') {
    $cssProp = 'font-family';
  } else if ($key == 'fontSize') {
    $cssProp = 'font-size';
  } else if ($key == 'fontStyle') {
    $cssProp = 'font-style';
  } else if ($key == 'fontStretch') {
    $cssProp = 'font-stretch';
  } else if ($key == 'fontWeight') {
    $cssProp = 'font-weight';
  } else if ($key == 'fontVariantCaps') {
    $cssProp = 'font-variant-caps';
  } else if ($key == 'flexWrap') {
    $cssProp = 'flex-wrap';
  } else if ($key == 'flexDirection') {
    $cssProp = 'flex-direction';
  } else if ($key == 'flexGrow') {
    $cssProp = 'flex-grow';
  } else if ($key == 'flexShrink') {
    $cssProp = 'flex-shrink';
  } else if ($key == 'flexBasis') {
    $cssProp = 'flex-basis';
  } else if ($key == 'flexFlow') {
    $cssProp = 'flex-flow';
  } else if ($key == 'letterSpacing') {
    $cssProp = 'letter-spacing';
  } else if ($key == 'gridColumnEnd') {
    $cssProp = 'grid-column-end';
  } else if ($key == 'gridColumnStart') {
    $cssProp = 'grid-column-start';
  } else if ($key == 'gridRowEnd') {
    $cssProp = 'grid-row-end';
  } else if ($key == 'gridRowStart') {
    $cssProp = 'grid-row-start';
  } else if ($key == 'gridTemplateColumns') {
    $cssProp = 'grid-template-columns';
  } else if ($key == 'gridTemplateRows') {
    $cssProp = 'grid-template-rows';
  } else if ($key == 'listStyle') {
    $cssProp = 'list-style';
  } else if ($key == 'lineHeight') {
    $cssProp = 'line-height';
  } else if ($key == 'justifyContent') {
    $cssProp = 'justify-content';
  } else if ($key == 'objectFit') {
    $cssProp = 'object-fit';
  } else if ($key == 'opacity') {
    $cssProp = 'opacity';
  } else if ($key == 'outline') {
    $cssProp = 'outline';
  } else if ($key == 'order') {
    $cssProp = 'order';
  } else if ($key == 'outlineOffset') {
    $cssProp = 'outline-offset';
  } else if ($key == 'position') {
    $cssProp = 'position';
  } else if ($key == 'textIndent') {
    $cssProp = 'text-indent';
  } else if ($key == 'textJustify') {
    $cssProp = 'text-justify';
  } else if ($key == 'textTransform') {
    $cssProp = 'text-transform';
  } else if ($key == 'textDecoration') {
    $cssProp = 'text-decoration';
  } else if ($key == 'textOverflow') {
    $cssProp = 'text-overflow';
  } else if ($key == 'textShadow') {
    $cssProp = 'text-shadow';
  } else if ($key == 'textAlign') {
    $cssProp = 'text-align';
  } else if ($key == 'visibility') {
    $cssProp = 'visibility';
  } else if ($key == 'wordBreak') {
    $cssProp = 'word-break';
  } else if ($key == 'wordSpacing') {
    $cssProp = 'word-spacing';
  } else if ($key == 'zIndex') {
    $cssProp = 'z-index';
  } else if ($key == 'padding') {
    $cssProp = 'padding';
  } else if ($key == 'paddingTop') {
    $cssProp = 'padding-top';
  } else if ($key == 'paddingRight') {
    $cssProp = 'padding-right';
  } else if ($key == 'paddingBottom') {
    $cssProp = 'padding-bottom';
  } else if ($key == 'paddingLeft') {
    $cssProp = 'padding-left';
  } else if ($key == 'margin') {
    $cssProp = 'margin';
  } else if ($key == 'marginTop') {
    $cssProp = 'margin-top';
  } else if ($key == 'marginRight') {
    $cssProp = 'margin-right';
  } else if ($key == 'marginBottom') {
    $cssProp = 'margin-bottom';
  } else if ($key == 'marginLeft') {
    $cssProp = 'margin-left';
  } else if ($key == 'display') {
    $cssProp = 'display';
  } else if ($key == 'width') {
    $cssProp = 'width';
  } else if ($key == 'height') {
    $cssProp = 'height';
  } else if ($key == 'verticalAlign') {
    $cssProp = 'vertical-align';
  } else if ($key == 'overflow') {
    $cssProp = 'overflow';
  } else if ($key == 'overflowX') {
    $cssProp = 'overflow-x';
  } else if ($key == 'overflowY') {
    $cssProp = 'overflow-y';
  } else if ($key == 'writingMode') {
    $cssProp = 'writing-mode';
  } else if ($key == 'wordWrap') {
    $cssProp = 'word-wrap';
  } else if ($key == 'perspective') {
    $cssProp = 'perspective';
  } else if ($key == 'minWidth') {
    $cssProp = 'min-width';
  } else if ($key == 'minHeight') {
    $cssProp = 'min-height';
  } else if ($key == 'maxHeight') {
    $cssProp = 'max-height';
  } else if ($key == 'maxWidth') {
    $cssProp = 'max-width';
  } else if ($key == 'transition') {
    $cssProp = 'transition';
  } else if ($key == 'transform') {
    $cssProp = 'transform';
  } else if ($key == 'gap') {
    $cssProp = 'gap';
  } else if ($key == 'rowGap') {
    $cssProp = 'row-gap';
  } else if ($key == 'columnGap') {
    $cssProp = 'column-gap';
  } else {
    $cssProp = $key;
  }
  return $cssProp;
}
