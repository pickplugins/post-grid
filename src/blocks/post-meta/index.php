<?php
if (!defined('ABSPATH')) exit();



class BlockPostMeta
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        // wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-meta/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-meta/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-meta', array(
            //'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'editor_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "template" => [
                    "type" => "string",
                    "default" => "<div>Output HTML: {metaValue}</div>"
                ],
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "inline-block"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "meta" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "key" => "",
                            "type" => "string",
                            "prefix" => "",
                            "postfix" => ""
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "separator" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "inline-block"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "frontText" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "text" => "Meta Value: ",
                            "class" => "inline-block"
                        ],
                        "styles" => [
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => []
                        ]
                    ]
                ],
                "customCss" => [
                    "type" => "string",
                    "default" => ""
                ],
                "blockCssY" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ]
            ]


        ));
    }

    function front_script($attributes)
    {
    }
    function front_style($attributes)
    {
    }


    function nestedToSingle($array, $slug = '')
    {
        $singleDimArray = [];

        if (is_array($array))
            foreach ($array as $index => $item) {

                if (is_array($item)) {
                    $singleDimArray = array_merge($singleDimArray, $this->nestedToSingle($item, $index));
                } else {
                    $index1 = !empty($slug) ? $slug . '-' . $index : $index;


                    $singleDimArray['{' . $index1 . '}'] = $item;
                }
            }

        return $singleDimArray;
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';



        if (!is_admin()) {


            //wp_enqueue_script('blk_post_grid', post_grid_plugin_dir . 'src/blocks/post-categories/index.js', array('wp-element'));

            // wp_enqueue_style('blk_post_grid', post_grid_plugin_url . 'src/blocks/post-categories/index.css');
        }



        $post_ID = $block->context['postId'];
        $post_url = get_the_permalink($post_ID);

        $template = isset($attributes['template']) ? $attributes['template'] :'';
        $templateLoop= isset($attributes['templateLoop']) ? $attributes['templateLoop'] :'<div>{title}</div><div>{details}</div>';


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $meta = isset($attributes['meta']) ? $attributes['meta'] : [];
        $metaOptions = isset($meta['options']) ? $meta['options'] : [];
        $metaStyles = isset($meta['styles']) ? $meta['styles'] : [];

        $metaKey = isset($metaOptions['key']) ? $metaOptions['key'] : '';
        $metaKeyType = isset($metaOptions['type']) ? $metaOptions['type'] : '';

        $templateFront = isset($attributes['templateFront']) ? $attributes['templateFront'] : '';


        $metaValue = '';


        if ($metaKeyType != 'string') {

            if (is_plugin_active('advanced-custom-fields/acf.php') ||  is_plugin_active('advanced-custom-fields-pro/acf.php')) {

                $metaValue = get_field($metaKey, $post_ID);
            }
        } else {

            $metaValue = get_post_meta($post_ID, $metaKey, true);
        }






        ob_start();




        //echo strtr($templateFront, $vars);







        if (!empty($wrapperTag)) :
?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">

                <?php

                if (is_array($metaValue)) {


if(!empty($templateLoop)){

        foreach($metaValue as $items){

            $tempArgs = []; 

            foreach($items as $itemIndex=>$item){
                $tempArgs['{' . $itemIndex . '}'] = $item;

            }

            echo strtr($templateLoop, (array)$tempArgs);


        }

}else{
  $singleArrayForCategory = $this->nestedToSingle($metaValue);
                    echo strtr($template, (array)$singleArrayForCategory);
}
                  



                } else {

                    $singleArray = ['{metaValue}' => $metaValue];

                    echo strtr($template, (array)$singleArray);
                }

                ?>


            </<?php echo esc_attr($wrapperTag); ?>>

<?php

        endif;





        return ob_get_clean();
    }
}

$BlockPostGrid = new BlockPostMeta();
