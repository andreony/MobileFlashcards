import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { white, gray } from '../../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
//import BootstrapStyleSheet from 'react-native-bootstrap-styles'

// const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
// const s = styles = bootstrapStyleSheet.create();
//const c = constants = bootstrapStyleSheet.constants;

const CardDeck = ({card, onPress}) => (
	<TouchableOpacity 
		onPress={onPress}
		style={[styles.card]}>
		<View style={styles.cardBody}>
			<View style={styles.cardIcon}>
				<MaterialCommunityIcons name="cards" size={48} color="black" />
			</View>
			<View style={styles.cardTextWrapper}>
				<Text style={styles.cardTitle}>{card.title}</Text>
				<Text style={styles.cardText}>{card.questions.length} Cards</Text>
			</View>
		</View>
	</TouchableOpacity>
)
const styles = StyleSheet.create({
	card:{
		backgroundColor: white,
		justifyContent: "center",
		alignSelf: 'stretch',
		padding: 5,
		marginHorizontal: 5,
		marginBottom: 15,
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
		flex:1,
		flexDirection: 'row',
		padding: 10,
	},
	cardIcon:{
		flex:1,
		justifyContent:"center",
		alignItems: "center",
		alignSelf: 'flex-start'
	},
	cardTextWrapper: {
		flex: 4,
		justifyContent:"center",
		alignItems: "center"
	},
	center:{
		justifyContent:"center",
		alignItems: "center"
	},
	cardTitle:{
		fontSize: 24,
		fontStyle: "italic"
	},
	cardText:{
		fontSize: 18,
		color: gray
	}
})
export default CardDeck