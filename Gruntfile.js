module.exports = function(grunt) {
	/*
		Sublime Text 3 sftp-config.json:
		---------------------------

		"ignore_regexes": [
		        "\\.sublime-(project|workspace)", "sftp-config(-alt\\d?)?\\.json",
		        "sftp-settings\\.json", "/venv/", "\\.svn/", "\\.hg/", "\\.git/",
		        "\\.bzr", "_darcs", "CVS", "\\.DS_Store", "Thumbs\\.db", "desktop\\.ini",
		        "Gruntfile\\.js", "package\\.json", "/node_modules/"
		    ],

        Grunt installation:
        -------------------
            npm install -g grunt-cli
            npm install -g grunt-init
            npm init (creates a `package.json` file)

        Project Dependencies:
        ---------------------
            npm install grunt-contrib-watch --save-dev
			npm install grunt-wp-i18n --save-dev
			npm install grunt-contrib-uglify --save-dev
			npm install grunt-contrib-jshint --save-dev
			npm install grunt-contrib-compass --save-dev
			npm install grunt-contrib-copy --save-dev
			// Optionals
			// npm install grunt-curl --save-dev
			// npm install grunt-phpdocumentor --save-dev

		To Localize:
		------------
			grunt makepot

		Tip (.gitignore):
		-----------------
		Add node_modules and npm-debug.log to your .gitignore to prevent the tasks as associated files being added to your repository.
		
    */
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dist: {
                src: 'readme.txt',
                dest: 'README.md'
            }
        },
        /*curl: {
            'google-fonts-source': {
                src: 'https://www.googleapis.com/webfonts/v1/webfonts?key=*******',
                dest: 'assets/vendor/google-fonts-source.json'
            }
        },*/
        /*makepot: {
            target: {
                options: {
                    include: [
                        '*.php'
                    ],
                    type: 'wp-theme' // or 'wp-plugin'
                }
            }
        },*/
        jshint: {
            files: [
                'assets/js/child-theme-functions.js',
                'assets/dynamic/paths/**/*.js'
            ],
            options: {
                expr: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        /*phpdocumentor: {
            dist: {
                options: {
                    ignore: 'node_modules'
                }
            }
        },*/
        compass: {
			dist: {
				options: {
					sassDir: 'assets/scss',
					cssDir: './',
				}
			}
		},
		watch: {
			css: {
				files: 'assets/scss/*.scss',
				tasks: ['compass'],
			},
			 scripts: {
			    files: ['assets/js/**/*.js'],
			    tasks: ['uglify']
			}

		},
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    report: 'gzip'
                },
                files: {
                    'assets/js/child-theme-functions.min.js' : [
                        'assets/js/child-theme-functions.js',
                        'assets/dynamic/paths/**/*.js'
                    ]
                }
            },
            // dev: {
            //     options: {
            //         banner: '/*! <%= pkg.name %> <%= pkg.version %> filename.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
            //         beautify: true,
            //         compress: false,
            //         mangle: false
            //     },
            //     files: {
            //         'assets/js/child-theme-functions.js' : [
            //             'assets/js/child-theme-functions.js',
            //             'assets/dynamic/paths/**/*.js'
            //         ]
            //     }
            // }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-curl');
    //grunt.loadNpmTasks('grunt-phpdocumentor');
    //grunt.loadNpmTasks('grunt-wp-i18n');
 	//'makepot',
    grunt.registerTask('default', [
        'copy',
        'jshint',
        'compass',
        //'uglify:dev',
        'uglify:dist',
        'watch'
    ]);
 
    /*grunt.registerTask('docs', [
        'phpdocumentor:dist'
    ]);*/
 
    /*grunt.registerTask('googlefonts', [
        'curl:google-fonts-source'
    ]);*/
 
};