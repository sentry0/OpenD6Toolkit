import React, { Component }  from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { Alert, StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './AppNavigator';
import { statistics } from './src/lib/Statistics';
import reducer from './src/reducers/index';

const store = createStore(reducer, applyMiddleware());

export default class App extends Component<Props> {
    componentDidMount() {
        AsyncStorage.getItem('statistics').then((stats) => {
            if (stats === null) {
                statistics.init().then(() => console.log('Stats initialized'));
            }
        });

        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>

                    <AppNavigator />
            </Provider>
        );
    }
}