import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  Dummyhospital1,
  Dummyhospital2,
  Dummyhospital3,
  ILBackgroundHospital,
} from '../../assets';
import {colors, fonts} from '../../utils';
import {ListRumahSakit} from '../../components';

export default function Hospital() {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={ILBackgroundHospital}
          style={styles.background}>
          <Text style={styles.title}>Rumah Sakit Tersedia</Text>
          <Text style={styles.description}>3 Tersedia</Text>
        </ImageBackground>
        <View style={styles.content}>
          <ListRumahSakit
            title={'Rumah Sakit Bunga Mawar'}
            address={'Jln. Java No. 9'}
            picture={Dummyhospital1}
          />
          <ListRumahSakit
            title={'Rumah Sakit Elite Family & Kids'}
            address={'Jalan Simpang Lima'}
            picture={Dummyhospital2}
          />
          <ListRumahSakit
            title={'Rumah Sakit Garden Blue Merdeka'}
            address={'Jln. Sejahtera Blok 20B'}
            picture={Dummyhospital3}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 270,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 10,
  },
});
