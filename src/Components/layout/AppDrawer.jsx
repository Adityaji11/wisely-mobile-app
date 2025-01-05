import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import ProfileDetail from '../ProfileGrid/ProfileDetail/ProfileDetail';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation }) => (
  <View style={styles.drawerContainer}>
    <View style={styles.profileSection}>
      <Image
        style={styles.profilePic}
        source={{ uri: 'https://example.com/your-profile-pic.jpg' }}
      />
      <Text style={styles.userName}>Your Name</Text>
    </View>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('ProfileDetail')}
    >
      <Text style={styles.drawerText}>My Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => console.log('Navigate to Settings')}
    >
      <Text style={styles.drawerText}>Settings</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => console.log('Logout')}
    >
      <Text style={styles.drawerText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const AppDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerPosition: 'right', // Position drawer on the right
      headerShown: false,
    }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="MainTabs" component={MainTabs} />
  </Drawer.Navigator>
);

export default AppDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerText: {
    fontSize: 16,
    color: '#333',
  },
});
