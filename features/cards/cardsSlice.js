import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const cardsAdaptor = createEntityAdapter()
const initialState = cardsAdaptor.getInitialState()

const cardsSlice= createSlice({
	name: 'cards',
	initialState,
	reducers: {
        addcard: cardsAdaptor.addOne,
        removeOne: cardsAdaptor.removeOne
    },
    extraReducers:{

    }
})

export default cardsSlice.reducer