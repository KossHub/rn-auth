import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { SHOW_LOADER, HIDE_LOADER, LOG_IN, LOG_OUT } from '../types';
import * as RootNavigation from '../../navigation/RootNavigation';

export const logIn = (email, password) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch({ type: LOG_IN }))
    .catch((error) => {
      Alert.alert('Email or password is incorrect.', null, [{ text: 'Ok' }], {
        cancelable: false
      });
    })
    .finally(() => dispatch({ type: HIDE_LOADER }));
};
export const logOut = () => {
  return { type: LOG_OUT };
};
export const signUp = (email, password) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert(
        'You have successfully registered!',
        null,
        [
          {
            text: 'Ok',
            onPress: () => {
              RootNavigation.replace('Login');
            }
          }
        ],
        { cancelable: false }
      );
    })
    .catch((error) => {
      Alert.alert(`${error}`, null, [{ text: 'Ok' }], { cancelable: false });
    })
    .finally(() => dispatch({ type: HIDE_LOADER }));
};
export const resetPassword = (email) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then((r) => {
      Alert.alert(
        'Password reset link sent!',
        'Check your email.',
        [
          {
            text: 'Ok',
            onPress: () => {
              RootNavigation.replace('Login');
            }
          }
        ],
        { cancelable: false }
      );
    })
    .catch((error) => {
      Alert.alert(null, `${error}`, [{ text: 'Ok' }], {
        cancelable: false
      });
    })
    .finally(() => dispatch({ type: HIDE_LOADER }));
};
