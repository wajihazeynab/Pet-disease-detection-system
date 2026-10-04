import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const notifications = [
  { id: 1, message: 'Notification 1 message', time: '10:00 AM', icon: 'bell' },
  { id: 2, message: 'Notification 2 message', time: '11:00 AM', icon: 'bell' },
  // Add more notifications as needed
];

const Notify = () => {

  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Icon name={item.icon} size={24} color="#000" style={styles.icon} />
      <View style={styles.notificationContent}>
        <Text>{item.message}</Text>
        <Text>{item.time}</Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        contentContainerStyle={styles.notificationContainer}
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
          <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={require('../assets/NoNotificationsIcon.png')} />
            <Text style={{marginTop:15, fontWeight:'bold', fontSize:16}}>No new notifications</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    paddingTop: 10,
    marginLeft: 20,
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
  },
  notificationContainer: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
  
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  bell: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00ADEF",
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  notification: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    minHeight:60
  },
  icon: {
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
});

export default Notify;
