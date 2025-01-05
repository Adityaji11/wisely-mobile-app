import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, saveProfile, setProfileField } from '../../../Redux/Slices/profileSlice';
import { Menu, Button } from 'react-native-paper'; // Import Menu for dropdown functionality
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackActions, useNavigation } from '@react-navigation/native';


const CreateEditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);

  // State for Menu dropdown visibility
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  const [interestedInMenuVisible, setInterestedInMenuVisible] = useState(false);

  const [selectedGender, setSelectedGender] = useState(profile.gender || '');
  const [selectedInterestedIn, setSelectedInterestedIn] = useState(profile.interestedIn || []);

  const genderOptions = ['Male', 'Female', 'Other'];
  const interestedInOptions = ['Technology', 'Sports', 'Music', 'Movies']; // Example interests

  // Fetch profile data when the component loads
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (!profile.bio || !profile.age || !profile.gender || profile.interestedIn.length === 0) {
        Alert.alert('Validation Error', 'All fields are required.');
        return;
      }
      dispatch(saveProfile(profile))
        .unwrap()
        .then(() => {
          Alert.alert('Success', 'Profile saved successfully!');
          setIsEditing(false);
        })
        .catch((error) => {
          Alert.alert('Error', error || 'Failed to save profile.');
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    dispatch(setProfileField({ field: 'gender', value: gender }));
    setGenderMenuVisible(false);
  };

  const handleInterestedInSelect = (interest) => {
    setSelectedInterestedIn((prevSelected) => {
      const newSelection = prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest];
      dispatch(
        setProfileField({
          field: 'interestedIn',
          value: newSelection,
        })
      );
      return newSelection;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
              <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.pop(1))}
          style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      <Text style={styles.title}>{isEditing ? 'Edit Profile' : 'Profile'}</Text>

      <Image
        source={{ uri: profile.profileImage || 'https://via.placeholder.com/100' }}
        style={styles.profileImage}
      />

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={profile.bio}
        editable={isEditing}
        onChangeText={(value) => dispatch(setProfileField({ field: 'bio', value }))}
      />

      {/* Age */}
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={profile.age ? String(profile.age) : ''}
        keyboardType="number-pad"
        editable={isEditing}
        onChangeText={(value) => dispatch(setProfileField({ field: 'age', value: parseInt(value, 10) }))}
      />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      {isEditing ? (
        <Menu
          visible={genderMenuVisible}
          onDismiss={() => setGenderMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setGenderMenuVisible(true)}>
              {selectedGender || 'Select Gender'}
            </Button>
          }>
          {genderOptions.map((gender, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleGenderSelect(gender)}
              title={gender}
            />
          ))}
        </Menu>
      ) : (
        <Text>{profile.gender || 'Not selected'}</Text> // Directly show the value when not editing
      )}

      {/* Interested In */}
      <Text style={styles.label}>Interested In</Text>
      {isEditing ? (
        <Menu
          visible={interestedInMenuVisible}
          onDismiss={() => setInterestedInMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setInterestedInMenuVisible(true)}>
              {selectedInterestedIn.length > 0 ? selectedInterestedIn.join(', ') : 'Select Interests'}
            </Button>
          }>
          {interestedInOptions.map((interest, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleInterestedInSelect(interest)}
              title={interest}
            />
          ))}
        </Menu>
      ) : (
        <Text>{profile.interestedIn.length > 0 ? profile.interestedIn.join(', ') : 'Not selected'}</Text> // Directly show the value when not editing
      )}

      {/* Instagram URL */}
      <Text style={styles.label}>Instagram URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Instagram URL"
        value={profile.socialLinks.instagram}
        editable={isEditing}
        onChangeText={(value) =>
          dispatch(
            setProfileField({
              field: 'socialLinks',
              value: { ...profile.socialLinks, instagram: value },
            })
          )
        }
      />

      {/* Facebook URL */}
      <Text style={styles.label}>Facebook URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Facebook URL"
        value={profile.socialLinks.facebook}
        editable={isEditing}
        onChangeText={(value) =>
          dispatch(
            setProfileField({
              field: 'socialLinks',
              value: { ...profile.socialLinks, facebook: value },
            })
          )
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
        <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateEditProfile;