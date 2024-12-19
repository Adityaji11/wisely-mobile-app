import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileDetail from './src/Components/ProfileGrid/ProfileDetail/ProfileDetail';
import MyAlbum from './src/Components/MyAlbum/MyAlbum';
import { useDispatch, useSelector } from 'react-redux';
import { refreshSession, updateUserLocation, verifySession } from './src/Redux/Slices/authSlice';
import { requestLocationPermission } from './src/utils/helper';
import MainTabs from './src/Components/layout/MainTabs';
import AuthStack from './src/Components/layout/AuthStack';
import EditProfile from './src/Components/ProfileDrawer/EditProfile/CreateEditProfile';
import CreateEditProfile from './src/Components/ProfileDrawer/EditProfile/CreateEditProfile';


const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  useEffect(() => {
    const checkSession = async () => {
      const result = await dispatch(verifySession());
      if (verifySession.rejected.match(result)) {
        // If session is invalid, try refreshing the token
        const refreshResult = await dispatch(refreshSession());
        if (refreshSession.fulfilled.match(refreshResult)) {
          // Retry session verification after successful token refresh
          await dispatch(verifySession());
        }
      }
    };

    checkSession();
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthenticated ) {
  //     const handleLocationUpdate = async () => {
  //       const permissionGranted = await requestLocationPermission();

  //       if (permissionGranted) {
  //         Geolocation.getCurrentPosition(
  //           (position) => {
  //             const coordinates = {
  //               latitude: position.coords.latitude,
  //               longitude: position.coords.longitude,
  //             };

  //             // Dispatch action to update location
  //             dispatch(updateUserLocation({ coordinates }))
  //               .unwrap()
  //               .then(() => {
  //                 Alert.alert('Success', 'Location updated successfully.');
  //               })
  //               .catch((error) => {
  //                 Alert.alert('Error', error);
  //               });
  //           },
  //           (error) => {
  //             console.error(error);
  //             Alert.alert('Error', 'Failed to get location.');
  //           },
  //           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //         );
  //       } else {
  //         Alert.alert('Permission Denied', 'Location access is required to provide a better experience.');
  //       }
  //     };

  //     handleLocationUpdate();
  //   }
  // }, [isAuthenticated, dispatch]);

  if (status === 'loading') {
    return <></>; // Show a loading screen while verifying
  }
  return (
    <NavigationContainer>
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{ headerShown: true, title: 'Profile' }}
          />
          <Stack.Screen
            name="MyAlbum"
            component={MyAlbum}
            options={{ headerShown: true, title: 'My Album' }}
          />
          <Stack.Screen
            name="CreateEditProfile"
            component={CreateEditProfile}
            options={{ headerShown: false, title: 'Edit Profile' }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;