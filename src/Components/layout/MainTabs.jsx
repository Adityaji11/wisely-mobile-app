import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavScreen from '../FavScreen/FavScreen';
import StoreScreen from '../StoreScreen/StoreScreen';
import AppDrawer from './AppDrawer';
import ChatDrawer from './ChatDrawer';

const Tab = createBottomTabNavigator();
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let iconSource;

        switch (route.name) {
          case 'Browse':
            iconSource = focused
              ? require('../../assets/icons/search-engine.png')
              : require('../../assets/icons/seo-and-web.png');
            break;
          case 'Inbox':
            iconSource = focused
              ? require('../../assets/icons/chat.png')
              : require('../../assets/icons/message.png');
            break;
          case 'Faves':
            iconSource = focused
              ? require('../../assets/icons/favourite.png')
              : require('../../assets/icons/heart.png');
            break;
          case 'Store':
            iconSource = focused
              ? require('../../assets/icons/open.png')
              : require('../../assets/icons/grocery-store.png');
            break;
        }

        return <Image source={iconSource} style={styles.icon} />;
      },
      tabBarActiveTintColor: '#42f44b',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: styles.tabBarStyle,
      headerShown:false,
    })}>
    <Tab.Screen
      name="Browse"
      component={AppDrawer}
    />
    <Tab.Screen
      name="Inbox"
      component={ChatDrawer}
    />
    <Tab.Screen
      name="Faves"
      component={FavScreen}
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
