<?php
if (!defined('ABSPATH')) exit;  // if direct access

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
                foreach ($blockCss as  $selector => $atts) {

                    if (is_array($blockCss))
                        foreach ($atts as  $att => $responsiveVals) {

                            if (is_array($responsiveVals))
                                foreach ($responsiveVals as  $device => $val) {

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
                foreach ($atts as  $attr => $val) {



                    if (!empty($val)) {

                        $reponsiveCss .=  $attr . ':' . $val . ';';
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
                foreach ($atts as  $attr => $val) {
                    if (!empty($val))
                        $reponsiveCss .=  $attr . ':' . $val . ';';
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
                foreach ($atts as  $attr => $val) {
                    if (!empty($val))
                        $reponsiveCss .=  $attr . ':' . $val . ';';
                }
            $reponsiveCss .= '}';
        }



        $reponsiveCss .= '}';
    }

    //var_dump($postGridFonts);

    $fonts = '';

    if (!empty($postGridFonts)) {
        foreach ($postGridFonts as $device => $itemFont) {
            if (!empty($itemFont)) {
                foreach ($itemFont as $itemFon) {
                    $fonts .= $itemFon . ',';
                }
            }
        }
    }


    //var_dump($fonts);
    $fonts = substr($fonts, 0, -1);

    $fonts = str_replace(",", "|", $fonts);
    $fonts = str_replace(" ", "+", $fonts);

    //echo '###############';
    //var_dump($fonts);


?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=<?php echo esc_html($fonts);
                                                                            ?>">
    <?php

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
                'slug'  => 'post-grid',
                'title' => __('Post Grid Combo', 'boilerplate'),
            ),
            // array(
            //     'slug'  => 'post-grid-woo',
            //     'title' => __('Post Grid Combo - WooCommerce', 'boilerplate'),
            // ),
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
