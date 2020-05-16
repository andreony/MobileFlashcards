import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cardsAPI from './cardsAPI';

export const fetchCardDeksAsync = createAsyncThunk("cards/fetchall", async () => {
	const results = await cardsAPI.fetchAll();
	return results
})

export const addQandACard = createAsyncThunk('cards/addQandA', 
	async (payload, thunkAPI) => {
		const { title, card } = payload
		const results = await cardsAPI.addQandA({title, card})
		console.log('results from Thunk: ', results)
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
			const { id:title, ...changes } = action.payload
			cardsAdapter.updateOne(state,  { id, changes })
		})
	}
})

export const {
  selectById: selectCardById,
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
  selectAll: selectAllCards,
  selectTotal: selectTotalCards
} = cardsAdapter.getSelectors(state => state.cards);

export default cardsSlice.reducer