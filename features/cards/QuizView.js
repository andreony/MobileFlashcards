import React, { useState, useEffect } from 'react'
import { View , Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Quiz from './Quiz';
import { white, purple } from '../../utils/colors';
//import ProgressBar from 'react-native-progress/Bar'
//import * as Progress from 'react-native-progress';
import { ProgressBarAndroid } from 'react-native';
import { ProgressViewIOS } from 'react-native';
//import {Surface, Shape} from '@react-native-community/art';
//import {ProgressView} from "@react-native-community/progress-view";

const Stack = createStackNavigator();
const viewportWidth = Dimensions.get('window').width

const QuizView = ({navigation, route}) => {
	const { questions } = route.params
	const qCount = questions.length

	const [ count, setCount ] = useState(1)
	const [ score, setScore ] = useState(0)

	useEffect(() => {
		if(count <= qCount)
			navigation.setOptions({title: `Quiz ${count}/${qCount}`})
	}, [count, score])
	
	const correctAnswer = () => {
		setCount(count + 1 )
		setScore(score + 1 )
	}
	const inCorrectAnswer = () => {
		setCount(count + 1 )
	}

	const reset = () => {
		setCount(1)
		setScore(0)
	}

	if(count > qCount){
		console.log('count is: ', count, '  Score: ', score, '  percentage: ', (score/qCount * 100).toFixed(1), ' qCount', qCount)
	}

	const rightWrong = () => (
		<View>
			<TouchableOpacity 
				style={[styles.btn, styles.btnSuccess]}
				onPress={correctAnswer}>
				<Text style={styles.textWhite}>Correct</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.btn, styles.btnDanger]}
				onPress={inCorrectAnswer}>
				<Text style={styles.textWhite}>Incorrect</Text>
			</TouchableOpacity>
			<Text>There Are {qCount - count } Q left </Text>
		</View>
	)

	return (
		<View style={styles.container}>
			{ count <= qCount 
				? <View style={styles.quizCardWrapper}>
						<Quiz {...questions[count -1]}/>
						{rightWrong()}
					</View>
				: <View style={styles.quizCardWrapper}>
						<View style={[styles.center, {backgroundColor: white, padding: 10}]}>
							{Platform.OS === 'ios'
								? <ProgressViewIOS
										style={styles.progress}
										progressTintColor='#64dd17'
										progress={parseFloat(score/qCount)}
									/>
								: <ProgressBarAndroid
										styleAttr="Horizontal"
										indeterminate={false}
										progress={parseFloat(score/qCount)}
									/>
							}
								<Text style={styles.gaugeText}>You've scored {(score/qCount * 100).toFixed(1)}%</Text>
						</View>
						{/* <Text>Text Completed with {score} points of {qCount}</Text>	 */}
						<TouchableOpacity style={[styles.btn, styles.btnDanger]}
							onPress={reset}>
							<Text style={styles.textWhite}>Reset</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, styles.btnPrimary]}
							onPress={() => navigation.navigate("Dashboard")}>
							<Text style={styles.textWhite}>To Dashboard</Text>
						</TouchableOpacity>
					</View>
			}
		</View>
	)
}
export default QuizView

const styles = StyleSheet.create({
	container:{
		flex: 1, 
		justifyContent: "space-around", 
		alignItems: 'center',
    backgroundColor: '#e9e9e9',
	},
	center:{
		justifyContent: "center", 
		alignItems: 'center',
	},
	btn:{
		borderRadius: 5,
		paddingVertical: 15,
		paddingHorizontal: 25,
		margin: 5,
		marginBottom: 15
	},
	quizCardWrapper:{
		flex:1, 
		width: viewportWidth - 20,
		backgroundColor: white,
		padding: 15
	},	
	btnDanger:{
		borderWidth: 1,
		borderColor: '#c62828',
		backgroundColor: '#c62828'
	},
	btnSuccess:{
		borderWidth: 1,
		borderColor: '#2e7d32',
		backgroundColor: '#2e7d32'
	},
	btnPrimary: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: '#007BFF',
		padding: 15,
		margin: 5
	},
	textWhite: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center'
	},
	gauge: {
    position: 'absolute',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    paddingVertical:10,
    fontSize: 24,
	},
	progress: {
		width: 200,
  },
})