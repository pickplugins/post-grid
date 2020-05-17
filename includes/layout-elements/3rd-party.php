<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );


if ( is_plugin_active( 'yet-another-stars-rating/yet-another-stars-rating.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/yet-another-stars-rating/layout-elements.php');
}

if ( is_plugin_active( 'rating-widget/rating-widget.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/rating-widget/layout-elements.php');
}


if ( is_plugin_active( 'yith-woocommerce-wishlist/init.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/yith-woocommerce-wishlist/layout-elements.php');
}



if ( is_plugin_active( 'kk-star-ratings/index.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/kk-star-ratings/layout-elements.php');
}


if ( is_plugin_active( 'rate-my-post/rate-my-post.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/rate-my-post/layout-elements.php');
}


if ( is_plugin_active( 'wp-postratings/wp-postratings.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/wp-postratings/layout-elements.php');
}

if ( is_plugin_active( 'multi-rating/multi-rating.php' ) ) {

    require_once( post_grid_plugin_dir . 'includes/layout-elements/multi-rating/layout-elements.php');
}



































