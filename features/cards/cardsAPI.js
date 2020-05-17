import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, getDeksResults } from "../../utils/helpers";

const cardsAPI = {
  async fetchAll() {
		const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
		return getDeksResults(results)
	},
	async addEntity(title) {
		const newDeck = {
			[title]:{
				title,
				questions: []
			}
		}
		AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
			.then( () => {
				console.log('result from API', newDeck)
				return newDeck
			})
	},
	async addQandA(payload) {
		const { title, card } = payload
		const deck = await AsyncStorage.getItem(DECK_STORAGE_KEY)
		const deckData = JSON.parse(deck)
		deckData[title].questions.push(card)
		// console.log('API deck data', deckData)
		// console.log('API single deck', deckData[title])
		await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckData))
		return deckData[title]
	}
}

export default cardsAPI