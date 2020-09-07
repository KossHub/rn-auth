import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const isMountedRef = createRef();
export const navigationRef = createRef();
export const navigate = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};
export const replace = (...args) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(...args));
  }
};
// add other functions that you need and export them
