import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserModal } from '../reducer/user_reducer';
import CustomBtn from '../components/CustomBtn'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { apiPut } from '../api';
import { SCREEN_HEIGHT, SERVER_BASE_URL, scale, showToast } from '../constants';
import * as ImagePicker from 'expo-image-picker';
import * as colors from '../styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const userModal = useSelector(e => e.user_reducer.userModal)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('34343434');
  const [address, setAddress] = useState('fjdnfdf');
  const [licenseNumber, setLicenseNumber] = useState('343434');
  const [specialization, setSpecialization] = useState('fkdjfdf');
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectDay, setSelectDay] = useState([]);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false)

  const [modal, setModal] = useState(false)
  const [select, setSelect] = useState(null)
  const [hour, setHour] = useState(0)
  const [period, setPeriod] = useState('am')

  useEffect(() => {
    if (userModal?.type == 'customer') {
      setName(userModal.name)
      setEmail(userModal.email)
    }
    else if (userModal) {
      setName(userModal.name)
      setEmail(userModal.email)
      setPhoneNumber(userModal.phone)
      setAddress(userModal.address)
      setLicenseNumber(userModal.licenseNumber)
      setSpecialization(userModal.specialization)
      setSelectDay(userModal.workingHours[0].day)
      setTimeSlot(userModal.workingHours[0].timeSlot)
    }
  }, [userModal])

  const validation = () => {
    if (name == '' || email == '' || password == '' || newPassword != '' && newPassword.length < 6) {
      return true
    }
    if (userModal?.type == 'vet') {
      if (phoneNumber == '' || licenseNumber == '' || specialization == '' || selectDay.length == 0) {
        return true
      }
    }
    return false
  }

  const updateCustomer = async () => {
    setLoading(true)
    if (userModal.type == 'customer') {
      let DATA = {
        name: name,
        email: email,
        password: password,
        newPassword: newPassword,
        image: image?.base64,
        // type: image?.fileName.split('.')[1]
        type:'jpg'
      }
      const res = await apiPut(`/user/update/${userModal._id}`, DATA, userModal.accessToken)
      if (res.check) {
        showToast('Your account updated successfully please check your email and verify', 'success')
        dispatch(updateUserModal(res.data))
        setPassword('')
      }
      else {
        if (res.code == 402) {
          dispatch(updateUserModal(null))
          navigation.nvavigate('SignIn')
        }
        showToast(res.message, 'error')
      }
      setLoading(false)
    }
    else {
      let DATA = {
        name: name,
        email: email,
        password: password,
        newPassword: newPassword,
        phone: phoneNumber,
        address: address,
        licenseNumber: licenseNumber,
        specialization: specialization,
        workingHours: [{
          day: selectDay,
          timeSlot: timeSlot,
        }],
        image: image?.base64,
        // type: image?.fileName.split('.')[1]
        type:'jpg'
      }
      const res = await apiPut(`/vet/update/${userModal._id}`, DATA, userModal.accessToken)
      console.log(res)
      if (res.check) {
        setPassword('')
        setNewPassword('')
        showToast('Your account updated successfully please check your email and verify', 'success')
        dispatch(updateUserModal(res.data))

      }
      else {
        showToast(res.message, 'error')
      }
      setLoading(false)
    }
  }
  console.log("suer", userModal)
  const takePhoto = async () => {
    try {
      // Ask for camera permissions
      // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      // if (permissionResult.granted === false) {
      //   alert("You've refused to allow this app to access your camera!");
      //   return;
      // }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        base64: true,
        height: 300,
        width: 300,
        aspect: [4, 3],
        quality: 0.2,
      });

      // Explore the result
      if (!result.cancelled) {
        console.log("reslt", result);
        setImage(result.assets[0])
        // You can use the uri to display the image or upload it
      }
    } catch (error) {
      console.error("Error taking a photo: ", error);
    }
  };


  const convertTextToTime = (textTime) => {
    // Split the textTime into hours, minutes, and period (AM/PM)
    const [timeStr, period] = textTime.split(' ');
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    // Calculate hours in 24-hour format
    let hours24 = hours;
    if (period === 'PM' && hours < 12) {
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
    <ScrollView>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={styles.header}>My Profile</Text>
          <TouchableOpacity onPress={() => dispatch(updateUserModal(null))}>
            <Text style={{ fontSize: 12, fontWeight: '700' }}>LogOut</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>Hi {userModal?.name},</Text>
        <Text style={styles.subGreeting}>Hope it's a good day!</Text>

        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          {image || userModal?.image ?
            <Image style={{ width: 100, height: 100, borderRadius: 100, }} source={{ uri: image ? image?.uri : `${SERVER_BASE_URL}/images/${userModal.image}` }} />
            :
            <Icon name="user-circle-o" size={80} color="#000" />
          }
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={takePhoto}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        {userModal?.type == 'customer' ?
          <View style={styles.infoSection}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={e => setName(e)}
              value={name}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              editable={false}
              onChangeText={e => setEmail(e)}
              value={email}
            />
            <Text style={{ ...styles.label, marginTop: 15 }}>Old Password</Text>

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
            <Text style={styles.label}>New Password</Text>
            <View style={{ ...styles.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput

                style={{ paddingVertical: 0, flex: 1 }}
                secureTextEntry={!showConfPassword}
                onChangeText={e => setNewPassword(e)}
                value={newPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Entypo size={20} name={showPassword ? 'eye' : 'eye-with-line'} />
              </TouchableOpacity>
            </View>
            <CustomBtn
              disabled={validation() || loading}
              loading={loading}
              btnStyle={{ marginTop: 15 }}
              title={'Update'}
              onPress={() => updateCustomer()}
            />
          </View>
          :
          <View style={styles.infoSection}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={e => setName(e)}
              value={name}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              editable={false}
              onChangeText={e => setEmail(e)}
              value={email}
            />
            <Text style={styles.label}>Phone no</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone"
              onChangeText={e => setPhoneNumber(e)}
              value={phoneNumber}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              onChangeText={e => setAddress(e)}
              value={address}
            />
            <Text style={styles.label}>Lincense no</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter License Number"
              onChangeText={e => setLicenseNumber(e)}
              value={licenseNumber}
            />
            <Text style={styles.label}>Specialization</Text>
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
                  let arr = []
                  // arr.push(new Date())
                  // setTimeSlot([...arr, ...timeSlot])
                  if (arr.length > 0) {
                    let old = new Date(timeSlot[timeSlot.length - 1])
                    console.log(moment(new Date(old.getTime())).format('hh:mm'))
                    let mint = (old.getTime() + 30 * 60000)
                    var newD = 0
                    if (mint > 0 && mint <= 30) {
                      newD = 30
                    }
                    console.log(moment(new Date(mint)).format('hh:mm'))
                    arr.push(new Date(mint))
                    setTimeSlot([...arr, ...timeSlot])
                  }
                  else {
                    let now = new Date()
                    console.log(now.getMinutes() > 0 && now.getMinutes() <= 30 ? 30 : 0)
                    now.setMinutes(0)
                    now.setSeconds(0);
                    now.setMilliseconds(now.getMinutes() > 0 && now.getMinutes() <= 30 ? 30 : 0);

                    console.log("now", moment(now).format('hh:mm a'))
                    arr.push(now)
                    setTimeSlot([...arr, ...timeSlot])
                  }
                  setSelect(arr.length - 1)
                  setModal(true)
                }
                }>
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
                      value={new Date(item)}
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
            <Text style={{ ...styles.label, marginTop: 15 }}>Old Password</Text>

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
            <Text style={{ ...styles.label, marginTop: 15 }}>New Password</Text>

            <View style={{ ...styles.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                // style={styles.input}
                style={{ paddingVertical: 0, flex: 1 }}
                secureTextEntry={!showConfPassword}
                onChangeText={e => setNewPassword(e)}
                value={newPassword}
              />
              <TouchableOpacity onPress={() => setShowConfPassword(!showConfPassword)}>
                <Entypo size={20} name={showConfPassword ? 'eye' : 'eye-with-line'} />
              </TouchableOpacity>
            </View>
            <CustomBtn
              disabled={validation() || loading}
              loading={loading}
              btnStyle={{ marginTop: 15 }}
              title={'Update'}
              onPress={() => updateCustomer()}
            />
          </View>
        }

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60
  },
  header: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subGreeting: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    //marginBottom: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  body: {
    borderRadius: 14,
    marginHorizontal: scale(10),
    // width: SCREEN_WIDTH,
    marginTop: SCREEN_HEIGHT * 0.35,
    backgroundColor: 'white'
  },
  uploadButton: {
    marginTop: 10,
    padding: 10,
  },
  uploadText: {
    color: '#007bff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoSection: {
    // Additional styling if necessary
  },
  label: {
    fontSize: 16,
    color: '#6A6A6A',
  },
  input: {
    fontSize: 16,
    // borderWidth: 1,
    borderBottomColor: '#ddd',
    padding: 8,
    marginBottom: 10,
    borderBottomWidth: 2,

  },
  box: {
    width: scale(26),
    height: scale(26),
    backgroundColor: colors.APP_BTN_COLOR,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
  // ... other styles
});

export default ProfileScreen;
