module.exports = function(grunt) {

    // Configuration:
    var SRC = "./src/";
        DIST = "./dist/";

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
          server: {
            options: {
                hostname: 'localhost',
                port: 5000,
                livereload: true
            }
          }
        },

        watch: {
            options: {
                livereload: true
            },
            src: {
                files: [SRC + '*.html', SRC + 'js/*js', SRC + 'css/*.css']
            }
        },

        cssmin: {
            combine: {
                files: {
                   './dist/css/screen.css' : [SRC + 'css/imports.css', SRC + 'css/normalize.css', SRC + 'css/foundation.css', SRC + 'css/custom.css']
                }
            }
        },
        // uglify: {
        //     build: {
        //         src: [SRC + 'js/vendor/modernizr.js', SRC + 'js/vendor/jquery.js', SRC + 'js/vendor/foundation.min.js'] //input
        //         dest: './dist/js/app.min.js' //output
        //     }
        uglify: {
            my_target: {
                files: {
                    './dist/js/app.min.js': [SRC + 'js/vendor/modernizr.js', SRC + 'js/vendor/jquery.js', SRC + 'js/vendor/foundation.min.js']
                }
            }
        },
        copy: {
            // images: {
            //     files: [
            //         {
            //             expand: true,
            //             src: [SRC + 'images/*'],
            //             // flatten: true,
            //             dest: DIST + 'images'
            //         }
            //     ]
            // },
            main: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['src/html/index.html'], dest: 'dist/', filter: 'isFile'}

                    // // includes files within path and its sub-directories
                    // {expand: true, src: [SRC + 'images/**'], dest: 'dist/images'},

                    // // includes files within path and its sub-directories
                    // {expand: true, src: [SRC + 'pdf/**'], dest: 'dist/pdf'}
                ]
            }
        }
        // concat: {
        //     options: {
        //         separator: ';\n',
        //     },
        //     dist: {
        //         src: SRC + 'js/vendor/*.js',
        //         dest: DIST + 'js/app2.min.js'
        //     }
        // }


    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['connect','watch']);
    // grunt.registerTask('concat', ['concat']);
    grunt.registerTask('build', ['copy', 'uglify', 'cssmin']);

};