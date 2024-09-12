import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileDrawer = ({ onClose }) => {
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
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>My Album</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

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
});

export default ProfileDrawer;
