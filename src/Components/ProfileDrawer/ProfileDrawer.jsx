import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Slices/authSlice';

const ProfileDrawer = ({ onClose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            dispatch(logout())
              .unwrap()
              .then(() => {
                Alert.alert('Success', 'You have been logged out successfully.');
                navigation.navigate('Login'); // Adjust to your login route
              })
              .catch((error) => {
                Alert.alert('Error', error || 'Failed to log out.');
              });
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      {/* Profile Picture */}
      <Image
        source={{ uri: 'https://i.pinimg.com/236x/c6/26/54/c62654f63b7788305a2a5309a4b848b1.jpg' }} 
        style={styles.profilePic}
      />
      <Text style={styles.profileName}>John Doe</Text>

      {/* Options */}
      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('MyAlbum')} // Ensure 'MyAlbum' is a defined route
      >
        <Text style={styles.drawerItemText}>My Album</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('CreateEditProfile')}>
        <Text style={styles.drawerItemText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'red',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#d33',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileDrawer;
