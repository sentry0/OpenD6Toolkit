import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, StyleSheet, ScrollView, View, TouchableHighlight, Image, Alert, Switch } from 'react-native';
import { Container, Content, Button, Text, Spinner, Card, CardItem, Body, Icon, Form, Label, Item, Input, Textarea, Toast, Left, Right } from 'native-base';
import Header from '../Header';
import Heading from '../Heading';
import LogoButton from '../LogoButton';
import ConfirmationDialog from '../ConfirmationDialog';
import styles from '../../Styles';
import { template } from '../../lib/Template';
import { saveTemplateAttribute, deleteTemplateSkill } from '../../../reducer';

class EditAttributeScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        attributeName: PropTypes.string.isRequired,
        saveTemplateAttribute: PropTypes.func.isRequired,
        deleteTemplateSkill: PropTypes.func.isRequired,
        template: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            attribute: props.navigation.state.params.attribute,
            attributeIndex: template.getAttributeIndex(props.navigation.state.params.attribute.name, props.template),
            toBeDeleted: null,
            confirmationDialog: {
                visible: false,
                title: 'Delete Skill',
                info: 'This is permanent, are you certain you want to delete this skill?'
            }
        };

        this.onClose = this._closeConfirmationDialog.bind(this);
        this.onOk = this._deleteConfirmed.bind(this);
    }

    _delete(skill) {
        let newState = {...this.state};
        newState.confirmationDialog.visible = true;
        newState.toBeDeleted = skill;

        this.setState(newState);
    }

    _deleteConfirmed() {
        this.props.deleteTemplateSkill(this.state.attribute.name, this.state.toBeDeleted);

        let newState = {...this.state};
        newState.toBeDeleted = null;

        this.setState(newState, () => {
            this._closeConfirmationDialog();
        });
    }

    _closeConfirmationDialog() {
        let newState = {...this.state};
        newState.confirmationDialog.visible = false;

        this.setState(newState);
    }

    _updateAttributeField(key, value) {
        let newState = {...this.state};
        newState.attribute[key] = value;

        this.setState(newState);
    }

    _save() {
        let message = 'The attribute "' + this.state.attribute.name + '" already exists';

        if (template.isAttributeNameUnique(this.state.attribute, this.state.attributeIndex, this.props.template)) {
            this.props.saveTemplateAttribute(this.state.attribute, this.state.attributeIndex);

            message = this.state.attribute.name === '' ? 'The attribute' : this.state.attribute.name + ' has been saved';
        }

        Toast.show({
            text: 'The attribute "' + this.state.attribute.name + '" already exists',
            position: 'bottom',
            buttonText: 'OK',
            textStyle: {color: '#fde5d2'},
            buttonTextStyle: { color: '#f57e20' },
            duration: 3000
        });
    }

    _renderSkills() {
        if (this.state.attribute.skills.length > 0) {
            return (
                <View>
                    {this.state.attribute.skills.map((skill, index) => {
                        return (
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text style={[styles.boldGrey, {fontSize: 25}]}>{skill.name}</Text>
                                    </Body>
                                    <Right>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Icon
                                                type='FontAwesome'
                                                name='trash'
                                                style={[localStyles.button, {paddingRight: 10}]}
                                                onPress={() => this._delete(skill)}
                                            />
                                            <Icon
                                                type='FontAwesome'
                                                name='edit'
                                                style={[localStyles.button, {paddingTop: 3}]}
                                                onPress={() => {}}
                                            />
                                        </View>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text style={styles.grey}>{skill.description}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        )
                    })}
                </View>
            );
        }

        return null;
    }

	render() {
		return (
		  <Container style={styles.container}>
            <Header navigation={this.props.navigation} />
            <Content style={styles.content}>
                <Heading text='Attribute' onBackButtonPress={() => this.props.navigation.navigate('Architect')} />
                <Form>
                    <Item stackedLabel>
                        <Label style={{fontWeight: 'bold'}}>Name</Label>
                        <Input
                            style={styles.grey}
                            maxLength={64}
                            value={this.state.attribute.name}
                            onChangeText={(value) => this._updateAttributeField('name', value)}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontWeight: 'bold'}}>Description</Label>
                        <Textarea
                            rowSpan={5}
                            bordered
                            maxLength={255}
                            style={{width: '100%'}}
                            value={this.state.attribute.description}
                            onChangeText={(value) => this._updateAttributeField('description', value)}
                        />
                    </Item>
                    <Item>
                        <Label style={{fontWeight: 'bold'}}>Is Extranormal?</Label>
                        <Switch
                            value={this.state.attribute.isExtranormal}
                            onValueChange={() => this._updateAttributeField('isExtranormal', !this.state.attribute.isExtranormal)}
                            thumbColor='#f57e20'
                            trackColor={{true: '#fde5d2', false: '#4f4e4e'}}
                        />
                    </Item>
                </Form>
                <View style={{paddingBottom: 20}} />
                <LogoButton label='Save' onPress={() => this._save()} />
                <View style={{paddingBottom: 20}} />
                <Heading text='Skills' onAddButtonPress={() => {}} />
                {this._renderSkills()}
                <View style={{paddingBottom: 20}} />
                <ConfirmationDialog
                    visible={this.state.confirmationDialog.visible}
                    title={this.state.confirmationDialog.title}
                    info={this.state.confirmationDialog.info}
                    onOk={this.onOk}
                    onClose={this.onClose}
                />
            </Content>
	      </Container>
		);
	}
}

const localStyles = StyleSheet.create({
	button: {
        fontSize: 30,
        color: '#f57e20'
	}
});

const mapStateToProps = state => {
    return {
        template: state.architect.template
    };
}

const mapDispatchToProps = {
    saveTemplateAttribute,
    deleteTemplateSkill
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAttributeScreen);