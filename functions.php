<?php
	function scripts() {
	    if( !is_admin() ) {

	    	/*$query_args = array(
				'family' => 'Rajdhani:400,300,500,600,700|Open+Sans:500,600,700',
				'subset' => 'latin,latin-ext',
			);
			wp_register_style( 'fonts', add_query_arg( $query_args, "//fonts.googleapis.com/css" ), array(), null );
			wp_enqueue_style('google-fonts' );*/
            
	    	//wp_register_script( 'theme-functions', get_stylesheet_directory_uri() . '/assets/js/child-theme-functions.js' );
    		//wp_enqueue_script( 'theme-functions' );	
	    }
	}
    add_action( 'wp_enqueue_scripts', 'scripts' );

	/**
	 * Enable specific Enfold features
	 */
	add_theme_support('avia_template_builder_custom_css');

	/**
	 * Disable the filtering of capital P from WordPress and content areas
	 */
	remove_filter( 'the_title', 'capital_P_dangit', 11 );
	remove_filter( 'the_content', 'capital_P_dangit', 11 );
	remove_filter( 'comment_text', 'capital_P_dangit', 31 );

	/**
	 * Set Default Editor to TinyMCE
	 */
	add_filter( 'wp_default_editor', create_function('', 'return "tinymce";') );

	/**
	 * Set Avia Builder to Debug Mode for Admins
	 */
	if ( current_user_can( 'manage_options' ) ) {
		add_action('avia_builder_mode', "builder_set_debug");
	}
	function builder_set_debug() {
		return "debug";
	}

	/**
	 * Avia Shortcode Overrides
	 */
	add_filter('avia_load_shortcodes', 'avia_include_shortcode_template', 15, 1);
	function avia_include_shortcode_template($paths)
	{
		$template_url = get_stylesheet_directory();
		array_unshift($paths, $template_url.'/avia-shortcode-overrides/');

		return $paths;
	}