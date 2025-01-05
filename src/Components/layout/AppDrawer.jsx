import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import { StyleSheet } from 'react-native';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerPosition: 'left', 
      headerShown: false,
    }}
    drawerContent={(props) => <ProfileDrawer {...props} />}
  >
    <Drawer.Screen name="MainTabs" component={MainTabs} />
  </Drawer.Navigator>
);

export default AppDrawer;