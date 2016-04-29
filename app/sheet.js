'use strict';
import React, {
  AppRegistry,
  Component,
  Text,
  View,
} from 'react-native';

//import Svg from 'react-native-art-svg';

import Vex from 'vexflow';
var Sheet = (props) => {
  var renderer = new Vex.Flow.Renderer(Svg,
    Vex.Flow.Renderer.Backends.SVG);

//  var ctx = renderer.getContext();
//  var stave = new Vex.Flow.Stave(10, 0, 500);
//  stave.addClef("treble").setContext(ctx).draw();
//
//  // Create the notes
//  var notes = [
//    // A quarter-note C.
//    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
//
//    // A quarter-note D.
//    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
//
//    // A quarter-note rest. Note that the key (b/4) specifies the vertical
//    // position of the rest.
//    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
//
//    // A C-Major chord.
//    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
//  ];
//
//  // Create a voice in 4/4
//  var voice = new Vex.Flow.Voice({
//    num_beats: 4,
//    beat_value: 4,
//    resolution: Vex.Flow.RESOLUTION
//  });
//
//  // Add notes to voice
//  voice.addTickables(notes);
//
//  // Format and justify the notes to 500 pixels
//  var formatter = new Vex.Flow.Formatter().
//    joinVoices([voice]).format([voice], 500);
//
//  // Render voice

  return (<View>
/*          {voice.draw(ctx, stave)} */
          </View>)
}
AppRegistry.registerComponent('Sheet', () => Sheet);
export default Sheet;


class SvgExample extends Component {
    render() {
        return (
            <Svg
                height="100"
                width="100"
            >
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"
                />
                <Rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="red"
                    strokeWidth="2"
                    fill="yellow"
                />
            </Svg>
        );
    }
}

//AppRegistry.registerComponent('Sheet', () => SvgExample);
