'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NativeMicrophone from './nativeMic';

class App extends Component {
  render() {
    return (
      <NativeMicrophone />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
export default App;
