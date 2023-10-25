<?php
/*
Plugin Name: Post Grid Combo
Plugin URI: https://www.pickplugins.com/post-grid
Description: Post Grid Combo is extremely easy to use for creating grid-layout and post-layout. Also, we're offering many small blocks with extensive flexibility.
Version: 2.2.64
Author: PickPlugins
Author URI: https://www.pickplugins.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/



if (!defined('ABSPATH'))
    exit; // if direct access 

if (!class_exists('PostGrid')) {
    class PostGrid
    {

        public function __construct()
        {


            add_action('plugins_loaded', [$this, 'init_plugin']);
            define('post_grid_plugin_url', plugins_url('/', __FILE__));
            define('post_grid_plugin_dir', plugin_dir_path(__FILE__));
            define('post_grid_plugin_basename', plugin_basename(__FILE__));
            define('post_grid_plugin_name', 'Post Grid Combo');
            define('post_grid_version', '2.2.64');
            define('post_grid_server_url', 'https://www.pickplugins.com/demo/post-grid/');



            require_once(post_grid_plugin_dir . 'src/functions-blocks.php');
            require_once(post_grid_plugin_dir . 'src/functions-rest.php');

            require_once(post_grid_plugin_dir . 'src/blocks/post-grid/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/wordpress-org/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/menu-wrap/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/menu-wrap-item/index.php');

            // require_once(post_grid_plugin_dir . 'src/blocks/table-of-contents/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-title/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-title/patterns.php');


            require_once(post_grid_plugin_dir . 'src/blocks/post-excerpt/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/text/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/read-more/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-featured-image/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-categories/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-tags/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-author/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-taxonomies/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-author-fields/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-date/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/accordion/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/tabs-nested/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/tabs-nested-item/index.php');

            require_once(post_grid_plugin_dir . 'src/blocks/terms-list/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/layers/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/layer/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/image/index.php');
            // require_once(post_grid_plugin_dir . 'src/blocks/list-nested/index.php');
            // require_once(post_grid_plugin_dir . 'src/blocks/list-nested-item/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/number-counter/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/date-countdown/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/popup/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/progress-bar/index.php');

            require_once(post_grid_plugin_dir . 'src/blocks/list/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/image-gallery/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/image-gallery-item/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/content-slider/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/content-slider-item/index.php');


            require_once(post_grid_plugin_dir . 'src/blocks/icon/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-meta/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-grid-filterable/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/shortcode/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/social-share/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/breadcrumb/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/archive-title/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/archive-description/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/post-comment-count/index.php');

            require_once(post_grid_plugin_dir . 'src/blocks/star-rate/index.php');

            require_once(post_grid_plugin_dir . 'src/blocks/accordion-nested/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/accordion-nested-item/index.php');

            require_once(post_grid_plugin_dir . 'src/blocks/flex-wrap/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/flex-wrap-item/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/grid-wrap/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/grid-wrap-item/index.php');

            require_once(post_grid_plugin_dir . 'src/blocks/form-wrap/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-wrap/functions.php');


            require_once(post_grid_plugin_dir . 'src/blocks/form-field-input/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-field-file-multi/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-field-file/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-field-submit/index.php');


            require_once(post_grid_plugin_dir . 'src/blocks/form-field-checkbox/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-field-radio/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-field-select/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/form-field-textarea/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-sku/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-total-sales/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-stock-quantity/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-product-info/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-price/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-add-to-cart/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-star-rate/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-sale/index.php');
            require_once(post_grid_plugin_dir . 'src/blocks/woo-stock/index.php');




            $postGridCss = [];
            $postGridCssY = [];
            $postGridScriptData = [];
            $postGridFonts = [];


            global $postGridCss;
            global $postGridCustomCss;
            global $postGridCssY;
            global $postGridScriptData;
            global $postGridFonts;

            global $postGridLoaded;




            include('includes/classes/class-post-types.php');
            include('includes/classes/class-meta-boxes.php');
            include('includes/classes/class-functions.php');
            include('includes/classes/class-shortcodes.php');
            include('includes/classes/class-settings.php');
            include('includes/classes/class-settings-tabs.php');


            include('includes/classes/class-admin-notices.php');

            include('includes/metabox-post-grid-layout-hook.php');
            include('includes/metabox-post-grid-hook.php');
            include('includes/metabox-post-options-hook.php');

            include('includes/settings-hook.php');
            include('templates/post-grid-hook.php');
            include('includes/shortcodes/shortcode-today-date.php');

            include('includes/post-grid-layout-elements.php');
            include('includes/media-source-options.php');
            include('includes/layout-elements/3rd-party.php');
            include('includes/functions-layout-api.php');
            include('includes/metabox-post-grid-editor-hook.php');
            include('includes/functions-ajax.php');


            include('includes/functions-data-upgrade.php');
            //include('includes/functions-single.php');


            include('includes/classes/class-post-grid-support.php');
            include('includes/data-update/class-post-grid-data-update.php');

            include('includes/functions-post-grid.php');
            include('includes/functions.php');
            include('includes/shortcodes/shortcode-current_user_id.php');
            include('includes/duplicate-post.php');


            add_action('wp_enqueue_scripts', array($this, '_scripts_front'));
            add_action('admin_enqueue_scripts', array($this, '_scripts_admin'));
            add_action('admin_enqueue_scripts', 'wp_enqueue_media');

            add_action('plugins_loaded', array($this, '_textdomain'));

            register_activation_hook(__FILE__, array($this, '_activation'));
            register_deactivation_hook(__FILE__, array($this, '_deactivation'));


            add_action('activated_plugin', array($this, 'redirect_welcome'));


            // $args = array(
            //     'post_types' => array('post_grid', 'post_grid_layout', 'post_grid_template'),
            // );

            // new PPduplicatePost($args);
        }





        public function init_plugin()
        {
            $this->enqueue_scripts();
        }

        public function _textdomain()
        {

            $locale = apply_filters('plugin_locale', get_locale(), 'post-grid');
            load_textdomain('post-grid', WP_LANG_DIR . '/post-grid/post-grid-' . $locale . '.mo');

            load_plugin_textdomain('post-grid', false, plugin_basename(dirname(__FILE__)) . '/languages/');
        }


        public function redirect_welcome($plugin)
        {


            if ($plugin == 'post-grid/post-grid.php') {
                wp_safe_redirect(admin_url('admin.php?page=post-grid-overview'));
                exit;
            }
        }

        public function _activation()
        {


            $class_post_grid_functions = new class_post_grid_functions();


            // $post_grid_info = get_option('post_grid_info');
            // $post_grid_info['current_version'] = post_grid_version;
            // $post_grid_info['last_version'] = '2.2.13';
            // $post_grid_info['data_update_status'] = isset($post_grid_info['data_update_status']) ? $post_grid_info['data_update_status'] : 'pending';
            // update_option('post_grid_info', $post_grid_info);


            $class_post_grid_post_types = new class_post_grid_post_types();
            $class_post_grid_post_types->_posttype_post_grid();
            $class_post_grid_post_types->_posttype_post_grid_layout();


            flush_rewrite_rules();

            /*
             * Custom action hook for plugin activation.
             * Action hook: post_grid_activation
             * */
            do_action('post_grid_activation');
        }

        public function post_grid_uninstall()
        {

            /*
             * Custom action hook for plugin uninstall/delete.
             * Action hook: post_grid_uninstall
             * */
            do_action('post_grid_uninstall');
        }

        public function _deactivation()
        {

            /*
             * Custom action hook for plugin deactivation.
             * Action hook: post_grid_deactivation
             * */
            do_action('post_grid_deactivation');
        }


        public function _scripts_front()
        {


            wp_enqueue_script('jquery');

            // Register Scripts & JS
            wp_register_script('post_grid_scripts', post_grid_plugin_url . 'assets/frontend/js/scripts.js', array('jquery'));

            wp_enqueue_script('post_grid_scripts');
            wp_localize_script('post_grid_scripts', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));

            //wp_register_script('masonry', post_grid_plugin_url . 'assets/frontend/js/masonry.pkgd.min.js', array('jquery'));
            //wp_register_script('imagesloaded', post_grid_plugin_url . 'assets/frontend/js/imagesloaded.pkgd.js', array('jquery'));
            wp_register_script('justifiedGallery', post_grid_plugin_url . 'assets/frontend/js/jquery.justifiedGallery.min.js', array('jquery'));


            wp_register_style('justifiedGallery', post_grid_plugin_url . 'assets/frontend/css/justifiedGallery.min.css');

            // Register CSS & Styles
            wp_register_style('post-grid-style', post_grid_plugin_url . 'assets/frontend/css/style.css');
            wp_register_style('post-grid-skin', post_grid_plugin_url . 'assets/global/css/style.skins.css');

            wp_register_style('font-awesome-4', post_grid_plugin_url . 'assets/global/css/font-awesome-4.css');
            wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css');

            wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/css/bootstrap-icons/bootstrap-icons.css');
            wp_register_style('fontawesome-icons', post_grid_plugin_url . 'assets/css/fontawesome/css/all.min.css');
            wp_register_style('icofont-icons', post_grid_plugin_url . 'assets/css/icofont/icofont.min.css');

            wp_register_script('scrollto', post_grid_plugin_url . 'assets/frontend/js/jquery-scrollto.js', array('jquery'));
        }

        public function enqueue_scripts()
        {
            add_action('enqueue_block_editor_assets', [$this, 'register_block_editor_assets']);
        }

        public function _scripts_admin()
        {

            $screen = get_current_screen();



            wp_register_script('post_grid_admin_js', post_grid_plugin_url . 'assets/admin/js/scripts.js', array('jquery'));

            wp_register_script('select2', post_grid_plugin_url . 'assets/admin/js/select2.full.js', array('jquery'));
            wp_register_style('select2', post_grid_plugin_url . 'assets/admin/css/select2.min.css');
            wp_register_style('postgrid-editor', post_grid_plugin_url . 'assets/admin/css/postgrid-editor.css');

            wp_register_script('jquery.lazy', post_grid_plugin_url . 'assets/admin/js/jquery.lazy.js', array('jquery'));


            wp_enqueue_style('post_grid_skin', post_grid_plugin_url . 'assets/global/css/style.skins.css');

            wp_register_style('jquery-ui', post_grid_plugin_url . 'assets/admin/css/jquery-ui.css');

            wp_register_style('font-awesome-4', post_grid_plugin_url . 'assets/global/css/font-awesome-4.css');
            wp_register_style('font-awesome-5', post_grid_plugin_url . 'assets/global/css/font-awesome-5.css', [], '', 'all');

            wp_enqueue_style('font-awesome-5');


            wp_register_style('icofont', post_grid_plugin_url . 'assets/global/css/icofont/icofont.min.css');

            wp_enqueue_style('icofont');

            wp_register_style('bootstrap-icons', post_grid_plugin_url . 'assets/global/css/bootstrap-icons/bootstrap-icons.css');

            wp_enqueue_style('bootstrap-icons');



            wp_register_style('settings-tabs', post_grid_plugin_url . 'assets/settings-tabs/settings-tabs.css');
            wp_register_script('settings-tabs', post_grid_plugin_url . 'assets/settings-tabs/settings-tabs.js', array('jquery'));


            wp_register_style('layout-editor', post_grid_plugin_url . 'assets/admin/css/layout-editor.css');
            wp_register_script('layout-editor', post_grid_plugin_url . 'assets/admin/js/layout-editor.js', array('jquery'));

            wp_register_style('post-grid-addons', post_grid_plugin_url . 'assets/admin/css/addons.css');

            wp_register_script('post_grid_layouts', post_grid_plugin_url . 'assets/admin/js/scripts-layouts.js', array('jquery'));


            // wp_localize_script('wp-api', 'wpApiSettings', array('root' => esc_url_raw(rest_url()), 'nonce' => wp_create_nonce('wp_rest')));
            // wp_enqueue_script('wp-api');



            wp_localize_script(
                'post_grid_layouts',
                'post_grid_ajax',
                array(
                    'post_grid_ajaxurl' => admin_url('admin-ajax.php'),
                    'ajax_nonce' => wp_create_nonce('post_grid_ajax_nonce'),
                )
            );

            if ($screen->id == 'post_grid') {

                wp_enqueue_script('post_grid_admin_js');
                wp_localize_script('post_grid_admin_js', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));

                wp_enqueue_style('post_grid_skin');



                wp_enqueue_style('select2');
                wp_enqueue_script('select2');

                $settings_tabs_field = new settings_tabs_field();
                $settings_tabs_field->admin_scripts();
            }

            if ($screen->id == 'post_grid_layout') {

                wp_enqueue_style('select2');
                wp_enqueue_script('select2');



                $settings_tabs_field = new settings_tabs_field();
                $settings_tabs_field->admin_scripts();
            }


            if ($screen->id == 'post-grid-combo_page_post-grid-settings') {

                wp_enqueue_script('post_grid_admin_js');
                wp_localize_script('post_grid_admin_js', 'post_grid_ajax', array('post_grid_ajaxurl' => admin_url('admin-ajax.php')));
                wp_enqueue_style('select2');
                wp_enqueue_script('select2');


                wp_enqueue_style(
                    'prefix-editor',
                    post_grid_plugin_url . 'dist/output.css',
                    [],
                    time(),
                    'all'
                );

                $settings_tabs_field = new settings_tabs_field();
                $settings_tabs_field->admin_scripts();
            }
        }



        public function register_block_editor_assets()
        {

            wp_enqueue_style(
                'post-grid-editor',
                post_grid_plugin_url . '/dist/output.css',
                [],
                time(),
                'all'
            );



            wp_enqueue_style(
                'post-grid-custom',
                post_grid_plugin_url . '/dist/custom.css',
                [],
                time(),
                'all'
            );

            wp_enqueue_style(
                'PostGrid-v1.0',
                post_grid_plugin_url . '/assets/PostGrid-v1.0/style.css',
                [],
                time(),
                'all'
            );


            // wp_enqueue_style(
            //     'PostGrid-custom',
            //     post_grid_plugin_url . '/src/css/custom-style.css',
            //     [],
            //     time(),
            //     'all'
            // );

            wp_enqueue_style(
                'post-grid-combo-editor',
                post_grid_plugin_url . '/src/blocks-styles-editor.css',
                [],
                time(),
                'all'
            );

            wp_enqueue_style(
                'post-grid-combo-google-fonts',
                'https://fonts.googleapis.com/css?family=CharukolaUltraLight|ABeeZee|Abel|Abhaya+Libre|Abril+Fatface|Aclonica|Acme|Actor|Adamina|Advent+Pro|Aguafina+Script|Akaya+Kanadaka|Akaya+Telivigala|Akronim|Aladin|Alata|Alatsi|Aldrich|Alef|Alegreya|Alegreya+SC|Alegreya+Sans|Alegreya+Sans+SC|Aleo|Alex+Brush|Alfa+Slab+One|Alice|Alike|Alike+Angular|Allan|Allerta|Allerta+Stencil|Allura|Almarai|Almendra|Almendra+Display|Almendra+SC|Amarante|Amaranth|Amatic+SC|Amethysta|Amiko|Amiri|Amita|Anaheim|Andada|Andika|Andika+New+Basic|Angkor|Annie+Use+Your+Telescope|Anonymous+Pro|Antic|Antic+Didone|Antic+Slab|Anton|Antonio|Arapey|Arbutus|Arbutus+Slab|Architects+Daughter|Archivo|Archivo+Black|Archivo+Narrow|Aref+Ruqaa|Arima+Madurai|Arimo|Arizonia|Armata|Arsenal|Artifika|Arvo|Arya|Asap|Asap+Condensed|Asar|Asset|Assistant|Astloch|Asul|Athiti|Atma|Atomic+Age|Aubrey|Audiowide|Autour+One|Average|Average+Sans|Averia+Gruesa+Libre|Averia+Libre|Averia+Sans+Libre|Averia+Serif+Libre|B612|B612+Mono|Bad+Script|Bahiana|Bahianita|Bai+Jamjuree|Ballet|Baloo+2|Baloo+Bhai+2|Baloo+Bhaina+2|Baloo+Chettan+2|Baloo+Da+2|Baloo+Paaji+2|Baloo+Tamma+2|Baloo+Tammudu+2|Baloo+Thambi+2|Balsamiq+Sans|Balthazar|Bangers|Barlow|Barlow+Condensed|Barlow+Semi+Condensed|Barriecito|Barrio|Basic|Baskervville|Battambang|Baumans|Bayon|Be+Vietnam|Bebas+Neue|Belgrano|Bellefair|Belleza|Bellota|Bellota+Text|BenchNine|Benne|Bentham|Berkshire+Swash|Beth+Ellen|Bevan|Big+Shoulders+Display|Big+Shoulders+Inline+Display|Big+Shoulders+Inline+Text|Big+Shoulders+Stencil+Display|Big+Shoulders+Stencil+Text|Big+Shoulders+Text|Bigelow+Rules|Bigshot+One|Bilbo|Bilbo+Swash+Caps|BioRhyme|BioRhyme+Expanded|Biryani|Bitter|Black+And+White+Picture|Black+Han+Sans|Black+Ops+One|Blinker|Bodoni+Moda|Bokor|Bonbon|Boogaloo|Bowlby+One|Bowlby+One+SC|Brawler|Bree+Serif|Brygada+1918|Bubblegum+Sans|Bubbler+One|Buda|Buenard|Bungee|Bungee+Hairline|Bungee+Inline|Bungee+Outline|Bungee+Shade|Butcherman|Butterfly+Kids|Cabin|Cabin+Condensed|Cabin+Sketch|Caesar+Dressing|Cagliostro|Cairo|Caladea|Calistoga|Calligraffitti|Cambay|Cambo|Candal|Cantarell|Cantata+One|Cantora+One|Capriola|Cardo|Carme|Carrois+Gothic|Carrois+Gothic+SC|Carter+One|Castoro|Catamaran|Caudex|Caveat|Caveat+Brush|Cedarville+Cursive|Ceviche+One|Chakra+Petch|Changa|Changa+One|Chango|Charm|Charmonman|Chathura|Chau+Philomene+One|Chela+One|Chelsea+Market|Chenla|Cherry+Cream+Soda|Cherry+Swash|Chewy|Chicle|Chilanka|Chivo|Chonburi|Cinzel|Cinzel+Decorative|Clicker+Script|Coda|Coda+Caption|Codystar|Coiny|Combo|Comfortaa|Comic+Neue|Coming+Soon|Commissioner|Concert+One|Condiment|Content|Contrail+One|Convergence|Cookie|Copse|Corben|Cormorant|Cormorant+Garamond|Cormorant+Infant|Cormorant+SC|Cormorant+Unicase|Cormorant+Upright|Courgette|Courier+Prime|Cousine|Coustard|Covered+By+Your+Grace|Crafty+Girls|Creepster|Crete+Round|Crimson+Pro|Crimson+Text|Croissant+One|Crushed|Cuprum|Cute+Font|Cutive|Cutive+Mono|DM+Mono|DM+Sans|DM+Serif+Display|DM+Serif+Text|Damion|Dancing+Script|Dangrek|Darker+Grotesque|David+Libre|Dawning+of+a+New+Day|Days+One|Dekko|Dela+Gothic+One|Delius|Delius+Swash+Caps|Delius+Unicase|Della+Respira|Denk+One|Devonshire|Dhurjati|Didact+Gothic|Diplomata|Diplomata+SC|Do+Hyeon|Dokdo|Domine|Donegal+One|Doppio+One|Dorsa|Dosis|DotGothic16|Dr+Sugiyama|Duru+Sans|Dynalight|EB+Garamond|Eagle+Lake|East+Sea+Dokdo|Eater|Economica|Eczar|El+Messiri|Electrolize|Elsie|Elsie+Swash+Caps|Emblema+One|Emilys+Candy|Encode+Sans|Encode+Sans+Condensed|Encode+Sans+Expanded|Encode+Sans+Semi+Condensed|Encode+Sans+Semi+Expanded|Engagement|Englebert|Enriqueta|Epilogue|Erica+One|Esteban|Euphoria+Script|Ewert|Exo|Exo+2|Expletus+Sans|Fahkwang|Fanwood+Text|Farro|Farsan|Fascinate|Fascinate+Inline|Faster+One|Fasthand|Fauna+One|Faustina|Federant|Federo|Felipa|Fenix|Finger+Paint|Fira+Code|Fira+Mono|Fira+Sans|Fira+Sans+Condensed|Fira+Sans+Extra+Condensed|Fjalla+One|Fjord+One|Flamenco|Flavors|Fondamento|Fontdiner+Swanky|Forum|Francois+One|Frank+Ruhl+Libre|Fraunces|Freckle+Face|Fredericka+the+Great|Fredoka+One|Freehand|Fresca|Frijole|Fruktur|Fugaz+One|GFS+Didot|GFS+Neohellenic|Gabriela|Gaegu|Gafata|Galada|Galdeano|Galindo|Gamja+Flower|Gayathri|Gelasio|Gentium+Basic|Gentium+Book+Basic|Geo|Geostar|Geostar+Fill|Germania+One|Gidugu|Gilda+Display|Girassol|Give+You+Glory|Glass+Antiqua|Glegoo|Gloria+Hallelujah|Goblin+One|Gochi+Hand|Goldman|Gorditas|Gothic+A1|Gotu|Goudy+Bookletter+1911|Graduate|Grand+Hotel|Grandstander|Gravitas+One|Great+Vibes|Grenze|Grenze+Gotisch|Griffy|Gruppo|Gudea|Gugi|Gupter|Gurajada|Habibi|Hachi+Maru+Pop|Halant|Hammersmith+One|Hanalei|Hanalei+Fill|Handlee|Hanuman|Happy+Monkey|Harmattan|Headland+One|Heebo|Henny+Penny|Hepta+Slab|Herr+Von+Muellerhoff|Hi+Melody|Hind|Hind+Guntur|Hind+Madurai|Hind+Siliguri|Hind+Vadodara|Holtwood+One+SC|Homemade+Apple|Homenaje|IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Sans+Condensed|IBM+Plex+Serif|IM+Fell+DW+Pica|IM+Fell+DW+Pica+SC|IM+Fell+Double+Pica|IM+Fell+Double+Pica+SC|IM+Fell+English|IM+Fell+English+SC|IM+Fell+French+Canon|IM+Fell+French+Canon+SC|IM+Fell+Great+Primer|IM+Fell+Great+Primer+SC|Ibarra+Real+Nova|Iceberg|Iceland|Imbue|Imprima|Inconsolata|Inder|Indie+Flower|Inika|Inknut+Antiqua|Inria+Sans|Inria+Serif|Inter|Irish+Grover|Istok+Web|Italiana|Italianno|Itim|Jacques+Francois|Jacques+Francois+Shadow|Jaldi|JetBrains+Mono|Jim+Nightshade|Jockey+One|Jolly+Lodger|Jomhuria|Jomolhari|Josefin+Sans|Josefin+Slab|Jost|Joti+One|Jua|Judson|Julee|Julius+Sans+One|Junge|Jura|Just+Another+Hand|Just+Me+Again+Down+Here|K2D|Kadwa|Kalam|Kameron|Kanit|Kantumruy|Karantina|Karla|Karma|Katibeh|Kaushan+Script|Kavivanar|Kavoon|Kdam+Thmor|Keania+One|Kelly+Slab|Kenia|Khand|Khmer|Khula|Kirang+Haerang|Kite+One|Kiwi+Maru|Knewave|KoHo|Kodchasan|Kosugi|Kosugi+Maru|Kotta+One|Koulen|Kranky|Kreon|Kristi|Krona+One|Krub|Kufam|Kulim+Park|Kumar+One|Kumar+One+Outline|Kumbh+Sans|Kurale|La+Belle+Aurore|Lacquer|Laila|Lakki+Reddy|Lalezar|Lancelot|Langar|Lateef|Lato|League+Script|Leckerli+One|Ledger|Lekton|Lemon|Lemonada|Lexend|Lexend+Deca|Lexend+Exa|Lexend+Giga|Lexend+Mega|Lexend+Peta|Lexend+Tera|Lexend+Zetta|Libre+Barcode+128|Libre+Barcode+128+Text|Libre+Barcode+39|Libre+Barcode+39+Extended|Libre+Barcode+39+Extended+Text|Libre+Barcode+39+Text|Libre+Barcode+EAN13+Text|Libre+Baskerville|Libre+Caslon+Display|Libre+Caslon+Text|Libre+Franklin|Life+Savers|Lilita+One|Lily+Script+One|Limelight|Linden+Hill|Literata|Liu+Jian+Mao+Cao|Livvic|Lobster|Lobster+Two|Londrina+Outline|Londrina+Shadow|Londrina+Sketch|Londrina+Solid|Long+Cang|Lora|Love+Ya+Like+A+Sister|Loved+by+the+King|Lovers+Quarrel|Luckiest+Guy|Lusitana|Lustria|M+PLUS+1p|M+PLUS+Rounded+1c|Ma+Shan+Zheng|Macondo|Macondo+Swash+Caps|Mada|Magra|Maiden+Orange|Maitree|Major+Mono+Display|Mako|Mali|Mallanna|Mandali|Manjari|Manrope|Mansalva|Manuale|Marcellus|Marcellus+SC|Marck+Script|Margarine|Markazi+Text|Marko+One|Marmelad|Martel|Martel+Sans|Marvel|Mate|Mate+SC|Maven+Pro|McLaren|Meddon|MedievalSharp|Medula+One|Meera+Inimai|Megrim|Meie+Script|Merienda|Merienda+One|Merriweather|Merriweather+Sans|Metal|Metal+Mania|Metamorphous|Metrophobic|Michroma|Milonga|Miltonian|Miltonian+Tattoo|Mina|Miniver|Miriam+Libre|Mirza|Miss+Fajardose|Mitr|Modak|Modern+Antiqua|Mogra|Molengo|Molle|Monda|Monofett|Monoton|Monsieur+La+Doulaise|Montaga|Montez|Montserrat|Montserrat+Alternates|Montserrat+Subrayada|Moul|Moulpali|Mountains+of+Christmas|Mouse+Memoirs|Mr+Bedfort|Mr+Dafoe|Mr+De+Haviland|Mrs+Saint+Delafield|Mrs+Sheppards|Mukta|Mukta+Mahee|Mukta+Malar|Mukta+Vaani|Mulish|MuseoModerno|Mystery+Quest|NTR|Nanum+Brush+Script|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Nanum+Pen+Script|Nerko+One|Neucha|Neuton|New+Rocker|New+Tegomin|News+Cycle|Newsreader|Niconne|Niramit|Nixie+One|Nobile|Nokora|Norican|Nosifer|Notable|Nothing+You+Could+Do|Noticia+Text|Noto+Sans|Noto+Sans+HK|Noto+Sans+JP|Noto+Sans+KR|Noto+Sans+SC|Noto+Sans+TC|Noto+Serif|Noto+Serif+JP|Noto+Serif+KR|Noto+Serif+SC|Noto+Serif+TC|Nova+Cut|Nova+Flat|Nova+Mono|Nova+Oval|Nova+Round|Nova+Script|Nova+Slim|Nova+Square|Numans|Nunito|Nunito+Sans|Odibee+Sans|Odor+Mean+Chey|Offside|Oi|Old+Standard+TT|Oldenburg|Oleo+Script|Oleo+Script+Swash+Caps|Open+Sans|Open+Sans+Condensed|Oranienbaum|Orbitron|Oregano|Orelega+One|Orienta|Original+Surfer|Oswald|Over+the+Rainbow|Overlock|Overlock+SC|Overpass|Overpass+Mono|Ovo|Oxanium|Oxygen|Oxygen+Mono|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pacifico|Padauk|Palanquin|Palanquin+Dark|Pangolin|Paprika|Parisienne|Passero+One|Passion+One|Pathway+Gothic+One|Patrick+Hand|Patrick+Hand+SC|Pattaya|Patua+One|Pavanam|Paytone+One|Peddana|Peralta|Permanent+Marker|Petit+Formal+Script|Petrona|Philosopher|Piazzolla|Piedra|Pinyon+Script|Pirata+One|Plaster|Play|Playball|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Poller+One|Poly|Pompiere|Pontano+Sans|Poor+Story|Poppins|Port+Lligat+Sans|Port+Lligat+Slab|Potta+One|Pragati+Narrow|Prata|Preahvihear|Press+Start+2P|Pridi|Princess+Sofia|Prociono|Prompt|Prosto+One|Proza+Libre|Public+Sans|Puritan|Purple+Purse|Quando|Quantico|Quattrocento|Quattrocento+Sans|Questrial|Quicksand|Quintessential|Qwigley|Racing+Sans+One|Radley|Rajdhani|Rakkas|Raleway|Raleway+Dots|Ramabhadra|Ramaraja|Rambla|Rammetto+One|Ranchers|Rancho|Ranga|Rasa|Rationale|Ravi+Prakash|Recursive|Red+Hat+Display|Red+Hat+Text|Red+Rose|Redressed|Reem+Kufi|Reenie+Beanie|Reggae+One|Revalia|Rhodium+Libre|Ribeye|Ribeye+Marrow|Righteous|Risque|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rochester|Rock+Salt|RocknRoll+One|Rokkitt|Romanesco|Ropa+Sans|Rosario|Rosarivo|Rouge+Script|Rowdies|Rozha+One|Rubik|Rubik+Mono+One|Ruda|Rufina|Ruge+Boogie|Ruluko|Rum+Raisin|Ruslan+Display|Russo+One|Ruthie|Rye|Sacramento|Sahitya|Sail|Saira|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Saira+Stencil+One|Salsa|Sanchez|Sancreek|Sansita|Sansita+Swashed|Sarabun|Sarala|Sarina|Sarpanch|Satisfy|Sawarabi+Gothic|Sawarabi+Mincho|Scada|Scheherazade|Schoolbell|Scope+One|Seaweed+Script|Secular+One|Sedgwick+Ave|Sedgwick+Ave+Display|Sen|Sevillana|Seymour+One|Shadows+Into+Light|Shadows+Into+Light+Two|Shanti|Share|Share+Tech|Share+Tech+Mono|Shippori+Mincho|Shippori+Mincho+B1|Shojumaru|Short+Stack|Shrikhand|Siemreap|Sigmar+One|Signika|Signika+Negative|Simonetta|Single+Day|Sintony|Sirin+Stencil|Six+Caps|Skranji|Slabo+13px|Slabo+27px|Slackey|Smokum|Smythe|Sniglet|Snippet|Snowburst+One|Sofadi+One|Sofia|Solway|Song+Myung|Sonsie+One|Sora|Sorts+Mill+Goudy|Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro|Space+Grotesk|Space+Mono|Spartan|Special+Elite|Spectral|Spectral+SC|Spicy+Rice|Spinnaker|Spirax|Squada+One|Sree+Krushnadevaraya|Sriracha|Srisakdi|Staatliches|Stalemate|Stalinist+One|Stardos+Stencil|Stick|Stint+Ultra+Condensed|Stint+Ultra+Expanded|Stoke|Strait|Stylish|Sue+Ellen+Francisco|Suez+One|Sulphur+Point|Sumana|Sunflower|Sunshiney|Supermercado+One|Sura|Suranna|Suravaram|Suwannaphum|Swanky+and+Moo+Moo|Syncopate|Syne|Syne+Mono|Syne+Tactile|Tajawal|Tangerine|Taprom|Tauri|Taviraj|Teko|Telex|Tenali+Ramakrishna|Tenor+Sans|Text+Me+One|Texturina|Thasadith|The+Girl+Next+Door|Tienne|Tillana|Timmana|Tinos|Titan+One|Titillium+Web|Tomorrow|Trade+Winds|Train+One|Trirong|Trispace|Trocchi|Trochut|Truculenta|Trykker|Tulpen+One|Turret+Road|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Ultra|Uncial+Antiqua|Underdog|Unica+One|UnifrakturCook|UnifrakturMaguntia|Unkempt|Unlock|Unna|VT323|Vampiro+One|Varela|Varela+Round|Varta|Vast+Shadow|Vesper+Libre|Viaoda+Libre|Vibes|Vibur|Vidaloka|Viga|Voces|Volkhov|Vollkorn|Vollkorn+SC|Voltaire|Waiting+for+the+Sunrise|Wallpoet|Walter+Turncoat|Warnes|Wellfleet|Wendy+One|Wire+One|Work+Sans|Xanh+Mono|Yanone+Kaffeesatz|Yantramanav|Yatra+One|Yellowtail|Yeon+Sung|Yeseva+One|Yesteryear|Yrsa|Yusei+Magic|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei|Zen+Dots|Zeyada|Zhi+Mang+Xing|Zilla+Slab|Zilla+Slab+Highlight',
                [],
                time(),
                'all'
            );


            wp_enqueue_style(
                'font-awesome-5',
                post_grid_plugin_url . '/assets/global/css/font-awesome-5.css',
                [],
                time(),
                'all'
            );

            wp_enqueue_script(
                'post-grid-blocks',
                post_grid_plugin_url . 'build/index.js',
                [
                    'wp-blocks',
                    'wp-editor',
                    'wp-i18n',
                    'wp-element',
                    'wp-components',
                    'wp-data',
                    'wp-plugins',
                    'wp-edit-post',
                ],
                time()

            );
            $post_grid_settings = get_option('post_grid_settings');
            $disable_blocks = isset($post_grid_settings['disable_blocks']) ? $post_grid_settings['disable_blocks'] : [];


            wp_localize_script('post-grid-blocks', 'postGridDisabledBlocks', $disable_blocks);
        }
    }
}
new PostGrid();
