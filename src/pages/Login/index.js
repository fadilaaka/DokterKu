import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts, showError, showSuccess, storeData} from '../../utils';
import useForm from '../../utils/useForm';
import {ScrollView} from 'react-native-gesture-handler';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, database} from '../../firebase.config';
import {ref, get, child} from 'firebase/database';
import {useDispatch} from 'react-redux';

export default function Login({navigation}) {
  const [form, setForm] = useForm({email: '', password: ''});
  const dispatch = useDispatch();

  const login = () => {
    console.log('form : ', form);
    dispatch({type: 'SET_LOADING', value: true});
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        dispatch({type: 'SET_LOADING', value: false});
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
        dispatch({type: 'SET_LOADING', value: false});
        showError(error.code);
        console.log('error : ', JSON.stringify(error));
      });
  };

  return (
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
