import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, Button, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

const MyAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // For iOS, permissions are handled automatically
  };

const requestMediaLibraryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Media Library Permission',
              message: 'App needs access to your media library to select photos.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Media Library Permission',
              message: 'App needs access to your media library to select photos.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // For iOS, permissions are handled automatically
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 1,
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const { assets } = response;
            if (assets && assets.length > 0) {
              setAlbums([...albums, { id: Date.now().toString(), photos: [assets[0].uri] }]);
            }
          }
        }
      );
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
    }
    setModalVisible(false);
  };

  const handleSelectFromLibrary = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (hasPermission) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const { assets } = response;
            if (assets && assets.length > 0) {
              setAlbums([...albums, { id: Date.now().toString(), photos: [assets[0].uri] }]);
            }
          }
        }
      );
    } else {
      Alert.alert('Permission Denied', 'Media library permission is required to select a photo.');
    }
    setModalVisible(false);
  };

  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity
      style={styles.albumItem}
      onPress={() => setSelectedAlbum(item)}
    >
      <Image source={{ uri: item.photos[0] }} style={styles.albumThumbnail} />
      <Text style={styles.albumTitle}>Album {item.id}</Text>
    </TouchableOpacity>
  );

  const renderPhotoItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.photoItem} />
  );

  return (
    <View style={styles.container}>
      {selectedAlbum ? (
        <View style={styles.albumView}>
          <TouchableOpacity onPress={() => setSelectedAlbum(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <FlatList
            data={selectedAlbum.photos}
            renderItem={renderPhotoItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
      ) : (
        <View style={styles.albumsView}>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <FlatList
            data={albums}
            renderItem={renderAlbumItem}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Button title="Take Photo" onPress={handleTakePhoto} />
          <Button title="Choose from Library" onPress={handleSelectFromLibrary} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  albumsView: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    margin: 5,
  },
  addButtonText: {
    fontSize: 40,
    color: '#888',
  },
  albumItem: {
    width: 150,
    height: 150,
    margin: 5,
  },
  albumThumbnail: {
    width: '100%',
    height: '80%',
  },
  albumTitle: {
    textAlign: 'center',
    marginTop: 5,
  },
  albumView: {
    flex: 1,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  photoItem: {
    width: '33%',
    aspectRatio: 1,
    margin: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
});

export default MyAlbum;
