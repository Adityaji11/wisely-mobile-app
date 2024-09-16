// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   Image,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import icon library
// import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
// import MapWebView from '../MapWebView/MapWebView';

// const CustomHeader = () => {
//   const [viewCount, setViewCount] = useState(0);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [mapVisible, setMapVisible] = useState(false);

//   // Toggle drawer visibility
//   const toggleDrawer = () => {
//     setDrawerVisible(!drawerVisible);
//   };

//   // Toggle map visibility
//   const toggleMap = () => {
//     setMapVisible(!mapVisible);
//   };

//   // Handle location selection from the map
//   const handleLocationSelect = location => {
//     console.log('Selected location:', location);
//     // Here you can save the location or send it to your backend
//   };

//   return (
//     <View>
//       {/* Header Container */}
//       <View style={styles.headerContainer}>
//         {/* Profile Picture */}
//         <TouchableOpacity onPress={toggleDrawer}>
//           <Image
//             source={{
//               uri: 'https://i.pinimg.com/236x/c6/26/54/c62654f63b7788305a2a5309a4b848b1.jpg',
//             }}
//             style={styles.profilePic}
//           />
//         </TouchableOpacity>

//         {/* Explore Button */}
//         <TouchableOpacity onPress={toggleMap}>
//           <Text style={styles.exploreText}>Explore</Text>
//         </TouchableOpacity>

//         {/* Eye Icon with View Count */}
//         <View style={styles.viewCountContainer}>
//           <Icon name="eye-outline" size={24} color="#000" />
//           <Text style={styles.viewCountText}>{viewCount}</Text>
//         </View>
//       </View>

//       {/* Profile Drawer */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={drawerVisible}
//         onRequestClose={toggleDrawer}>
//         <View style={styles.drawerOverlay}>
//           <View style={styles.drawerWrapper}>
//             <ProfileDrawer onClose={toggleDrawer} />
//           </View>
//         </View>
//       </Modal>

//       {/* Map WebView */}
//       <MapWebView
//         visible={mapVisible}
//         onClose={toggleMap}
//         onLocationSelect={handleLocationSelect}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   profilePic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   exploreText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#007BFF',
//   },
//   viewCountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   viewCountText: {
//     marginLeft: 5,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   drawerOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   drawerWrapper: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
// });

// export default CustomHeader;
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import MapWebView from '../MapWebView/MapWebView';

const CustomHeader = () => {
  const [viewCount, setViewCount] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };

  const handleLocationSelect = location => {
    console.log('Selected location:', location);
    // Here you can save the location or send it to your backend
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/236x/c6/26/54/c62654f63b7788305a2a5309a4b848b1.jpg',
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMap}>
          <Text style={styles.exploreText}>Explore</Text>
        </TouchableOpacity>

        <View style={styles.viewCountContainer}>
          <Icon name="eye-outline" size={24} color="#000" />
          <Text style={styles.viewCountText}>{viewCount}</Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={toggleDrawer}>
        <View style={styles.drawerOverlay}>
          <View style={styles.drawerWrapper}>
            <ProfileDrawer onClose={toggleDrawer} />
          </View>
        </View>
      </Modal>

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