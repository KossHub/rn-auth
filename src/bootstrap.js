import { Asset } from 'expo-asset';
import * as firebase from 'firebase';

export const bootstrap = async () => {
  const images = [
    require('./assets/icons/back.png'),
    require('./assets/icons/plants.png'),
    require('./assets/icons/seeds.png'),
    require('./assets/icons/flowers.png'),
    require('./assets/icons/sprayers.png'),
    require('./assets/icons/pots.png'),
    require('./assets/icons/fertilizers.png'),
    require('./assets/images/plants_1.png'),
    require('./assets/images/plants_2.png'),
    require('./assets/images/plants_3.png'),
    require('./assets/images/explore_1.png'),
    require('./assets/images/explore_2.png'),
    require('./assets/images/explore_3.png'),
    require('./assets/images/explore_4.png'),
    require('./assets/images/explore_5.png'),
    require('./assets/images/explore_6.png'),
    require('./assets/images/avatar.png')
  ];
  const cacheImages = images.map((image) => {
    Asset.fromModule(image).downloadAsync();
  });
  const firebaseConfig = {
    apiKey: 'AIzaSyD6CloHLOTV6XjQZwEoptmAw2wd5PRohBY',
    authDomain: 'rn-aph.firebaseapp.com',
    databaseURL: 'https://rn-aph.firebaseio.com',
    projectId: 'rn-aph',
    storageBucket: 'rn-aph.appspot.com',
    messagingSenderId: '92692237108',
    appId: '1:92692237108:web:032d80a37dabf07adb3361'
  };
  await firebase.initializeApp(firebaseConfig);
  await Promise.all(cacheImages);
};
