import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ProfileDetail = ({route}) => {
  const {profile} = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [showHeader, setShowHeader] = useState(false);
  const inputRef = useRef(null);

  const handleSend = () => {
    console.log('Sending message:', message);
    setMessage('');
    Keyboard.dismiss();
  };

  const handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const imageHeight = Dimensions.get('window').height * 0.75;
    setShowHeader(yOffset > imageHeight - 50); // Show header when scrolled past the image
  };

  return (
    <View style={styles.container}>
      {/* Header Overlay */}
      <Animated.View
        style={[
          styles.header,
          {backgroundColor: showHeader ? 'rgba(0, 0, 0, 0.9)' : 'transparent'},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.pop(1))}
          style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerName}>{showHeader ? profile.name : ''}</Text>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="block" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, {marginLeft: 16}]}>
            <MaterialIcons name="favorite" size={28} color="red" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}>
        {/* Fullscreen Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={{uri: profile.image}} style={styles.profileImage} />
        </View>

        {/* User Info */}
          <Text style={styles.sectionTitle}>
            {profile.name} <FontAwesome5 name="user" size={16} color="gray" />
          </Text>
        <View style={styles.userInfo}>
          <View style={styles.statusRow}>
            <View style={styles.onlineStatus}>
              <View
                style={[
                  styles.statusDot,
                  {backgroundColor: profile.online ? 'green' : 'gray'},
                ]}
              />
              <Text style={styles.statusText}>
                {profile.online ? 'Online' : `Online ${profile.lastSeen}`}
              </Text>
            </View>
            <Text style={styles.distance}>{profile.distance} km away</Text>
          </View>
        </View>

        {/* About Me Section */}
        <Text style={styles.sectionTitle}>ABOUT ME</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{profile.aboutMe}This will display stats (height/weight, fit/gender) in a single line and include appropriate icons for "Looking For" and "Meet At". Let me know if you need further tweaks!</Text>
        </View>

        {/* Stats Section */}
        <Text style={styles.sectionTitle}>STATS</Text>
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <View style={styles.statRow}>
              <FontAwesome5 name="ruler-vertical" size={16} color="gray" />
              <Text style={styles.infoText}>Height : {profile.height} feet</Text>
            </View>
            <View style={styles.statRow}>
              <FontAwesome5 name="weight" size={16} color="gray" />
              <Text style={styles.infoText}>Weight : {profile.weight} Kg</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.statRow}>
              <FontAwesome5 name="running" size={16} color="gray" />
              <Text style={styles.infoText}>Fit : {profile.fit}</Text>
            </View>
            <View style={styles.statRow}>
              <FontAwesome5 name="venus-mars" size={16} color="gray" />
              <Text style={styles.infoText}>Gender : {profile.gender}</Text>
            </View>
          </View>
        </View>

        {/* Expectations Section */}
        <Text style={styles.sectionTitle}>EXPECTATIONS</Text>
        <View style={styles.infoBox}>
          <View style={styles.statRow}>
            <MaterialIcons name="search" size={16} color="gray" />
            <Text style={styles.infoText}>Looking For: {profile.looking}</Text>
          </View>
          <View style={styles.statRow}>
            <MaterialIcons name="location-on" size={16} color="gray" />
            <Text style={styles.infoText}>Meet At: {profile.meet}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="whatshot" size={28} color="red" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Say something..."
            value={message}
            onChangeText={setMessage}
          />
          {message.length > 0 && (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <MaterialIcons name="send" size={28} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="inbox" size={28} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 50,
  },
  headerName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 80, // Extra padding for footer
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.76,
  },
  topRightIcons: {
    flexDirection: 'row',
  },
  userInfo: {
    paddingTop: 2.5,
    padding: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 16,
    color: 'gray',
  },
  distance: {
    fontSize: 16,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
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
  footerButton: {
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
