import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ILIconDokterUmum,
  ILIconDokterHewan,
  ILIconDokterAnak,
  ILIconDokterPsikiater,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function KategoriDokter({category, onPress}) {
  const Icon = () => {
    if (category === 'dokter umum') {
      return <ILIconDokterUmum />;
    }
    if (category === 'dokter hewan') {
      return <ILIconDokterHewan />;
    }
    if (category === 'dokter anak') {
      return <ILIconDokterAnak />;
    }
    if (category === 'psikiater') {
      return <ILIconDokterPsikiater />;
    }
    return <ILIconDokterUmum />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.illustration}>
        <Icon />
      </View>
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.kategori}>{category}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 15,
    width: 110,
    height: 130,
  },
  illustration: {
    backgroundColor: colors.IconNavigation.primary,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginBottom: 40,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  kategori: {
    fontSize: 12,
    fontFamily: fonts.primary[800],
    color: colors.text.primary,
  },
});
