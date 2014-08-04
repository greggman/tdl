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
        },
      },
    },
    clean: [
        'docs/gen',
    ],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['clean', 'jsdoc']);
};

