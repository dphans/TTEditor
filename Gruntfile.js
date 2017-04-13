module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watchify: {
            options: {

            },
            tteditor: {
                src: './src/<%= pkg.name %>.js',
                dest: './build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {

            },
            build: {
                src: './build/<%= pkg.name %>.js',
                dest: './build/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './build/<%= pkg.name %>.min.css': ['./src/<%= pkg.name %>.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-watchify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['watchify', 'uglify', 'cssmin']);

};
