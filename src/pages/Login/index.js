import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Input, Link, Loading} from '../../components';
import {colors, fonts, storeData} from '../../utils';
import useForm from '../../utils/useForm';
import {ScrollView} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, database} from '../../firebase.config';
import {ref, get, child} from 'firebase/database';

export default function Login({navigation}) {
  const [form, setForm] = useForm({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const login = () => {
    console.log('form : ', form);
    setLoading(true);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        setLoading(false);
        const dbRef = ref(database);
        get(child(dbRef, `users/${res.user.uid}/`), 'value').then(resultDB => {
          console.log('data user: ', resultDB.val().data);
          if (resultDB.val().data) {
            storeData('user', resultDB.val().data);
            navigation.replace('MainApp');
          }
        });
        console.log('success : ', res);
      })
      .catch(error => {
        setLoading(false);
        const errorMessage = error.code;
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.errorMessage,
          color: colors.white,
        });
        console.log('error : ', JSON.stringify(error));
      });
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Masuk dan mulai konsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={28} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link title="Lupa Password" size={14} />
          <Gap height={42} />
          <Button title="Sign In" onPress={login} />
          <Gap height={18} />
          <Link
            title="Create New Account"
            size={18}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 52,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    maxWidth: 242,
    marginBottom: 40,
  },
});
