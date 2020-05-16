import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, getDeksResults } from "../../utils/helpers";

const cardsAPI = {
  async fetchAll() {
		const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
		return getDeksResults(results)
	},
	async addEntity({title}) {
		return await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
			[title]:{
				title,
				questions: []
			}
		}))
	},
	async addQandA({title, card}) {
		const deck = await AsyncStorage.getItem(DECK_STORAGE_KEY)
		const deckData = JSON.parse(deck)
		deckData[title].questions.concat(card)
		AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckData))
			.then( (results) => results[title])
	}
}

export default cardsAPI