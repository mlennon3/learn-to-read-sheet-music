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
    console.log("LWTFWTFlJSJS mounting!!");
    micModule.addListener();
    DeviceEventEmitter.addListener('pitch', function(e: Event) {
      console.log("LWTFWTFlJSJS received pitch callback!!!");
       this.setState({pitch: e.pitch});
    }.bind(this));
  }
	onButtonClick(note) {
		micModule.triggerNote(note);
  }
  componentWillUnmount(){
    console.log("LWTFWTFlJSJS unmounting!!");
    DeviceEventEmitter.removeAllListeners('pitch')
    micModule.cleanup();
  }
	render() {
    var TouchableElement = TouchableHighlight;
			if (Platform.OS === 'android') {
			 TouchableElement = TouchableNativeFeedback;
    };
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
				marginBottom: 7,
				borderColor: 'blue',
        borderWidth: 1,
				borderRadius: 2
			}
		});
		return (
			<View>
			<Text style={styles.welcome}>
				Derp derp
				The pitch I hear is: {this.state.pitch}
			</Text>
      <View style={styles.container}>
        <TouchableElement
          style={styles.button}
          onPress={this.onButtonClick.bind(null, 55)}>
              <View>
                <Text style={styles.buttonText}>G string</Text>
              </View>
        </TouchableElement>
        <TouchableElement
          style={styles.button}
          onPress={this.onButtonClick.bind(null, 59)}>
              <View>
                <Text style={styles.buttonText}>b string</Text>
              </View>
          </TouchableElement>
        </View>
			</View>
		);
	}
}

AppRegistry.registerComponent('NativeMicrophone', () => NativeMicrophone1);
export default NativeMicrophone1;
