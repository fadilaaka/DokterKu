import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {onValue, ref, get} from 'firebase/database';
import {database} from '../../firebase.config';

export default function Messages({navigation}) {
  const [user, setUser] = useState([]);
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataChattingFromLocal();

    const dbRef = ref(database, `messages/${user.uid}/`);
    onValue(dbRef, async snapshot => {
      console.log('data history chat : ', snapshot.val());
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async item => {
          const urlUidDoctor = `doctors/${oldData[item].uidPartner}`;
          const detailDoctor = await get(ref(database, urlUidDoctor));
          console.log('detail dokter : ', detailDoctor.val());
          data.push({
            id: item,
            detailDoctor: detailDoctor.val(),
            ...oldData[item],
          });
        });
        await Promise.all(promises);
        console.log('new data history: ', data);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  const getDataChattingFromLocal = () => {
    getData('user').then(result => {
      setUser(result);
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            ...chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.data.photo}}
              name={chat.detailDoctor.data.fullName}
              description={chat.lastContentChat}
              onPress={() => navigation.navigate('Chat', dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 20,
  },
});
