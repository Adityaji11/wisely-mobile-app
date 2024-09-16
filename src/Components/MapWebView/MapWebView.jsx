// import React, { useState, useEffect } from 'react';
// import { View, Modal, StyleSheet, Button, Platform, Alert } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import { WebView } from 'react-native-webview';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const MapWebView = ({ visible, onClose, onLocationSelect }) => {
//   const [initialLocation, setInitialLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });

//   useEffect(() => {
//     if (visible) {
//       checkAndRequestLocationPermission();
//     }
//   }, [visible]);


//   const checkAndRequestLocationPermission = async () => {
//     try {
//       const permission = Platform.OS === 'ios'
//         ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//   
//       const result = await check(permission);
//   
//       switch (result) {
//         case RESULTS.UNAVAILABLE:
//           console.log('Location services are not available on this device.');
//           break;
//         case RESULTS.DENIED:
//           console.log('Location permission denied, requesting permission...');
//           const requestResult = await request(permission);
//           if (requestResult === RESULTS.GRANTED) {
//             getCurrentLocation();
//           } else {
//             console.log('Permission denied');
//             Alert.alert('Permission Denied', 'Please enable location permissions in your settings to use this feature.');
//           }
//           break;
//         case RESULTS.GRANTED:
//           console.log('Location permission granted');
//           getCurrentLocation();
//           break;
//         case RESULTS.BLOCKED:
//           console.log('Location permission is blocked and not requestable anymore.');
//           Alert.alert('Permission Blocked', 'Location permission is blocked. Please enable it in your device settings.');
//           break;
//       }
//     } catch (error) {
//       console.error('Error checking or requesting location permission:', error);
//     }
//   };
//   

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log('Current position:', position);
//         setInitialLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error('Error getting current position:', error);
//         Alert.alert('Location Error', `Unable to get your current location: ${error.message}`);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };
//   

//   const handleMessage = (event) => {
//     const data = JSON.parse(event.nativeEvent.data);
//     if (data.type === 'location') {
//       onLocationSelect(data.location);
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <WebView
//           originWhitelist={['*']}
//           source={{
//             html: `
//             <!DOCTYPE html>
//             <html>
//               <head>
//                 <title>OpenStreetMap</title>
//                 <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
//                 <style>
//                   body { margin: 0; }
//                   #map { width: 100vw; height: 100vh; }
//                 </style>
//                 <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
//                 <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
//               </head>
//               <body>
//                 <div id="map"></div>
//                 <script>
//                   var map = L.map('map').setView([${initialLocation.latitude}, ${initialLocation.longitude}], 13);
//                   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   }).addTo(map);
//                   map.on('click', function(e) {
//                     var latlng = e.latlng;
//                     window.ReactNativeWebView.postMessage(JSON.stringify({
//                       type: 'location',
//                       location: {
//                         latitude: latlng.lat,
//                         longitude: latlng.lng
//                       }
//                     }));
//                   });
//                 </script>
//               </body>
//             </html>
//           ` }}
//           style={styles.webView}
//           onMessage={handleMessage}
//         />
//         <Button title="Close Map" onPress={onClose} />
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   webView: {
//     flex: 1,
//   },
// });

// export default MapWebView;

import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Button, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { WebView } from 'react-native-webview';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const MapWebView = ({ visible, onClose, onLocationSelect }) => {
  const [initialLocation, setInitialLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });

  useEffect(() => {
    if (visible) {
      checkAndRequestLocationPermission();
    }
  }, [visible]);

  const checkAndRequestLocationPermission = async () => {
    try {
      const permission = Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  
      const result = await check(permission);
  
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('Location services are not available on this device.');
          break;
        case RESULTS.DENIED:
          console.log('Location permission denied, requesting permission...');
          const requestResult = await request(permission);
          if (requestResult === RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Permission denied');
            Alert.alert('Permission Denied', 'Please enable location permissions in your settings to use this feature.');
          }
          break;
        case RESULTS.GRANTED:
          console.log('Location permission granted');
          getCurrentLocation();
          break;
        case RESULTS.BLOCKED:
          console.log('Location permission is blocked and not requestable anymore.');
          Alert.alert('Permission Blocked', 'Location permission is blocked. Please enable it in your device settings.');
          break;
      }
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current position:', position);
        setInitialLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
        Alert.alert('Location Error', `Unable to get your current location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'location') {
      onLocationSelect(data.location);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
            <!DOCTYPE html>
            <html>
              <head>
                <title>OpenStreetMap</title>
                <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
                <style>
                  body { margin: 0; }
                  #map { width: 100vw; height: 100vh; }
                </style>
                <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
                <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
              </head>
              <body>
                <div id="map"></div>
                <script>
                  var map = L.map('map').setView([${initialLocation.latitude}, ${initialLocation.longitude}], 13);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  }).addTo(map);
                  map.on('click', function(e) {
                    var latlng = e.latlng;
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'location',
                      location: {
                        latitude: latlng.lat,
                        longitude: latlng.lng
                      }
                    }));
                  });
                </script>
              </body>
            </html>
          `}}
          style={styles.webView}
          onMessage={handleMessage}
        />
        <Button title="Close Map" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  webView: {
    flex: 1,
  },
});

export default MapWebView;