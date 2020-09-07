import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { Block, Text, Button, Divider, Switch } from '../components';
import Slider from 'react-native-slider';
import { theme, mocks } from '../constants';
import { profile } from '../constants/mocks';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/auth/actions';

export const SettingsScreen = ({
  navigation,
  propsProfile = mocks.profile
}) => {
  const [budget, setBudget] = useState(850);
  const [monthlyCap, setMonthlyCap] = useState(1700);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [editing, setEditing] = useState(null);
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setProfile(propsProfile);
  }, []);

  const handleEdit = (name, text) => {
    setProfile({
      ...profile,
      [name]: text
    });
  };
  const toggleEdit = (name) => setEditing(!editing ? name : null);
  const renderEdit = (name) => {
    if (name === editing) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={(text) => handleEdit(name, text)}
        />
      );
    }
    return <Text bold>{profile[name]}</Text>;
  };
  return (
    <Block color={theme.colors.white}>
      {/* Header */}
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Settings
        </Text>
        <Button onPress={() => navigation.navigate('Settings')}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Inputs */}
        <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Username
              </Text>
              {renderEdit('username')}
            </Block>
            <Text medium secondary onPress={() => toggleEdit('username')}>
              {editing === 'username' ? 'Save' : 'Edit'}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Location
              </Text>
              {renderEdit('location')}
            </Block>
            <Text medium secondary onPress={() => toggleEdit('location')}>
              {editing === 'location' ? 'Save' : 'Edit'}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                E-mail
              </Text>
              <Text bold>{profile.email}</Text>
            </Block>
          </Block>
        </Block>
        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
        {/* Sliders */}
        <Block style={styles.sliders}>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Budget
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.1)"
              value={budget}
              onValueChange={setBudget}
              style={styles.slider}
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
            />
            <Text caption gray right>
              $1,000
            </Text>
          </Block>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Monthly Cap
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.1)"
              value={monthlyCap}
              onValueChange={setMonthlyCap}
              style={styles.slider}
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
            />
            <Text caption gray right>
              $5,000
            </Text>
          </Block>
        </Block>
        <Divider />
        {/* Toggles */}
        <Block style={styles.toggles}>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Text gray2>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </Block>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Text gray2>Newsletter</Text>
            <Switch value={newsletter} onValueChange={setNewsletter} />
          </Block>
        </Block>
        {/* Logout button */}
        <Button onPress={() => dispatch(logOut())} style={styles.logoutBtn}>
          <Text gray center caption style={{ color: theme.colors.accent }}>
            Log Out
          </Text>
        </Button>
      </ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: 'flex-end'
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  slider: {
    height: 19
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  track: {
    height: 6,
    borderRadius: 6
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 1
  },
  logoutBtn: {
    marginBottom: theme.sizes.base * 2
  }
});
