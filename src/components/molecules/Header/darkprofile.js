import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';
import {DummyDokter2} from '../../../assets';

export default function DarkProfile({onPress}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>Jean Parker</Text>
        <Text style={styles.desc}>Dokter Hewan</Text>
      </View>

      <Image source={DummyDokter2} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {flex: 1},
  avatar: {height: 75, width: 75, borderRadius: 75 / 2},
  name: {
    fontSize: 26,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 20,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 6,
    textAlign: 'center',
  },
});
