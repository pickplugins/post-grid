<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins.com
*/

if (!defined('ABSPATH')) exit;  // if direct access





add_shortcode('post_grid_today_date', 'post_grid_today_date');

function post_grid_today_date($atts, $content = null)
{


	$atts = shortcode_atts(
		array(
			'format' => "Y-m-d",
		),
		$atts
	);


	$format = $atts['format'];

	return date($format);
}
