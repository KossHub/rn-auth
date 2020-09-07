import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text, Button, Card, Badge } from '../components';
import { theme, mocks } from '../constants';

export const BrowseScreen = ({
  navigation,
  profile = mocks.profile,
  propsCategories = mocks.categories
}) => {
  const tabs = ['Products', 'Inspirations', 'Shop'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(propsCategories);
  }, []);

  const handleTab = (tab) => {
    const filtered = propsCategories.filter((category) => {
      return category.tags.includes(tab.toLowerCase());
    });
    setActiveTab(tab);
    setCategories(filtered);
  };

  const renderTabs = () => {
    return tabs.map((tab) => {
      const isActive = tab === activeTab;
      return (
        <TouchableOpacity
          key={`tab-${tab}`}
          onPress={() => handleTab(tab)}
          style={[styles.tab, isActive ? styles.activeTab : null]}
        >
          <Text size={16} medium gray={!isActive} secondary={isActive}>
            {tab}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  const renderCategories = () => {
    return categories.map((category) => (
      <TouchableOpacity
        key={category.name}
        onPress={() => {
          navigation.navigate('Explore', { category });
        }}
      >
        <Card center middle shadow style={styles.category}>
          <Badge margin={[0, 0, 15]} size={50} color="rgba(41, 216, 143, .2)">
            <Image source={category.image} />
          </Badge>
          <Text medium height={20}>
            {category.name}
          </Text>
          <Text gray caption>
            {category.count} products
          </Text>
        </Card>
      </TouchableOpacity>
    ));
  };
  return (
    <Block color={theme.colors.white}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Browse
        </Text>
        <Button onPress={() => navigation.navigate('Settings')}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <Block flex={false} row style={styles.tabs}>
        {renderTabs()}
      </Block>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.paddingVertical}
      >
        <Block flex={false} row space="between" style={styles.categories}>
          {renderCategories()}
        </Block>
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
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 3,
    paddingBottom: theme.sizes.base
  },
  activeTab: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  paddingVertical: {
    paddingVertical: theme.sizes.base * 2
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    width: 150,
    height: 150
  }
});
