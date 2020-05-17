import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, gray } from '../../utils/colors'
import { AppLoading } from 'expo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardDeckView = ({card}) => {

	if(!card)
		return <AppLoading/>

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{card.title}</Text>
				<View style={styles.rowCenter}>
					<Text style={styles.textSecondary}>{card.questions.length}</Text>
					<MaterialCommunityIcons name="cards" size={30} color="black" />
				</View>
			</View>
			<View>
				<TouchableOpacity style={[styles.Btn, styles.AddButton]}>
					<Text style={styles.ButtonTextBlue}>Add Card</Text>
				</TouchableOpacity>
				{card.questions.length &&(
					<TouchableOpacity style={[styles.Btn, styles.QuizButton]}>
						<Text style={styles.ButtonTextWhite}>Start Quiz</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
const mapStateToProps = ({cards}, {title}) => {
	console.log(title)
	console.log(cards)
	const ids = cards.ids
	return {
		card: cards.entities[title]
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