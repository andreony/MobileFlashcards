import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import store from './app/store'
import { fetchCardDeksAsync } from './features/cards/cardsSlice'
import AddQAndA from './features/cards/AddQAndA'
import CardDeckView from './features/cards/CardDeckView'
import Dashboard from './features/cards/Dashboard'
import { white, tomato } from './utils/colors'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import QuizView from './features/cards/QuizView'
import { setLocalNotification } from './utils/helpers'

const { statusBarHeight } = Constants
const Stack = createStackNavigator();

function MyStatusBar({ backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor, height: statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </View>
  )
}

// add provider here... useDisptch bug
export default function App() {
  return (
    <Provider store={store}>
      <AppChild />
    </Provider>
  )
}

function AppChild() {
  const dispatch = useDispatch() 

  useEffect(() => {
    setLocalNotification()
    dispatch(fetchCardDeksAsync())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={tomato} barStyle='dark-content' />
      <View style={styles.contentWrapper}>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen 
            name="Quiz" 
            component={QuizView} 
            options={ ({route}) => ({title: `Quiz 1/${route.params.questions.length}`}) }  
          />
          <Stack.Screen name="Add Quiz" component={AddQAndA} />
          <Stack.Screen 
            name="DeckView" 
            component={CardDeckView} 
            options={ ({route}) => ({title: route.params.title}) }  
          />
        </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  contentWrapper:{
    flex: 1,
    marginVertical: 15,
  }
});
