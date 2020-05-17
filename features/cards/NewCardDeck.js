import React, { useState } from 'react'
import { 
	Text, 
	View, 
	TextInput, 
	StyleSheet,
	Keyboard,
	TouchableHighlight,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native'
import { lightBlue } from '../../utils/colors'
import { useDispatch } from 'react-redux'
import { addCardDeckAsync } from './cardsSlice'
import StyledTextInput from './StyledTextInput'

const NewCardDeck = () => {

	const initialState = {title:''}
	const [ newDeck, setState  ] = useState(initialState)
	const dispatch = useDispatch()

	const handleSave = (e) => {
		e.preventDefault()
		if(!newDeck.title.trim()){
			console.log('Title is empty', newDeck)
			return false
		}
		console.log('dispatching', newDeck)
		dispatch(addCardDeckAsync(newDeck))
		setState(initialState)
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.header}>New Deck</Text>
			</View>
			<KeyboardAvoidingView behavior='padding'>
				<StyledTextInput
					placeholder="Deck Title"
					maxLength={240}
					onBlur={Keyboard.dismiss}
					onChangeText={ (text) => setState({title: text})}
					value={newDeck.title}
				/>
			</KeyboardAvoidingView>
			<TouchableOpacity
				onPress={handleSave}  
				style={styles.saveButton}>
				<Text style={styles.saveButtonText}> Save </Text>
			</TouchableOpacity>
		</View>
	)
}

export default NewCardDeck

const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingTop: 45,
		backgroundColor: lightBlue,
	},
	header:{
		fontSize:25, 
		textAlign: 'center',
		fontWeight: "bold",
		paddingVertical: 10
	},
	saveButton: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: '#007BFF',
		padding: 15,
		margin: 5
	},
	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center'
	}
	
});