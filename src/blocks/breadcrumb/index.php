<?php
if (!defined('ABSPATH')) exit();



class PGBlockBreadcrumb
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/social-share-x/index.css');
        // wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/social-share-x/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/breadcrumb', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  array(
                'wrapper' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'textAlign' => [],
                            'color' => [],
                            'bgColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'icon' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'icon',
                            'position' => 'beforeLabel',
                        ),
                        'styles' =>
                        array(
                            'textAlign' => [],
                            'color' => [],
                            'bgColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'label' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                        ),
                        'styles' =>
                        array(
                            'textAlign' => [],
                            'color' => [],
                            'bgColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'separator' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => '',
                            'text' => '»',
                        ),
                        'styles' =>
                        array(
                            'textAlign' => [],
                            'color' => [],
                            'bgColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'elements' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'linkTarget' => '_blank',
                            'showLabel' => true,
                            'showSeparator' => true,
                            'showIcon' => false,
                            'iconPositon' => 'beforeLabel',
                        ),
                        'styles' =>
                        array(
                            'textAlign' => [],
                            'color' =>
                            array(
                                'Desktop' => '#18978F',
                            ),
                            'bgColor' => [],
                            'padding' => [],
                            'margin' =>
                            array(
                                'Desktop' =>
                                array(
                                    'top' => '5px',
                                    'right' => '5px',
                                    'bottom' => '5px',
                                    'left' => '5px',
                                ),
                            ),
                            'display' => [],
                            'borderRadius' => [],
                            'fontSize' =>
                            array(
                                'Desktop' =>
                                array(
                                    'val' => '35',
                                ),
                            ),
                            'lineHeight' => [],
                            'letterSpacing' => [],
                            'fontWeight' => [],
                            'textDecoration' => [],
                            'textTransform' => [],
                        ),
                        'items' =>
                        array(
                            0 =>
                            array(
                                'id' => 'text',
                                'label' => 'Text',
                                'customText' => '',
                                'url' => '',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(
                                    'text' => 'You are here: ',
                                    'showSeparator' => true,
                                ),
                                'styles' =>
                                array(
                                    'textAlign' => [],
                                    'color' => [],
                                    'bgColor' => [],
                                    'padding' => [],
                                    'margin' => [],
                                    'display' => [],
                                ),
                            ),
                            1 =>
                            array(
                                'id' => 'homePage',
                                'label' => 'Home Page Link',
                                'customText' => '',
                                'url' => '',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(
                                    'showSeparator' => true,
                                ),
                                'styles' =>
                                array(
                                    'textAlign' => [],
                                    'color' => [],
                                    'bgColor' => [],
                                    'padding' => [],
                                    'margin' => [],
                                    'display' => [],
                                ),
                            ),
                            2 =>
                            array(
                                'id' => 'postTitle',
                                'label' => 'Post Title',
                                'customText' => '',
                                'url' => '',
                                'siteIcon' =>
                                array(
                                    'library' => 'fontAwesome',
                                    'srcType' => 'class',
                                    'iconSrc' => '',
                                ),
                                'options' =>
                                array(
                                    'showSeparator' => true,
                                ),
                                'styles' =>
                                array(
                                    'textAlign' => [],
                                    'color' => [],
                                    'bgColor' => [],
                                    'padding' => [],
                                    'margin' => [],
                                    'display' => [],
                                ),
                            ),
                        ),
                    ),
                ),
                'customCss' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'blockCssY' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' => [],
                    ),
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
            )


        ));
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


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = $block->context['postId'];
        $post_data = get_post($post_ID);

        $post_url = get_the_permalink($post_ID);
        $post_title = get_the_title($post_ID);
        $post_thumb_url = get_the_post_thumbnail_url($post_ID, 'full');


        $post_author_id = $post_data->post_author;
        //$author_data = get_user_by('ID', $post_author_id);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
        $wrapperClass = isset($wrapperStyles['class']) ? $wrapperStyles['class'] : '';

        $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
        $elementsOptions = isset($elements['options']) ? $elements['options'] : [];
        $elementsStyles = isset($elements['styles']) ? $elements['styles'] : [];
        $elementsItems = isset($elements['items']) ? $elements['items'] : [];
        $showLabel = isset($elementsOptions['showLabel']) ? $elementsOptions['showLabel'] : false;
        $showIcon = isset($elementsOptions['showIcon']) ? $elementsOptions['showIcon'] : true;
        $showSeparator = isset($elementsOptions['showSeparator']) ? $elementsOptions['showSeparator'] : false;



        $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconStyles = isset($icon['styles']) ? $icon['styles'] : [];
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';

        $label = isset($attributes['label']) ? $attributes['label'] : [];
        $labelOptions = isset($label['options']) ? $label['options'] : [];
        $labelStyles = isset($label['styles']) ? $label['styles'] : [];




        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
        $separatorStyles = isset($separator['styles']) ? $separator['styles'] : [];

        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : [];


        //$postGridCustomCss .= $customCss;
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];




        //error_log(serialize($elements));


?>


        <?php //echo var_export($post_thumb_url, true);
        ?>



        <?php





        $links = [];
        //var_dump($total);



        $i = 1;

        if (!empty($elementsItems))
            foreach ($elementsItems as $index => $item) {
                $id = isset($item['id']) ? $item['id'] : '';

                $label = isset($item['label']) ? $item['label'] : '';
                $customText = isset($item['customText']) ? $item['customText'] : '%s';

                $separator = isset($item['separator']) ? $item['separator'] : '»';
                $url = isset($item['url']) ? $item['url'] : '';

                $siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';

                $iconLibrary = isset($siteIcon['library']) ? $siteIcon['library'] : '';
                $iconSrcType = isset($siteIcon['srcType']) ? $siteIcon['srcType'] : '';
                $iconSrc = isset($siteIcon['iconSrc']) ? $siteIcon['iconSrc'] : '';

                //echo var_export($id, true);
                $linkData = [];


                if ($id == 'text') :

                    $links[] = [
                        'label' => (!empty($customText)) ? $customText : __('You are here: ', 'post-grid'),
                        'link' => $url
                    ];

                elseif ($id == 'homePage') :
                    $home_url = get_bloginfo('url');

                    $links[] = [
                        'label' => !empty($customText) ? $customText : __('Home', 'post-grid'),
                        'link' => $home_url
                    ];

                elseif ($id == 'frontPage') :
                    $post_id = get_option('page_on_front');
                    //echo var_export($post_id);

                    $post_url = get_permalink($post_id);
                    $post_title = get_the_title($post_id);
                    $customText = !empty($customText) ? $customText : '%s';


                    $links[] = [
                        'label' => sprintf($customText, $post_title),
                        'link' => $post_url
                    ];


                elseif ($id == 'postsPage') :
                    $post_id = get_option('page_for_posts');
                    //echo var_export($post_id);

                    $post_url = get_permalink($post_id);
                    $post_title = get_the_title($post_id);
                    $customText = !empty($customText) ? $customText : '%s';


                    $links[] = [
                        'label' => sprintf($customText, $post_title),
                        'link' => $post_url
                    ];


                elseif ($id == 'postTitle') :
                    $post_id = get_the_ID();
                    $post_url = get_permalink($post_id);
                    $post_title = get_the_title($post_id);
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $post_title),
                        'link' => $post_url
                    ];


                elseif ($id == 'postAuthor') :

                    $post_id = get_the_ID();
                    $post = get_post($post_id);
                    $author_id = $post->post_author;
                    $author_posts_url = get_author_posts_url($author_id);
                    $author_name = get_the_author_meta('display_name', $author_id);

                    $links[] = [
                        'label' => !empty($customText) ? $customText : $author_name,
                        'link' => $author_posts_url
                    ];


                elseif ($id == 'postDate') :

                    $format = !empty($item['options']['format']) ? $item['options']['format'] : 'Y-m-d';
                    $post_date = get_the_time($format);

                    //echo var_export($format, true);

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $links[] = [
                        'label' => sprintf($customText, $post_date),
                        'link' => $get_day_link
                    ];


                elseif ($id == 'postDay') :

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $links[] = [
                        'label' =>  sprintf($customText, $post_date_day),
                        'link' => $get_day_link
                    ];


                elseif ($id == 'postMonth') :

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $links[] = [
                        'label' =>  sprintf($customText, $post_date_month),
                        'link' => $get_month_link
                    ];

                elseif ($id == 'postYear') :

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $links[] = [
                        'label' =>  sprintf($customText, $post_date_year),
                        'link' => $get_year_link
                    ];


                elseif ($id == 'postAncestors') :

                    $count = !empty($item['options']['count']) ? (int)$item['options']['count'] : 0;

                    $post_id = get_the_ID();
                    $front_page_id = get_option('page_on_front');
                    $post = get_post($post_id);


                    $ancestors = isset($post->ancestors) ? $post->ancestors : [];
                    $ancestors = array_reverse($ancestors);

                    if ($count > 0) {
                        $ancestors = array_slice($ancestors, 0, $count);
                    } else {
                        $ancestors = array_slice($ancestors,  $count);
                    }


                    //echo '<pre>' . var_export($ancestors, true) . '</pre>';

                    foreach ($ancestors as $ancestor) {

                        $links[] = [
                            'label' =>  sprintf($customText, get_the_title($ancestor)),
                            'link' => get_permalink($ancestor)
                        ];
                    }



                elseif ($id == 'postId') :

                    $post_id = get_the_ID();
                    $post_url = get_permalink($post_id);


                    $links[] = [
                        'label' =>  sprintf($customText, $post_id),
                        'link' => $post_url
                    ];

                elseif ($id == 'postCategory') :

                    $taxonomy = 'category';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);


                    if ($term_obj_list == false) continue;

                    $term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
                    $term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';


                    $term_link = get_term_link($term_id, $taxonomy);
                    $customText = !empty($customText) ? $customText : '%s';

                    $linkData['label'] = sprintf($customText, $term_title);
                    $linkData['link'] = $term_link;

                    $links[] = [
                        'label' =>  sprintf($customText, $term_title),
                        'link' => $term_link
                    ];

                elseif ($id == 'postTag') :


                    $taxonomy = 'post_tag';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);


                    if ($term_obj_list == false) continue;

                    $term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
                    $term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';


                    $term_link = get_term_link($term_id, $taxonomy);
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' =>  sprintf($customText, $term_title),
                        'link' => $term_link
                    ];


                elseif ($id == 'postCategories') :

                    $taxonomy = 'category';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);


                    if ($term_obj_list == false) continue;

                    if (!empty($term_obj_list)) :
                        foreach ($term_obj_list as $term) {

                            $term_id = isset($term->term_id) ? $term->term_id : '';
                            $term_title = isset($term->name) ? $term->name : '';


                            $term_link = get_term_link($term_id, $taxonomy);
                            $customText = !empty($customText) ? $customText : '%s';

                            $linkData['label'] = sprintf($customText, $term_title);
                            $linkData['link'] = $term_link;

                            $links[] = [
                                'label' =>  sprintf($customText, $term_title),
                                'link' => $term_link
                            ];
                        }
                    endif;








                elseif ($id == 'postTags') :


                    $taxonomy = 'post_tag';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);


                    if ($term_obj_list == false) continue;

                    if (!empty($term_obj_list)) :
                        foreach ($term_obj_list as $term) {

                            $term_id = isset($term->term_id) ? $term->term_id : '';
                            $term_title = isset($term->name) ? $term->name : '';


                            $term_link = get_term_link($term_id, $taxonomy);
                            $customText = !empty($customText) ? $customText : '%s';

                            $linkData['label'] = sprintf($customText, $term_title);
                            $linkData['link'] = $term_link;

                            $links[] = [
                                'label' =>  sprintf($customText, $term_title),
                                'link' => $term_link
                            ];
                        }
                    endif;




                elseif ($id == 'postTerm') :


                    $taxonomy = !empty($item['options']['taxonomy']) ? $item['options']['taxonomy'] : '';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);


                    if ($term_obj_list == false) continue;

                    if (!empty($term_obj_list)) :
                        foreach ($term_obj_list as $term) {

                            $term_id = isset($term->term_id) ? $term->term_id : '';
                            $term_title = isset($term->name) ? $term->name : '';


                            $term_link = get_term_link($term_id, $taxonomy);
                            $customText = !empty($customText) ? $customText : '%s';

                            $linkData['label'] = sprintf($customText, $term_title);
                            $linkData['link'] = $term_link;

                            $links[] = [
                                'label' =>  sprintf($customText, $term_title),
                                'link' => $term_link
                            ];
                        }
                    endif;


                elseif ($id == 'postTerms') :

                    $taxonomy = !empty($item['options']['taxonomy']) ? $item['options']['taxonomy'] : '';

                    if (empty($taxonomy)) continue;

                    //$taxonomy = 'post_tag';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);


                    if ($term_obj_list == false) continue;

                    if (!empty($term_obj_list)) :
                        foreach ($term_obj_list as $term) {

                            $term_id = isset($term->term_id) ? $term->term_id : '';
                            $term_title = isset($term->name) ? $term->name : '';


                            $term_link = get_term_link($term_id, $taxonomy);
                            $customText = !empty($customText) ? $customText : '%s';

                            $linkData['label'] = sprintf($customText, $term_title);
                            $linkData['link'] = $term_link;

                            $links[] = [
                                'label' =>  sprintf($customText, $term_title),
                                'link' => $term_link
                            ];
                        }
                    endif;



                elseif ($id == 'termParents') :
                    $count = !empty($item['options']['count']) ? (int)$item['options']['count'] : 0;


                    $queried_object = get_queried_object();
                    $term_name = $queried_object->name;
                    $term_id = $queried_object->term_id;


                    $taxonomy = $queried_object->taxonomy;
                    $term_link = get_term_link($term_id, $taxonomy);
                    $parent_terms  = get_ancestors($term_id, $taxonomy);
                    $parent_terms = array_reverse($parent_terms);


                    if ($count > 0) {
                        $parent_terms = array_slice($parent_terms, 0, $count);
                    } else {
                        $parent_terms = array_slice($parent_terms,  $count);
                    }


                    foreach ($parent_terms as $id) {

                        $parent_term_link = get_term_link($id, $taxonomy);
                        $paren_term_name = get_term_by('id', $id, $taxonomy);

                        $links[] = [
                            'label' => sprintf($customText, $paren_term_name->name),
                            'link' => $parent_term_link
                        ];
                    }



                elseif ($id == 'termTitle') :

                    $queried_object = get_queried_object();
                    $term_name = $queried_object->name;
                    $term_id = $queried_object->term_id;
                    $taxonomy = $queried_object->taxonomy;
                    $term_link = get_term_link($term_id, $taxonomy);


                    $archive_title = $term_name;
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => $term_link
                    ];



                elseif ($id == 'termAncestors') :
                elseif ($id == 'wcShop') :

                    if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :

                        $post_id =  wc_get_page_id('shop');


                        $post_url = get_permalink($post_id);
                        $post_title = get_the_title($post_id);
                        $customText = !empty($customText) ? $customText : '%s';


                        $links[] = [
                            'label' => sprintf($customText, $post_title),
                            'link' => $post_url
                        ];


                    endif;






                elseif ($id == 'wcAccount') :
                    if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
                        $post_id =  wc_get_page_id('myaccount');


                        $post_url = get_permalink($post_id);
                        $post_title = get_the_title($post_id);
                        $customText = !empty($customText) ? $customText : '%s';


                        $links[] = [
                            'label' => sprintf($customText, $post_title),
                            'link' => $post_url
                        ];

                    endif;


                elseif ($id == 'wcCart') :

                    if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
                        $post_id =  wc_get_page_id('cart');


                        $post_url = get_permalink($post_id);
                        $post_title = get_the_title($post_id);
                        $customText = !empty($customText) ? $customText : '%s';


                        $links[] = [
                            'label' => sprintf($customText, $post_title),
                            'link' => $post_url
                        ];

                    endif;




                elseif ($id == 'wcCheckout') :

                    if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
                        $post_url = wc_get_checkout_url();
                        $post_title = 'Checkout';
                        $customText = !empty($customText) ? $customText : '%s';


                        $links[] = [
                            'label' => sprintf($customText, $post_title),
                            'link' => $post_url
                        ];

                    endif;




                elseif ($id == 'searchText') :
                    $current_query = sanitize_text_field(get_query_var('s'));
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $current_query),
                        'link' => '#'
                    ];


                elseif ($id == 'archiveTitle') :

                    $archive_title = get_the_archive_title();
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => '#'
                    ];

                elseif ($id == '404Text') :

                    $archive_title = get_the_archive_title();
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => '#'
                    ];

                elseif ($id == 'dateText') :



                    $format = !empty($item['options']['format']) ? $item['options']['format'] : '';

                    $date = get_the_date($format);

                    $archive_title = !empty($format) ? $date : get_the_archive_title();
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => '#'
                    ];

                elseif ($id == 'monthText') :

                    $format = !empty($item['options']['format']) ? $item['options']['format'] : '';

                    $date = get_the_date($format);

                    $archive_title = !empty($format) ? $date : get_the_archive_title();
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => '#'
                    ];


                elseif ($id == 'yearText') :
                    $format = !empty($item['options']['format']) ? $item['options']['format'] : '';

                    $date = get_the_date($format);

                    $archive_title = !empty($format) ? $date : get_the_archive_title();
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => '#'
                    ];

                elseif ($id == 'authorName') :

                    $archive_title = get_the_author();
                    $customText = !empty($customText) ? $customText : '%s';

                    $links[] = [
                        'label' => sprintf($customText, $archive_title),
                        'link' => get_author_posts_url(get_the_author_meta("ID")),
                    ];



                endif;





                if ($iconLibrary == 'fontAwesome') {
                    wp_enqueue_style('fontawesome-icons');
                } else if ($iconLibrary == 'iconFont') {
                    wp_enqueue_style('icofont-icons');
                } else if ($iconLibrary == 'bootstrap') {
                    wp_enqueue_style('bootstrap-icons');
                }

                $fontIconHtml = '<span class="icon ' . $iconClass . ' ' . $iconSrc . '"></span>';

                $pramsArr = ['{URL}' => $post_url, '{TITLE}' => $post_title, '{IMAGE}' => $post_thumb_url,];
                $url = strtr($url, (array)$pramsArr);



        ?>
        <?php
                $i++;
            }



        $total = count($links);


        //echo '<pre>' . var_export($links, true) . '</pre>';



        ob_start();

        if (!empty($wrapperTag)) :

        ?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <ol>
                    <?php
                    $i = 1;
                    if (!empty($links))
                        foreach ($links as $index => $item) {

                    ?><li class="<?php echo esc_attr('item item-' . $index); ?>">
                            <a href="<?php echo esc_url_raw($item['link']); ?>">


                                <?php if ($showIcon) : ?>
                                    <?php //echo wp_kses_post($item['icon']); 
                                    ?>
                                <?php endif; ?>
                                <?php if ($showLabel) : ?>
                                    <span class='label'>
                                        <?php echo wp_kses_post($item['label']);
                                        ?>

                                    </span>
                                <?php endif; ?>


                                <?php if ($showSeparator && $total > $i) : ?>
                                    <span class="separator"><?php echo esc_html($separatorText); ?></span>
                                <?php endif; ?>

                            </a>
                        </li>
                    <?php
                            $i++;
                        }


                    ?>
                </ol>
            </<?php echo esc_attr($wrapperTag); ?>>

        <?php

        endif;

        ?>














<?php return ob_get_clean();
    }
}

$PGBlockBreadcrumb = new PGBlockBreadcrumb();