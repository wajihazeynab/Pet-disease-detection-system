import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SERVER_BASE_URL, scale } from '../constants';
import { apiGet } from '../api';
import { useSelector } from 'react-redux';

const petsData = [
  { id: '0', image: require('../assets/Article1Dog.png'), name: 'Tommy' },
  { id: '1', name: 'Simba', image: require('../assets/HomeDog1.png') },
  { id: '2', name: 'Bella', image: require('../assets/HOmeCat.png') },
  { id: '3', name: 'Johny', image: require('../assets/HomeDog2.png') },
];

const MyPetScreen = ({ navigation }) => {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const [pet, setPet] = useState([])

  useEffect(() => {
    navigation.addListener('focus', () => {
      userModal && fetchPet()
    })
  }, [navigation])

  const fetchPet = async () => {
    const res = await apiGet('/pet', userModal.accessToken)
    if (res.check) {
      setPet(res.data)
    }
    // if(res.)
    console.log('get', res)
  }
  let name = 'Article1Dog.png'

  const renderPetItem = ({ item }) => {

    // let path =  '../assets/petImage/'+item.image
    // const image = require(path);
    return (
      <TouchableOpacity
        style={styles.petCard}
        onPress={() => navigation.navigate("PetDetailScreen", { data: item })}>
        <Image source={{ uri: `${SERVER_BASE_URL}/images/${item.image}` }} style={styles.petImage} />
        <Text style={styles.petName}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={scale(28)} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Pets</Text>
        </View>
        <TouchableOpacity style={styles.addButton}
          onPress={() => navigation.navigate('AddPetScreen', { type: 'ADD' })}>
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>

      </View>
      <FlatList
        data={pet}
        renderItem={renderPetItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: scale(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(15)
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  petCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // borderColor: '#f0f0f0',
    // borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  petName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'lightblue',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    // Add styles for add icon if necessary
  },
  // ... other styles
});

export default MyPetScreen;
