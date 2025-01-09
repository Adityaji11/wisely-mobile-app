import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../../Components/CustomButton';
import InputField from '../../Components/InputField';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('<YOUR_BACKEND_API_URL>/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        // Navigate to dashboard/home screen
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const response = await fetch('<YOUR_BACKEND_API_URL>/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Google login successful');
        // Navigate to dashboard/home screen
      } else {
        Alert.alert('Error', data.message || 'Google login failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Google login failed');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        <Image
              source={require('../../assets/Images/icons8-login-64.png')}
            />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label="Email ID"
          icon={<MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputField
          label="Password"
          icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          inputType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <CustomButton label="Login" onPress={handleLogin} />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={handleGoogleLogin} style={styles.socialButton}
          >
            <Image
              source={require('../../assets/Images/icons8-google-48.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('Info', 'Facebook login not implemented yet')}
            style={styles.socialButton} >
            <Image
              source={require('../../assets/Images/icons8-facebook-48.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.socialButton}>
            <Image
              source={require('../../assets/Images/icons8-twitter-bird-48.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  socialButton: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
};

export default LoginScreen;