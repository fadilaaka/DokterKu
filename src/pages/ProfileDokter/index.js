import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function ProfileDokter({navigation, route}) {
  const dataDoctor = route.params;
  console.log('data profile dokter : ', dataDoctor);
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title={'Profile Dokter'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile
          name={dataDoctor.data.fullName}
          description={dataDoctor.data.category}
          photo={{uri: dataDoctor.data.photo}}
        />
        <Gap heigth={12} />
        <ProfileItem label="Alumnus" value={dataDoctor.data.university} />
        <ProfileItem
          label="Tempat Praktik"
          value={dataDoctor.data.hospital_address}
        />
        <ProfileItem label="No. STR" value={dataDoctor.data.str_number} />
        <View style={styles.action}>
          <Button
            title={'Mulai Konsultasi'}
            onPress={() => navigation.navigate('Chat', dataDoctor)}
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
