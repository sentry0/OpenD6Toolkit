import React, { Component }  from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, Keyboard } from 'react-native';
import { Text, Icon, Item, Input } from 'native-base';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import Slider from 'react-native-slider';
import styles from '../Styles';

export default class DieSlider extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        step: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        valueKey: PropTypes.string,
        onValueChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired
    }

	constructor(props) {
		super(props);

        this.state = {
            textValue: props.value
        }

        this.onTextValueChange = this._onTextValueChange.bind(this);
		this.onValueChange = this._onValueChange.bind(this);
        this.keyboardDidHide = this._keyboardDidHide.bind(this);

		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (this.state.textValue !== '' && this.state.textValue !== '-') {
                this.setState({textValue: nextProps.value});
            }
        }
    }

    _keyboardDidHide () {
        if (this.state.textValue !== this.props.value) {
            this.setState({textValue: this.props.value});
        }
    }

    _isFraction() {
        return this.props.step < 1;
    }

    _isInputValid(value) {
        if (value === '' || value === '-') {
            this.setState({textValue: value}, () => {
                this.onValueChange(1);
            });

            return false;
        }

        if (this._isFraction()) {
            this.setState({textValue: value});

            if (/^(\-)?[0-9]\.(25|50|75|0)$/.test(value) === false) {
                return false;
            }
        } else {
            if (/^(\-)?[0-9]*$/.test(value) === false) {
                return false;
            }
        }

        return true;
    }

    _onTextValueChange(value) {
        if (this._isInputValid(value) && value % this.props.step === 0.0) {
            if (value < this.props.min) {
                value = this.props.min;
            } else if (value > this.props.max) {
                value = this.props.max;
            }

            this.setState({textValue: value}, () => {
                this.onValueChange(value);
            });
        }
    }

	_onValueChange(value) {
        if (typeof this.props.valueKey === 'string') {
            this.props.onValueChange(this.props.valueKey, value);
        } else {
            this.props.onValueChange(value);
        }
	}
	
	render() {
		return (
			<View>
				<View style={localStyles.titleContainer}>
					<Text style={styles.grey}>{this.props.label}</Text>
                    <View style={{width: (this._isFraction() ? scale(50): scale(40))}}>
                        <Item>
                            <Input
                                style={[styles.grey, {height: verticalScale(40)}]}
                                keyboardType='numeric'
                                maxLength={(this._isFraction() ? 5 : 3)}
                                value={this.state.textValue.toString()}
                                onChangeText={(value) => this.onTextValueChange(value)}
                                onFocus={(value) => this.onTextValueChange('')}
                            />
                        </Item>
                    </View>
				</View>
				<View>
                    <Slider
                        value={this.props.value}
                        step={this.props.step}
                        minimumValue={this.props.min}
                        maximumValue={this.props.max}
                        onValueChange={(value) => this.onValueChange(value)}
                        disabled={this.props.disabled}
                        trackStyle={thumbStyles.track}
                        thumbStyle={thumbStyles.thumb}
                        minimumTrackTintColor='#fde5d2'
                    />
				</View>
			</View>
		);
	}
}

const localStyles = ScaledSheet.create({
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: '15@vs'
	},
});

const thumbStyles = ScaledSheet.create({
	track: {
		height: '16@vs',
		borderRadius: '10@s',
		backgroundColor: '#4f4e4e'
	},
	thumb: {
		width: '25@s',
		height: '25@s',
		borderRadius: '15@s',
		backgroundColor: 'white',
		borderColor: '#f57e20',
		borderWidth: '2@s',
	}
});