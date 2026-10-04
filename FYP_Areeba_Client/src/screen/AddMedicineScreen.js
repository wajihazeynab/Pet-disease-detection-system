
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import { apiGet, apiPost, apiPut } from '../api';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import CustomBtn from '../components/CustomBtn';
import moment from 'moment';
import { showToast } from '../constants';
const AddMedicineScreen = ({ navigation, route }) => {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const [medicineName, setMedicineName] = useState('omega');
  const [dose, setDose] = useState(1);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState('Everyday');
  const [pet, setPet] = useState([])
  const [selectPet, setSelectPet] = useState(null)
  const [id, setId] = useState(null)
  const [schedules, setSchedule] = useState({
    Morning: true,
    Midday: false,
    Night: false,

  });

  useEffect(() => {
    fetchPet()
  }, [])

  useEffect(() => {
    if (route.params.type == 'Update') {
      let data = route.params.data
      setMedicineName(data.name)
      setDose(data.dose)
      setFrequency(data.frequency)
      setSelectPet(data.pet)
      setSchedule(data.schedule)
      setId(data._id)
    }
  }, [route])

  console.log('pet', pet)

  const fetchPet = async () => {
    const res = await apiGet('/pet', userModal.accessToken)
    if (res.check) {
      setPet(res.data)
    }
    // if(res.)
    console.log('get', res)
  }

  const validation = () => {
    if (medicineName == '' || selectPet == null) {
      return true
    }
    else {
      return false
    }
  }

  const handleFrequencyPress = (newFrequency) => {
    setFrequency(newFrequency);
  };

  const increaseDose = () => {
    setDose(dose + 1);
  };

  const decreaseDose = () => {
    if (dose > 1) setDose(dose - 1);
  };

  const toggleSchedule = (schedule) => {
    setSchedule((currentSchedule) => ({
      ...currentSchedule,
      [schedule]: !currentSchedule[schedule],
    }));
  };

  const AddMedicine = async () => {
    setLoading(true)
    const DATA = {
      name: medicineName,
      frequency: frequency,
      dose: dose,
      schedule: schedules,
      date: moment(new Date()).format('DD, MMMM YYYY'),
      pet: selectPet,
    }
    let res = null
    if (id == null) {
      res = await apiPost('/med/add', DATA, userModal.accessToken)
    }
    else {
      res = await apiPut(`/med/edit/${id}`, DATA, userModal.accessToken)
    }
    console.log(res)
    if (res.check) {
      Alert.alert(id ? 'Medicine Updated Successfully' : 'Medicine Added Successfully');
      navigation.navigate("MedicineScreen");
    }
    else {
      showToast(res.message, 'error')
    }
    setLoading(false)
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          navigation.navigate("MedicineScreen")
        }}>
        <Text>cancel</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Schedule the dose</Text>
      <Text style={styles.textt}>Enter medicine name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter medicine name"
        value={medicineName}
        onChangeText={setMedicineName}
      />
      <View style={{ width: '100%', borderWidth: 1, borderRadius: 10, marginTop: 10 }}>
        {pet.length > 0 ?
          <Picker
            mode='dropdown'
            selectedValue={selectPet}
            color={'black'}
            itemStyle={{
              // backgroundColor:'yellow',
              height: 100,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectPet(itemValue)
            }>
            {pet.map(e => (
              <Picker.Item label={e.name} value={e._id} />
            ))}
          </Picker>
          :
          <View style={{ height: 50, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text>no pet in list</Text>
          </View>
        }
      </View>
      <Text style={styles.textt}>How often is the dose taken?</Text>
      <View style={styles.frequencyContainer}>
        {['Everyday', 'Weekly', 'Monthly'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.frequencyButton, { backgroundColor: item == frequency ? '#6CB0E6' : 'white', borderWidth: item == frequency ? 0 : 1 }]}
            onPress={() => handleFrequencyPress(item)}
          >
            <Text style={{ ...styles.frequencyText, color: item == frequency ? 'white' : 'black', }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.textt}>Daily Dose</Text>
      <View style={styles.doseContainer}>
        <TouchableOpacity onPress={decreaseDose} style={styles.doseButton}>
          <Text style={styles.doseButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.doseValue}>{dose}</Text>
        <TouchableOpacity onPress={increaseDose} style={styles.doseButton}>
          <Text style={styles.doseButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.textt }}>When do yo want to take it?</Text>
      {/* <View style={styles.scheduleContainer}>
      
        {['morning', 'midDay', 'night'].map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.scheduleButton, schedule[time] && styles.scheduleButtonActive]}
            onPress={() => handleSchedulePress(time)}
          >
            <Text style={styles.scheduleText}>{time.charAt(0).toUpperCase() + time.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
      <View style={styles.ScheduleList}>
        {Object.keys(schedules).map((schedule) => (
          <View key={schedule} style={styles.scheduleContainer}>
            <CheckBox
              value={schedules[schedule]}
              onValueChange={() => toggleSchedule(schedule)}
              color={'#6CB0E6'}
            />
            <Text style={styles.scheduleText}>
              {schedule.split(/(?=[A-Z])/).join(' ')}
            </Text>

          </View>
        ))}
      </View>
      <CustomBtn
        title={id ? 'Update' : 'Add'}
        disabled={validation() || loading}
        loading={loading}
        btnStyle={{ borderRadius: 10 }}
        onPress={AddMedicine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  cancelButton: {
    alignSelf: 'flex-end',

  },
  header: {
    fontSize: 26,
    width: 120,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  textt: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginVertical: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '100%',
    color: 'white',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#6CB0E6'
  },
  frequencyContainer: {
    flexDirection: 'row',
  },
  frequencyButton: {
    padding: 15,
    backgroundColor: '#6CB0E6',
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 0.33
  },
  frequencyButtonActive: {
    backgroundColor: '#87CEEB',
  },
  frequencyText: {
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  doseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#6CB0E6'
  },
  doseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doseButtonText: {
    fontSize: 24,
    color: 'black',
  },
  doseValue: {
    marginHorizontal: 20,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  ScheduleList: {
    marginBottom: 20,
    flexDirection: 'row',
    // marginHorizontal:10,
    // alignContent: 'space-evenly',

  },
  scheduleContainer: {
    flexDirection: 'row',
    // marginBottom: 20,
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    flex: 0.33,
    marginBottom: 10,
  },

  scheduleText: {
    // color: '#000',
    marginLeft: 5,
    marginRight: 2,
    fontSize: 16,
    fontWeight: '500',
  },
  // scheduleButton: {
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 20,
  //   marginHorizontal: 5,
  // },
  // scheduleButtonActive: {
  //   backgroundColor: '#87CEEB',
  // },

  AddButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 50,
    padding: 15,
    width: '90%',
    alignItems: 'center',
  },
  AddButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default AddMedicineScreen;