'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NativeMicrophone from './nativeMic';
import VexflowWrapper from './vexflow_wrapper';

class App extends Component {
	constructor(props){
		super(props);
	}
  render() {
    var notes = [
      // A quarter-note C.
      new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

      // A quarter-note D.
      new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
      new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

      // A C-Major chord.
//      new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
    ];
    return (
      <View>
        <NativeMicrophone />
        <VexflowWrapper notes={notes}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
export default App;
