<?php
if (!defined('ABSPATH'))
  exit; // if direct access
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'rsd_link');
// remove_action('template_redirect', 'wp_shortlink_header', 11, 0);
// remove_action('wp_head', 'wp_shortlink_wp_head');
// remove_action('wp_head', 'wp_generator');
// remove_action('wp_head', 'feed_links_extra', 3);
// remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');
// remove_action('wp_head', 'rest_output_link_wp_head');
// remove_action('template_redirect', 'rest_output_link_header', 11, 0);
// remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
// remove_action('wp_footer', 'wc_no_js');
// remove_action('wp_head', 'print_emoji_detection_script', 7);
// remove_action('admin_print_scripts', 'print_emoji_detection_script');
// remove_action('wp_print_styles', 'print_emoji_styles');
// remove_action('admin_print_styles', 'print_emoji_styles');
// remove_filter('the_content_feed', 'wp_staticize_emoji');
// remove_filter('comment_text_rss', 'wp_staticize_emoji');
// remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
// add_filter('tiny_mce_plugins', 'perfmatters_disable_emojis_tinymce');
// add_filter('emoji_svg_url', '__return_false');
// remove_action('template_redirect', 'wp_redirect_admin_locations', 1000);
// remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
// remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
// remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
// remove_action('in_admin_header', 'wp_global_styles_render_svg_filters');
//Remove Gutenberg Block Library CSS from loading on the frontend
function post_grid_remove_wp_block_library_css()
{
  wp_dequeue_style('ct-woocommerce-styles');
  wp_dequeue_style('wp-block-library');
  // wp_dequeue_style('wp-block-library-theme');
  wp_dequeue_style('woocommerce-blocktheme');
  wp_dequeue_style('woocommerce-layout');
  wp_dequeue_style('woocommerce-smallscreen');
  wp_dequeue_style('woocommerce-general');
  wp_deregister_style('wp-block-navigation');
  //wp_deregister_style('dashicons');
  // wp_dequeue_style('dashicons');
  // Remove WooCommerce block CSS
  wp_deregister_style('wc-blocks-style');
  wp_dequeue_style('wc-blocks-style');
  wp_dequeue_style('wc-blocks-style-mini-cart-contents');
  wp_dequeue_style('wc-blocks-packages-style');
  wp_dequeue_style('wc-blocks-style-mini-cart');
}
add_action('wp_enqueue_scripts', 'post_grid_remove_wp_block_library_css', 9999);
register_meta('post', 'pgc_meta', [
  'type' => 'string',
  'single' => true,
  'show_in_rest' => true,
]);
function post_grid_parse_attributes_arr($attrArr)
{
  $linkAttrStr = "";
  if (!empty($attrArr)) {
    foreach ($attrArr as $attr) {
      $attrId = isset($attr["id"]) ? $attr["id"] : '';
      $attrVal = isset($attr["val"]) ? $attr["val"] : '';
      if (!empty($attr["val"])) {
        $linkAttrStr .= esc_attr($attrId) . '="' . esc_attr($attrVal) . '" ';
      }
    };
  }
  return $linkAttrStr;
}
function post_grid_parse_css_class($classStr, $obj)
{
  $matches = array();
  $t = preg_match_all('/{(.*?)\}/s', $classStr, $matches);
  $objType = $obj['type'];
  $objId = $obj['id'];
  if (empty($objType)) {
    // $active_plugins = get_option('active_plugins');
    if (is_front_page() && is_home()) {
    } elseif (is_front_page()) {
    } elseif (is_home()) {
    }
    // else if (in_array('woocommerce/woocommerce.php', (array) $active_plugins) && is_woocommerce() && is_shop()) {
    // } 
    elseif (is_singular()) {
      $objId = 'post';
    } elseif (is_tax()) {
    } else if (is_category()) {
    } else if (is_tag()) {
    } else if (is_author()) {
    } elseif (is_search()) {
    } else if (is_year()) {
    } else if (is_month()) {
    } else if (is_date()) {
    } elseif (is_404()) {
    }
  }
  $classArrIems = isset($matches[0]) ? $matches[0] : [];
  $classArr = isset($matches[1]) ? $matches[1] : [];
  $newArr = [];
  if (!empty($classArr))
    foreach ($classArr as $index => $item) {
      $index = isset($classArrIems[$index]) ? $classArrIems[$index] : $index;
      if (strpos($item, 'currentYear') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentMonth') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentDay') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentTime') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'postPublishDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'postModifiedDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'postTagTitle') !== false) {
        $posttags = get_the_tags();
        if ($posttags != false) {
          $posttags = $posttags[0]->name;
          $newArr[$index] = str_replace('postTagTitle', $posttags, $item);
        }
      } elseif (strpos($item, 'postTagsTitle') !== false) {
        $posttags = get_the_tags();
        // $prams = str_replace(['postTagsTitle[\'', '\']'], '', $item);
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        // $format = wp_kses_stripslashes($matches[1]);
        $prams = explode(',', $matches[1]);
        $count = (int)wp_kses_stripslashes($prams[0]);
        $sep = wp_kses_stripslashes($prams[1]);
        if ($posttags != false) {
          $str = "";
          $i = 1;
          foreach ($posttags as $itemx) {
            $str .= $itemx->name . $sep;
            if ($i >= (int) $count)
              break;
            $i++;
          }
          $newArr[$index] = $str;
        }
      } elseif (strpos($item, 'postCategoryTitle') !== false) {
        $postcats = get_the_category();
        if ($postcats != false) {
          $postcats = $postcats[0]->name;
          $newArr[$index] = str_replace('postCategoryTitle', $postcats, $item);
        }
      } elseif (strpos($item, 'postCategoriesTitle') !== false) {
        $postcats = get_the_category();
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        // $prams = str_replace(['postCategoriesTitle[\'', '\']'], '', $item);
        $prams = explode(',', $matches[1]);
        $count = wp_kses_stripslashes($prams[0]);
        $sep = wp_kses_stripslashes($prams[1]);
        if ($postcats != false) {
          $str = '';
          $i = 1;
          foreach ($postcats as $itemx) {
            $str .= $itemx->name . $sep;
            if ($i >= (int) $count)
              break;
            $i++;
          }
          $newArr[$index] = $str;
        }
      } elseif (strpos($item, 'postTermTitle') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $taxonomy = wp_kses_stripslashes($format);
        $postterms = get_the_terms($objId, $taxonomy);
        $newArr[$index] = $postterms[0]->name;
      } elseif (strpos($item, 'postTermsTitle') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $prams = explode(',', $matches[1]);
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
      } elseif (strpos($item, 'postSlug') !== false) {
        $postslug = get_post_field('post_name', get_post());
        $newArr[$index] = str_replace('postSlug', $postslug, $item);
      } elseif (strpos($item, 'postID') !== false) {
        $newArr[$index] = str_replace('postID', $objId, $item);
      } elseif (strpos($item, 'postStatus') !== false) {
        $poststatus = get_post_status();
        $newArr[$index] = str_replace('postStatus', $poststatus, $item);
      } elseif (strpos($item, 'authorId') !== false) {
        $postauthor = get_the_author_meta($field = 'ID');
        $newArr[$index] = str_replace('authorId', $postauthor, $item);
      } elseif (strpos($item, 'authorName') !== false) {
        $postauthor = get_the_author_meta($field = 'display_name');
        $newArr[$index] = str_replace('authorName', $postauthor, $item);
      } elseif (strpos($item, 'authorFirstName') !== false) {
        $postauthor = get_the_author_meta($field = 'first_name');
        $newArr[$index] = str_replace('authorFirstName', $postauthor, $item);
      } elseif (strpos($item, 'authorLastName') !== false) {
        $postauthor = get_the_author_meta($field = 'last_name');
        $newArr[$index] = str_replace('authorLastName', $postauthor, $item);
      } elseif (strpos($item, 'authorDescription') !== false) {
        $postauthor = get_the_author_meta($field = 'description');
        $newArr[$index] = str_replace('authorDescription', $postauthor, $item);
      } elseif (strpos($item, 'excerpt') !== false) {
        $excerpt = get_the_excerpt();
        $newArr[$index] = str_replace('expert', $excerpt, $item);
      } elseif (strpos($item, 'termId') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termId', $queried_object->term_id, $item);
      } elseif (strpos($item, 'termTitle') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termTitle', $queried_object->name, $item);
      } elseif (strpos($item, 'termDescription') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termDescription', $queried_object->description, $item);
      } elseif (strpos($item, 'termPostCount') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termPostCount', $queried_object->count, $item);
      } elseif (strpos($item, 'rankmathTitle') !== false) {
        $metaValue = get_post_meta($objId, 'rank_math_title', true);
        $newArr[$index] = str_replace('rankmathTitle', $metaValue, $item);
      } elseif (strpos($item, 'rankmathDescription') !== false) {
        $metaValue = get_post_meta($objId, 'rank_math_description', true);
        $newArr[$index] = str_replace('rankmathDescription', $metaValue, $item);
      } elseif (strpos($item, 'rankmathFocusKeyword') !== false) {
        $metaValue = get_post_meta($objId, 'rank_math_focus_keyword', true);
        $newArr[$index] = str_replace('rankmathFocusKeyword', $metaValue, $item);
      }
      // if (strpos($item, 'rankmathFocusKeywords') !== false) {
      //   $newArr[$index] = date('h:i:sa');
      // }
      elseif (strpos($item, 'rankmathOrgname') !== false) {
        $data = get_option('rank-math-options-titles');
        $orgname = $data['knowledgegraph_name'];
        $newArr[$index] = str_replace('rankmathOrgname', $orgname, $item);
      } elseif (strpos($item, 'rankmathOrgurl') !== false) {
        $data = get_option('rank-math-options-titles');
        $url = $data['url'];
        $newArr[$index] = str_replace('rankmathOrgurl', $url, $item);
      } elseif (strpos($item, 'rankmathOrglogo') !== false) {
        $data = get_option('rank-math-options-titles');
        $logo = $data['knowledgegraph_logo'];
        $newArr[$index] = str_replace('rankmathOrglogo', $logo, $item);
      } elseif (strpos($item, 'siteTitle') !== false) {
        $siteinfo = get_bloginfo();
        $newArr[$index] = str_replace('siteTitle', $siteinfo, $item);
      } elseif (strpos($item, 'siteDescription') !== false) {
        $siteinfo = get_bloginfo('description');
        $newArr[$index] = str_replace('siteDescription', $siteinfo, $item);
      } elseif (strpos($item, 'postMeta') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $key = wp_kses_stripslashes($matches[1]);
        $postmeta = get_post_meta($objId, $key);
        $newArr[$index] = isset($postmeta[0]) ? $postmeta[0] : '';
      } elseif (strpos($item, 'separator') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'searchTerms') !== false) {
        $current_query = sanitize_text_field(get_query_var('s'));
        $newArr[$index] = str_replace('searchTerms', $current_query, $item);
      }
      // elseif (strpos($item, 'counter') !== false) {
      //   $newArr[$index] = date('h:i:sa');
      // } 
      else {
        $newArr[$index] = $item;
      }
    }
  $str = strtr($classStr, $newArr);
  return $str;
}
function post_grid_parse_css_classX($classStr, $obj)
{
  $objType = $obj['type'];
  $objId = $obj['id'];
  if (empty($objType)) {
    // $active_plugins = get_option('active_plugins');
    if (is_front_page() && is_home()) {
    } elseif (is_front_page()) {
    } elseif (is_home()) {
    }
    // else if (in_array('woocommerce/woocommerce.php', (array) $active_plugins) && is_woocommerce() && is_shop()) {
    // } 
    elseif (is_singular()) {
      $objId = 'post';
    } elseif (is_tax()) {
    } else if (is_category()) {
    } else if (is_tag()) {
    } else if (is_author()) {
    } elseif (is_search()) {
    } else if (is_year()) {
    } else if (is_month()) {
    } else if (is_date()) {
    } elseif (is_404()) {
    }
  }
  $classArr = explode(' ', $classStr);
  $newArr = [];
  foreach ($classArr as $index => $item) {
    if (strpos($item, 'currentYear') !== false) {
      $matches = array();
      $t = preg_match('/{(.*?)\}/s', $item, $matches);
      $id = isset($matches[1]) ? $matches[1] : "";
      $prams = str_replace(['currentYear[\'', '\']'], '', $id);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      //$newArr[$index] = date($format);
      $newArr[$index] = str_replace("{" . $id . "}", date($format), $item);
    } elseif (strpos($item, 'currentMonth') !== false) {
      $params = str_replace(['currentMonth[\'', '\']'], '', $item);
      $params = explode(',', $params);
      $format = wp_kses_stripslashes($params[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'currentDay') !== false) {
      $params = str_replace(['currentDay[\'', '\']'], '', $item);
      $params = explode(',', $params);
      $format = wp_kses_stripslashes($params[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'currentDate') !== false) {
      $prams = str_replace(['currentDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'currentTime') !== false) {
      $prams = str_replace(['currentTime[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'postPublishDate') !== false) {
      $prams = str_replace(['postPublishDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = get_the_date($format, $objId);
    } elseif (strpos($item, 'postModifiedDate') !== false) {
      $prams = str_replace(['postModifiedDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = get_the_modified_date($format, $objId);
    } elseif (strpos($item, 'postTagTitle') !== false) {
      $posttags = get_the_tags();
      if ($posttags != false) {
        $posttags = $posttags[0]->name;
        $newArr[$index] = str_replace('postTagTitle', $posttags, $item);
      }
    } elseif (strpos($item, 'postTagsTitle') !== false) {
      $posttags = get_the_tags();
      $prams = str_replace(['postTagsTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $count = wp_kses_stripslashes($prams[0]);
      $sep = wp_kses_stripslashes($prams[1]);
      if ($posttags != false) {
        $str = "";
        $i = 1;
        foreach ($posttags as $itemx) {
          $str .= $itemx->name . $sep;
          if ($i >= (int) $count)
            break;
          $i++;
        }
        $newArr[$index] = $str;
      }
    } elseif (strpos($item, 'postCategoryTitle') !== false) {
      $postcats = get_the_category();
      if ($postcats != false) {
        $postcats = $postcats[0]->name;
        $newArr[$index] = str_replace('postCategoryTitle', $postcats, $item);
      }
    } elseif (strpos($item, 'postCategoriesTitle') !== false) {
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
    } elseif (strpos($item, 'postTermTitle') !== false) {
      $prams = str_replace(['postTermTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $taxonomy = wp_kses_stripslashes($prams[0]);
      $postterms = get_the_terms($objId, $taxonomy);
      $newArr[$index] = $postterms[0]->name;
    } elseif (strpos($item, 'postTermsTitle') !== false) {
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
    } elseif (strpos($item, 'postSlug') !== false) {
      $postslug = get_post_field('post_name', get_post());
      $newArr[$index] = str_replace('postSlug', $postslug, $item);
    } elseif (strpos($item, 'postID') !== false) {
      $newArr[$index] = str_replace('postID', $objId, $item);
    } elseif (strpos($item, 'postStatus') !== false) {
      $poststatus = get_post_status();
      $newArr[$index] = str_replace('postStatus', $poststatus, $item);
    } elseif (strpos($item, 'authorId') !== false) {
      $postauthor = get_the_author_meta($field = 'ID');
      $newArr[$index] = str_replace('authorId', $postauthor, $item);
    } elseif (strpos($item, 'authorName') !== false) {
      $postauthor = get_the_author_meta($field = 'display_name');
      $newArr[$index] = str_replace('authorName', $postauthor, $item);
    } elseif (strpos($item, 'authorFirstName') !== false) {
      $postauthor = get_the_author_meta($field = 'first_name');
      $newArr[$index] = str_replace('authorFirstName', $postauthor, $item);
    } elseif (strpos($item, 'authorLastName') !== false) {
      $postauthor = get_the_author_meta($field = 'last_name');
      $newArr[$index] = str_replace('authorLastName', $postauthor, $item);
    } elseif (strpos($item, 'authorDescription') !== false) {
      $postauthor = get_the_author_meta($field = 'description');
      $newArr[$index] = str_replace('authorDescription', $postauthor, $item);
    } elseif (strpos($item, 'excerpt') !== false) {
      $excerpt = get_the_excerpt();
      $newArr[$index] = str_replace('expert', $excerpt, $item);
    } elseif (strpos($item, 'termId') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termId', $queried_object->term_id, $item);
    } elseif (strpos($item, 'termTitle') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termTitle', $queried_object->name, $item);
    } elseif (strpos($item, 'termDescription') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termDescription', $queried_object->description, $item);
    } elseif (strpos($item, 'termPostCount') !== false) {
      $queried_object = get_queried_object();
      $newArr[$index] = str_replace('termPostCount', $queried_object->count, $item);
    } elseif (strpos($item, 'rankmathTitle') !== false) {
      $metaValue = get_post_meta($objId, 'rank_math_title', true);
      $newArr[$index] = str_replace('rankmathTitle', $metaValue, $item);
    } elseif (strpos($item, 'rankmathDescription') !== false) {
      $metaValue = get_post_meta($objId, 'rank_math_description', true);
      $newArr[$index] = str_replace('rankmathDescription', $metaValue, $item);
    } elseif (strpos($item, 'rankmathFocusKeyword') !== false) {
      $metaValue = get_post_meta($objId, 'rank_math_focus_keyword', true);
      $newArr[$index] = str_replace('rankmathFocusKeyword', $metaValue, $item);
    }
    // if (strpos($item, 'rankmathFocusKeywords') !== false) {
    //   $newArr[$index] = date('h:i:sa');
    // }
    elseif (strpos($item, 'rankmathOrgname') !== false) {
      $data = get_option('rank-math-options-titles');
      $orgname = $data['knowledgegraph_name'];
      $newArr[$index] = str_replace('rankmathOrgname', $orgname, $item);
    } elseif (strpos($item, 'rankmathOrgurl') !== false) {
      $data = get_option('rank-math-options-titles');
      $url = $data['url'];
      $newArr[$index] = str_replace('rankmathOrgurl', $url, $item);
    } elseif (strpos($item, 'rankmathOrglogo') !== false) {
      $data = get_option('rank-math-options-titles');
      $logo = $data['knowledgegraph_logo'];
      $newArr[$index] = str_replace('rankmathOrglogo', $logo, $item);
    } elseif (strpos($item, 'siteTitle') !== false) {
      $siteinfo = get_bloginfo();
      $newArr[$index] = str_replace('siteTitle', $siteinfo, $item);
    } elseif (strpos($item, 'siteDescription') !== false) {
      $siteinfo = get_bloginfo('description');
      $newArr[$index] = str_replace('siteDescription', $siteinfo, $item);
    } elseif (strpos($item, 'postMeta') !== false) {
      $prams = str_replace(['postMeta[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $key = wp_kses_stripslashes($prams[0]);
      $postmeta = get_post_meta($objId, $key);
      $newArr[$index] = isset($postmeta[0]) ? $postmeta[0] : '';
    } elseif (strpos($item, 'separator') !== false) {
      $prams = str_replace(['separator[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $separator = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = $separator;
    } elseif (strpos($item, 'searchTerms') !== false) {
      $current_query = sanitize_text_field(get_query_var('s'));
      $newArr[$index] = str_replace('searchTerms', $current_query, $item);
    }
    // elseif (strpos($item, 'counter') !== false) {
    //   $newArr[$index] = date('h:i:sa');
    // } 
    else {
      $newArr[$index] = $item;
    }
  }
  return join(' ', $newArr);
}
function post_grid_parse_query_prams($queryArgs)
{
  $query_args = [];
  foreach ($queryArgs as $item) {
    $id = isset($item['id']) ? $item['id'] : '';
    $val = isset($item['val']) ? $item['val'] : '';
    if (isset($item['val'])) {
      if ($id == 'postType') {
        $query_args['post_type'] = $val;
      } elseif ($id == 'postStatus') {
        $query_args['post_status'] = $val;
      } elseif ($id == 'order') {
        $query_args['order'] = $val;
      } elseif ($id == 'orderby') {
        $query_args['orderby'] = implode(' ', $val);
      } elseif ($id == 'metaKey') {
        $query_args['meta_key'] = $val;
      } elseif ($id == 'dateQuery') {
        $date_query = [];
        foreach ($val as $arg) {
          $id = isset($arg['id']) ? $arg['id'] : '';
          $value = isset($arg['value']) ? $arg['value'] : '';
          if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
            $compare = isset($arg['compare']) ? $arg['compare'] : '';
            if (!empty($value))
              $date_query[] = [$id => $value, 'compare' => $compare,];
          }
          if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {
            if (!empty($value))
              $date_query[$id] = $value;
          }
          if ($id == 'after' || $id == 'before') {
            $year = isset($arg['year']) ? $arg['year'] : '';
            $month = isset($arg['month']) ? $arg['month'] : '';
            $day = isset($arg['day']) ? $arg['day'] : '';
            if (!empty($year))
              $date_query[$id]['year'] = $year;
            if (!empty($month))
              $date_query[$id]['month'] = $month;
            if (!empty($day))
              $date_query[$id]['day'] = $day;
          }
        }
        $query_args['date_query'] = $date_query;
      } elseif ($id == 'year') {
        $query_args['year'] = $val;
      } elseif ($id == 'monthnum') {
        $query_args['monthnum'] = $val;
      } elseif ($id == 'w') {
        $query_args['w'] = $val;
      } elseif ($id == 'day') {
        $query_args['day'] = $val;
      } elseif ($id == 'hour') {
        $query_args['hour'] = $val;
      } elseif ($id == 'minute') {
        $query_args['minute'] = $val;
      } elseif ($id == 'second') {
        $query_args['second'] = $val;
      } elseif ($id == 'm') {
        $query_args['m'] = $val;
      } elseif ($id == 'author') {
        $query_args['author'] = $val;
      } elseif ($id == 'authorName') {
        $query_args['author_name'] = $val;
      } elseif ($id == 'authorIn') {
        $query_args['author_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'authorNotIn') {
        $query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'cat') {
        $query_args['cat'] = $val;
      } elseif ($id == 'categoryName') {
        $query_args['category_name'] = $val;
      } elseif ($id == 'categoryAnd') {
        $query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'categoryIn') {
        $query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'categoryNotIn') {
        $query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tag') {
        $query_args['tag'] = $val;
      } elseif ($id == 'tagId') {
        $query_args['tag_id'] = $val;
      } elseif ($id == 'tagAnd') {
        $query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagIn') {
        $query_args['tag__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagNotIn') {
        $query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagSlugAnd') {
        $query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagSlugIn') {
        $query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'taxQuery') {
        $query_args['tax_query'] = isset($val[0]) ? $val[0] : $val;
      } elseif ($id == 'p') {
        $query_args['p'] = $val;
      } elseif ($id == 's') {
        $query_args['s'] = $val;
      } elseif ($id == 'name') {
        $query_args['name'] = $val;
      } elseif ($id == 'pageId') {
        $query_args['page_id'] = $val;
      } elseif ($id == 'pagename') {
        $query_args['pagename'] = $val;
      } elseif ($id == 'postParent') {
        $query_args['post_parent'] = $val;
      } elseif ($id == 'postParentIn') {
        $query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postParentNotIn') {
        $query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postIn') {
        $query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postNotIn') {
        $query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postNameIn') {
        $query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'hasPassword') {
        $query_args['has_password'] = $val;
      } elseif ($id == 'postPassword') {
        $query_args['post_password'] = $val;
      } elseif ($id == 'commentCount') {
        $query_args['comment_count'] = $val;
      } elseif ($id == 'nopaging') {
        $query_args['nopaging'] = $val;
      } elseif ($id == 'postsPerPage') {
        $query_args['posts_per_page'] = $val;
      } elseif ($id == 'paged') {
        $query_args['paged'] = $val;
      } elseif ($id == 'offset') {
        $query_args['offset'] = $val;
      } elseif ($id == 'postsPerArchivePage') {
        $query_args['posts_per_archive_page'] = $val;
      } elseif ($id == 'ignoreStickyPosts') {
        $query_args['ignore_sticky_posts'] = $val;
      } elseif ($id == 'metaKey') {
        $query_args['meta_key'] = $val;
      } elseif ($id == 'metaValue') {
        $query_args['meta_value'] = $val;
      } elseif ($id == 'metaValueNum') {
        $query_args['meta_value_num'] = $val;
      } elseif ($id == 'metaCompare') {
        $query_args['meta_compare'] = $val;
      } elseif ($id == 'metaQuery') {
        $query_args['meta_query'] = $val;
      } elseif ($id == 'perm') {
        $query_args['perm'] = $val;
      } elseif ($id == 'postMimeType') {
        $query_args['post_mime_type'] = $val;
      } elseif ($id == 'cacheResults') {
        $query_args['cache_results'] = $val;
      } elseif ($id == 'updatePostMetaCache') {
        $query_args['update_post_meta_cache '] = $val;
      } elseif ($id == 'updatePostTermCache') {
        $query_args['update_post_term_cache'] = $val;
      }
    }
  }
  if (get_query_var('paged')) {
    $paged = get_query_var('paged');
  } elseif (get_query_var('page')) {
    $paged = get_query_var('page');
  } else {
    $paged = 1;
  }
  if (!empty($paged))
    $query_args['paged'] = $paged;
  return $query_args;
}
function post_grid_parse_query_terms($queryArgs)
{
  $query_args = [];
  foreach ($queryArgs as $item) {
    $id = isset($item['id']) ? $item['id'] : '';
    $val = isset($item['val']) ? $item['val'] : '';
    if ($id == 'taxonomy') {
      $query_args['taxonomy'] = $val;
    } elseif ($id == 'orderby') {
      $query_args['orderby'] = $val;
    } elseif ($id == 'order') {
      $query_args['order'] = $val;
    } elseif ($id == 'hide_empty') {
      $query_args['hide_empty'] = $val;
    } elseif ($id == 'include') {
      $query_args['include'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'exclude') {
      $query_args['exclude'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'exclude_tree') {
      $query_args['exclude_tree'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'number') {
      $query_args['number'] = (int)$val;
    } elseif ($id == 'count') {
      $query_args['count'] = $val;
    } elseif ($id == 'offset') {
      $query_args['offset'] = $val;
    } elseif ($id == 'name') {
      $query_args['name'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'slug') {
      $query_args['slug'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'hierarchical') {
      $query_args['hierarchical'] = $val;
    } elseif ($id == 'search') {
      $query_args['search'] = $val;
    } elseif ($id == 'name__like') {
      $query_args['name__like'] = $val;
    } elseif ($id == 'description__like') {
      $query_args['description__like'] = $val;
    } elseif ($id == 'pad_counts') {
      $query_args['pad_counts'] = $val;
    } elseif ($id == 'get') {
      $query_args['get'] = $val;
    } elseif ($id == 'parent') {
      $query_args['parent'] = $val;
    } elseif ($id == 'childless') {
      $query_args['childless'] = $val;
    } elseif ($id == 'child_of') {
      $query_args['child_of'] = $val;
    } elseif ($id == 'cache_domain') {
      $query_args['cache_domain'] = $val;
    } elseif ($id == 'update_term_meta_cache') {
      $query_args['update_term_meta_cache'] = $val;
    } elseif ($id == 'meta_key') {
      $query_args['meta_key'] = $val;
    } elseif ($id == 'meta_value') {
      $query_args['meta_value'] = $val;
    }
  }
  // if (get_query_var('paged')) {
  //   $paged = get_query_var('paged');
  // } elseif (get_query_var('page')) {
  //   $paged = get_query_var('page');
  // } else {
  //   $paged = 1;
  // }
  // if (!empty($paged))
  //   $query_args['paged'] = $paged;
  return $query_args;
}
function post_grid_global_vars()
{
  global $postGridScriptData;
  $postGridScriptData['siteUrl'] = get_bloginfo('url');
  wp_register_script('post-grid-global-vars', '', array(), '', true);
  wp_enqueue_script('post-grid-global-vars');
  wp_add_inline_script('post-grid-global-vars', 'var post_grid_vars =' . wp_json_encode($postGridScriptData));
}
//add_action('wp_footer', 'post_grid_global_vars', 999);



add_action('wp_enqueue_scripts', 'post_grid_global_vars');
function post_grid_preloads()
{

  $post_grid_block_editor = get_option("post_grid_block_editor");
  $preloads = isset($post_grid_block_editor['preloads']) ? $post_grid_block_editor['preloads'] : [];

  // var_dump($preloads);

  if (!empty($preloads)) {
    foreach ($preloads as $preload) {

      $href = isset($preload['href']) ? $preload['href'] : '';
      $as = isset($preload['as']) ? $preload['as'] : '';
      $type = isset($preload['type']) ? $preload['type'] : '';
      $crossorigin = isset($preload['crossorigin']) ? $preload['crossorigin'] : false;
      $media = isset($preload['media']) ? $preload['media'] : '';


?>
      <link rel="preload" as="<?php echo esc_attr($as); ?>" href="<?php echo esc_url($href); ?>" <?php if ($crossorigin): ?> crossorigin <?php endif; ?> <?php if ($media): ?> as="<?php echo esc_attr($media); ?>" <?php endif; ?> <?php if ($type): ?> type="<?php echo esc_attr($type); ?>" <?php endif; ?>>
  <?php
    }
  }
  ?>
<?php
}
add_action('wp_head', 'post_grid_preloads', 5);
add_filter('block_categories_all', 'post_grid_block_categories', 10, 2);
/**
 * Register custom category for blocks
 */
function post_grid_block_categories($categories, $context)
{
  if (!empty($categories)) {
    $inserted = array(
      array(
        'slug' => 'post-grid-post',
        'title' => __('Combo Blocks - Post Element', 'post-grid'),
      ),
      array(
        'slug' => 'post-grid-tools',
        'title' => __('Combo Blocks - Tools', 'post-grid'),
      ),
      array(
        'slug' => 'post-grid-woo',
        'title' => __('Combo Blocks - WooCommerce', 'post-grid'),
      ),
      array(
        'slug' => 'post-grid-archive',
        'title' => __('Combo Blocks - Archive', 'post-grid'),
      ),
    );
    array_splice($categories, 3, 0, $inserted); // splice in at position 3
    return $categories;
    // return array_merge(
    //     $categories,
    //     array(
    //         array(
    //             'slug'  => 'post-grid',
    //             'title' => __('Post Grid Combo', 'post-grid'),
    //         ),
    //         // array(
    //         //     'slug'  => 'post-grid-woo',
    //         //     'title' => __('Post Grid Combo - WooCommerce', 'post-grid'),
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
//add_action('wp_footer', 'post_grid_page_styles', 80);
add_action('wp_enqueue_scripts', 'post_grid_page_styles');
function post_grid_page_styles()
{
  global $postGridFonts;
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
                  if ('fontFamily' == $att) {
                    $postGridFonts[$val] = $val;
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
?>
  <?php if (!empty($reponsiveCss)):
    wp_enqueue_style(
      'post-grid-page-styles',
      post_grid_plugin_url . 'assets/block-css/page-styles.css'
    );
    wp_add_inline_style('post-grid-page-styles', $reponsiveCss);
  endif;
}
add_action('wp_footer', 'post_grid_global_json_ld', 80);
function post_grid_global_json_ld()
{
  global $postGridLdJson;
  if (!empty($postGridLdJson)) {
    foreach ($postGridLdJson as $json) {
      if (!empty($json)):
  ?>
        <script type="application/ld+json">
          <?php echo wp_unslash(json_encode($json)); ?>
        </script>
  <?php
      endif;
    }
  }
}
//add_action('wp_footer', 'post_grid_global_styles', 80);
add_action('wp_enqueue_scripts', 'post_grid_global_styles');
function post_grid_global_styles()
{
  global $postGridFonts;
  $reponsiveCssGroups = [];
  $reponsiveCss = '';
  $post_grid_block_editor = get_option("post_grid_block_editor");
  $pgc_meta = isset($post_grid_block_editor['globalStyles']) ? $post_grid_block_editor['globalStyles'] : [];
  $globalStyles = [];
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
          $globalStyles[$i][$elementSelector] = $blockCss;
        }
      }
    }
  }
  if (is_array($globalStyles))
    foreach ($globalStyles as $index => $blockCss) {
      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {
          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {
              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {
                  if ('fontFamily' == $att) {
                    $postGridFonts[$val] = $val;
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
  ?>
  <?php if (!empty($reponsiveCss)):
    wp_enqueue_style(
      'post-grid-global-styles',
      post_grid_plugin_url . 'assets/block-css/global-styles.css'
    );
    wp_add_inline_style('post-grid-global-styles', $reponsiveCss);
  endif;
}
function post_grid_blocks_styles()
{
  $post_id = get_the_ID();
  $combo_blocks_css_file_id = get_post_meta($post_id, 'combo_blocks_css_file_id', true);
  //if (!empty($combo_blocks_css_file_id)) return;
  global $postGridCssY;
  global $postGridFonts;
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
                  if ('font-family' == $att && !empty($val)) {
                    $postGridFonts[$val] = $val;
                  }
                  // $reponsiveCssGroups[$device][$selector][$att] = $val;
                  if (is_string($val)) {
                    $reponsiveCssGroups[$device][$selector][$att] = str_replace("u0022", '"', $val);
                  }
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
  //error_log($reponsiveCss);
  wp_enqueue_style(
    'post-grid-blocks-styles',
    post_grid_plugin_url . 'assets/block-css/blocks-styles.css'
  );
  if (!empty($reponsiveCss)):
    wp_add_inline_style('post-grid-blocks-styles', $reponsiveCss);
  endif;
}
add_action('get_footer', 'post_grid_blocks_styles', 99);
add_action('elementor/editor/init', 'post_grid_blocks_styles');
function post_grid_blocks_styles_fonts()
{
  global $postGridCssY;
  global $postGridFonts;
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
                  if ('font-family' == $att && !empty($val)) {
                    $postGridFonts[$val] = $val;
                  }
                  // $reponsiveCssGroups[$device][$selector][$att] = $val;
                  if (is_string($val)) {
                    $reponsiveCssGroups[$device][$selector][$att] = str_replace("u0022", '"', $val);
                  }
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
  $fonts = '';
  $fontsArr = [];
  if (!empty($postGridFonts)) {
    //foreach ($postGridFonts as $device => $itemFont) {
    //if (!empty($postGridFonts)) {
    foreach ($postGridFonts as $itemFon) {
      $fonts .= $itemFon . ',';
      if (!in_array($itemFon, $fontsArr)) {
        $fontsArr[] = $itemFon . ':wght@100;200;300;400;500;600;700;800;900';
      }
    }
    // }
    //}
  }
  $fontsArrStr = implode('&family=', $fontsArr);
  // $fonts = substr($fonts, 0, -1);
  //$fonts = str_replace(",", "|", $fonts);
  $fonts = str_replace(" ", "+", $fontsArrStr);
  if (!empty($fonts)) {
  ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>&display=swap" />
  <?php
  }
}
add_action('wp_footer', 'post_grid_blocks_styles_fonts', 99);
add_action('elementor/editor/init', 'post_grid_blocks_styles_fonts');
function post_grid_custom_fonts()
{
  $post_grid_block_editor = get_option('post_grid_block_editor');
  $customFonts = isset($post_grid_block_editor['customFonts']) ? $post_grid_block_editor['customFonts'] : [];
  $faceStr = '';
  foreach ($customFonts as $face) {
    $src = $fontFamily = isset($face['family']) ? $face['family'] : '';
    $src = isset($face['src'][0]['url']) ? $face['src'][0]['url'] : '';
    $fontWeight = isset($face['weight']) ? $face['weight'] : '';
    $faceStr .= "@font-face {
    font-family: '$fontFamily';
    src: url('$src');
    font-weight: $fontWeight;
  }";
  }
  wp_enqueue_style(
    'post-grid-custom-fonts',
    post_grid_plugin_url . 'assets/block-css/custom-fonts.css'
  );
  wp_add_inline_style('post-grid-custom-fonts', $faceStr);
}
//add_action('wp_footer', 'post_grid_custom_fonts', 999);
add_action('wp_enqueue_scripts', 'post_grid_custom_fonts');
function post_grid_google_fonts()
{
  $post_grid_block_editor = get_option('post_grid_block_editor');
  $googleFonts = isset($post_grid_block_editor['googleFonts']) ? $post_grid_block_editor['googleFonts'] : [];
  //var_dump($googleFonts);
  $fonts = '';
  $fontsArr = [];
  if (!empty($googleFonts)) {
    foreach ($googleFonts as $itemFon) {
      $val = isset($itemFon['value']) ? $itemFon['value'] : '';
      $fonts .= $val . ',';
      if (!in_array($val, $fontsArr)) {
        $fontsArr[] = $val . ':wght@100;200;300;400;500;600;700;800;900';
      }
    }
  }
  $fontsArrStr = implode('&family=', $fontsArr);
  // $fonts = substr($fonts, 0, -1);
  //$fonts = str_replace(",", "|", $fonts);
  $fonts = str_replace(" ", "+", $fontsArrStr);
  if (!empty($fonts)) {
  ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>&display=swap" />
<?php
  }
}
add_action('wp_footer', 'post_grid_google_fonts', 999);
add_action('elementor/editor/init', 'post_grid_google_fonts');
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
  } else if ($key == 'counterIncrement') {
    $cssProp = 'counter-increment';
  } else if ($key == 'counterReset') {
    $cssProp = 'counter-reset';
  } else if ($key == 'counterSet') {
    $cssProp = 'counter-set';
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
  } else if ($key == 'transformOrigin') {
    $cssProp = 'transform-origin';
  } else if ($key == 'transformStyle') {
    $cssProp = 'transform-style';
  } else if ($key == 'gap') {
    $cssProp = 'gap';
  } else if ($key == 'rowGap') {
    $cssProp = 'row-gap';
  } else if ($key == 'columnGap') {
    $cssProp = 'column-gap';
  } else if ($key == '-webkit-text-fill-color') {
    $cssProp = '-webkit-text-fill-color';
  } else {
    $cssProp = $key;
  }
  return $cssProp;
}
add_filter("pgb_post_query_prams", "pgb_post_query_prams", 99, 2);
function pgb_post_query_prams($query_args, $prams)
{
  if ($_GET) {
    $keyword = isset($_GET["keyword"]) ? sanitize_text_field($_GET["keyword"]) : "";
    $orderby = isset($_GET["orderby"]) ? sanitize_text_field($_GET["orderby"]) : "";
    $order = isset($_GET["order"]) ? sanitize_text_field($_GET["order"]) : "";
    $post_status = isset($_GET["post_status"]) ? sanitize_text_field($_GET["post_status"]) : [];
    $posts_per_page = isset($_GET["posts_per_page"]) ? sanitize_text_field($_GET["posts_per_page"]) : "";
    if (!empty($keyword)) {
      $query_args["s"] = $keyword;
    }
    if (!empty($posts_per_page)) {
      $query_args["posts_per_page"] = (int) $posts_per_page;
    }
    if (!empty($orderby)) {
      $query_args["orderby"] = $orderby;
    }
    if (!empty($order)) {
      $query_args["order"] = $order;
    }
    if (!empty($post_status)) {
      $query_args["post_status"] = $post_status;
    }
  }
  return $query_args;
}
function post_grid_upload_file($data)
{
  $upload_dir       = wp_upload_dir();
  //HANDLE UPLOADED FILE
  if (!function_exists('wp_handle_sideload')) {
    require_once(ABSPATH . 'wp-admin/includes/file.php');
  }
  // Without that I'm getting a debug error!?
  if (!function_exists('wp_get_current_user')) {
    require_once(ABSPATH . 'wp-includes/pluggable.php');
  }
  if (empty($data['tmp_name'])) return;
  // @new
  $file             = array();
  $file['error']    = isset($data['error']) ? $data['error'] : '';
  $file['tmp_name'] = isset($data['tmp_name']) ? $data['tmp_name'] : "";
  $file['name']     = isset($data['name']) ? $data['name'] : '';
  $file['type']     = isset($data['type']) ? $data['type'] : '';
  $file['size']     = isset($data['tmp_name']) ? filesize($data['tmp_name']) : 0;
  // upload file to server
  // @new use $file instead of $image_upload
  $file_return      = wp_handle_sideload($file, array('test_form' => false));
  $filename = $file_return['file'];
  $attachment = array(
    'post_mime_type' => $file_return['type'],
    'post_title' => preg_replace('/\.[^.]+$/', '', basename($filename)),
    'post_content' => '',
    'post_status' => 'inherit',
    'guid' => esc_url($upload_dir['url']) . '/' . basename($filename)
  );
  $attach_id = wp_insert_attachment($attachment, $filename, 289);
  require_once(ABSPATH . 'wp-admin/includes/image.php');
  $attach_data = wp_generate_attachment_metadata($attach_id, $filename);
  wp_update_attachment_metadata($attach_id, $attach_data);
  $attach_url = wp_get_attachment_url($attach_id);
  $jsonReturn = array(
    'id'  =>  $attach_id,
    'url'  =>  $attach_url,
  );
  return $jsonReturn;
}
function post_grid_upload_file_x($data)
{
  if (!function_exists('wp_handle_upload')) {
    require_once(ABSPATH . 'wp-admin/includes/file.php');
  }
  $upload_overrides = array('test_form' => false);
  // $files = $_FILES['my_files'];
  $uploadedfile = array(
    'name'     => $data['name'],
    'type'     => $data['type'],
    'tmp_name' => $data['tmp_name'],
    'error'    => $data['error'],
    'size'     => $data['size']
  );
  $movefile = wp_handle_upload($uploadedfile, $upload_overrides);
}
function post_grid_generate_input_prams($inputargsSrc)
{
  $argsSrc = isset($inputargsSrc['src']) ? $inputargsSrc['src'] : "";
  $srcPrams = isset($inputargsSrc['srcPrams']) ? $inputargsSrc['srcPrams'] : "";
  $argsSrcTaxonomy = isset($srcPrams['taxonomy']) ? $srcPrams['taxonomy'] : "";
  $argsSrcField = isset($srcPrams['field']) ? $srcPrams['field'] : "";
  $argsSrcPostType = isset($srcPrams['postType']) ? $srcPrams['postType'] : "";
  $argsSrcUserRole = isset($srcPrams['role']) ? $srcPrams['role'] : "";
  $inputArgs = [];
  if ($argsSrc == "taxonomy") {
    $terms = get_terms(array(
      'taxonomy'   => $argsSrcTaxonomy,
      'hide_empty' => false,
    ));
    if (!empty($terms) && !is_wp_error($terms)) {
      foreach ($terms as $term) {
        $value = ($argsSrcField == 'ID') ? $term->term_id : $term->slug;
        $inputArgs[] = [
          'label' => $term->name,
          'value' => $value,
        ];
      }
    }
  }
  if ($argsSrc == "posts") {
    $args = array(
      'numberposts' => 10,
      'post_type'   => $argsSrcPostType
    );
    $posts = get_posts($args);
    if (!empty($posts) && !is_wp_error($posts)) {
      $inputArgs = [];
      foreach ($posts as $post) {
        $inputArgs[] = [
          'label' => $post->post_title,
          'value' => $post->ID,
        ];
      }
    }
  }
  if ($argsSrc == "users") {
    $users = get_users(array('role' => $argsSrcUserRole));
    if (!empty($users) && !is_wp_error($users)) {
      $inputArgs = [];
      foreach ($users as $user) {
        $inputArgs[] = [
          'label' => $user->display_name,
          'value' => $user->ID,
        ];
      }
    }
  }
  if ($argsSrc == "countryNames") {
    $countries = array(
      'AF' => __('Afghanistan', 'post-grid'),
      'AL' => __('Albania', 'post-grid'),
      'DZ' => __('Algeria', 'post-grid'),
      'AS' => __('American Samoa', 'post-grid'),
      'AD' => __('Andorra', 'post-grid'),
      'AO' => __('Angola', 'post-grid'),
      'AI' => __('Anguilla', 'post-grid'),
      'AQ' => __('Antarctica', 'post-grid'),
      'AG' => __('Antigua and Barbuda', 'post-grid'),
      'AR' => __('Argentina', 'post-grid'),
      'AM' => __('Armenia', 'post-grid'),
      'AW' => __('Aruba', 'post-grid'),
      'AU' => __('Australia', 'post-grid'),
      'AT' => __('Austria', 'post-grid'),
      'AZ' => __('Azerbaijan', 'post-grid'),
      'BS' => __('Bahamas', 'post-grid'),
      'BH' => __('Bahrain', 'post-grid'),
      'BD' => __('Bangladesh', 'post-grid'),
      'BB' => __('Barbados', 'post-grid'),
      'BY' => __('Belarus', 'post-grid'),
      'BE' => __('Belgium', 'post-grid'),
      'BZ' => __('Belize', 'post-grid'),
      'BJ' => __('Benin', 'post-grid'),
      'BM' => __('Bermuda', 'post-grid'),
      'BT' => __('Bhutan', 'post-grid'),
      'BO' => __('Bolivia', 'post-grid'),
      'BA' => __('Bosnia and Herzegovina', 'post-grid'),
      'BW' => __('Botswana', 'post-grid'),
      'BV' => __('Bouvet Island', 'post-grid'),
      'BR' => __('Brazil', 'post-grid'),
      'BQ' => __('British Antarctic Territory', 'post-grid'),
      'IO' => __('British Indian Ocean Territory', 'post-grid'),
      'VG' => __('British Virgin Islands', 'post-grid'),
      'BN' => __('Brunei', 'post-grid'),
      'BG' => __('Bulgaria', 'post-grid'),
      'BF' => __('Burkina Faso', 'post-grid'),
      'BI' => __('Burundi', 'post-grid'),
      'KH' => __('Cambodia', 'post-grid'),
      'CM' => __('Cameroon', 'post-grid'),
      'CA' => __('Canada', 'post-grid'),
      'CT' => __('Canton and Enderbury Islands', 'post-grid'),
      'CV' => __('Cape Verde', 'post-grid'),
      'KY' => __('Cayman Islands', 'post-grid'),
      'CF' => __('Central African Republic', 'post-grid'),
      'TD' => __('Chad', 'post-grid'),
      'CL' => __('Chile', 'post-grid'),
      'CN' => __('China', 'post-grid'),
      'CX' => __('Christmas Island', 'post-grid'),
      'CC' => __('Cocos [Keeling] Islands', 'post-grid'),
      'CO' => __('Colombia', 'post-grid'),
      'KM' => __('Comoros', 'post-grid'),
      'CG' => __('Congo - Brazzaville', 'post-grid'),
      'CD' => __('Congo - Kinshasa', 'post-grid'),
      'CK' => __('Cook Islands', 'post-grid'),
      'CR' => __('Costa Rica', 'post-grid'),
      'HR' => __('Croatia', 'post-grid'),
      'CU' => __('Cuba', 'post-grid'),
      'CY' => __('Cyprus', 'post-grid'),
      'CZ' => __('Czech Republic', 'post-grid'),
      'CI' => __('Côte d’Ivoire', 'post-grid'),
      'DK' => __('Denmark', 'post-grid'),
      'DJ' => __('Djibouti', 'post-grid'),
      'DM' => __('Dominica', 'post-grid'),
      'DO' => __('Dominican Republic', 'post-grid'),
      'NQ' => __('Dronning Maud Land', 'post-grid'),
      'DD' => __('East Germany', 'post-grid'),
      'EC' => __('Ecuador', 'post-grid'),
      'EG' => __('Egypt', 'post-grid'),
      'SV' => __('El Salvador', 'post-grid'),
      'GQ' => __('Equatorial Guinea', 'post-grid'),
      'ER' => __('Eritrea', 'post-grid'),
      'EE' => __('Estonia', 'post-grid'),
      'ET' => __('Ethiopia', 'post-grid'),
      'FK' => __('Falkland Islands', 'post-grid'),
      'FO' => __('Faroe Islands', 'post-grid'),
      'FJ' => __('Fiji', 'post-grid'),
      'FI' => __('Finland', 'post-grid'),
      'FR' => __('France', 'post-grid'),
      'GF' => __('French Guiana', 'post-grid'),
      'PF' => __('French Polynesia', 'post-grid'),
      'TF' => __('French Southern Territories', 'post-grid'),
      'FQ' => __('French Southern and Antarctic Territories', 'post-grid'),
      'GA' => __('Gabon', 'post-grid'),
      'GM' => __('Gambia', 'post-grid'),
      'GE' => __('Georgia', 'post-grid'),
      'DE' => __('Germany', 'post-grid'),
      'GH' => __('Ghana', 'post-grid'),
      'GI' => __('Gibraltar', 'post-grid'),
      'GR' => __('Greece', 'post-grid'),
      'GL' => __('Greenland', 'post-grid'),
      'GD' => __('Grenada', 'post-grid'),
      'GP' => __('Guadeloupe', 'post-grid'),
      'GU' => __('Guam', 'post-grid'),
      'GT' => __('Guatemala', 'post-grid'),
      'GG' => __('Guernsey', 'post-grid'),
      'GN' => __('Guinea', 'post-grid'),
      'GW' => __('Guinea-Bissau', 'post-grid'),
      'GY' => __('Guyana', 'post-grid'),
      'HT' => __('Haiti', 'post-grid'),
      'HM' => __('Heard Island and McDonald Islands', 'post-grid'),
      'HN' => __('Honduras', 'post-grid'),
      'HK' => __('Hong Kong SAR China', 'post-grid'),
      'HU' => __('Hungary', 'post-grid'),
      'IS' => __('Iceland', 'post-grid'),
      'IN' => __('India', 'post-grid'),
      'ID' => __('Indonesia', 'post-grid'),
      'IR' => __('Iran', 'post-grid'),
      'IQ' => __('Iraq', 'post-grid'),
      'IE' => __('Ireland', 'post-grid'),
      'IM' => __('Isle of Man', 'post-grid'),
      'IL' => __('Israel', 'post-grid'),
      'IT' => __('Italy', 'post-grid'),
      'JM' => __('Jamaica', 'post-grid'),
      'JP' => __('Japan', 'post-grid'),
      'JE' => __('Jersey', 'post-grid'),
      'JT' => __('Johnston Island', 'post-grid'),
      'JO' => __('Jordan', 'post-grid'),
      'KZ' => __('Kazakhstan', 'post-grid'),
      'KE' => __('Kenya', 'post-grid'),
      'KI' => __('Kiribati', 'post-grid'),
      'KW' => __('Kuwait', 'post-grid'),
      'KG' => __('Kyrgyzstan', 'post-grid'),
      'LA' => __('Laos', 'post-grid'),
      'LV' => __('Latvia', 'post-grid'),
      'LB' => __('Lebanon', 'post-grid'),
      'LS' => __('Lesotho', 'post-grid'),
      'LR' => __('Liberia', 'post-grid'),
      'LY' => __('Libya', 'post-grid'),
      'LI' => __('Liechtenstein', 'post-grid'),
      'LT' => __('Lithuania', 'post-grid'),
      'LU' => __('Luxembourg', 'post-grid'),
      'MO' => __('Macau SAR China', 'post-grid'),
      'MK' => __('Macedonia', 'post-grid'),
      'MG' => __('Madagascar', 'post-grid'),
      'MW' => __('Malawi', 'post-grid'),
      'MY' => __('Malaysia', 'post-grid'),
      'MV' => __('Maldives', 'post-grid'),
      'ML' => __('Mali', 'post-grid'),
      'MT' => __('Malta', 'post-grid'),
      'MH' => __('Marshall Islands', 'post-grid'),
      'MQ' => __('Martinique', 'post-grid'),
      'MR' => __('Mauritania', 'post-grid'),
      'MU' => __('Mauritius', 'post-grid'),
      'YT' => __('Mayotte', 'post-grid'),
      'FX' => __('Metropolitan France', 'post-grid'),
      'MX' => __('Mexico', 'post-grid'),
      'FM' => __('Micronesia', 'post-grid'),
      'MI' => __('Midway Islands', 'post-grid'),
      'MD' => __('Moldova', 'post-grid'),
      'MC' => __('Monaco', 'post-grid'),
      'MN' => __('Mongolia', 'post-grid'),
      'ME' => __('Montenegro', 'post-grid'),
      'MS' => __('Montserrat', 'post-grid'),
      'MA' => __('Morocco', 'post-grid'),
      'MZ' => __('Mozambique', 'post-grid'),
      'MM' => __('Myanmar [Burma]', 'post-grid'),
      'NA' => __('Namibia', 'post-grid'),
      'NR' => __('Nauru', 'post-grid'),
      'NP' => __('Nepal', 'post-grid'),
      'NL' => __('Netherlands', 'post-grid'),
      'AN' => __('Netherlands Antilles', 'post-grid'),
      'NT' => __('Neutral Zone', 'post-grid'),
      'NC' => __('New Caledonia', 'post-grid'),
      'NZ' => __('New Zealand', 'post-grid'),
      'NI' => __('Nicaragua', 'post-grid'),
      'NE' => __('Niger', 'post-grid'),
      'NG' => __('Nigeria', 'post-grid'),
      'NU' => __('Niue', 'post-grid'),
      'NF' => __('Norfolk Island', 'post-grid'),
      'KP' => __('North Korea', 'post-grid'),
      'VD' => __('North Vietnam', 'post-grid'),
      'MP' => __('Northern Mariana Islands', 'post-grid'),
      'NO' => __('Norway', 'post-grid'),
      'OM' => __('Oman', 'post-grid'),
      'PC' => __('Pacific Islands Trust Territory', 'post-grid'),
      'PK' => __('Pakistan', 'post-grid'),
      'PW' => __('Palau', 'post-grid'),
      'PS' => __('Palestinian Territories', 'post-grid'),
      'PA' => __('Panama', 'post-grid'),
      'PZ' => __('Panama Canal Zone', 'post-grid'),
      'PG' => __('Papua New Guinea', 'post-grid'),
      'PY' => __('Paraguay', 'post-grid'),
      'YD' => __('People\'s Democratic Republic of Yemen', 'post-grid'),
      'PE' => __('Peru', 'post-grid'),
      'PH' => __('Philippines', 'post-grid'),
      'PN' => __('Pitcairn Islands', 'post-grid'),
      'PL' => __('Poland', 'post-grid'),
      'PT' => __('Portugal', 'post-grid'),
      'PR' => __('Puerto Rico', 'post-grid'),
      'QA' => __('Qatar', 'post-grid'),
      'RO' => __('Romania', 'post-grid'),
      'RU' => __('Russia', 'post-grid'),
      'RW' => __('Rwanda', 'post-grid'),
      'BL' => __('Saint Barthélemy', 'post-grid'),
      'SH' => __('Saint Helena', 'post-grid'),
      'KN' => __('Saint Kitts and Nevis', 'post-grid'),
      'LC' => __('Saint Lucia', 'post-grid'),
      'MF' => __('Saint Martin', 'post-grid'),
      'PM' => __('Saint Pierre and Miquelon', 'post-grid'),
      'VC' => __('Saint Vincent and the Grenadines', 'post-grid'),
      'WS' => __('Samoa', 'post-grid'),
      'SM' => __('San Marino', 'post-grid'),
      'SA' => __('Saudi Arabia', 'post-grid'),
      'SN' => __('Senegal', 'post-grid'),
      'RS' => __('Serbia', 'post-grid'),
      'CS' => __('Serbia and Montenegro', 'post-grid'),
      'SC' => __('Seychelles', 'post-grid'),
      'SL' => __('Sierra Leone', 'post-grid'),
      'SG' => __('Singapore', 'post-grid'),
      'SK' => __('Slovakia', 'post-grid'),
      'SI' => __('Slovenia', 'post-grid'),
      'SB' => __('Solomon Islands', 'post-grid'),
      'SO' => __('Somalia', 'post-grid'),
      'ZA' => __('South Africa', 'post-grid'),
      'GS' => __('South Georgia and the South Sandwich Islands', 'post-grid'),
      'KR' => __('South Korea', 'post-grid'),
      'ES' => __('Spain', 'post-grid'),
      'LK' => __('Sri Lanka', 'post-grid'),
      'SD' => __('Sudan', 'post-grid'),
      'SR' => __('Suriname', 'post-grid'),
      'SJ' => __('Svalbard and Jan Mayen', 'post-grid'),
      'SZ' => __('Swaziland', 'post-grid'),
      'SE' => __('Sweden', 'post-grid'),
      'CH' => __('Switzerland', 'post-grid'),
      'SY' => __('Syria', 'post-grid'),
      'ST' => __('São Tomé and Príncipe', 'post-grid'),
      'TW' => __('Taiwan', 'post-grid'),
      'TJ' => __('Tajikistan', 'post-grid'),
      'TZ' => __('Tanzania', 'post-grid'),
      'TH' => __('Thailand', 'post-grid'),
      'TL' => __('Timor-Leste', 'post-grid'),
      'TG' => __('Togo', 'post-grid'),
      'TK' => __('Tokelau', 'post-grid'),
      'TO' => __('Tonga', 'post-grid'),
      'TT' => __('Trinidad and Tobago', 'post-grid'),
      'TN' => __('Tunisia', 'post-grid'),
      'TR' => __('Turkey', 'post-grid'),
      'TM' => __('Turkmenistan', 'post-grid'),
      'TC' => __('Turks and Caicos Islands', 'post-grid'),
      'TV' => __('Tuvalu', 'post-grid'),
      'UM' => __('U.S. Minor Outlying Islands', 'post-grid'),
      'PU' => __('U.S. Miscellaneous Pacific Islands', 'post-grid'),
      'VI' => __('U.S. Virgin Islands', 'post-grid'),
      'UG' => __('Uganda', 'post-grid'),
      'UA' => __('Ukraine', 'post-grid'),
      'SU' => __('Union of Soviet Socialist Republics', 'post-grid'),
      'AE' => __('United Arab Emirates', 'post-grid'),
      'GB' => __('United Kingdom', 'post-grid'),
      'US' => __('United States', 'post-grid'),
      'ZZ' => __('Unknown or Invalid Region', 'post-grid'),
      'UY' => __('Uruguay', 'post-grid'),
      'UZ' => __('Uzbekistan', 'post-grid'),
      'VU' => __('Vanuatu', 'post-grid'),
      'VA' => __('Vatican City', 'post-grid'),
      'VE' => __('Venezuela', 'post-grid'),
      'VN' => __('Vietnam', 'post-grid'),
      'WK' => __('Wake Island', 'post-grid'),
      'WF' => __('Wallis and Futuna', 'post-grid'),
      'EH' => __('Western Sahara', 'post-grid'),
      'YE' => __('Yemen', 'post-grid'),
      'ZM' => __('Zambia', 'post-grid'),
      'ZW' => __('Zimbabwe', 'post-grid'),
      'AX' => __('Åland Islands', 'post-grid'),
    );
    $inputArgs = [];
    foreach ($countries as $index => $country) {
      $inputArgs[] = [
        'label' => $country,
        'value' => $country,
      ];
    }
  }
  if ($argsSrc == "countryCodes") {
    $countries = array(
      'AF' => __('Afghanistan', 'post-grid'),
      'AL' => __('Albania', 'post-grid'),
      'DZ' => __('Algeria', 'post-grid'),
      'AS' => __('American Samoa', 'post-grid'),
      'AD' => __('Andorra', 'post-grid'),
      'AO' => __('Angola', 'post-grid'),
      'AI' => __('Anguilla', 'post-grid'),
      'AQ' => __('Antarctica', 'post-grid'),
      'AG' => __('Antigua and Barbuda', 'post-grid'),
      'AR' => __('Argentina', 'post-grid'),
      'AM' => __('Armenia', 'post-grid'),
      'AW' => __('Aruba', 'post-grid'),
      'AU' => __('Australia', 'post-grid'),
      'AT' => __('Austria', 'post-grid'),
      'AZ' => __('Azerbaijan', 'post-grid'),
      'BS' => __('Bahamas', 'post-grid'),
      'BH' => __('Bahrain', 'post-grid'),
      'BD' => __('Bangladesh', 'post-grid'),
      'BB' => __('Barbados', 'post-grid'),
      'BY' => __('Belarus', 'post-grid'),
      'BE' => __('Belgium', 'post-grid'),
      'BZ' => __('Belize', 'post-grid'),
      'BJ' => __('Benin', 'post-grid'),
      'BM' => __('Bermuda', 'post-grid'),
      'BT' => __('Bhutan', 'post-grid'),
      'BO' => __('Bolivia', 'post-grid'),
      'BA' => __('Bosnia and Herzegovina', 'post-grid'),
      'BW' => __('Botswana', 'post-grid'),
      'BV' => __('Bouvet Island', 'post-grid'),
      'BR' => __('Brazil', 'post-grid'),
      'BQ' => __('British Antarctic Territory', 'post-grid'),
      'IO' => __('British Indian Ocean Territory', 'post-grid'),
      'VG' => __('British Virgin Islands', 'post-grid'),
      'BN' => __('Brunei', 'post-grid'),
      'BG' => __('Bulgaria', 'post-grid'),
      'BF' => __('Burkina Faso', 'post-grid'),
      'BI' => __('Burundi', 'post-grid'),
      'KH' => __('Cambodia', 'post-grid'),
      'CM' => __('Cameroon', 'post-grid'),
      'CA' => __('Canada', 'post-grid'),
      'CT' => __('Canton and Enderbury Islands', 'post-grid'),
      'CV' => __('Cape Verde', 'post-grid'),
      'KY' => __('Cayman Islands', 'post-grid'),
      'CF' => __('Central African Republic', 'post-grid'),
      'TD' => __('Chad', 'post-grid'),
      'CL' => __('Chile', 'post-grid'),
      'CN' => __('China', 'post-grid'),
      'CX' => __('Christmas Island', 'post-grid'),
      'CC' => __('Cocos [Keeling] Islands', 'post-grid'),
      'CO' => __('Colombia', 'post-grid'),
      'KM' => __('Comoros', 'post-grid'),
      'CG' => __('Congo - Brazzaville', 'post-grid'),
      'CD' => __('Congo - Kinshasa', 'post-grid'),
      'CK' => __('Cook Islands', 'post-grid'),
      'CR' => __('Costa Rica', 'post-grid'),
      'HR' => __('Croatia', 'post-grid'),
      'CU' => __('Cuba', 'post-grid'),
      'CY' => __('Cyprus', 'post-grid'),
      'CZ' => __('Czech Republic', 'post-grid'),
      'CI' => __('Côte d’Ivoire', 'post-grid'),
      'DK' => __('Denmark', 'post-grid'),
      'DJ' => __('Djibouti', 'post-grid'),
      'DM' => __('Dominica', 'post-grid'),
      'DO' => __('Dominican Republic', 'post-grid'),
      'NQ' => __('Dronning Maud Land', 'post-grid'),
      'DD' => __('East Germany', 'post-grid'),
      'EC' => __('Ecuador', 'post-grid'),
      'EG' => __('Egypt', 'post-grid'),
      'SV' => __('El Salvador', 'post-grid'),
      'GQ' => __('Equatorial Guinea', 'post-grid'),
      'ER' => __('Eritrea', 'post-grid'),
      'EE' => __('Estonia', 'post-grid'),
      'ET' => __('Ethiopia', 'post-grid'),
      'FK' => __('Falkland Islands', 'post-grid'),
      'FO' => __('Faroe Islands', 'post-grid'),
      'FJ' => __('Fiji', 'post-grid'),
      'FI' => __('Finland', 'post-grid'),
      'FR' => __('France', 'post-grid'),
      'GF' => __('French Guiana', 'post-grid'),
      'PF' => __('French Polynesia', 'post-grid'),
      'TF' => __('French Southern Territories', 'post-grid'),
      'FQ' => __('French Southern and Antarctic Territories', 'post-grid'),
      'GA' => __('Gabon', 'post-grid'),
      'GM' => __('Gambia', 'post-grid'),
      'GE' => __('Georgia', 'post-grid'),
      'DE' => __('Germany', 'post-grid'),
      'GH' => __('Ghana', 'post-grid'),
      'GI' => __('Gibraltar', 'post-grid'),
      'GR' => __('Greece', 'post-grid'),
      'GL' => __('Greenland', 'post-grid'),
      'GD' => __('Grenada', 'post-grid'),
      'GP' => __('Guadeloupe', 'post-grid'),
      'GU' => __('Guam', 'post-grid'),
      'GT' => __('Guatemala', 'post-grid'),
      'GG' => __('Guernsey', 'post-grid'),
      'GN' => __('Guinea', 'post-grid'),
      'GW' => __('Guinea-Bissau', 'post-grid'),
      'GY' => __('Guyana', 'post-grid'),
      'HT' => __('Haiti', 'post-grid'),
      'HM' => __('Heard Island and McDonald Islands', 'post-grid'),
      'HN' => __('Honduras', 'post-grid'),
      'HK' => __('Hong Kong SAR China', 'post-grid'),
      'HU' => __('Hungary', 'post-grid'),
      'IS' => __('Iceland', 'post-grid'),
      'IN' => __('India', 'post-grid'),
      'ID' => __('Indonesia', 'post-grid'),
      'IR' => __('Iran', 'post-grid'),
      'IQ' => __('Iraq', 'post-grid'),
      'IE' => __('Ireland', 'post-grid'),
      'IM' => __('Isle of Man', 'post-grid'),
      'IL' => __('Israel', 'post-grid'),
      'IT' => __('Italy', 'post-grid'),
      'JM' => __('Jamaica', 'post-grid'),
      'JP' => __('Japan', 'post-grid'),
      'JE' => __('Jersey', 'post-grid'),
      'JT' => __('Johnston Island', 'post-grid'),
      'JO' => __('Jordan', 'post-grid'),
      'KZ' => __('Kazakhstan', 'post-grid'),
      'KE' => __('Kenya', 'post-grid'),
      'KI' => __('Kiribati', 'post-grid'),
      'KW' => __('Kuwait', 'post-grid'),
      'KG' => __('Kyrgyzstan', 'post-grid'),
      'LA' => __('Laos', 'post-grid'),
      'LV' => __('Latvia', 'post-grid'),
      'LB' => __('Lebanon', 'post-grid'),
      'LS' => __('Lesotho', 'post-grid'),
      'LR' => __('Liberia', 'post-grid'),
      'LY' => __('Libya', 'post-grid'),
      'LI' => __('Liechtenstein', 'post-grid'),
      'LT' => __('Lithuania', 'post-grid'),
      'LU' => __('Luxembourg', 'post-grid'),
      'MO' => __('Macau SAR China', 'post-grid'),
      'MK' => __('Macedonia', 'post-grid'),
      'MG' => __('Madagascar', 'post-grid'),
      'MW' => __('Malawi', 'post-grid'),
      'MY' => __('Malaysia', 'post-grid'),
      'MV' => __('Maldives', 'post-grid'),
      'ML' => __('Mali', 'post-grid'),
      'MT' => __('Malta', 'post-grid'),
      'MH' => __('Marshall Islands', 'post-grid'),
      'MQ' => __('Martinique', 'post-grid'),
      'MR' => __('Mauritania', 'post-grid'),
      'MU' => __('Mauritius', 'post-grid'),
      'YT' => __('Mayotte', 'post-grid'),
      'FX' => __('Metropolitan France', 'post-grid'),
      'MX' => __('Mexico', 'post-grid'),
      'FM' => __('Micronesia', 'post-grid'),
      'MI' => __('Midway Islands', 'post-grid'),
      'MD' => __('Moldova', 'post-grid'),
      'MC' => __('Monaco', 'post-grid'),
      'MN' => __('Mongolia', 'post-grid'),
      'ME' => __('Montenegro', 'post-grid'),
      'MS' => __('Montserrat', 'post-grid'),
      'MA' => __('Morocco', 'post-grid'),
      'MZ' => __('Mozambique', 'post-grid'),
      'MM' => __('Myanmar [Burma]', 'post-grid'),
      'NA' => __('Namibia', 'post-grid'),
      'NR' => __('Nauru', 'post-grid'),
      'NP' => __('Nepal', 'post-grid'),
      'NL' => __('Netherlands', 'post-grid'),
      'AN' => __('Netherlands Antilles', 'post-grid'),
      'NT' => __('Neutral Zone', 'post-grid'),
      'NC' => __('New Caledonia', 'post-grid'),
      'NZ' => __('New Zealand', 'post-grid'),
      'NI' => __('Nicaragua', 'post-grid'),
      'NE' => __('Niger', 'post-grid'),
      'NG' => __('Nigeria', 'post-grid'),
      'NU' => __('Niue', 'post-grid'),
      'NF' => __('Norfolk Island', 'post-grid'),
      'KP' => __('North Korea', 'post-grid'),
      'VD' => __('North Vietnam', 'post-grid'),
      'MP' => __('Northern Mariana Islands', 'post-grid'),
      'NO' => __('Norway', 'post-grid'),
      'OM' => __('Oman', 'post-grid'),
      'PC' => __('Pacific Islands Trust Territory', 'post-grid'),
      'PK' => __('Pakistan', 'post-grid'),
      'PW' => __('Palau', 'post-grid'),
      'PS' => __('Palestinian Territories', 'post-grid'),
      'PA' => __('Panama', 'post-grid'),
      'PZ' => __('Panama Canal Zone', 'post-grid'),
      'PG' => __('Papua New Guinea', 'post-grid'),
      'PY' => __('Paraguay', 'post-grid'),
      'YD' => __('People\'s Democratic Republic of Yemen', 'post-grid'),
      'PE' => __('Peru', 'post-grid'),
      'PH' => __('Philippines', 'post-grid'),
      'PN' => __('Pitcairn Islands', 'post-grid'),
      'PL' => __('Poland', 'post-grid'),
      'PT' => __('Portugal', 'post-grid'),
      'PR' => __('Puerto Rico', 'post-grid'),
      'QA' => __('Qatar', 'post-grid'),
      'RO' => __('Romania', 'post-grid'),
      'RU' => __('Russia', 'post-grid'),
      'RW' => __('Rwanda', 'post-grid'),
      'BL' => __('Saint Barthélemy', 'post-grid'),
      'SH' => __('Saint Helena', 'post-grid'),
      'KN' => __('Saint Kitts and Nevis', 'post-grid'),
      'LC' => __('Saint Lucia', 'post-grid'),
      'MF' => __('Saint Martin', 'post-grid'),
      'PM' => __('Saint Pierre and Miquelon', 'post-grid'),
      'VC' => __('Saint Vincent and the Grenadines', 'post-grid'),
      'WS' => __('Samoa', 'post-grid'),
      'SM' => __('San Marino', 'post-grid'),
      'SA' => __('Saudi Arabia', 'post-grid'),
      'SN' => __('Senegal', 'post-grid'),
      'RS' => __('Serbia', 'post-grid'),
      'CS' => __('Serbia and Montenegro', 'post-grid'),
      'SC' => __('Seychelles', 'post-grid'),
      'SL' => __('Sierra Leone', 'post-grid'),
      'SG' => __('Singapore', 'post-grid'),
      'SK' => __('Slovakia', 'post-grid'),
      'SI' => __('Slovenia', 'post-grid'),
      'SB' => __('Solomon Islands', 'post-grid'),
      'SO' => __('Somalia', 'post-grid'),
      'ZA' => __('South Africa', 'post-grid'),
      'GS' => __('South Georgia and the South Sandwich Islands', 'post-grid'),
      'KR' => __('South Korea', 'post-grid'),
      'ES' => __('Spain', 'post-grid'),
      'LK' => __('Sri Lanka', 'post-grid'),
      'SD' => __('Sudan', 'post-grid'),
      'SR' => __('Suriname', 'post-grid'),
      'SJ' => __('Svalbard and Jan Mayen', 'post-grid'),
      'SZ' => __('Swaziland', 'post-grid'),
      'SE' => __('Sweden', 'post-grid'),
      'CH' => __('Switzerland', 'post-grid'),
      'SY' => __('Syria', 'post-grid'),
      'ST' => __('São Tomé and Príncipe', 'post-grid'),
      'TW' => __('Taiwan', 'post-grid'),
      'TJ' => __('Tajikistan', 'post-grid'),
      'TZ' => __('Tanzania', 'post-grid'),
      'TH' => __('Thailand', 'post-grid'),
      'TL' => __('Timor-Leste', 'post-grid'),
      'TG' => __('Togo', 'post-grid'),
      'TK' => __('Tokelau', 'post-grid'),
      'TO' => __('Tonga', 'post-grid'),
      'TT' => __('Trinidad and Tobago', 'post-grid'),
      'TN' => __('Tunisia', 'post-grid'),
      'TR' => __('Turkey', 'post-grid'),
      'TM' => __('Turkmenistan', 'post-grid'),
      'TC' => __('Turks and Caicos Islands', 'post-grid'),
      'TV' => __('Tuvalu', 'post-grid'),
      'UM' => __('U.S. Minor Outlying Islands', 'post-grid'),
      'PU' => __('U.S. Miscellaneous Pacific Islands', 'post-grid'),
      'VI' => __('U.S. Virgin Islands', 'post-grid'),
      'UG' => __('Uganda', 'post-grid'),
      'UA' => __('Ukraine', 'post-grid'),
      'SU' => __('Union of Soviet Socialist Republics', 'post-grid'),
      'AE' => __('United Arab Emirates', 'post-grid'),
      'GB' => __('United Kingdom', 'post-grid'),
      'US' => __('United States', 'post-grid'),
      'ZZ' => __('Unknown or Invalid Region', 'post-grid'),
      'UY' => __('Uruguay', 'post-grid'),
      'UZ' => __('Uzbekistan', 'post-grid'),
      'VU' => __('Vanuatu', 'post-grid'),
      'VA' => __('Vatican City', 'post-grid'),
      'VE' => __('Venezuela', 'post-grid'),
      'VN' => __('Vietnam', 'post-grid'),
      'WK' => __('Wake Island', 'post-grid'),
      'WF' => __('Wallis and Futuna', 'post-grid'),
      'EH' => __('Western Sahara', 'post-grid'),
      'YE' => __('Yemen', 'post-grid'),
      'ZM' => __('Zambia', 'post-grid'),
      'ZW' => __('Zimbabwe', 'post-grid'),
      'AX' => __('Åland Islands', 'post-grid'),
    );
    $inputArgs = [];
    foreach ($countries as $index => $country) {
      $inputArgs[] = [
        'label' => $country,
        'value' => $index,
      ];
    }
  }
  if ($argsSrc == "ageGroupsNum") {
    $inputArgs = [];
    $ageGroups = [
      "0-16" => "Child",
      "25-64" => "Adults",
      "65-69" => "Seniors"
    ];
    foreach ($ageGroups as $index => $ageGroup) {
      $inputArgs[] = [
        'label' => $ageGroup,
        'value' => $index,
      ];
    }
  }
  if ($argsSrc == "ageGroupsKids") {
    //https://support.google.com/manufacturers/answer/7494266?hl=en#zippy=%2Csizes-that-vary-by-age-group
    $inputArgs = [];
    $ageGroups = [
      "newborn" => "Newborn",
      "infant" => "Infant",
      "toddler" => "Toddler",
      "kids" => "Kids",
      "adult" => "Adult"
    ];
    foreach ($ageGroups as $index => $ageGroup) {
      $inputArgs[] = [
        'label' => $ageGroup,
        'value' => $index,
      ];
    }
  }
  if ($argsSrc == "gender") {
    $inputArgs = [];
    $genders = [
      "female" => "Female",
      "male" => "Male",
      "others" => "Others"
    ];
    foreach ($genders as $index => $gender) {
      $inputArgs[] = [
        'label' => $gender,
        'value' => $index,
      ];
    }
  }
  return $inputArgs;
}
function post_grid_visible_parse($visible)
{
  $isVisible = true;
  $rules = isset($visible['rules']) ? $visible['rules'] : [];
  $GroupRelation = isset($visible['relation']) ? $visible['relation'] : 'OR';
  $conditions = [];
  //$conditions['relation'] = $GroupRelation;
  foreach ($rules as $i => $rule) {
    $relation = isset($rule['relation']) ? $rule['relation'] : 'OR';
    $args = isset($rule['args']) ? $rule['args'] : [];
    $conditions[$i]['relation'] = $relation;
    foreach ($args as $j => $arg) {
      $id = isset($arg['id']) ? $arg['id'] : '';
      $isAccess = false;
      if ($id == 'userLogged') {
        if (is_user_logged_in()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isUserLoggedIn') {
        if (is_user_logged_in()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'userNotLogged') {
        if (!is_user_logged_in()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'userRoles') {
        $roles = isset($arg['roles']) ? $arg['roles'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $user = wp_get_current_user();
        $user_role = (array) $user->roles;
        if ($compare == 'include') {
          $roleExist = !empty(array_intersect($user_role, $roles));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exclude') {
          $roleExist = empty(array_intersect($user_role, $roles));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'userIds') {
        $user = wp_get_current_user();
        $currentUserId = isset($user->ID) ? [$user->ID] : [];
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $userIds = explode(",", $value);
        $userIds = array_map(function ($a) {
          return (int)$a[0];
        }, $userIds);
        if ($compare == 'include') {
          $roleExist = !empty(array_intersect($currentUserId, $userIds));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exclude') {
          $roleExist = empty(array_intersect($currentUserId, $userIds));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        // if (in_array($currentUserId, $userIds)) {
        //   $isAccess = true;
        //   $conditions[$i]['args'][$j] = $isAccess;
        // } else {
        //   $conditions[$i]['args'][$j] = $isAccess;
        // }
      }
      if ($id == 'isYears') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';
        $values = isset($arg['value']) ? explode(",", $arg['value']) : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        // $curentYear = date('Y');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'Y');
        if ($compare == '=') {
          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';
          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isMonths') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';
        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        // $curentYear = date('m');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'm');
        if ($compare == '=') {
          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';
          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'weekDays') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';
        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        //$curentYear = date('m');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'w');
        if ($compare == '=') {
          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';
          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isHours') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';
        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'H');
        if ($compare == '=') {
          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';
          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isDate') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ?  $arg['value'] : '';
        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        // $curentYears = date('Y-m-d');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'Y-m-d');
        if ($compare == '=') {
          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';
          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'urlPrams') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $prams = explode(",", $value);
        //var_dump($value);
        $queryArray = array();
        parse_str($_SERVER['QUERY_STRING'], $queryArray);
        //var_dump($queryArray);
        $pramExist = !empty(array_intersect($prams, array_keys($queryArray)));
        if ($pramExist) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'urlString') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        if ($compare == 'contain') {
          if (strpos($_SERVER['REQUEST_URI'], $value) !== false) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'notContain') {
          if (strpos($_SERVER['REQUEST_URI'], $value) !== false) {
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'referrerExist') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $prams = explode(",", $value);
        $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
        if (in_array($referer, $prams)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isDevice') {
        $values = isset($arg['values']) ? $arg['values'] : [];
        if (!function_exists('wp_check_browser_version')) {
          include ABSPATH . "wp-admin/includes/dashboard.php";
        }
        //$ua = post_grid_getBrowser();
        $browesr = wp_check_browser_version();
        $name = $browesr['name'];
      }
      if ($id == 'isBrowsers') {
        $values = isset($arg['values']) ? $arg['values'] : [];
        if (!function_exists('wp_check_browser_version')) {
          include ABSPATH . "wp-admin/includes/dashboard.php";
        }
        //$ua = post_grid_getBrowser();
        $browesr = wp_check_browser_version();
        $name = $browesr['name'];
        if (in_array($name, $values)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isCountries') {
      }
      if ($id == 'postsIds') {
        if (is_single()) {
          $post_id = get_the_ID();
        }
      }
      if ($id == 'reviewXProducts') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $post_id = get_the_ID();
        $comments_count = wp_count_comments($post_id);
      }
      if ($id == 'termIds') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_tax()) {
          $queried_object = get_queried_object();
          $term_id = $queried_object->term_id;
          if (in_array($term_id, $ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'hasPostComments') {
        $post_id = get_the_ID();
        $args = array(
          'post_id' => $post_id,   // Use post_id, not post_ID
          'count'   => true // Return only the count
        );
        $comments_count = get_comments($args);
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        if ($compare == '=') {
        }
        if ($compare == '!=') {
        }
        if ($compare == '>') {
        }
        if ($compare == '<') {
        }
        if ($compare == '>=') {
        }
        if ($compare == '<=') {
        }
        if ($comments_count > 0) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostTerms') {
        $post_id = get_the_ID();
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (has_term($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostCategories') {
        $post_id = get_the_ID();
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (has_category($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostTags') {
        $post_id = get_the_ID();
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (has_tag($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostFormat') {
        $post_id = get_the_ID();
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (has_post_format($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'authorIds') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_single()) {
          $post_id = get_the_ID();
          $post = get_post($post_id);
          $author_id = $post->post_author;
          if (in_array($author_id, $ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isHome') {
        if (is_front_page() && is_home()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isFrontPage') {
        if (is_front_page()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isBlog') {
        if (is_home()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'is404') {
        if (is_404()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasMeta') {
        $post_id = get_the_ID();
        if (has_meta($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasTermMeta') {
        $term_id  = get_the_ID();
        if (has_term_meta($term_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasSiteIcon') {
        $blog_id = get_current_blog_id();
        if (has_site_icon($blog_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasCustomLogo') {
        $blog_id = get_current_blog_id();
        if (has_custom_logo($blog_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasHeaderImage') {
        if (has_header_image()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasHeaderVideo') {
        if (has_header_video()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasCustomHeader') {
        if (has_custom_header()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasBlock') {
        $blockName = isset($arg['blockName']) ? $arg['blockName'] : '';
        $post_id = get_the_ID();
        if (has_block($blockName, $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasBlocks') {
        $post_id = get_the_ID();
        if (has_blocks($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasAction') {
        $hookName = isset($arg['hookName']) ? $arg['hookName'] : '';
        $callback = isset($arg['callback']) ? $arg['callback'] : '';
        $post_id = get_the_ID();
        if (has_action($hookName, $callback)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasFilter') {
        $hookName = isset($arg['hookName']) ? $arg['hookName'] : '';
        $callback = isset($arg['callback']) ? $arg['callback'] : '';
        $post_id = get_the_ID();
        if (has_filter($hookName, $callback)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasShortcode') {
        $tag = isset($arg['tag']) ? $arg['tag'] : '';
        $post_id = get_the_ID();
        $post_content = get_the_content($post_id);
        if (has_shortcode($post_content, $tag)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'userCan' || $id == 'authorCan') {
        $capability = isset($arg['values']) ? $arg['values'] : [];
        $args = isset($arg['args']) ? $arg['args'] : '';
        $user = wp_get_current_user();
        $currentUserId = isset($user->ID) ? $user->ID : '';
        if (user_can($currentUserId, $capability[0], $args)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'authorCan') {
        $capability = isset($arg['capability']) ? $arg['capability'] : '';
        $args = isset($arg['args']) ? $arg['args'] : '';
        $user = wp_get_current_user();
        $currentUserId = isset($user->ID) ? $user->ID : '';
        if (author_can($currentUserId, $capability, $args)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'wcisAccountPage') {
        if (function_exists('is_account_page')) {
          $account_id = wc_get_page_id('myaccount');
          $post_id = get_the_ID();
          if (is_account_page()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcShop') {
        if (function_exists('is_shop')) {
          $shop_id = wc_get_page_id('shop');
          $post_id = get_the_ID();
          if (is_shop()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcisCart') {
        if (function_exists('is_cart')) {
          $cart_id = wc_get_page_id('cart');
          $post_id = get_the_ID();
          if (is_cart()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcisCheckout') {
        if (function_exists('is_checkout')) {
          $cart_id = wc_get_page_id('cart');
          $post_id = get_the_ID();
          if (is_checkout()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcisOnSale') {
        $product_id = get_the_ID();
        $product = new WC_Product($product_id);
        if ($product->is_on_sale()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'wcisInStock') {
        //if (!is_singular('product')) return;
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $product_id = get_the_ID();
        $product = new WC_Product($product_id);
        if ($compare == 'inStock') {
          if ($product->is_in_stock()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'outOfStock') {
          if (!$product->is_in_stock()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'onBackorder') {
          if ($product->is_on_backorder()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcproductType') {
        if (!is_singular('product')) return;
        $product_id = get_the_ID();
        $product = new WC_Product($product_id);
        $value = isset($arg['value']) ? $arg['value'] : '';
        if ($product->get_type() == $value) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'wchasUpSells') {
        if (!is_singular('product')) return;
        $product_id = get_the_ID();
        if (empty($product_id)) return;
        $product = new WC_Product($product_id);
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? $arg['value'] : '';
        $values = explode(',', $value);
        $upsell_ids = $product->get_upsell_ids();
        if ($compare == "noUpsells") {
          if (empty($upsell_ids)) {
            if (!empty($upsell_ids)) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
        if ($compare == "hasUpsells") {
          if (!empty($upsell_ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if (!empty($value)) {
          if ($compare == 'exist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));
            if ($upsellExist) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
          if ($compare == 'notExist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));
            if (!$upsellExist) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
      }
      if ($id == 'wchasCrossSells') {
        if (!is_singular('product')) return;
        $product_id = get_the_ID();
        if (empty($product_id)) return;
        $product = new WC_Product($product_id);
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? $arg['value'] : '';
        $values = explode(',', $value);
        $upsell_ids = $product->get_cross_sell_ids();
        if ($compare == "noCrossSells") {
          if (empty($upsell_ids)) {
            if (!empty($upsell_ids)) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
        if ($compare == "hasCrossSells") {
          if (!empty($upsell_ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if (!empty($value)) {
          if ($compare == 'exist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));
            if ($upsellExist) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
          if ($compare == 'notExist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));
            if (!$upsellExist) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
      }
      if ($id == 'hasPMproLevels') {
        $values = isset($arg['values']) ? $arg['values'] : [];
        if (function_exists('pmpro_hasMembershipLevel')) {
          if (pmpro_hasMembershipLevel($values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'hasMeprMemberships') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $user_id = get_current_user_id();
        $mepr_user = new MeprUser($user_id);
        $mepr_user->is_already_subscribed_to($value); // true or false
        if ($mepr_user->is_already_subscribed_to($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSearch') {
        if (is_search()) {
          $value = isset($arg['value']) ? $arg['value'] : '';
          $compare = isset($arg['compare']) ? $arg['compare'] : '';
          $query = get_search_query();
          if ($compare == '=' && $query == $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == '!=' && $query != $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'contain' && str_contains($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'notContain' && !str_contains($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'endWith' && str_ends_with($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'startWith' && str_starts_with($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSingle') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_single($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSticky') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        //$ids = explode(',', $value);
        if (is_sticky($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPostHierarchical') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        //$ids = explode(',', $value);
        if (is_post_type_hierarchical($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPostArchive') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        //$ids = explode(',', $value);
        if (is_post_type_archive($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isCommentsOpen') {
        $post_id = get_the_ID();
        if (comments_open($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPage') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_page($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPageTemplate') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (is_page_template($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isCategory') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_category($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTag') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_tag($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTax') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_tax($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isAuthor') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_author($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMultiAuthor') {
        if (is_multi_author()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isDate') {
        if (is_date()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isYear') {
        if (is_year()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMonth') {
        if (is_month()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isDay') {
        if (is_day()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTime') {
        if (is_time()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isNewDay') {
        if (is_new_day()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isArchive') {
        if (is_archive()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSearch') {
        if (is_search()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'is404') {
        if (is_404()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isAttachment') {
        if (is_attachment()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSingular') {
        $values = isset($arg['values']) ? $arg['values'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        if ($compare == 'include') {
          if (is_singular($ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exclude') {
          if (!is_singular($ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'hasTerm') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (has_term($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTaxonomyHierarchical') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (is_taxonomy_hierarchical($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'taxonomyExists') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (taxonomy_exists($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostParent') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $post_id = get_the_ID();
        if (has_post_parent($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostFormat') {
        $format = isset($arg['format']) ? $arg['format'] : '';
        $post_id = get_the_ID();
        if (has_post_format($format, $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMainQuery') {
        if (is_main_query()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isFeed') {
        if (is_feed()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTrackback') {
        if (is_trackback()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPreview') {
        if (is_preview()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasExcerpt') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (has_excerpt($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasNavMenu') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (has_nav_menu($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isRtl') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (is_rtl($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasCookie') {
        $cookieName = isset($arg['cookieName']) ? $arg['cookieName'] : '';
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        if ($compare == '=') {
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] == $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] != $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          $value = (int) $value;
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] > $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          $value = (int) $value;
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] < $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          $value = (int) $value;
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] >= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          $value = (int) $value;
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] <= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (isset($_COOKIE[$cookieName])) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'notExist') {
          if (!isset($_COOKIE[$cookieName])) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'hasPostThumbnail') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (has_post_thumbnail($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMainSite') {
        $siteId = isset($arg['siteId']) ? $arg['siteId'] : '';
        $networkId = isset($arg['networkId']) ? $arg['networkId'] : '';
        if (is_main_site($siteId, $networkId)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
    }
  }
  $allowAccess = false;
  $allowAccessArr = [];
  $globalRelation = isset($conditions['relation']) ? $conditions['relation'] : 'OR';
  foreach ($conditions as $x => $conditionGroup) {
    $groupRelation = isset($conditionGroup['relation']) ? $conditionGroup['relation'] : 'OR';
    $args = isset($conditionGroup['args']) ? $conditionGroup['args'] : [];
    $res = array_unique($args);
    if ($groupRelation == "AND") {
      if (count($res) === 1 && $res[0]) {
        $allowAccessArr[$x] = true;
      } else {
        $allowAccessArr[$x] = false;
      }
    }
    if ($groupRelation == "OR") {
      if (in_array(true, $res)) {
        $allowAccessArr[$x] = true;
      } else {
        $allowAccessArr[$x] = false;
      }
    }
  }
  $accessRes = array_unique($allowAccessArr);
  if ($globalRelation == "AND") {
    if (count($accessRes) === 1 && $accessRes[0]) {
      $allowAccess = true;
    } else {
      $allowAccess = false;
    }
  }
  if ($globalRelation == "OR") {
    if (in_array(true, $accessRes)) {
      $allowAccess = true;
    } else {
      $allowAccess = false;
    }
  }
  return $allowAccess;
}
add_filter('render_block', function ($block_content, $block) {
  // Make sure we have the blockName.
  if (empty($block['blockName'])) {
    return $block_content;
  }
  // If this is a pagination block, enqueue the pagination script.
  if (
    'post-grid/woo-product-tabs' === $block['blockName']
  ) {
    wp_enqueue_script('pg-woo-product-tabs-scripts');
  }
  // Return the block content.
  return $block_content;
}, 10, 2);
function generateShortcode($params, $default)
{
  $shortcode = '[' . $default;
  foreach ($params as $key => $value) {
    if (!empty($value)) {
      $shortcode .= ' ' . $key . '="' . $value . '"';
    }
  }
  $shortcode .= ']';
  return $shortcode;
}
function post_grid_breadcrumb_dynamic_links()
{
  $home_url = get_bloginfo('url');
  $breadcrumb_home_text = "Home";
  $breadcrumb_display_home = "yes";
  $active_plugins = get_option('active_plugins');
  $array_list = [];
  if (is_front_page() && is_home()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $home_url,
        'label' => ($breadcrumb_home_text),
      );
  } elseif (is_front_page()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $home_url,
        'label' => ($breadcrumb_home_text),
      );
  } elseif (is_home()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => ($breadcrumb_home_text),
      );
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $home_url,
      'label' => __('Blog', 'post-grid'),
    );
  } else if (is_attachment()) {
    $current_attachment_id = get_query_var('attachment_id');
    $current_attachment_link = get_attachment_link($current_attachment_id);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => ($breadcrumb_home_text),
      );
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $current_attachment_link,
      'label' => get_the_title(),
    );
  } else if (in_array('woocommerce/woocommerce.php', (array) $active_plugins) && is_woocommerce() && is_shop()) {
    $shop_page_id = wc_get_page_id('shop');
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($shop_page_id),
      'label' => get_the_title($shop_page_id),
    );
  } else if (is_page()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    global $post;
    $home = get_post(get_option('page_on_front'));
    $j = 2;
    for ($i = count($post->ancestors) - 1; $i >= 0; $i--) {
      if (($home->ID) != ($post->ancestors[$i])) {
        $array_list[] = array(
          'link' => get_permalink($post->ancestors[$i]),
          'label' => get_the_title($post->ancestors[$i]),
        );
      }
      $j++;
    }
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash :  get_permalink($post->ID),
      'label' => get_the_title($post->ID),
    );
  } else if (is_singular()) {
    if (is_preview()) {
      $array_list[] = array(
        'link' => '#',
        'label' => __('Post preview', 'post-grid'),
      );
      return $array_list;
    }
    $permalink_structure = get_option('permalink_structure', true);
    //        $permalink_structure = str_replace('%postname%','',$permalink_structure);
    //        $permalink_structure = str_replace('%post_id%','',$permalink_structure);
    $permalink_items = array_filter(explode('/', $permalink_structure));
    global $post;
    $author_id = $post->post_author;
    $author_posts_url = get_author_posts_url($author_id);
    $author_name = get_the_author_meta('display_name', $author_id);
    $post_date_year = get_the_time('Y');
    $post_date_month = get_the_time('m');
    $post_date_day = get_the_time('d');
    $get_month_link = get_month_link($post_date_year, $post_date_month);
    $get_year_link = get_year_link($post_date_year);
    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    if (!empty($permalink_structure) && get_post_type() == 'post') {
      $item_count = 2;
      foreach ($permalink_items as $item) :
        if ($item == '%year%') {
          $array_list[] = array(
            'link' => $get_year_link,
            'label' => $post_date_year,
          );
        } elseif ($item == '%monthnum%') {
          $array_list[] = array(
            'link' => $get_month_link,
            'label' => $post_date_month,
          );
        } elseif ($item == '%day%') {
          $array_list[] = array(
            'link' => $get_day_link,
            'label' => $post_date_day,
          );
        } elseif ($item == '%author%') {
          $array_list[] = array(
            'link' => $author_posts_url,
            'label' => $author_name,
          );
        } elseif ($item == '%post_id%') {
          $array_list[] = array(
            'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
            'label' => $post->ID,
          );
        } elseif ($item == '%postname%') {
          $array_list[] = array(
            'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
            'label' => get_the_title($post->ID),
          );
        } elseif ($item == 'archives') {
          $array_list[] = array(
            'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
            'label' => __('Archives', 'post-grid'),
          );
        } elseif ($item == '%category%') {
          $category_string = get_query_var('category_name');
          $category_arr = array();
          $taxonomy = 'category';
          if (strpos($category_string, '/')) {
            $category_arr = explode('/', $category_string);
            $category_count = count($category_arr);
            $last_cat = $category_arr[($category_count - 1)];
            $term_data = get_term_by('slug', $last_cat, $taxonomy);
            $term_id = $term_data->term_id;
            $term_name = $term_data->name;
            $term_link = get_term_link($term_id, $taxonomy);
            $parents_id  = get_ancestors($term_id, $taxonomy);
            $parents_id = array_reverse($parents_id);
            $i = $item_count + 1;
            foreach ($parents_id as $id) {
              $parent_term_link = get_term_link($id, $taxonomy);
              $paren_term_name = get_term_by('id', $id, $taxonomy);
              $array_list[] = array(
                'link' => $parent_term_link,
                'label' => $paren_term_name->name,
              );
              $i++;
            }
            $array_list[] = array(
              'link' => $term_link,
              'label' => $term_name,
            );
          } else {
            $term_data = get_term_by('slug', $category_string, $taxonomy);
            $term_id = isset($term_data->term_id) ? $term_data->term_id : '';
            $term_name = isset($term_data->name) ? $term_data->name : '';
            if (!empty($term_id)) :
              $term_link = get_term_link($term_id, $taxonomy);
              $array_list[] = array(
                'link' => $term_link,
                'label' => $term_name,
              );
            endif;
          }
        }
        $item_count++;
      endforeach;
    } elseif (get_post_type() == 'product') {
      $shop_page_id = wc_get_page_id('shop');
      $woocommerce_permalinks = get_option('woocommerce_permalinks', '');
      $product_base = $woocommerce_permalinks['product_base'];
      $permalink_items = array_filter(explode('/', $product_base));
      if (in_array('shop', $permalink_items)) {
        $array_list[] = array(
          'link' => get_permalink($shop_page_id),
          'label' => get_the_title($shop_page_id),
        );
      }
      if (in_array('%product_cat%', $permalink_items)) {
        $category_string = get_query_var('product_cat');
        //$category_string = get_query_var('category_name');
        $category_arr = array();
        $taxonomy = 'product_cat';
        if (strpos($category_string, '/')) {
          $category_arr = explode('/', $category_string);
          $category_count = count($category_arr);
          $last_cat = $category_arr[($category_count - 1)];
          $term_data = get_term_by('slug', $last_cat, $taxonomy);
          $term_id = $term_data->term_id;
          $term_name = $term_data->name;
          $term_link = get_term_link($term_id, $taxonomy);
          $parents_id  = get_ancestors($term_id, $taxonomy);
          $parents_id = array_reverse($parents_id);
          $i = 3;
          foreach ($parents_id as $id) {
            $parent_term_link = get_term_link($id, $taxonomy);
            $paren_term_name = get_term_by('id', $id, $taxonomy);
            $array_list[] = array(
              'link' => $parent_term_link,
              'label' => $paren_term_name->name,
            );
            $i++;
          }
          $array_list[] = array(
            'link' => $term_link,
            'label' => $term_name,
          );
        } else {
          $term_data = get_term_by('slug', $category_string, $taxonomy);
          $term_id = isset($term_data->term_id) ? $term_data->term_id : '';
          $term_name = isset($term_data->name) ? $term_data->name : '';
          if (!empty($term_id)) :
            $term_link = get_term_link($term_id, $taxonomy);
            $array_list[] = array(
              'link' => $term_link,
              'label' => $term_name,
            );
            $array_list[] = array(
              'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
              'label' => get_the_title($post->ID),
            );
          endif;
        }
      }
      $array_list_count = count($array_list);
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
        'label' => get_the_title($post->ID),
      );
      //            $array_list[3] = array(
      //                'link'=>get_permalink($post->ID),
      //                'label' => get_the_title($post->ID),
      //            );
    } else {
      $postType = get_post_type();
      $pt = get_post_type_object($postType);
      $posTypeName = isset($pt->labels->singular_name) ? $pt->labels->singular_name : $postType;
      $array_list[] = array(
        'link' => '#',
        'label' => $posTypeName,
      );
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
        'label' => get_the_title($post->ID),
      );
    }
  } else if (is_tax()) {
    $queried_object = get_queried_object();
    $term_name = $queried_object->name;
    $term_id = $queried_object->term_id;
    $taxonomy = $queried_object->taxonomy;
    $term_link = get_term_link($term_id, $taxonomy);
    $parents_id  = get_ancestors($term_id, $taxonomy);
    $parents_id = array_reverse($parents_id);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $i = 2;
    foreach ($parents_id as $id) {
      $parent_term_link = get_term_link($id, $taxonomy);
      $paren_term_name = get_term_by('id', $id, $taxonomy);
      $array_list[] = array(
        'link' => $parent_term_link,
        'label' => $paren_term_name->name,
      );
      $i++;
    }
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $term_link,
      'label' => $term_name,
    );
  } else if (is_category()) {
    $current_cat_id = get_query_var('cat');
    $queried_object = get_queried_object();
    $taxonomy = $queried_object->taxonomy;
    $term_id = $queried_object->term_id;
    $term_name = $queried_object->name;
    $term_link = get_term_link($term_id, $taxonomy);
    $parents_id  = get_ancestors($term_id, $taxonomy);
    $parents_id = array_reverse($parents_id);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => $taxonomy,
    );
    $i = 3;
    foreach ($parents_id as $id) {
      $parent_term_link = get_term_link($id, $taxonomy);
      $paren_term_name = get_term_by('id', $id, $taxonomy);
      $array_list[] = array(
        'link' => $parent_term_link,
        'label' => $paren_term_name->name,
      );
      $i++;
    }
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $term_link,
      'label' => $term_name,
    );
  } else if (is_tag()) {
    $current_tag_id = get_query_var('tag_id');
    $current_tag = get_tag($current_tag_id);
    $current_tag_name = $current_tag->name;
    $current_tag_link = get_tag_link($current_tag_id);;
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Tag', 'post-grid'),
    );
    $array_list[] = array(
      'link' =>  !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $current_tag_link,
      'label' => $current_tag_name,
    );
  } else if (is_author()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Author', 'post-grid'),
    );
    $array_list[] = array(
      'link' =>  !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_author_posts_url(get_the_author_meta("ID")),
      'label' => get_the_author(),
    );
  } else if (is_search()) {
    $current_query = sanitize_text_field(get_query_var('s'));
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' =>  '#',
      'label' => __('Search', 'post-grid'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => $current_query,
    );
  } else if (is_year()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Year', 'post-grid'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => get_the_date('Y'),
    );
  } else if (is_month()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Month', 'post-grid'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => get_the_date('F'),
    );
  } else if (is_date()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Date', 'post-grid'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => get_the_date(),
    );
  } elseif (is_404()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' =>  '#',
      'label' => __('404', 'post-grid'),
    );
  }
  return $array_list;
}
function pg_tag_escape($tag)
{
  $tag = strtolower(preg_replace('/[^a-zA-Z0-9-_:]/', '', $tag));
  $allowed_tags = ['section', 'strong', 'template', 'fieldset', 'figcaption', 'figure', 'blockquote', 'article', 'address', 'code', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'a', 'button', 'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot', 'caption', 'br'];
  if (in_array($tag, $allowed_tags)) {
    return $tag;
  } else {
    return 'div';
  }
}
function custom_wpkses_post_tags($tags, $context)
{
  //if ('post' === $context) {
  $tags['iframe'] = array(
    'src'             => true,
    'height'          => true,
    'width'           => true,
    'frameborder'     => true,
    'allowfullscreen' => true,
  );
  //}
  return $tags;
}
add_filter('wp_kses_allowed_html', 'custom_wpkses_post_tags', 10, 2);



//add_action('wp_footer', 'post_grid_check_sidebars', 99);
function post_grid_check_sidebars()
{

  //global $sidebars_widgets;
  $sidebar_widgets = wp_get_sidebars_widgets();

  //var_dump($sidebar_widgets);


  if (!empty($sidebar_widgets)):
    foreach ($sidebar_widgets as $sidebars_index => $sidebars):

      foreach ($sidebars as $widget_id) {
        //$sidebar_content = get_sidebar_content(); // Your custom function to get the content
        var_dump($widget_id);

         ob_start();
        dynamic_sidebar($widget_id);
        $sidebar_html = ob_get_clean();

        error_log($sidebar_html);



        //var_dump($widget_instance);
      }


    endforeach;


  endif;
}
