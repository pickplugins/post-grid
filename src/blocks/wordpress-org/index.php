<?php
if (!defined('ABSPATH')) exit();



class PGBlockWordpressOrg
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/wordpress-org/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/wordpress-org/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/wordpress-org', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  array(
                'elements' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' =>
                        array(
                            0 =>
                            array(
                                'id' => 'thumb',
                                'label' => 'Thumb',
                            ),
                            1 =>
                            array(
                                'id' => 'version',
                                'label' => 'Version',
                            ),
                            2 =>
                            array(
                                'id' => 'active_installs',
                                'label' => 'Active Install',
                            ),
                        ),
                    ),
                ),
                'wrapper' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'ul',
                            'class' => '',
                        ),
                        'styles' =>
                        array(),
                    ),
                ),
                'item' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'item',
                            'tag' => 'li',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'thumb' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'class' => 'thumb',
                        ),
                        'styles' =>
                        array(
                            'color' =>
                            array(
                                'Desktop' => '',
                            ),
                            'backgroundColor' =>
                            array(
                                'Desktop' => '',
                            ),
                        ),
                    ),
                ),
                'object' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'type' => 'plugin',
                            'slug' => 'post-grid',
                        ),
                    ),
                ),
                'blockId' =>
                array(
                    'type' => 'string',
                    'default' => '',
                ),
                'blockCssY' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'items' =>
                        array(),
                    ),
                ),
                'customCss' =>
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


        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';


        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';


        $object = isset($attributes['object']) ? $attributes['object'] : [];
        $objectOptions = isset($object['options']) ? $object['options'] : [];
        $objectType = isset($objectOptions['type']) ? $objectOptions['type'] : 'plugin';
        $objectSlug = isset($objectOptions['slug']) ? $objectOptions['slug'] : 'post-grid';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'ul';


        $item = isset($attributes['item']) ? $attributes['item'] : [];
        $itemOptions = isset($item['options']) ? $item['options'] : [];
        $itemTag = isset($itemOptions['tag']) ? $itemOptions['tag'] : 'li';

        $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
        $elementsItems = isset($elements['items']) ? $elements['items'] : [];


        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


        $postGridCustomCss .= $customCss;

        $transientData = get_transient($blockId . '_data');


        ob_start();






        if (!empty($wrapperTag)) :


            // if (empty($transientData)) {

            //     $response = wp_remote_get("https://api.wordpress.org/plugins/info/1.2/?slug=$objectSlug&action=plugin_information");


            //     if (is_array($response) && !is_wp_error($response)) {
            //         $headers = $response['headers']; // array of http header lines
            //         $body    = $response['body']; // use the content

            //         $bodyObj = json_decode($body);
            //     }
            // } else {
            //     $bodyObj = json_decode($transientData);
            // }


            if ($objectType == 'plugin') {
                $fields = array(
                    'active_installs' => true,           // rounded int
                    'added' => true,                     // date
                    'author' => true,                    // a href html
                    'author_block_count' => true,        // int
                    'author_block_rating' => true,       // int
                    'author_profile' => true,            // url
                    'banners' => true,                   // array( [low], [high] )
                    'compatibility' => false,            // empty array?
                    'contributors' => true,              // array( array( [profile], [avatar], [display_name] )
                    'description' => false,              // string
                    'donate_link' => true,               // url
                    'download_link' => true,             // url
                    'downloaded' => false,               // int
                    // 'group' => false,                 // n/a 
                    'homepage' => true,                  // url
                    'icons' => false,                    // array( [1x] url, [2x] url )
                    'last_updated' => true,              // datetime
                    'name' => true,                      // string
                    'num_ratings' => true,               // int
                    'rating' => true,                    // int
                    'ratings' => true,                   // array( [5..0] )
                    'requires' => true,                  // version string
                    'requires_php' => true,              // version string
                    'reviews' => false,               // n/a, part of 'sections'
                    'screenshots' => false,               // array( array( [src], [caption] ) )
                    'sections' => false,                  // array( [description], [installation], [changelog], [reviews], ...)
                    'short_description' => false,        // string
                    //'slug' => true,                      // string
                    'support_threads' => true,           // int
                    'support_threads_resolved' => true,  // int
                    'tags' => true,                      // array( )
                    'tested' => true,                    // version string
                    'version' => true,                   // version string
                    'versions' => false,                  // array( [version] url )
                );

                require_once(ABSPATH . 'wp-admin/includes/plugin-install.php');

                $bodyObj = plugins_api('plugin_information', array('slug' => 'team',  'fields' => $fields));
            }



            if ($objectType == 'theme') {
                $fields = array(
                    'description' => true,           // rounded int
                    'sections' => false,                  // array( [description], [installation], [changelog], [reviews], ...)
                    'rating' => true,                    // int
                    'ratings' => true,                   // array( [5..0] )
                    'downloadlink' => true,             // url
                    'downloaded' => false,               // int
                    'last_updated' => true,              // datetime
                    'tags' => true,                      // array( )
                    'homepage' => true,                  // url
                    'screenshots' => false,               // array( array( [src], [caption] ) )
                    'screenshot_count' => false,               // array( array( [src], [caption] ) )
                    'screenshot_url' => false,               // array( array( [src], [caption] ) )
                    'photon_screenshots' => false,               // array( array( [src], [caption] ) )
                    'template' => false,               // array( array( [src], [caption] ) )
                    'parent' => true,                     // parent 
                    'versions' => false,                  // array( [version] url )
                    'theme_url' => false,                  // array( [version] url )
                    'extended_author' => false,                  // array( [version] url )
                );

                require_once(ABSPATH . 'wp-admin/includes/theme.php');

                $bodyObj = themes_api('theme_information', array('slug' => 'twentytwentyone',  'fields' => $fields));
            }



?>
            <pre>
<?php //echo var_export($bodyObj, true);
?>
</pre>

            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">


                <?php

                foreach ($elementsItems as $item) {

                    $id = isset($item['id']) ? $item['id'] : '';
                    $prefix = isset($item['prefix']) ? $item['prefix'] : '';


                    if ($id == 'banners ') {
                ?>
                        <div class="thumb">
                            <img src="<?php echo $bodyObj->banners['high'] ?>" alt=<?php echo $bodyObj->name; ?> />
                        </div>
                    <?php
                    }

                    if ($id == 'name') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->name; ?></<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'version') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">

                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->version; ?></<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'requires_php') {

                        //var_dump($bodyObj->requires_php);

                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">

                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->requires_php; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'requires') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->requires;
                            ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'active_installs') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->active_installs; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'last_updated') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->last_updated; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'added') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->added; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'homepage') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->homepage; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'author') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->author; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'author_block_count') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <?php echo $bodyObj->author_block_count; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'author_block_rating') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->author_block_rating; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'author_profile') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->author_profile; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }



                    if ($id == 'compatibility') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->compatibility; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'contributors') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>
                            <ul>
                                <?php
                                if (isset($bodyObj->contributors)) {
                                    foreach ($bodyObj->contributors as $index => $user) {

                                        //var_dump($user);
                                ?>
                                        <li>
                                            <?php echo $user['display_name']; ?>
                                        </li>
                                <?php
                                    }
                                }
                                ?>
                            </ul>

                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'description') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->description; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'donate_link') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->donate_link; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'download_link') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->download_link; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'downloaded') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->downloaded; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }


                    if ($id == 'num_ratings') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->num_ratings; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'rating') {
                        //var_dump($bodyObj->rating);

                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->rating; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'ratings') {

                        //var_dump($bodyObj->ratings);

                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php  ?>
                            <ul>
                                <?php
                                if (isset($bodyObj->ratings)) {
                                    foreach ($bodyObj->ratings as $index => $rating) {
                                ?>
                                        <li>
                                            <?php echo $index; ?>: <?php echo $rating; ?>
                                        </li>
                                <?php
                                    }
                                }
                                ?>
                            </ul>


                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }



                    if ($id == 'icons') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->icons; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'screenshots') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->screenshots;
                                                                            ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'short_description') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->short_description; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'support_threads') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->support_threads;
                                                                            ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'support_threads_resolved') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->support_threads_resolved;
                                                                            ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'tags') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?>

                            <ul>
                                <?php

                                if (isset($bodyObj->tags)) {
                                    foreach ($bodyObj->tags as $index => $rating) {
                                ?>
                                        <li>
                                            <?php echo $rating; ?>
                                        </li>
                                <?php
                                    }
                                }
                                ?>
                            </ul>

                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }
                    if ($id == 'tested') {

                        //var_dump($bodyObj->tested);
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->tested;
                                                                            ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'downloadlink') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->downloadlink; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'downloaded') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->downloaded; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'screenshot_count') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->screenshot_count; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }
                    if ($id == 'screenshot_url') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->screenshot_url; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'template') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->template; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }

                    if ($id == 'parent') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->parent; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                    <?php
                    }
                    if ($id == 'theme_url') {
                    ?>
                        <<?php echo esc_attr($itemTag); ?> class="item">
                            <?php echo (!empty($prefix)) ? $prefix : ''; ?> <?php echo $bodyObj->theme_url; ?>
                        </<?php echo esc_attr($itemTag); ?>>
                <?php
                    }
                }

                ?>


            </<?php echo esc_attr($wrapperTag); ?>>
            <?php










            ?>




        <?php

        endif;



        ?>









<?php return ob_get_clean();
    }
}

$BlockPostGrid = new PGBlockWordpressOrg();
