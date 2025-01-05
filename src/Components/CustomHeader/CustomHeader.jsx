import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapWebView from '../MapWebView/MapWebView';

const CustomHeader = ({navigation}) => {
  const [viewCount, setViewCount] = useState(4);
  const [mapVisible, setMapVisible] = useState(false);

  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };

  const handleLocationSelect = location => {
    console.log('Selected location:', location);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        {/* Open Drawer */}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/236x/c6/26/54/c62654f63b7788305a2a5309a4b848b1.jpg',
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        {/* Explore Button */}
        <TouchableOpacity onPress={toggleMap}>
          <Text style={styles.exploreText}>Explore</Text>
        </TouchableOpacity>

        {/* View Count */}
        <View style={styles.viewCountContainer}>
          <Icon name="eye-outline" size={24} color="#000" />
          <Text style={styles.viewCountText}>{viewCount}</Text>
        </View>
      </View>
      
      {/* MapWebView */}
      <MapWebView
        visible={mapVisible}
        onClose={toggleMap}
        onLocationSelect={handleLocationSelect}
      />
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
  exploreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
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
