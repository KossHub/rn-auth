import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { bootstrap } from './src/bootstrap';
import { store } from './src/store';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsAppReady(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
