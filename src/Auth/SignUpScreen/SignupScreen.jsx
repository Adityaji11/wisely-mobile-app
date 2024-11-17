import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(signup({ firstName, lastName, email, password })).unwrap()
      .then(() => {
        Alert.alert('Signup Successful', 'You can now log in.');
        navigation.navigate('Login');
      })
      .catch((err) => Alert.alert('Signup Failed', err.message || 'Please try again.'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
});

export default SignupScreen;
