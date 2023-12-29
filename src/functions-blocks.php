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



?>


  <?php
}
function parse_css_class($classStr, $obj)
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

      // $itemX = str_replace('currentYear', $objId, $item);

      $prams = str_replace(['currentYear[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = date($format);
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
      $newArr[$index] = $postmeta[0];
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


    if ($val) {
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>" />
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
        'title' => __('Post Grid - Post Element', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-tools',
        'title' => __('Post Grid - Tools', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-woo',
        'title' => __('Post Grid - WooCommerce', 'boilerplate'),
      ),
      array(
        'slug' => 'post-grid-archive',
        'title' => __('Post Grid - Archive', 'boilerplate'),
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

  if (!empty($fonts)) {
  ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>" />
  <?php

  }

  ?>


  <style>
    <?php echo ($reponsiveCss); ?>
  </style>

<?php



}
add_action('wp_footer', 'post_grid_page_styles', 999);


function post_grid_font_family()
{

  $post_grid_block_editor = get_option('post_grid_block_editor');
  $customFonts = isset($post_grid_block_editor['customFonts']) ? $post_grid_block_editor['customFonts'] : [];

  $faceStr = '';

  foreach ($customFonts as $face) {

    $fontFamily = $face['family'];
    $src = $face['src'][0]['url'];
    $fontWeight = $face['weight'];

    $faceStr .= "@font-face {
    font-family: '$fontFamily';
    src: url('$src');
    font-weight: $fontWeight;
  }";
  }
?>
  <style>
    <?php echo ($faceStr); ?>
  </style>
<?php
}
add_action('wp_footer', 'post_grid_font_family', 999);





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
