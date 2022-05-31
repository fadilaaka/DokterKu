import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

export default function Chat({navigation, route}) {
  const dataDoctor = route.params;

  console.log('data dokter : ', dataDoctor);
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={{uri: dataDoctor.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Selasa, 10 Mei 2022</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
        </ScrollView>
      </View>

      <InputChat
        value={''}
        onChangeText={() => alert('input tap')}
        onButtonPress={() => alert('button press')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {flex: 1},
  chatDate: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.tertiary2,
    marginVertical: 16,
    textAlign: 'center',
  },
});
