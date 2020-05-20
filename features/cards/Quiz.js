import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { lightPurp, white, purple, blue } from '../../utils/colors'

const viewportWidth = Dimensions.get('window').width

const Quiz = ({question, answer, shouldFlip, setCardState}) => {
	
	return (
		<FlipCard 
			friction={6}
			perspective={1000}
			flipHorizontal={true}
			flipVertical={false}
			flip={shouldFlip}
			onFlipStart={ isFlipStart => isFlipStart
				?	setCardState({
						isFaceShowing: true,
						shouldFlip: false
					})
				:	setCardState(prevState => ({...prevState, isFaceShowing:false}))
			}
			style={[styles.container, styles.card]}>
			{/* Face Side */}
			<View style={[styles.cardBody, styles.shadow, {backgroundColor: '#e3f2fd'}]}>
				<View style={[styles.badge, styles.badgeQ]}>
					<Text style={{color: white, fontWeight: "bold", fontSize: 18}}> Question: </Text>
				</View>
			<View style={styles.container}>
				<Text style={{fontSize: 22, textAlign: "center"}}> {question} </Text>
			</View>
			<View style={{alignSelf: "flex-end", marginRight: 15}}>
					<Text style={{color: purple}}>Show Answer</Text>
			</View>
			</View>
			{/* Back Side */}
			<View style={[styles.cardBody, styles.shadow, {backgroundColor: '#f3e5f5'}]}>
				<View style={[styles.badge, styles.badgeA]}>
					<Text style={{color: white, fontWeight: "bold", fontSize: 18}}> Answer: </Text>
				</View>
				<View style={styles.container}>
					<Text style={{fontSize: 22, textAlign: "center"}}> {answer} </Text>
				</View>
				<View style={{alignSelf: "flex-end", marginRight: 15}}>
					<Text style={{color: purple}}>Show Question</Text>
				</View>
			</View>
		</FlipCard>
	)
}
export default Quiz

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: "center",
		alignItems: "center"
	},
	card:{
		padding: 15,
		marginHorizontal: 5,
		marginBottom: 15,
		borderRadius: 5,
	},
	cardBody:{
		flex:1,
		minWidth: viewportWidth - 50
	},
	shadow:{
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset:{
			width: 0,
			height: 3
		}
	},
	badge:{
		marginTop: -10,
		marginLeft: -10,
		borderRadius: 10,
		padding: 10,
	},
	badgeQ:{
		alignSelf: 'flex-start',
		backgroundColor: blue
	},
	badgeA:{
		alignSelf: 'flex-end',
		backgroundColor: lightPurp
	},
	
})