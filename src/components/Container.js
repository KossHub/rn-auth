import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Container = ({ children, fullHeight, style, ...props }) => {
  const finalStyles = [styles.container, style];
  if (fullHeight) {
    finalStyles.push(styles.fullHeight);
  }
  return <View style={finalStyles}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  fullHeight: {
    flex: 1
  }
});
