import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

export default function Chat({navigation}) {
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title="Jean Parker"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Selasa, 10 Mei 2022</Text>
        <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe />
      </View>

      <InputChat />
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
