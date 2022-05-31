import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ArtikelBerita,
  DokterRating,
  Gap,
  HomeProfile,
  KategoriDokter,
} from '../../components';
import {colors, fonts, showError} from '../../utils';
import {
  ref,
  get,
  child,
  query,
  orderByChild,
  limitToLast,
} from 'firebase/database';
import {database} from '../../firebase.config';

export default function Dokter({navigation}) {
  const [dokterKategori, setDokterKategori] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
  }, []);

  const getTopRatedDoctors = user => {
    // const topRated = query(
    //   ref(database, 'doctors/'),
    //   limitToLast(3),
    //   orderByChild('rate'),
    // );
    // onValue(
    //   topRated,
    //   snapshot => {
    //     snapshot.forEach(childData => {
    //       console.log('Data Top Rated: ', childData.val());
    //     });
    //   },
    //   {
    //     onlyOnce: true,
    //   },
    // );
    const dbRef = query(
      ref(database, 'doctors'),
      orderByChild('data/rate'),
      limitToLast(3),
    );
    get(dbRef)
      .then(value => {
        const oldData = value.val();
        const data = [];
        console.log(oldData);
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key].data,
          });
        });
        console.log('Data Top Rated : ', data);
        setDoctors(data);
      })
      .catch(error => {
        showError(error.message);
        console.log(error);
      });
  };

  const getCategoryDoctor = () => {
    const dbRef = ref(database);
    get(child(dbRef, 'dokter_kategori/'), 'value')
      .then(resultDB => {
        console.log('Data kategori : ', resultDB.val());
        if (resultDB.val()) {
          const data = resultDB.val();
          const filterData = data.filter(el => el !== null);

          console.log('Data Kategori hasil filter : ', filterData);
          setDokterKategori(filterData);
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const getNews = () => {
    const dbRef = ref(database);
    get(child(dbRef, 'news/'), 'value')
      .then(resultDB => {
        console.log('Data news : ', resultDB.val());
        if (resultDB.val()) {
          const data = resultDB.val();
          const filterData = data.filter(el => el !== null);

          console.log('Data News hasil filter : ', filterData);
          setNews(filterData);
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

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
                {dokterKategori.map(item => {
                  return (
                    <KategoriDokter
                      key={item.id}
                      category={item.kategori}
                      onPress={() => navigation.navigate('PilihDokter', item)}
                    />
                  );
                })}
                <Gap width={26} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Dokter Top Rating</Text>
            {doctors.map(doctor => {
              return (
                <DokterRating
                  key={doctor.id}
                  avatar={{uri: doctor.data.photo}}
                  name={doctor.data.fullName}
                  description={doctor.data.category}
                  onPress={() => navigation.navigate('ProfileDokter', doctor)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Artikel Terbaru</Text>
          </View>
          {news.map(item => {
            return (
              <ArtikelBerita
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
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
