import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Platform, StyleSheet, ScrollView, View, TouchableHighlight, Image } from 'react-native';
import { Container, Content, Button, Text, Spinner, Card, CardItem, Body, Icon, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header';
import Heading from '../Heading';
import LogoButton from '../LogoButton';
import styles from '../../Styles';
import { file } from '../../lib/File';
import { settings as appSettings } from '../../lib/Settings';
import { common } from '../../lib/Common';
import { setSettings } from '../../reducers/settings'

class HomeScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        setSettings: PropTypes.func.isRequired,
        character: PropTypes.object,
        template: PropTypes.object,
        settings: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.onBuilderPress = this._onBuilderPress.bind(this);
        this.onArchitectPress = this._onArchitectPress.bind(this);
        this.onPress = this._onPress.bind(this);
    }

    componentDidMount() {
        try {
            appSettings.getSettings().then((settings) => {
                this.props.setSettings(settings);
            });
        } catch (error) {
            common.toast(error.message);
        }
    }

    _onBuilderPress() {
        if (this.props.character == null || this.props.character.template == null) {
            this.props.navigation.navigate('TemplateSelect', {from: 'Home'});
        } else {
            this.props.navigation.navigate('Builder', {from: 'Home'});
        }
    }

    _onArchitectPress() {
        if (this.props.template == null) {
            this.props.navigation.navigate('NewTemplate', {from: 'Home'});
        } else {
            this.props.navigation.navigate('Architect', {from: 'Home'});
        }
    }

    _onPress(location) {
        this.props.navigation.navigate(location, {from: 'Home'});
    }

	render() {
		return (
		  <Container style={styles.container}>
            <Header navigation={this.props.navigation} />
            <Content style={styles.content}>
                <Heading text='Roller' />
                <Text style={[styles.grey, {alignSelf: 'center'}]}>Use the die roller to resolve actions in OpenD6.</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <LogoButton label='Roller' onPress={() => this.onPress('DieRoller')} />
                </View>
                <Heading text='Builder' />
                <Text style={[styles.grey, {alignSelf: 'center'}]}>Build a character using the OpenD6 game rules.</Text>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <LogoButton label='Builder' onPress={() => this.onBuilderPress()} />
                </View>
                <Heading text='Templates' />
                <Text style={[styles.grey, {alignSelf: 'center'}]}>Manage game templates used to build characters.</Text>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <LogoButton label='Architect' onPress={() => this.onArchitectPress()} />
                </View>
                <Heading text='GM Tools' />
                <Text style={[styles.grey, {alignSelf: 'center'}]}>Tools to help GMs manage their games.</Text>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <LogoButton label='Mass Roller' onPress={() => this.onPress('MassRoller')} />
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <LogoButton label='Orchestrator' onPress={() => this.onPress('Orchestrator')} />
                </View>
                <View style={{paddingBottom: 20}} />
            </Content>
	      </Container>
		);
	}
}

const mapStateToProps = state => {
    return {
        character: state.builder.character,
        template: state.architect.template,
        settings: state.settings
    };
}

const mapDispatchToProps = {
    setSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
