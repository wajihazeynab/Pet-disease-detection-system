// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // const EditMedicine = () => {
// //   const [medicineName, setMedicineName] = useState('omega');
// //   const [dose, setDose] = useState(3);
// //   const [selectedFrequency, setSelectedFrequency] = useState('Everyday');
// //   const [selectedTimes, setSelectedTimes] = useState({
// //     morning: false,
// //     midday: false,
// //     night: false,
// //   });

// //   const handleFrequencyPress = frequency => {
// //     setSelectedFrequency(frequency);
// //   };

// //   const handleTimeToggle = time => {
// //     setSelectedTimes({ ...selectedTimes, [time]: !selectedTimes[time] });
// //   };

// //   const handleDoseChange = increment => {
// //     setDose(prevDose => Math.max(1, prevDose + increment));
// //   };

// //   const handleUpdate = () => {
// //     // Implement update logic here
// //     console.log('Medicine updated:', { medicineName, dose, selectedFrequency, selectedTimes });
// //     navigation.navigate('MedicineToday')};
  
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Schedule the dose</Text>
// //       <TextInput
// //         style={styles.input}
// //         value={medicineName}
// //         onChangeText={setMedicineName}
// //         placeholder="Enter medicine name"
// //       />
// //       {/* Frequency Selection - Not implemented for brevity */}
// //       <View style={styles.doseContainer}>
// //         <TouchableOpacity onPress={() => handleDoseChange(-1)} style={styles.iconButton}>
// //           <Icon name="minus-circle" size={30} color="#000" />
// //         </TouchableOpacity>
// //         <Text style={styles.doseText}>{dose}</Text>
// //         <TouchableOpacity onPress={() => handleDoseChange(1)} style={styles.iconButton}>
// //           <Icon name="plus-circle" size={30} color="#000" />
// //         </TouchableOpacity>
// //       </View>
// //       {/* Time Selection - Not implemented for brevity */}
// //       <TouchableOpacity style={styles.updateButton} onPress= {handleUpdate} >
// //         <Text style={styles.updateButtonText}>Update</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: 'white',
// //   },
// //   header: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginBottom: 20,
// //     fontSize: 18,
// //   },
// //   doseContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 20,
// //   },
// //   iconButton: {
// //     padding: 10,
// //   },
// //   doseText: {
// //     marginHorizontal: 20,
// //     fontSize: 18,
// //   },
// //   updateButton: {
// //     backgroundColor: '#007bff',
// //     padding: 15,
// //     borderRadius: 20,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   updateButtonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   // ... Add styles for frequency and time selection
// // });

// // export default EditMedicine;
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const EditMedicineScreen = () => {
//   const [medicineName, setMedicineName] = useState('omega');
//   const [doseFrequency, setDoseFrequency] = useState('Everyday');
//   const [dailyDose, setDailyDose] = useState(3);
//   const [selectedTime, setSelectedTime] = useState([]);

//   const handleTimeSelection = (time) => {
//     setSelectedTime((prevSelectedTime) => {
//       if (prevSelectedTime.includes(time)) {
//         return prevSelectedTime.filter((t) => t !== time);
//       } else {
//         return [...prevSelectedTime, time];
//       }
//     });
//   };

//   const updateMedicine = () => {
//     // Update medicine logic here
//     console.log({
//       medicineName,
//       doseFrequency,
//       dailyDose,
//       selectedTime,
//     });
//     // Navigate back or show a success message
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => { /* logic to cancel and go back */ }} style={styles.cancelButton}>
//         <Text style={styles.cancelButtonText}>cancel</Text>
//       </TouchableOpacity>
//       <Text style={styles.title}>Schedule the dose</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setMedicineName}
//         value={medicineName}
//         placeholder="Enter medicine name"
//       />
//       <View style={styles.frequencyContainer}>
//         <Text style={styles.label}>How often is the dose taken?</Text>
//         <View style={styles.frequencyButtons}>
//           {['Everyday', 'Weekly', 'Monthly'].map((frequency) => (
//             <TouchableOpacity
//               key={frequency}
//               style={[
//                 styles.frequencyButton,
//                 doseFrequency === frequency ? styles.frequencyButtonActive : {},
//               ]}
//               onPress={() => setDoseFrequency(frequency)}
//             >
//               <Text
//                 style={[
//                   styles.frequencyButtonText,
//                   doseFrequency === frequency ? styles.frequencyButtonTextActive : {},
//                 ]}
//               >
//                 {frequency}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <View style={styles.doseContainer}>
//         <Text style={styles.label}>Daily dose</Text>
//         <TouchableOpacity onPress={() => setDailyDose(Math.max(0, dailyDose - 1))} style={styles.doseButton}>
//           <Text style={styles.doseButtonText}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.doseCount}>{dailyDose}</Text>
//         <TouchableOpacity onPress={() => setDailyDose(dailyDose + 1)} style={styles.doseButton}>
//           <Text style={styles.doseButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.timeContainer}>
//         <Text style={styles.label}>When do you want to take it?</Text>
//         {['Morning', 'Mid day', 'Night'].map((time) => (
//           <TouchableOpacity
//             key={time}
//             style={[
//               styles.timeButton,
//               selectedTime.includes(time) ? styles.timeButtonActive : {},
//             ]}
//             onPress={() => handleTimeSelection(time)}
//           >
//             <Text
//               style={[
//                 styles.timeButtonText,
//                 selectedTime.includes(time) ? styles.timeButtonTextActive : {},
//               ]}
//             >
//               {time}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.updateButton} onPress={updateMedicine}>
//         <Text style={styles.updateButtonText}>Update</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   cancelButton: {
//     alignSelf: 'flex-end',
//   },
//   cancelButtonText: {
//     color: 'blue',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'blue',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//   },
//   frequencyContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   frequencyButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   frequencyButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'blue',
//     borderRadius: 20,
//   },
//   frequencyButtonActive: {
//     backgroundColor: 'blue',
//   },
//   frequencyButtonText: {
//     color: 'blue',
//   },
//   frequencyButtonTextActive: {
//     color: 'white',
//   },
//   doseContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   doseButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'blue',
//     borderRadius: 10,
//   },
//   doseButtonText: {
//     fontSize: 24,
//     color: 'blue',
//   },
//   doseCount: {
//     fontSize: 24,
//     marginHorizontal: 20,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   timeButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'blue',
//     borderRadius: 20,
//   },
//   timeButtonActive: {
//     backgroundColor: 'blue',
//   },
//   timeButtonText: {
//     color: 'blue',
//   },
//   timeButtonTextActive: {
//     color: 'white',
//   },
//   updateButton: {
//     backgroundColor: 'blue',
//     padding: 15,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default EditMedicineScreen;
import React, { useState } from 'react';
import {Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
const EditMedicine = ({navigation}) => {
  const [medicineName, setMedicineName] = useState('omega');
  const [dose, setDose] = useState(3);
  const [frequency, setFrequency] = useState('Everyday');
  const [schedules, setSchedule] = useState({
    Morning: false,
    Midday: false,
    Night: false,
 
  });
  const handleFrequencyPress = (newFrequency) => {
    setFrequency(newFrequency);
  };

  // const handleSchedulePress = (time) => {
  //   setSchedule({ ...schedule, [time]: !schedule[time] });
  // };

  const increaseDose = () => {
    setDose(dose + 1);
  };

  const decreaseDose = () => {
    if (dose > 0) setDose(dose - 1);
  };

  const updateMedicine = ({}) => {

      Alert.alert('Medicine Updated');
     navigation.navigate("MedicineToday");
      
      // Handle the update logic
    
  };
  
  const toggleSchedule= (schedule) => {
    setSchedule((currentSchedule) => ({
      ...currentSchedule,
      [schedule]: !currentSchedule[schedule],
    }));
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {console.log('Cancel');navigation.navigate("MedicineToday")}}>
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
        <Text style={styles.textt}>How often is the dose taken?</Text>
      <View style={styles.frequencyContainer}>
        {['Everyday', 'Weekly', 'Monthly'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.frequencyButton, frequency === item && styles.frequencyButtonActive]}
            onPress={() => handleFrequencyPress(item)}
          >
            <Text style={styles.frequencyText}>{item}</Text>
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
      <Text style={styles.textt}>When do yo want to take it?</Text>
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
              <Text style={styles.scheduleText}>
                {schedule.split(/(?=[A-Z])/).join(' ')}
              </Text>
              <CheckBox
                value={schedules[schedule]}
                onValueChange={() => toggleSchedule(schedule)}
                color={schedules[schedule] ? 'lightblue' : undefined}
              />
            </View>
            ))}
          </View>
            
      <TouchableOpacity style={styles.updateButton} onPress={updateMedicine}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  cancelButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
 
  },
  header: {
    fontSize: 26,
    width:120,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft:20,
  },
  textt:{
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft:20,
    marginBottom:10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
    padding: 10,
  },
  frequencyContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  frequencyButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 5,
    width:100,
  },
  frequencyButtonActive: {
    backgroundColor: '#87CEEB',
  },
  frequencyText: {
    color: '#000',
    fontSize:15,
    fontWeight:'bold'
  },
  doseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width:'90%',
    borderRadius:50,
    padding:10,
    justifyContent: 'space-between',
    backgroundColor:'lightblue'
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
    fontWeight:'bold'
  },
  ScheduleList:{
    marginBottom: 20,
    flexDirection:'row',
    // marginHorizontal:10,
    // alignContent: 'space-evenly',
    
  },
  scheduleContainer: {
    // flexDirection: 'row',
    // marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    marginBottom: 10,
  },

  scheduleText: {
    // color: '#000',
    marginLeft:20,
    marginRight:2,
    fontSize: 22,
    fontWeight:'bold',
  },
  updateButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 50,
    padding: 15,
    width: '90%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default EditMedicine;