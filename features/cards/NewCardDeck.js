import React, { useState } from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	Keyboard,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native'
import { lightBlue } from '../../utils/colors'
import { useDispatch } from 'react-redux'
import { addCardDeckAsync, selectCardIds } from './cardsSlice'
import StyledTextInput from './StyledTextInput'
import { useSelector } from 'react-redux'
//import Toast from 'react-native-simple-toast'; // this errors out - TBD

const NewCardDeck = ({ navigation }) => {

	const initialState = {title:'', questions: []}
	const deckTitles = useSelector(selectCardIds)
	const [ newDeck, setState  ] = useState(initialState)
	const dispatch = useDispatch()

	const handleSave = (e) => {
		e.preventDefault()
		if(!newDeck.title.trim()){
			alert(`Title cannot be empty!`)
			return false
		}
		if(deckTitles.includes(newDeck.title)){
			alert(`Title "${newDeck.title}" already exists! Please choose other title`)
			setState(initialState)
			return false
		}
		dispatch(addCardDeckAsync(newDeck))
		setState(initialState)
		//navigation.goBack()
		navigation.navigate('DeckView', {title: newDeck.title})
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
					onChangeText={ (text) => setState({...newDeck, title: text})}
					value={newDeck.title}
				/>
			</KeyboardAvoidingView>
			<TouchableOpacity
				onPress={handleSave}  
				style={styles.saveButton}>
				<Text style={styles.saveButtonText}> Create Deck </Text>
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