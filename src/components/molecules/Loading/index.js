import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

export default function Loading() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingScreen,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: fonts.primary[600],
  },
});
