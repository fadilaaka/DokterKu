import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {DummyDokter2} from '../../../assets';

export default function IsOther() {
  return (
    <View style={styles.container}>
      <Image source={DummyDokter2} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>
            Boleh ibu silahkan, ada yang bisa saya bantu?
          </Text>
        </View>
        <Text style={styles.date}>5.21 PM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 12,
  },
  chatContent: {
    padding: 12,
    backgroundColor: colors.cardGreenIsOther,
    maxWidth: '80%',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 10,
    fontFamily: fonts.primary.normal,
    color: colors.text.tertiary2,
    marginTop: 8,
  },
});
