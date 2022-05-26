import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Gap, Header, List, Profile} from '../../components';
import {colors, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase.config';
import {showMessage} from 'react-native-flash-message';

export default function UserProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(respons => {
      const data = respons;
      data.photo = {uri: respons.photo};
      setProfile(data);
    });
  });

  const pressSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Success Sign Out');
        navigation.replace('GetStarted');
      })
      .catch(error => {
        showMessage({
          message: error.code,
          type: 'default',
          backgroundColor: colors.errorMessage,
          color: colors.white,
        });
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header onPress={() => navigation.goBack()} title={'Profile'} />
        <Gap height={16} />
        {profile.fullName.length > 0 && (
          <Profile
            name={profile.fullName}
            description={profile.profession}
            photo={profile.photo}
          />
        )}
        <Gap height={16} />
        <List
          name="Edit Profile"
          description="Terakhir diperbaharui kemarin"
          type={'next'}
          icon={'edit-profile'}
          onPress={() => navigation.navigate('UpdateProfile')}
        />
        <List
          name="Bahasa"
          description="Terakhir diperbaharui kemarin"
          type={'next'}
          icon={'language'}
        />
        <List
          name="Give Rate"
          description="Terakhir diperbaharui kemarin"
          type={'next'}
          icon={'rate'}
        />
        <List
          name="Help Center"
          description="Terakhir diperbaharui kemarin"
          type={'next'}
          icon={'help'}
        />
        <List name="Logout" type={'next'} onPress={pressSignOut} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
