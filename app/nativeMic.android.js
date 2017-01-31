'use strict';
import React, { Component } from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	NativeModules,
  Button,
  DeviceEventEmitter
} from 'react-native';

var teoria = require('teoria');

let threshold = {min: 1, max: 3}

var micModule = NativeModules.NativeMicrophone;
class NativeMicrophone extends Component {
	constructor(props){
		super(props);
		this.state = { pitch: 1, threshold: threshold.min };
    this.onButtonClick = this.onButtonClick.bind(this)
    this.toggleThreshold = this.toggleThreshold.bind(this)
    this.getNote = this.getNote.bind(this)
	}
  componentWillMount() {
    micModule.addListener();
    DeviceEventEmitter.addListener('pitch', (e: Event) => {
       this.setState({pitch: e.pitch});
    });
  }
	onButtonClick(note) {
		micModule.triggerNote(note);
  }
  componentWillUnmount(){
    DeviceEventEmitter.removeAllListeners('pitch')
    //micModule.cleanup();
  }
  toggleThreshold(){
    let amount = this.state.threshold === threshold.min ? threshold.max : threshold.min;
    micModule.setThreshold(amount);
    this.setState({threshold: amount});
  }
  getNote() {
    console.log("derpderp state is: ", this.state)
    let note = teoria.Note.fromFrequency(this.state.pitch).note
    let cents = teoria.Note.fromFrequency(this.state.pitch).cents
    return `${note.name()} ${note.accidental()} ${note.midi()} ${Math.abs(cents) > 20}`
  }
	render() {
    var TouchableElement = Button;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
			button: {
				textAlign: 'center',
				color: '#ffffff',
				marginBottom: 70,
				borderColor: 'blue',
        borderWidth: 1,
				borderRadius: 2
			}
		});
		return (
			<View>
        <Text style={styles.welcome}>
          The pitch I hear is: {this.getNote()}
        </Text>
        <View>
          <TouchableElement
            title="Toggle Threshold"
            style={styles.button}
            onPress={this.toggleThreshold}>
                <View>
                  <Text style={styles.buttonText}>Toggle Threshold</Text>
                </View>
          </TouchableElement>
          <Text> Threshold is now: {this.state.threshold}</Text>
        </View>
      </View>
		);
	}
}

AppRegistry.registerComponent('NativeMicrophone', () => NativeMicrophone);
export default NativeMicrophone;
