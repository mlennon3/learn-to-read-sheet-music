/*
  Run the full VexFlow test suite, grab the generated images, and
  dump them into a local directory as SVG files.

  This meant to be used with the visual regression test system in
  `tools/visual_regression.sh`.

  Quick commandline to convert the SVG files to PNG:
    $ for f in *.svg; do echo $f; rsvg-convert $f `basename $f .svg`.png; done
*/
var fs = require('fs');
var mkdirp = require('mkdirp');
var process = require('process');
var argv = process.argv;
var Vex = require(argv[2] + '/vexflow-debug.js');
Vex.Flow.Test = require(argv[2] + '/vexflow-tests.js');
var VF = Vex.Flow;

// Tell VexFlow that we're outside the browser -- just run
// the Node tests.
VF.Test.RUN_CANVAS_TESTS = false;
VF.Test.RUN_SVG_TESTS = false;
VF.Test.RUN_RAPHAEL_TESTS = false;
VF.Test.RUN_NODE_TESTS = true;
VF.Test.NODE_IMAGEDIR = argv[3];

// Create the image directory if it doesn't exist.
mkdirp.sync(VF.Test.NODE_IMAGEDIR);

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var getBoundingBox = require('svg-path-bounding-box');
var opentype = require('opentype.js');
var fontPack = {
  NotoSans: {
    regular: opentype.loadSync('./tools/fonts/NotoSans-Regular.ttf'),
    italic: opentype.loadSync('./tools/fonts/NotoSans-Italic.ttf'),
    bold: opentype.loadSync('./tools/fonts/NotoSans-Bold.ttf'),
    bolditalic: opentype.loadSync('./tools/fonts/NotoSans-BoldItalic.ttf')
  },
  NotoSerif: {
    regular: opentype.loadSync('./tools/fonts/NotoSerif-Regular.ttf'),
    italic: opentype.loadSync('./tools/fonts/NotoSerif-Italic.ttf'),
    bold: opentype.loadSync('./tools/fonts/NotoSerif-Bold.ttf'),
    bolditalic: opentype.loadSync('./tools/fonts/NotoSerif-BoldItalic.ttf')
  },
  getFont: function(style) {
    /*
      times, Times, Times New Roman, serif, Serif => Noto Serif
      Arial, sans-serif... default => Noto Sans
    */
    var fontName = /(times|serif)+/i.test(style['font-family']) ?
      'NotoSerif' : 'NotoSans';

    var fontStyle = '';
    if (style['font-weight'] === 'bold') fontStyle = 'bold';
    if (style['font-style'] === 'italic') fontStyle += 'italic';
    if (fontStyle.length === 0) fontStyle = 'regular';

    return this[fontName][fontStyle];
  }
};

VF.Test.NodeOptions = {
  React: React,
  ReactDOMServer: ReactDOMServer,
  getBoundingBox: getBoundingBox,
  fontPack: fontPack
};

// Run all tests.
VF.Test.run();
