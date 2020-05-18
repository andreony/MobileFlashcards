import React from 'react'
import CardDeckList from './CardDeckList'
import NewCardDeck from './NewCardDeck'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { white, purple, tomato } from '../../utils/colors'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
const tabBarOptions = {
  activeTintColor: Platform.OS === 'ios' ? tomato : white,
  inactiveTintColor: 'gray',
  style:{
    height: 80,
    paddingTop: 5,
    backgroundColor: Platform.OS === 'ios' ? white : tomato,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width:0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
}

const Dashboard = () => {
	return (
		<Tab.Navigator
			tabBarOptions={tabBarOptions}
			screenOptions={{
				headerStyle: {
					backgroundColor: '#f4511e',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<Tab.Screen 
				name="Decks"
				component={CardDeckList}
				options={{
					tabBarLabel: 'Decks',
					tabBarIcon:({color}) => <MaterialIcons name="collections" size={24} color={color} />
				}}
			/>
			<Tab.Screen 
				name="Add Deck" 
				component={NewCardDeck}
				options={{
						tabBarLabel: 'Add Deck',
						tabBarIcon: ({color}) => <FontAwesome name='plus' size={30} color={color}/>
				}}
			/>
			</Tab.Navigator>
	)
}

export default Dashboard