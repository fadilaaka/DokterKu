import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

export default function InputChat() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis pesan untuk Jean Parker"
      />
      <Button type={'btn-icon'} disable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, flexDirection: 'row'},
  input: {
    backgroundColor: colors.input,
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginRight: 12,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 60,
  },
});
