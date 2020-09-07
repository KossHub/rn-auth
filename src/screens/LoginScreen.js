import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { Block, Text, Button, Input } from '../components';
import { theme } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../store/auth/actions';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    return clearForm();
  }, []);

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setErrors([]);
  };
  const handleLogIn = () => {
    Keyboard.dismiss();
    const e = [];
    if (!email) {
      e.push('email');
    }
    if (!password) {
      e.push('password');
    }
    setErrors(e);
    if (!e.length) {
      dispatch(logIn(email, password));
    } else {
      Alert.alert('All fields must be filled', null, [{ text: 'Ok' }], {
        cancelable: false
      });
    }
  };
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);
  return (
    <KeyboardAvoidingView
      style={styles.login}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Block color={theme.colors.white} padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={email}
              onChangeText={setEmail}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={password}
              onChangeText={setPassword}
            />
            <Button gradient onPress={handleLogIn} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Log In
                </Text>
              )}
            </Button>
            <Button onPress={() => navigation.navigate('ForgotPassword')}>
              <Text gray center caption style={styles.forgotBtn}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  forgotBtn: {
    textDecorationLine: 'underline'
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
