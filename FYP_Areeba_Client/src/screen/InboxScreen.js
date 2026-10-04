// Inbox.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { AVATAR_IMG, SERVER_BASE_URL, socket } from '../constants';
import { useSelector } from 'react-redux';


const InboxScreen = ({ navigation }) => {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const [channel, setSetChannel] = useState([])

  useEffect(() => {
    navigation.addListener('focus', () => {
      socket.emit("findChannel", userModal._id);
      socket.on("foundChannel", (list) => setSetChannel(list))
    })
  }, [])

  console.log("j", channel)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} >Chat</Text>
      {/* <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Icon name="search" size={24} color="#000" />
      </View> */}

      {/* Inbox List */}
      <ScrollView style={styles.inboxList}>
        {/* Replace these Views with your actual inbox item components */}
        <FlatList
          data={channel}
          renderItem={({ item }) => {
            let userData = userModal?.type == 'customer' ? item.vetData[0] : item.userData[0]
            console.log(item.vetData[0], item.userData[0])
            return (
              <TouchableOpacity style={styles.inboxItem}
                onPress={() => navigation.navigate('ChatScreen', { id: item._id, receiver: userModal?.type == 'customer' ? item.vetData[0] : item.userData[0] })}>
                <Image source={userModal?.type == 'customer' ? { uri: `${SERVER_BASE_URL}/images/${item.vetData[0].image}` } : { uri: `${SERVER_BASE_URL}/images/${item.userData[0].image}` }} style={styles.doctorImage} />
                <View style={styles.messagePreview}>
                  <Text style={styles.doctorName}>{userData?.name}</Text>
                  {/* <Text style={styles.lastMessage}>Hey! What's up?</Text> */}
                </View>
                <Text style={styles.messageTime}>6:15pm</Text>
              </TouchableOpacity>
            )
          }}
        />

        {/* <TouchableOpacity style={styles.inboxItem}
          onPress={() => navigation.navigate("Chat")}>
          <Image source={require('../assets/Inbox2.png')} style={styles.doctorImage} />
          <View style={styles.messagePreview}>
            <Text style={styles.doctorName}>Dr. Zahira</Text>
            <Text style={styles.lastMessage}>Hey! What's up?</Text>
          </View>
          <Text style={styles.messageTime}>6:15pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxItem}
          onPress={() => navigation.navigate("Chat")}>
          <Image source={require('../assets/Inbox1.png')} style={styles.doctorImage} />
          <View style={styles.messagePreview}>
            <Text style={styles.doctorName}>Dr. Areeba</Text>
            <Text style={styles.lastMessage}>Hey! What's up?</Text>
          </View>
          <Text style={styles.messageTime}>6:15pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxItem}
          onPress={() => navigation.navigate("Chat")}>
          <Image source={require('../assets/Inbox3.png')} style={styles.doctorImage} />
          <View style={styles.messagePreview}>
            <Text style={styles.doctorName}>Dr. Mark</Text>
            <Text style={styles.lastMessage}>Hey! What's up?</Text>
          </View>
          <Text style={styles.messageTime}>6:15pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxItem}
          onPress={() => navigation.navigate("Chat")}>
          <Image source={require('../assets/Inbox4.png')} style={styles.doctorImage} />
          <View style={styles.messagePreview}>
            <Text style={styles.doctorName}>Dr. John</Text>
            <Text style={styles.lastMessage}>Hey! What's up?</Text>
          </View>
          <Text style={styles.messageTime}>6:15pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxItem}
          onPress={() => navigation.navigate("Chat")}>
          <Image source={require('../assets/Inbox5.png')} style={styles.doctorImage} />
          <View style={styles.messagePreview}>
            <Text style={styles.doctorName}>Dr. Bravo</Text>
            <Text style={styles.lastMessage}>Hey! What's up?</Text>
          </View>
          <Text style={styles.messageTime}>6:15pm</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:
  {
    paddingTop: 10,
    marginLeft: 20,
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#e5e5ea',
    borderRadius: 20,
  },
  inboxList: {

  },
  inboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messagePreview: {
    flex: 1,
  },
  doctorName: {
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#6e6e72',
  },
  messageTime: {
    color: '#6e6e72',
  },
  // ... other styles
});

export default InboxScreen;
