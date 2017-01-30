'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
var {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback
} = React;

import Canvas from './canvas';

class App extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
      <View>
        <Canvas />
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
export default App;
