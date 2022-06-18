<?php

if (!defined('ABSPATH')) exit;  // if direct access 



class class_post_grid_license2
{

	public function __construct()
	{


		//add_action( 'init', array( $this, 'check_plugin_update' ), 12 );

	}

	public function request_check($license_key)
	{


		if (is_multisite()) {
			$domain = site_url();
		} else {
			$domain = $_SERVER['SERVER_NAME'];
		}



		// API query parameters
		$api_params = array(
			'license_manager_action' => 'license_data',
			'license_key' => $license_key,
			'registered_domain' => $domain,
		);

		// Send query to the license manager server
		$response = wp_remote_get(add_query_arg($api_params, post_grid_lic_server_url), array('timeout' => 20, 'sslverify' => false));

		// Check for error in the response
		if (is_wp_error($response)) {
			echo __("Unexpected Error! The query returned with an error.", 'post-grid');
		} else {
			//var_dump($response);//uncomment it if you want to look at the full response

			// License data.
			$license_data = json_decode(wp_remote_retrieve_body($response));
			//var_dump($license_data);
			//echo $license_data->message;


			//$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';
			$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			$date_expiry = isset($license_data->date_expiry) ? sanitize_text_field($license_data->date_expiry) : '';
			$date_renewed = isset($license_data->date_renewed) ? sanitize_text_field($license_data->date_renewed) : '';

			$license_status = isset($license_data->license_status) ? sanitize_text_field($license_data->license_status) : '';
			$license_found = isset($license_data->license_found) ? sanitize_text_field($license_data->license_found) : '';
			$mgs = isset($license_data->mgs) ? sanitize_text_field($license_data->mgs) : '';
			$days_remaining = isset($license_data->days_remaining) ? sanitize_text_field($license_data->days_remaining) : '';


			$post_grid_license = array(
				'license_key' => $license_key,
				'date_created' => $date_created,
				'date_expiry' => $date_expiry,
				'date_renewed' => $date_renewed,

				'license_status' => $license_status,
				'license_found' => $license_found,
				'mgs' => $mgs,
				'days_remaining' => $days_remaining,
			);

			update_option('post_grid_license', $post_grid_license);

			return $post_grid_license;
		}
	}


	public function request_active($license_key)
	{


		if (is_multisite()) {
			$domain = site_url();
		} else {
			$domain = $_SERVER['SERVER_NAME'];
		}



		// API query parameters
		$api_params = array(
			'license_manager_action' => '_activate',
			'license_key' => $license_key,
			'registered_domain' => $domain,
		);

		// Send query to the license manager server
		$response = wp_remote_get(add_query_arg($api_params, post_grid_lic_server_url), array('timeout' => 20, 'sslverify' => false));

		// Check for error in the response
		if (is_wp_error($response)) {
			echo __("Unexpected Error! The query returned with an error.", 'post-grid');
		} else {
			//var_dump($response);//uncomment it if you want to look at the full response

			// License data.
			$license_data = json_decode(wp_remote_retrieve_body($response));
			//var_dump($license_data);
			//echo $license_data->message;


			$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';
			$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			$date_expiry = isset($license_data->date_expiry) ? sanitize_text_field($license_data->date_expiry) : '';
			$date_renewed = isset($license_data->date_renewed) ? sanitize_text_field($license_data->date_renewed) : '';

			$license_status = isset($license_data->license_status) ? sanitize_text_field($license_data->license_status) : '';
			$license_found = isset($license_data->license_found) ? sanitize_text_field($license_data->license_found) : '';
			$mgs = isset($license_data->mgs) ? sanitize_text_field($license_data->mgs) : '';
			$days_remaining = isset($license_data->days_remaining) ? sanitize_text_field($license_data->days_remaining) : '';


			$post_grid_license = array(
				'license_key' => $license_key,
				'date_created' => $date_created,
				'date_expiry' => $date_expiry,
				'date_renewed' => $date_renewed,

				'license_status' => $license_status,
				'license_found' => $license_found,
				'mgs' => $mgs,
				'days_remaining' => $days_remaining,
			);

			update_option('post_grid_license', $post_grid_license);

			return $post_grid_license;
		}
	}
}

new class_post_grid_license2();
