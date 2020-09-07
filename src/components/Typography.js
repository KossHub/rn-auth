import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const Typography = ({ children, variant = 'body', style, ...props }) => {
  return (
    <Text style={[styles[variant], styles.common, style]}>{children}</Text>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 16
  },
  subheader: {
    fontSize: 22,
    textTransform: 'uppercase'
  },
  common: {
    fontFamily: 'Roboto'
  }
});
