import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigator, RootStackParams } from './Navigator';
import SearchScreen from '../screens/SearchScreen';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonScreen from '../screens/PokemonScreen';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
        screenOptions={{
            tabBarActiveTintColor: '#5856D6',
            headerShown: false,
            tabBarLabelStyle: {
                marginBottom: ( Platform.OS === 'ios' ? 0 : 10 )
            },
            tabBarStyle: {
                borderWidth: 0,
                elevation: 0,
                backgroundColor: 'rgba(255,255,255, 0.92)'
            }
        }}
    >
    <Tab.Screen 
        name="Navigator"
        component={ Navigator }
        options={{
            tabBarLabel: 'Listado',
            tabBarIcon: ({ color }) => <Icon color={ color } size={ 25 } name='list-outline'/>
        }}
    />
    <Tab.Screen
        name="SearchScreen"
        component={ Tab2Screen }
        options={{
            tabBarLabel: 'Búsqueda',
            tabBarIcon: ({ color }) => <Icon color={ color } size={ 25 } name='search-outline'/>
        }}
    />
    </Tab.Navigator>
  );
}