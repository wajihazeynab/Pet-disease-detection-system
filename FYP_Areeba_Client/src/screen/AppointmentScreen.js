// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import * as colors from "../styles";
// import { SafeAreaView } from "react-native-safe-area-context";
// import DaysOfWeek from "../components/WeekDays";
// import CustomBtn from "../components/CustomBtn";
// import { scale } from "../constants";
// export default function Appointment() {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [completeDate, setCompleteDate] = useState(null);
//   const [description, setDescription] = useState("");
//   const availabilityTimes = [
//     "11:00am",
//     "12:00pm",
//     "1:00pm",
//     "3:00pm",
//     "5:00pm",
//     "6:00pm",
//     "7:00pm",
//     "8:00pm",
//   ];

//   const handleSelectDay = ({ day, date, formattedDate }) => {
//     setSelectedDay(day);
//     setSelectedDate(date);
//     setCompleteDate(formattedDate);
//   };
//   const handleSubmit = () => {};

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}> Book Appointment</Text>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardAvoidingContainer}
//       >
//       <Text style={styles.label}> Select Date</Text>
//       <DaysOfWeek onSelectDay={handleSelectDay} />
//       <Text style={styles.label}> Select Time</Text>

//       <View style={styles.timeSlotsContainer}>
//         {availabilityTimes.map((time, index) => (
//           <TouchableOpacity key={index} 
//           style={styles.timeSlot}>
//             <Text style={styles.timeSlotText}>{time}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Text style={styles.label}>Description</Text>

//       <TextInput
//         style={styles.input}
//         multiline={true}
//         placeholder="Enter description"
//         onChangeText={(text) => setDescription(text)}
//         value={description}
//       />

//       <CustomBtn
//         title={"Book Appointment"}
//         onPress={handleSubmit}
//         btnStyle={{
//           width: "95%",
//           alignSelf: "center",
//           borderRadius: 15,
//           borderRadius: scale(5),
//           marginTop: 10,
//         }}
//       />
//         </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   title: {
//     paddingTop: 10,
//     color: "black",
//     fontSize: 30,
//     fontWeight: "bold",
//     alignSelf: "center",
//   },
//   label: {
//     fontSize: scale(16),
//     fontWeight: "bold",
//     marginTop: scale(10),
//     marginHorizontal: scale(10),
//   },
//   input: {
//     marginHorizontal: scale(10),
//     marginVertical: scale(10),
//     borderRadius: scale(5),
//     backgroundColor: "#E7E7E7",
//     padding: scale(10),
//     minHeight:scale(100),
//   },
//   timeSlotsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginHorizontal: scale(10),
//   },
//   timeSlot: {
//     padding: 10,
//     borderWidth: 2,
//     borderColor: "#87CEEB",
//     borderRadius: scale(20),
//     marginVertical: scale(8),
//     width: 100,
//     marginHorizontal: scale(8),
//     alignItems: "center",
//   },
//   timeSlotText: {
//     fontSize: 16,
//     color: colors.APP_BTN_COLOR,
//     fontWeight: "500",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as colors from "../styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import DaysOfWeek from "../components/WeekDays";
import CustomBtn from "../components/CustomBtn";
import { scale, showToast } from "../constants";
import moment from "moment";
import { apiGet, apiPost, apiPut } from "../api";
import { useSelector } from "react-redux";

export default function AppointmentScreen({ navigation, route }) {

  const userModal = useSelector(e => e.user_reducer.userModal)

  const { _id, image, name, address, workingHours } = route.params.data

  const [selectedDay, setSelectedDay] = useState(null);
  const [selection, setSelection] = useState(null);
  const [selectionTime, setSelecttionTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState(null); // New state for selected time
  const availabilityTimes = [
    "11:00am",
    "12:00pm",
    "1:00pm",
    "3:00pm",
    "5:00pm",
    "6:00pm",
    "7:00pm",
    "8:00pm",
  ];

  useEffect(() => {
    if (selectedDay) {
      getSlot()
    }
  }, [selectedDay])

  const getSlot = async () => {
    let day = moment(selectedDay).format('DD/MM/YYYY')
    console.log('run', day)
    const res = await apiGet(`/vet/getslot?date=${day}`, userModal.accessToken)
    if (res.check) {
      console.log('-', res.data)
      if (res.data.length > 0) {
        setSelection(res.data[0])
      }
      else {
        setSelection(null)
      }
    }
    else {

    }
  }



  const handleSubmitAppointment = async () => {
    setLoading(true)
    // Use selectedTime in your submit logic
    let arr = []
    if (selection) {
      console.log('start')
      selection.timeslots.map(e => {
        if (e.time == moment(selectedTime).format('hh:mm a')) {
          arr.push({
            time: moment(selectedTime).format('hh:mm a'),
            status: 'booked'
          })
        }
        else {
          arr.push(e)
        }
      })
      console.log('start', arr)
      let DATA = {
        vetId: _id,
        date: moment(selectedDay).format('DD/MM/YYYY'),
        timeslots: arr,
        time: moment(selectedTime).format('hh:mm a'),
        description: description,
      }
      console.log("DATA", DATA)
      const res = await apiPut(`/vet/updateappoint/${selection._id}`, DATA, userModal.accessToken)
      if (res.check) {
        showToast('Appointment updated successfully', 'success')
      }
      else {
        showToast(res.message, 'error')
      }
    }
    else {
      let arr = []
      workingHours[0]?.timeSlot.map((time, index) => {
        arr.push({
          time: moment(time).format('hh:mm a'),
          status: time == selectedTime ? 'booked' : 'available'
        })
      })
      let DATA = {
        vetId: _id,
        date: moment(selectedDay).format('DD/MM/YYYY'),
        timeslots: arr,
        time: moment(selectedTime).format('hh:mm a'),
        description: description,
      }
      const res = await apiPost('/vet/addappoint', DATA, userModal.accessToken)
      if (res.check) {
        showToast('Appointment created successfully', 'success')
      }
      else {
        showToast(res.message, 'error')
      }
    }
    setLoading(false)
    navigation.goBack()
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
        <TouchableOpacity style={{ ...styles.backbutton, }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Book Appointment</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <Text style={styles.label}> Select Date</Text>
        <DaysOfWeek
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectWeek={workingHours[0]?.day}
        />
        <Text style={{ ...styles.label, marginTop: 10 }}> Select Time</Text>

        <View style={styles.timeSlotsContainer}>
          {workingHours[0]?.timeSlot.map((time, index) => {
            let flag = selection?.timeslots?.find(e => e.time == moment(time).format('hh:mm a') && e.status == 'booked')
            console.log(flag)
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                  { backgroundColor: selectedTime == time ? colors.APP_BTN_COLOR : colors.APP_WHITE_COLOR, borderColor: flag ? '#BDBDBD' : colors.APP_BTN_COLOR }]}
                onPress={() => !flag && setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    { color: flag ? '#BDBDBD' : selectedTime === time ? 'white' : colors.APP_BTN_COLOR }]}
                >
                  {moment(time).format('hh:mm a')}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <Text style={styles.label}>Description</Text>

        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Enter description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />

        <CustomBtn
          disabled={selectedDay == null || selectedTime == null || loading}
          loading={loading}
          title={"Book Appointment"}
          onPress={handleSubmitAppointment}
          btnStyle={{
            width: "95%",
            alignSelf: "center",
            borderRadius: 15,
            borderRadius: scale(5),
            marginTop: 10,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10
  },

  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 10
  },
  label: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginTop: scale(10),
    marginHorizontal: scale(10),
  },
  input: {
    marginHorizontal: scale(10),
    marginVertical: scale(10),
    borderRadius: scale(5),
    backgroundColor: "#E7E7E7",
    padding: scale(10),
    minHeight: scale(100),
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: scale(10),
  },
  timeSlot: {
    padding: 10,
    borderWidth: 2,
    borderColor: colors.APP_BTN_COLOR,
    borderRadius: scale(20),
    marginVertical: scale(8),
    width: 100,
    marginHorizontal: scale(8),
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: colors.APP_BTN_COLOR,
    // Change the background color for selected time
  },
  selectedTimeSlotText: {
    color: "white",
  },
  timeSlotText: {
    fontSize: 16,
    color: colors.APP_BTN_COLOR,
    fontWeight: "500",
  },
});
