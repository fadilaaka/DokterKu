import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function Profile({name, description, photo, isRemove, onPress}) {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.profile}>
          <Image source={photo} style={styles.avatar} />
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.profile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
  },
  profession: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    textAlign: 'center',
  },
  removePhoto: {
    position: 'absolute',
    right: 1,
    bottom: 1,
  },
});
