import React from 'react';
import { View, Image, Text, StyleSheet, FlatList, Dimensions ,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../CustomHeader/CustomHeader';
import FilterBar from '../FilterBar/FilterBar';

const profiles = [
  { id: '1', name: 'Anjali', image: 'https://photosbook.in/wp-content/uploads/real-girl-pic62.jpg', online: true },
  { id: '2', name: 'Rahul', image: 'https://i.pinimg.com/736x/a5/95/53/a59553b51e05985c0cafba435488aec2.jpg', online: false },
  { id: '3', name: 'Akash', image: 'https://i.pinimg.com/originals/34/85/94/3485941c0634be887eca300b89bf48b1.jpg', online: true },
  { id: '4', name: 'Somya', image: 'https://photosnow.org/wp-content/uploads/2024/04/cute-girl-pic_11.jpg', online: false },
  { id: '5', name: 'Akansha', image: 'https://photosqn.com/wp-content/uploads/2024/04/hijab-girl-hide-face-pic-dp_13.webp', online: true },
  { id: '6', name: 'Aman', image: 'https://i.pinimg.com/236x/c6/26/54/c62654f63b7788305a2a5309a4b848b1.jpg', online: false },
];

const ProfileGrid = () => {
  const navigation = useNavigation();
  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns - 16;

  const handleFilterPress = (filter) => {
    console.log('Filter selected:', filter);
    // Add filtering logic here
  };
  const handleProfilePress = (profile) => {
    navigation.navigate('ProfileDetail', { profile });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProfilePress(item)}>
    <View style={styles.profileCard}>
      <Image source={{ uri: item.image }} style={[styles.profileImage, { width: size, height: size }]} />
      <View style={styles.profileInfo}>
        {item.online && <View style={styles.onlineDot} />}
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Add the custom header here */}
      <CustomHeader />

      {/* Add the filter bar here */}
      <FilterBar onFilterPress={handleFilterPress} />

      {/* Profile Grid */}
      <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  profileCard: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 4,
  },
  profileImage: {
    borderRadius: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileGrid;
