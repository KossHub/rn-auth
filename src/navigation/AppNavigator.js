import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SecureNavigator } from './SecureNavigator';
import { AuthNavigator } from './AuthNavigator';
import { navigationRef, isMountedRef } from './RootNavigation';

export const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {!isLoggedIn ? <AuthNavigator /> : <SecureNavigator />}
    </NavigationContainer>
  );
};
