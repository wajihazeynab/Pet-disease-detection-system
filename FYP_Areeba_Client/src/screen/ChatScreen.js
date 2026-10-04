// Chat.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiPost } from '../api';
import { useSelector } from 'react-redux';
import { IP_ADDRESS, socket } from '../constants';
import moment from 'moment';

const ChatScreen = ({ navigation, route }) => {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const [receiver, setReceiver] = useState(route.params.receiver)
  const [chatId, setChatId] = useState(route.params.id)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessages] = useState([])

  // const { image, name, address, workingHours } = route.params.data
  // console.log(userModal)
// console.log(IP_ADDRESS)
  useEffect(() => {
    if (chatId != null) {
      socket.emit("allMessage", chatId)
      socket.on("foundMessage", (list) => console.log(list))
    }

  }, [chatId])


  useEffect(() => {
    socket.on("foundMessage", (list) => setMessages(list))
  
  }, [socket])

  const sendMessage = async (id = chatId) => {
    setLoading(true)
    const DATA = {
      channelId: id,
      sender: userModal.type,
      message: text
    }
    await socket.emit("sendMessage", DATA)
    // socket.on('foundId', (data) => {
    //   setChatId(data._id)
    //   setMessages(data._id)
    // })
    setText('')
    setLoading(false)
  }

  const createChannel = async () => {
    setLoading(true)
    const DATA = {
      userId: userModal._id,
      vetId: receiver._id,
    }
    // const res = await apiPost('/chat/create_channel', DATA, userModal.accessToken)
    socket.emit("createChannel", DATA)
    setText('')
    setLoading(false)
    socket.on("foundId", (data) => {
      console.log('foudn', data)
      setChatId(data._id)
      sendMessage(data._id)
    })
    // if (res.check) {
    //   console.log(res.data._id)
    //   setChatId(res.data._id)
    //   sendMessage(res.data._id)
    // }
    // else {
    //   setLoading(false)
    // }
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity style={{ ...styles.backbutton, }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={{ ...styles.headerstatus, marginLeft: 10 }}>
          <Text style={styles.headerTitle}>{receiver?.name}</Text>
          <Text style={styles.status}>Online now</Text>
        </View>

        {/* <TouchableOpacity style={styles.callButton}>
          <Icon name="call" size={24} color="#000" />
        </TouchableOpacity> */}

      </View>

      {/* Chat Bubbles */}
      <ScrollView style={styles.chatContainer}>
        {/* Replace these Text Views with your actual chat message components */}

        <FlatList
          data={message}
          scrollEnabled={false}
          contentContainerStyle={{paddingBottom:30}}
          renderItem={({ item }) => (
            <View >
              <View style={userModal?.type == item.sender ? styles.replyBubble : styles.messageBubble}>
                <Text>{item.message}</Text>
              </View>
              <Text style={userModal?.type == item.sender ? styles.ReplyTime : styles.MsgTime}>{moment(item.createdAt).format('hh:mm A')}</Text>
            </View>
          )}
        />

        {/* <View style={styles.replyBubble}>
          <Text>No, fluffy is not feeling well</Text>
        </View>
        <Text style={styles.ReplyTime}>8:30 PM</Text>
        <View style={styles.messageBubble}>
          <Text style={styles.MsgTime}>Should I come?</Text>
        </View>
        <Text style={styles.MsgTime}>8:30 PM</Text>
        <View style={styles.replyBubble}>
          <Text>Yes, please...</Text>
        </View>
        <Text style={styles.ReplyTime}>8:30 PM</Text> */}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          onChangeText={e => setText(e)}
          value={text}
        />
        <TouchableOpacity
          disabled={text == '' || loading}
          style={styles.sendButton}
          onPress={() => {
            chatId ? sendMessage() : createChannel()
          }}
        >
          {loading ?
            <ActivityIndicator size={20} />
            :
            <Icon name="send" size={24} color="#000" />
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 70,
    backgroundColor: '#fff',

  },
  backbutton: {

    marginHorizontal: 10,
    // backgroundColor:'white',
    backgroundColor: 'skin'

  },
  headerstatus: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'skin'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,

  },
  status: {
    fontSize: 12,
    color: 'darkgrey',
    fontWeight: 'bold'
  },
  callButton: {
    justifyContent: 'flex-end',
    marginRight: 10,

    backgroundColor: 'skin'
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
  },
  messageBubble: {
    padding: 10,
    backgroundColor: '#e5e5ea',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  replyBubble: {
    padding: 10,
    backgroundColor: '#87cefa',
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
    color: '#fff',
  },
  MsgTime: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 12
  },
  ReplyTime: {
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e5e5ea',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    // Add styles for send button if necessary
  },
  // ... other styles
});

export default ChatScreen;
