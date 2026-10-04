import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale, showToast } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomBtn from '../components/CustomBtn';
import { apiDelete } from '../api';
import { useSelector } from 'react-redux';

const PetDetailScreen = ({ navigation, route }) => {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const pet = {
    _id,
    name,
    age,
    category,
    gender,
    breed,
    weight,
    height,
    image// replace with your image path
  } = route.params.data

  const [loading, setLoading] = useState(false)

  const deletePet = async () => {
    setLoading(true)
    const res = await apiDelete(`/pet/delete/${_id}`, userModal.accessToken)
    if (res.check) {
      showToast('Pet deleted successfully', 'success')
      navigation.goBack()
    }
    else {
      showToast(res.message)
    }

  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: scale(50), marginBottom: scale(20) }}>
        <TouchableOpacity
          style={{ flex: 0.05 }}
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={scale(28)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Details</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => navigation.navigate('AddPetScreen', { type: 'UPDATE', data: route.params.data })}
        >
          <AntDesign name='edit' size={25} />
        </TouchableOpacity>
        <Image
          // source={require({uri: pet.image}) } // replace with your image import if local
          source={require('../assets/HomeDog2.png')}
          style={styles.petImage}
        />


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petAge}>{pet.age} year old</Text>
        </View>


      </View>


      <View style={{ padding: scale(20) }} >

        <View style={styles.details}>
          <Text style={styles.detailLabel}>Category</Text>
          <Text style={styles.detailValue}>{pet.category}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Gender</Text>
          <Text style={styles.detailValue}>{pet.gender}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Breed</Text>
          <Text style={styles.detailValue}>{pet.breed}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Weight</Text>
          <Text style={styles.detailValue}>{pet.weight}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Height</Text>
          <Text style={styles.detailValue}>{pet.height}</Text>
        </View>
      </View>

      <CustomBtn
        disabled={loading}
        loading={loading}
        title={'Delete'}
        btnStyle={{ backgroundColor: '#E30261', borderRadius: 10, marginTop: scale(15) }}
        onPress={() => deletePet()}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerTitle: {
    textAlign: 'center',
    flex: 0.95,
    marginRight: scale(10),
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    // alignItems: 'center',
    padding: scale(15),
    backgroundColor: '#C6E0F6',
    borderRadius: 8,
  },
  petImage: {
    marginTop: 10,
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 60,
    //backgroundColor:'C6E0F6'
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(15)
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  petAge: {
    fontSize: 14,
    fontWeight: '400',
    // fontSize: 16,
    color: '#6A6A6A',
  },
  detailsContainer: {
    padding: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'center',


    justifyContent: 'space-between',




  },
  detailLabel: {
    fontSize: 22,
    fontWeight: '700',

  },
  detailValue: {
    fontSize: 18,
    fontWeight: '500'

  },
  // ... add more styles as needed
});

export default PetDetailScreen;
