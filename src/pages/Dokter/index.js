import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {
  ArtikelBerita,
  DokterRating,
  Gap,
  HomeProfile,
  KategoriDokter,
} from '../../components';
import {colors, fonts} from '../../utils';
import {
  DummyDokter2,
  DummyDokter3,
  DummyDokter4,
  JSONKategoriDokter,
} from '../../assets';

export default function Dokter({navigation}) {
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.kategori}>
                <Gap width={36} />
                {JSONKategoriDokter.data.map(item => {
                  return (
                    <KategoriDokter
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('PilihDokter')}
                    />
                  );
                })}
                <Gap width={26} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Dokter Top Rating</Text>
            <DokterRating
              avatar={DummyDokter2}
              name={'Chris Wilson'}
              description={'Dokter Hewan'}
              onPress={() => navigation.navigate('ProfileDokter')}
            />
            <DokterRating
              avatar={DummyDokter4}
              name={'Dr. Mark'}
              description={'Dokter Hewan'}
              onPress={() => navigation.navigate('ProfileDokter')}
            />
            <DokterRating
              avatar={DummyDokter3}
              name={'Alita Hayza'}
              description={'Dokter Hewan'}
              onPress={() => navigation.navigate('ProfileDokter')}
            />
            <Text style={styles.sectionLabel}>Artikel Terbaru</Text>
          </View>

          <ArtikelBerita />
          <ArtikelBerita />
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 25,
    marginBottom: 15,
    maxWidth: 255,
  },
  kategori: {
    flexDirection: 'row',
  },
  wrapperSection: {paddingHorizontal: 18},
  wrapperScroll: {
    marginHorizontal: -18,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
