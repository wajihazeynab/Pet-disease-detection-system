import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, Platform, Modal } from 'react-native';
import Radiobtn from '../components/Radiobtn';
import { SCREEN_HEIGHT, isEmailInvalid, scale, showToast } from '../constants';
import CustomBtn from '../components/CustomBtn';
import { apiPost } from '../api';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as colors from '../styles'
import { Picker } from '@react-native-picker/picker';

const arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const SignUpScreen = ({ navigation }) => {

  const [selectedRadio, setSelectedradio] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confPassword, setConfPassword] = useState('');
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [timeSlot, setTimeSlot] = useState([]);
  const [startModal, setStartModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  // const [endTime, setEndTime] = useState(new Date());
  const [selectDay, setSelectDay] = useState([]);

  const [modal, setModal] = useState(false)
  const [select, setSelect] = useState(null)
  const [hour, setHour] = useState(0)
  const [period, setPeriod] = useState('am')

  const validation = () => {
    if (name == '' || email == '' || isEmailInvalid(email) || password == '' || password.length < 6 || password != confPassword) {
      return true
    }
    if (selectedRadio == 2) {
      if (phoneNumber == '' || licenseNumber == '' || specialization == '' || selectDay.length == 0) {
        return true
      }
    }
    return false
  }



  const signUp = async () => {
    setLoading(true)
    if (selectedRadio == 1) {
      let DATA = {
        name: name,
        email: email,
        password: password,

      }
      const res = await apiPost('/user/signup', DATA)
      if (res.check) {
        showToast('Your account created successfully please check your email and verify', 'success')
      }
      else {
        showToast(res.message, 'error')
      }
      setLoading(false)
    }
    else {
      let DATA = {
        name: name,
        email: email,
        password: password,
        phone: phoneNumber,
        address: address,
        licenseNumber: licenseNumber,
        specialization: specialization,
        workingHours: [{
          day: selectDay,
          timeSlot: timeSlot,
        }]
      }
      const res = await apiPost('/vet/signup', DATA)
      console.log(res)
      if (res.check) {
        showToast('Your account created successfully please check your email and verify', 'success')
        navigation.goBack()
      }
      else {
        showToast(res.message, 'error')
      }
      setLoading(false)
    }
  }

  const convertTextToTime = (textTime) => {
    // Split the textTime into hours, minutes, and period (AM/PM)
    const [timeStr, period] = textTime.split(' ');
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    // Calculate hours in 24-hour format
    let hours24 = hours;
    if (period === 'pm' && hours < 12) {
      hours24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0;
    }

    // Create a new Date object with today's date and the parsed time
    const now = new Date(); // current date and time
    const dateObj = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours24,
      minutes
    );

    return dateObj;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}>
        <View style={styles.modalContainer}>
          <View style={styles.body}>
            {/* <View style={{ padding: scale(15), backgroundColor: '#DCEDED', borderTopRightRadius: 14, borderTopLeftRadius: 14 }}>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModal(false)
                }}>
                <AntDesign
                  style={{ alignItems: 'flex-end' }}
                  name={"close"}
                  size={20}
                  color={'#8B8B8B'}
                />
              </TouchableOpacity>
            </View> */}
            <View style={{ padding: scale(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <TextInput
                style={{ paddingVertical: 10, textAlign: 'center', borderWidth: 1, borderColor: '#6CB0E6', borderRadius: 5, width: 100 }}
                keyboardType='number-pad'
                onChangeText={e => setHour(e)}
                value={hour}
              />

              <TouchableOpacity
                style={{ paddingVertical: 10, borderWidth: 1, borderColor: '#6CB0E6', borderRadius: 5, width: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
                onPress={() => period == 'am' ? setPeriod('pm') : setPeriod('am')}>
                <Text style={{ marginRight: 5 }}> {period}</Text>
                <AntDesign name='caretdown' />
              </TouchableOpacity>
            </View>
            <CustomBtn
              disabled={parseInt(hour) <= 0 || parseInt(hour) > 12}
              title={'add'}
              onPress={() => {
                let arr = timeSlot
                console.log(moment(convertTextToTime(`${hour}:00 ${period}`)).format('hh:mm a'))
                arr[select] = convertTextToTime(`${hour}:00 ${period}`)
                setTimeSlot([...arr])
                setModal(false)
              }}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.container}>

        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={e => setName(e)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={e => setEmail(e)}
          value={email}
        />
        <View style={{ ...styles.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput
            // style={styles.input}
            style={{ paddingVertical: 0, flex: 1 }}
            secureTextEntry={!showPassword}
            onChangeText={e => setPassword(e)}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo size={20} name={showPassword ? 'eye' : 'eye-with-line'} />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput
            style={{ paddingVertical: 0, flex: 1 }}
            placeholder="Confirm password"
            secureTextEntry={!showConfPassword}
            onChangeText={e => setConfPassword(e)}
            value={confPassword}
          />
          <TouchableOpacity onPress={() => setShowConfPassword(!showConfPassword)}>
            <Entypo size={20} name={showConfPassword ? 'eye' : 'eye-with-line'} />
          </TouchableOpacity>
        </View>

        {selectedRadio == 2 &&
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone"
              onChangeText={e => setPhoneNumber(e)}
              value={phoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              onChangeText={e => setAddress(e)}
              value={address}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter License Number"
              onChangeText={e => setLicenseNumber(e)}
              value={licenseNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Specialization"
              onChangeText={e => setSpecialization(e)}
              value={specialization}
            />

            <Text style={{ ...styles.radioLabel, fontSize: 16, fontWeight: '500', marginTop: 10 }}>Select Days</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: scale(15) }}>
              {arr.map(e => {
                let find = selectDay.find(i => i == e)
                return (
                  <TouchableOpacity
                    style={{ ...styles.box, backgroundColor: find ? colors.APP_BTN_COLOR : '#DBDBDB82' }}
                    onPress={() => {
                      if (find) {
                        let arr = selectDay.filter(i => i != e)
                        setSelectDay([...arr])
                      }
                      else {
                        let arr = selectDay
                        arr.push(e)
                        setSelectDay([...arr])
                      }
                    }}
                  >
                    <Text style={{ color: find ? colors.APP_WHITE_COLOR : 'black' }}>{e[0]}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ ...styles.radioLabel, fontSize: 16, fontWeight: '500', }}>Time Slot</Text>
              <TouchableOpacity
                onPress={() => {
                  let arr = timeSlot
                  if (arr.length > 0) {
                    let old = arr[arr.length - 1]
                    console.log(moment(new Date(old.getTime())).format('hh:mm'))
                    let mint = (old.getTime() + 30 * 60000)
                    var newD = 0
                    if (mint > 0 && mint <= 30) {
                      newD = 30
                    }
                    console.log(moment(new Date(mint)).format('hh:mm'))
                    arr.push(new Date(mint))
                    setTimeSlot([...arr])
                  }
                  else {
                    let now = new Date()
                    console.log(now.getMinutes() > 0 && now.getMinutes() <= 30 ? 30 : 0)
                    now.setMinutes(0)
                    now.setSeconds(0);
                    now.setMilliseconds(now.getMinutes() > 0 && now.getMinutes() <= 30 ? 30 : 0);

                    console.log("now", moment(now).format('hh:mm a'))
                    arr.push(now)
                    setTimeSlot([...arr])
                  }
                  setSelect(arr.length - 1)
                  setModal(true)
                }}>
                <Icon name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: scale(15) }}>
              {/* <TouchableOpacity
              style={{ ...styles.borderBtn, marginRight: scale(5) }}
              onPress={() => setStartModal(true)}
            >
              <Text>{moment(startTime).format('hh:mm A')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.borderBtn, marginLeft: scale(5) }}
              onPress={() => setEndModal(true)}
            >
              <Text>{moment(startTime).format('hh:mm A')}</Text>
            </TouchableOpacity> */}
              <FlatList
                data={timeSlot}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 0.32, flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                    {/* <DateTimePicker
                      value={item}
                      isVisible={true}
                      minuteInterval={30}
                      mode="time"
                      onConfirm={(time) => {
                        // setStartTime(time)
                        let arr = timeSlot
                        arr[i] = time
                        console.log(arr[i])
                        setTimeSlot([...arr])
                      }}
                      onCancel={() => {
                        setStartModal(false)
                      }}
                    /> */}
                    <TouchableOpacity
                      onPress={() => {
                        setModal(true)
                        setSelect(index)
                      }}>
                      <Text style={{ fontSize: 14 }}>{moment(item).format('hh:mm a')}</Text>
                    </TouchableOpacity>
                    {/* {Platform.OS == 'android' &&
                      <Text onPress={()=>setStartModal(true)}>{moment(item).format('hh:mm a')}</Text>
                    } */}
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        let arr = timeSlot.filter(e => e != item)
                        setTimeSlot([...arr])
                      }}
                    >
                      <Entypo name='cross' size={20} color={'red'} />
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={3}
              />
            </View>
          </>
        }

        <Text style={{ ...styles.radioLabel, marginTop: 15 }}>Register as</Text>
        <View style={styles.radioContainer}>
          {/* <TouchableOpacity style={styles.radioButton}> */}
          <Radiobtn
            selectedRadio={selectedRadio}
            setSelectedradio={setSelectedradio}
          />

        </View>
        {/* <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
        <CustomBtn
          disabled={validation() || loading}
          loading={loading}
          title={'Sign Up'}
          btnStyle={{ width: '100%', borderRadius: 30, marginTop: 15 }}
          onPress={() => signUp()}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'red',
    // height: SCREEN_HEIGHT,
    // flexDirection: 'column',
    // alignItems: 'stretch',
    // justifyContent: 'space-evenly',
    paddingTop: scale(80),
    padding: scale(20),

    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  header: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 28,
    paddingBottom: scale(20),
    fontWeight: 'bold',
    // marginBottom: 170,
  },
  body: {
    borderRadius: 14,
    marginHorizontal: scale(10),
    // width: SCREEN_WIDTH,
    marginTop: SCREEN_HEIGHT * 0.35,
    backgroundColor: colors.APP_WHITE_COLOR,
  },
  input: {

    borderWidth: 1,
    borderColor: '#ccc',
    padding: scale(12),
    marginVertical: scale(5),
    borderRadius: 5,
  },
  borderBtn: {
    flex: 0.5,
    marginTop: scale(10),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    padding: scale(15),
    justifyContent: 'center'
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    marginVertical: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioText: {
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#00ADEF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  radioLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  box: {
    width: scale(26),
    height: scale(26),
    backgroundColor: colors.APP_BTN_COLOR,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SignUpScreen
