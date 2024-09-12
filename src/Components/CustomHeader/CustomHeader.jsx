import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon library
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';

const CustomHeader = () => {
  const [viewCount, setViewCount] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  // Simulate real-time view count changes (optional: replace with actual API call)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setViewCount((prevCount) => prevCount + Math.floor(Math.random() * 5));
//     }, 3000); // Update every 3 seconds

//     return () => clearInterval(interval); // Cleanup
//   }, []);

  return (
    <View>
    {/* Header Container */}
    <View style={styles.headerContainer}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/236x/c6/26/54/c62654f63b7788305a2a5309a4b848b1.jpg' }} 
          style={styles.profilePic}
        />
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Explore"
        placeholderTextColor="#888"
      />

      {/* Eye Icon with View Count */}
      <View style={styles.viewCountContainer}>
        <Icon name="eye-outline" size={24} color="#000" />
        <Text style={styles.viewCountText}>{viewCount}</Text>
      </View>
    </View>

    {/* Profile Drawer */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={drawerVisible}
      onRequestClose={toggleDrawer}
    >
      <View style={styles.drawerOverlay}>
        <View style={styles.drawerWrapper}>
          <ProfileDrawer onClose={toggleDrawer} />
        </View>
      </View>
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 15,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      marginHorizontal: 10,
      backgroundColor: '#f1f1f1',
      borderRadius: 20,
      paddingLeft: 15,
      fontSize: 16,
    },
    viewCountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewCountText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: '600',
    },
    drawerOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawerWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

export default CustomHeader;
