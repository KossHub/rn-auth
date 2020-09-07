import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Block } from './Block';
import { theme } from '../constants';

export const Divider = ({ color, style, ...props }) => {
  const dividerStyles = [styles.divider, style];
  return (
    <Block
      color={color || theme.colors.gray2}
      style={dividerStyles}
      {...props}
    />
  );
};
const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
