import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

export default function DarkProfile({onPress, title, desc, photo}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Image source={photo} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {flex: 1},
  avatar: {height: 50, width: 50, borderRadius: 50 / 2},
  name: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 6,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
