import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CardDeck from './CardDeck';
import { AppLoading } from 'expo';
import { useSelector, connect } from 'react-redux';
import { selectAllCards } from './cardsSlice'

const CardDeckList = () => {
	
	const cards = useSelector(selectAllCards)
	//AppLoading

	return (
		<View style={[styles.container]}>
			{cards.map( card => <CardDeck card={card} key={card.title}/>)}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: "center",
		alignItems: 'center'
	}
})
const mapStateToProps = ({cards}) => ({
	cards
})

export default CardDeckList //connect(mapStateToProps)(CardDeckList)