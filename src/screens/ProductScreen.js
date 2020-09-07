import React from 'react';
import { Block, Text, Divider } from '../components';
import { theme, mocks } from '../constants';
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const ProductScreen = ({ product = mocks.products[0] }) => {
  const renderGallery = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, idx) => `gallery-${idx}`}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{
              width,
              height: height / 2.2
            }}
          />
        )}
      />
    );
  };
  return (
    <Block color={theme.colors.white}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderGallery()}
        <Block style={styles.product}>
          <Text h2 bold>
            {product.name}
          </Text>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>
            {product.tags.map((tag, idx) => (
              <Text key={`tag-${idx}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray slight height={22}>
            {product.description}
          </Text>

          <Divider margin={[theme.sizes.padding * 0.9, 0]} />

          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[theme.sizes.padding * 0.9, 0]}>
              {product.images.slice(1, 3).map((img, idx) => (
                <Image
                  key={`images-${idx}`}
                  source={img}
                  style={styles.image}
                />
              ))}
              <Block
                flex={false}
                card
                center
                middle
                color="rgba(197, 204, 214, 0.2)"
                style={styles.more}
              >
                <Text gray>+{product.images.slice(3).length}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base * 2
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625
  },
  image: {
    width: (width - theme.sizes.base * 3) / 3.26,
    height: (width - theme.sizes.base * 3) / 3.26,
    marginRight: theme.sizes.base
  },
  more: {
    width: 55,
    height: 55
  }
});
