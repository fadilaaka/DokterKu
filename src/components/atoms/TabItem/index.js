import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  IconDokter,
  IconDokterActive,
  IconHospital,
  IconHospitalActive,
  IconMessage,
  IconMessageActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function TabItem({title, active, onPress, onLongPress}) {
  const Icon = () => {
    if (title === 'Dokter') {
      return active ? <IconDokterActive /> : <IconDokter />;
    }
    if (title === 'Messages') {
      return active ? <IconMessageActive /> : <IconMessage />;
    }
    if (title === 'Hospital') {
      return active ? <IconHospitalActive /> : <IconHospital />;
    }
    return <IconDokter />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  text: active => ({
    color: active
      ? colors.IconNavigation.primary
      : colors.IconNavigation.secondary,
    fontFamily: fonts.primary[600],
    fontSize: 12,
    marginTop: 2,
  }),
});
