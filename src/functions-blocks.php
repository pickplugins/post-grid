<?php
if (!defined('ABSPATH')) exit;  // if direct access

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


?>




    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts);
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
            array(
                'slug'  => 'post-grid-woo',
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
                foreach ($blockCss as  $selector => $atts) {

                    if (is_array($blockCss))
                        foreach ($atts as  $att => $responsiveVals) {

                            if (is_array($responsiveVals))
                                foreach ($responsiveVals as  $device => $val) {

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
                foreach ($atts as  $attr => $val) {



                    if (!empty($val)) {

                        $reponsiveCss .=  $attr . ':' . $val . ';';
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
                foreach ($atts as  $attr => $val) {
                    if (!empty($val))
                        $reponsiveCss .=  $attr . ':' . $val . ';';
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
                foreach ($atts as  $attr => $val) {
                    if (!empty($val))
                        $reponsiveCss .=  $attr . ':' . $val . ';';
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


    <style>
        <?php echo ($reponsiveCss); ?>
    </style>

    <?php

    ?>

    <pre>
<?php
    echo var_export($reponsiveCss, true);
?>
</pre>

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
