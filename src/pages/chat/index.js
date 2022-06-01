import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from '../../utils';
import {database} from '../../firebase.config';
import {ref, push, onValue, set} from 'firebase/database';

export default function Chat({navigation, route}) {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);
  const today = new Date();

  useEffect(() => {
    getDataChattingFromLocal();
    const dbRef = ref(
      database,
      `chatting/${user.uid}_${dataDoctor.data.uid}/allchat/`,
    );
    onValue(dbRef, snapshot => {
      console.log('data chat : ', snapshot.val());
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        Object.keys(dataSnapshot).map(item => {
          const dataChat = dataSnapshot[item];
          const newDataChat = [];
          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat],
            });
          });

          allDataChat.push({
            id: item,
            data: newDataChat,
          });
        });
        console.log('All data chat: ', allDataChat);
        setChatData(allDataChat);
      }
    });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataChattingFromLocal = () => {
    getData('user').then(result => {
      setUser(result);
    });
  };

  const chatSend = () => {
    console.log('user : ', user);

    //kirim ke firebase
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    console.log('Chat send : ', data);

    const dbRef = ref(
      database,
      `chatting/${user.uid}_${dataDoctor.data.uid}/allchat/${setDateChat(
        today,
      )}`,
    );
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const dbRefMessageUser = ref(database, `messages/${user.uid}/${chatID}`);
    const dbRefMessageDoctor = ref(
      database,
      `messages/${dataDoctor.data.uid}/${chatID}`,
    );
    const dataHistoryChatUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };
    push(dbRef, data)
      .then(result => {
        setChatContent('');
        //History Chat for User
        set(dbRefMessageUser, dataHistoryChatUser);
        //History Chat for Doctor
        set(dbRefMessageDoctor, dataHistoryChatDoctor);
      })
      .catch(error => {
        showError(error.message);
        console.log(error.message);
      });
  };
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
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
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
