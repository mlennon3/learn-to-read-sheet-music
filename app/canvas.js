import React, {
  AppRegistry,
  Component,
  Text,
  WebView,
  View
} from 'react-native';

class Canvas extends Component {
	constructor(props){
		super(props);
	}
render() {
  return (
    <WebView
      source={require('./sheet.html')}
      javaScriptEnabled={true}
      style={{ width: 350, height: 350}}
    />
  );
}
}

AppRegistry.registerComponent('Canvas', () => Canvas);
export default Canvas;
