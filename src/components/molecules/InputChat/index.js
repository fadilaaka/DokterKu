import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

export default function InputChat({value, onChangeText, onButtonPress}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis pesan untuk Jean Parker"
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        disable={value.length < 1}
        type={'btn-icon-send'}
        onPress={onButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, flexDirection: 'row', backgroundColor: colors.white},
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
