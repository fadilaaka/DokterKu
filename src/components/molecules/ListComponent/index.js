import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {
  IconEditProfile,
  IconHelp,
  IconLanguage,
  IconRate,
  IconNext,
} from '../../../assets';

export default function List({
  profile,
  name,
  description,
  type,
  onPress,
  icon,
}) {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'help') {
      return <IconHelp />;
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {type === 'next' && <IconNext />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flex: 1, marginLeft: 16},
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.text.tertiary,
    textTransform: 'capitalize',
  },
});
