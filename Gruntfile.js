"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    jsdoc: {
      tdl: {
        src: ['tdl/*.js'],
        options: {
          destination: 'docs/gen',
          configure: 'jsdoc.conf.json',
          template: 'node_modules/ink-docstrap/template',
          private: false,
        },
      },
    },
    clean: [
        'docs/gen',
    ],
    uglify: {
      my_target: {
        files: {
          'build/tdl.min.js': [
            'tdl/base.js',
            'tdl/buffers.js',
            'tdl/clock.js',
            'tdl/fast.js',
            'tdl/fps.js',
            'tdl/framebuffers.js',
            'tdl/fullscreen.js',
            'tdl/io.js',
            'tdl/loader.js',
            'tdl/log.js',
            'tdl/math.js',
            'tdl/misc.js',
            'tdl/models.js',
            'tdl/particles.js',
            'tdl/primitives.js',
            'tdl/programs.js',
            'tdl/quaternions.js',
            'tdl/screenshot.js',
            'tdl/shader.js',
            'tdl/string.js',
            'tdl/sync.js',
            'tdl/textures.js',
            'tdl/webgl.js',
          ],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean', 'jsdoc', 'uglify']);
};

