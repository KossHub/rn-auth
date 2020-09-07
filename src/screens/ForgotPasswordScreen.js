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
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../store/auth/actions';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    return clearForm();
  }, []);

  const clearForm = () => {
    setEmail('');
    setErrors([]);
  };
  const handleForgot = () => {
    Keyboard.dismiss();
    const e = [];
    if (!email) {
      e.push('email');
    }
    setErrors(e);
    if (!e.length) {
      dispatch(resetPassword(email));
    } else {
      Alert.alert('All fields must be filled', null, [{ text: 'Ok' }], {
        cancelable: false
      });
    }
  };
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);
  return (
    <KeyboardAvoidingView
      style={styles.forgot}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Block color={theme.colors.white} padding={[0, theme.sizes.padding]}>
          <Text h1 bold>
            Forgot
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={email}
              onChangeText={setEmail}
            />
            <Button gradient onPress={handleForgot} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Forgot
                </Text>
              )}
            </Button>
            <Button onPress={() => navigation.goBack()}>
              <Text gray center caption style={styles.backToLoginBtn}>
                Back to Login
              </Text>
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
