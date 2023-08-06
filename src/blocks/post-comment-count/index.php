<?php
if (!defined('ABSPATH')) exit();



class PGBlocpostCommentCount
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }


    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/post-comment-count/index.css');
        //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/post-comment-count/index.js', array('wp-blocks', 'wp-element'));


        register_block_type('post-grid/post-comment-count', array(
            // 'editor_script' => 'editor_script',
            //'editor_style' => 'editor_style',
            //'script' => 'front_script',
            'uses_context' =>  ["postId", "loopIndex", "postType", "queryId"],
            'style' => 'front_style',
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

                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'display' => [],
                        ),
                    ),
                ),
                'commentCount' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'tag' => 'div',
                            'status' => 'approved',
                            'customLabel' => 'Count: %s',
                            'linkTo' => '',
                            'linkToUrl' => '',
                            'linkToMetaKey' => '',
                            'linkTarget' => '_blank',
                            'linkAttr' => [],
                            'customUrl' => '',
                            'class' => '',
                        ),
                        'styles' =>
                        array(

                            'display' => [],
                            'width' => [],
                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],
                            'fontSize' => [],
                            'lineHeight' => [],
                            'letterSpacing' => [],
                            'fontFamily' => [],
                            'fontWeight' => [],
                            'textDecoration' => [],
                            'textTransform' => [],
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
                            'library' => 'fontAwesome',
                            'srcType' => 'class',
                            'iconSrc' => 'far fa-calendar-alt',
                            'position' => 'beforeCommentCount',
                            'class' => 'commentCount-icon',
                        ),
                        'styles' =>
                        array(
                            'color' => [],
                            'backgroundColor' => [],
                            'padding' => [],
                            'margin' => [],

                            'display' => [],
                            'fontSize' => [],
                            'lineHeight' => [],
                            'fontWeight' =>
                            array(
                                'Desktop' => '700',
                            ),
                            'textDecoration' => [],
                        ),
                    ),
                ),
                'prefix' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'text' => '',
                            'class' => 'prefix',
                        ),
                        'styles' =>
                        array(
                            'color' => [],
                            'backgroundColor' => [],
                        ),
                    ),
                ),
                'postfix' =>
                array(
                    'type' => 'object',
                    'default' =>
                    array(
                        'options' =>
                        array(
                            'text' => '',
                            'class' => 'prefix',
                        ),
                        'styles' =>
                        array(
                            'color' => [],
                            'backgroundColor' => [],
                        ),
                    ),
                ),
                'customCss' =>
                array(
                    'type' => 'string',
                    'default' => '',
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
                        'items' => [],
                    ),
                ),
            )


        ));
    }

    function front_script($attributes)
    {
    }
    function front_style($attributes)
    {

        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];
        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    }

    // front-end output from the gutenberg editor 
    function theHTML($attributes, $content, $block)
    {


        global $postGridCss;
        global $postGridCustomCss;
        global $postGridCssY;



        $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

        $post_url = get_the_permalink($post_ID);
        $the_post = get_post($post_ID);
        $post_excerpt = '';
        $post_date = $the_post->post_date;

        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : [];
        $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

        $commentCount = isset($attributes['commentCount']) ? $attributes['commentCount'] : [];
        $commentCountOptions = isset($commentCount['options']) ? $commentCount['options'] : [];

        $status = isset($commentCountOptions['status']) ? $commentCountOptions['status'] : 'approved';
        $customLabel = isset($commentCountOptions['customLabel']) ? $commentCountOptions['customLabel'] : 'Count: %s';


        $commentCountLinkTarget = isset($commentCountOptions['linkTarget']) ? $commentCountOptions['linkTarget'] : '_blank';
        $commentCountCustomUrl = isset($commentCountOptions['customUrl']) ? $commentCountOptions['customUrl'] : '';
        $commentCountLinkAttr = isset($commentCountOptions['linkAttr']) ? $commentCountOptions['linkAttr'] : [];
        $commentCountRel = isset($commentCountOptions['rel']) ? $commentCountOptions['rel'] : '';
        $dateFormat = isset($commentCountOptions['dateFormat']) ? $commentCountOptions['dateFormat'] : 'dateFormat';
        $commentCountLinkTo = isset($commentCountOptions['linkTo']) ? $commentCountOptions['linkTo'] : '';
        $commentCountLinkToMetaKey = isset($commentCountOptions['linkToMetaKey']) ? $commentCountOptions['linkToMetaKey'] : '';
        $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';


        $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
        $iconOptions = isset($icon['options']) ? $icon['options'] : [];

        $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
        $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
        $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
        $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
        $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


        $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
        $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


        $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
        $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

        $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
        $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

        $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';

        $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

        $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
        $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];

        $counts = wp_count_comments($post_ID);
        $countbyStatus = isset($counts->$status) ?  $counts->$status : 0;

        $formatedcommentCount = sprintf($customLabel, $countbyStatus);



        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }

        $linkAttrStr = '';



        if (!empty($postExcerptlinkAttr))
            foreach ($postExcerptlinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $linkAttrStrcommentCount = '';



        if (!empty($commentCountLinkAttr))
            foreach ($commentCountLinkAttr as $attr) {

                if (!empty($attr['val']))
                    $linkAttrStrcommentCount .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
            }


        $postGridCustomCss .= $customCss;


        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

        $linkUrl = '';

        if ($commentCountLinkTo == 'postUrl') {

            $linkUrl = get_permalink($post_ID);
        } else if ($commentCountLinkTo == 'customField') {

            $linkUrl = get_post_meta($post_ID, $commentCountLinkToMetaKey, true);
        } else if ($commentCountLinkTo == 'authorUrl') {
            $author_id = get_post_field('post_author', $post_ID);
            $user = get_user_by('ID', $author_id);
            $linkUrl = $user->user_url;
        } else if ($commentCountLinkTo == 'authorLink') {
            $author_id = get_post_field('post_author', $post_ID);
            $linkUrl = get_the_author_link($author_id);
        } else if ($commentCountLinkTo == 'homeUrl') {
            $linkUrl = get_bloginfo('home');
        } else if ($commentCountLinkTo == 'custom') {
            $linkUrl = $customUrl;
        }


        ob_start();


        if (!empty($wrapperTag)) :

?>
            <<?php echo esc_attr($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?>">


                <?php if ($iconPosition == 'beforePrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if ($prefixText) : ?>
                    <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo wp_kses_post($prefixText); ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPrefix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

                <?php if (!empty($commentCountLinkTo)) : ?>
                    <a class='commentCount' <?php
                                            /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                            echo ($linkAttrStrcommentCount); ?> target="<?php echo esc_attr($commentCountLinkTarget); ?>" rel="<?php echo esc_attr($commentCountRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>">
                        <?php if ($iconPosition == 'beforeCommentCount') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                        <?php echo wp_kses_post($formatedcommentCount); ?>
                        <?php if ($iconPosition == 'afterCommentCount') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </a>

                <?php else : ?>

                    <span class='commentCount' <?php
                                                /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                                echo ($linkAttrStrcommentCount); ?>>
                        <?php if ($iconPosition == 'beforeCommentCount') :
                        ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif;
                        ?>
                        <?php echo wp_kses_post($formatedcommentCount); ?>
                        <?php if ($iconPosition == 'afterCommentCount') : ?>
                            <?php echo wp_kses_post($fontIconHtml); ?>
                        <?php endif; ?>
                    </span>


                <?php endif; ?>






                <?php if ($iconPosition == 'beforePostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <?php if ($postfixText) : ?>
                    <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
                <?php endif; ?>

                <?php if ($iconPosition == 'afterPostfix') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>

            </<?php echo esc_attr($wrapperTag); ?>>
        <?php

        endif;

        if (empty($wrapperTag)) :

        ?>
            <?php if ($iconPosition == 'beforePrefix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($prefixText) : ?>
                <span class="<?php echo esc_attr($prefixClass); ?>"><?php echo $prefixText; ?></span>
            <?php endif; ?>

            <?php if ($iconPosition == 'afterPrefix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>

            <?php if (!empty($commentCountLinkTo)) : ?>

                <a class='commentCount' <?php
                                        /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                        echo ($linkAttrStrcommentCount); ?> target="<?php echo esc_attr($commentCountLinkTarget); ?>" rel="<?php echo esc_attr($commentCountRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url_raw($linkUrl) :  esc_url_raw($post_url); ?>">
                    <?php if ($iconPosition == 'beforeCommentCount') : ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php endif; ?>
                    <?php echo wp_kses_post($formatedcommentCount); ?>C
                    <?php if ($iconPosition == 'afterCommentCount') : ?>
                        <?php echo wp_kses_post($fontIconHtml); ?>
                    <?php endif; ?>
                </a>
            <?php else : ?>
                <?php if ($iconPosition == 'beforeCommentCount') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
                <span class='commentCount'><?php echo wp_kses_post($formatedcommentCount); ?></span>
                <?php if ($iconPosition == 'afterCommentCount') : ?>
                    <?php echo wp_kses_post($fontIconHtml); ?>
                <?php endif; ?>
            <?php endif; ?>



            <?php if ($iconPosition == 'beforePostfix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($postfixText) : ?>
                <span class="<?php echo $postfixClass; ?>"><?php echo $postfixText; ?></span>
            <?php endif; ?>
            <?php if ($iconPosition == 'afterPostfix') : ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
        <?php

        endif;

        ?>









<?php return ob_get_clean();
    }
}

$PGBlocpostCommentCount = new PGBlocpostCommentCount();
