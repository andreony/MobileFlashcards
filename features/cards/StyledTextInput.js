import React from 'react'
import { TextInput, StyleSheet, Keyboard } from 'react-native'

const StyledTextInput = (props) => {
	return (
		<TextInput
			style={styles.textInput}
			{...props}
		/>
	)
}
export default StyledTextInput

const styles = StyleSheet.create({
	textInput: {
		borderColor: '#CCCCCC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		fontSize: 25,
		paddingLeft: 10,
		paddingRight: 10
	},
})