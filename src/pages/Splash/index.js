import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {auth} from '../../firebase.config';
import {onAuthStateChanged} from 'firebase/auth';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          //lagi login
          console.log('user : ', user);
          navigation.replace('MainApp');
        } else {
          //user logout
          navigation.replace('GetStarted');
        }
      });
      navigation.replace('GetStarted');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>DokterKu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: fonts.primary[700],
  },
});
