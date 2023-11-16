<?php
if (!defined('ABSPATH'))
    exit();



class PGBlockPostQuery
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
            post_grid_plugin_dir . 'build/blocks/post-query/block.json',
            array(
                'title' => "Post Query",
                'render_callback' => array($this, 'theHTML'),


            )
        );
    }

    function front_scripts($attributes)
    {
        wp_register_script('pgpostquery_front_script', post_grid_plugin_url . 'src/blocks/post-query/front-scripts.js', []);
        wp_register_style('pgpostquery_front_style', post_grid_plugin_url . 'src/blocks/post-query/index.css');
        if (has_block('post-grid/post-query')) {

            //wp_enqueue_script('pgpostquery_front_script');
            //wp_enqueue_style('pgpostquery_front_style');
        }
    }
    function front_style($attributes)
    {
    }




    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {
        wp_enqueue_style('font-awesome-5');
        //wp_enqueue_script('anime.min');

        global $postGridCss;

        global $postGridCssY;
        global $postGridScriptData;


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';





        $container = isset($attributes['container']) ? $attributes['container'] : [];
        $containerOptions = isset($container['options']) ? $container['options'] : [];
        $containerClass = isset($containerOptions['class']) ? $containerOptions['class'] : '';


        $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
        $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];

        /*#######itemWrap######*/
        $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
        $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];


        /*#########$noPostsWrap#########*/
        $noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
        $noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];

        $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
        $gridOptions = isset($grid['options']) ? $grid['options'] : [];
        $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];


        /*#######pagination######*/
        $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
        $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
        $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';




        $layout = isset($attributes['layout']) ? $attributes['layout'] : [];
        $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : ['items' => []];
        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


        $itemCssArr = [];
        if (!empty($gridOptionsItemCss)) {
            foreach ($gridOptionsItemCss as $device => $args) {

                foreach ($args as $index => $items) {
                    foreach ($items as $attr => $val) {
                        $nth = $index + 1;

                        $itemCssArr[".$blockId .item:nth-child($nth)"][$attr][$device] = $val;
                    }
                }
            }
        }

        $postGridCssY[] = array_merge($blockCssY['items'], $itemCssArr);




        $postGridScriptData[$blockId]['queryArgs'] = isset($queryArgs['items']) ? $queryArgs['items'] : [];
        $postGridScriptData[$blockId]['layout']['id'] = isset($layout['id']) ? $layout['id'] : '';
        $postGridScriptData[$blockId]['layout']['rawData'] = isset($layout['rawData']) ? $layout['rawData'] : '';
        $postGridScriptData[$blockId]['pagination']['type'] = $paginationType;

        $layout_id = isset($layout['id']) ? $layout['id'] : '';
        $layout_id = apply_filters('pgb_post_grid_post_layout_id', $layout_id);


        $rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
        $rawData = !empty($layout['rawData']) ? $layout['rawData'] : $rawData;


        $srcServer = !empty($layout['srcServer']) ? $layout['srcServer'] : 'library';


        if ($srcServer == 'saved') {
            $postData = get_post($layout_id);
            $rawDatabyId = isset($postData->post_content) ? $postData->post_content : '';
            $rawData = !empty($rawDatabyId) ? $rawDatabyId : $rawData;
        }



        $query_args = post_grid_parse_query_prams(isset($queryArgs['items']) ? $queryArgs['items'] : []);


        if (get_query_var('paged')) {
            $paged = get_query_var('paged');
        } elseif (get_query_var('page')) {
            $paged = get_query_var('page');
        } else {
            $paged = 1;
        }


        $posts = [];
        $responses = [];


        $post_grid_wp_query = new WP_Query($query_args);


        $parsed_block =  isset($block->parsed_block) ? $block->parsed_block : [];

        // var_dump($parsed_block);

        $innerBlocks =  isset($parsed_block['innerBlocks']) ? $parsed_block['innerBlocks'] : [];


        ob_start();

?>




        <div class="<?php echo esc_attr($blockId); ?> pg-post-query items-loop" id="items-loop-<?php echo esc_attr($blockId); ?>">
            <?php


            if ($post_grid_wp_query->have_posts()) :

                while ($post_grid_wp_query->have_posts()) :
                    $post_grid_wp_query->the_post();

                    $post_id = get_the_id();
                    $blocks = $innerBlocks;


                    $html = '';
                    foreach ($blocks as $block) {

                        //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
                        $html .= render_block($block);
                    }

            ?>
                    <div class="item">
                        <?php echo wp_kses_post($html);
                        ?>
                    </div>
                <?php



                endwhile;



                wp_reset_query();
                wp_reset_postdata();
            endif;






            if (!empty($responses['posts'])) {
                foreach ($responses['posts'] as $post) {
                ?>

            <?php
                }
            }
            ?>
        </div>

        <?php



        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockPostQuery();
