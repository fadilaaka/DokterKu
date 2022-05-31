import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, showError, storeData} from '../../utils';
import {ref, update} from 'firebase/database';
import {auth, database} from '../../firebase.config';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {onAuthStateChanged, updatePassword} from 'firebase/auth';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoToDB, setPhotoToDB] = useState('');

  useEffect(() => {
    getData('user').then(respons => {
      const data = respons;
      data.photo = {uri: respons.photo};
      setProfile(data);
    });
  }, []);

  const updateSaveProfile = () => {
    console.log('profile : ', profile);
    console.log('new password : ', password);

    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karakter');
      } else {
        // Update Password
        updatePasswordChange();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoToDB;
    update(ref(database, `doctors/${profile.uid}/data`), data)
      .then(() => {
        console.log('updated : ', data);
        storeData('user', data);
      })
      .catch(error => {
        showError(error.code);
      });
  };

  const updatePasswordChange = () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        updatePassword(user, password)
          .then(success => {
            console.log('Password Updated : ', success);
          })
          .catch(error => {
            showError(error.code);
          });
      }
    });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.75,
        maxWidth: 150,
        maxHeight: 150,
      },
      response => {
        console.log('response : ', response);
        if (response.didCancel || response.error) {
          showError('Tidak memilih foto');
        } else {
          console.log('respons getImage: ', response);
          const source = {uri: response.assets[0].uri};

          setPhotoToDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title={'Edit Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Input
            label="Nama Lengkap"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={20} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={20} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={20} />
          <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={28} />
          <Button title={'Save Profile'} onPress={updateSaveProfile} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {padding: 20, paddingTop: 0},
});
