
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed
import { AVATAR_IMG, SERVER_BASE_URL, scale } from '../constants';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomBtn from '../components/CustomBtn';
import { useSelector } from 'react-redux';
import { apiPost } from '../api';

const VetDetailScreen = ({ navigation, route }) => {
  // Dummy data for availability times
  const availabilityTimes = ['11:00am', '12:00pm', '1:00pm', '5:00pm', '6:00pm', '7:00pm'];
  const userModal = useSelector(e => e.user_reducer.userModal)

  const { image, name, email, address, workingHours, _id } = route.params.data

  const [id, setId] = useState(null)

  useEffect(() => {
    navigation.addListener('focus', () => {
      getChannel()
    })
  }, [navigation])

  const getChannel = async () => {

    const DATA = {
      vetId: _id,
      userId: userModal._id
    }
    const res = await apiPost('/chat/select', DATA, userModal.accessToken)
    if (res.check) {
      setId(res.data._id)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={scale(28)} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Details</Text>
          </View>
          <Image
            source={image ? { uri: `${SERVER_BASE_URL}/images/${image}` } : AVATAR_IMG} // Replace with the path to your vet image
            style={styles.image}
          />

          <View style={styles.detailsContainer}>
            <View style={styles.SecondContainer}>

              <View>
                <Text style={styles.name}>{name && name}</Text>
                <Text style={styles.specialty}>Veterinary</Text>
                <Text style={styles.location}>{address && address}</Text>
              </View>
              <TouchableOpacity style={styles.msgButton}
                onPress={() => navigation.navigate('ChatScreen', { id: id, receiver: route.params.data })}>
                <Ionicons name="chatbubble-outline" size={50} color="black" />


              </TouchableOpacity>
            </View>
            {/* <View style={styles.ratingContainer}>

          {[...Array(5)].map((_, index) => (
            <FontAwesome key={index} name="star" size={18} color="gold" />
          ))}
        </View> */}
            <Text style={styles.availabilityTitle}>Availability</Text>
            {/* {workingHours[0]?.day && workingHours[0]?.day.map((item, i) => (

            <Text style={{ fontSize: 16, fontWeight: '500' }}>{item}</Text>

          ))} */}
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>Days : </Text>
            <FlatList
              data={workingHours[0]?.day}
              renderItem={({ item }) => (
                <View style={{ ...styles.timeSlot, flex: 0.33, marginRight: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500', }}>{item}</Text>
                </View>
              )}
              scrollEnabled={false}
              numColumns={3}

            />
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>Times : </Text>
            {/* <View style={styles.timeSlotsContainer}>

            <TouchableOpacity style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{moment(workingHours[0].startTime).format('HH:MM A')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{moment(workingHours[0].endTime).format('HH:MM A')}</Text>
            </TouchableOpacity>

          </View> */}
            <FlatList
              data={workingHours[0]?.timeSlot}
              renderItem={({ item }) => (
                <View style={{ ...styles.timeSlot, flex: 0.33, marginRight: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500', }}>{moment(item).format('hh:mm a')}</Text>
                </View>
              )}
              scrollEnabled={false}
              numColumns={3}
            />

            <CustomBtn
              title={'Appointment'}
              btnStyle={{ marginTop: 15 }}
              onPress={() => navigation.navigate('AppointmentScreen', { data: route.params.data })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 10,
  },
  image: {
    width: '85%',
    height: 250,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 20,

  },
  SecondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  msgButton: {

    alignSelf: 'center',
    marginRight: 30,
    // width:100,
    // height:100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,

  },
  specialty: {
    fontSize: 18,
    color: 'grey',
    marginTop: 4,

  },
  location: {
    fontSize: 16,
    color: 'grey',
    marginTop: 4,
    marginBottom: 8,

  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  availabilityTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,

  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 15
  },
  timeSlot: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#87CEEB',
    borderRadius: 10,
    marginVertical: 5,
    width: scale(110),
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeSlotText: {
    fontSize: 16,
    color: '#000',
  },
});

export default VetDetailScreen;