import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Image, } from 'react-native';
import TapsList from '../TapsList/TapsList'; // Adjust import path if necessary
import { DrawerActions, useNavigation } from '@react-navigation/native';

const chats = [
  { id: '1', name: 'Alex', message: 'Hey, how are you?', unread: true, online: true, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Chris', message: 'Wanna hang out?', unread: false, online: false, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Chats');
  // console.log('Current Navigation State:', navigation.getState());
  // console.log('Parent:', navigation.getParent());
  

  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <View style={styles.nameRow}>
          <Text style={styles.chatName}>{item.name}</Text>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: item.online ? 'green' : 'red' },
            ]}
          />
        </View>
        <Text
          style={[
            styles.chatMessage,
            item.unread && styles.unreadMessage, // Highlight unread messages
          ]}
        >
          {item.message}
        </Text>
      </View>
    </View>
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
        <View style={styles.mainContent}>
          {/* Header with filter button */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Inbox</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() =>
    navigation.dispatch(DrawerActions.openDrawer())
  }>
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Chats' && styles.activeTab]}
              onPress={() => handleTabChange('Chats')}
            >
              <Text style={styles.tabText}>Chats</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Tabs' && styles.activeTab]}
              onPress={() => handleTabChange('Tabs')}
            >
              <Text style={styles.tabText}>Taps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Album' && styles.activeTab]}
              onPress={() => handleTabChange('Album')}
            >
              <Text style={styles.tabText}>Album</Text>
            </TouchableOpacity>
          </View>

          {/* Content based on active tab */}
          {activeTab === 'Chats' && (
            <FlatList
              data={chats}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
          {activeTab === 'Album' && (
            <View style={styles.contentContainer}>
              <Text>Album Content</Text>
            </View>
          )}
          {activeTab === 'Tabs' && (
            <TapsList />
          )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2.5,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // Pure white background
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Black color
  },
  filterButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  activeTab: {
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  chatMessage: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  unreadMessage: {
    color: '#000', // Bold color for unread messages
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;