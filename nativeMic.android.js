'use strict';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	NativeModules,
  DeviceEventEmitter
} from 'react-native';
var {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback
} = React;

var micModule = NativeModules.NativeMicrophone;
class NativeMicrophone1 extends Component {
	constructor(props){
		super(props);
		this.state = { pitch: -1 };
	}
  componentWillMount() {
    micModule.addListener();
    DeviceEventEmitter.addListener('pitchHeard', function(e: Event) {
      console.log("WTFWTFlJSJS Listened and heard: ", e);
     this.setState({pitch: e.pitch});
    }.bind(this));
  }
	onButtonClick() {
    console.log("LWTFWTFlJSJS onclick!!");
		micModule.triggerNote(55);
  }
	render() {
    var TouchableElement = TouchableHighlight;
			if (Platform.OS === 'android') {
			 TouchableElement = TouchableNativeFeedback;
    }
		return (
			<View>
			<Text style={styles.welcome}>
				Derp derp
				The pitch I hear is: {this.state.pitch}
			</Text>
			<TouchableElement
				style={styles.button}
				onPress={this.buttonClicked}>
						<View>
							<Text style={styles.buttonText}>Button!</Text>
						</View>
				</TouchableElement>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});

AppRegistry.registerComponent('NativeMicrophone', () => NativeMicrophone1);
export default NativeMicrophone1;
