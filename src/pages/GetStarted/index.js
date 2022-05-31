import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ILGetStarted, ILLogo} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../utils';

export default function GetStarted({navigation}) {
  const stateGlobal = useSelector(state => state);
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View style={styles.center}>
        <ILLogo style={styles.logo} />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih efisien
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={21} />
        <Button
          type="secondary"
          title="Sign In"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 52,
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  logo: {
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    fontSize: 28,
    lineHeight: 37,
    height: 110,
    width: 240,
    color: colors.text.secondary,
    marginTop: 40,
    textAlign: 'center',
    fontFamily: fonts.primary[700],
  },
  center: {
    alignItems: 'center',
  },
});
