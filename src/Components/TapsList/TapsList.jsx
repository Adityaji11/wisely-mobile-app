// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons'; // For the heart emoji (make sure to install expo-vector-icons if you're using Expo)

// // Sample data for taps
// const tapsData = [
//   { id: '1', name: 'Sam', time: '5 minutes ago', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
//   { id: '2', name: 'Taylor', time: '1 hr ago', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
//   { id: '3', name: 'Jordan', time: 'Yesterday', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
//   // Add more sample data
// ];

// const TapsList = () => {
//   const renderTapItem = ({ item }) => (
//     <View style={styles.tapItem}>
//       <Image source={{ uri: item.avatar }} style={styles.avatar} />
//       <View style={styles.tapDetails}>
//         <Text style={styles.tapName}>{item.name}</Text>
//         <Text style={styles.tapTime}>{item.time}</Text>
//       </View>
//       <FontAwesome name="heart" size={24} color="red" style={styles.heartIcon} />
//     </View>
//   );

//   return (
//     <FlatList
//       data={tapsData}
//       renderItem={renderTapItem}
//       keyExtractor={(item) => item.id}
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   tapItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   tapDetails: {
//     flex: 1,
//   },
//   tapName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   tapTime: {
//     color: '#888',
//     fontSize: 14,
//     marginTop: 4,
//   },
//   heartIcon: {
//     marginLeft: 10,
//   },
//   listContainer: {
//     paddingBottom: 10,
//   },
// });

// export default TapsList;
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
// import { Icon } from '@rneui/themed'; // Import Icon from @rneui/themed

// Sample data for taps
const tapsData = [
  { id: '1', name: 'Sam', time: '5 minutes ago', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Taylor', time: '1 hr ago', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '3', name: 'Jordan', time: 'Yesterday', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  // Add more sample data
];

const TapsList = () => {
  const renderTapItem = ({ item }) => (
    <View style={styles.tapItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.tapDetails}>
        <Text style={styles.tapName}>{item.name}</Text>
        <Text style={styles.tapTime}>{item.time}</Text>
      </View>
      {/* <Icon name="heart" type="font-awesome" size={24} color="red" style={styles.heartIcon} />  Use Icon from @rneui/themed */}
    </View>
  );

  return (
    <FlatList
      data={tapsData}
      renderItem={renderTapItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  tapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  tapDetails: {
    flex: 1,
  },
  tapName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tapTime: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  heartIcon: {
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default TapsList;
