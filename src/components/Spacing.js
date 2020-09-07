import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Spacing = ({ variant = '1', style, ...props }) => {
  return <View style={[styles[variant], style]} />;
};
const styles = StyleSheet.create({
  1: {
    marginVertical: 5
  },
  2: {
    marginVertical: 10
  },
  3: {
    marginVertical: 15
  }
});
