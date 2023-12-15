<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockTermsList
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
    }

    function front_scripts($attributes)
    {
        wp_register_script('pgtermslist_front_script', post_grid_plugin_url . 'src/blocks/terms-list/front-scripts.js', []);



        if (has_block('post-grid/terms-list')) {

            wp_enqueue_script('pgtermslist_front_script');
        }
    }

    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/terms-list/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/terms-list/index.js', array('wp-blocks', 'wp-element'));
        //wp_register_script('pgtermslist_front_script', post_grid_plugin_url . 'src/blocks/terms-list/front-scripts.js', []);


        register_block_type(
            post_grid_plugin_dir . 'build/blocks/terms-list/block.json',
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



    function get_term_postsx($termId = 0, $taxonomy = '', $slug = '')
    {



        $args = array(
            'post_type' => ['docs'],
            'posts_per_page' => '-1',
            'tax_query' => array(
                array(
                    'taxonomy' => $taxonomy,
                    'field' => 'slug',
                    'terms' => array($slug),
                    'operator  ' => 'IN',
                    'include_children' => false
                )
            )
        );


        $queryX = new WP_Query($args);

        $posts = [];



        if ($queryX->have_posts()):


            while ($queryX->have_posts()):
                $queryX->the_post();

                $post_id = get_the_ID();
                $posts[$post_id] = ['id' => $post_id, 'title' => get_the_title(), 'url' => get_the_permalink()];

            endwhile;

            wp_reset_query();
            wp_reset_postdata();


        endif;


        return $posts;
    }

    function sort_terms_hierarchicaly(array $cats, $parentId = 0, $itemsQueryPosts = true)
    {
        $into = [];

        if ($cats)
            foreach ($cats as $i => $cat) {
                if ($cat->parent == $parentId) {

                    if ($itemsQueryPosts) {
                        $cat->posts = $this->get_term_postsx($cat->term_id, $cat->taxonomy, $cat->slug);
                    }

                    $cat->children = $this->sort_terms_hierarchicaly($cats, $cat->term_id, $itemsQueryPosts);
                    $into[$cat->term_id] = $cat;
                }
            }
        return $into;
    }






    function html_terms_hierarchicaly($sorted_terms, $attributes)
    {

        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];

        $itemsViewType = isset($itemsOptions['viewType']) ? $itemsOptions['viewType'] : 'list';
        $itemsHierarchicaly = isset($itemsOptions['hierarchicaly']) ? $itemsOptions['hierarchicaly'] : true;
        $itemsQueryPosts = isset($itemsOptions['queryPosts']) ? $itemsOptions['queryPosts'] : true;
        $itemsAccordionOpen = isset($itemsOptions['accordionOpen']) ? $itemsOptions['accordionOpen'] : true;




        $into = [];



        ob_start();


        foreach ($sorted_terms as $i => $cat) {

            if (!empty($cat->children) || !empty($cat->posts)) {
                ?>
                                                <li class="has-child">

                                                    <div class="group-lable <?php echo ($itemsAccordionOpen) ? 'active' : ''; ?>" wrapId="<?php echo $cat->slug; ?>">
                                                        <?php echo $cat->name; ?>

                                                        <span class="group-icon group-icon-active">
                                                            <i class="fas fa-angle-up"></i>
                                                        </span>
                                                        <span class="group-icon group-icon-inactive">
                                                            <i class="fas fa-angle-down"></i>
                                                        </span>

                                                    </div>

                                                    <ul class="child-wrap <?php echo $cat->slug; ?>" <?php echo ($itemsAccordionOpen) ? 'style="display: block;"' : ''; ?> id="child-wrap-<?php echo $cat->slug; ?>">
                                                        <?php echo $this->html_terms_hierarchicaly($cat->children, $attributes); ?>

                                                        <?php
                                                        if (!empty($cat->posts) && $itemsQueryPosts):
                                                            foreach ($cat->posts as $post):

                                                                ?>
                                                                                <li>
                                                                                    <div class="group-lable-link">
                                                                                        <a href="<?php echo isset($post['url']) ? esc_url_raw($post['url']) : ''; ?>">
                                                                                            <span class="fas fa-external-link-alt"></span>
                                                                                            <?php echo isset($post['title']) ? $post['title'] : ''; ?>
                                                                                        </a>
                                                                                    </div>


                                                                                </li>
                                                                                <?php

                                                            endforeach;
                                                        endif;

                                                        ?>

                                                    </ul>




                                                </li>

                                                <?php

            } else {

                ?>
                                                <li>
                                                    <div class="group-lable" wrapId="<?php echo isset($cat->slug) ? $cat->slug : ''; ?>">
                                                        <?php echo isset($cat->name) ? $cat->name : ''; ?>
                                                    </div>


                                                </li>
                                                <?php

            }
        }




        return ob_get_clean();
    }



    function html_terms_hierarchicaly_inline($sorted_terms, $attributes)
    {

        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];

        $itemsViewType = isset($itemsOptions['viewType']) ? $itemsOptions['viewType'] : 'accordion';
        $itemsHierarchicaly = isset($itemsOptions['hierarchicaly']) ? $itemsOptions['hierarchicaly'] : true;
        $itemsQueryPosts = isset($itemsOptions['queryPosts']) ? $itemsOptions['queryPosts'] : true;
        $itemsAccordionOpen = isset($itemsOptions['accordionOpen']) ? $itemsOptions['accordionOpen'] : true;
        $itemsLinkToTerm = isset($itemsOptions['linkToTerm']) ? $itemsOptions['linkToTerm'] : true;


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';

        $into = [];
        ob_start();


        foreach ($sorted_terms as $i => $cat) {

            if (!empty($cat->children) || !empty($cat->posts)) {
                ?>
                                                <span class="">
                                                    <?php if ($itemsLinkToTerm):
                                                        $term_link = get_term_link($cat->term_id);
                                                        ?>
                                                                <a href="<?php echo esc_url_raw($term_link); ?>">
                                                                    <?php echo $cat->name; ?>
                                                                </a>
                                                    <?php else: ?>
                                                                <?php echo $cat->name; ?>
                                                    <?php endif; ?>
                                                    <span class="separator">
                                                        <?php echo $separatorText; ?>
                                                    </span>

                                                </span>
                                                <?php echo $this->html_terms_hierarchicaly_inline($cat->children, $attributes); ?>

                                                <?php
                                                if (!empty($cat->posts) && $itemsQueryPosts):
                                                    foreach ($cat->posts as $post):
                                                        ?>
                                                                        <span>
                                                                            <span class="">
                                                                                <a href="<?php echo isset($post['url']) ? esc_url_raw($post['url']) : ''; ?>">
                                                                                    <span class="fas fa-external-link-alt"></span>
                                                                                    <?php echo isset($post['title']) ? $post['title'] : ''; ?>
                                                                                </a>
                                                                            </span>


                                                                        </span>
                                                                        <?php

                                                    endforeach;
                                                endif;
            } else {
                ?>
                                                <span class="">
                                                    <?php if ($itemsLinkToTerm):
                                                        $term_link = get_term_link($cat->term_id);
                                                        ?>
                                                                <a href="<?php echo esc_url_raw($term_link); ?>">
                                                                    <?php echo $cat->name; ?>
                                                                </a>
                                                    <?php else: ?>
                                                                <?php echo $cat->name; ?>
                                                    <?php endif; ?>
                                                    <span class="separator">
                                                        <?php echo $separatorText; ?>
                                                    </span>
                                                </span>
                                                <?php

            }
        }

        return ob_get_clean();
    }



    function html_terms_hierarchicaly_list($sorted_terms, $attributes)
    {

        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];

        $itemsViewType = isset($itemsOptions['viewType']) ? $itemsOptions['viewType'] : 'accordion';
        $itemsHierarchicaly = isset($itemsOptions['hierarchicaly']) ? $itemsOptions['hierarchicaly'] : true;
        $itemsQueryPosts = isset($itemsOptions['queryPosts']) ? $itemsOptions['queryPosts'] : true;
        $itemsAccordionOpen = isset($itemsOptions['accordionOpen']) ? $itemsOptions['accordionOpen'] : true;
        $itemsLinkToTerm = isset($itemsOptions['linkToTerm']) ? $itemsOptions['linkToTerm'] : true;


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';

        $current_post_id = get_the_ID();

        $into = [];
        ob_start();


        foreach ($sorted_terms as $i => $cat) {

            if (!empty($cat->children) || !empty($cat->posts)) {
                ?>
                                                <li class="">
                                                    <?php if ($itemsLinkToTerm):
                                                        $term_link = get_term_link($cat->term_id);
                                                        ?>
                                                                <a href="<?php echo esc_url_raw($term_link); ?>">
                                                                    <?php echo $cat->name; ?>
                                                                </a>
                                                    <?php else: ?>
                                                                <?php echo $cat->name; ?>
                                                    <?php endif; ?>

                                                </li>
                                                <ul>
                                                    <?php echo $this->html_terms_hierarchicaly_list($cat->children, $attributes); ?>
                                                    <?php
                                                    if (!empty($cat->posts) && $itemsQueryPosts):
                                                        foreach ($cat->posts as $post):
                                                            ?>
                                                                            <li>
                                                                                <span class="">
                                                                                    <a class="<?php echo ($current_post_id == $post['id']) ? 'active' : ''; ?>"
                                                                                        href="<?php echo isset($post['url']) ? esc_url_raw($post['url']) : ''; ?>">
                                                                                        <span class="fas fa-external-link-alt"></span>
                                                                                        <?php echo isset($post['title']) ? $post['title'] : ''; ?>
                                                                                    </a>
                                                                                </span>


                                                                            </li>
                                                                            <?php

                                                        endforeach;
                                                    endif;

                                                    ?>
                                                </ul>




                                                <?php
            } else {
                ?>
                                                <li class="">
                                                    <?php if ($itemsLinkToTerm):
                                                        $term_link = get_term_link($cat->term_id);
                                                        ?>
                                                                <a href="<?php echo esc_url_raw($term_link); ?>">
                                                                    <?php echo $cat->name; ?>
                                                                </a>
                                                    <?php else: ?>
                                                                <?php echo $cat->name; ?>
                                                    <?php endif; ?>
                                                </li>
                                                <?php

            }
        }

        return ob_get_clean();
    }




    function html_terms_hierarchicaly_grid($sorted_terms, $attributes)
    {

        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];

        $itemsViewType = isset($itemsOptions['viewType']) ? $itemsOptions['viewType'] : 'accordion';
        $itemsHierarchicaly = isset($itemsOptions['hierarchicaly']) ? $itemsOptions['hierarchicaly'] : true;
        $itemsQueryPosts = isset($itemsOptions['queryPosts']) ? $itemsOptions['queryPosts'] : true;
        $itemsAccordionOpen = isset($itemsOptions['accordionOpen']) ? $itemsOptions['accordionOpen'] : true;
        $itemsLinkToTerm = isset($itemsOptions['linkToTerm']) ? $itemsOptions['linkToTerm'] : true;
        $postCountPosition = isset($itemsOptions['postCountPosition']) ? $itemsOptions['postCountPosition'] : 'beforePosts';
        $postCountText = isset($itemsOptions['postCountText']) ? $itemsOptions['postCountText'] : 'Total Posts: %s';


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';

        $current_post_id = get_the_ID();

        $into = [];
        ob_start();


        foreach ($sorted_terms as $i => $cat) {

            if (!empty($cat->children) || !empty($cat->posts)) {
                ?>
                                                <div class="grid-item">


                                                    <div class="item-label">


                                                        <?php echo ($postCountPosition == 'beforeTitle') ? sprintf($postCountText, $cat->count) : ''; ?>

                                                        <?php if ($itemsLinkToTerm):
                                                            $term_link = get_term_link($cat->term_id);
                                                            ?>
                                                                    <a href="<?php echo esc_url_raw($term_link); ?>">
                                                                        <?php echo $cat->name; ?>
                                                                    </a>
                                                        <?php else: ?>
                                                                    <?php echo $cat->name; ?>
                                                        <?php endif; ?>
                                                        <?php echo ($postCountPosition == 'afterTtile') ? sprintf($postCountText, $cat->count) : ''; ?>


                                                    </div>

                                                    <?php echo ($postCountPosition == 'beforePosts') ? sprintf($postCountText, $cat->count) : ''; ?>




                                                    <?php
                                                    if (!empty($cat->posts) && $itemsQueryPosts):

                                                        ?>
                                                                <ul>
                                                                    <?php

                                                                    foreach ($cat->posts as $post):
                                                                        ?>
                                                                                <li>
                                                                                    <a class="<?php echo ($current_post_id == $post['id']) ? 'active' : ''; ?>"
                                                                                        href="<?php echo isset($post['url']) ? esc_url_raw($post['url']) : ''; ?>">
                                                                                        <span class="fas fa-external-link-alt"></span>
                                                                                        <?php echo isset($post['title']) ? $post['title'] : ''; ?>

                                                                                    </a>



                                                                                </li>
                                                                                <?php

                                                                    endforeach;

                                                                    ?>
                                                                    <ul>
                                                                        <?php
                                                    endif;

                                                    ?>


                                                            <?php echo ($postCountPosition == 'afterPosts') ? sprintf($postCountText, $cat->count) : ''; ?>


                                                </div>





                                                <?php
            } else {
                ?>
                                                <div class="grid-item">

                                                    <div class="item-label">
                                                        <?php echo ($postCountPosition == 'beforeTitle') ? sprintf($postCountText, $cat->count) : ''; ?>
                                                        <?php if ($itemsLinkToTerm):
                                                            $term_link = get_term_link($cat->term_id);
                                                            ?>
                                                                    <a href="<?php echo esc_url_raw($term_link); ?>">
                                                                        <?php echo $cat->name; ?>
                                                                    </a>
                                                        <?php else: ?>
                                                                    <?php echo $cat->name; ?>
                                                        <?php endif; ?>
                                                        <?php echo ($postCountPosition == 'afterTtile') ? sprintf($postCountText, $cat->count) : ''; ?>
                                                    </div>

                                                    <?php echo ($postCountPosition == 'beforePosts') ? sprintf($postCountText, $cat->count) : ''; ?>
                                                    <?php echo ($postCountPosition == 'afterPosts') ? sprintf($postCountText, $cat->count) : ''; ?>


                                                </div>
                                                <?php

            }
        }

        return ob_get_clean();
    }




    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;

        global $postGridCssY;

        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $post_url = get_the_permalink($post_ID);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';



        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


        $taxonomies = isset($attributes['taxonomies']) ? $attributes['taxonomies'] : [];
        $taxonomiesOptions = isset($taxonomies['options']) ? $taxonomies['options'] : [];

        $taxName = isset($taxonomiesOptions['taxName']) ? $taxonomiesOptions['taxName'] : '';


        $items = isset($attributes['items']) ? $attributes['items'] : [];
        $itemsOptions = isset($items['options']) ? $items['options'] : [];

        $itemsViewType = isset($itemsOptions['viewType']) ? $itemsOptions['viewType'] : 'accordion';
        $itemsHierarchicaly = isset($itemsOptions['hierarchicaly']) ? $itemsOptions['hierarchicaly'] : true;
        $itemsQueryPosts = isset($itemsOptions['queryPosts']) ? $itemsOptions['queryPosts'] : true;
        $itemsAccordionOpen = isset($itemsOptions['accordionOpen']) ? $itemsOptions['accordionOpen'] : true;
        $hideEmpty = isset($itemsOptions['hideEmpty']) ? $itemsOptions['hideEmpty'] : false;


        $itemsPrefix = isset($itemsOptions['prefix']) ? $itemsOptions['prefix'] : '';
        $itemsPostfix = isset($itemsOptions['postfix']) ? $itemsOptions['postfix'] : '';
        $itemsMaxCount = isset($itemsOptions['maxCount']) ? (int) $itemsOptions['maxCount'] : 99;
        $itemsPostCount = isset($itemsOptions['postCount']) ? $itemsOptions['postCount'] : true;
        $itemsClass = isset($itemsOptions['class']) ? $itemsOptions['class'] : '';
        $itemsLinkTarget = isset($itemsOptions['linkTarget']) ? $itemsOptions['linkTarget'] : '';
        $itemsLinkAttr = isset($itemsOptions['linkAttr']) ? $itemsOptions['linkAttr'] : [];

        $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
        $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];

        $frontTexttext = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : __('Categories:', 'post-grid');
        $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';


        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];

        $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];





        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





        $linkAttrStr = '';



        if (!empty($itemsLinkAttr))
            foreach ($itemsLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }

        $taxonomy = $taxName;

        $obj['id'] = $post_ID;
        $obj['type'] = 'post';



        $wrapperClass = parse_css_class($wrapperClass, $obj);

        ob_start();



        $terms = get_terms($taxName, array('hide_empty' => $hideEmpty));

        $terms = is_wp_error($terms) ? [] : $terms;
        ////var_dump($terms);


        $sorted_terms = !empty($terms) ? $this->sort_terms_hierarchicaly($terms, 0, $itemsQueryPosts) : [];







        wp_enqueue_style('fontawesome-icons');



        ?>
                        <div class="<?php echo $blockId; ?> <?php echo esc_attr($wrapperClass); ?>">

                            <?php if ($itemsViewType == 'accordion'): ?>
                                        <ul class="main-wrap term-list-accordion">
                                            <?php
                                            echo $this->html_terms_hierarchicaly($sorted_terms, $attributes);
                                            ?>
                                        </ul>
                            <?php endif; ?>

                            <?php if ($itemsViewType == 'inline'): ?>
                                        <div class="main-wrap term-list-inline">
                                            <?php
                                            echo $this->html_terms_hierarchicaly_inline($sorted_terms, $attributes);
                                            ?>
                                        </div>
                            <?php endif; ?>

                            <?php if ($itemsViewType == 'list'): ?>
                                        <ul class="main-wrap term-list-list">
                                            <?php
                                            echo $this->html_terms_hierarchicaly_list($sorted_terms, $attributes);
                                            ?>
                                        </ul>
                            <?php endif; ?>

                            <?php if ($itemsViewType == 'grid'): ?>
                                        <div class="main-wrap term-list-grid">
                                            <?php
                                            echo $this->html_terms_hierarchicaly_grid($terms, $attributes);
                                            ?>
                                        </div>
                            <?php endif; ?>





                        </div>

                        <style>
                            .child-wrap {
                                padding-left: 10px;
                                margin: 0;
                                display: none;
                            }

                            .child-wrap li {
                                margin: 0;
                                list-style: none;
                            }

                            .main-wrap li {
                                margin: 0;
                                list-style: none;
                            }


                            .group-lable {
                                padding: 5px 10px;
                                background: #9dd6df4d;
                                margin: 0 0 3px 0;
                                cursor: pointer;
                            }

                            .group-lable.active {
                                padding: 5px 10px;
                                background: #9DD6DF;
                                margin: 0 0 3px 0;
                                cursor: pointer;
                            }

                            .group-lable-link {
                                padding: 5px 0;
                            }


                            .group-lable a {

                                color: #fff;
                            }


                            .group-icon {
                                float: right;
                            }

                            .group-icon-active {
                                display: inline-block;

                            }

                            .group-icon-inactive {
                                display: none;
                            }

                            .group-lable.active .group-icon-inactive {
                                display: inline-block;

                            }

                            .group-lable.active .group-icon-active {
                                display: none;

                            }

                            .term-list-list {}

                            .term-list-list ul {
                                padding: 0 0 0 12px;
                                margin: 0;
                            }

                            .term-list-list ul li {}

                            .term-list-list li {
                                padding: 5px 0;
                                list-style: disc;
                            }

                            .term-list-list .active {
                                font-weight: bold;
                            }

                            .term-list-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                                row-gap: 15px;
                                column-gap: 15px;
                            }

                            .term-list-grid .grid-item {
                                padding: 15px;
                                background: #9DD6DF;
                            }

                            .term-list-grid .grid-item ul {
                                padding: 0;

                            }

                            .term-list-grid .item-label {
                                font-size: 20px;
                                /* text-align: center; */
                                margin: 0 0px 10px 0;
                            }

                            .term-list-grid .grid-item a {
                                color: #444;
                            }
                        </style>









                        <?php return ob_get_clean();
    }
}

$PGBlockTermsList = new PGBlockTermsList();