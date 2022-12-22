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





        $total = count($elementsItems);
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
                    $linkData['label'] = (!empty($customText)) ? $customText : __('You are here: ', 'post-grid');
                    $linkData['link'] = $url;

                    $links[$i] = ['label' => '', 'link' => ''];

                elseif ($id == 'homePage') :
                    $home_url = get_bloginfo('url');

                    $linkData['label'] = !empty($customText) ? $customText : __('Home', 'post-grid');
                    $linkData['link'] = $home_url;

                elseif ($id == 'frontPage') :
                    $post_id = get_option('page_on_front');
                    //echo var_export($post_id);

                    $post_url = get_permalink($post_id);
                    $post_title = get_the_title($post_id);
                    $customText = !empty($customText) ? $customText : '%s';

                    $linkData['label'] = sprintf($customText, $post_title);
                    $linkData['link'] = $post_url;
                elseif ($id == 'postsPage') :
                    $post_id = get_option('page_for_posts');
                    //echo var_export($post_id);

                    $post_url = get_permalink($post_id);
                    $post_title = get_the_title($post_id);
                    $customText = !empty($customText) ? $customText : '%s';

                    $linkData['label'] = sprintf($customText, $post_title);
                    $linkData['link'] = $post_url;

                elseif ($id == 'postTitle') :
                    $post_id = get_the_ID();
                    $post_url = get_permalink($post_id);
                    $post_title = get_the_title($post_id);
                    $customText = !empty($customText) ? $customText : '%s';

                    $linkData['label'] = sprintf($customText, $post_title);
                    $linkData['link'] = $post_url;

                elseif ($id == 'postAuthor') :

                    $post_id = get_the_ID();
                    $post = get_post($post_id);
                    $author_id = $post->post_author;
                    $author_posts_url = get_author_posts_url($author_id);
                    $author_name = get_the_author_meta('display_name', $author_id);


                    $linkData['label'] = !empty($customText) ? $customText : $author_name;
                    $linkData['link'] = $author_posts_url;

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


                    $linkData['label'] = sprintf($customText, $post_date);
                    $linkData['link'] = $get_day_link;

                elseif ($id == 'postDay') :

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $linkData['label'] = sprintf($customText, $post_date_day);
                    $linkData['link'] = $get_day_link;

                elseif ($id == 'postMonth') :

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $linkData['label'] = sprintf($customText, $post_date_month);
                    $linkData['link'] = $get_month_link;

                elseif ($id == 'postYear') :

                    $post_date_year = get_the_time('Y');
                    $post_date_month = get_the_time('m');
                    $post_date_day = get_the_time('d');

                    $get_month_link = get_month_link($post_date_year, $post_date_month);
                    $get_year_link = get_year_link($post_date_year);
                    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                    $linkData['label'] = sprintf($customText, $post_date_year);
                    $linkData['link'] = $get_year_link;

                elseif ($id == 'postAncestors') :
                elseif ($id == 'postId') :

                    $post_id = get_the_ID();
                    $post_url = get_permalink($post_id);

                    $linkData['label'] = sprintf($customText, $post_id);
                    $linkData['link'] = $post_url;


                elseif ($id == 'postCategory') :

                    $taxonomy = 'category';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);

                    //echo '<pre>' . var_export($term_obj_list, true) . '</pre>';

                    if ($term_obj_list == false) continue;

                    $term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
                    $term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';


                    $term_link = get_term_link($term_id, $taxonomy);
                    $customText = !empty($customText) ? $customText : '%s';

                    $linkData['label'] = sprintf($customText, $term_title);
                    $linkData['link'] = $term_link;



                elseif ($id == 'postTag') :


                    $taxonomy = 'post_tag';
                    $post_id = get_the_ID();
                    $term_obj_list = get_the_terms($post_id, $taxonomy);

                    //echo '<pre>' . var_export($term_obj_list, true) . '</pre>';

                    if ($term_obj_list == false) continue;

                    $term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
                    $term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';


                    $term_link = get_term_link($term_id, $taxonomy);
                    $customText = !empty($customText) ? $customText : '%s';

                    $linkData['label'] = sprintf($customText, $term_title);
                    $linkData['link'] = $term_link;

                elseif ($id == 'postCategories') :
                elseif ($id == 'postTags') :

                elseif ($id == 'postTerm') :
                elseif ($id == 'postTerms') :

                elseif ($id == 'termParent') :
                elseif ($id == 'termTitle') :
                elseif ($id == 'termAncestors') :
                elseif ($id == 'wcShop') :
                elseif ($id == 'wcAccount') :

                elseif ($id == 'searchText') :
                elseif ($id == 'archiveTitle') :
                elseif ($id == '404Text') :
                elseif ($id == 'dateText') :
                elseif ($id == 'monthText') :

                elseif ($id == 'yearText') :
                elseif ($id == 'authorName') :
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








        ob_start();

        if (!empty($wrapperTag)) :

        ?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">
                <ol>
                    <?php
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
                                $linkData['label'] = (!empty($customText)) ? $customText : __('You are here: ', 'post-grid');
                                $linkData['link'] = $url;

                                $links[$i] = ['label' => '', 'link' => ''];

                            elseif ($id == 'homePage') :
                                $home_url = get_bloginfo('url');

                                $linkData['label'] = !empty($customText) ? $customText : __('Home', 'post-grid');
                                $linkData['link'] = $home_url;

                            elseif ($id == 'frontPage') :
                                $post_id = get_option('page_on_front');
                                //echo var_export($post_id);

                                $post_url = get_permalink($post_id);
                                $post_title = get_the_title($post_id);
                                $customText = !empty($customText) ? $customText : '%s';

                                $linkData['label'] = sprintf($customText, $post_title);
                                $linkData['link'] = $post_url;
                            elseif ($id == 'postsPage') :
                                $post_id = get_option('page_for_posts');
                                //echo var_export($post_id);

                                $post_url = get_permalink($post_id);
                                $post_title = get_the_title($post_id);
                                $customText = !empty($customText) ? $customText : '%s';

                                $linkData['label'] = sprintf($customText, $post_title);
                                $linkData['link'] = $post_url;

                            elseif ($id == 'postTitle') :
                                $post_id = get_the_ID();
                                $post_url = get_permalink($post_id);
                                $post_title = get_the_title($post_id);
                                $customText = !empty($customText) ? $customText : '%s';

                                $linkData['label'] = sprintf($customText, $post_title);
                                $linkData['link'] = $post_url;

                            elseif ($id == 'postAuthor') :

                                $post_id = get_the_ID();
                                $post = get_post($post_id);
                                $author_id = $post->post_author;
                                $author_posts_url = get_author_posts_url($author_id);
                                $author_name = get_the_author_meta('display_name', $author_id);


                                $linkData['label'] = !empty($customText) ? $customText : $author_name;
                                $linkData['link'] = $author_posts_url;

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


                                $linkData['label'] = sprintf($customText, $post_date);
                                $linkData['link'] = $get_day_link;

                            elseif ($id == 'postDay') :

                                $post_date_year = get_the_time('Y');
                                $post_date_month = get_the_time('m');
                                $post_date_day = get_the_time('d');

                                $get_month_link = get_month_link($post_date_year, $post_date_month);
                                $get_year_link = get_year_link($post_date_year);
                                $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                                $linkData['label'] = sprintf($customText, $post_date_day);
                                $linkData['link'] = $get_day_link;

                            elseif ($id == 'postMonth') :

                                $post_date_year = get_the_time('Y');
                                $post_date_month = get_the_time('m');
                                $post_date_day = get_the_time('d');

                                $get_month_link = get_month_link($post_date_year, $post_date_month);
                                $get_year_link = get_year_link($post_date_year);
                                $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                                $linkData['label'] = sprintf($customText, $post_date_month);
                                $linkData['link'] = $get_month_link;

                            elseif ($id == 'postYear') :

                                $post_date_year = get_the_time('Y');
                                $post_date_month = get_the_time('m');
                                $post_date_day = get_the_time('d');

                                $get_month_link = get_month_link($post_date_year, $post_date_month);
                                $get_year_link = get_year_link($post_date_year);
                                $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);


                                $linkData['label'] = sprintf($customText, $post_date_year);
                                $linkData['link'] = $get_year_link;

                            elseif ($id == 'postAncestors') :
                            elseif ($id == 'postId') :

                                $post_id = get_the_ID();
                                $post_url = get_permalink($post_id);

                                $linkData['label'] = sprintf($customText, $post_id);
                                $linkData['link'] = $post_url;


                            elseif ($id == 'postCategory') :

                                $taxonomy = 'category';
                                $post_id = get_the_ID();
                                $term_obj_list = get_the_terms($post_id, $taxonomy);

                                //echo '<pre>' . var_export($term_obj_list, true) . '</pre>';

                                if ($term_obj_list == false) continue;

                                $term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
                                $term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';


                                $term_link = get_term_link($term_id, $taxonomy);
                                $customText = !empty($customText) ? $customText : '%s';

                                $linkData['label'] = sprintf($customText, $term_title);
                                $linkData['link'] = $term_link;



                            elseif ($id == 'postTag') :


                                $taxonomy = 'post_tag';
                                $post_id = get_the_ID();
                                $term_obj_list = get_the_terms($post_id, $taxonomy);

                                //echo '<pre>' . var_export($term_obj_list, true) . '</pre>';

                                if ($term_obj_list == false) continue;

                                $term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
                                $term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';


                                $term_link = get_term_link($term_id, $taxonomy);
                                $customText = !empty($customText) ? $customText : '%s';

                                $linkData['label'] = sprintf($customText, $term_title);
                                $linkData['link'] = $term_link;

                            elseif ($id == 'postCategories') :
                            elseif ($id == 'postTags') :

                            elseif ($id == 'postTerm') :
                            elseif ($id == 'postTerms') :

                            elseif ($id == 'termParent') :
                            elseif ($id == 'termTitle') :
                            elseif ($id == 'termAncestors') :
                            elseif ($id == 'wcShop') :
                            elseif ($id == 'wcAccount') :

                            elseif ($id == 'searchText') :
                            elseif ($id == 'archiveTitle') :
                            elseif ($id == '404Text') :
                            elseif ($id == 'dateText') :
                            elseif ($id == 'monthText') :

                            elseif ($id == 'yearText') :
                            elseif ($id == 'authorName') :
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



                    ?><li class="<?php echo esc_attr('item item-' . $index); ?>">
                            <a href="<?php echo esc_url_raw($linkData['link']); ?>">


                                <?php if ($showIcon) : ?>
                                    <?php echo wp_kses_post($fontIconHtml); ?>
                                <?php endif; ?>
                                <?php if ($showLabel) : ?>
                                    <span class='label'>
                                        <?php echo wp_kses_post($linkData['label']);
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
