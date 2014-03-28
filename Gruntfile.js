'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: false
      },
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wintersmith');
  //grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', [
    'uglify',
    'compass',
    'jshint'
  ]);


  grunt.registerTask('default', [
    'watch',
    'uglify:dist',
    'jshint:dist'

  ]);

};
