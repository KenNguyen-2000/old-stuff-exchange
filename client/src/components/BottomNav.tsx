import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ChatScreen, HomeScreen, OrderScreen, ProfileScreen } from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton, useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

const BottomNav = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName='login'
      activeColor={theme.colors.primary}
      barStyle={styles.bar__wrapper}
      shifting={true}

      // compact={false}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Order'
        component={OrderScreen}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? 'clipboard-multiple'
                  : 'clipboard-text-multiple-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'chat' : 'chat-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bar__wrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 5,
    height: 70,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tab__bar: {},
});
