
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers/index';
import Router from './src/navigations/routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

export default class App extends Component {

  componentWillMount() {
    
  }

  render() {
    const store = createStore(reducers,{}, applyMiddleware(ReduxThunk));
    return (
       <Provider store={store}>
        <View style={styles.container}>
          <Router />
        </View>
       </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
