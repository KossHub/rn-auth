import React, { useState, useEffect } from 'react';
import { Block, Text, Input, Button } from '../components';
import { theme } from '../constants';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/auth/actions';

export const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    return clearForm();
  }, []);

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };
  const handleSignUp = () => {
    Keyboard.dismiss();
    const e = [];
    if (!email) {
      e.push('email');
    }
    if (!password) {
      e.push('password');
    }
    if (
      !confirmPassword ||
      (email && password && confirmPassword && password !== confirmPassword)
    ) {
      e.push('confirm_password');
    }
    setErrors(e);
    if (!e.length) {
      dispatch(signUp(email, password));
    } else if (
      email &&
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      setConfirmPassword('');
      Alert.alert(
        'Password confirmation does not match password.',
        null,
        [{ text: 'Ok' }],
        { cancelable: false }
      );
    } else {
      Alert.alert('All fields must be filled', null, [{ text: 'Ok' }], {
        cancelable: false
      });
    }
  };
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);
  return (
    <KeyboardAvoidingView
      pointerEvents={loading ? 'none' : 'auto'}
      style={styles.forgot}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Block color={theme.colors.white} padding={[0, theme.sizes.padding]}>
          <Text h1 bold>
            Signup
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
            <Input
              secure
              label="Confirm password"
              error={hasErrors('confirm_password')}
              style={[styles.input, hasErrors('confirm_password')]}
              defaultValue={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Button gradient onPress={handleSignUp} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  backToLoginBtn: {
    textDecorationLine: 'underline'
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
