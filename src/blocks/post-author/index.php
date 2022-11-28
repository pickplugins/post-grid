<?php
if (!defined('ABSPATH')) exit();



class PGBlockPostAuthor
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-author/index.css');
        wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-author/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-author', array(
            'editor_script' => 'editor_script',
            'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            //'style' => 'front_style',
            'render_callback' => array($this, 'theHTML'),
            'attributes' =>  [
                "wrapper" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "tag" => "div",
                            "class" => ""
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => []
                        ]
                    ]
                ],
                "elements" => [
                    "type" => "object",
                    "default" => [
                        "items" => [
                            [
                                "id" => "avatar",
                                "label" => "Avatar"
                            ],
                            [
                                "id" => "name",
                                "label" => "Name"
                            ],
                            [
                                "id" => "description",
                                "label" => "Description"
                            ]
                        ]
                    ]
                ],
                "avatar" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "avatar",
                            "size" => "48",
                            "default" => ""
                        ],
                        "styles" => [
                            "display" => [],
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "verticalAlign" => [],
                            "borderRadius" => []
                        ]
                    ]
                ],
                "name" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "name",
                            "prefix" => "",
                            "postfix" => "",
                            "linkTo" => "",
                            "linkToMeta" => "",
                            "customUrl" => ""
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [],
                            "verticalAlign" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ]
                    ]
                ],
                "description" => [
                    "type" => "object",
                    "default" => [
                        "options" => [
                            "class" => "description",
                            "prefix" => "",
                            "postfix" => ""
                        ],
                        "styles" => [
                            "textAlign" => [],
                            "color" => [],
                            "bgColor" => [],
                            "padding" => [],
                            "margin" => [],
                            "display" => [],
                            "verticalAlign" => [],
                            "fontSize" => [],
                            "lineHeight" => [],
                            "letterSpacing" => [],
                            "fontFamily" => [],
                            "fontWeight" => [],
                            "textDecoration" => [],
                            "textTransform" => []
                        ]
                    ]
                ],
                "customCss" => [
                    "type" => "string",
                    "default" => ""
                ],
                "linkAttr" => [
                    "type" => "array",
                    "default" => []
                ],
                "blockCss" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ],
                "blockCssY" => [
                    "type" => "object",
                    "default" => [
                        "items" => []
                    ]
                ],
                "blockId" => [
                    "type" => "string",
                    "default" => ""
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

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {

        //var_dump($block);

        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;

        $post_ID = $block->context['postId'];
        $post_data = get_post($post_ID);

        $post_url = get_the_permalink($post_ID);
        $post_author_id = $post_data->post_author;
        //$author_data = get_user_by('ID', $post_author_id);

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];


        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperStyles = isset($wrapper['styles']) ? $wrapper['styles'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
        $wrapperClass = isset($wrapperStyles['class']) ? $wrapperStyles['class'] : '';


        $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
        $elementsItems = isset($elements['items']) ? $elements['items'] : [];



        $name = isset($attributes['name']) ? $attributes['name'] : [];
        $nameOptions = isset($name['options']) ? $name['options'] : [];
        $nameStyles = isset($name['styles']) ? $name['styles'] : [];
        $nameTypo = isset($name['typo']) ? $name['typo'] : [];

        $nameClass = isset($nameOptions['class']) ? $nameOptions['class'] : '';
        $namePrefix = isset($nameOptions['prefix']) ? $nameOptions['prefix'] : '';
        $namePostfix = isset($nameOptions['postfix']) ? $nameOptions['postfix'] : '';
        $nameLinkTo = isset($nameOptions['linkTo']) ? $nameOptions['linkTo'] : '';
        $nameLinkToMeta = isset($nameOptions['linkToMeta']) ? $nameOptions['linkToMeta'] : '';
        $nameCustomUrl = isset($nameOptions['customUrl']) ? $nameOptions['customUrl'] : '';


        $description = isset($attributes['description']) ? $attributes['description'] : [];
        $descriptionOptions = isset($description['options']) ? $description['options'] : [];
        $descriptionStyles = isset($description['styles']) ? $description['styles'] : [];
        $descriptionTypo = isset($description['typo']) ? $description['typo'] : [];

        $descriptionClass = isset($descriptionOptions['class']) ? $descriptionOptions['class'] : 'description';
        $descriptionPrefix = isset($descriptionOptions['prefix']) ? $descriptionOptions['prefix'] : '';
        $descriptionPostfix = isset($descriptionOptions['postfix']) ? $descriptionOptions['postfix'] : '';



        $avatar = isset($attributes['avatar']) ? $attributes['avatar'] : [];
        $avatarOptions = isset($avatar['options']) ? $avatar['options'] : [];
        $avatarStyles = isset($avatar['styles']) ? $avatar['styles'] : [];

        $avatarSize = isset($avatarOptions['size']) ? $avatarOptions['size'] : '48';
        $avatarDefault = isset($avatarOptions['default']) ? $avatarOptions['default'] : '';
        $avatarClass = isset($avatarOptions['class']) ? $avatarOptions['class'] : '';



        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : [];


        //$postGridCustomCss .= $customCss;
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

        $nameLink = '';

        if ($nameLinkTo == 'postUrl') {
            $nameLink = get_permalink($post_ID);
        } else if ($nameLinkTo == 'authorUrl') {
            $user = get_user_by('ID', $post_author_id);

            $nameLink = $user->user_url;
        } else if ($nameLinkTo == 'authorLink') {
            $nameLink = get_author_posts_url($post_author_id);
        } else if ($nameLinkTo == 'customUrl') {

            $nameLink = $nameCustomUrl;
        } else if ($nameLinkTo == 'authorMeta') {
            $nameLink = get_user_meta($post_author_id, $nameLinkToMeta, true);
        }




        $htmlGroups = [];
        ob_start();
?>

        <div class="<?php echo esc_attr($nameClass); ?>">
            <?php if (!empty($nameLink)) : ?>

                <?php if ($namePrefix) : ?>
                    <span class="prefix"><?php echo $namePrefix; ?></span>
                <?php endif; ?>
                <a href="<?php echo esc_url_raw($nameLink); ?>"><?php echo wp_kses_post(get_the_author_meta('display_name', $post_author_id)); ?></a>
                <?php if ($namePostfix) : ?>
                    <span class="prefix"><?php echo $namePostfix; ?></span>
                <?php endif; ?>


            <?php else : ?>


                <?php if ($namePrefix) : ?>
                    <span class="prefix"><?php echo $namePrefix; ?></span>
                <?php endif; ?>
                <?php echo wp_kses_post(get_the_author_meta('display_name', $post_author_id)); ?>
                <?php if ($namePostfix) : ?>
                    <span class="prefix"><?php echo $namePostfix; ?></span>
                <?php endif; ?>
            <?php endif; ?>

        </div>

        <?php
        $htmlGroups['name'] = ob_get_clean();


        ob_start();
        ?>

        <div class="<?php echo esc_attr($descriptionClass); ?>">
            <?php echo wp_kses_post(get_the_author_meta('description', $post_author_id)); ?>
        </div>

        <?php
        $htmlGroups['description'] = ob_get_clean();


        ob_start();
        ?>

        <div class="<?php echo esc_attr($avatarClass); ?>">
            <img src="<?php echo esc_url_raw(get_avatar_url($post_author_id, ['size' => $avatarSize])) ?>" alt=" <?php echo esc_attr(get_the_author_meta('display_name', $post_author_id)) ?> " />
        </div>

        <?php
        $htmlGroups['avatar'] = ob_get_clean();




        $linkAttrStr = '';



        if (!empty($itemsLinkAttr))
            foreach ($itemsLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        ob_start();


        ?>


        <div class="<?php echo $blockId; ?>">
            <?php
            foreach ($elementsItems as $item) {


                echo $htmlGroups[$item['id']];
            }



            ?>
        </div>











<?php return ob_get_clean();
    }
}

$PGBlockPostAuthor = new PGBlockPostAuthor();
