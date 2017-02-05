'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import teoria from 'teoria';

import NativeMicrophone from './nativeMic';
import VexflowWrapper from './vexflow_wrapper';

class Play extends Component {
  constructor(props){
    super(props);
    this.state = {
      pitch: 1,
      notes: this.props.notes
    }
    this.getNote = this.getNote.bind(this)
    this.isRightNote = this.isRightNote.bind(this)
    this.getCurrentNote = this.getCurrentNote.bind(this)

  }
  getNote() {
    let note = teoria.Note.fromFrequency(this.state.pitch).note;
    let cents = teoria.Note.fromFrequency(this.state.pitch).cents;
    return `${note.name()} ${note.accidental()} ${note.midi()} ${Math.abs(cents) > 20}`;
  }
  getCurrentNote(){
    let currentNote = this.state.notes[0];
    return currentNote.keys[0].replace('/', '');
  }
  isRightNote() {
    let currentNote = teoria.note.fromFrequency(this.state.pitch).note;
    console.log('currentNote: ', currentNote);
    //let cents = teoria.Note.fromFrequency(this.state.pitch).cents;
    let currentMidi = currentNote.midi();
    let otherNote = teoria.note.fromString(this.getCurrentNote()).midi() + 12; // guitar music is written up an octave http://www.jazzguitar.be/forum/classical-guitar/11137-true-guitar-should-read-up-octive.html
    console.log('otherNote: ', otherNote);
    return `${[currentMidi, otherNote]}`;//teoria.note.fromString(this.getCurrentNote()).note.midi();
  }
  render() {
    return (
      <View>
      <Text>
        note is: {this.getNote()}
        correct note: {this.isRightNote()}
      </Text>
      <NativeMicrophone onPitchChange={(pitch) => this.setState({pitch: pitch})}/>
      <VexflowWrapper notes={this.state.notes}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Play', () => Play);
export default Play;
