'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

var micModule = NativeModules.NativeMicrophone;
class NativeMicrophone extends Component {
  constructor(props){
    super(props);
    this.state = { pitch: -1 };
    console.log("in consructor of native mic");
    micModule.addListener(function(_pitch){
      console.log("Listened!");
      this.setState({_pitch});
    });
  }


  render() {
    return (
      <View>
      <Text style={styles.welcome}>
      Derp derp
      The pitch I hear is: {this.state.pitch}
      </Text>
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

AppRegistry.registerComponent('NativeMicrophone', () => NativeMicrophone);
export default NativeMicrophone;
