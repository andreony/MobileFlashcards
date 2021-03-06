import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cardsAPI from './cardsAPI';


export const fetchCardDeksAsync = createAsyncThunk("cards/fetchall", async () => {
	const results = await cardsAPI.fetchAll();
	return results
})

export const addCardDeckAsync = createAsyncThunk("cards/addDeck",
	async (payload, thunkAPI) => {
		const { title } = payload	
		await cardsAPI.addEntity(title)
		return payload
	}
)

export const removeDeckAsync = createAsyncThunk('cards/removeDeck',
	async (title, { getState } ) => {
		const response = await cardsAPI.removeDeck(title)
		return response
	}
)

export const addQandACard = createAsyncThunk('cards/addQandA', 
	async (payload, thunkAPI) => {
		const { title, card } = payload
		const results = await cardsAPI.addQandA({title, card})
		return results
})

const cardsAdapter = createEntityAdapter({
	selectId: card => card.title
})
const initialState = cardsAdapter.getInitialState({loading: false})

const cardsSlice= createSlice({
	name: 'cards',
	initialState,
	reducers: {
		addcard: cardsAdapter.addOne,
		removeOne: cardsAdapter.removeOne
	},
	extraReducers: builder =>{
		// add many
		builder.addCase(fetchCardDeksAsync.pending, (state, action) => {
				state.loading = true;
		});
		builder.addCase(fetchCardDeksAsync.fulfilled, (state, action) => {
				cardsAdapter.upsertMany(state, action.payload);
				state.loading = false;
		});
		builder.addCase(addQandACard.fulfilled, (state, action) => {
			const { title, ...changes } = action.payload
			cardsAdapter.updateOne(state,  { id: title, changes })
		});
		builder.addCase(addCardDeckAsync.fulfilled, (state,action) => {
			cardsAdapter.upsertOne(state, action.payload)
		});
		builder.addCase(removeDeckAsync.fulfilled, (state, action) => {
			cardsAdapter.removeOne(state, action.payload.title)
		})
	}
})
export const isLoading = state => state.cards.loading 

export const {
  selectById: selectCardById,
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
  selectAll: selectAllCards,
  selectTotal: selectTotalCards
} = cardsAdapter.getSelectors(state => state.cards);

export default cardsSlice.reducer