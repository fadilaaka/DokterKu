import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {List} from '../../components';
import {colors, fonts} from '../../utils';
import {DummyDokter4, DummyDokter5, DummyDokter6} from '../../assets';

export default function Messages({navigation}) {
  const [doctors] = useState([
    {
      id: 1,
      profile: DummyDokter4,
      name: 'Dr. Mark',
      description: 'Baik Bu, terima kasih banyak atas wak...',
    },
    {
      id: 2,
      profile: DummyDokter6,
      name: 'Isabella Mardo',
      description: 'Apa ada keluhan lainnya untuk dikonsult...',
    },
    {
      id: 3,
      profile: DummyDokter5,
      name: 'Chris Wilson',
      description: 'Adanya pengaruh dari makanan yang sudah dikonsu...',
    },
  ]);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(dokter => {
          return (
            <List
              key={dokter.id}
              profile={dokter.profile}
              name={dokter.name}
              description={dokter.description}
              onPress={() => navigation.navigate('Chat')}
            />
          );
        })}
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
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 20,
  },
});
