import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Modal,
  View
} from 'react-native';
import { Block, Text, Button } from '../components';
import { theme } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
export const WelcomeScreen = ({
  navigation,
  illustrations = [
    { id: 1, source: require('../assets/images/illustration_1.png') },
    { id: 2, source: require('../assets/images/illustration_2.png') },
    { id: 3, source: require('../assets/images/illustration_3.png') }
  ]
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const stepPosition = useRef(Animated.divide(scrollX, width)).current;
  // const scrollX = new Animated.Value(0);                // ??
  // const stepPosition = Animated.divide(scrollX, width); // ??

  const [isTermsShown, setIsTermsShown] = useState(false);

  const renderedIllustrations = () => (
    <FlatList
      horizontal
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment="center"
      data={illustrations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Image
          source={item.source}
          resizeMode="contain"
          style={styles.scrollingImg}
        />
      )}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { x: scrollX } }
        }
      ])}
    />
  );
  const renderedSteps = () => (
    <Block row middle style={styles.stepsContainer}>
      {illustrations.map((item, index) => {
        const opacity = stepPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp'
        });
        return (
          <Block
            animated
            flex={false}
            key={`step-${index}`}
            color="gray"
            style={[styles.step, { opacity }]}
          />
        );
      })}
    </Block>
  );
  const renderTerms = () => (
    <Modal animationType="slide" visible={isTermsShown}>
      <Block
        padding={[theme.sizes.padding * 2, theme.sizes.padding]}
        space="between"
      >
        <Text h2 light>
          Terms of Service
        </Text>
        <ScrollView style={{ marginVertical: theme.sizes.padding / 2 }}>
          <Text caption gray height={18}>
            Lorem ipsum dolor sit amet, magna varius bibendum tristique
            elementum, ac quisque, egestas orci pellentesque, nunc ante
            dignissim in mauris tincidunt. Id tristique vivamus sem. Iaculis sem
            vivamus pede lectus a nunc, enim curabitur facilisis nulla bibendum
            ut fusce.
          </Text>
          <Text caption gray height={18}>
            Lorem ipsum dolor sit amet, magna varius bibendum tristique
            elementum, ac quisque, egestas orci pellentesque, nunc ante
            dignissim in mauris tincidunt. Id tristique vivamus sem. Iaculis sem
            vivamus pede lectus a nunc, enim curabitur facilisis nulla bibendum
            ut fusce.
          </Text>
          <Text caption gray height={18}>
            Lorem ipsum dolor sit amet, magna varius bibendum tristique
            elementum, ac quisque, egestas orci pellentesque, nunc ante
            dignissim in mauris tincidunt. Id tristique vivamus sem. Iaculis sem
            vivamus pede lectus a nunc, enim curabitur facilisis nulla bibendum
            ut fusce. Lorem ipsum dolor sit amet, magna varius bibendum
            tristique elementum, ac quisque, egestas orci pellentesque, nunc
            ante dignissim in mauris tincidunt. Id tristique vivamus sem.
          </Text>
          <Text caption gray height={18}>
            Lorem ipsum dolor sit amet, magna varius bibendum tristique
            elementum, ac quisque, egestas orci pellentesque, nunc ante
            dignissim in mauris tincidunt. Id tristique vivamus sem. Iaculis sem
            vivamus pede lectus a nunc, enim curabitur facilisis nulla bibendum
            ut fusce. Lorem ipsum dolor sit amet, magna varius bibendum
            tristique elementum, ac quisque, egestas orci pellentesque, nunc
            ante dignissim in mauris tincidunt. Id tristique vivamus sem.
            Iaculis sem vivamus pede lectus a nunc, enim curabitur facilisis
            nulla bibendum ut fusce.
          </Text>
          <Text caption gray height={18}>
            Lorem ipsum dolor sit amet, magna varius bibendum tristique
            elementum, ac quisque, egestas orci pellentesque, nunc ante
            dignissim in mauris tincidunt. Id tristique vivamus sem. Iaculis sem
            vivamus pede lectus a nunc, enim curabitur facilisis nulla bibendum
            ut fusce.
          </Text>
        </ScrollView>
        <Button gradient onPress={() => setIsTermsShown(false)}>
          <Text center white>
            I understand
          </Text>
        </Button>
      </Block>
    </Modal>
  );

  return (
    <Block color={theme.colors.white}>
      {renderTerms()}
      <Block center middle flex={0.4}>
        <Text h1 center bold>
          Your Home.
          <Text h1 primary>
            Greener.
          </Text>
        </Text>
        <Text h3 gray style={styles.h3}>
          Enjoy the experience.
        </Text>
      </Block>
      <Block>
        {renderedIllustrations()}
        {renderedSteps()}
      </Block>
      <Block middle flex={0.6} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient onPress={() => navigation.navigate('Login')}>
          <Text center semibold white>
            Login
          </Text>
        </Button>
        <Button shadow onPress={() => navigation.navigate('Signup')}>
          <Text center semibold>
            Signup
          </Text>
        </Button>
        <Button
          color={false}
          onPress={() => setIsTermsShown(true)}
          style={{ marginTop: 0 }}
        >
          <Text center caption gray>
            Terms of service
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  h3: {
    marginTop: theme.sizes.padding / 2
  },
  scrollingImg: {
    width,
    height: height / 2,
    overflow: 'visible'
  },
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 2,
    right: 0,
    left: 0
  },
  step: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});
