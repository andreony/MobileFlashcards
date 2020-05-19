import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import CardDeck from './CardDeck'
import { AppLoading } from 'expo'
import { useSelector, connect } from 'react-redux'
import { selectAllCards } from './cardsSlice'
import { lightBlue, white, lightPurp } from '../../utils/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

const screenWidth = Dimensions.get('screen').width

const CardDeckList = ({navigation}) => {
	
	const cards = useSelector(selectAllCards)
	const onPress = (card) => {
		navigation.navigate('DeckView', card)
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['rgba(0,0,0,0.8)', 'transparent']}
				style={styles.header}>
				<Text style={{fontSize: 18, fontWeight: "bold", color: white}}>Card Decks</Text>
			</LinearGradient>
			<ScrollView style={styles.scrollView}>
				{cards.map( card => <CardDeck card={card} key={card.title} onPress={() => onPress(card)}/>)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: lightBlue
	},
	header:{
		margin: 15,
		padding:10, 
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "flex-start",
	},
	scrollView: {
		width: screenWidth - 20,
    marginHorizontal: 10,
  }
})

export default CardDeckList