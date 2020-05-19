import { AsyncStorage } from "react-native"
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const DECK_STORAGE_KEY = 'Flashcards:deck'
const NOTIFICATIONS_KEY = 'Flashcards:notifications'

const setInitialData = () => {
	const decks = {
		React: {
			title: 'React',
			questions: [
				{
					question: 'What is React?',
					answer: 'A library for managing user interfaces'
				},
				{
					question: 'Where do you make Ajax requests in React?',
					answer: 'The componentDidMount lifecycle event'
				}
			]
		},
		JavaScript: {
			title: 'JavaScript',
			questions: [
				{
					question: 'What is a closure?',
					answer: 'The combination of a function and the lexical environment within which that function was declared.'
				}
			]
		}
	}
	AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
	return decks
}

export function getDeksResults(results) {
	return !results
		? setInitialData()
		:	JSON.parse(results)
}

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
	return {
		title: 'Keep learning 👏!',
		body: "Don't forget to tesk your skills today!",
		ios: {
			sound: true, 
		},
		android: {
			sound: true,
			priority: 'high',
			sicky: false,
			vibrate:true
		}
	}
}

// export const askNotificationPermissions = async () => {
//   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//   let finalStatus = existingStatus;
//   if (existingStatus !== granted) {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }
//   if (finalStatus !== granted) {
//     return false;
//   }
//   return true;
// };

// export const scheduleNotification = async () => {
//   let notificationId = await Notifications.scheduleLocalNotificationAsync(
//     createNotification(),
//     {
//       repeat: 'minute',
//       time: new Date().getTime() + 10000,
//     },
//   );
//   return notificationId;
// };

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATIONS_KEY)
		.then(JSON.parse)
		.then( (data) => {
			if(data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then( ({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()
							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(19)
							tomorrow.setMinutes(30)
							let scheduledNotification = Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)
							console.info(scheduledNotification);
							console.info(scheduledNotification);
							AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
						}
					})
			}else{
				console.info('local storage key is not null ', data)
			}
		})
}