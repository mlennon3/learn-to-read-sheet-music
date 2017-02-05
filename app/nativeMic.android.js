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

let threshold = {min: 1, max: 3}

var micModule = NativeModules.NativeMicrophone;
class NativeMicrophone extends Component {
	constructor(props){
		super(props);
		this.state = { threshold: threshold.min };
    this.toggleThreshold = this.toggleThreshold.bind(this)
    this.onPitchChange = this.props.onPitchChange;
	}
  componentWillMount() {
    micModule.addListener();
    DeviceEventEmitter.addListener('pitch', (e: Event) => {
       this.onPitchChange(e.pitch)
    });
  }
  componentWillUnmount(){
    DeviceEventEmitter.removeAllListeners('pitch')
    micModule.cleanUp();
  }
  toggleThreshold(){
    let amount = this.state.threshold === threshold.min ? threshold.max : threshold.min;
    micModule.setThreshold(amount);
    this.setState({threshold: amount});
  }

	render() {
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
        <View>
          <Button
            title="Toggle Threshold"
            style={styles.button}
            onPress={this.toggleThreshold}>
                <View>
                  <Text style={styles.buttonText}>Toggle Threshold</Text>
                </View>
          </Button>
          <Text> Threshold is now: {this.state.threshold}</Text>
        </View>
      </View>
		);
	}
}

AppRegistry.registerComponent('NativeMicrophone', () => NativeMicrophone);
export default NativeMicrophone;
