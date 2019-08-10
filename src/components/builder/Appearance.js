import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Label, Input } from 'native-base';
import { scale, verticalScale } from 'react-native-size-matters';
import styles from '../../Styles';

export default class Appearance extends Component {
    static propTypes = {
        character: PropTypes.object.isRequired,
        updateAppearance: PropTypes.func.isRequired
    }

	render() {
		return (
            <View>
                <Form>
                    <Item stackedLabel>
                        <Label style={{fontSize: scale(10)}}>Name</Label>
                        <Input
                            style={styles.textInput}
                            maxLength={64}
                            value={this.props.character.name}
                            onChangeText={(value) => this.props.updateAppearance('name', value)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontSize: scale(10)}}>Species</Label>
                        <Input
                            style={styles.textInput}
                            maxLength={30}
                            value={this.props.character.species}
                            onChangeText={(value) => this.props.updateAppearance('species', value)}
                        />
                    </Item>
                </Form>
                <View style={{paddingBottom: 20}} />
            </View>
		);
	}
}
