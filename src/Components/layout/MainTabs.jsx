import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileGrid from '../ProfileGrid/ProfileGrid';
import ChatScreen from '../ChatScreen/ChatScreen';
import FavScreen from '../FavScreen/FavScreen';
import StoreScreen from '../StoreScreen/StoreScreen';
import ProfileGridNavigator from './ProfileGridNavigator';

const Tab = createBottomTabNavigator();
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let iconSource;

        // Define image sources for each tab
        if (route.name === 'Browse') {
          iconSource = focused
            ? require('../../assets/icons/search-engine.png')
            : require('../../assets/icons/seo-and-web.png');
        } else if (route.name === 'Inbox') {
          iconSource = focused
            ? require('../../assets/icons/chat.png')
            : require('../../assets/icons/message.png');
        } else if (route.name === 'Faves') {
          iconSource = focused
            ? require('../../assets/icons/favourite.png')
            : require('../../assets/icons/heart.png');
        } else if (route.name === 'Store') {
          iconSource = focused
            ? require('../../assets/icons/open.png')
            : require('../../assets/icons/grocery-store.png');
        }

        return <Image source={iconSource} style={styles.icon} />;
      },
      tabBarActiveTintColor: '#42f44b',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: styles.tabBarStyle,
    })}>
    <Tab.Screen
      name="Browse"
      component={ProfileGridNavigator}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Inbox"
      component={ChatScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Faves"
      component={FavScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen name="Store" component={StoreScreen} />
  </Tab.Navigator>
);

export default MainTabs;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
});
