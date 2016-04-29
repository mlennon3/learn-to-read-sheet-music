import React, {
  AppRegistry,
  Component,
  Text,
  WebView,
  View
} from 'react-native';
var Vexflow = require('vexflow');

class Canvas extends Component {
	constructor(props){
		super(props);
	}
render() {
  let html = `
    <canvas id="sheet-canvas" width=700 height=100></canvas>
    <script>
      var Vex = ${Vexflow};
			var canvas = document.querySelector("#sheet-canvas");
			var renderer = new Vex.Flow.Renderer(canvas,
      Vex.Flow.Renderer.Backends.CANVAS);

			var ctx = renderer.getContext();
			var stave = new Vex.Flow.Stave(10, 0, 500);
			stave.addClef("treble").setContext(ctx).draw();
    </script>
  `;

  return (
    <View>
    <Text >derp</Text>
      <WebView
        source={{html: html}}
        javaScriptEnabled={true}
        style={{ width: 300, height: 300}}
      />
    </View>
  );
}
}

AppRegistry.registerComponent('Canvas', () => Canvas);
export default Canvas;
