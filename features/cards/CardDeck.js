import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
//import BootstrapStyleSheet from 'react-native-bootstrap-styles'

// const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
// const s = styles = bootstrapStyleSheet.create();
//const c = constants = bootstrapStyleSheet.constants;

const CardDeck = ({card}) => (
	<View style={[s.card]}>
		<View style={[s.cardBody]}>
			<Text style={[s.textCenter]}>{card.title}</Text>
			<Text style={[s.textCenter, {color: "gray"}]}>{card.questions.length} Cards</Text>
		</View>
	</View>
)
const s = StyleSheet.create({
	card:{
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: "center",
		alignSelf: 'stretch',
		padding: 5,
		margin: 5,
		borderRadius: 5,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,.24)',
		shadowOffset:{
			width: 0,
			height: 3
		}
	},
	cardBody:{
		padding: 5,
	},
	textCenter:{
		textAlign: "center"
	}
})
export default CardDeck