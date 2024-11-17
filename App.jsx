import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileGrid from './src/Components/ProfileGrid/ProfileGrid';
import ChatScreen from './src/Components/ChatScreen/ChatScreen';
import FavScreen from './src/Components/FavScreen/FavScreen';
import StoreScreen from './src/Components/StoreScreen/StoreScreen';
import ProfileDetail from './src/Components/ProfileGrid/ProfileDetail/ProfileDetail';
import MyAlbum from './src/Components/MyAlbum/MyAlbum';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Browse') {
          iconName = 'search-outline';
        } else if (route.name === 'Inbox') {
          iconName = 'chatbubble-outline';
        } else if (route.name === 'Faves') {
          iconName = 'heart-outline';
        } else if (route.name === 'Store') {
          iconName = 'cart-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#42f44b',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: [{ display: 'flex' }],
    })}
  >
    <Tab.Screen name="Browse" component={ProfileGrid} options={{ headerShown: false }} />
    <Tab.Screen name="Inbox" component={ChatScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Faves" component={FavScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Store" component={StoreScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetail}
          options={{ headerShown: true, title: 'Profile' }}
        />
          <Stack.Screen name="MyAlbum" options={{ headerShown: true, title: 'My Album' }} component={MyAlbum} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;