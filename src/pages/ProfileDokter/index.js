import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function ProfileDokter({navigation}) {
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title={'Profile Dokter'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile name={'Dr. Mark'} description="Dokter Hewan" />
        <Gap heigth={12} />
        <ProfileItem label="Alumnus" value="Universitas Padjajaran, 2018" />
        <ProfileItem label="Tempat Praktik" value="Rumah Sakit Umum, Bandung" />
        <ProfileItem label="No. STR" value="0000123412341234" />
        <View style={styles.action}>
          <Button
            title={'Mulai Konsultasi'}
            onPress={() => navigation.navigate('Chat')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {paddingHorizontal: 50, paddingVertical: 30},
});
