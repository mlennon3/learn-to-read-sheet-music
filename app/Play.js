'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  Text
} from 'react-native';
import teoria from 'teoria';
import Immutable from 'immutable';

import NativeMicrophone from './nativeMic';
import VexflowWrapper from './vexflow_wrapper';

class Play extends Component {
  constructor(props){
    super(props);
    this.state = {
      pitch: 1,
      notes: Immutable.fromJS(this.props.notes),
      currentNoteIndex: 0
    }
    this.getNote = this.getNote.bind(this);
    this.isRightNote = this.isRightNote.bind(this);
    this.getCurrentNote = this.getCurrentNote.bind(this);
    this.onPitchChange = this.onPitchChange.bind(this);
  }
  getNote() {
    let note = teoria.Note.fromFrequency(this.state.pitch).note;
    let cents = teoria.Note.fromFrequency(this.state.pitch).cents;
    return `${note.name()} ${note.accidental()} ${note.midi()} ${Math.abs(cents) > 20}`;
  }
  getCurrentNote(){
    let currentNote = this.state.notes.get(this.state.currentNoteIndex);

    // Only supports single notes, not chords
//    console.log('currentNote is: ', currentNote);
//    var foo = currentNote.keys[0].replace('/', '');
//    console.log('foo is: ', foo);
    return currentNote.keys[0].replace('/', '');;
  }
  isRightNote() {
    let currentNote = teoria.note.fromFrequency(this.state.pitch).note;

    let currentMidi = currentNote.midi() + 12;

    // guitar music is written up an octave http://www.jazzguitar.be/forum/classical-guitar/11137-true-guitar-should-read-up-octive.html
    let otherNote = teoria.note.fromString(this.getCurrentNote()).midi();
    return {bool: currentMidi === otherNote, notes: `${currentMidi}, ${otherNote}`};
  }
  onPitchChange(pitch)  {
    var newNotes = this.state.notes;
    var newIndex = this.state.currentNoteIndex;
    if (this.isRightNote().bool) {
      let newKey = this.state.notes.get(this.state.currentNoteIndex).setKeyStyle(0, {shadowBlur:15, shadowColor:'green', fillStyle:'green'});
      newNotes = this.state.notes.set(this.state.currentNoteIndex, newKey);
      newIndex = newIndex + 1;
    }
    this.setState({
      pitch: pitch,
      notes: newNotes,
      currentNoteIndex: newIndex
    });
  }
  render() {
    return (
      <View>
      <Text>
        current notes: {this.isRightNote().notes}
      </Text>
      <NativeMicrophone onPitchChange={this.onPitchChange}/>
      <VexflowWrapper notes={this.state.notes.toJS()}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Play', () => Play);
export default Play;
