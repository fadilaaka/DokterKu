import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, storeData} from '../../utils';
import useForm from '../../utils/useForm';
import {showMessage} from 'react-native-flash-message';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, database} from '../../firebase.config';
import {ref, set} from 'firebase/database';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);

    setLoading(true);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };
        set(ref(database, 'users/' + success.user.uid + '/'), {data}).then(
          console.log('Data stored to realtime database'),
        );
        storeData('user', data);
        navigation.navigate('UploadFoto', data);
        console.log('Register Success : ', success);
      })
      .catch(error => {
        const errorMessage = error.code;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.errorMessage,
          color: colors.white,
        });
        console.log('error : ', error);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label="Nama Lengkap"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
