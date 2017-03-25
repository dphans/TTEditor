module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				eqeqeq: true,
				trailing: true
			},
			target: {
				src : [
					'src/extensions/array.js',
					'src/additionals/constants.js',
					'src/additionals/utils.js',
					'src/additionals/methods.js',
					'src/tteditor.js'
				]
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'src/tteditor.js'
				],
				dest: 'dist/<%= pkg.name %>.js',
			}
		},
		browserify: {
			dist: {
				files: {
					'dist/extensions/array.js': 'src/extensions/array.js',
					'dist/additionals/constants.js': 'src/additionals/constants.js',
					'dist/additionals/utils.js': 'src/additionals/utils.js',
					'dist/additionals/methods.js': 'src/additionals/methods.js',
					'dist/<%= pkg.name %>.js': 'dist/<%= pkg.name %>.js'
				}
			}
		},
		uglify: {
			options: {
				sourceMapRoot: '../',
				sourceMap: 'dist/<%= pkg.name %>.min.js.map',
				sourceMapUrl: '<%= pkg.name %>.min.js.map'
			},
			target: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/<%= pkg.name %>.min.css': [
						'node_modules/codemirror/lib/codemirror.css',
						'src/tteditor.css'
					],
				}
			}
		},
		copy: {
			main: {
				src: 'src/tteditor.css',
				dest: 'dist/tteditor.css'
			},
			demo: {
				src: 'node_modules/jquery/dist/jquery.min.js',
				dest: 'demo/jquery.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', [ 'jshint', 'concat', 'browserify', 'uglify', 'cssmin', 'copy' ]);
};
