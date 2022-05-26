import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ILNullPhoto} from '../../../assets';
import {fonts} from '../../../utils/fonts';
import {colors, getData} from '../../../utils';

export default function HomeProfile({onPress}) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      // console.log('User Data : ', res);
      const data = res;
      data.photo = {uri: res.photo};
      // console.log('new profile : ', data);
      setProfile(res);
    });
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: 13,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.tertiary,
    textTransform: 'capitalize',
  },
});
