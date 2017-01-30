import React, {
  AppRegistry,
  Component,
  Text,
  WebView,
  View
} from 'react-native';

class Canvas extends Component {
	constructor(props){
		super(props);
	}
render() {
  var localSheet = `
  <html>
  <body>
    <script type="text/javascript" src="http://www.vexflow.com/vextab/support/vexflow-min.js" />
    <div id="mydiv">DIV</div>
    <div id="debug">DIV2</div>
    <canvas id="sheet-canvas" width=300 height=300></canvas>
    <script>
      document.getElementById('mydiv').style.backgroundColor = "green";
			var canvas = document.getElementById('sheet-canvas');
      document.getElementById('mydiv').style.backgroundColor = "green";
      document.getElementById('mydiv').innerHTML = 'vex is: ' + Vex;
			var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
      document.getElementById('mydiv').style.backgroundColor = "blue";

			var ctx = renderer.getContext();
			var stave = new Vex.Flow.Stave(10, 0, 500);
			stave.addClef("treble").setContext(ctx).draw();

			var notes = [
				new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),

				new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),

				new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),

				new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
			];

			var voice = new Vex.Flow.Voice({
				num_beats: 4,
				beat_value: 4,
				resolution: Vex.Flow.RESOLUTION
			});

			voice.addTickables(notes);

			var formatter = new Vex.Flow.Formatter().
				joinVoices([voice]).format([voice], 500);

			voice.draw(ctx, stave);
    </script>
    </body>
    </html>
  `;

  var localSheet2 = `
    <div id="mydiv">DIV</div>
    <div id="debug">DIV2</div>
    <canvas id="sheet-canvas" width=300 height=300></canvas>
    <script>
      document.getElementById('mydiv').style.backgroundColor = "green";
    </script>
  `;
  return (
    <View>
    <Text>
    {}
    </Text>
      <WebView
        source={{html: localSheet}}
        javaScriptEnabled={true}
        style={{ width: 350, height: 350}}
      />
    </View>
  );
}
}

AppRegistry.registerComponent('Canvas', () => Canvas);
export default Canvas;
