import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import CardDeck from './CardDeck';
import { AppLoading } from 'expo';
import { useSelector, connect } from 'react-redux';
import { selectAllCards } from './cardsSlice'
import { lightBlue, white } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width

const CardDeckList = ({navigation}) => {
	
	const cards = useSelector(selectAllCards)
	//AppLoading
	const onPress = (card) => {
		navigation.navigate('DeckView', card)
	}

	return (
		<View style={styles.container}>
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
	scrollView: {
		width: screenWidth - 20,
    marginHorizontal: 10,
  }
})
const mapStateToProps = ({cards}) => ({
	cards
})

export default CardDeckList //connect(mapStateToProps)(CardDeckList)