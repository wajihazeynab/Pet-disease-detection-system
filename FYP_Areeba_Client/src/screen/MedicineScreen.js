import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { apiDelete, apiGet } from '../api';
import { useSelector } from 'react-redux';
import { showToast } from '../constants';

const MedicineScreen = ({ navigation }) => {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const [medicines, setMedicines] = useState([]);
  const [delLoading, setDelLoading] = useState('false');
  const [selectedSchedule, setSelectedSchedule] = useState('Today');//'Everyday', 'Weekly', 'Monthly'
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    navigation.addListener('focus', () => {
      getMedincine()
    })
  }, [navigation])

  const getMedincine = async (type = selectedSchedule) => {
    setLoading(true)
    let frequency = type == 'Today' ? 'Everyday' : type
    const res = await apiGet(`/med/get/${frequency}`, userModal.accessToken)
    if (res.check) {
      setMedicines(res.data)
    }
    setLoading(false)
  }

  const delMedicine = async (id) => {
    setDelLoading(id)
    const res = await apiDelete(`/med/delete/${id}`, userModal.accessToken)
    if (res.check) {
      showToast('Deleted Successfully')
      getMedincine()
    }
    setDelLoading('false')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 15 }}>
        <Text style={styles.header}>Your today Activities</Text>
        <Text style={styles.date}>{moment(new Date()).format('DD, MMMM YYYY')}</Text>
        {/* Add Button */}
        <TouchableOpacity style={styles.addButton}
          onPress={() => navigation.navigate('AddMedicineScreen', { type: 'Add' })}>
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.menuItem}  
    
        >
          <Icon name="plus" size={30} color="#4F8EF7" />
           <Text style={styles.menuText}>Checkup</Text> 
        </TouchableOpacity> */}
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            onPress={() => {
              setSelectedSchedule('Today')
              getMedincine('Today')
            }}
            style={[
              styles.toggleButton,
              selectedSchedule === 'Today' ? styles.toggleButtonActive : {},
            ]}
          >
            <Text
              style={[
                styles.toggleButtonText,
                selectedSchedule === 'Today' ? styles.toggleButtonTextActive : {},
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedSchedule('Weekly')
              getMedincine('Weekly')
            }}
            style={[
              styles.toggleButton,
              selectedSchedule === 'Weekly' ? styles.toggleButtonActive : {},
            ]}
          >
            <Text
              style={[
                styles.toggleButtonText,
                selectedSchedule === 'Weekly' ? styles.toggleButtonTextActive : {},
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedSchedule('Monthly')
              getMedincine('Monthly')
            }}
            style={[
              styles.toggleButton,
              selectedSchedule === 'Monthly' ? styles.toggleButtonActive : {},
            ]}
          >
            <Text
              style={[
                styles.toggleButtonText,
                selectedSchedule === 'Monthly' ? styles.toggleButtonTextActive : {},
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
        {/* Medicine List */}
        <FlatList
          data={medicines}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.medicineItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.medicineName}>{item.name}</Text>

                <View style={styles.IconItems}>

                  <TouchableOpacity style={styles.menuItem}
                    onPress={() => navigation.navigate('AddMedicineScreen', { type: 'Update', data: item })}
                  >
                    <Icon name="pencil" size={20} color="black" />
                    {/* <Text style={styles.menuText}>Checkup</Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={delLoading == item._id}
                    style={styles.menuItem}
                    onPress={() => delMedicine(item._id)}
                  >
                    {delLoading == item._id ?
                      <ActivityIndicator />
                      :
                      <Icon name="delete" size={20} color="black" />
                    }
                    {/* <Text style={styles.menuText}>Checkup</Text> */}
                  </TouchableOpacity>
                </View>

              </View>
              <View style={styles.medicineInfo}>
                <Text>{item.schedule?.Morning && 'In Morning,'} {item.schedule?.Midday && 'Mid Day,'} {item.schedule?.Night && 'At Night'}</Text>
                <Text style={styles.medicineTime}>{item.date}</Text>
              </View>
            </View>
          )}
          refreshControl={<RefreshControl loading={loading} onRefresh={getMedincine} />}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  IconItems: {
    flexDirection: 'row',
    //marginLeft:230,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItem: {
    alignSelf: 'right',
  },
  header: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    width: 200
  },
  date: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,

  },
  tab: {
    fontSize: 16,
    color: '#000',
  },
  toggleButtons: {
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 20,
    width: 350,
    height: 53,
    borderRadius: 20,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: 15,
    paddingVertical: 10,
    height: 45,
    paddingHorizontal: 30,
    color: 'black',
    marginTop: 3.5,
    width: 100,
  },
  toggleButtonActive: {
    backgroundColor: 'white',

  },
  toggleButtonText: {
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    width: 100,
  },
  medicineItem: {

    //backgroundColor: '#e1e1e1',
    backgroundColor: '#dda0dd',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  medicineInfo: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  medicineName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  medicineTime: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    right: 25,
    top: 65,
    backgroundColor: 'lightblue',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicineScreen;
