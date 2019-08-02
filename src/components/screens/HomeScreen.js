import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, StyleSheet, ScrollView, View, TouchableHighlight, Image } from 'react-native';
import { Container, Content, Button, Text, Spinner, Card, CardItem, Body, Icon } from 'native-base';
import Header from '../Header';
import Heading from '../Heading';
import LogoButton from '../LogoButton';
import styles from '../../Styles';
import { file } from '../../lib/File';

class HomeScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        character: PropTypes.object,
        template: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.onBuilderPress = this._onBuilderPress.bind(this);
        this.onArchitectPress = this._onArchitectPress.bind(this);
        this.onTemplateUploadPress = this._onTemplateUploadPress.bind(this);
        this.onPress = this._onPress.bind(this);
    }

    _onBuilderPress() {
        if (this.props.character == null || this.props.character.template == null) {
            this.props.navigation.navigate('TemplateSelect');
        } else {
            this.props.navigation.navigate('Builder');
        }
    }

    _onArchitectPress() {
        if (this.props.template == null) {
            this.props.navigation.navigate('NewTemplate');
        } else {
            this.props.navigation.navigate('Architect');
        }
    }

    _onPress(location) {
        this.props.navigation.navigate(location)
    }

    _onTemplateUploadPress() {
        file.uploadTemplate(() => {}, () => {});
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
                    <LogoButton label='Upload' onPress={() => this.onTemplateUploadPress()} />
                    <LogoButton label='Delete' onPress={() => this.onPress('TemplateDelete')} />
                </View>
                <Heading text='GM Tools' />
                <Text style={[styles.grey, {alignSelf: 'center'}]}>Tools to help GMs manage their games.</Text>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <LogoButton label='Mass Roller' onPress={() => this.onPress('MassRoller')} />
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <LogoButton label='Initiative' onPress={() => this.onPress('InitiativeTracker')} />
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
        template: state.architect.template
    };
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);