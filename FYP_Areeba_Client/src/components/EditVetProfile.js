// UserProfile.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const VetProfile = () => {
  return (
    <View style={styles.container}>
     <Text style={styles.header}>Edit Profile</Text>
      <Text style={styles.greeting}>Hi Areeba,</Text>
      <Text style={styles.subGreeting}>Hope it's a good day!</Text>

      {/* Profile Photo Section */}
      <View style={styles.photoSection}>
        <Icon name="user-circle-o" size={80} color="#000" />
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      {/* User Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input}  keyboardType="email-address" />
        {/* <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}  secureTextEntry={true} /> */}
        <Text style={styles.label}>Expertise</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Availability</Text>
        <TextInput style={styles.input} />
      </View>
      <Navig />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header:{
    fontSize:30,
    paddingTop:10,
  alignSelf:'center',
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
    marginBottom: 7,
  },
  uploadButton: {
    marginTop: 10,
    padding: 10,
  },
  uploadText: {
    color: '#007bff',
    fontSize:15,
    fontWeight:'bold',
  },
  infoSection: {
    // Additional styling if necessary
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
   borderBottomColor:'#ddd',
     padding: 5,
     marginBottom: 2,
     borderBottomWidth: 2,
  },
  // ... other styles
});

export default VetProfile;
