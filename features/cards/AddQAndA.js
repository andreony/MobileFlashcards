import React, { useState } from 'react'
import { 
	View, 
	Text, 
	KeyboardAvoidingView, 
	StyleSheet,
	Keyboard,
	TouchableOpacity
} from 'react-native'
import StyledTextInput from './StyledTextInput'
import { useDispatch } from 'react-redux'
import { addQandACard } from './cardsSlice'
import { lightBlue } from '../../utils/colors'

const AddQandA = ({navigation, route}) => {
	const { title } = route.params
	const initialState = {
		title: title,
		card:{
			question:'',
			answer: ''
		}
	}
	const [ newQandA, setState ] = useState(initialState)
	const dispatch = useDispatch()

	const handleSave = (e) => {
		e.preventDefault()
		if(!newQandA.card.question.trim() || !newQandA.card.answer.trim()){
			console.log('missing required fields', newQandA)
			return false
		}
		console.log('dispatching', newQandA)
		dispatch(addQandACard(newQandA))
		setState(initialState)
		navigation.goBack()
	}
	
	return (
		<View>
			<KeyboardAvoidingView behaviour='padding' >
				<StyledTextInput
					placeholder="Question"
					maxLength={240}
					onBlur={Keyboard.dismiss}
					onChangeText={ (text) => setState({
						...newQandA,
						'card':{
							...newQandA['card'],
							question: text
						} 
					})}
					value={newQandA.card.question}
				/>
				<StyledTextInput
					placeholder="Answer"
					maxLength={240}
					onBlur={Keyboard.dismiss}
					onChangeText={ (text) => setState({
						...newQandA,
						'card':{
							...newQandA['card'],
							answer: text
						} 
					})}
					value={newQandA.card.answer}
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
export default AddQandA

const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingTop: 45,
		backgroundColor: lightBlue,
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
})