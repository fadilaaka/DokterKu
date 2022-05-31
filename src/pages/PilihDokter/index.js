import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, List} from '../../components';
import {colors, showError} from '../../utils';
import {equalTo, get, orderByChild, query, ref} from 'firebase/database';
import {database} from '../../firebase.config';

export default function PilihDokter({navigation, route}) {
  const itemCategory = route.params;
  const [listDoctors, setListDoctors] = useState([]);

  useEffect(() => {
    ListDokterKategori(itemCategory.kategori);
  }, [itemCategory.kategori]);

  const ListDokterKategori = kategori => {
    const que = query(
      ref(database, 'doctors'),
      orderByChild('data/category'),
      equalTo(kategori),
    );
    get(que)
      .then(value => {
        const oldData = value.val();
        const data = [];
        Object.keys(oldData).map(item => {
          data.push({
            id: item,
            data: oldData[item].data,
          });
        });
        console.log('parse list dokter : ', data);
        setListDoctors(data);
      })
      .catch(error => {
        showError(error.message);
        console.log(error);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type={'dark'}
        title={`Pilih ${itemCategory.kategori}`}
        onPress={() => navigation.goBack()}
      />
      {listDoctors.map(doctor => {
        return (
          <List
            key={doctor.id}
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            description={doctor.data.gender}
            type="next"
            onPress={() => navigation.navigate('ProfileDokter', doctor)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
  },
});
