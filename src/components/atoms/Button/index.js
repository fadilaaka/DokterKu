import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import OnlyIcon from './OnlyIcon';
import BtnIconSend from './BtnIconSend';

export default function Button({type, title, onPress, icon, disable}) {
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable} onPress={onPress} />;
  }
  if (type === 'icon-only') {
    return <OnlyIcon icon={icon} onPress={onPress} />;
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 5,
    borderRadius: 15,
  }),
  disableBg: {
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: colors.button.disable.background,
  },
  disableText: {
    fontSize: 23,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    color: colors.button.disable.text,
  },
  text: type => ({
    fontSize: 23,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    color:
      type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
  }),
});
