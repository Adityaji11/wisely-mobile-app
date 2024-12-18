import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Auth/LoginScreen/LoginScreen';
import SignupScreen from '../../Auth/SignUpScreen/SignupScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
<Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)
 
export default AuthStack