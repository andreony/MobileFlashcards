import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import store from './app/store'
import { fetchCardDeksAsync } from './features/cards/cardsSlice'
import CardDeckList from './features/cards/CardDeckList'

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
        <CardDeckList />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});
