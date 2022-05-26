import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

export default function ListRumahSakit({title, address, picture}) {
  return (
    <View style={styles.container}>
      <Image source={picture} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSecondary,
  },
  image: {
    width: 100,
    height: 75,
    borderRadius: 10,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: 200,
  },
  address: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    marginTop: 6,
  },
});
