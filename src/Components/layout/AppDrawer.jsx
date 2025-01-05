import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import ProfileGrid from '../ProfileGrid/ProfileGrid';

const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerPosition: 'left', 
      headerShown: false,
    }}
    drawerContent={(props) => <ProfileDrawer {...props} />}
  >
    <Drawer.Screen name="ProfileGrid" component={ProfileGrid} />
  </Drawer.Navigator>
);

export default AppDrawer;