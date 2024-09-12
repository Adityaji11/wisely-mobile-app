// import React from 'react';
// import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const ProfileDetail = ({ route }) => {
//   const { profile } = route.params;
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Image source={{ uri: profile.image }} style={styles.profileImage} />
//         <Text style={styles.name}>{profile.name}</Text>
//         <Text style={styles.status}>
//           {profile.online ? 'Online' : 'Last seen 20 minutes ago'}
//         </Text>
//         <View style={styles.statsContainer}>
//           <Text style={styles.stats}>Age: {profile.age}</Text>
//           <Text style={styles.stats}>Weight: {profile.weight}</Text>
//           <Text style={styles.stats}>Single: {profile.single ? 'Yes' : 'No'}</Text>
//         </View>
//         <Text style={styles.sectionTitle}>Expectations</Text>
//         <Text style={styles.expectations}>{profile.expectations}</Text>
//         <Text style={styles.sectionTitle}>Meet at</Text>
//         <Text style={styles.meetAt}>{profile.meetAt}</Text>
//         <Text style={styles.sectionTitle}>Socials</Text>
//         <Text style={styles.socials}>Instagram: {profile.instagram}</Text>
//         <Text style={styles.socials}>Facebook: {profile.facebook}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: Dimensions.get('window').width - 32,
//     height: Dimensions.get('window').width - 32,
//     borderRadius: 8,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   status: {
//     fontSize: 16,
//     color: 'gray',
//     marginBottom: 16,
//   },
//   statsContainer: {
//     marginBottom: 16,
//   },
//   stats: {
//     fontSize: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   expectations: {
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   meetAt: {
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   socials: {
//     fontSize: 16,
//     marginVertical: 4,
//   },
// });

// export default ProfileDetail;
import React, { useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileDetail = ({ route }) => {
  const { profile } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSend = () => {
    // Implement send message functionality
    console.log('Sending message:', message);
    setMessage('');
    Keyboard.dismiss();
  };

  const handleInputFocus = () => {
    // You can add additional logic here when the input is focused
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: profile.image }} style={styles.profileImage} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.status}>
          {profile.online ? 'Online' : 'Last seen 20 minutes ago'}
        </Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Age: {profile.age}</Text>
          <Text style={styles.stats}>Weight: {profile.weight}</Text>
          <Text style={styles.stats}>Single: {profile.single ? 'Yes' : 'No'}</Text>
        </View>
        <Text style={styles.sectionTitle}>Expectations</Text>
        <Text style={styles.expectations}>{profile.expectations}</Text>
        <Text style={styles.sectionTitle}>Meet at</Text>
        <Text style={styles.meetAt}>{profile.meetAt}</Text>
        <Text style={styles.sectionTitle}>Socials</Text>
        <Text style={styles.socials}>Instagram: {profile.instagram}</Text>
        <Text style={styles.socials}>Facebook: {profile.facebook}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Say something..."
            value={message}
            onChangeText={setMessage}
            onFocus={handleInputFocus}
          />
          {message.length > 0 && (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Add extra padding at the bottom for the footer
  },
  profileImage: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  status: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  stats: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  expectations: {
    fontSize: 16,
    marginVertical: 8,
  },
  meetAt: {
    fontSize: 16,
    marginVertical: 8,
  },
  socials: {
    fontSize: 16,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionButton: {
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sendButton: {
    padding: 5,
  },
});

export default ProfileDetail;