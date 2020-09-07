import React from 'react';
import { Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { ExploreScreen } from '../screens/ExploreScreen';
import { BrowseScreen } from '../screens/BrowseScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { theme } from '../constants';
import { Button } from '../components';
import * as RootNavigation from './RootNavigation';
import { TestScreen } from '../screens/TestScreen';

const AppStack = createStackNavigator();
const { width, height } = Dimensions.get('window');

export const SecureNavigator = () => {
  const defaultNavigationOptions = {
    headerStyle: {
      height: theme.sizes.base * 4,
      shadowRadius: 0,
      shadowOffset: { height: 0 },
      elevation: 0
    },
    headerBackImage: () => (
      <Image source={require('../assets/icons/back.png')} />
    ),
    title: null,
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 1.2,
      paddingRight: theme.sizes.base
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base
    }
  };
  const productNavigationOptions = {
    headerRight: () => (
      <Button
        onPress={() => {
          RootNavigation.replace('Test');
        }}
      >
        <Entypo name="dots-three-horizontal" color={theme.colors.gray} />
      </Button>
    )
  };
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Browse"
        component={BrowseScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="Explore"
        component={ExploreScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="Product"
        component={ProductScreen}
        options={{ ...defaultNavigationOptions, ...productNavigationOptions }}
      />
      <AppStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="Test"
        component={TestScreen}
        options={defaultNavigationOptions}
      />
    </AppStack.Navigator>
  );
};
