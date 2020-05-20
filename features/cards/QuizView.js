import React, { useState, useEffect } from 'react'
import { View , Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Quiz from './Quiz';
import { white, purple } from '../../utils/colors';

import { ProgressBarAndroid } from 'react-native';
import { ProgressViewIOS } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';
import { TouchableHighlight } from 'react-native-gesture-handler';
//import {Surface, Shape} from '@react-native-community/art';
//import {ProgressView} from "@react-native-community/progress-view";

const Stack = createStackNavigator();
const viewportWidth = Dimensions.get('window').width

const QuizView = ({navigation, route}) => {
	const { questions } = route.params
	const qCount = questions.length

	const [ count, setCount ] = useState(1)
	const [ score, setScore ] = useState(0)
	const [ bounceValue, setBounceValue ] = useState(new Animated.Value(1))
	
	const [ cardState, setCardState ] = useState({
		isFaceShowing: true,
		shouldFlip: false
	})

	useEffect(() => {
		if(count > qCount){
			setupQuizCompleted()
		}else{
			navigation.setOptions({title: `Quiz ${count}/${qCount}`})
		}
	}, [count])
	
	const correctAnswer = () => {
		const { isFaceShowing } = cardState
		setCount(count + 1 )
		setScore(score + 1 )
		if(!isFaceShowing){
			setCardState(prevState => ({...prevState, shouldFlip: true}))
		}
	}

	const inCorrectAnswer = () => {
		const { isFaceShowing } = cardState
		setCount(count + 1 )
		if(!isFaceShowing){
			setCardState(prevState => ({...prevState, shouldFlip: true}))
		}
	}
	const reset = () => {
		setCount(1)
		setScore(0)
		setCardState(prevState => ({...prevState, shouldFlip: false}))
	}

	const setupQuizCompleted = async () => {
		// then quiz completed. Clean notifications for today
		return await clearLocalNotification()
			.then( () => Animated.sequence([
					Animated.timing(bounceValue, { duration: 200, toValue: 1.07}),
					Animated.spring(bounceValue, { toValue: 1, friction: 4})
				]).start())
			.then(setLocalNotification)
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
		</View>
	)

	return (
		<View style={styles.container}>
			{ count <= qCount 
				? <View style={styles.quizCardWrapper}>
						<Quiz {...questions[count -1]} {...cardState} setCardState={setCardState} /> 
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
								<Animated.Text style={[styles.scoreText, {transform: [{scale: bounceValue}]}]}>
									You've scored {(score/qCount * 100).toFixed(1)}%
								</Animated.Text>
						</View>
						<TouchableOpacity style={[styles.btn, styles.btnDanger]}
							onPress={reset}>
							<Text style={styles.textWhite}>Reset</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, styles.btnPrimary]}
							onPress={() => navigation.goBack()}>
							<Text style={styles.textWhite}>Back To Deck</Text>
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
  scoreText: {
    paddingVertical:10,
    fontSize: 24,
	},
	progress: {
		width: 200,
  }
})