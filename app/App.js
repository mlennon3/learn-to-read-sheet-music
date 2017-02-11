'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

import Play from './Play.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [
        // A quarter-note D.
        new VF.StaveNote({clef: "treble", keys: ["e/3"], duration: "q" }),

        new VF.StaveNote({clef: "treble", keys: ["a/3"], duration: "q" }),
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
        new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "q" }),

        new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "q" }),

        new VF.StaveNote({clef: "treble", keys: ["e/5"], duration: "q" }),

      ]
    }
  }
  addNotes() {
    var chord = new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" });
    this.state.notes.push(chord);
    this.setState({notes: this.state.notes})
  }
  render() {
    return (
      <View>
        <Play notes={this.state.notes} />
        <Button
          title="Change notes"
          onPress={this.addNotes.bind(this)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
export default App;
