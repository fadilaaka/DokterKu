import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconSendDark, IconSendLight} from '../../../assets';
import {colors} from '../../../utils';

export default function BtnIconSend({disable, onPress}) {
  if (disable) {
    return (
      <TouchableOpacity style={styles.container(disable)}>
        <IconSendDark />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      <IconSendLight />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: disable => ({
    backgroundColor: disable ? colors.input : colors.tertiary,
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
