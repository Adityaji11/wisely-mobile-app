import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FilterDrawerInbox from '../FilterDrawer/FilterDrawerInbox';
import ChatScreen from '../ChatScreen/ChatScreen';

const ChatDrawerNavigator = createDrawerNavigator();

const ChatDrawer = () => (
  <ChatDrawerNavigator.Navigator
    screenOptions={{
      drawerPosition: 'right', // Place the drawer on the right side
      headerShown: false,
    }}
    drawerContent={(props) => <FilterDrawerInbox {...props} />}
  >
    <ChatDrawerNavigator.Screen name="ChatScreen" component={ChatScreen} />
  </ChatDrawerNavigator.Navigator>
);

export default ChatDrawer;
