import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileGrid from '../ProfileGrid/ProfileGrid';
import ProfileDetail from '../ProfileGrid/ProfileDetail/ProfileDetail';

const ProfileStack = createStackNavigator();

const ProfileGridNavigator = () => (
  <ProfileStack.Navigator initialRouteName='ProfileGridMain'>
    <ProfileStack.Screen
      name="ProfileGridMain"
      component={ProfileGrid}
      options={{ headerShown: false }}
    />
    <ProfileStack.Screen
      name="ProfileDetail"
      component={ProfileDetail}
      options={{ headerShown: false}}
    />
  </ProfileStack.Navigator>
);

export default ProfileGridNavigator;
