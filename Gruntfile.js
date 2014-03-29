'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      // options: {
      //   livereload: false
      // },
      sass: {
        files: ['contents/scss/{,**/}*.{scss,sass}'],
        tasks: ['compass']
      },
      images: {
        files: ['contents/img/**']
      },
      css: {
        files: ['contents/css/{,**/}*.css']
      },
      js: {
        files: ['contents/js/{,**/}*.js', '!contents/js/{,**/}*.min.js'],
        tasks: ['jshint', 'uglify:dist']
      }
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true
      },
      dist: {
        options: {
          environment: 'production',
          force: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['contents/js/{,**/}*.js', '!contents/js/{,**/}*.min.js']
    },

    uglify: {
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'js',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'js',
          ext: '.min.js'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'contents/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: 'contents/img'
        }],
        options: {
          cache: false
        }
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'contents/img',
          src: '**/*.svg',
          dest: 'build/img'
        }]
      }
    },

    svg2png: {
      dev: {
        files: [
          { src: [ 'build/img/**/*.svg'], dest: 'build/img/png/' }
        ]
      },
      dist: {
        files: [
          { src: [ 'build/img/**/*.svg'], dest: 'build/img/png/' }
        ]
      }
    },

    htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: [{
            expand: true,
            cwd: 'build',
            src: ['**/*.html'],
            dest: 'build'
          }]
        }
      }
    });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

 // grunt.loadNpmTasks('grunt-wintersmith');
  //grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', [
    'uglify',
    //'compass',
    'jshint',
    'imagemin',
    'svgmin',
    'svg2png',
    'htmlmin'
  ]);


  grunt.registerTask('default', [
    'watch',
    'uglify:dist',
    'jshint:dist'

  ]);

};