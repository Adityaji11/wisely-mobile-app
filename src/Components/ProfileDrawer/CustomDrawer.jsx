// CustomDrawer.js
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const CustomDrawer = forwardRef(({ children, drawerContent }, ref) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(-DRAWER_WIDTH, Math.min(0, gestureState.dx));
        translateX.setValue(newX);
        backdropOpacity.setValue((DRAWER_WIDTH + newX) / DRAWER_WIDTH * 0.5);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > DRAWER_WIDTH / 3) {
          openDrawer();
        } else {
          closeDrawer();
        }
      },
    })
  ).current;

  const openDrawer = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(backdropOpacity, {
        toValue: 0.5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: -DRAWER_WIDTH,
        useNativeDriver: true,
      }),
      Animated.spring(backdropOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useImperativeHandle(ref, () => ({
    openDrawer,
    closeDrawer,
  }));

  return (
    <View style={styles.container}>
      {children}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
            pointerEvents: translateX._value === -DRAWER_WIDTH ? 'none' : 'auto',
          },
        ]}>
        <TouchableOpacity
          style={styles.backdropTouchable}
          onPress={closeDrawer}
          activeOpacity={1}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}>
        {drawerContent}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  backdropTouchable: {
    flex: 1,
  },
});

export default CustomDrawer;