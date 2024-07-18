<?php
if (!defined('ABSPATH'))
  exit; // if direct access











register_meta('post', 'pgc_meta', [
  'type' => 'string',
  'single' => true,
  'show_in_rest' => true,
]);




function parse_css_class($classStr, $obj)
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



function parse_css_classX($classStr, $obj)
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
      $query_args['number'] = $val;
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


?>
  <script>
    var post_grid_vars = <?php echo (wp_json_encode($postGridScriptData)); ?>
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
        'slug' => 'post-grid-post',
        'title' => __('Combo Blocks - Post Element', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-tools',
        'title' => __('Combo Blocks - Tools', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-woo',
        'title' => __('Combo Blocks - WooCommerce', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-archive',
        'title' => __('Combo Blocks - Archive', 'boilerplate'),
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


  <style>
    <?php echo ($reponsiveCss);
    ?>
  </style>

<?php



}
add_action('wp_footer', 'post_grid_global_styles', 80);


function post_grid_global_styles()
{

  global $postGridFonts;


  //$url = $_SERVER['REQUEST_URI'];


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


  <style>
    <?php echo ($reponsiveCss);
    ?>
  </style>

  <?php



}
add_action('wp_footer', 'post_grid_page_styles', 80);


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

  //echo '###############';


  if (!empty($fonts)) {
  ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>&display=swap" />
  <?php

  }

  ?>

  <style>
    <?php echo ($reponsiveCss);
    ?>
  </style>

<?php

}
add_action('wp_footer', 'post_grid_global_cssY', 99);
add_action('elementor/editor/init', 'post_grid_global_cssY');


function post_grid_font_family()
{

  $post_grid_block_editor = get_option('post_grid_block_editor');
  $customFonts = isset($post_grid_block_editor['customFonts']) ? $post_grid_block_editor['customFonts'] : [];

  $faceStr = '';

  foreach ($customFonts as $face) {

    $src =


      $fontFamily = isset($face['family']) ? $face['family'] : '';
    $src = isset($face['src'][0]['url']) ? $face['src'][0]['url'] : '';
    $fontWeight = isset($face['weight']) ? $face['weight'] : '';

    $faceStr .= "@font-face {
    font-family: '$fontFamily';
    src: url('$src');
    font-weight: $fontWeight;
  }";
  }
?>
  <style>
    <?php echo esc_html($faceStr);
    ?>
  </style>
<?php
}
add_action('wp_footer', 'post_grid_font_family', 999);


add_action('elementor/editor/init', 'post_grid_font_family');



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

  // @new
  $file             = array();
  $file['error']    = $data['error'];
  $file['tmp_name'] = $data['tmp_name'];
  $file['name']     = $data['name'];
  $file['type']     = $data['type'];
  $file['size']     = filesize($data['tmp_name']);

  // upload file to server
  // @new use $file instead of $image_upload
  $file_return      = wp_handle_sideload($file, array('test_form' => false));

  $filename = $file_return['file'];
  $attachment = array(
    'post_mime_type' => $file_return['type'],
    'post_title' => preg_replace('/\.[^.]+$/', '', basename($filename)),
    'post_content' => '',
    'post_status' => 'inherit',
    'guid' => esc_url_raw($upload_dir['url']) . '/' . basename($filename)
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
      'AF' => __('Afghanistan', 'example'),
      'AL' => __('Albania', 'example'),
      'DZ' => __('Algeria', 'example'),
      'AS' => __('American Samoa', 'example'),
      'AD' => __('Andorra', 'example'),
      'AO' => __('Angola', 'example'),
      'AI' => __('Anguilla', 'example'),
      'AQ' => __('Antarctica', 'example'),
      'AG' => __('Antigua and Barbuda', 'example'),
      'AR' => __('Argentina', 'example'),
      'AM' => __('Armenia', 'example'),
      'AW' => __('Aruba', 'example'),
      'AU' => __('Australia', 'example'),
      'AT' => __('Austria', 'example'),
      'AZ' => __('Azerbaijan', 'example'),
      'BS' => __('Bahamas', 'example'),
      'BH' => __('Bahrain', 'example'),
      'BD' => __('Bangladesh', 'example'),
      'BB' => __('Barbados', 'example'),
      'BY' => __('Belarus', 'example'),
      'BE' => __('Belgium', 'example'),
      'BZ' => __('Belize', 'example'),
      'BJ' => __('Benin', 'example'),
      'BM' => __('Bermuda', 'example'),
      'BT' => __('Bhutan', 'example'),
      'BO' => __('Bolivia', 'example'),
      'BA' => __('Bosnia and Herzegovina', 'example'),
      'BW' => __('Botswana', 'example'),
      'BV' => __('Bouvet Island', 'example'),
      'BR' => __('Brazil', 'example'),
      'BQ' => __('British Antarctic Territory', 'example'),
      'IO' => __('British Indian Ocean Territory', 'example'),
      'VG' => __('British Virgin Islands', 'example'),
      'BN' => __('Brunei', 'example'),
      'BG' => __('Bulgaria', 'example'),
      'BF' => __('Burkina Faso', 'example'),
      'BI' => __('Burundi', 'example'),
      'KH' => __('Cambodia', 'example'),
      'CM' => __('Cameroon', 'example'),
      'CA' => __('Canada', 'example'),
      'CT' => __('Canton and Enderbury Islands', 'example'),
      'CV' => __('Cape Verde', 'example'),
      'KY' => __('Cayman Islands', 'example'),
      'CF' => __('Central African Republic', 'example'),
      'TD' => __('Chad', 'example'),
      'CL' => __('Chile', 'example'),
      'CN' => __('China', 'example'),
      'CX' => __('Christmas Island', 'example'),
      'CC' => __('Cocos [Keeling] Islands', 'example'),
      'CO' => __('Colombia', 'example'),
      'KM' => __('Comoros', 'example'),
      'CG' => __('Congo - Brazzaville', 'example'),
      'CD' => __('Congo - Kinshasa', 'example'),
      'CK' => __('Cook Islands', 'example'),
      'CR' => __('Costa Rica', 'example'),
      'HR' => __('Croatia', 'example'),
      'CU' => __('Cuba', 'example'),
      'CY' => __('Cyprus', 'example'),
      'CZ' => __('Czech Republic', 'example'),
      'CI' => __('Côte d’Ivoire', 'example'),
      'DK' => __('Denmark', 'example'),
      'DJ' => __('Djibouti', 'example'),
      'DM' => __('Dominica', 'example'),
      'DO' => __('Dominican Republic', 'example'),
      'NQ' => __('Dronning Maud Land', 'example'),
      'DD' => __('East Germany', 'example'),
      'EC' => __('Ecuador', 'example'),
      'EG' => __('Egypt', 'example'),
      'SV' => __('El Salvador', 'example'),
      'GQ' => __('Equatorial Guinea', 'example'),
      'ER' => __('Eritrea', 'example'),
      'EE' => __('Estonia', 'example'),
      'ET' => __('Ethiopia', 'example'),
      'FK' => __('Falkland Islands', 'example'),
      'FO' => __('Faroe Islands', 'example'),
      'FJ' => __('Fiji', 'example'),
      'FI' => __('Finland', 'example'),
      'FR' => __('France', 'example'),
      'GF' => __('French Guiana', 'example'),
      'PF' => __('French Polynesia', 'example'),
      'TF' => __('French Southern Territories', 'example'),
      'FQ' => __('French Southern and Antarctic Territories', 'example'),
      'GA' => __('Gabon', 'example'),
      'GM' => __('Gambia', 'example'),
      'GE' => __('Georgia', 'example'),
      'DE' => __('Germany', 'example'),
      'GH' => __('Ghana', 'example'),
      'GI' => __('Gibraltar', 'example'),
      'GR' => __('Greece', 'example'),
      'GL' => __('Greenland', 'example'),
      'GD' => __('Grenada', 'example'),
      'GP' => __('Guadeloupe', 'example'),
      'GU' => __('Guam', 'example'),
      'GT' => __('Guatemala', 'example'),
      'GG' => __('Guernsey', 'example'),
      'GN' => __('Guinea', 'example'),
      'GW' => __('Guinea-Bissau', 'example'),
      'GY' => __('Guyana', 'example'),
      'HT' => __('Haiti', 'example'),
      'HM' => __('Heard Island and McDonald Islands', 'example'),
      'HN' => __('Honduras', 'example'),
      'HK' => __('Hong Kong SAR China', 'example'),
      'HU' => __('Hungary', 'example'),
      'IS' => __('Iceland', 'example'),
      'IN' => __('India', 'example'),
      'ID' => __('Indonesia', 'example'),
      'IR' => __('Iran', 'example'),
      'IQ' => __('Iraq', 'example'),
      'IE' => __('Ireland', 'example'),
      'IM' => __('Isle of Man', 'example'),
      'IL' => __('Israel', 'example'),
      'IT' => __('Italy', 'example'),
      'JM' => __('Jamaica', 'example'),
      'JP' => __('Japan', 'example'),
      'JE' => __('Jersey', 'example'),
      'JT' => __('Johnston Island', 'example'),
      'JO' => __('Jordan', 'example'),
      'KZ' => __('Kazakhstan', 'example'),
      'KE' => __('Kenya', 'example'),
      'KI' => __('Kiribati', 'example'),
      'KW' => __('Kuwait', 'example'),
      'KG' => __('Kyrgyzstan', 'example'),
      'LA' => __('Laos', 'example'),
      'LV' => __('Latvia', 'example'),
      'LB' => __('Lebanon', 'example'),
      'LS' => __('Lesotho', 'example'),
      'LR' => __('Liberia', 'example'),
      'LY' => __('Libya', 'example'),
      'LI' => __('Liechtenstein', 'example'),
      'LT' => __('Lithuania', 'example'),
      'LU' => __('Luxembourg', 'example'),
      'MO' => __('Macau SAR China', 'example'),
      'MK' => __('Macedonia', 'example'),
      'MG' => __('Madagascar', 'example'),
      'MW' => __('Malawi', 'example'),
      'MY' => __('Malaysia', 'example'),
      'MV' => __('Maldives', 'example'),
      'ML' => __('Mali', 'example'),
      'MT' => __('Malta', 'example'),
      'MH' => __('Marshall Islands', 'example'),
      'MQ' => __('Martinique', 'example'),
      'MR' => __('Mauritania', 'example'),
      'MU' => __('Mauritius', 'example'),
      'YT' => __('Mayotte', 'example'),
      'FX' => __('Metropolitan France', 'example'),
      'MX' => __('Mexico', 'example'),
      'FM' => __('Micronesia', 'example'),
      'MI' => __('Midway Islands', 'example'),
      'MD' => __('Moldova', 'example'),
      'MC' => __('Monaco', 'example'),
      'MN' => __('Mongolia', 'example'),
      'ME' => __('Montenegro', 'example'),
      'MS' => __('Montserrat', 'example'),
      'MA' => __('Morocco', 'example'),
      'MZ' => __('Mozambique', 'example'),
      'MM' => __('Myanmar [Burma]', 'example'),
      'NA' => __('Namibia', 'example'),
      'NR' => __('Nauru', 'example'),
      'NP' => __('Nepal', 'example'),
      'NL' => __('Netherlands', 'example'),
      'AN' => __('Netherlands Antilles', 'example'),
      'NT' => __('Neutral Zone', 'example'),
      'NC' => __('New Caledonia', 'example'),
      'NZ' => __('New Zealand', 'example'),
      'NI' => __('Nicaragua', 'example'),
      'NE' => __('Niger', 'example'),
      'NG' => __('Nigeria', 'example'),
      'NU' => __('Niue', 'example'),
      'NF' => __('Norfolk Island', 'example'),
      'KP' => __('North Korea', 'example'),
      'VD' => __('North Vietnam', 'example'),
      'MP' => __('Northern Mariana Islands', 'example'),
      'NO' => __('Norway', 'example'),
      'OM' => __('Oman', 'example'),
      'PC' => __('Pacific Islands Trust Territory', 'example'),
      'PK' => __('Pakistan', 'example'),
      'PW' => __('Palau', 'example'),
      'PS' => __('Palestinian Territories', 'example'),
      'PA' => __('Panama', 'example'),
      'PZ' => __('Panama Canal Zone', 'example'),
      'PG' => __('Papua New Guinea', 'example'),
      'PY' => __('Paraguay', 'example'),
      'YD' => __('People\'s Democratic Republic of Yemen', 'example'),
      'PE' => __('Peru', 'example'),
      'PH' => __('Philippines', 'example'),
      'PN' => __('Pitcairn Islands', 'example'),
      'PL' => __('Poland', 'example'),
      'PT' => __('Portugal', 'example'),
      'PR' => __('Puerto Rico', 'example'),
      'QA' => __('Qatar', 'example'),
      'RO' => __('Romania', 'example'),
      'RU' => __('Russia', 'example'),
      'RW' => __('Rwanda', 'example'),
      'BL' => __('Saint Barthélemy', 'example'),
      'SH' => __('Saint Helena', 'example'),
      'KN' => __('Saint Kitts and Nevis', 'example'),
      'LC' => __('Saint Lucia', 'example'),
      'MF' => __('Saint Martin', 'example'),
      'PM' => __('Saint Pierre and Miquelon', 'example'),
      'VC' => __('Saint Vincent and the Grenadines', 'example'),
      'WS' => __('Samoa', 'example'),
      'SM' => __('San Marino', 'example'),
      'SA' => __('Saudi Arabia', 'example'),
      'SN' => __('Senegal', 'example'),
      'RS' => __('Serbia', 'example'),
      'CS' => __('Serbia and Montenegro', 'example'),
      'SC' => __('Seychelles', 'example'),
      'SL' => __('Sierra Leone', 'example'),
      'SG' => __('Singapore', 'example'),
      'SK' => __('Slovakia', 'example'),
      'SI' => __('Slovenia', 'example'),
      'SB' => __('Solomon Islands', 'example'),
      'SO' => __('Somalia', 'example'),
      'ZA' => __('South Africa', 'example'),
      'GS' => __('South Georgia and the South Sandwich Islands', 'example'),
      'KR' => __('South Korea', 'example'),
      'ES' => __('Spain', 'example'),
      'LK' => __('Sri Lanka', 'example'),
      'SD' => __('Sudan', 'example'),
      'SR' => __('Suriname', 'example'),
      'SJ' => __('Svalbard and Jan Mayen', 'example'),
      'SZ' => __('Swaziland', 'example'),
      'SE' => __('Sweden', 'example'),
      'CH' => __('Switzerland', 'example'),
      'SY' => __('Syria', 'example'),
      'ST' => __('São Tomé and Príncipe', 'example'),
      'TW' => __('Taiwan', 'example'),
      'TJ' => __('Tajikistan', 'example'),
      'TZ' => __('Tanzania', 'example'),
      'TH' => __('Thailand', 'example'),
      'TL' => __('Timor-Leste', 'example'),
      'TG' => __('Togo', 'example'),
      'TK' => __('Tokelau', 'example'),
      'TO' => __('Tonga', 'example'),
      'TT' => __('Trinidad and Tobago', 'example'),
      'TN' => __('Tunisia', 'example'),
      'TR' => __('Turkey', 'example'),
      'TM' => __('Turkmenistan', 'example'),
      'TC' => __('Turks and Caicos Islands', 'example'),
      'TV' => __('Tuvalu', 'example'),
      'UM' => __('U.S. Minor Outlying Islands', 'example'),
      'PU' => __('U.S. Miscellaneous Pacific Islands', 'example'),
      'VI' => __('U.S. Virgin Islands', 'example'),
      'UG' => __('Uganda', 'example'),
      'UA' => __('Ukraine', 'example'),
      'SU' => __('Union of Soviet Socialist Republics', 'example'),
      'AE' => __('United Arab Emirates', 'example'),
      'GB' => __('United Kingdom', 'example'),
      'US' => __('United States', 'example'),
      'ZZ' => __('Unknown or Invalid Region', 'example'),
      'UY' => __('Uruguay', 'example'),
      'UZ' => __('Uzbekistan', 'example'),
      'VU' => __('Vanuatu', 'example'),
      'VA' => __('Vatican City', 'example'),
      'VE' => __('Venezuela', 'example'),
      'VN' => __('Vietnam', 'example'),
      'WK' => __('Wake Island', 'example'),
      'WF' => __('Wallis and Futuna', 'example'),
      'EH' => __('Western Sahara', 'example'),
      'YE' => __('Yemen', 'example'),
      'ZM' => __('Zambia', 'example'),
      'ZW' => __('Zimbabwe', 'example'),
      'AX' => __('Åland Islands', 'example'),
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
      'AF' => __('Afghanistan', 'example'),
      'AL' => __('Albania', 'example'),
      'DZ' => __('Algeria', 'example'),
      'AS' => __('American Samoa', 'example'),
      'AD' => __('Andorra', 'example'),
      'AO' => __('Angola', 'example'),
      'AI' => __('Anguilla', 'example'),
      'AQ' => __('Antarctica', 'example'),
      'AG' => __('Antigua and Barbuda', 'example'),
      'AR' => __('Argentina', 'example'),
      'AM' => __('Armenia', 'example'),
      'AW' => __('Aruba', 'example'),
      'AU' => __('Australia', 'example'),
      'AT' => __('Austria', 'example'),
      'AZ' => __('Azerbaijan', 'example'),
      'BS' => __('Bahamas', 'example'),
      'BH' => __('Bahrain', 'example'),
      'BD' => __('Bangladesh', 'example'),
      'BB' => __('Barbados', 'example'),
      'BY' => __('Belarus', 'example'),
      'BE' => __('Belgium', 'example'),
      'BZ' => __('Belize', 'example'),
      'BJ' => __('Benin', 'example'),
      'BM' => __('Bermuda', 'example'),
      'BT' => __('Bhutan', 'example'),
      'BO' => __('Bolivia', 'example'),
      'BA' => __('Bosnia and Herzegovina', 'example'),
      'BW' => __('Botswana', 'example'),
      'BV' => __('Bouvet Island', 'example'),
      'BR' => __('Brazil', 'example'),
      'BQ' => __('British Antarctic Territory', 'example'),
      'IO' => __('British Indian Ocean Territory', 'example'),
      'VG' => __('British Virgin Islands', 'example'),
      'BN' => __('Brunei', 'example'),
      'BG' => __('Bulgaria', 'example'),
      'BF' => __('Burkina Faso', 'example'),
      'BI' => __('Burundi', 'example'),
      'KH' => __('Cambodia', 'example'),
      'CM' => __('Cameroon', 'example'),
      'CA' => __('Canada', 'example'),
      'CT' => __('Canton and Enderbury Islands', 'example'),
      'CV' => __('Cape Verde', 'example'),
      'KY' => __('Cayman Islands', 'example'),
      'CF' => __('Central African Republic', 'example'),
      'TD' => __('Chad', 'example'),
      'CL' => __('Chile', 'example'),
      'CN' => __('China', 'example'),
      'CX' => __('Christmas Island', 'example'),
      'CC' => __('Cocos [Keeling] Islands', 'example'),
      'CO' => __('Colombia', 'example'),
      'KM' => __('Comoros', 'example'),
      'CG' => __('Congo - Brazzaville', 'example'),
      'CD' => __('Congo - Kinshasa', 'example'),
      'CK' => __('Cook Islands', 'example'),
      'CR' => __('Costa Rica', 'example'),
      'HR' => __('Croatia', 'example'),
      'CU' => __('Cuba', 'example'),
      'CY' => __('Cyprus', 'example'),
      'CZ' => __('Czech Republic', 'example'),
      'CI' => __('Côte d’Ivoire', 'example'),
      'DK' => __('Denmark', 'example'),
      'DJ' => __('Djibouti', 'example'),
      'DM' => __('Dominica', 'example'),
      'DO' => __('Dominican Republic', 'example'),
      'NQ' => __('Dronning Maud Land', 'example'),
      'DD' => __('East Germany', 'example'),
      'EC' => __('Ecuador', 'example'),
      'EG' => __('Egypt', 'example'),
      'SV' => __('El Salvador', 'example'),
      'GQ' => __('Equatorial Guinea', 'example'),
      'ER' => __('Eritrea', 'example'),
      'EE' => __('Estonia', 'example'),
      'ET' => __('Ethiopia', 'example'),
      'FK' => __('Falkland Islands', 'example'),
      'FO' => __('Faroe Islands', 'example'),
      'FJ' => __('Fiji', 'example'),
      'FI' => __('Finland', 'example'),
      'FR' => __('France', 'example'),
      'GF' => __('French Guiana', 'example'),
      'PF' => __('French Polynesia', 'example'),
      'TF' => __('French Southern Territories', 'example'),
      'FQ' => __('French Southern and Antarctic Territories', 'example'),
      'GA' => __('Gabon', 'example'),
      'GM' => __('Gambia', 'example'),
      'GE' => __('Georgia', 'example'),
      'DE' => __('Germany', 'example'),
      'GH' => __('Ghana', 'example'),
      'GI' => __('Gibraltar', 'example'),
      'GR' => __('Greece', 'example'),
      'GL' => __('Greenland', 'example'),
      'GD' => __('Grenada', 'example'),
      'GP' => __('Guadeloupe', 'example'),
      'GU' => __('Guam', 'example'),
      'GT' => __('Guatemala', 'example'),
      'GG' => __('Guernsey', 'example'),
      'GN' => __('Guinea', 'example'),
      'GW' => __('Guinea-Bissau', 'example'),
      'GY' => __('Guyana', 'example'),
      'HT' => __('Haiti', 'example'),
      'HM' => __('Heard Island and McDonald Islands', 'example'),
      'HN' => __('Honduras', 'example'),
      'HK' => __('Hong Kong SAR China', 'example'),
      'HU' => __('Hungary', 'example'),
      'IS' => __('Iceland', 'example'),
      'IN' => __('India', 'example'),
      'ID' => __('Indonesia', 'example'),
      'IR' => __('Iran', 'example'),
      'IQ' => __('Iraq', 'example'),
      'IE' => __('Ireland', 'example'),
      'IM' => __('Isle of Man', 'example'),
      'IL' => __('Israel', 'example'),
      'IT' => __('Italy', 'example'),
      'JM' => __('Jamaica', 'example'),
      'JP' => __('Japan', 'example'),
      'JE' => __('Jersey', 'example'),
      'JT' => __('Johnston Island', 'example'),
      'JO' => __('Jordan', 'example'),
      'KZ' => __('Kazakhstan', 'example'),
      'KE' => __('Kenya', 'example'),
      'KI' => __('Kiribati', 'example'),
      'KW' => __('Kuwait', 'example'),
      'KG' => __('Kyrgyzstan', 'example'),
      'LA' => __('Laos', 'example'),
      'LV' => __('Latvia', 'example'),
      'LB' => __('Lebanon', 'example'),
      'LS' => __('Lesotho', 'example'),
      'LR' => __('Liberia', 'example'),
      'LY' => __('Libya', 'example'),
      'LI' => __('Liechtenstein', 'example'),
      'LT' => __('Lithuania', 'example'),
      'LU' => __('Luxembourg', 'example'),
      'MO' => __('Macau SAR China', 'example'),
      'MK' => __('Macedonia', 'example'),
      'MG' => __('Madagascar', 'example'),
      'MW' => __('Malawi', 'example'),
      'MY' => __('Malaysia', 'example'),
      'MV' => __('Maldives', 'example'),
      'ML' => __('Mali', 'example'),
      'MT' => __('Malta', 'example'),
      'MH' => __('Marshall Islands', 'example'),
      'MQ' => __('Martinique', 'example'),
      'MR' => __('Mauritania', 'example'),
      'MU' => __('Mauritius', 'example'),
      'YT' => __('Mayotte', 'example'),
      'FX' => __('Metropolitan France', 'example'),
      'MX' => __('Mexico', 'example'),
      'FM' => __('Micronesia', 'example'),
      'MI' => __('Midway Islands', 'example'),
      'MD' => __('Moldova', 'example'),
      'MC' => __('Monaco', 'example'),
      'MN' => __('Mongolia', 'example'),
      'ME' => __('Montenegro', 'example'),
      'MS' => __('Montserrat', 'example'),
      'MA' => __('Morocco', 'example'),
      'MZ' => __('Mozambique', 'example'),
      'MM' => __('Myanmar [Burma]', 'example'),
      'NA' => __('Namibia', 'example'),
      'NR' => __('Nauru', 'example'),
      'NP' => __('Nepal', 'example'),
      'NL' => __('Netherlands', 'example'),
      'AN' => __('Netherlands Antilles', 'example'),
      'NT' => __('Neutral Zone', 'example'),
      'NC' => __('New Caledonia', 'example'),
      'NZ' => __('New Zealand', 'example'),
      'NI' => __('Nicaragua', 'example'),
      'NE' => __('Niger', 'example'),
      'NG' => __('Nigeria', 'example'),
      'NU' => __('Niue', 'example'),
      'NF' => __('Norfolk Island', 'example'),
      'KP' => __('North Korea', 'example'),
      'VD' => __('North Vietnam', 'example'),
      'MP' => __('Northern Mariana Islands', 'example'),
      'NO' => __('Norway', 'example'),
      'OM' => __('Oman', 'example'),
      'PC' => __('Pacific Islands Trust Territory', 'example'),
      'PK' => __('Pakistan', 'example'),
      'PW' => __('Palau', 'example'),
      'PS' => __('Palestinian Territories', 'example'),
      'PA' => __('Panama', 'example'),
      'PZ' => __('Panama Canal Zone', 'example'),
      'PG' => __('Papua New Guinea', 'example'),
      'PY' => __('Paraguay', 'example'),
      'YD' => __('People\'s Democratic Republic of Yemen', 'example'),
      'PE' => __('Peru', 'example'),
      'PH' => __('Philippines', 'example'),
      'PN' => __('Pitcairn Islands', 'example'),
      'PL' => __('Poland', 'example'),
      'PT' => __('Portugal', 'example'),
      'PR' => __('Puerto Rico', 'example'),
      'QA' => __('Qatar', 'example'),
      'RO' => __('Romania', 'example'),
      'RU' => __('Russia', 'example'),
      'RW' => __('Rwanda', 'example'),
      'BL' => __('Saint Barthélemy', 'example'),
      'SH' => __('Saint Helena', 'example'),
      'KN' => __('Saint Kitts and Nevis', 'example'),
      'LC' => __('Saint Lucia', 'example'),
      'MF' => __('Saint Martin', 'example'),
      'PM' => __('Saint Pierre and Miquelon', 'example'),
      'VC' => __('Saint Vincent and the Grenadines', 'example'),
      'WS' => __('Samoa', 'example'),
      'SM' => __('San Marino', 'example'),
      'SA' => __('Saudi Arabia', 'example'),
      'SN' => __('Senegal', 'example'),
      'RS' => __('Serbia', 'example'),
      'CS' => __('Serbia and Montenegro', 'example'),
      'SC' => __('Seychelles', 'example'),
      'SL' => __('Sierra Leone', 'example'),
      'SG' => __('Singapore', 'example'),
      'SK' => __('Slovakia', 'example'),
      'SI' => __('Slovenia', 'example'),
      'SB' => __('Solomon Islands', 'example'),
      'SO' => __('Somalia', 'example'),
      'ZA' => __('South Africa', 'example'),
      'GS' => __('South Georgia and the South Sandwich Islands', 'example'),
      'KR' => __('South Korea', 'example'),
      'ES' => __('Spain', 'example'),
      'LK' => __('Sri Lanka', 'example'),
      'SD' => __('Sudan', 'example'),
      'SR' => __('Suriname', 'example'),
      'SJ' => __('Svalbard and Jan Mayen', 'example'),
      'SZ' => __('Swaziland', 'example'),
      'SE' => __('Sweden', 'example'),
      'CH' => __('Switzerland', 'example'),
      'SY' => __('Syria', 'example'),
      'ST' => __('São Tomé and Príncipe', 'example'),
      'TW' => __('Taiwan', 'example'),
      'TJ' => __('Tajikistan', 'example'),
      'TZ' => __('Tanzania', 'example'),
      'TH' => __('Thailand', 'example'),
      'TL' => __('Timor-Leste', 'example'),
      'TG' => __('Togo', 'example'),
      'TK' => __('Tokelau', 'example'),
      'TO' => __('Tonga', 'example'),
      'TT' => __('Trinidad and Tobago', 'example'),
      'TN' => __('Tunisia', 'example'),
      'TR' => __('Turkey', 'example'),
      'TM' => __('Turkmenistan', 'example'),
      'TC' => __('Turks and Caicos Islands', 'example'),
      'TV' => __('Tuvalu', 'example'),
      'UM' => __('U.S. Minor Outlying Islands', 'example'),
      'PU' => __('U.S. Miscellaneous Pacific Islands', 'example'),
      'VI' => __('U.S. Virgin Islands', 'example'),
      'UG' => __('Uganda', 'example'),
      'UA' => __('Ukraine', 'example'),
      'SU' => __('Union of Soviet Socialist Republics', 'example'),
      'AE' => __('United Arab Emirates', 'example'),
      'GB' => __('United Kingdom', 'example'),
      'US' => __('United States', 'example'),
      'ZZ' => __('Unknown or Invalid Region', 'example'),
      'UY' => __('Uruguay', 'example'),
      'UZ' => __('Uzbekistan', 'example'),
      'VU' => __('Vanuatu', 'example'),
      'VA' => __('Vatican City', 'example'),
      'VE' => __('Venezuela', 'example'),
      'VN' => __('Vietnam', 'example'),
      'WK' => __('Wake Island', 'example'),
      'WF' => __('Wallis and Futuna', 'example'),
      'EH' => __('Western Sahara', 'example'),
      'YE' => __('Yemen', 'example'),
      'ZM' => __('Zambia', 'example'),
      'ZW' => __('Zimbabwe', 'example'),
      'AX' => __('Åland Islands', 'example'),
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


      //echo "<p>" . $id . "</p>";

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


        $queryArray = array();
        parse_str($_SERVER['QUERY_STRING'], $queryArray);

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
