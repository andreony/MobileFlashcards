import { AsyncStorage } from "react-native"

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const DECK_STORAGE_KEY = 'Flashcards:deck'

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