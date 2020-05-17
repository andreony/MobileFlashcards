import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import store from './app/store'
import { fetchCardDeksAsync } from './features/cards/cardsSlice'
import CardDeckList from './features/cards/CardDeckList'
import NewCardDeck from './features/cards/NewCardDeck'
import AddQAndA from './features/cards/AddQAndA'
import CardDeckView from './features/cards/CardDeckView'
import { white } from './utils/colors'

export default function App() {
  return (
    <Provider store={store}>
      <AppChild />
    </Provider>
  )
}

function AppChild() {
  const dispatch = useDispatch() 

  useEffect( () => {
    dispatch(fetchCardDeksAsync())
  },[dispatch])

  return (
      <View style={styles.container}>
        {/* <CardDeckList /> */}
        {/* <NewCardDeck /> */}
        {/* <AddQAndA title={'JavaScript'}/> */}
        <CardDeckView title={'JavaScript'}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
});
