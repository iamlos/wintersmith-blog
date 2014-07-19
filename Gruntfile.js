'use strict';

module.exports = function (grunt) {

  // Project configuration.
  var pkg = require('./package.json');

  require('time-grunt')(grunt);

  grunt.initConfig({
    wintersmith: {
      build: {},
      preview: {
        options: {
          action: 'preview'
        }
      }
    },
    watch: {

      // options: {
      //   livereload: false
      // },
      sass: {
        files: ['contents/scss/{,**/}*.{scss,sass}'],
        tasks: ['compass', 'wintersmith:build']
      },
      images: {
        files: ['contents/img/**']
      },
      css: {
        files: ['contents/css/{,**/}*.css']
      },
      templates: {
        files: ['templates/**'],
        tasks: ['wintersmith:build']
      },
      js: {
        files: ['contents/assets/js/{,**/}*.js', '!contents/assets/js/{,**/}*.min.js'],
        tasks: ['wintersmith:build']
      }
    },

    concurrent: {
      preview: ['compass', 'wintersmith:preview']
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

    requirejs : {
      dist : {
        options : {
          baseUrl: 'contents/assets/js',
          mainConfigFile: 'contents/assets/js/main.js',
          paths: {
            jquery: 'empty:',
            underscore: 'empty:',
            app: 'app'
          },
          dir: 'build/assets/js',
          optimize : "uglify2",
          inlineText : true,
          findNestedDependencies : true,

        }
      }
    },

    // jshint: {
    //   options: {
    //     jshintrc: '.jshintrc'
    //   },
    //   all: ['contents/js/{,**/}*.js', '!contents/js/{,**/}*.min.js']
    // },

    // uglify: {
    //   dist: {
    //     options: {
    //       mangle: true,
    //       compress: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: 'build/js',
    //       src: ['**/*.js', '!**/*.min.js'],
    //       dest: 'build/js',
    //       ext: '.js'
    //     }]
    //   }
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'contents/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: 'build/img'
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
    },

    hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.cache.${ext}',
        renameFiles: true
      },
      css: {
        options: {
        },
        src: 'build/**/*.css',
        dest: 'build/**/*.html'
      },
      // js: {
      //   options: {
      //   },
      //   src: 'build/**/*.js',
      //   dest: 'build/**/*.html'
      // },
      images: {
        options: {
        },
        src: [
          'build/img/**/*.png',
          'build/img/**/*.jpg',
          'build/img/**/*.svg',
        ],
        dest: [
          'build/**/*.html',
          'build/**/*.js',
          'build/**/*.css',
          'build/**/*.md'
        ]
      }
    },

    clean: {
      build: {
        src: [ 'build' ]
      },
    },
    buildcontrol: {
        options: {
          dir: 'build',
          commit: true,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        prod: {
          options: {
            remote: 'git@github.com:petethedude/wintersmith-blog.git',
            branch: 'prod'
          }
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
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-requirejs');


  grunt.registerTask('build', [
    'compass',
    'requirejs',
    'clean',
    'wintersmith:build',
    // 'uglify',
    'imagemin',
    'svgmin',
    'svg2png:dist',
    'hashres',
    'htmlmin'
  ]);


grunt.registerTask('deploy', [
    'buildcontrol:prod'
  ]);

  grunt.registerTask('default', [
    'watch',

    //'uglify:dist',
    //'jshint:dist'
  ]);

  grunt.registerTask('preview', ['concurrent:preview']);

};
