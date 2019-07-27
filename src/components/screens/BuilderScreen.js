import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, StyleSheet, ScrollView, View, TouchableHighlight, Alert, BackHandler } from 'react-native';
import { Container, Content, Button, Text, Picker, Item, Input, List, ListItem, Left, Right, Body, Icon} from 'native-base';
import Header from '../Header';
import Heading from '../Heading';
import LogoButton from '../LogoButton';
import Appearance from '../builder/Appearance';
import AttributesAndSkills from '../builder/AttributesAndSkills';
import Specializations from '../builder/Specializations';
import Options from '../builder/Options';
import Health from '../builder/Health';
import Defenses from '../builder/Defenses';
import InfoDialog from '../InfoDialog';
import styles from '../../Styles';
import { character, OPTION_ADVANTAGES, OPTION_COMPLICATIONS, OPTION_SPECIAL_ABILITIES } from '../../lib/Character';
import { file } from '../../lib/File';
import { common } from '../../lib/Common';
import {
    updateRoller,
    updateCharacterDieCode,
    updateAppearance,
    updateOption,
    removeOption,
    updateHealthSystem,
    updateWounds,
    updateBodyPoints,
    updateDefenseSystem,
    updateStaticDefense
} from '../../../reducer';

class BuilderScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        character: PropTypes.object.isRequired,
        updateRoller: PropTypes.func.isRequired,
        updateCharacterDieCode: PropTypes.func.isRequired,
        updateAppearance: PropTypes.func.isRequired,
        updateOption: PropTypes.func.isRequired,
        removeOption: PropTypes.func.isRequired,
        updateHealthSystem: PropTypes.func.isRequired,
        updateWounds: PropTypes.func.isRequired,
        updateBodyPoints: PropTypes.func.isRequired,
        updateDefenseSystem: PropTypes.func.isRequired,
        updateStaticDefense: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            infoDialog: {
                visible: false,
                title: '',
                info: ''
            }
        }

        this.closeInfoDialog = this._closeInfoDialog.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');

            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    _closeInfoDialog() {
        let newState = {...this.state}
        newState.infoDialog.visible = false;

        this.setState(newState);
    }

    _save() {
        if (this.props.character.name === undefined || this.props.character.name === null || this.props.character.name.trim() === '') {
            let newState = {...this.state};
            newState.infoDialog.visible = true;
            newState.infoDialog.title = 'Name You Character';
            newState.infoDialog.info = 'Please name your character before saving them';

            this.setState(newState);
        } else {
            file.saveCharacter(this.props.character);
        }
    }

	render() {
		return (
		    <Container style={styles.container}>
                <Header navigation={this.props.navigation} />
                <Content style={styles.content}>
                    <Heading text='Name &amp; Species' />
                    <Appearance character={this.props.character} updateAppearance={this.props.updateAppearance} />
                    <View style={[styles.contentPadded, {paddingHorizontal: 30}]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.grey}>
                                <Text style={styles.boldGrey}>Total Points:</Text> {character.getTotalPoints(this.props.character)}
                            </Text>
                            <Text style={styles.grey}>
                                <Text style={styles.boldGrey}>Complications:</Text> {character.getComplicationPoints(this.props.character)}
                            </Text>
                        </View>
                    </View>
                    <View style={{paddingBottom: 20}} />
                    <AttributesAndSkills
                        navigation={this.props.navigation}
                        character={this.props.character}
                        updateCharacterDieCode={this.props.updateCharacterDieCode}
                        updateRoller={this.props.updateRoller}
                        updateMove={this.props.updateAppearance}
                    />
                    <Specializations
                        navigation={this.props.navigation}
                        character={this.props.character}
                        updateRoller={this.props.updateRoller}
                    />
                    <Options
                        title='Advantages'
                        optionKey={OPTION_ADVANTAGES}
                        navigation={this.props.navigation}
                        character={this.props.character}
                        updateOption={this.props.updateOption}
                        removeOption={this.props.removeOption}
                    />
                    <Options
                        title='Complications'
                        optionKey={OPTION_COMPLICATIONS}
                        navigation={this.props.navigation}
                        character={this.props.character}
                        updateOption={this.props.updateOption}
                        removeOption={this.props.removeOption}
                    />
                    <Options
                        title='Special Abilities'
                        optionKey={OPTION_SPECIAL_ABILITIES}
                        navigation={this.props.navigation}
                        character={this.props.character}
                        updateOption={this.props.updateOption}
                        removeOption={this.props.removeOption}
                    />
                    <Health
                        character={this.props.character}
                        updateHealthSystem={this.props.updateHealthSystem}
                        updateWounds={this.props.updateWounds}
                        updateBodyPoints={this.props.updateBodyPoints}
                    />
                    <Defenses
                        character={this.props.character}
                        updateDefenseSystem={this.props.updateDefenseSystem}
                        updateStaticDefense={this.props.updateStaticDefense}
                    />
                    <View style={{paddingBottom: 20}} />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <LogoButton label='Save' onPress={() => this._save()} />
                        <LogoButton label='Load' onPress={() => this.props.navigation.navigate('LoadCharacter')} />
                    </View>
                    <View style={{paddingBottom: 20}} />
                    <InfoDialog
                        visible={this.state.infoDialog.visible}
                        title={this.state.infoDialog.title}
                        info={this.state.infoDialog.info}
                        onClose={this.closeInfoDialog}
                    />
                </Content>
	        </Container>
		);
	}
}

const mapStateToProps = state => {
    return {
        character: state.builder.character
    };
}

const mapDispatchToProps = {
    updateRoller,
    updateCharacterDieCode,
    updateAppearance,
    updateOption,
    removeOption,
    updateHealthSystem,
    updateWounds,
    updateBodyPoints,
    updateDefenseSystem,
    updateStaticDefense
}

export default connect(mapStateToProps, mapDispatchToProps)(BuilderScreen);