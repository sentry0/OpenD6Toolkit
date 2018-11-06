import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#161616'
	},
	content: {
		paddingTop: 10,
		paddingHorizontal: 10
	},
	heading: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#8B8888',
		paddingTop: 20
	},
	subHeading: {
		alignSelf: 'center',
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		color: '#2b2b2b'
	},
	buttonContainer: {
		paddingVertical: 5
	},
	button: {
		backgroundColor: '#00ACED',
		minWidth: 140,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	buttonBig: {
		backgroundColor: '#00ACED',
		minWidth: 300,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	buttonText: {
		color: '#FFF'
	},
	grey: {
		color: '#8B8888'
	},
	boldGrey: {
		color: '#8B8888',
		fontWeight: 'bold'
	},
	tabInactive: {
		backgroundColor: '#3a557f'
	},
	tabActive: {
		backgroundColor: '#476ead'
	},
	tabBarUnderline: {
		backgroundColor: '#3da0ff'
	},
	tabContent: {
	    flex: 1,
		backgroundColor: '#375476'
	}
});