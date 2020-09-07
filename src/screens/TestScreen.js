import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Block, Text } from '../components';
import { theme } from '../constants';
import { Typography } from '../components/Typography';
import { Spacing } from '../components/Spacing';
import { Container } from '../components/Container';

export const TestScreen = ({}) => {
  return (
    <Block color={theme.colors.white}>
      <View>
        <Typography variant="header">Header</Typography>
        <Spacing variant="3" />
        <Container>
          <Typography variant="subheader">Subheader</Typography>
          <Spacing />
          <Typography>
            Lorem ea tempor ea ut sit irure tempor exercitation sit veniam
            laboris est dolor reprehenderit.
          </Typography>
        </Container>
        <Spacing variant="2" />
        <Typography>
          Lorem ea tempor ea ut sit irure tempor exercitation sit veniam laboris
          est dolor reprehenderit.
        </Typography>
      </View>
    </Block>
  );
};
const styles = StyleSheet.create({});
