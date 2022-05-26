import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, List} from '../../components';
import {DummyDokter2} from '../../assets';
import {colors} from '../../utils';

export default function PilihDokter({navigation}) {
  return (
    <View style={styles.page}>
      <Header
        type={'dark'}
        title={'Pilih Dokter Hewan'}
        onPress={() => navigation.goBack()}
      />
      <List
        profile={DummyDokter2}
        name="Jean Parker"
        description={'Pria'}
        type="next"
        onPress={() => navigation.navigate('Chat')}
      />
      <List
        profile={DummyDokter2}
        name="Jean Parker"
        description={'Pria'}
        type="next"
      />
      <List
        profile={DummyDokter2}
        name="Jean Parker"
        description={'Pria'}
        type="next"
      />
      <List
        profile={DummyDokter2}
        name="Jean Parker"
        description={'Pria'}
        type="next"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
  },
});
