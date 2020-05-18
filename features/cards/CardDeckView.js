import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, purple } from '../../utils/colors'
import { AppLoading } from 'expo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { removeDeckAsync } from './cardsSlice'

const CardDeckView = ({ card, navigation, dispatch }) => {
	const {title, questions} = card
	const handleDelete = () => {
		dispatch(removeDeckAsync({title}))
		navigation.goBack()
	}

	if(!title)
		return <AppLoading/>

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.rowCenter}>
					<Text style={styles.textSecondary}>{questions.length}</Text>
					<MaterialCommunityIcons name="cards" size={30} color="black" />
				</View>
			</View>
			<View>
				<TouchableOpacity 
					style={[styles.Btn, styles.AddButton]}
					onPress={() => navigation.navigate("Add Quiz", {title})}>
					<Text style={styles.ButtonTextBlue}>Add Card</Text>
				</TouchableOpacity>
				{questions.length > 0 &&(
					<TouchableOpacity 
						style={[styles.Btn, styles.QuizButton]}
						onPress={() => navigation.navigate("Quiz", {questions})}>
						<Text style={styles.ButtonTextWhite}>Start Quiz</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={{alignSelf: 'flex-end', marginRight: 20}}>
				<TouchableOpacity onPress={handleDelete}>
					<Text style={{color: purple}}> Remove Deck </Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
const mapStateToProps = ({cards}, {navigation, route}) => {
	const {title} = route.params
	return {
		card: cards.entities[title],
		navigation
	}
}

export default connect(mapStateToProps)(CardDeckView)

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: "space-around",
		alignItems: 'center',
		backgroundColor: white
	},
	rowCenter:{
		flexDirection: "row", 
		alignItems: "center",
		justifyContent: "center"
	},
	title:{
		fontSize:25, 
		textAlign: 'center',
		fontWeight: "bold",
		paddingTop: 20
	},
	textSecondary:{
		fontSize: 22,
		padding: 5,
		color: gray
	},
	QuizButton: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: '#007BFF',
	},
	Btn:{
		borderRadius: 5,
		paddingVertical: 15,
		paddingHorizontal: 25,
		margin: 5,
		marginBottom: 15
	},
	AddButton: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: white,
	},
	ButtonTextWhite: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center'
	},
	ButtonTextBlue: {
		color: '#007BFF',
		fontSize: 20,
		textAlign: 'center'
	}
})