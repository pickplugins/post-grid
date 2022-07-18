<?php
if (!defined('ABSPATH')) exit();



class BlockPostGridRest
{
    function __construct()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
    }


    public function register_routes()
    {
        register_rest_route(
            'blockxyz/v2',
            '/get_terms',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_all_terms'),
                'permission_callback' => '__return_true',
            )
        );

        register_rest_route(
            'blockxyz/v2',
            '/get_posts',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_posts'),
                'permission_callback' => '__return_true',
            )
        );

        register_rest_route(
            'blockxyz/v2',
            '/get_tax_terms',
            array(
                'methods'  => 'POST',
                'callback' => array($this, 'get_tax_terms'),
                'permission_callback' => '__return_true',
            )
        );
    }



    /**
     * Return Posts
     *
     * @since 1.0.0
     * @param WP_REST_Request $post_data Post data.
     */
    public function get_posts($post_data)
    {

        $queryArgs      = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];

        //error_log(serialize($queryArgs));


        $post_types       = isset($post_data['post_types']) ? $post_data['post_types'] : ['post_grid_layout'];

        $query_args = [];
        $posts = [];

        $query_args['post_type'] = $post_types;
        $post_grid_wp_query = new WP_Query($query_args);


        if ($post_grid_wp_query->have_posts()) :

            while ($post_grid_wp_query->have_posts()) : $post_grid_wp_query->the_post();

                global $post;

                $post_id = $post->ID;
                $post->post_id = $post->ID;
                $post->post_title = $post->post_title;
                $post->post_excerpt = wp_kses_post($post->post_excerpt);
                $post->post_content = $post->post_content;
                $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
                $thumb_url = isset($thumb[0]) ? $thumb[0] : '';
                $post->thumb_url = !empty($thumb_url) ? $thumb_url : post_grid_plugin_url . 'assets/frontend/images/placeholder.png';

                $post->is_pro = ($post_id % 2 == 0) ? true : false;



                $posts[]            = $post;


            ////error_log(serialize($thumb_url));


            endwhile;
            wp_reset_query();
            wp_reset_postdata();
        endif;


        die(wp_json_encode($posts));
    }

    /**
     * Return terms for taxonomy.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_all_terms($tax_data)
    {
        $taxonomy  = $tax_data['taxonomy'];
        $post_type = $tax_data['post_type'];
        add_filter('terms_clauses', array($this, 'terms_clauses'), 10, 3);
        $terms = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => true,
                'post_type'  => $post_type,
            )
        );
        remove_filter('terms_clauses', array($this, 'terms_clauses'), 10, 3);
        if (is_wp_error($terms)) {
            die(wp_json_encode(array()));
        } else {
            die(wp_json_encode($terms));
        }
    }

    /**
     * Return terms for taxonomy.
     *
     * @since 4.0.0
     *
     * @param WP_REST_Request $tax_data The tax data.
     */
    public function get_tax_terms($tax_data)
    {
        $taxonomy = $tax_data['taxonomy'];
        $terms    = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => true,
            )
        );
        if (is_wp_error($terms)) {
            die(wp_json_encode(array()));
        } else {
            die(wp_json_encode($terms));
        }
    }






    /**
     * Extend get terms with post type parameter.
     *
     * @global $wpdb
     * @param string $clauses Term clauses.
     * @param string $taxonomy Taxonomy.
     * @param array  $args Aaaarghhhhs.
     * @return string
     */
    public function terms_clauses($clauses, $taxonomy, $args)
    {
        if (isset($args['post_type']) && !empty($args['post_type']) && 'count' === $args['fields']) {
            global $wpdb;

            $post_types = array();

            if (is_array($args['post_type'])) {
                foreach ($args['post_type'] as $cpt) {
                    $post_types[] = "'" . $cpt . "'";
                }
            } else {
                $post_types[] = "'" . $args['post_type'] . "'";
            }

            if (!empty($post_types)) {
                $clauses['fields']  = 'DISTINCT ' . str_replace('tt.*', 'tt.term_taxonomy_id, tt.taxonomy, tt.description, tt.parent', $clauses['fields']) . ', COUNT(p.post_type) AS count';
                $clauses['join']   .= ' LEFT JOIN ' . $wpdb->term_relationships . ' AS r ON r.term_taxonomy_id = tt.term_taxonomy_id LEFT JOIN ' . $wpdb->posts . ' AS p ON p.ID = r.object_id';
                $clauses['where']  .= ' AND (p.post_type IN (' . implode(',', $post_types) . ') OR p.post_type IS NULL)';
                $clauses['orderby'] = 'GROUP BY t.term_id ' . $clauses['orderby'];
            }
        }
        return $clauses;
    }
}

$BlockPostGrid = new BlockPostGridRest();
