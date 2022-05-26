import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {colors, fonts, storeData} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import {ref, update} from 'firebase/database';
import {database} from '../../firebase.config';

export default function UploadFoto({navigation, route}) {
  const {fullName, profession, uid} = route.params;
  const [photoToDB, setPhotoToDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

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
          showMessage({
            message: 'Tidak memilih foto',
            type: 'default',
            backgroundColor: colors.errorMessage,
            color: colors.white,
          });
        } else {
          console.log('respons getImage: ', response);
          const source = {uri: response.assets[0].uri};

          setPhotoToDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const uploadAndContinue = () => {
    update(ref(database, `users/${uid}/data`), {photo: photoToDB}).then(
      console.log('Data Photo stored to realtime database'),
    );
    const data = route.params;
    data.photo = photoToDB;

    storeData('user', data);

    navigation.replace('MainApp');
  };
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Upload Foto" />
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarContainer} onPress={getImage}>
            <Image style={styles.avatar} source={photo} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingTop: 40,
    paddingBottom: 70,
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addPhoto: {
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
  name: {
    fontFamily: fonts.primary.normal,
    fontSize: 28,
    textAlign: 'center',
    color: colors.text.primary,
  },
  profession: {
    fontFamily: fonts.primary.normal,
    fontSize: 18,
    textAlign: 'center',
    color: colors.text.primary,
  },
});
