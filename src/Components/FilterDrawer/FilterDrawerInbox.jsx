import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

const FilterDrawerInbox = ({ onClose }) => {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Message Filters</Text>
      <TouchableOpacity style={styles.drawerOption}>
        <Text style={styles.drawerOptionText}>Unread</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerOption}>
        <Text style={styles.drawerOptionText}>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerOption}>
        <Text style={styles.drawerOptionText}>Online</Text>
      </TouchableOpacity>
      {/* <Button title="Close" onPress={onClose} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerOption: {
    paddingVertical: 10,
  },
  drawerOptionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default FilterDrawerInbox;
