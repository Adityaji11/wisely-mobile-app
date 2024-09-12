import React from 'react'
import { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,DrawerLayoutAndroid } from 'react-native';
import FilterDrawerFavourites from '../FilterDrawer/FilterDrawerFavorites';

const { width } = Dimensions.get('window');

const FavScreen = () => {
  const drawerRef = useRef(null);
  const handleFilterButtonPress = () => {
    drawerRef.current.openDrawer(); // Open the drawer programmatically
  };
  const handleCloseDrawer = () => {
    drawerRef.current.closeDrawer(); // Close the drawer programmatically
  };
  const drawerContent = <FilterDrawerFavourites onClose={handleCloseDrawer} />;
  return (
    <View style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={width * 0.75}
        drawerPosition="right"
        renderNavigationView={() => drawerContent}
      >
        <View style={styles.mainContent}>
          {/* Header with filter button */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Favorites</Text>
            <TouchableOpacity style={styles.filterButton} onPress={handleFilterButtonPress}>
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </DrawerLayoutAndroid>
    </View>
  )
}

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
  }
});

export default FavScreen