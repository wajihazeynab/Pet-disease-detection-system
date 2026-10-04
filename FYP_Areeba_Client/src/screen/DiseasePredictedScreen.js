// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const DiseasePredictionScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Ionicons name="arrow-back" size={24} color="black" />
//         <Text style={styles.headerTitle}>Disease Predicted</Text>
//         <Text style={styles.time}>1:15</Text>
//         {/* Battery icon can be added next to the time if desired */}
//       </View>

//       <Image source={require('../assets/HomeDog1.png')} style={styles.image} />

//       <Text style={styles.title}>Disease Predicted</Text>
//       <Text style={styles.subtitle}>Faline</Text>

//       <Text style={styles.sectionTitle}>Symptoms</Text>
//       <Text style={styles.symptom}>High fever</Text>
//       <Text style={styles.symptom}>Cough</Text>
//       <Text style={styles.symptom}>Low blood pressure</Text>
//       <Text style={styles.symptom}>Itching</Text>
//       <Text style={styles.symptom}>Fatigue</Text>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Ok</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.buttonContact}>
//         <Text style={styles.buttonTextContact}>Contact Vet</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   time: {
//     fontSize: 16,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   subtitle: {
//     fontSize: 20,
//     color: 'grey',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     alignSelf: 'flex-start',
//     marginTop: 20,
//   },
//   symptom: {
//     fontSize: 16,
//     alignSelf: 'flex-start',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   buttonContact: {
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 20,
//     marginTop: 10,
//   },
//   buttonTextContact: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default DiseasePredictionScreen;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomBtn from '../components/CustomBtn';

const DiseasePredictionScreen = ({ navigation, route }) => {
  // Symptoms data
  const symptoms = [
    'High fever',
    'Cough',
    'Low blood pressure',
    'Itching',
    'Fatigue'
  ];

  // Render a single symptom
  const renderSymptom = ({ item }) => (
    <Text style={styles.symptom}>{item}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" style={styles.backbutton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disease Prediction</Text>
      </View>
      {/* <Image source={require('../assets/HomeDog1.png')} style={styles.image} /> */}

      <Text style={styles.title}>Disease Predicted</Text>
      {/* <Text style={styles.subtitle}>Faline</Text> */}

      <Text style={styles.sectionTitle}>Symptoms</Text>
      <Text style={styles.symptom}>{route.params.diagnosis}</Text>

      <CustomBtn
        title={'Ok'}
        btnStyle={{ marginTop: 50 }}
        onPress={() => navigation.goBack()}
      />
      <TouchableOpacity style={styles.buttonContact}
        onPress={() => navigation.navigate("VetScreen")}>
        <Text style={styles.buttonTextContact}>Contact Vet</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  symptomsList: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 20,
    fontSize: 100,

  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 15
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    color: 'grey',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 10,

  },
  symptom: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 20,
    // marginTop: 0,
    width: '90%'
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttonContact: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 5,
  },
  buttonTextContact: {
    color: '#6CB0E6',
    marginTop: 20,
    fontSize: 20,
  },
});


export default DiseasePredictionScreen;
