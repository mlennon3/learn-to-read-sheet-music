// Vex Flow
//
// @copyright Mohit Muthanna 2016
// @author Taehoon Moon 2016

/** @constructor */
Vex.Flow.TextSVGContext = (function() {
  function TextSVGContext(options) {
    if (arguments.length > 0) this.init(options);
  }

  Vex.Inherit(TextSVGContext, Vex.Flow.SVGContext, {
    init: function(options) {
      this.React = options.React;
      this.Components = options.Components;
      this.fontPack = options.fontPack;
      this.getBoundingBox = options.getBoundingBox;

      TextSVGContext.superclass.init.call(this, this.Components, this.create('div'));
    },

    create: function(svgElementType) {
      var props = {
        style: {}
      };

      // Add xmlns to root
      if (svgElementType === 'Svg') props['data-xmlns'] = this.svgNS;

      return {
        svgElementType: svgElementType,
        props: props,
        children: [],
        setAttribute: function(propertyName, value) {
          if (propertyName === 'class') propertyName = 'className';

          this.props[propertyName] = value;
        },

        get style() {
          return props.style;
        },
      };
    },

    applyAttributes: function(element, attributes) {
      for(var propertyName in attributes) {
        var _propertyName = propertyName.replace(
          /-([a-z])/g,
          function (g) { return g[1].toUpperCase(); }
        );

        element.props[_propertyName] = attributes[propertyName];
      }

      return element;
    },

    fillText: function(text, x, y) {
      var attributes = {};
      Vex.Merge(attributes, this.attributes);

      var path = this.create(this.Components['path']);
      var fontSize = this.getFontSize();
      var font = this.fontPack.getFont(attributes);
      var pathData = font.getPath(text, x, y, fontSize).toPathData();

      attributes.d = pathData;
      attributes.stroke = "none";
      attributes.x = 0;
      attributes.y = 0;

      this.applyAttributes(path, attributes);
      this.add(path);
    },

    add: function(element) {
      this.parent.children.push(element);
    },

    getFontSize: function() {
      var fontSize = Number(this.attributes['font-size'].replace(/[^.\d]+/g, ''));

      // Convert pt to px
      if (/pt$/.test(this.attributes['font-size'])) {
        fontSize = (fontSize * 4 / 3) | 0;
      }

      return fontSize;
    },

    measureText: function(text) {
      var fontSize = this.getFontSize();
      var font = this.fontPack.getFont(this.attributes);
      var pathData = font.getPath(text, 0, 0, fontSize).toPathData();

      return this.getBoundingBox(pathData);
    },

    createReactElement: function(element, index) {
      var children = [];

      for (var i = 0; i < element.children.length; i++) {
        children.push(this.createReactElement(element.children[i], i));
      }

      element.props["key"] = index
      return this.React.createElement(
        element.svgElementType, element.props, children
      );
    },

    toSVG: function() {
      return this.createReactElement(this.svg, 0);
    },

    iePolyfill: function() {}
  });

  return TextSVGContext;
}());
