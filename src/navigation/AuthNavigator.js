import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { theme } from '../constants';

const AuthStack = createStackNavigator();
export const AuthNavigator = () => {
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
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={defaultNavigationOptions}
      />
    </AuthStack.Navigator>
  );
};
