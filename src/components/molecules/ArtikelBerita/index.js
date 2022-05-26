import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DummyArtikel1} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function ArtikelBerita() {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>How to make a orange juice at home</Text>
        <Text style={styles.date}>Today</Text>
      </View>
      <Image source={DummyArtikel1} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSecondary,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%',
  },
  titleWrapper: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.text.tertiary,
  },
  image: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },
});
