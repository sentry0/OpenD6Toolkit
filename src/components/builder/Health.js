import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform, StyleSheet, View, Switch } from 'react-native';
import { Container, Content, Button, Text, ListItem, CheckBox, Body, Item, Form, Label, Input, Icon } from 'native-base';
import styles from '../../Styles';
import Heading from '../Heading';
import CalculatorInput from '../CalculatorInput';

export const DEATH_SPIRAL = [
    {level: 'stunned', label: 'Stunned', shortLabel: 'S'},
    {level: 'wounded', label: 'Wounded', shortLabel: 'W'},
    {level: 'severelyWounded', label: 'Severely Wounded', shortLabel: 'SW'},
    {level: 'incapacitated', label: 'Incapacitated', shortLabel: 'I'},
    {level: 'mortallyWounded', label: 'Mortally Wounded', shortLabel: 'MW'},
    {level: 'dead', label: 'Dead', shortLabel: 'D'}
];

export default class Health extends Component {
    static propTypes = {
        character: PropTypes.object.isRequired,
        updateHealthSystem: PropTypes.func.isRequired,
        updateWounds: PropTypes.func.isRequired,
        updateBodyPoints: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.updateBodyPoints = this._updateBodyPoints.bind(this);
    }

    _updateBodyPoints(key, value) {
        let bodyPoints = '';

        if (value === '' || value === '-') {
            bodyPoints = value;
        } else {
            bodyPoints = parseInt(value, 10) || 0;

            if (bodyPoints > 999) {
                bodyPoints = 999;
            } else if (bodyPoints < -999) {
                bodyPoints = -999;
            }
        }

        this.props.updateBodyPoints(key, bodyPoints);
    }

    _renderWounds() {
        return (
            <View>
                {DEATH_SPIRAL.map((step, index) => {
                    return (
                        <ListItem>
                            <CheckBox
                                color='#f57e20'
                                checked={this.props.character.health.wounds[step.level]}
                                onPress={() => this.props.updateWounds(step.level)}
                            />
                            <Body>
                                <Text style={styles.grey}>{step.label}</Text>
                            </Body>
                        </ListItem>
                    );
                })}
            </View>
        );
    }

    _renderBodyPoints() {
        return (
            <View style={styles.titleContainer}>
                <View style={{paddingLeft: 30}}>
                    <Item stackedLabel style={{width: 75}}>
                        <Label>Max</Label>
                        <Input
                            style={styles.grey}
                            keyboardType='numeric'
                            maxLength={4}
                            value={this.props.character.health.bodyPoints.max.toString()}
                            onChangeText={(value) => this._updateBodyPoints('max', value)}
                        />
                    </Item>
                </View>
                <View style={{paddingRight: 30}}>
                    <CalculatorInput
                        label='Current'
                        itemKey='current'
                        value={this.props.character.health.bodyPoints.current}
                        onAccept={this.updateBodyPoints}
                    />
                </View>
            </View>
        );
    }

    _renderHealth() {
        if (this.props.character.health.useBodyPoints) {
            return this._renderBodyPoints();
        }

        return this._renderWounds();
    }

	render() {
		return (
            <View>
                <Heading text='Health' />
                <View style={styles.titleContainer}>
                    <Text style={[styles.grey, {paddingLeft: 30}]}>Use Body Points?</Text>
                    <View style={{paddingRight: 30}}>
                        <Switch
                            value={this.props.character.health.useBodyPoints}
                            onValueChange={() => this.props.updateHealthSystem()}
                            thumbColor='#f57e20'
                            trackColor={{true: '#fde5d2', false: '#4f4e4e'}}
                        />
                    </View>
                </View>
                {this._renderHealth()}
                <View style={{paddingBottom: 20}} />
            </View>
		);
	}
}