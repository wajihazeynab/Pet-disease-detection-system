import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed
import * as ImagePicker from 'expo-image-picker';
import CustomBtn from '../components/CustomBtn';
import { Picker } from '@react-native-picker/picker';
import { scale, showToast } from '../constants';
import { apiPost, apiPut } from '../api';
import { useDispatch, useSelector } from 'react-redux';

let list = ['Cat', 'Dog']
let genList = ['Male', 'Female', 'Both']

const AddPetScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const userModal = useSelector(e => e.user_reducer.userModal)

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('Cat');
  const [gender, setGender] = useState('Male');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);


  useEffect(() => {
    if (route.params.type == "UPDATE") {
      let data = route.params.data
      setName(data.name)
      setAge(data.age.toString())
      setCategory(data.category)
      setGender(data.gender)
      setBreed(data.breed)
      setWeight(data.weight.toString())
      setHeight(data.height.toString())
      setId(data._id)
    }
  }, [route])

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



  const validation = () => {
    if (name == '' || age == '' || category == '' || gender == '' || breed == '' || weight == '' || height == '') {
      return true
    }
    return false
  }

  const handleSubmit = async () => {
    // setLoading(false)
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("gender", gender);
    // formData.append("category", category);
    // formData.append("breed", breed);
    // formData.append("age", age);
    // formData.append("weight", weight);
    // formData.append("height", height);
    // formData.append("owner", userModal._id);
    // formData.append("files", image);
    console.log('first ')
    const DATA = {
      name: name,
      gender: gender,
      category: category,
      breed: breed,
      age: age,
      weight: weight,
      height: height,
      owner: userModal._id,
      image: image.base64,
      type:'jpg'
      // type: image.fileName.split('.')[1]
    }
    let res = null
    console.log('first ')
    if (id) {
      res = await apiPut(`/pet/edit/${id}`, DATA, userModal.accessToken)
    }
    else {
      res = await apiPost('/pet/add', DATA, userModal.accessToken)
    }
    console.log(res)
    console.log('first ')
    if (res.check) {
      id ? Alert.alert('Pet Updated Successfully') : Alert.alert('Pet Added Successfully')
      navigation.navigate('MyPetScreen')
    }
    else {
      showToast(res.message, 'error')
    }


    setLoading(false)
    // navigation.navigate("MyPetScreen")
  };
  return (
    <ScrollView style={{ backgroundColor: '#fff', }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.photoButton}
          onPress={takePhoto}>
          {image || userModal?.image ?
            <Image style={{ width: '100%', height: '100%', borderRadius: 100, }} source={{ uri: image?.uri }} />
            :
            <View style={{ backgroundColor: 'lightblue', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 100, }}>
              <Ionicons name="camera" size={30} color="white" />
              <Text style={styles.TextImage}>Take photo</Text>
            </View>}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Age"
          placeholderTextColor={'gray'}
          value={age}
          keyboardType='number-pad'
          onChangeText={setAge}
        />
        {/* <TextInput
        style={styles.input}
        placeholder="Enter Category"
        value={category}
        onChangeText={setCategory}
      /> */}
        <View style={{ width: '100%', borderWidth: 1, borderRadius: 5, borderColor: '#ddd' }}>
          <Picker
            mode='dropdown'
            selectedValue={category}
            color={'black'}
            itemStyle={{
              // backgroundColor:'yellow',
              height: 100,
              fontSize: 14,
              color: 'black',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            {list.map(e => (
              <Picker.Item label={e} value={e} />
            ))}
          </Picker>
        </View>
        <View style={{ width: '100%', borderWidth: 1, borderRadius: 5, marginTop: 10, borderColor: '#ddd' }}>
          <Picker
            mode='dropdown'
            selectedValue={gender}
            color={'black'}
            itemStyle={{
              // backgroundColor:'yellow',
              height: 100,
              fontSize: 14,
              color: 'black',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setGender(itemValue)
            }>
            {genList.map(e => (
              <Picker.Item label={e} value={e} />
            ))}
          </Picker>
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter Gender"
          placeholderTextColor={'gray'}
          value={gender}
          onChangeText={setGender}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Enter Breed"
          placeholderTextColor={'gray'}
          value={breed}
          onChangeText={setBreed}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Weight"
          placeholderTextColor={'gray'}
          value={weight}
          keyboardType='number-pad'
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Height"
          placeholderTextColor={'gray'}
          value={height}
          keyboardType='number-pad'
          onChangeText={setHeight}
        />
        <CustomBtn
          disabled={validation() || loading}
          loading={loading}
          title={id ? 'Update Pet' : 'Add Pet'}
          onPress={handleSubmit}
          btnStyle={{ borderRadius: 15, marginTop: 10 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: scale(50),

  },
  photoButton: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 100,
    height: 100,
    marginTop: 20,
  },
  TextImage: {
    fontWeight: 'bold',
    color: 'white',
  },

  input: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  doneButton: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    marginTop: 5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddPetScreen;