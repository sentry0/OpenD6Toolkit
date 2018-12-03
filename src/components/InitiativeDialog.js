import React, { Component }  from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container, Content, Button, Text, Item, Input, Picker, Form, Label } from 'native-base';
import Modal from "react-native-modal";
import ErrorMessage from './ErrorMessage';
import Heading from './Heading';
import LogoButton from './LogoButton';
import styles from '../Styles';

export default class InitiativeDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        uuid: PropTypes.string,
        label: PropTypes.string,
        onClose: PropTypes.func,
        onSave: PropTypes.func,
        onRemove: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            label: '',
            errorMessage: null,
        }

        this.onUpdateLabel = this._onUpdateLabel.bind(this);
        this.onSave = this._save.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.label !== null && prevProps.label !== this.props.label) {
            this.setState({
                label: this.props.label
            });
        }
    }

    _onUpdateLabel(value) {
        let newState = {...this.state};
        newState.label = value;

        this.setState(newState);
    }

    _save() {
        let newState = {...this.state};

        if (this.state.label === '') {
            newState.errorMessage = 'Please provide a label';

            this.setState(newState);

            return;
        }

        this.props.onSave(this.props.uuid, this.state.label);
    }

    _renderDeleteButton() {
        let label = this.props.uuid === null ? 'Close' : 'Delete';
        let action = this.props.uuid === null ? this.props.onClose : this.props.onRemove;

        return <LogoButton label={label} onPress={() => action(this.props.uuid)} maxWidth={130} />
    }

	render() {
        return (
            <Modal
                isVisible={this.props.visible}
                swipeDirection={'right'}
                onSwipe={() => this.props.onClose()}
                onBackButtonPress={() => this.props.onClose()}
                onBackdropPress={() => this.props.onClose()}
            >
                <View style={styles.modal}>
                    <Heading text={'Edit Initiative'} />
                    <View style={styles.modalContent}>
                        <ErrorMessage errorMessage={this.state.errorMessage} />
                        <View style={{paddingBottom: 20}}>
                            <Item stackedLabel>
                                <Label>Name</Label>
                                <Input
                                    style={styles.grey}
                                    maxLength={30}
                                    value={this.state.label}
                                    onChangeText={(value) => this.onUpdateLabel(value)}
                                />
                            </Item>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                            <LogoButton label='Save' onPress={() => this.onSave(this.state.label)} maxWidth={130} />
                            {this._renderDeleteButton()}
                        </View>
                    </View>
                </View>
            </Modal>
        );
	}
}
